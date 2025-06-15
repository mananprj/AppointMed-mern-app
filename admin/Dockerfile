FROM node:10.16-alpine

WORKDIR /src/app

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 5174

CMD ["npm", "run", "dev"]
