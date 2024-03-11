import LeftSidebar from "@/components/LeftSideBar";
import React from 'react';


interface LayoutProps {
  role: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ role, children }) => {
    return (
        <div className="layout">
            <LeftSidebar role={role} />
            <div className="content">{children}</div>
        </div>
    );
};

export default Layout;