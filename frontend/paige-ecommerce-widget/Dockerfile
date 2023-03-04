# Use Node.js LTS version
FROM node:lts AS build

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Build the app
RUN npm run build --prod

# Use a lightweight Nginx image
FROM nginx:stable-alpine

# Copy the build output to Nginx's default public folder
COPY --from=build /usr/src/app/dist/paige-ecommerce-widget /usr/share/nginx/html

# Copy the custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the Nginx HTTP port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
