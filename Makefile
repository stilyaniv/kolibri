.PHONY: help clean clean-pyc release dist

help:
	@echo "clean-build - remove build artifacts"
	@echo "clean-pyc - remove Python file artifacts"
	@echo "release - package and upload a release"
	@echo "dist - package"

clean: clean-build clean-pyc

clean-build:
	rm -fr build/
	rm -fr dist/
	rm -fr dist-packages-cache/
	rm -fr dist-packages-temp/
	rm -fr *.egg-info
	rm -fr .eggs
	rm -fr .cache

clean-pyc:
	find . -name '*.pyc' -exec rm -f {} +
	find . -name '*.pyo' -exec rm -f {} +
	find . -name '*~' -exec rm -f {} +

dist: clean
	python setup.py sdist
	python setup.py bdist_wheel --universal

pubsubemulator:
	gcloud beta emulators pubsub start

simpletest:
	pip install --upgrade . && pytest --pdb
