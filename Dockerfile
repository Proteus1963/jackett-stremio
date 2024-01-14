FROM node:20-alpine3.19

WORKDIR /srv
EXPOSE 7000

# Config vars 
ENV RESPONSE_TIMEOUT=
ENV PORT=
ENV MIN_SEED=
ENV MAX_RESULTS=
ENV MAX_SIZE=
ENV JACKETT_HOST=
ENV JACKETT_RTIMEOUT=
ENV JACKETT_OTIMEOUT=
ENV MAX_QUEUE_SIZE=
ENV SEARCH_BY_TYPE=
ENV DEBUG=

COPY . .
RUN apk update && apk upgrade && rm -rf /var/cache/apk/*
RUN npm install

CMD ["node", "index.js"]
