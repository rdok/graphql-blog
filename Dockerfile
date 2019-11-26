FROM node:12-alpine
WORKDIR /workbench
COPY package.json package-lock.json ./
RUN npm install
COPY . /workbench
RUN npm run build

FROM nginx:1.17-alpine
COPY --from=0 /workbench/dist /usr/share/nginx/html
