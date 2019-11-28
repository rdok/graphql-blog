FROM node:12-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production
COPY . .
RUN yarn run build

FROM nginx:1.17-alpine
COPY --from=0 /app/build /usr/share/nginx/html
