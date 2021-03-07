import { createContext } from "react";

class Alternates {
  constructor() {
    this.alters = new Map();
    this.changeFunc = null;
    this.leaveFunc = null;
  }

  bind(changeCb, leaveCb) {
    this.changeFunc = changeCb;
    this.leaveFunc = leaveCb;
  }

  add(child, info) {
    this.alters.set(child, info);
    this.changeCursor();
  }

  refresh(child, info) {
    if (this.alters.has(child)) {
      this.alters.set(child, info);
      this.changeCursor();
    }
  }

  changeCursor() {
    // TODO 如果有多个元素,选择正确的元素
    const info = Array.from(this.alters.values())[0];
    if (typeof this.changeFunc === "function") {
      this.changeFunc(info);
    }
  }

  remove(child) {
    this.alters.delete(child);
    if (typeof this.leaveFunc === "function") {
      this.leaveFunc();
    }
  }
}

export default createContext(new Alternates());
