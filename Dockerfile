
# Stage 1
FROM  node:18-alpine as build-step

# Create app directory
RUN mkdir -p /app

 # Set working directory
WORKDIR /app

# Install app dependencies
COPY package.json /app

# Install app dependencies
RUN npm install

# Bundle app source
COPY . /app

# Build app
RUN npm run build

# Stage 2

# Install nginx
FROM nginx:1.17.1-alpine

# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY --from=build-step /app/dist/app-pokemon /usr/share/nginx/html
