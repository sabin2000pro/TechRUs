FROM node:alpine AS dev
WORKDIR '/app'
COPY package.json .
COPY package-lock.json .
RUN npm install 
COPY . .
EXPOSE 5400
CMD [ "npm", "run", "start:auth-server"]