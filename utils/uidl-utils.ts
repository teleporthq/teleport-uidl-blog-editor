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
  // uidl.root.node.content.children.push(generateRouteNode(fileName));
  return uidl;
};

const parser = (content: string) =>
  unified()
    .use(markdownParser)
    .parse(content);

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
  return pages.filter(page => {
    return page.content.value !== name;
  });
};

export const generateUIDLNodes = (content: string, name: string, uidl) => {
  const tree = parser(content);

  const pages = filterPages(name, uidl);

  // TODO - Generate UIDL nodes from the parsed tree
  const generatedUIDL = generateUIDL(tree, generateElementNode("container"));
  // console.log(JSON.stringify(generatedUIDL, null, 2));
  const currentPage = generateRouteNode(name, generatedUIDL);

  uidl.root.node.content.children.push(currentPage, { ...pages });
  console.log(JSON.stringify(uidl, null, 2));
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
        const headingNode = generateHeadingNode(`h${treeNode.depth}`);
        if (treeNode.children) {
          generateUIDL(treeNode, headingNode);
        }
        parentNode.content.children.push(headingNode);
        return parentNode;
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
      case "code": {
        const codeBlockNode = generateCustomtNodeWithContent(treeNode.type, "");
        parentNode.content.children.push(codeBlockNode);
        return parentNode;
      }
      default: {
        const defaultNode = generateElementNode(
          htmlTagNameMapper(treeNode.type)
        );
        if (treeNode.children) {
          generateUIDL(treeNode, defaultNode);
        }
        parentNode.content.children.push(defaultNode);
        return parentNode;
      }
    }
  });

  return parentNode;
};

const htmlTagNameMapper = (tagType: string) => {
  const elements = {
    heading: "h2",
    emphasis: "em"
  };
  return elements[tagType] ? elements[tagType] : tagType;
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

const generateHeadingNode = tagName => {
  return {
    type: "element",
    content: {
      elementType: `${tagName}`,
      children: []
    }
  };
};

const generateCustomtNodeWithContent = (tagName: string, content: string) => {
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
