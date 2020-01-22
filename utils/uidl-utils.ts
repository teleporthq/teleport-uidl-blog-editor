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
  // TODO - Generate UIDL nodes from the parsed tree
  const generatedUIDL = generateUIDL(tree, generateElementNode("container"));
  console.log(JSON.stringify(generatedUIDL, null, 2));

  // TODO - Append these generated nodes to the router node by developing the page node

  return uidl;
};

const generateUIDL = (tree, parentNode) => {
  tree.children.forEach(treeNode => {
    switch (treeNode.type) {
      case "paragraph": {
        // Pushing static node into the parent node
        const staticNode = generateElementNode("textblock");
        if (treeNode.children) {
          generateUIDL(treeNode, staticNode);
        }
        parentNode.content.children.push(staticNode);
        return parentNode;
      }
      case "heading": {
        return;
      }
      case "link": {
        const anchorNode = generateAnchorNode(treeNode.url);
        parentNode.content.children.push(anchorNode);
        if (treeNode.children) {
          generateUIDL(treeNode, anchorNode);
        }
        return parentNode;
      }
      case "text": {
        const textNode = generateStaticTextNode(treeNode.value);
        parentNode.content.children.push(textNode);
        return parentNode;
      }
      default:
        return;
    }
  });

  return parentNode;
};

const generateElementNode = (tagName: string) => {
  return {
    type: "element",
    content: {
      elementType: tagName,
      children: []
    }
  };
};

const generateAnchorNode = (target: string) => {
  return {
    type: "element",
    content: {
      elementType: "link",
      attrs: {
        url: {
          type: "static",
          content: `${target}`
        }
      },
      children: []
    }
  };
};

const generateTextNode = (content: string) => {
  return {
    type: "element",
    content: {
      elementType: "text",
      children: [
        {
          type: "static",
          content: `${content}`
        }
      ]
    }
  };
};

const generateStaticTextNode = (content: string) => {
  return {
    type: "static",
    content: `${content}`
  };
};
