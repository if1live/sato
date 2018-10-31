#!/bin/bash

npm run test -- --coverage --verbose --runInBand
npm run build
npm run lint
