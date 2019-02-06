#!/usr/bin/python
import csv
import json
import os

# import firebase_admin
# from firebase_admin import credentials
# cred = credentials.Cert('')
# firebase_admin.initialize_app(cred, {'databaseURL':''})

csv_files = []
logs_dir = '/home/pi/dev/temperature-sensor/logs/'
for file in os.listdir(logs_dir):
    if '.csv.2' in file or file == 'temps.csv':
        csv_files.append(file)

with open(logs_dir + 'temps_big.csv', 'w') as out_file:
    for f_name in csv_files:
        with open(logs_dir + f_name) as in_file:
            for line in in_file:
                out_file.write(line)

csv_file = open(logs_dir + 'temps_big.csv', 'r')
json_file = open(logs_dir + 'temps.json', 'w')

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
