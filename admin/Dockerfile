FROM node:10.8.1-alpine

WORKDIR /src/app

COPY package*.json ./

RUN npm install --silent

COPY . .

EXPOSE 5174

CMD ["npm", "run", "dev"]
