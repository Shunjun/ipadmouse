import { createContext } from "react";

class Alternates {
  constructor() {
    this.alters = [];
  }

  add() {
    console.log('added')
  }
}

export default createContext(new Alternates());
