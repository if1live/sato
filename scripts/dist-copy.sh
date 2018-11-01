#!/bin/bash

# execute in root

mkdir -p output
cp -rf client/build output/client-build
cp -rf server/dist output
cp -rf server/playlists output
cp -f server/api.gql output/
cp -f server/package.json output/
cp -f server/yarn.lock output/

mkdir -p output/build
cp -f server/bindings/binding.node.linux-arm output/build/binding.node
