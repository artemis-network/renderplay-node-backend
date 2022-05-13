docker stop renderverse-server
docker rm renderverse-server
docker rmi renderverse/renderscan
docker build -t renderverse/renderscan .
docker run -p 5000:5000 --name renderverse-server -d --env-file .env renderverse/renderscan
docker ps -a