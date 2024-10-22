FROM node:20
WORKDIR /usr/src/app
COPY yarn.lock package*.json ./
RUN yarn install
COPY . .
RUN yarn run build
EXPOSE 3000
CMD ["yarn", "run", "start:prod"]