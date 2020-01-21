import { UIDLStateValueDetails, ProjectUIDL } from "@teleporthq/teleport-types";
import marked from "marked";

export const addRouteToUIDL = (fileName: string, uidl) => {
  const newRoute: UIDLStateValueDetails = {
    value: fileName,
    pageOptions: {
      navLink: `/${fileName}`
    }
  };
  uidl.root.stateDefinitions.route.values.push(newRoute);
  return uidl;
};

export const generateUIDLNodes = (content: string, name: string, uidl) => {
  const tokens = marked.lexer(content);
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
  tokens.forEach(token => {
    switch (token.type) {
      case "paragraph": {
        const node = generateStaticNode(token.text, "p");
        newComponent[name].node.content.children.push(node);
      }
      case "heading": {
        const node = generateStaticNode(token.text, `h${token.depth}`);
        newComponent[name].node.content.children.push(node);
      }
    }
  });
  const newUIDl = {
    ...uidl,
    components: {
      ...uidl.components,
      ...newComponent
    }
  };
  return newUIDl;
};

const generateStaticNode = (content: string, tagName: string) => {
  return {
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
