FROM node:21-alpine3.18
 
WORKDIR /app
 
COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install -g npm@10.4.0
RUN npm install

EXPOSE 3000

COPY --chown=node:node . .


CMD [ "node", "--env-file=.env", "src/app.js" ]