# temperature-backend

Contains source code to build the `temperature-sensor-pi` Debian package, which installs temperature + humidity gathering & upload services
on the Raspberry Pi.

It expects a DH11 temperature sensor to be configured on your Raspberry Pi.

TODO: Add hardware & setup information

## How to install package

Install directly on your Raspberry Pi via

    make install

or

	./create_deb.sh
	sudo gdebi dist/temperature-sensor-pi_1.0.0_all.deb

Also ensure nodejs & npm is installed:

	sudo apt install nodejs npm
	sudo npm install -g firebase-tools

## How to monitor it

Two services are installed as part of the package installation:

* `temperature-gather.service` -> for gathering of data and appending to csv file, runs every 5 minutes
* `temperature-upload.service` -> for uploading of data to Firebase, runs every 15 minutes (via `temperature-upload.timer`)

Log data is created in `/var/log/temperature/`.

## How to debug issues

Run the following commands to get debug information on both services

	sudo systemctl status temperature-gather.service
	sudo systemctl status temperature-upload.service
	sudo systemctl list-timers --all # to show next run time

## How to test

After installation, run the following pytest for integration tests

    make run_tests

# TODOs

* [x] add more tests (e.g. if upload successful, data is created etc)
* [] add more documentation for setup
* [] fix venv for development on Ubuntu laptop
* [] improve Python code
* [] add docker based tests