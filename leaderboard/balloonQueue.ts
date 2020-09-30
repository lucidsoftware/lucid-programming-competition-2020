import {
    getProfile,
    getSanitizedSchoolFilter,
    getSubmissions,
    groupByKey,
    isSubmissionValid,
    Profile,
    timeToString,
    Username,
} from './common';

const headerContent =
`    <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css">
        <style>
            .item {
                cursor: pointer;
                transition: 0.5s all;
            }
            .selected {
                background-color: #42a5f5;
                text-decoration: line-through;
            }
        </style>
    </head>`;

const scriptContents = `
    <script>
        document.querySelectorAll('.item').forEach(function(item) {
            item.onclick = function() {
                var selected = item.classList.toggle('selected');
                localStorage.setItem(item.id, selected);
            }

            let input = item.querySelector('input');

            input.onclick = function(event) {
                event.stopPropagation();
            };

            input.onchange = function() {
                document.querySelectorAll('.item').forEach(function(check) {
                    if(check.dataset['user'] == item.dataset['user']) {
                        check.querySelector('input').value = input.value;
                    }
                });
                localStorage.setItem(item.dataset['user']+'-location', input.value);
            };

            if(localStorage.getItem(item.id) == 'true') {
                item.classList.add('selected');
            }
            if(localStorage.getItem(item.dataset['user']+'-location')) {
                input.value = localStorage.getItem(item.dataset['user']+'-location');
            }
        });
    </script>`;

export async function getHtml(schoolFilter:string = ''): Promise<string> {
    const allSubmissions = await getSubmissions();
    const submissionsByUsername = groupByKey(allSubmissions, 'username');
    const usernames = Object.keys(submissionsByUsername);

    const allProfiles = await Promise.all(usernames.map(getProfile));
    const usernameToProfile: Map<Username, Profile> = new Map(allProfiles.map(profile => [profile.username, profile] as [any, any]));

    schoolFilter = getSanitizedSchoolFilter(schoolFilter);

    const scoreByUsername = {};
    usernames.forEach(username => {
        scoreByUsername[username] = 0;
    });

    const acceptedSubmissionSet = new Set();
    const firstAcceptedSubmissions = allSubmissions.sort((a, b) => {
        return a.timeFromStart - b.timeFromStart;
    }).filter(submission => {
        if (!isSubmissionValid(submission, true)) { // include only correct solutions
            return false;
        }

        const profile = usernameToProfile.get(submission.username);
        if (!!schoolFilter && schoolFilter != profile.school) {
            return false;
        }

        const key = submission.challenge.slug + ',' + submission.username;
        if (acceptedSubmissionSet.has(key)) {
            return false;
        }

        acceptedSubmissionSet.add(key);
        return true;
    });

    const submissionsWithScore = firstAcceptedSubmissions.map(submission => {
        scoreByUsername[submission.username]++;
        return [submission, scoreByUsername[submission.username]];
    })
    submissionsWithScore.reverse();  // sort in reverse order for balloon queue

    const scoreRows = submissionsWithScore.map(([submission, score]) => {
        const profile = usernameToProfile.get(submission.username);

        return [
            `    <tr class="item" id="${submission.id}" data-user="${submission.username}">`,
            `        <td>${profile.teamName || profile.username} (#${profile.teamNumber})</td>`,
            `        <td>${profile.school}</td>`,
            `        <td>${submission.challenge.name}</td>`,
            `        <td><input type="text"></td>`,
            `        <td>${timeToString(submission.timeFromStart)}</td>`,
            `        <td>${score}</td>`,
            '    </tr>',
        ].join('\n');
    });

    const placeholderMessage = submissionsWithScore.length == 0 ? '<tr><td>Waiting for successful submission</td></tr>' : '';
    const tableContents = [
        '        <table>',
        '            <tbody>',
        '                <tr>',
        '                    <th>Name</th>',
        '                    <th>School</th>',
        '                    <th>Problem</th>',
        '                    <th>Location</th>',
        '                    <th>Time Solved</th>',
        '                    <th>Score</th>',
        '                </tr>',
        placeholderMessage,
        ...scoreRows,
        '            </tbody>',
        '        </table>',
    ].join('\n');

    const filterMessage = schoolFilter ? '' : '        <p>Filter to a location: <a href="?school=byu">BYU</a>, <a href="?school=utah">Utah</a>, or <a href="?school=usu">USU</a>.</p>';
    const html = [
        '<html>',
        headerContent,
        '    <body>',
        '        <div class="container">',
        '        <h1>LPC Balloon Queue</h1>',
        filterMessage,
        tableContents,
        '        </div>',
        scriptContents,
        '    </body>',
        '</html>',
    ].join('\n');

    return html;
}