FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 5003

CMD [ "npm", "run", "start-dev" ]
