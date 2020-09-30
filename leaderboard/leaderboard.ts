import {
    Challenge,
    getChallenges,
    getProfile,
    getSanitizedSchoolFilter,
    getSubmissions,
    groupByKey,
    isSubmissionValid,
    Profile,
    PUBLIC_CHALLENGES_URL,
    PUBLIC_CONTEST_URL,
    schoolNameMap,
    Slug,
    Submission,
    timeToString,
    Username,
} from './common';

const bioReminder = `Update the "About" section to have the following, separated by new lines:<br>
- the school you are competing at (BYU, USU, UofU)<br>
- the team number you were assigned<br>
- your team name<br>
<b>You must do this to be eligible for prizes</b>`;

const leaderboardHtmlHeaderContent =
`    <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css">
        <style>.container { min-width:1300px; } .title {color: black;}</style>
        <style>
        .tooltip {
            position: relative;
        }

        .need-names {
            color: #ED6058;
        }

        .tooltip .tooltiptext {
            visibility: hidden;
            width: 300px;
            background-color: black;
            color: #fff;
            text-align: left;
            padding: 5px;
            border-radius: 6px;

            position: absolute;
            z-index: 1;
            top: 50%;
            left: calc(100% + 10px);
            transform: translateY(-50%);
        }

        .tooltip:hover .tooltiptext {
            visibility: visible;
        }
        </style>
    </head>`;

const submissionWhitelist = { // for submissions that weren't accepted by HackerRank, but should have been
};

interface ChallengeStatus {
    complete: boolean;
    time: number;
    penalty: number;
}
interface TeamScore {
    username: Username;
    totalScore: number;
    totalTime: number;
    challengeStatuses: Map<Slug, ChallengeStatus>;
}

function calculateScore(submissions: Submission[]): TeamScore {
    let totalScore = 0;
    let totalTime = 0;
    const challengeStatuses: Map<Slug, ChallengeStatus> = new Map();
    submissions.sort((a,b) => {
        return a.timeFromStart - b.timeFromStart;
    });

    submissions.filter(submission => {
        return isSubmissionValid(submission, false); // include incorrect solutions for penalty calculation
    }).forEach(submission => {
        const slug = submission.challenge.slug;
        if (!challengeStatuses.get(slug)) {
            challengeStatuses.set(slug, {
                complete: false,
                penalty: 0,
                time: 0
            });
        }
        const challengeStatus = challengeStatuses.get(slug);
        if (challengeStatus.complete) { // filter any submissions after the first correct one
            return;
        }
        if (submission.status == 'Accepted' || submissionWhitelist[submission.id]) {
            challengeStatus.complete = true;
            challengeStatus.time = submission.timeFromStart;
            totalScore++;
            totalTime += challengeStatus.time + challengeStatus.penalty;
        } else {
            challengeStatus.penalty += 20;
        }
    });

    return {
        username: submissions[0].username,
        totalScore: totalScore,
        totalTime: totalTime,
        challengeStatuses: challengeStatuses,
    };
}

function teamScoreToRow(challenges: Challenge[], score: TeamScore, profile: Profile, rank: number, schoolFilter?: string): string {
    const challengeCells = challenges.map(challenge => {
        return `<td>${getChallengeCellContents(score, challenge.slug)}</td>`;
    });

    const rowContents = [
        '<tr>',
        `    <td>${rank + 1}</td>`,
        `    <td>${getNameCellContents(profile)}</td>`,
        `    <td>${getLocationCellContents(profile, schoolFilter)}</td>`,
        ...challengeCells.map(td => `    ${td}`),
        `    <td>${score.totalScore}</td>`,
        `    <td>${timeToString(score.totalTime)}</td>`,
        '</tr>',
    ].join('\n');

    return rowContents;
}

function getNameCellContents(profile: Profile): string {
    const userUrl = `https://www.hackerrank.com/${profile.username}`;
    const missingContent = profile.school.length == 0 || profile.teamNumber == 0 || profile.teamName.length == 0;
    const tooltipContent = missingContent ? bioReminder : `Team number: ${profile.teamNumber}`;
    const nameCellClasses = `tooltip${missingContent ? ' need-names' : ''}`;

    const nameCellContents = [
        `<a class="${nameCellClasses}" href="${userUrl}">`,
        profile.teamName || profile.username, // fall back on username for malformed bios
        missingContent ? '*' : '',
        `<span class="tooltiptext">${tooltipContent}</span>`,
        '</a>',
    ].join('');

    return nameCellContents;
}

function getLocationCellContents(profile: Profile, schoolFilter?: string): string {
    const prettySchoolName = schoolNameMap[profile.school];
    if (!!prettySchoolName) {
        if (!schoolFilter) {
            return `<a href='?school=${prettySchoolName}'>${prettySchoolName}</a>`;
        } else {
            return prettySchoolName;
        }
    } else {
        return `<a class="tooltip" href="https://www.hackerrank.com/settings/bio">Set Location<span class='tooltiptext'>${bioReminder}</span>`;
    }
}

function getChallengeCellContents(score: TeamScore, slug: Slug): string {
    const status = score.challengeStatuses.get(slug);
    if (!status || !status.complete) {
        return '';
    }

    const completionTime = timeToString(status.time);
    const penalty = status.penalty > 0 ? `<br>(+${status.penalty})` : '';
    return completionTime + penalty;
}

export async function getHtml(schoolFilter?: string): Promise<string> {
    const allSubmissions = await getSubmissions();
    const submissionsByUsername = groupByKey(allSubmissions, 'username');
    const usernames = Object.keys(submissionsByUsername);

    const allProfiles = await Promise.all(usernames.map(getProfile));
    const usernameToProfile: Map<Username, Profile> = new Map(allProfiles.map(profile => [profile.username, profile] as [any, any]));

    const teamScores = Object.keys(submissionsByUsername).map(username => {
        const submissions = submissionsByUsername[username];
        const score = calculateScore(submissions);
        return score;
    }).filter(score => {
        if (score.totalScore == 0) {
            return false;
        }

        const profile = usernameToProfile.get(score.username);
        const sanitizedSchoolFilter = getSanitizedSchoolFilter(schoolFilter);
        return !sanitizedSchoolFilter || sanitizedSchoolFilter == profile.school;
    }).sort((a, b) => {
        return (b.totalScore - a.totalScore) || (a.totalTime - b.totalTime);
    });

    const challenges = await getChallenges();

    const teamScoreRows = teamScores.map((score, i) => {
        const profile = usernameToProfile.get(score.username);
        return teamScoreToRow(challenges, score, profile, i, schoolFilter);
    });
    const hasScoresToDisplay = teamScoreRows.length > 0;

    const challengeHeaderContents = challenges.map(challenge => {
      const challengeLink = PUBLIC_CHALLENGES_URL + challenge.slug;
      return `<th><a href="${challengeLink}">${challenge.name}</a></th>`;
    });

    const headerRowContents = [
      '        <thead>',
      '            <tr>',
      '                <th>Rank</th>',
      '                <th>Name</th>',
      '                <th>Location</th>',
      ...challengeHeaderContents.map(th => `                ${th}`),
      '                <th>Score</th>',
      '                <th>Time</th>',
      '            </tr>',
      '        </thead>',
    ].join('\n');

    const tableContents = [
      '        <table class="bordered striped centered">',
      '        <tbody>',
      headerRowContents,
      ...teamScoreRows,
      '        </tbody>',
      '        </table>',
    ].join('\n');

    const titleContent = '<a class="title" href="?">Lucid Programming Competition Leaderboard</a>';
    const placeholderMessage = `The <a href="${PUBLIC_CONTEST_URL}">Lucid Programing Competition</a> Leaderboard will be enabled after the first successful submission`;
    const mainContent = hasScoresToDisplay ? tableContents : placeholderMessage;

    const resultHtml = [
        '<html>',
        leaderboardHtmlHeaderContent,
        '    <body>',
        '        <div class="container">',
        `        <h1>${titleContent}</h1>`,
        mainContent,
        '        </div>',
        '    </body>',
        '</html>',
    ].join('\n');

    return resultHtml;
};

