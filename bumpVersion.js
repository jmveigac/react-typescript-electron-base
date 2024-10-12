const fs = require('fs');
const path = require('path');
const packageJsonPath = path.resolve(__dirname, 'package.json');
const packageJson = require(packageJsonPath);

function incrementVersion(version) {
    const parts = version.split('.');
    parts[2] = parseInt(parts[2], 10) + 1; // Incrementa el patch version (x.y.z -> x.y.(z+1))
    return parts.join('.');
}

packageJson.version = incrementVersion(packageJson.version);

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
console.log(`Updated package.json to version ${packageJson.version}`);
