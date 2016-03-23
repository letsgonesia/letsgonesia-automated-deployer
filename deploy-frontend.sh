#!/bin/sh
. ~/.nvm/nvm.sh
. ~/.profile
. ~/.bashrc
echo "$1"
nvm use v4
if [ ! -d "opentrav-frontend" ]; then
  git clone git@gitlab.com:letsgonesia/opentrav-frontend.git
fi 
cd opentrav-frontend
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
fuser -k 80/tcp
PORT=80 npm run server

