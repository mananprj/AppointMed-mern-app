FROM node:20-alpine

WORKDIR /app

COPY package*.json .

RUN npm install --silent

COPY . .

EXPOSE 4000

CMD ["npm", "run", "server"]
