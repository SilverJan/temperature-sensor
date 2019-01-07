#!/usr/bin/python
# Source: http://www.circuitbasics.com/how-to-set-up-the-dht11-humidity-sensor-on-the-raspberry-pi/
# Source: https://github.com/adafruit/Adafruit_Python_DHT/blob/master/examples/AdafruitDHT.py
import sys
import Adafruit_DHT as dht
import time
import csv

try:
	# buffering=0 to overwrite system default buffer
	# needed when Python runs in background
	file = open("/home/pi/dev/temperature-sensor/temps.log", "a", buffering=0)
	with open("/home/pi/dev/temperature-sensor/test.csv", mode='a') as csv_file:
		while True:
			timeNow = time.strftime("%Y-%m-%d %H:%M:%S")
			humidity, temperature = dht.read_retry(dht.DHT11, 4)
			if isinstance(humidity, str) or isinstance(temperature, str):
				print "Error while reading sensor data"
				continue;
			output = "{0} | T: {1:0.1f} H: {2:0.1f}".format(timeNow, temperature, humidity)
			output_arr = [timeNow, temperature, humidity]
			file.write(output + "\n")
			
			csv_writer = csv.writer(csv_file, quoting=csv.QUOTE_NONE)
			csv_writer.writerows([output_arr])
			
			time.sleep(60)

# If keyboard Interrupt is pressed
except KeyboardInterrupt:
    pass  			# Go to next line
