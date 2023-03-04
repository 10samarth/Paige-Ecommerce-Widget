# Use Node.js LTS version
FROM node:lts

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Expose the Express HTTP port
EXPOSE 3000

# Start the Express app
CMD ["npm", "start"]
