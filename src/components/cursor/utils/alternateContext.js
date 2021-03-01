import { createContext } from "react";

class Alternates {
  constructor() {
    this.alters = {
      
    };
  }

  bind(){
    
  }

  add() {
    this.alters.push('1')
    console.log('added')
  }

  refresh(){

  }


  remove(){

  }
  
  
}

export default createContext(new Alternates());
