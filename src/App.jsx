import React, { useState } from 'react';
import KpiCards from './components/dashboard/KpiCards';
import DetailDrawer from './components/dashboard/DetailDrawer';
import { 
  Building2, LayoutGrid, Table as TableIcon, Search, 
  Download, RotateCcw, Filter, MapPin, Monitor
} from 'lucide-react';

export default function App() {
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'table'

  // ข้อมูลจำลองโรงพยาบาลสำหรับ Hospital Cards
  const mockHospitals = [
    { id: '10706', name: 'โรงพยาบาลศรีสังวร', province: 'เชียงใหม่', zone: '1', status: 'ติดตั้งเสร็จแล้ว', type: 'completed', date: '15 ก.ย. 2568' },
    { id: '10987', name: 'โรงพยาบาลดอยหลวง', province: 'เชียงราย', zone: '1', status: 'ยังไม่ได้ดำเนินการ', type: 'pending', date: '-' },
    { id: '11023', name: 'โรงพยาบาลแม่จัน', province: 'เชียงใหม่', zone: '1', status: 'ติดตั้งเสร็จแล้ว', type: 'completed', date: '12 ก.ย. 2568' },
    { id: '11074', name: 'โรงพยาบาลสันทราย', province: 'เชียงใหม่', zone: '1', status: 'กำลังจัดทำรายงาน', type: 'progress', date: '10 ก.ย. 2568' },
    { id: '11112', name: 'โรงพยาบาลแม่แจ่ม', province: 'เชียงใหม่', zone: '1', status: 'ส่ง PIS ตรวจ', type: 'progress', date: '8 ก.ย. 2568' },
    { id: '11234', name: 'โรงพยาบาลพร้าว', province: 'เชียงใหม่', zone: '1', status: 'ส่งมอบงานแล้ว', type: 'completed', date: '5 ก.ย. 2568' },
  ];

  const getStatusBadge = (status) => {
    if (status === 'ติดตั้งเสร็จแล้ว' || status === 'ส่งมอบงานแล้ว') {
      return <span className="bg-emerald-50 text-emerald-600 text-xs px-2.5 py-0.5 rounded-full font-medium">✓ {status}</span>;
    }
    if (status === 'ยังไม่ได้ดำเนินการ') {
      return <span className="bg-amber-50 text-amber-600 text-xs px-2.5 py-0.5 rounded-full font-medium">⏳ {status}</span>;
    }
    return <span className="bg-blue-50 text-blue-600 text-xs px-2.5 py-0.5 rounded-full font-medium">📄 {status}</span>;
  };

  const getBorderColor = (status) => {
    if (status === 'ติดตั้งเสร็จแล้ว' || status === 'ส่งมอบงานแล้ว') return 'border-l-4 border-l-emerald-500';
    if (status === 'ยังไม่ได้ดำเนินการ') return 'border-l-4 border-l-amber-500';
    return 'border-l-4 border-l-blue-500';
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex">
      {/* Sidebar ฝั่งซ้าย */}
      <aside className="w-64 bg-[#0F172A] text-white p-4 flex flex-col justify-between hidden md:flex">
        <div>
          <div className="flex items-center gap-3 px-2 py-4 border-b border-slate-800">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-lg">NH</div>
            <div>
              <h1 className="font-bold text-sm tracking-wide">NHIPAgent</h1>
              <p className="text-[11px] text-slate-400">ระบบติดตามสถานะติดตั้ง</p>
            </div>
          </div>
          <nav className="mt-6 space-y-1">
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-blue-600 text-white font-medium text-xs">
              <Building2 className="w-4 h-4" /> หน้าหลัก
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:bg-slate-800 text-xs">
              <Monitor className="w-4 h-4" /> สถานะการติดตั้ง
            </a>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Title */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-800">สถานะการติดตั้ง NHIPAgent</h2>
            <p className="text-xs text-slate-400 mt-1">ติดตามสถานะการติดตั้งและการจัดทำเอกสารของโรงพยาบาลทั่วประเทศ</p>
          </div>
        </div>

        {/* 1. KPI Cards Component */}
        <KpiCards />

        {/* 2. Filter Bar */}
        <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm mb-6 flex flex-wrap gap-3 items-center justify-between">
          <div className="flex flex-wrap gap-2 items-center flex-1">
            <div className="relative min-w-[200px]">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input 
                type="text" 
                placeholder="ค้นหาโรงพยาบาล / รหัส..." 
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <select className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-600">
              <option>จังหวัด ทั้งหมด</option>
            </select>
            <select className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-600">
              <option>เขตสุขภาพ ทั้งหมด</option>
            </select>
            <select className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-600">
              <option>สถานะการติดตั้ง ทั้งหมด</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-200">
              <RotateCcw className="w-3.5 h-3.5" /> รีเซ็ต
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700">
              <Download className="w-3.5 h-3.5" /> ดาวน์โหลดข้อมูล
            </button>
          </div>
        </div>

        {/* 3. Section แสดงการ์ดโรงพยาบาล + Detail Drawer */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-slate-800 text-sm">รายการโรงพยาบาล ({mockHospitals.length} แห่ง)</h3>
          <div className="bg-slate-100 p-1 rounded-xl flex gap-1">
            <button 
              onClick={() => setViewMode('cards')}
              className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${viewMode === 'cards' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500'}`}
            >
              <LayoutGrid className="w-3.5 h-3.5" /> การ์ด
            </button>
            <button 
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${viewMode === 'table' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500'}`}
            >
              <TableIcon className="w-3.5 h-3.5" /> ตาราง
            </button>
          </div>
        </div>

        {/* Grid Cards + Drawer ฝั่งขวา */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* ส่วนรายการการ์ด */}
          <div className={`${selectedHospital ? 'lg:col-span-8' : 'lg:col-span-12'} transition-all`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockHospitals.map((hosp) => (
                <div 
                  key={hosp.id}
                  onClick={() => setSelectedHospital(hosp)}
                  className={`bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md cursor-pointer transition-all ${getBorderColor(hosp.status)}`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-600">
                      <Building2 className="w-4 h-4" />
                    </div>
                    {getStatusBadge(hosp.status)}
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm mb-1">{hosp.name}</h4>
                  <p className="text-xs text-slate-400 mb-3">{hosp.id}</p>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 mb-3">
                    <MapPin className="w-3 h-3 text-slate-400" /> {hosp.province} เขต {hosp.zone}
                  </div>
                  <div className="flex gap-1.5 mb-3">
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">Windows</span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">Ubuntu</span>
                  </div>
                  <div className="pt-2 border-t border-slate-50 flex justify-between items-center text-[11px] text-slate-400">
                    <span>อัปเดตล่าสุด {hosp.date}</span>
                    <span className="text-blue-600 font-semibold">›</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ส่วน Drawer แสดงรายละเอียดขวามือ */}
          {selectedHospital && (
            <div className="lg:col-span-4">
              <DetailDrawer 
                data={selectedHospital} 
                onClose={() => setSelectedHospital(null)} 
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}