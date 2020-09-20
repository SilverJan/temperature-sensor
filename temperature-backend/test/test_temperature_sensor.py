# To be run like this:
#   python3 -m pytest -v test/test_temperature_sensor.py
#   python3 -m pytest -k 'test_run_shell_cmd' -v test/test_temperature_sensor.py

import pytest
from test_utils.io import *
from test_utils.systemd import *

temperature_services = [
    "temperature-gather.service", "temperature-upload.service"]

@pytest.mark.parametrize(
    'service', temperature_services)
def test_services_enabled(service):
    """Test if services are enabled"""
    assert is_service_enabled(service)

@pytest.mark.parametrize(
    'service', temperature_services)
def test_services_running(service):
    """Test if services are running"""
    assert is_service_running(service)

@pytest.mark.parametrize(
    'file', [""])
def test_directories_files_exist(file):
    assert is_file(file)
