#!/usr/bin/python3
# utility to create concatenated JSON file which can be upoaded to firebase
import csv
import json
import os
import subprocess
from config import LOG_DIR
# import firebase_admin
# from firebase_admin import credentials
# cred = credentials.Cert('')
# firebase_admin.initialize_app(cred, {'databaseURL':''})

csv_files = []
for file in os.listdir(LOG_DIR):
    if '.csv.2' in file or file == 'temps.csv':
        csv_files.append(file)

with open(LOG_DIR + 'temps_big.csv', 'w') as out_file:
    for f_name in csv_files:
        with open(LOG_DIR + f_name) as in_file:
            for line in in_file:
                out_file.write(line)

json_file_path = LOG_DIR + 'temps.json'

csv_file = open(LOG_DIR + 'temps_big.csv', 'r')
json_file = open(json_file_path, 'w')

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

# login with sudo firebase login --no-localhost
# has to be done one time & manually
rc = subprocess.call(
    list("sudo firebase --project temperature-sensor-228507 database:set /data {} -y".format(json_file_path).split(" ")))

if rc != 0:
    print("error while uploading data to firebase")
