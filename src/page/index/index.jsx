import React from "react";
import { Alternate } from "../../components/cursor";

export default function index() {
  return (
    <div className="container">
      <Alternate>
        <div className="icon">图标</div>
      </Alternate>
      <Alternate>
        <button className="buttonF">这是一个按钮</button>
      </Alternate>
    </div>
  );
}
