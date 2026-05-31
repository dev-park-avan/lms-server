<!-- Here are the most common Docker commands you'll use for your Node.js + Prisma project.

1. Build Image
   docker build -t lms-server .

Force a fresh build:

docker build --no-cache -t lms-server . 2. Run Container

Using your .env file:

docker run -d \
 --name lms-server-container \
 --env-file .env \
 -p 5000:5000 \
 lms-server

Windows Git Bash:

docker run -d --name lms-server-container --env-file .env -p 5000:5000 lms-server 3. View Running Containers
docker ps

All containers:

docker ps -a 4. View Logs
docker logs lms-server-container

Live logs:

docker logs -f lms-server-container 5. Execute Commands Inside Container

Open shell:

docker exec -it lms-server-container sh

For Debian images:

docker exec -it lms-server-container bash 6. Run Prisma Migrations

One-time migration:

docker run --rm \
 --env-file .env \
 lms-server \
 npx prisma migrate deploy 7. Generate Prisma Client
docker run --rm \
 --env-file .env \
 lms-server \
 npx prisma generate 8. Stop Container
docker stop lms-server-container 9. Start Existing Container
docker start lms-server-container 10. Restart Container
docker restart lms-server-container 11. Remove Container
docker rm lms-server-container

Force remove:

docker rm -f lms-server-container 12. Remove Image

List images:

docker images

Remove image:

docker rmi lms-server

Force remove:

docker rmi -f lms-server 13. Complete Clean Rebuild

When things get messy:

docker rm -f lms-server-container

docker rmi -f lms-server

docker build --no-cache -t lms-server .

docker run -d \
 --name lms-server-container \
 --env-file .env \
 -p 5000:5000 \
 lms-server 14. Verify App Is Running
docker ps

Then:

curl http://localhost:5000

Or open:

http://localhost:5000 -->

<!-- ------------------------------------------------------------ -->

<!--
docker rm -f lms-server-container

docker build --no-cache -t lms-server .

docker run -d \
 --name lms-server-container \
 --env-file .env \
 -p 5000:5000 \
 lms-server

docker logs -f lms-server-container -->
