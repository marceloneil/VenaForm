#!/bin/sh

# This is the Vena On/Off-boarding install script!

curl https://install.meteor.com/ | sh
meteor create form
cd form
rm form.*
git clone https://github.com/marceloneil/VenaForm.git
rm install.sh
meteor remove blaze-html-templates
meteor remove ecmascript
meteor remove twbs:bootstrap
meteor remove insecure
meteor add angular
meteor add angularui:angular-ui-router
meteor add angular:angular-material
meteor add dotansimha:accounts-ui-angular
meteor add accounts-google
meteor add service-configuration
echo "The Vena On/Off-boarding form is ready to run!"
echo "Please configure the files as needed in README.md"
echo "Then type 'meteor' to run the application on localhost:3000"
