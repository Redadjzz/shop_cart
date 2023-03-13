FROM node:14-alpine

WORKDIR /app

RUN apk add --no-cache git

COPY package*.json ./

RUN npm install --only=prod

COPY . .

EXPOSE 8081

CMD [ "npm", "start" ]
