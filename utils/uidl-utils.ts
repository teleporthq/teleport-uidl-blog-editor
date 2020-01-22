import { UIDLStateValueDetails } from "@teleporthq/teleport-types";
import unified from "unified";
import markdownParser from "remark-parse";

export const addRouteToUIDL = (fileName: string, uidl) => {
  const newRoute: UIDLStateValueDetails = {
    value: fileName,
    pageOptions: {
      navLink: `/${fileName}`
    }
  };
  uidl.root.stateDefinitions.route.values.push(newRoute);
  uidl.root.node.content.children.push(generateRouteNode(fileName));
  return uidl;
};

const parser = (content: string) =>
  unified()
    .use(markdownParser)
    .parse(content);

const generateRouteNode = (name: string) => {
  return {
    type: "conditional",
    content: {
      node: {
        type: "element",
        content: {
          elementType: "container",
          name: `${name}`,
          children: []
        }
      },
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

export const generateUIDLNodes = (content: string, name: string, uidl) => {
  const tree = parser(content);
  let uidlNode = {};
  const newComponent = {
    [name]: {
      name: name,
      node: {
        type: "element",
        content: {
          elementType: "container",
          children: []
        }
      }
    }
  };

  generateElementNodes(tree);

  const newUIDl = {
    ...uidl,
    components: {
      ...uidl.components,
      ...newComponent
    }
  };
  return newUIDl;
};

const generateElementNodes = tree => {
  tree.children.forEach(treeNode => {
    switch (treeNode.type) {
      case "paragraph": {
        if (treeNode.children) {
          generateElementNodes(treeNode);
        }
        console.log(treeNode, "paragrph");
        break;
      }
      case "heading": {
        console.log(treeNode, "heading");
        break;
      }
      case "link": {
        console.log(treeNode, "link");
        break;
      }
      case "text": {
        console.log(treeNode, "simple text node");
        break;
      }
      default:
        console.log(treeNode, "un-recognized node");
        break;
    }
  });
};

const generateStaticNode = (node, content: string, tagName: string) => {
  const staticNode = {
    type: "element",
    content: {
      elementType: tagName,
      children: [
        {
          type: "static",
          content
        }
      ]
    }
  };
};
