#!/bin/bash

yarn run test --coverage --verbose --runInBand
yarn run build
yarn run lint
