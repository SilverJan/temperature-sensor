#!/usr/bin/env bash

# login with sudo firebase login --no-localhost
# has to be done one time & manually

sudo firebase --project temperature-sensor-228507 database:set /data logs/temps.json -y