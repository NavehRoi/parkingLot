#!/bin/bash

sudo yum update -y
sudo yum install git -y

curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo yum install -y nodejs
sudo npm install -g pm2

git clone https://github.com/NavehRoi/parkingLot.git
cd parkingLot

npm install

MONGODB_URI=$(aws ssm get-parameter --name "MONGODB_URI" --with-decryption --query "Parameter.Value" --output text)

cat <<EOF > .env
MONGODB_URI=$MONGODB_URI
EOF

node server.js

echo "Deployment completed successfully. Application is running on port 3000."


