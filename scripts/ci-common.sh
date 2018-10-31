#!/bin/bash

npm run test -- --coverage --verbose --runInBand
npm run prepare
npm run lint
