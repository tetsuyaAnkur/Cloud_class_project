# This file contains all the common commands.

# install linux containers
sudo apt-get install lxc

# list all containers and view their current status
sudo lxc-ls -f

# create an ubuntu container named "work"
sudo lxc-create -t ubuntu -n work
   
# start a container named work
sudo lxc-start -n work -d           

# run ifconfig on the host to double-check gateway address
ifconfig 

# login to new container and update /etc/network/interfaces (NOT host, only container's etc/network/interfaces)
# replace dhcp w/ static using host's gateway and usually netmask 255.255.255.0
# /etc/network/interfaces will look like:
auto lo
iface lo inet loopback

auto eth0
iface eth0 inet static
 address 10.0.3.148
 netmask 255.255.255.0
 gateway 10.0.3.1

auto lo
iface lo inet loopback

auto eth0
iface eth0 inet static
 address 10.0.3.27
 netmask 255.255.255.0
 gateway 10.0.3.1
 dns-nameservers 8.8.8.8

# container will now autostart back at the ip address given to `address` line

sudo lxc-stop -n work               # stop container cleanly from outside (alternative to: $ sudo reboot)
sudo lxc-stop -n work -k            # kill
sudo lxc-destroy -n work            # destroy

# print list of containers again to find work's IP
sudo lxc-ls -f

# ssh into the container
ssh ubuntu@10.0.3.148

# become root user
sudo -s

#from root create sudo user w/ login/pass worker/working
useradd worker -g sudo -s /bin/bash -m && echo "worker:working" | chpasswd

# log out of the container to drop a public (open) port from host machine down into the container
sudo iptables -t nat -A PREROUTING -p tcp --dport 3000 -j DNAT --to-destination 10.0.3.148:3000

# view the chain list for active iptables rules
sudo iptables -t nat -n -L

# see everything
sudo iptables -vL --line-numbers

# delete a rule, now container's port 3000 will no longer be publicly addressable port from host's IP
sudo iptables -t nat -D PREROUTING -p tcp --dport 3000 -j DNAT --to-destination 10.0.3.148:3000

# proxy from a higher port to a lower port
sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 443 -j REDIRECT --to-port 3000

# create an iptables LOG chain
sudo iptables -N LOG

# Route INPUT/OUTPUT/FORWARD to LOG chain (substitute CHAIN with the chain you want to monitor, such as "INPUT"):
sudo iptables -A INPUT -j LOG

# Now log the packets with this command:
#sudo iptables -A LOG -m limit --limit 60/min -j LOG --log-prefix "IPTables DROP: " --log-level 7
sudo iptables -A LOGGING -m limit --limit 60/min -j LOG --log-prefix "IPTables-Dropped: " --log-level 7

# real time monitoring in ubuntu
sudo tail -f /var/log/syslog

# centOS
sudo tail -f /var/log/messages

# log back into container from new user and setup basic deps for node.js
sudo apt-get update && sudo apt-get upgrade -y
sudo apt-get install curl wget git-core

git clone https://github.com/creationix/nvm.git ~/.nvm
cd && echo -e "source .nvm/nvm.sh" >> ".bashrc"

# source profile or bashrc for the .nvm shell function added by the line above
source ~/.bashrc # or just logout/login, sometimes: $ source $HOME/.bashrc

# install some versions of node
nvm i 0.10 && nvm i 0.11 && nvm i 0.12 && nvm i iojs

# always set a default version
nvm alias default iojs

# to move into a different version
nvm use 0.12

# basic npm commands
npm install [package-name]

# use global to make the package a global executable (doesnt apply for every package)
npm i -g forever

# quick server scripting, setup your package.json
{
  "name":"whatever",
  "dependencies": {
    "ecstatic":"1.6.x"
  }
}

npm install # run this from the directory where your deps are listed in package.json

# start a server
var http = require('http');
var server = http.createServer( require('ecstatic')({

# handle static files in the script directory's subfolder: /public
  root: __dirname + '/public'

}));

server.listen(4000, function(){
  console.log('listening on 4000');
});
