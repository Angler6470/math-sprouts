#!/usr/bin/env node
// Generate version.json for update detection
const fs = require('fs');
const path = require('path');

const packageJson = require('../package.json');

const versionInfo = {
  version: packageJson.version,
  buildTime: Date.now(),
  buildDate: new Date().toISOString()
};

const outputPath = path.join(__dirname, '../public/version.json');
const envPath = path.join(__dirname, '../.env.production.local');

fs.writeFileSync(outputPath, JSON.stringify(versionInfo, null, 2));

// Ensure CRA picks up build time during production builds
fs.writeFileSync(envPath, `REACT_APP_BUILD_TIME=${versionInfo.buildTime}\n`);

console.log(`✓ Generated version.json: v${versionInfo.version} (${versionInfo.buildDate})`);
