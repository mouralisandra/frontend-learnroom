
# Stage 1: Install dependencies
FROM node:18 as install

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm ci

# Stage 2: Build the angular app
FROM install as build

WORKDIR /usr/src/app

COPY . .

RUN npm run build

# Stage 3: Create the final image
FROM nginx

LABEL authors="sandra"

COPY --from=build /usr/src/app/dist/learnroom-frontend-angular /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
