#!/usr/bin/python
# Source: http://www.circuitbasics.com/how-to-set-up-the-dht11-humidity-sensor-on-the-raspberry-pi/
# Source: https://github.com/adafruit/Adafruit_Python_DHT/blob/master/examples/AdafruitDHT.py
import sys
import Adafruit_DHT as dht
import time

try:
	# buffering=0 to overwrite system default buffer
	# needed when Python runs in background
	file = open("/home/pi/dev/temperature-sensor/temps.log", "a", buffering=0)
	while True:
		timeNow = time.asctime(time.localtime(time.time()))
		humidity, temperature = dht.read_retry(dht.DHT11, 4)
		output = "{0} | Temp: {1:0.1f} Humidity: {2:0.1f}".format(timeNow, temperature, humidity)
		#print output
		file.write(output + "\n")
		time.sleep(60)

# If keyboard Interrupt is pressed
except KeyboardInterrupt:
    pass  			# Go to next line
