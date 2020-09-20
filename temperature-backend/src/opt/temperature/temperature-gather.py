#!/usr/bin/python3
# Source: http://www.circuitbasics.com/how-to-set-up-the-dht11-humidity-sensor-on-the-raspberry-pi/
# Source: https://github.com/adafruit/Adafruit_Python_DHT/blob/master/examples/AdafruitDHT.py
import logging
import time
from logging.handlers import TimedRotatingFileHandler
import adafruit_dht as dht
import board

from config import LOG_DIR, CSV_LOG_FILE
from utils import get_logger

syslogger = get_logger("temperature-gather")

# log management (use logging module for rotating functionality)
csv_logger = logging.getLogger(
    "temperature-gather-csv-logger")
csv_logger.setLevel(logging.INFO)
handler = TimedRotatingFileHandler(
    CSV_LOG_FILE, when="d", interval=1, backupCount=500)
formatter = logging.Formatter('%(message)s')
handler.setFormatter(formatter)
csv_logger.addHandler(handler)

# instantiate device once
dhtDevice = dht.DHT11(board.D4)

# loop forever
while True:
    syslogger.info("Trying to gather data")
    time_now = time.strftime("%Y-%m-%d %H:%M:%S")

    # Gather data
    try:
        temperature = dhtDevice.temperature
        humidity = dhtDevice.humidity
    except RuntimeError as err:
        syslogger.warning(
            "RuntimeError detected. Continue after a short sleep.")
        time.sleep(1)
        continue

    # Verify that value is not string (in case of failure)
    if isinstance(humidity, str) or isinstance(temperature, str):
        syslogger.warning(
            f"Error while reading sensor data. Values: {temperature};{humidity}")
        continue

    try:
        OUTPUT = "{0},{1:0.1f},{2:0.1f}".format(
            time_now, temperature, humidity)
    except ValueError:
        syslogger.warning(
            f"ValueError for values: {time_now}, {temperature}, {humidity}")
        continue
    else:
        syslogger.info(
            f"Logged '{OUTPUT}' to {CSV_LOG_FILE}. Sleeping for 5mins")
        csv_logger.info(OUTPUT)
        time.sleep(300)
