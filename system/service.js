ServiceConfiguration.configurations.remove({
  service: "google"
});
ServiceConfiguration.configurations.insert({
  service: "google",
  loginStyle: "popup",
  clientId: "<Client ID>",
  secret: "<Secret>"
});
