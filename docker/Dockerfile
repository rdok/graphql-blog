FROM node:12-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production
COPY . .

ENV PUBLIC_URL="/"
ARG REACT_APP_GRAPHQL_BLOG_API_URL
RUN yarn run build

FROM nginx:1.17-alpine
COPY --from=0 /app/build /usr/share/nginx/html
