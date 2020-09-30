const util = require('util');
const glob = util.promisify(require('glob'));
const path = require('path');
const Zip = require('adm-zip');

/**
 * Run with `npm install` -> `node zipup.js`
 * 
 * This gathers up all the tests and zips them up in 
 * a way that HackerRank likes.
 */
(async () => {
    const files = await glob('**/tests/*.@(out|in)', {
        cwd: "problems"
    });

    const problems = [...new Set(files.map(f => path.dirname(path.dirname(f)))).values()];
    problems.forEach(async p => {
        const zip = new Zip();

        const input = await glob(`problems/${p}/tests/*.in`);
        const output = await glob(`problems/${p}/tests/*.out`);

        input.forEach(i => {
            zip.addLocalFile(i, 'input', `input0${path.basename(i, '.in').padStart(2, '0')}.txt`)
        });
        output.forEach(i => {
            zip.addLocalFile(i, 'output', `output0${path.basename(i, '.out').padStart(2, '0')}.txt`)
        });

        zip.writeZip(`./zips/${p}.zip`);
    });
})()