# Cloud_class_project
This repository contains an implementation of Container based PaaS application named Bookarts where users can search and upload books and images.

# Prerequisites
* Amazon AWS account
* t2.large instance
* linux(lxc) containers on AWS instance
* npm on containers
* nodejs on containers
* mysql on containers

# Installing and Setting Up Prerequisites
* Refer https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html to start an instance
* To install linux containers use -> sudo apt-get install lxc
* To install npm use -> sudo apt-get install npm
* To install nodejs use -> npm install nodejs
* To install mysql use -> npm install mysql

# Steps involved 
The whole project was divided into five phases. The functionality and working of each phase is explained below -

* Phase 1 -> Upload a nodejs code on a lxc container that will echo sentences sent by client. For this phase we first setup a lxc container on the AWS instance. Then we installed nodejs on the container and uploaded a very simple code that listens for client requests and echoes them.

* Phase 2 -> Create seperate containers for frontend and backend. For this phase we created seperate containers for frontend and backend and then used REST API calls to establish communication between them. The frontend listened for any client requests and sent them to backend container where the actual processing happened.

* Phase 3 -> Introduce Load-balancing with multiple backends. For this phase we created multiple backend containers. All of them were running the same code but had different Ips. For load balancing we used a simple round robin algorithm that keeps a count of client requests and decides the backend container by calculating -> (number of client requests) % (number of backend containers) and increments the number of client requests each time it recieves a request.

* Phase 4 -> Introduce Database as a Service. For this phase we setup a seperate container for Database. We installed mysql on the container and created a database called Book_karts containing two tables -> 1)Books and 2)Photos. The Books table stores information about various books including -> 1) Name (varchar), 2) Author (varchar), 3) ISBN (varchar) and 4) Price (float). The photos table stores information about the images uploaded by different users including -> 1) Username (varchar), 2) Password (varchar), 3) Filename (varchar) and 4) Path (varchar). We used REST API calls to establish communication between the backend containers and Database container.

* Phase 5 -> Introduce Multi-tenancy. We have implemented Shared tables multi-tenancy where the same table is shared among various users and each of them can only perform the set of operations for which he/she has been granted permission. We have granted all the privileges for all the tables to admin and other users have not been given the privilege to alter the books table but they have alter permission for photos table.



 
