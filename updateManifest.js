const fs = require('fs');
const path = require('path');
const packageJson = require('./package.json');
const manifestPath = path.resolve(__dirname, 'public', 'manifest.json');
const manifest = require(manifestPath);

const oldManifest = JSON.parse(JSON.stringify(manifest));

manifest.short_name = packageJson.name;
manifest.name = packageJson.name;
manifest.version = packageJson.version;

if (JSON.stringify(oldManifest) !== JSON.stringify(manifest)) {
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log('Updated manifest.json with package.json data');
} else {
    console.log('No changes detected in manifest.json');
}
