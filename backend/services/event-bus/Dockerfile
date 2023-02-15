FROM node:alpine AS dev
WORKDIR '/app'
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
ENV NODE_ENV = development
EXPOSE 5000
RUN npm run build:bus
CMD [ "npm", "run", "start:event-bus:dev" ]