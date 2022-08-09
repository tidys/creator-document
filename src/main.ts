//@ts-ignore
import packageJSON from "../package.json";
import { readFileSync } from "fs-extra";
import { join } from "path";
import { app, BrowserWindow } from "electron";
const CareEvents = ["browser-window-focus", "focus", "ready-to-show"];
function onInjectCode(event: any, win: any) {
  const url = win.getURL();
  if (url.indexOf("creator/static/windows/main.html") !== -1) {
    // main window
    // win.webContents.id = 2; // 这个判断并不可靠
    const code = readFileSync(join(__dirname, "./inject.js"), "utf-8");
    const frame = win.webContents.mainFrame;
    frame.executeJavaScript(`{${code}}`);
  } else {
    // others windows
  }
}
export const methods: { [key: string]: (...any: any) => any } = {
  openPanel() {
    Editor.Panel.open(packageJSON.name);
  },
};

export function load() {
  const wins = BrowserWindow.getAllWindows();
  wins.forEach((win) => {
    onInjectCode(null, win);
  });

  CareEvents.forEach((e) => {
    // @ts-ignore
    app.on(e, onInjectCode);
  });
}

export function unload() {
  CareEvents.forEach((e) => {
    app.off(e, onInjectCode);
  });
}
