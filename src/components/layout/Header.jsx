import React from 'react';
import { RefreshCw, Menu } from 'lucide-react';

// แถบ Header ด้านบนของ Dashboard
export const Header = ({ onRefresh, isLoading, setIsOpenMobile }) => {
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 lg:px-8 py-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpenMobile(true)}
            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div>
            <h1 className="text-lg lg:text-xl font-bold text-slate-900 tracking-tight">
              ระบบติดตามสถานะการติดตั้ง NHIPAgent
            </h1>
            <p className="hidden sm:block text-xs lg:text-sm text-slate-500 font-normal">
              ติดตามสถานะการติดตั้งและการจัดทำเอกสารของโรงพยาบาลทั่วประเทศ
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onRefresh}
            disabled={isLoading}
            className={`
              flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all
              ${isLoading 
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                : 'bg-slate-900 text-white hover:bg-slate-800 shadow-sm active:scale-95'}
            `}
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-blue-500' : ''}`} />
            <span>{isLoading ? 'กำลังรีเฟรช...' : 'รีเฟรชข้อมูล'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};