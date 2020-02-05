import unified from "unified";
import markdownParser from "remark-parse";
import html from "remark-html";

export const markdownToHTML = (content: string) =>
  unified()
    .use(markdownParser)
    .use(html)
    .processSync(content);

export const exportJson = (el: HTMLAnchorElement, uidl) => {
  const data =
    "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(uidl));

  el.setAttribute("href", "data:" + data);
  el.setAttribute("download", "uidl.json");
};
