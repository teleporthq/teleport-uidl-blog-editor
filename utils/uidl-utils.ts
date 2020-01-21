import { UIDLStateValueDetails, ProjectUIDL } from "@teleporthq/teleport-types";
import marked from "marked";

export const addRouteToUIDL = (fileName: string, uidl) => {
  const newRoute: UIDLStateValueDetails = {
    value: fileName,
    pageOptions: {
      navLink: `/${fileName}`
    }
  };
  uidl.globals.root.stateDefinitions.route.values.push(newRoute);
  return uidl;
};

export const generateUIDLNodes = (content: string, uidl) => {
  const tokens = marked.lexer(content);
  tokens.forEach(token => {
    // generateUIDLNode(token)
  });
  return uidl;
};
