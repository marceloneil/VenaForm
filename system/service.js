ServiceConfiguration.configurations.remove({
  service: "google"
});
ServiceConfiguration.configurations.insert({
  service: "google",
  clientId: "<Client ID>",
  loginStyle: "popup",
  secret: "<Secret>"
});
