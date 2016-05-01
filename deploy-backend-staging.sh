#!/bin/sh
. ~/.nvm/nvm.sh
. ~/.profile
. ~/.bashrc
nvm use v4
if [ ! -d "opentrav-backend-staging" ]; then
  git clone git@gitlab.com:letsgonesia/opentrav-backend.git
fi
cd opentrav-backend-staging
LAST=$(git log -1 --format="%H")
echo $LAST
git fetch origin
git checkout origin/master
NEW=$(git log -1 --format="%H")
echo $NEW
if [ $1 = "false" ]; then
  if [ $LAST = $NEW ]; then
    kill $$
  fi
fi
npm install
bower install --allow-root
fuser -k 4001/tcp
NODE_ENV=staging npm run setenv && MODE=staging PORT=4001 npm run server

