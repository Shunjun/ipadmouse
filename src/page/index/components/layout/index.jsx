import React from "react";
import classnames from "classnames";
import "./style.scss";

export function Layout({ children }) {
  return <div className="s-layout">{children}</div>;
}

export function Nav({ children }) {
  return <div className="s-nav">{children}</div>;
}

export function Content({ children, className }) {
  return (
    <div className="s-content-warpper">
      <div className={classnames(["s-content", className])}>{children}</div>
    </div>
  );
}

Layout.Content = Content;
Layout.Nav = Nav;
export default Layout;
