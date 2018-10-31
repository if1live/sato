#!/bin/bash

# execute in root

cd client
yarn run build
cd ..

cd server
npm run build:prod
cd ..

mkdir -p output
cp -r client/build output/client-build
cp -r server/dist output
cp -r server/playlists output
cp server/api.gql output/
cp server/package.json output/
cp server/package-lock.json output/

mkdir -p output/build
cp server/bindings/binding.node.linux-arm output/build/binding.node
