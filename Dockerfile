FROM node:24-bookworm AS build

ARG VITE_BANNER_TITLE="Vegova timetable"
ARG VITE_APP_TITLE="Vegova timetable"
ARG VITE_API_PATH="https://vegova.home.sync.si/"

ARG VITE_PLAUSIBLE_SITE="v.sync.si"
ARG VITE_PLAUSIBLE_ENDPOINT="https://plausible.sync.si/api/event"

RUN apt-get -y update && apt-get -y install build-essential

WORKDIR /app
COPY .env .
COPY package.json .
RUN npm i
COPY . .
RUN npm run build

FROM nginx AS deploy

RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d/

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
