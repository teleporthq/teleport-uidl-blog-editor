import { ComponentUIDL, ProjectUIDL, UIDLPageOptions } from '@teleporthq/teleport-types'
import { markdownUIDLGenerator } from '@teleporthq/teleport-markdown-uidl-generator'
import { generateProjectUIDLTemplate } from '../utils/project'
import { Files, BlogMeta } from '../utils/types'
import { capitalize } from '../utils/helpers'

const generateRouteNode = (name: string, nodes) => {
  return {
    type: 'conditional',
    content: {
      node: nodes,
      value: `${name}`,
      reference: {
        type: 'dynamic',
        content: {
          referenceType: 'state',
          id: 'route',
        },
      },
    },
  }
}

const generateRoutes = (files: Files) => {
  const routeNode = {
    route: {
      type: 'string',
      defaultValue: '/',
      values: [],
    },
  }
  Object.keys(files).forEach((fileId: string) => {
    const { slug, name, home } = files[fileId]
    const navLink = home ? `/` : `/${slug}`
    routeNode.route.values.push({
      value: slug,
      pageOptions: {
        navLink,
        componentName: capitalize(name),
      },
    })
  })
  return routeNode
}

export const generateProjectUIDL = (files: Files, meta: BlogMeta) => {
  const { blogName, blogDescription } = meta
  let projectUIDL: ProjectUIDL = generateProjectUIDLTemplate(blogName, blogDescription)
  const routes = generateRoutes(files)
  projectUIDL = {
    ...projectUIDL,
    root: {
      ...projectUIDL.root,
      stateDefinitions: {
        ...routes,
      },
    },
  }
  Object.keys(files).forEach((fileId: string) => {
    const { name, content, slug } = files[fileId]
    const uidl = generateUIDLNdoes(content)
    const route = generateRouteNode(slug, uidl)
    // @ts-ignore
    projectUIDL.root.node.content.children.push(route)
  })
  return projectUIDL
}

const generateUIDLNdoes = (markdown: string) => {
  const uidlGenerator = markdownUIDLGenerator()
  const uidlNodes = uidlGenerator.parse(markdown)
  return uidlNodes
}

export const generateComponentUIDL = (markdown: string, pageName?: string) => {
  const uidlNodes = generateUIDLNdoes(markdown)
  const uidl: ComponentUIDL = {
    name: pageName ? pageName : 'markdown-component',
    node: uidlNodes,
  }
  return uidl
}
