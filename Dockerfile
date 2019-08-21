FROM anzerr/node:11
COPY . /app
RUN apk update && \
	apk upgrade && \
	apk --update add --no-cache --virtual .source-tools git build-base openssh-client findutils && \
	cd /app && \
	npm i --only=prod && \
	find /app -regextype egrep -regex ".*.(ts|map|md)$"  -type f -delete && \
	find /app -regextype egrep -regex ".*(Dockerfile|LICENSE)$"  -type f -delete && \
	apk del .source-tools && \
	rm -Rf /app/.git Dockerfile .gitignore dump.json LICENSE

FROM anzerr/node:slim-11
RUN mkdir -p /app/dist
COPY --from=0 /app/node_modules /app/node_modules
COPY --from=0 /app/bin /app/bin
COPY --from=0 /app/index.js /app/index.js
COPY --from=0 /app/package.json /app/package.json
WORKDIR /app
ENTRYPOINT ["node", "bin/index.js"]