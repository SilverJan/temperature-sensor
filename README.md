# temperature-sensor

This is a small application which runs on a Raspberry Pi with connected temperature and humidity sensor.

It comprises of two components:

* `temperature-backend` - Debian package which installs systemd services that run data gathering & upload mechanisms
* `temperature-frontend` - Angular based frontend for graphical representation of the gathered data

For more details, check out the README.md's of the particular component.

## Manage Firebase

If the database is full, and you want to run a backup, follow these steps:

1) SSH on the Raspberry Pi
2) Move the existing data to a backup

		cd /var/logs/temperature
		mv temps.json temps_01-21_until_05-27.json
		mv temps_big.csv temps_big_01-21_until_05-27.csv

3) Remove all existing data from the Firebase database

		sudo firebase --project temperature-sensor-228507 database:remove /data/*

Now the database is empty again and can be refilled
