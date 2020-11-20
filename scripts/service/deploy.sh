#!/bin/bash
set -euf -o pipefail

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
DIR_SRC="${DIR}/../../"
DIR_DEST="/Users/n8/Desktop/bp"

rm -rf "${DIR_DEST}"
mkdir -p "${DIR_DEST}"

rsync -avr \
  --exclude='.DS_Store' \
  --exclude='.circleci' \
  --exclude='.dockerignore' \
  --exclude='.eslintignore' \
  --exclude='.eslintrc.js' \
  --exclude='.gitattributes' \
  --exclude='.github' \
  --exclude='.gitignore' \
  --exclude='.graphql' \
  --exclude='.ini' \
  --exclude='.prettierignore' \
  --exclude='.prettierrc.js' \
  --exclude='.releaserc.js' \
  --exclude='.tmp' \
  --exclude='.vscode' \
  --exclude='CHANGELOG.md' \
  --exclude='LICENSE' \
  --exclude='README.md' \
  --exclude='apollo.config.js' \
  --exclude='commitlint.config.js' \
  --exclude='cypress' \
  --exclude='docker' \
  --exclude='jest.config.base.js' \
  --exclude='jest.config.js' \
  --exclude='lefthook.yml' \
  --exclude='lerna-debug.log' \
  --exclude='lerna.json' \
  --exclude='screenshot.png' \
  --exclude='*.log' \
  --exclude='*node_modules*' \
  --exclude='*.git*' \
  --exclude='*.DS_Store*' \
  --exclude='*.env' \
  --exclude='*.env.example' \
  --exclude='*.eslintrc.js' \
  --exclude='*.sentrycliignore' \
  --exclude='*.spec.js' \
  --exclude='*__mocks__*' \
  --exclude='*.md' \
  --exclude='*insomnia*' \
  --exclude='*jest.config.js' \
  --exclude='*nodemon.json' \
  --exclude='*Procfile' \
  --exclude='*packages/aws' \
  --exclude='*packages/tool-hook-generator' \
  --exclude='*packages/ui' \
  --exclude='*packages/ui-common' \
  --exclude='*scripts*' \
  "${DIR_SRC}" \
  "${DIR_DEST}" \
  ;

(
  cd "${DIR_DEST}/packages/common"

  echo -n "Add common workspace nohoist..."
  node -p "JSON.stringify({...require('./package.json'), workspaces: { nohoist: ['**'] } }, null, 2);" > package.json.tmp
  mv -f package.json.tmp package.json
  echo "done."

  echo -n "Installing dev dependencies..."
  yarn install
  echo "done."

  echo -n "Building service..."
  yarn build
  echo "done."
)

(
  cd "${DIR_DEST}/packages/service"

  echo -n "Add service workspace nohoist..."
  node -p "JSON.stringify({...require('./package.json'), workspaces: { nohoist: ['**'] } }, null, 2);" > package.json.tmp
  mv -f package.json.tmp package.json
  echo "done."

  echo -n "Installing dev dependencies..."
  yarn install
  echo "done."

  echo -n "Remove misc..."
  rm -rf \
    ./src/ \
    .postbuild \
    .prebuild \
    babel.config.js \
    ;
  echo "done."
)

echo -n "Removing build from package.json..."
sed -i '' '/^    "build"/d' ./package.json
echo "done."

echo -n "Installing production dependencies..."
yarn install --production --frozen-lockfile
echo "done."

echo -n "Building bundle..."
up build
echo "done."
