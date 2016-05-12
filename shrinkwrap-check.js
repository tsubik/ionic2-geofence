#!/usr/bin/env node

/* eslint-env node */
/* eslint no-console: 0 */

const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const shrinkwrapPath = 'npm-shrinkwrap.json';

module.exports = function shrinkwrapCheck() {
  try {
    fs.accessSync(shrinkwrapPath);
  } catch (error) {
    console.error('npm-shrinkwrap.json file not found. Please run "npm shrinkwrap --dev" first.');
    process.exit(1);
  }

  const shrinkwrap = readFile(shrinkwrapPath);
  const dependencies = _(shrinkwrap.dependencies)
    .toPairs()
    .map((dependency) => (
      {
        name: dependency[0],
        version: dependency[1].version,
      }
    ));

  const hasPassed = dependencies
    .map(verifyDependency)
    .every((verification) => verification);

  if (!hasPassed) {
    console.error('\nSome installed dependencies are incorrect. Run "npm install" to fix it.');
    process.exit(1);
  }

  function readFile(filepath) {
    const file = fs.readFileSync(filepath);
    return JSON.parse(file);
  }

  function verifyDependency(dependency) {
    const packagePath = path.join('node_modules', dependency.name, 'package.json');
    const prefix = `${dependency.name}@${dependency.version}`;

    try {
      fs.accessSync(packagePath);
    } catch (error) {
      console.error(`${prefix}: missing.`);
      return false;
    }

    const installedVersion = readFile(packagePath).version;
    const requiredVersion = dependency.version;

    if (installedVersion !== requiredVersion) {
      console.error(`${prefix}: incorrect version installed ${installedVersion}.`);
      return false;
    }

    return true;
  }
};
