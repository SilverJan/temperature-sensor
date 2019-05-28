# temperature-sensor

This is a small application which runs on a Raspberry Pi with connected temperature and humidity sensor.

## How to run it

To run in foreground

	python temp.py

To run in background
	
	python temp.py &

To run in background and despite no active terminal session

	nohup python temp.py &

And get it back with

    fg

## Manage upload frequency

By manipulating the crontab

	crontab -e

And edit

	*/5 * * * * python /home/pi/dev/temperature-sensor/upload.py
	*/5 * * * * /home/pi/dev/temperature-sensor/upload-firebase.sh > /dev/null


## Manage Firebase

If the database is full, and you want to run a backup, follow these steps:

1) SSH on the server
2) Move the existing data to a backup

		cd /logs
		mv temps.json temps_01-21_until_05-27.json
		mv temps_big.csv temps_big_01-21_until_05-27.csv

3) Remove all existing data from the Firebase database

		sudo firebase --project temperature-sensor-228507 database:remove /data/*

Now the database is empty again and can be refilled