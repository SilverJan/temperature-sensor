const { gitDescribeSync } = require('git-describe');
const { version } = require('../package.json');
const { resolve, relative } = require('path');
const { writeFileSync } = require('fs-extra');

const gitInfo = gitDescribeSync('..', {
  dirtyMark: false,
  dirtySemver: false
});

console.log(__dirname)

gitInfo.version = version;
gitInfo.buildDate = new Date();

const file = resolve(__dirname, '..', 'src', 'environments', 'build.meta.ts');
writeFileSync(file,
  `// IMPORTANT: THIS FILE IS AUTO GENERATED! DO NOT MANUALLY EDIT OR CHECKIN!
/* tslint:disable */
export const BUILD_META = ${JSON.stringify(gitInfo, null, 4)};
/* tslint:enable */
`, { encoding: 'utf-8' });

console.log(`Wrote build meta data ${gitInfo.raw} to ${relative(resolve(__dirname, '..'), file)}`);
