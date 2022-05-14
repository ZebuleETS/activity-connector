FROM node:16

WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Production needed line
# RUN npm ci --only=production

COPY . .

EXPOSE 8080
CMD [ "node", "server.js" ]