FROM node:alpine

WORKDIR .

COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 5173

CMD [ "npm", "run", "dev" ]