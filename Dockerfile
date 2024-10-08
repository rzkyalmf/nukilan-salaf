# 1. Choose Base Image / OS
FROM node:alpine

# 2. Define Working Directory
WORKDIR /usr/src/app

# 3. Copy Package.json to Workdir ./
COPY package*.json ./

# 4. Install Dependencies
RUN npm install

# 5. Copy all files to Workdir ./
COPY . .

# 6. Run the App
CMD ["npm", "run", "start"]