const fetch = require('node-fetch');

const repositories = [
  {
    owner: 'ypsaros',
    repo: 'Cypress-cucumber',
    path: 'cypress/e2e',
  },
  {
    owner: 'ypsaros',
    repo: 'cypress-badeball-iofish',
    path: 'cypress/e2e/bfeatureFiles',
  },
];

const promises = repositories.map(({ owner, repo, path }) => {
  return fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`)
    .then(res => res.json())
    .then(files => files.filter(file => file.name.endsWith('.feature')).map(file => file.name));
});

Promise.all(promises)
  .then(([files1, files2]) => {
    const totalFiles = [...new Set([...files1, ...files2])];
    const commonFiles = files1.filter(file => files2.includes(file));
    const missingFiles = files1.filter(file => !files2.includes(file));
    const percentageDiff = ((files2.length - files1.length) / files1.length) * 100;
    const commonPercentage = (commonFiles.length / totalFiles.length) * 100;
    console.log(`Number of feature files for ${repositories[0].owner}/${repositories[0].repo}: ${files1.length}`);
    console.log(`Number of feature files for ${repositories[1].owner}/${repositories[1].repo}: ${files2.length}`);
    console.log('\n')
    console.log(`Number of common feature files: ${commonFiles.length} (${commonPercentage.toFixed(2)}%)`);
    console.log(`Number of missing feature files for ${repositories[1].owner}/${repositories[1].repo}: ${missingFiles.length} (${percentageDiff.toFixed(2)}%)`);
    console.log('\n')
    console.log('Common feature files:');
    commonFiles.forEach(file => console.log(file));
    console.log('\n')
    console.log('Missing feature files:');
    missingFiles.forEach(file => console.log(file));
  })
  .catch(err => console.error(err));
