FROM mhart/alpine-node:11 AS builder
ENV NODE_ENV=development
WORKDIR /app
COPY . .
RUN yarn run build

FROM mhart/alpine-node
RUN yarn global add serve
WORKDIR /app
COPY --from=builder /app/build .
CMD ["serve", "-p", "80", "-s", "."]
