import { readFileSync } from "fs-extra";
import { join } from "path";
/**
 * @zh 如果希望兼容 3.3 之前的版本可以使用下方的代码
 * @en You can add the code below if you want compatibility with versions prior to 3.3
 */
// Editor.Panel.define = Editor.Panel.define || function(options: any) { return options }
module.exports = Editor.Panel.define({
  listeners: {
    show() {
      console.log("show");
    },
    hide() {
      console.log("hide");
    },
  },
  template: readFileSync(
    join(__dirname, "../../../static/template/default/index.html"),
    "utf-8"
  ),
  style: readFileSync(
    join(__dirname, "../../../static/style/default/index.css"),
    "utf-8"
  ),
  $: {
    app: "#app",
  },
  methods: {
    hello() {
      if (this.$.app) {
        this.$.app.innerHTML = "hello";
        console.log("[cocos-panel-html.default]: hello");
      }
    },
    _loadFont(fontName: string, fontPath: string) {
      if (document) {
        // fixme url split
        fontPath = fontPath.replace(/\\/g, "//");
        const style = document.createElement("style");
        style.innerHTML = `
                @font-face{
                    font-family:${fontName};
                    src:url('${fontPath}');
                }
                body{
                    font-family:${fontName};
                }
                `;
        document.head.appendChild(style);
      }
    },
  },
  ready() {
    if (this.$.app) {
      this.$.app.innerHTML = "Hello Cocos.";
      const ttfPath = join(Editor.Project.path, "assets/font1.ttf");
      this._loadFont("test", ttfPath);
      this.$.app.style.fontFamily='test';
    }
  },
  beforeClose() {},
  close() {},
});
