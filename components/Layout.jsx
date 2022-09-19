import React from "react";
import SideNav from "./SideNav";

function Layout({ children }) {
  return (
    <div>
      <main className="w-full flex min-h-screen">
        <SideNav />
        {children}
      </main>
    </div>
  );
}

export default Layout;
