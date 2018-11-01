#!/bin/bash

yarn run test -- --coverage --verbose --runInBand
yarn run prepare
yarn run lint
