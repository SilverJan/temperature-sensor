#!/usr/bin/python
import csv
import json
import glob, os

#import firebase_admin
#from firebase_admin import credentials
#cred = credentials.Cert('')
#firebase_admin.initialize_app(cred, {'databaseURL':''})

csvfiles = []
for file in os.listdir('logs'):
	if '.csv.2' in file:
		csvfiles.append(file)

with open('logs/temps_big.csv', 'w') as outfile:
	for fname in csvfiles:
		with open('logs/' + fname) as infile:
			for line in infile:
				outfile.write(line)

csvfile = open('logs/temps_big.csv','r')
jsonfile = open('logs/temps.json','w')

countrdr = csv.DictReader(csvfile)
totalrows = 0
for row in countrdr:
	totalrows += 1
csvfile.seek(0)

fieldnames = ("date", "temperature", "humidity")
reader = csv.DictReader(csvfile, fieldnames)

jsonfile.write('[')
currentrow = -1
for row in reader:
	currentrow += 1
	json.dump(row, jsonfile)
	if currentrow == totalrows:
		jsonfile.write(']')
	else:
		jsonfile.write(',\n')

# remove last line and ,
#with open(jsonfile, 'rb+') as filehandle:
#	filehandle.seek(-3, os.SEEK_END)
#	filehandle.truncate()
