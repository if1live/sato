#!/bin/bash

yarn run test -- --coverage --verbose --runInBand
yarn run build:prod
yarn run lint
