# Vena On/Off-boarding
## A meteor app made for easier on/off-boarding at [Vena Solutions](http://venasolutions.com/)

### Installation
```
~$ curl https://raw.githubusercontent.com/marceloneil/VenaForm/master/install.sh | sh
```
OR
```
~$ curl https://install.meteor.com/ | sh
~$ meteor create form
~$ cd form
~/form$ rm form.*
~/form$ rm install.sh
~/form$ git clone https://github.com/marceloneil/VenaForm.git
~/form$ meteor remove blaze-html-templates
~/form$ meteor remove ecmascript
~/form$ meteor remove twbs:bootstrap
~/form$ meteor remove insecure
~/form$ meteor add angular
~/form$ meteor add angularui:angular-ui-router
~/form$ meteor add angular:angular-material
~/form$ meteor add dotansimha:accounts-ui-angular
~/form$ meteor add accounts-google
~/form$ meteor add service-configuration
```
### Configuration

There are four items which must be configured:  
1. Google Client Id
2. Google Client Secret
3. Website URL
4. Email list

The Google client id and secret can be modified in the `service.js` file under `system/service.js`

```
ServiceConfiguration.configurations.remove({
  service: "google"
});
ServiceConfiguration.configurations.insert({
  service: "google",
  clientId: "<Client ID>",
  loginStyle: "popup",
  secret: "<Secret>"
});
```

The website URL and email list can be modified in the `config.js` file under `client/config.js`

```
angular.module('vena').constant('emails', [
  'John Doe <john@example.com>',
  'Jane Doe <jane@example.com>'
]);

angular.module('vena').constant('link',
  'http://example.com'
);
```

### Running the application

The application can be run with the command `meteor` while in the root directory `form`. The application will run on `localhost:3000`, although the port number can be changed with the `--port` flag.
