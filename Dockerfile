FROM node:12-alpine

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

WORKDIR /home/node/.npm-global
RUN chown -R node:node /home/node/.npm-global

WORKDIR /home/node/app
RUN chown -R node:node /home/node/app

USER node

COPY package.json package-lock.json ./
RUN npm install --production

COPY --chown=node:node . .
RUN npm run build

CMD ["npm", "run", "production"]
