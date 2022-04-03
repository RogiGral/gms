# Gym management system  - Power Hour

Online platform that will help managing every kind of gym company.

## Initial setup

Steps to follow when starting this app for the first time in the new environment:

1. Create `.env` file in the same directory where `.env-sample` is located and configure env variables in `.env` file as described in `.env-example`.
2. Run `make up-dev` or `make up-dev-show-logs` to build and start all containers.

Containers should be running. You are ready to use this app.

NOTES:

1. When starting containers for the first time, there will be created `persistent_data` folder in the same directory where `docker-compose` files are located. Database instance will be saved in this folder. Thanks to this database and data in the database will be reusabe across app runs. When you want to create a new database instance it is enough to remove this folder before you start containers to have a preaty neat new, empty database instance.
2. Please check `Makefile` or run `make help` to see the full list of available commands to manage this app. e.g to stop containers you may run `make clean-dev` or `make stop-dev`.
3. When getting familar with `Makefile` you may realize that there are commands that allow to serve this app via nginx. It is WIP. As for now, only `make dev-...` commands work properly.

## When working on BE features on IntelliJ

You should run database and frontend in containers when working on BE features in IntelliJ. Before you run the BE project in IntelliJ you should run `make up-dev containers='db frontend'`.  This command will start only database and frontend containers. Database should be accesible on `locahost:5432` and frontend on `localhost:3000`.

## When working on FE features

I strongly recommend working on FE features fully in running docker containers. Frontend container should be accesible on `localhost:3000`. It has **HOT RELOAD** logic configured. Every change in the `src` folder will automatically cause the frontend to be rerendered. It is enough to run `make up-dev` to get db, api and frontend working and ready to use. From the frontend container's perspective api should be accessible on `localhost:8081`. When you want to add new dependencies to the frontend project, there are 2 ways. You may do it inside docker container by running `docker exec -it gms_frontend_1 bash -c "npm install --save <your-package>"` or add this dependency outside the frontend container and rebuild containers after that e.g with command `make clean-dev && make up-dev`.
