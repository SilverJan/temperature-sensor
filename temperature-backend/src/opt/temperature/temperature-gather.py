#!/usr/bin/python3
# Source: http://www.circuitbasics.com/how-to-set-up-the-dht11-humidity-sensor-on-the-raspberry-pi/
# Source: https://github.com/adafruit/Adafruit_Python_DHT/blob/master/examples/AdafruitDHT.py
import logging
import time
from logging.handlers import TimedRotatingFileHandler
import adafruit_dht as dht
import board

from config import LOG_DIR

try:
    log_Path = "{}/temps.log".format(LOG_DIR)
    csv_Path = "{}/temps.csv".format(LOG_DIR)

    # log management
    logger = logging.getLogger("Rotating Log")
    logger.setLevel(logging.INFO)
    handler = TimedRotatingFileHandler(
        csv_Path, when="d", interval=1, backupCount=500)
    formatter = logging.Formatter('%(message)s')
    handler.setFormatter(formatter)
    logger.addHandler(handler)

    # instantiate device once
    dhtDevice = dht.DHT11(board.D4)

    # loop forever
    while True:
        print("Trying to gather data")
        time_now = time.strftime("%Y-%m-%d %H:%M:%S")
        temperature = dhtDevice.temperature
        humidity = dhtDevice.humidity
        if isinstance(humidity, str) or isinstance(temperature, str):
            print(
                "Error while reading sensor data . Values: {0};{1}".format(temperature, humidity))
            continue
        try:
            OUTPUT = "{0},{1:0.1f},{2:0.1f}".format(
                time_now, temperature, humidity)
        except ValueError:
            print("ValueError for values: {0}, {1}, {2}".format(
                time_now, temperature, humidity))
            continue
        else:
            print("Logged '{}' to {}. Sleeping for 1mins".format(OUTPUT, csv_Path))
            logger.info(OUTPUT)
            time.sleep(60)

except KeyboardInterrupt:
    pass
