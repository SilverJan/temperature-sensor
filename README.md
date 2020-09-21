# temperature-sensor

This is a small application which gathers temperature & humidity data from a DHT11 sensor on a Raspberry Pi.
The data is uploaded to a Firebase database and can be viewed in the frontend on the browser: https://silverjan.github.io/temperature-sensor/

It comprises of two components:

* `temperature-backend` - Debian package which installs systemd services that run data gathering & upload mechanisms
* `temperature-frontend` - Angular based frontend for graphical representation of the gathered data

For more details, check out the README.md's of the particular component.
