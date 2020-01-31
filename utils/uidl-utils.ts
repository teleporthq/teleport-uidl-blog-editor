import { UIDLStateValueDetails } from "@teleporthq/teleport-types";
import { markdownUIDLGenerator } from "@teleporthq/teleport-markdown-uidl-generator";

export const addRouteToUIDL = (fileName: string, uidl) => {
  const newRoute: UIDLStateValueDetails = {
    value: fileName,
    pageOptions: {
      navLink: `/${fileName}`
    }
  };
  uidl.root.stateDefinitions.route.values.push(newRoute);
  // uidl.root.node.content.children.push(generateRouteNode(fileName));
  return uidl;
};

const generateRouteNode = (name: string, uidlNodes) => {
  return {
    type: "conditional",
    content: {
      node: uidlNodes,
      value: `${name}`,
      reference: {
        type: "dynamic",
        content: {
          referenceType: "state",
          id: "route"
        }
      }
    }
  };
};

const filterPages = (name: string, uidl) => {
  const pages = uidl.root.node.content.children;
  if (pages.length > 0) {
    return pages.filter(page => {
      if (page && page.content) {
        return page.content.value !== name;
      }
    });
  }
  return [];
};

export const generateUIDLNodes = (content: string, name: string, uidl) => {
  const generator = markdownUIDLGenerator();
  const generatedUIDL = generator.parse(content);

  const pages = filterPages(name, uidl);
  const currentPage = generateRouteNode(name, generatedUIDL);

  uidl.root.node.content.children = [currentPage, ...pages];
  console.log(JSON.stringify(uidl, null, 2));

  return uidl;
};
