FROM node:14-alpine as build
ARG PROJECT_DIR
ARG PROJECT_DOMAIN
ARG BACKEND_URL
ARG MSKLINK_URL
ARG APKLINK_URL
ARG ENVFILE
ENV HOST 0.0.0.0
WORKDIR /app
COPY $ENVFILE package.json yarn.lock ./
RUN yarn install --silent
RUN apk update && apk add bash && apk add gettext
RUN envsubst < $ENVFILE > .env
COPY . .
RUN yarn build

FROM node:14-alpine
ARG PROJECT_DIR
ARG PROJECT_DOMAIN
ARG BACKEND_URL
ARG MSKLINK_URL
ARG APKLINK_URL
ARG ENVFILE
ENV HOST 0.0.0.0
WORKDIR /app
COPY --from=build /app  .
EXPOSE 3000
CMD [ "yarn", "start" ]
