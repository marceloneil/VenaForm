# Vena On/Off-boarding

### A meteor app made for easier on/off-boarding at [Vena Solutions](http://venasolutions.com/)

### Installation

```
~$ curl https://install.meteor.com/ | sh
~$ git clone https://github.com/marceloneil/VenaForm.git
~$ cd VenaForm
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

The application can be run with the command `meteor` while in the root directory `VenaForm`. The application will run on `localhost:3000`, although the port number can be changed with the `--port` flag.
