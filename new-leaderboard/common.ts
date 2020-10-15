import axios from "axios";
import {TTLCache} from "./ttlcache";

const cookie = process.env["HACKERRANK_AUTH"];

export const FREEZE_LEADERBOARD_IN_FINAL_HOUR = false;
export const CONTEST_SLUG = process.env['CONTEST_SLUG'];

export const BATCH_SIZE = 100;
export const PUBLIC_CONTEST_URL = `https://www.hackerrank.com/contests/${CONTEST_SLUG}`;
export const PUBLIC_CHALLENGES_URL = PUBLIC_CONTEST_URL + `/challenges/`;
export const REST_URL = `https://www.hackerrank.com/rest/contests/${CONTEST_SLUG}`;

export const schoolNameMap = {
    'byu': 'BYU',
    'usu': 'USU',
    'uofu': 'UofU',
    'osu': 'OSU',
    'cu': 'CU',
};

export type Slug = string;
export type Username = string;

export interface Profile {
    username: Username;
    school: string;
    teamNumber: number;
    teamName: string;
}

export type Status = "Accepted" | "Compilation error" | "Runtime Error" | "Segmentation Fault" | "Terminated due to timeout" | "Wrong Answer";

export interface Submission {
    id: number;
    username: Username;
    challenge: Challenge;
    status: Status;
    timeFromStart: number; // minutes
    inContestBounds: boolean;
}

export interface Challenge {
    name: string;
    slug: string;
}

export async function getRestfulArray(rest_url: string): Promise<any[]> {
    async function getRestfulPage(page: number): Promise<any> {
        const response = await axios.get(rest_url + `?limit=${BATCH_SIZE}&offset=${page * BATCH_SIZE}`, {
            headers: {
                'Cookie': cookie,
                'User-Agent': 'Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:81.0) Gecko/20100101 Firefox/81.0',
            }
        })

        return response.data;
    }

    const results: any[] = [];
    const firstPage = await getRestfulPage(0);
    results.push(...firstPage.models);

    const numRemainingRequests = Math.floor(firstPage.total / BATCH_SIZE);
    const remainingPageIndexes = [...Array(numRemainingRequests).keys()].map(x => x + 1);
    const remainingPromises = remainingPageIndexes.map(getRestfulPage);

    const raw_results = await Promise.all(remainingPromises);
    raw_results.forEach(raw_result => {
        results.push(...raw_result.models);
    });

    return results;
}


// export async function getProfile(username: Username): Promise<Profile> {
//     const USER_URL_BASE =
//         'https://www.hackerrank.com/rest/contests/master/hackers/';

//     const response = await axios.get(USER_URL_BASE + username, {
//         headers: {
//             'Cookie': cookie,
//             'User-Agent': 'Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:81.0) Gecko/20100101 Firefox/81.0'
//         }
//     })

//     const rawProfile = response.data["model"];

//     const bioLines = (rawProfile.short_bio || '').split('\n');

//     return {
//         username: escape(rawProfile.username),
//         school: escape(bioLines[0] || '').toLocaleLowerCase(),
//         teamNumber: +(bioLines[1] || '') || 0,
//         teamName: escape(bioLines[2] || ''),
//     };
// }

export const submissionsCache = new TTLCache<Promise<Submission[]>>(
    getSubmissions,
    1000 * 60 * 5 /* 5 minutes */
)

async function getSubmissions(): Promise<Submission[]> {
    const SUBMISSIONS_URL = REST_URL + `/judge_submissions/`;
    const result = await getRestfulArray(SUBMISSIONS_URL);

    const seen = {};
    return result.filter(submission => {
        if (seen[submission.id]) {
            return false;
        }
        seen[submission.id] = true;
        return true;
    }).map(rawSubmission => {
        return {
            id: rawSubmission.id,
            username: rawSubmission.hacker_username,
            challenge: {
                slug: rawSubmission.challenge.slug,
                name: rawSubmission.challenge.name,
            },
            status: rawSubmission.status,
            timeFromStart: rawSubmission.time_from_start,
            inContestBounds: rawSubmission.in_contest_bounds,
        };
    });
}

export const challengesCache = new TTLCache<Promise<Challenge[]>>(
    getChallenges,
    1000 * 60 * 20
)

async function getChallenges(): Promise<Challenge[]> {
    const REST_CHALLENGES_URL = REST_URL + '/challenges/';
    const result = await getRestfulArray(REST_CHALLENGES_URL);

    return result.map(challenge => {
        return {
            name: challenge.name,
            slug: challenge.slug,
        };
    });
}

export function groupByKey(data: any[], key: string): {} {
    const result = {};
    data.forEach(datum => {
        const value = datum[key];
        if (!(value in result)) {
            result[value] = [];
        }
        result[value].push(datum);
    });
    return result;
}

export function getSanitizedSchoolFilter(rawFilter: string | undefined): string {
    const lowerCaseFilter = (rawFilter || '').toLocaleLowerCase();
    return (lowerCaseFilter in schoolNameMap) ? lowerCaseFilter : '';
}

export function isSubmissionValid(submission: Submission, correctOnly: boolean): boolean {
    const isCorrect = submission.status == 'Accepted';
    const inBounds = submission.inContestBounds;
    const duringFinalHour = FREEZE_LEADERBOARD_IN_FINAL_HOUR && submission.timeFromStart > 3 * 60;
    return (!correctOnly || isCorrect) && inBounds && !duringFinalHour;
}

export function timeToString(time: number): string {
    const minutes = Math.abs(time);
    const hours = Math.floor(minutes / 60);
    let min: any = minutes - hours * 60;
    let seconds: any = Math.round((min - Math.floor(min)) * 60);
    min = Math.floor(min);
    if (min < 10) {
        min = '0' + min;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }

    return (time < 0 ? '-' : '') + hours + ':' + min + ':' + seconds;
}