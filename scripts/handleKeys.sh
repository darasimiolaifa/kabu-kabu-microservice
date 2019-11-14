#!/usr/bin/env bash

echo "Changing the filenames of the original encryption keys..."
mv ./keys/private.pem  ./keys/privateOrig.pem
mv ./keys/public.pem  ./keys/publicOrig.pem

echo "Changing the filenames of the fake encryption keys..."
mv ./keys/fakePrivate.pem  ./keys/private.pem
mv ./keys/fakePublic.pem  ./keys/public.pem
