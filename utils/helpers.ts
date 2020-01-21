export const exportJson = (el, uidl) => {
  const data =
    "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(uidl));

  el.setAttribute("href", "data:" + data);
  el.setAttribute("download", "uidl.json");
};
