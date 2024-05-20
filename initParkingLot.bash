#!/bin/bash

sudo apt-get update -y
sudo apt-get install -y git curl jq

# Install Node.js and npm
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g pm2

# Clone the repository
git clone https://github.com/NavehRoi/parkingLot.git
cd parkingLot

# Install application dependencies
npm install

# Retrieve MongoDB URI from AWS Systems Manager Parameter Store
MONGODB_URI=$(aws ssm get-parameter --name "MONGODB_URI" --with-decryption --query "Parameter.Value" --output text)

# Create .env file and add environment variables
cat <<EOF > .env
MONGODB_URI=$MONGODB_URI
EOF

node server.js

echo "Deployment completed successfully. Application is running on port 3000."


