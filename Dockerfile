# =======================================================
# Stage 1 - Build/compile app using container
# =======================================================
# Build image has SDK and tools (Linux)
FROM node:12-alpine as build
WORKDIR /build

# add git ssh key to download self dependencies
WORKDIR /build/src

# Copy project source files
COPY package.json package.json
RUN npm i --registry=https://registry.npm.taobao.org

# build source code
COPY . ./
RUN npm run build

# # =======================================================
# # Stage 2 - Assemble runtime image from previous stage
# # =======================================================
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

COPY --from=build /build/src/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
