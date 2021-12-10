#!/usr/bin/bash


function error() {
  echo "$@"
  exit 1
}

version=$1

[ -n "$version" ] || error "missing version"

rm -rf output

sed -i "s/\"version\".*/\"version\": \"${version}\",/" actionManifest.json

npm run deploy