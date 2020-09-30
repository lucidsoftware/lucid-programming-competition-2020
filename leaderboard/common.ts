import * as escape from 'escape-html';
import * as rp from 'request-promise-native';
import * as tough from 'tough-cookie';

const cookie = new tough.Cookie({
  key: '_hrank_session',
  value: process.env['HACKERRANK_AUTH'],
  domain: 'www.hackerrank.com',
  httpOnly: true,
  maxAge: 31536000
});

const cookiejar = rp.jar();
cookiejar.setCookie(cookie, 'https://www.hackerrank.com');

export const FREEZE_LEADERBOARD_IN_FINAL_HOUR = true;
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
        return rp({
            method:'GET',
            uri: rest_url + `?limit=${BATCH_SIZE}&offset=${page*BATCH_SIZE}`,
            jar: cookiejar,
            json: true
        }) as Promise<any>;
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

export async function getChallenges(): Promise<Challenge[]> {
    const REST_CHALLENGES_URL = REST_URL + '/challenges/';
    const result = await getRestfulArray(REST_CHALLENGES_URL);

    return result.map(challenge => {
        return {
            name: challenge.name,
            slug: challenge.slug,
        };
    });
}

export async function getProfile(username: Username): Promise<Profile> {
    const USER_URL_BASE =
        'https://www.hackerrank.com/rest/contests/master/hackers/';
    const rawProfile = (await rp({
        method: 'GET',
        uri: USER_URL_BASE + username,
        jar: cookiejar,
        json: true,
    })).model;
    const bioLines = (rawProfile.short_bio || '').split('\n');

    return {
        username: escape(rawProfile.username),
        school: escape(bioLines[0] || '').toLocaleLowerCase(),
        teamNumber: +(bioLines[1] || '') || 0,
        teamName: escape(bioLines[2] || ''),
};
}

export async function getSubmissions(): Promise<Submission[]> {
    const SUBMISSIONS_URL = REST_URL + `/judge_submissions/`;
    const result = await getRestfulArray(SUBMISSIONS_URL);

    const seen = {};
    return result.filter(submission => {
        if(seen[submission.id]) {
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

export function getSanitizedSchoolFilter(rawFilter: string|undefined): string {
    const lowerCaseFilter = (rawFilter || '').toLocaleLowerCase();
    return (lowerCaseFilter in schoolNameMap) ? lowerCaseFilter : '';
}

export function isSubmissionValid(submission: Submission, correctOnly: boolean): boolean {
    const isCorrect = submission.status == 'Accepted';
    const inBounds = submission.inContestBounds;
    const duringFinalHour = FREEZE_LEADERBOARD_IN_FINAL_HOUR && submission.timeFromStart > 3*60;
    return (!correctOnly || isCorrect) && inBounds && !duringFinalHour;
}

export function timeToString(time: number): string {
    const minutes = Math.abs(time);
    const hours = Math.floor(minutes/60);
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