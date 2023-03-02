FROM node:alpine AS dev
WORKDIR '/app'
COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
RUN npm install
COPY . .
ENV NODE_ENV = development
EXPOSE 6500
RUN npm run build:event-bus
CMD [ "npm", "run", "start:event-bus-service:dev" ]