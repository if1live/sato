#!/bin/bash

cd server
yarn run gen-schema-types
yarn run build:prod
cd ..
