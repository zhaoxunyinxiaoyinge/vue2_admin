import ClipboardJS from "clipboard";

export function copyText(btn, value) {
  let clipboard = new ClipboardJS(btn, {
    text() {
      return "大傻逼";
    }
  });
  clipboard.on("success", function(e) {
    e.clearSelection();
  });

  clipboard.on("error", function(e) {
    console.error("Action:", e.action);
    console.error("Trigger:", e.trigger);
  });
}
