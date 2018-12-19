# Pizza delivery

Written with TypeScript, MongoDB and Docker

## Before get start
Copy .env-example and rename it to .env then fill env variables in .env

## How to run project?

For run project you need to install docker and docker-compose

After that just run 
```bash
docker-compose up
```

## How to run cli

To run cli first execute project environment vie:
```
docker-compose up -d
```
 Then run:
 ```
 docker ps
 // output after command
 CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                              NAMES
 4b063799ccd4        node:8.11.4         "npm start"              3 hours ago         Up 2 seconds        0.0.0.0:3000-3001->3000-3001/tcp   pizza-delivery-node_web_1
 55039e513f5b        mongo               "docker-entrypoint.s…"   3 hours ago         Up 3 seconds        27017/tcp                          pizza-delivery-node_db_1

 ```
 
 Then you need to get into node.js container via:
 ```
 docker exec -it pizza-delivery-node_web_1 /bin/bash
 ```
 After that you will be able to run command in node.js environment

So, to run CLI you should run
```
npm run cli
```
To see list of commands run *man* or *help*

## How to run tests

Do same steps as in *How to run cli*, but run `npm test` instead of `npm run cli`