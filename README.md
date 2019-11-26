# Graphql-Blog
The client of https://github.com/rdok/graphql-blog.api

## Dev
### Installation
Copy .env.example to .env, and fill the variables. This requires docker & 
docker-compose as well. 

### Usage
The script `workbench.sh` creates a detached running docker container with all 
the relevant tools installed out of the box. Thus making docker the only 
development dependency. By running in a detached state, and sharing the source 
code with it, we achieve a maximum performance.

Usages:
- $ `./workbench.sh npm install {package} --save`
- $ `./workbench.sh node --version`

#### Web Server
$ `./workbench.sh npm start`

The .env.example has sensible defaults for the port used by parcel. You can
modify the port if there is a conflict in your local machine. 


