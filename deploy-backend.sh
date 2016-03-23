#!/bin/sh
. ~/.nvm/nvm.sh
. ~/.profile
. ~/.bashrc
nvm use v4
if [ ! -d "opentrav-backend" ]; then
  git clone git@gitlab.com:letsgonesia/opentrav-backend.git
fi
cd opentrav-backend
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
fuser -k 9876/tcp
PORT=9876 npm run server

