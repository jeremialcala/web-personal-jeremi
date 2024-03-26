#!/bin/sh
docker rm -f jeremi.web-ones.com
docker rmi jeremei.web-ones.com
docker system prune -a -f
docker build -t jeremi.web-ones.com .
docker run -it -p 3000:3000 --network=host --name flix.web-ones.com --restart unless-stopped -d flix.web-ones.com
