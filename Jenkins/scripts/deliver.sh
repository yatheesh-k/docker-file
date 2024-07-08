#!/usr/bin/env sh

npm run build

npm start &
sleep 1
echo $! > .pidfile

echo 'Now...'
echo 'Visit http://192.168.33.10:3000 to see your Node.js/React application in action.'
