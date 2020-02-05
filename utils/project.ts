import { ProjectUIDL } from '@teleporthq/teleport-types'
export const generateProjectUIDLTemplate = (
  blogName: string,
  blogDescription: string,
  font?: string
) => {
  const fontStlye = font ? font : `https://fonts.googleapis.com/css?family=Roboto`
  const projectUIDL: ProjectUIDL = {
    $schema: 'https://docs.teleporthq.io/uidl-schema/v1/project.json',
    name: `${blogName}`,
    globals: {
      settings: {
        language: 'en',
        title: `${blogDescription}`,
      },
      assets: [
        {
          type: 'font',
          path: fontStlye,
        },
        {
          type: 'style',
          content:
            "body{font-family: 'Roboto', sans-serif; color: #2c3e50; -webkit-font-smoothing: antialiased; font-size: 16px;}",
        },
      ],
      meta: [],
      manifest: {
        icons: [],
        theme_color: '#822CEC',
        background_color: '#822CEC',
      },
    },
    root: {
      name: 'App',
      stateDefinitions: {},
      node: {
        type: 'element',
        content: {
          elementType: 'Router',
          children: [],
        },
      },
    },
    components: {},
  }
  return projectUIDL
}
