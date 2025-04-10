# client/Dockerfile

FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app and build it
COPY . .
RUN npm run build

# Install 'serve' to serve the build folder
RUN npm install -g serve

# Use serve to run the app on port 8080
CMD ["serve", "-s", "build", "-l", "8080"]
