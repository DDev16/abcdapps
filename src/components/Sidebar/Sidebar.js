import React, { useState } from 'react';
import '../../components/Sidebar/Sidebar.css';

const Sidebar = ({ children }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <>
   
      <button onClick={toggleSidebar}>
        {isSidebarVisible ? 'Hide Sidebar' : 'Show Sidebar'}
      </button>
      {isSidebarVisible && (
        <div className="sidebar">
          {children}
        </div>
      )}
    </>
  );
};

export default Sidebar;
