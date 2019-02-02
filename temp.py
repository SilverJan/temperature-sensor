#!/usr/bin/python
# Source: http://www.circuitbasics.com/how-to-set-up-the-dht11-humidity-sensor-on-the-raspberry-pi/
# Source: https://github.com/adafruit/Adafruit_Python_DHT/blob/master/examples/AdafruitDHT.py
import sys
import Adafruit_DHT as dht
import time
import csv
import logging
from logging.handlers import TimedRotatingFileHandler

try:
	logPath = "/home/pi/dev/temperature-sensor/logs/temps.log"
	csvPath = "/home/pi/dev/temperature-sensor/logs/temps.csv"

	logger = logging.getLogger("Rotating Log")
	logger.setLevel(logging.INFO)
	handler = TimedRotatingFileHandler(csvPath, when="d", interval=1, backupCount=500)
	formatter = logging.Formatter('%(message)s')
	handler.setFormatter(formatter)
	logger.addHandler(handler)
	# buffering=0 to overwrite system default buffer
	# needed when Python runs in background
	# file = open(logPath, "a", buffering=0)
#	with open(csvPath, mode='a') as csv_file:
	while True:
		timeNow = time.strftime("%Y-%m-%d %H:%M:%S")
		humidity, temperature = dht.read_retry(dht.DHT11, 4)
		if isinstance(humidity, basestring) or isinstance(temperature, basestring):
			print "Error while reading sensor data"
			continue;
		output = "{0},{1:0.1f},{2:0.1f}".format(timeNow, temperature, humidity)
		#output = "{0:0.1f},{1:0.1f}".format(temperature, humidity)
		output_arr = [timeNow, temperature, humidity]
		#file.write(output + "\n")
		
		#csv_writer = csv.writer(csv_file, quoting=csv.QUOTE_NONE)
		#csv_writer.writerows([output_arr])
		
		logger.info(output)
		
		time.sleep(300)

# If keyboard Interrupt is pressed
except KeyboardInterrupt:
    pass  			# Go to next line
