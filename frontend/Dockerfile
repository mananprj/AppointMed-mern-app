FROM node:20-alpine

WORKDIR /src/app

COPY package*.json ./

RUN npm install --silent

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
