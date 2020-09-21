# To be run like this:
#   python3 -m pytest -v test/test_temperature_sensor.py
#   python3 -m pytest -k 'test_run_shell_cmd' -v test/test_temperature_sensor.py

import pytest
import os
import re
from test_utils.io import *
from test_utils.systemd import *
from test_utils.shell import *

temperature_gather_service = "temperature-gather.service"
temperature_upload_service = "temperature-upload.service"
temperature_upload_timer = "temperature-upload.timer"


def test_temperature_gather_service_enabled_running():
    assert is_service_enabled(temperature_gather_service)
    assert is_service_running(temperature_gather_service)


def test_temperature_gather_service_creates_data():
    (rc, output) = run_in_shell(
        f"systemctl status {temperature_gather_service}")
    output_concatendated = "".join(output)
    assert re.match(r"(.*)(Logged ')(.*)(' to /var/log/temperature/*)(.*)",
                    output_concatendated), "Data gathering seems to have problems!"


def test_temperature_upload_service_enabled():
    assert is_service_enabled(temperature_upload_service)


def test_temperature_upload_timer_enabled():
    assert is_service_enabled(temperature_upload_timer)


def test_temperature_upload_service_does_not_fail():
    (rc, output) = run_in_shell(
        f"systemctl status {temperature_upload_service}")
    output_concatendated = "".join(output)
    assert "successfully uploaded data to firebase" in output_concatendated, "Upload to firebase seems to have failed!"
    assert "Data persisted successfully" in output_concatendated, "Upload to firebase seems to have failed!"

@pytest.mark.parametrize(
    'directory', ["/opt/temperature", "/var/log/temperature"])
def test_directories_exist(directory):
    assert is_dir(directory)


@pytest.mark.parametrize(
    'file', ["/opt/temperature/temperature-gather.py", "/opt/temperature/temperature-upload.py",
             "/var/log/temperature/temps.csv", "/var/log/temperature/temps_big.csv", "/var/log/temperature/temps.json"])
def test_files_exist(file):
    assert is_file(file)
    assert os.path.getsize(file) > 0
