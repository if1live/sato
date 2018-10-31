#!/bin/bash

npm run test -- --coverage --verbose --runInBand
npm run build:prod
npm run lint
