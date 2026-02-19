FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./

# a lockfile biztositja hogy ponotsan a lockfileban levo verziok telepulejenk
RUN npm ci --frozen-lockfile

COPY . .

RUN npm run build

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]