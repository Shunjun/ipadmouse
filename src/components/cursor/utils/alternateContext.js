import { createContext } from "react";

class Alternates {
  constructor() {
    this.alters = new Map();
    this.funcs = {};
  }

  bind(enentName, cb) {
    enentName = toLowerCase(enentName);
    if (typeof enentName !== "string" || typeof cb !== "function") {
      return;
    }
    if (!this.funcs[enentName]) {
      this.funcs[enentName] = new Set();
    }
    this.funcs[enentName].add(cb);
  }

  remove(enentName, cb) {
    enentName = toLowerCase(enentName);
    if (typeof enentName !== "string") {
      return;
    }
    if (this.funcs[enentName]) {
      return this.funcs[enentName].delete(cb);
    }
    return false;
  }

  emit(enentName, child, info) {
    enentName = toLowerCase(enentName);
    if (enentName === "mouseenter") {
      if (this.alters.size > 0) {
        return;
      }
      this.alters.set(child, info);

      this.forEach(enentName, child, info);
    } else if (enentName === "mouseleave") {
      this.alters.delete(child);
      if (this.alters.size !== 0) {
        return;
      }
      this.forEach(enentName, child, info);
    } else {
      this.alters.set(child, info);
      this.forEach(enentName, child, info);
    }
  }

  forEach(enentName, ...arg) {
    if (!this.funcs[enentName]) {
      return;
    }
    this.funcs[enentName].forEach((cb) => {
      cb(...arg);
    });
  }
}

function toLowerCase(str) {
  return str.toLowerCase();
}

export default createContext(new Alternates());
