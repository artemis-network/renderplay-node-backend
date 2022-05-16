npm run build
docker stop renderverse-backend-server
docker rm renderverse-backend-server
docker rmi renderverse/backend-server
docker build --no-cache -t renderverse/backend-server .
docker run -p 5000:5000 --restart=always --name renderverse-backend-server -d --env-file .env renderverse/backend-server
docker ps -a