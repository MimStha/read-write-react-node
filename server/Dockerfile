# Base image
FROM node:8.16.0-alpine
# Set the working directory
WORKDIR /usr/src/app
# copy package.json into the container
COPY . .
# install dependencies
RUN npm install
# Expose the PORT
EXPOSE 5000
# Run the app when the container launchesCMD ["npm", "start"]
CMD [ "npm", "start" ]
