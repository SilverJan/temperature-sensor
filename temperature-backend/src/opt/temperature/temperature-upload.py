#!/usr/bin/python3
# utility to create concatenated JSON file which can be upoaded to firebase
import csv
import json
import os
import subprocess
from config import LOG_DIR
from utils import get_logger

syslogger = get_logger("temperature-upload")

# Detect all csv files (from logrotate)
csv_files = []
for file in os.listdir(LOG_DIR):
    if '.csv.2' in file or file == 'temps.csv':
        csv_files.append(file)

# Concatenate all csv files in a big file
csv_big_file_path = f"{LOG_DIR}/temps_big.csv"
with open(csv_big_file_path, 'w') as out_file:
    for f_name in csv_files:
        with open(f"{LOG_DIR}/{f_name}") as in_file:
            for line in in_file:
                out_file.write(line)

json_file_path = f"{LOG_DIR}/temps.json"
csv_file = open(csv_big_file_path, 'r')
json_file = open(json_file_path, 'w')

# Read concatenated CSV file and convert to JSON
count_rdr = csv.DictReader(csv_file)
total_rows = 0
for row in count_rdr:
    total_rows += 1
csv_file.seek(0)

field_names = ("date", "temperature", "humidity")
reader = csv.DictReader(csv_file, field_names)

json_file.write('[')
current_row = -1
for row in reader:
    current_row += 1
    json.dump(row, json_file)
    if current_row == total_rows:
        json_file.write(']')
    else:
        json_file.write(',\n')

# Upload data to firebase
# login with sudo firebase login --no-localhost
# has to be done one time & manually
syslogger.info("trying to upload data to firebase")
rc = subprocess.call(
    list(f"firebase --project temperature-sensor-228507 database:set /data {json_file_path} -y".split(" ")))

if rc != 0:
    syslogger.error("error while uploading data to firebase")
else:
    syslogger.info("successfully uploaded data to firebase")
