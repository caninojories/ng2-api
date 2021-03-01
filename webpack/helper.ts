import * as path from 'path';
const rootPath = path.resolve(__dirname, '..');

function root(...args: any) {
  return path.join(...[rootPath].concat(args));
}

exports.root = root;
