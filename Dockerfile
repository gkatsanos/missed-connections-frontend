FROM node:16-alpine

WORKDIR /app

ENV PORT 3000

# Expose port
EXPOSE $PORT
CMD [ "yarn", "serve" ]

COPY package.json yarn.lock /app/
COPY . /app
RUN yarn install && yarn cache clean
RUN yarn build
