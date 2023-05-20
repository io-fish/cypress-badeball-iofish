const fs = require('fs');
const glob = require('glob');

// Set the paths to the repositories to compare
const repo1Path = '/path/to/repo1';
const repo2Path = '/path/to/repo2';

// Set the path to the feature files
const featureFilePath = '/path/to/feature/files/**/*.feature';

// Load the feature files from both repositories
const repo1Features = loadFeatureFiles(repo1Path, featureFilePath);
const repo2Features = loadFeatureFiles(repo2Path, featureFilePath);

// Compare the feature files
const duplicates = compareFeatureFiles(repo1Features, repo2Features);

// Log the results
console.log(`${duplicates.length} scenarios found in both repositories:`);
duplicates.forEach((scenario) => {
  console.log(`- ${scenario}`);
});

// Function to load feature files from a repository
function loadFeatureFiles(repoPath, featureFilePath) {
  const files = glob.sync(featureFilePath, { cwd: repoPath });
  const features = [];

  files.forEach((file) => {
    const content = fs.readFileSync(`${repoPath}/${file}`, 'utf8');
    const scenarios = content.match(/Scenario:.*/g) || [];
    scenarios.forEach((scenario) => {
      features.push(`${file}: ${scenario}`);
    });
  });

  return features;
}

// Function to compare feature files
function compareFeatureFiles(features1, features2) {
  const duplicates = [];

  features1.forEach((feature1) => {
    if (features2.includes(feature1)) {
      duplicates.push(feature1);
    }
  });

  return duplicates;
}
