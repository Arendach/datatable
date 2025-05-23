#!/usr/bin/env bash

set -e

npm run docs:build

cd docs/.vitepress/dist

if [ ! -d ".git" ]; then
  git init
  git remote add origin ssh://git@github.com/Arendach/datatable.git
  git checkout -B master
fi

git add -A
git commit -m "Deploy documentation"

git push -f origin master:docs

cd -
