#!/bin/sh
. ~/.nvm/nvm.sh
. ~/.profile
. ~/.bashrc
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
if [ $LAST = $NEW ]; then
  kill $$
fi
npm install
bower install --allow-root
fuser -k 80/tcp
PORT=80 npm run server

