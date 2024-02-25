const fetch = require('node-fetch');

const repositories = [
  {
    owner: 'epignosis',
    repo: 'bdd',
    path: '/talentlms',
  },
  {
    owner: 'ypsaros',
    repo: 'cypress-badeball-iofish',
    path: 'cypress',
  },
];

const promises = repositories.map(({ owner, repo, path }) => {
  return fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`)
    .then(res => res.json())
    .then(files => Array.isArray(files) ? files.map(file => file.path) : []);
});

Promise.all(promises)
  .then(([files1, files2]) => {
    const folders1 = new Set(files1.map(path => path.split('/').slice(0, -1).join('/')));
    const folders2 = new Set(files2.map(path => path.split('/').slice(0, -1).join('/')));

    const commonFolders = Array.from(folders1).filter(folder => folders2.has(folder));
    const missingFolders1 = Array.from(folders1).filter(folder => !folders2.has(folder));
    const missingFolders2 = Array.from(folders2).filter(folder => !folders1.has(folder));

    console.log(`Number of folders for ${repositories[0].owner}/${repositories[0].repo}: ${folders1.size}`);
    console.log(`Number of folders for ${repositories[1].owner}/${repositories[1].repo}: ${folders2.size}`);
    console.log('\n');
    console.log(`Number of common folders: ${commonFolders.length}`);
    console.log(`Number of missing folders for ${repositories[0].owner}/${repositories[0].repo}: ${missingFolders1.length}`);
    console.log(`Number of missing folders for ${repositories[1].owner}/${repositories[1].repo}: ${missingFolders2.length}`);
    console.log('\n');
    console.log('Common folders:');
    commonFolders.forEach(folder => console.log(folder));
    console.log('\n');
    console.log('Missing folders for repository 1:');
    missingFolders1.forEach(folder => console.log(folder));
    console.log('\n');
    console.log('Missing folders for repository 2:');
    missingFolders2.forEach(folder => console.log(folder));
  })
  .catch(err => console.error(err));
