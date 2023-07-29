FROM node:18.17.0-alpine as build

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

EXPOSE $HTTP_PORT

CMD ["npm", "start"]