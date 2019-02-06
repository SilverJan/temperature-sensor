#!/usr/bin/env bash

# login with sudo firebase login --no-localhost
# has to be done one time & manually

DIR="/home/pi/dev/temperature-sensor/logs/temps.json"
sudo firebase --project temperature-sensor-228507 database:set /data $DIR -y #--debug
