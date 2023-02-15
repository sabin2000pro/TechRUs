FROM node:alpine AS dev
WORKDIR '/app'
COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
COPY tsconfig.node.json .
COPY vite.config.ts .
RUN npm install
COPY . .
EXPOSE 3000
RUN npm run build
CMD [ "npm", "run", "dev"]