import React from "react";

const Layout = ({ children }) => (
  <div>
    <header>
      <h1>Example</h1>
    </header>
    <div>{children}</div>
    <footer>🍔</footer>
  </div>
);

export default Layout;
