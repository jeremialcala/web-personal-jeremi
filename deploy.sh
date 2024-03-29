#!/bin/sh
docker rm -f jeremi.web-ones.com
docker rmi jeremi.web-ones.com
docker system prune -a -f
docker build -t jeremi.web-ones.com .
docker run -it -p 3000:3000 --network=host --name jeremi.web-ones.com --restart unless-stopped -d jeremi.web-ones.com
