import React from 'react';
import { 
  Home, 
  BarChart3, 
  FileText, 
  TrendingUp, 
  Building2, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

// เมนูหลักด้านซ้ายสำหรับ Dashboard
export const Sidebar = ({ isCollapsed, toggleSidebar, activeMenu, setActiveMenu, isMobile, isOpenMobile, setIsOpenMobile }) => {
  const menuItems = [
    { id: 'home', label: 'หน้าหลัก', icon: Home },
    { id: 'installation', label: 'สถานะการติดตั้ง', icon: BarChart3 },
    { id: 'document', label: 'สถานะเอกสาร', icon: FileText },
    { id: 'report', label: 'รายงาน', icon: TrendingUp },
    { id: 'hospitals', label: 'โรงพยาบาล', icon: Building2 },
    { id: 'settings', label: 'ตั้งค่า', icon: Settings },
  ];

  const sidebarClasses = `
    fixed top-0 left-0 z-40 h-screen bg-slate-900 text-slate-300 transition-all duration-300 ease-in-out flex flex-col justify-between border-r border-slate-800
    ${isMobile 
      ? (isOpenMobile ? 'translate-x-0 w-64' : '-translate-x-full w-64') 
      : (isCollapsed ? 'w-20' : 'w-64')}
  `;

  return (
    <>
      {isMobile && isOpenMobile && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpenMobile(false)}
        />
      )}

      <aside className={sidebarClasses}>
        <div>
          {/* ส่วน Brand Logo */}
          <div className="flex items-center justify-between h-16 px-4 bg-slate-950/50 border-b border-slate-800">
            <div className="flex items-center space-x-3 overflow-hidden">
              <div className="p-2 bg-blue-600 rounded-xl text-white shrink-0 shadow-lg shadow-blue-600/30">
                <ShieldCheck className="w-6 h-6" />
              </div>
              {(!isCollapsed || isMobile) && (
                <div className="flex flex-col whitespace-nowrap">
                  <span className="font-bold text-white text-base tracking-wide">NHIPAgent</span>
                  <span className="text-xs text-blue-400 font-medium">Dashboard System</span>
                </div>
              )}
            </div>

            {!isMobile && (
              <button 
                onClick={toggleSidebar}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
              </button>
            )}
          </div>

          {/* ปุ่มเมนูต่างๆ */}
          <nav className="p-3 space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeMenu === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveMenu(item.id);
                    if (isMobile) setIsOpenMobile(false);
                  }}
                  className={`
                    w-full flex items-center space-x-3 px-3 py-3 rounded-xl font-medium text-sm transition-all duration-150
                    ${isActive 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20 font-semibold' 
                      : 'hover:bg-slate-800/80 text-slate-400 hover:text-slate-200'}
                  `}
                >
                  <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  {(!isCollapsed || isMobile) && (
                    <span className="truncate">{item.label}</span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* ทีมพัฒนาด้านล่าง */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/30">
          {(!isCollapsed || isMobile) ? (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-blue-400">
                NA
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-xs font-semibold text-slate-200 truncate">NHIPAgent Team</span>
                <span className="text-[10px] text-slate-500 truncate">v1.0.0 Enterprise</span>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-blue-400">
                NA
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};