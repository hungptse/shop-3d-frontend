FROM node:12.2.0-alpine

WORKDIR /build

ENV PATH /build


COPY package.json /app/package.json

RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent

CMD ["npm", "start"]