import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const Layout = ({ children, onRefresh, isLoading }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState('home');
  const [isMobile, setIsMobile] = useState(false);
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsMobile(true);
        setIsCollapsed(false);
      } else {
        setIsMobile(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F8FC] text-slate-800 font-sans antialiased flex">
      <Sidebar 
        isCollapsed={isCollapsed} 
        toggleSidebar={() => setIsCollapsed(!isCollapsed)}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        isMobile={isMobile}
        isOpenMobile={isOpenMobile}
        setIsOpenMobile={setIsOpenMobile}
      />

      <div className={`flex-1 flex flex-col transition-all duration-300 ${!isMobile ? (isCollapsed ? 'ml-20' : 'ml-64') : 'ml-0'}`}>
        <Header 
          onRefresh={onRefresh} 
          isLoading={isLoading} 
          setIsOpenMobile={setIsOpenMobile}
        />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};