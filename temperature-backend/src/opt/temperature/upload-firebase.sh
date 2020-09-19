#!/usr/bin/env bash

# login with sudo firebase login --no-localhost
# has to be done one time & manually

DIR="/var/log/temperature/temps.json"
sudo firebase --project temperature-sensor-228507 database:set /data $DIR -y #--debug
