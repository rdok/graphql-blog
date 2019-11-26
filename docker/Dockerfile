FROM node:12-alpine
COPY --chown=node:node package.json package-lock.json ./
RUN npm install --production
COPY --chown=node:node app /home/node/app
RUN npm run build

FROM nginx:1.17-alpine
COPY build /usr/share/nginx/html