#!/usr/bin/python
# Source: http://www.circuitbasics.com/how-to-set-up-the-dht11-humidity-sensor-on-the-raspberry-pi/
# Source: https://github.com/adafruit/Adafruit_Python_DHT/blob/master/examples/AdafruitDHT.py
import Adafruit_DHT as dht
import time
import logging
from logging.handlers import TimedRotatingFileHandler

try:
    log_Path = "/home/pi/dev/temperature-sensor/logs/temps.log"
    csv_Path = "/home/pi/dev/temperature-sensor/logs/temps.csv"

    logger = logging.getLogger("Rotating Log")
    logger.setLevel(logging.INFO)
    handler = TimedRotatingFileHandler(csv_Path, when="d", interval=1, backupCount=500)
    formatter = logging.Formatter('%(message)s')
    handler.setFormatter(formatter)
    logger.addHandler(handler)
    # buffering=0 to overwrite system default buffer
    # needed when Python runs in background
    # file = open(logPath, "a", buffering=0)
    #	with open(csvPath, mode='a') as csv_file:
    while True:
        time_now = time.strftime("%Y-%m-%d %H:%M:%S")
        humidity, temperature = dht.read_retry(dht.DHT11, 4)
	if isinstance(humidity, basestring) or isinstance(temperature, basestring):
                print("Error while reading sensor data - Values: {0};{1}".format(temperature, humidity))
		continue
	try:
	        output = "{0},{1:0.1f},{2:0.1f}".format(time_now, temperature, humidity)
        except ValueError:
		print("ValueError for values: {0}, {1}, {2}".format(time_now, temperature, humidity))
		continue
	else:
		logger.info(output)
        	time.sleep(300)

except KeyboardInterrupt:
    pass  # Go to next line
