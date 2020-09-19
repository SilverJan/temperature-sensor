# temperature-sensor

This is a small application which runs on a Raspberry Pi with connected temperature and humidity sensor.

## How to install package

Install via

	./create_deb.sh
	sudo gdebi dist/temperature-sensor-pi_1.0.0_all.deb

## How to run it

Two services are installed as part of the package installation:

* temperature-gather.service -> for gathering of data and appending to csv file, runs every 5 minutes
* temperature-upload.service -> for uploading of data to Firebase, runs hourly

Log data is created in `/var/log/temperature/`.

## How to debug issues

Run the following commands to get debug information on both services

	sudo systemctl status temperature-gather.service
	sudo systemctl status temperature-upload.service
	sudo systemctl list-timers --all # to show next run time

## Manage Firebase

If the database is full, and you want to run a backup, follow these steps:

1) SSH on the server
2) Move the existing data to a backup

		cd /var/logs/temperature
		mv temps.json temps_01-21_until_05-27.json
		mv temps_big.csv temps_big_01-21_until_05-27.csv

3) Remove all existing data from the Firebase database

		sudo firebase --project temperature-sensor-228507 database:remove /data/*

Now the database is empty again and can be refilled