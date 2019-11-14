#!/usr/bin/env bash

rm -rf ../node_modules/@generated
mv ./node_modules/@generated ../node_modules/@generated
rm -rf ./node_modules/
echo "@generated folder successfully moved."

exit 0
