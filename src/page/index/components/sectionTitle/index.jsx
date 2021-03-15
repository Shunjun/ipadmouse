import React from "react";
import "./style.scss";

function SectionTitle({ title, rightContent, ...props }) {
  return (
    <div {...props}>
      <div className="header-warpper">
        <div className="header-title">{title}</div>
        <div className="header-right">{rightContent}</div>
      </div>
    </div>
  );
}

export default React.memo(SectionTitle);
