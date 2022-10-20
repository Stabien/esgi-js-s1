FROM node:alpine

WORKDIR /home/app

COPY package*.json ./
RUN npm install

# Bundle app source
COPY . ./

EXPOSE 5173

CMD [ "npm", "run", "dev" ]