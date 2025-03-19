#!/usr/bin/env bash

set -e

npm run docs:build

cd docs/.vitepress/dist

if [ ! -d ".git" ]; then
  git init
  git remote add origin git@github.com:Arendach/datatable.git
fi

git add -A
git commit -m "Deploy documentation"

git push -f origin master:docs

cd -
