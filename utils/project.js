const projectJSON = {
  $schema: "https://docs.teleporthq.io/uidl-schema/v1/project.json",
  name: "teleportProject",
  globals: {
    settings: {
      language: "en",
      title: "Show-off for a few capabilities"
    },
    assets: [
      {
        type: "font",
        path: "https://fonts.googleapis.com/css?family=Roboto"
      },
      {
        type: "style",
        content:
          "body{font-family: 'Roboto', sans-serif; color: #2c3e50; -webkit-font-smoothing: antialiased; font-size: 16px;}"
      }
    ],
    meta: [],
    manifest: {
      theme_color: "#822CEC",
      background_color: "#822CEC"
    },
    root: {
      name: "App",
      stateDefinitions: {
        route: {
          type: "string",
          defaultValue: "home",
          values: [
            {
              value: "home"
            }
          ]
        }
      }
    }
  }
};

export default projectJSON;
