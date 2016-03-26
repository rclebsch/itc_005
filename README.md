ITC_005
=======

Requirements
------------
* Python 3.4
* Django 1.9
* MySQL 5.5 or superior

Suggested Dev Environment
-------------------------
Virtual Machine (VM) with [Ubuntu 14 amd64] (http://releases.ubuntu.com/14.04.4/ubuntu-14.04.4-server-amd64.iso)

## Installation

~~~
Apt-get update
apt-get install python3.4
apt-get install libmysqlclient-dev
apt-get install libtiff5-dev libjpeg8-dev zlib1g-dev libfreetype6-dev liblcms2-dev libwebp-dev tcl8.6-dev tk8.6-dev python-tk
apt-get install python3-pip
echo "alias python=/usr/bin/python3" >> ~/.bash_aliases
pip3 install --user mysqlclient
pip3 install django
pip3 install django-import-export
pip3 install Pillow
~~~

## Deploy local

1. Use a git client and download this repository in your local drive.
1. From sql/ folder run the full_dump script in your mysql. It should create the DB with all the required data to start.
1. Make the VM share the folder where the repository was cloned.
1. Go inside the VM and navigate to the root path of the cloned and shared repository.
1. Copy the itc_005/settings_template.py file to the same folder but named settings.py.
1. Open the recent settings.py and adjust the MySQL configuration.
1. From there you need to create a root user for the admin.
~~~
python manage.py createsuperuser
~~~

## Run the Django debug server

Go to the project root folder inside the VM and execute:
~~~
python manage.py runserver 0.0.0.0:80
~~~
This will start a web server in your VM on port 80.
Open your browser and type http://[your-VM-ip]/admin and use your superuser user/pass to manage the admin site.
Open your browser and type http://[your-VM-ip]/ and you will be redirected to the site home page.
