import React from "react";
import { Alternate } from "../../components/cursor";

export default function index() {
  console.log("子元素渲染");
  return (
    <div className="container">
      <Alternate>
        <div className="icon" style={{ backgroundColor: "red" }}>
          图标
        </div>
      </Alternate>
      <Alternate>
        <button className="button" style={{ backgroundColor: "red" }}>
          这是一个按钮
        </button>
      </Alternate>
    </div>
  );
}
