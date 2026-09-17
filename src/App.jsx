import React, { useState, useMemo } from 'react';
import { 
  Building2, LayoutGrid, Table as TableIcon, Search, 
  Download, RotateCcw, MapPin, Monitor, CheckCircle2, Clock, FileText, ChevronRight, X, Edit3, Printer
} from 'lucide-react';

export default function App() {
  const [selectedHospital, setSelectedHospital] = useState({
    id: '10706', name: 'โรงพยาบาลศรีสังวร', province: 'เชียงใหม่', zone: '1', status: 'ติดตั้งเสร็จแล้ว', docStatus: 'ส่งมอบงานแล้ว', date: '15 ก.ย. 2568', version: 'v1.2.3', installer: 'สมชาย ใจดี', pisDate: '8 ก.ย. 2568', installDate: '12 ก.ย. 2568'
  });
  const [viewMode, setViewMode] = useState('cards');

  // State สำหรับ Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedZone, setSelectedZone] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const mockHospitals = [
    { id: '10706', name: 'โรงพยาบาลศรีสังวร', province: 'เชียงใหม่', zone: '1', status: 'ติดตั้งเสร็จแล้ว', docStatus: 'ส่งมอบงานแล้ว', date: '15 ก.ย. 2568', version: 'v1.2.3', installer: 'สมชาย ใจดี', pisDate: '8 ก.ย. 2568', installDate: '12 ก.ย. 2568' },
    { id: '10987', name: 'โรงพยาบาลดอยหลวง', province: 'เชียงราย', zone: '1', status: 'ยังไม่ได้ดำเนินการ', docStatus: '-', date: '-', version: '-', installer: '-', pisDate: '-', installDate: '-' },
    { id: '11023', name: 'โรงพยาบาลแม่จัน', province: 'เชียงราย', zone: '1', status: 'ติดตั้งเสร็จแล้ว', docStatus: 'ส่งมอบงานแล้ว', date: '12 ก.ย. 2568', version: 'v1.2.1', installer: 'วิชัย รักดี', pisDate: '5 ก.ย. 2568', installDate: '10 ก.ย. 2568' },
    { id: '11074', name: 'โรงพยาบาลสันทราย', province: 'เชียงใหม่', zone: '1', status: 'กำลังจัดทำรายงาน', docStatus: 'กำลังจัดทำรายงาน', date: '10 ก.ย. 2568', version: 'v1.2.0', installer: 'อนันต์ สุขใจ', pisDate: '2 ก.ย. 2568', installDate: '8 ก.ย. 2568' },
    { id: '11112', name: 'โรงพยาบาลแม่แจ่ม', province: 'เชียงใหม่', zone: '1', status: 'ส่ง PIS ตรวจ', docStatus: 'ส่ง PIS ตรวจ', date: '8 ก.ย. 2568', version: 'v1.2.0', installer: 'สมชาย ใจดี', pisDate: '1 ก.ย. 2568', installDate: '5 ก.ย. 2568' },
    { id: '11234', name: 'โรงพยาบาลพร้าว', province: 'เชียงใหม่', zone: '1', status: 'ส่งมอบงานแล้ว', docStatus: 'ส่งมอบงานแล้ว', date: '5 ก.ย. 2568', version: 'v1.2.2', installer: 'สายชล นที', pisDate: '28 ส.ค. 2568', installDate: '3 ก.ย. 2568' },
  ];

  // ระบบค้นหาและกรองข้อมูลแบบ Real-time
  const filteredHospitals = useMemo(() => {
    return mockHospitals.filter(item => {
      const matchSearch = item.name.includes(searchTerm) || item.id.includes(searchTerm);
      const matchProvince = selectedProvince ? item.province === selectedProvince : true;
      const matchZone = selectedZone ? item.zone === selectedZone : true;
      const matchStatus = selectedStatus ? item.status === selectedStatus : true;
      return matchSearch && matchProvince && matchZone && matchStatus;
    });
  }, [searchTerm, selectedProvince, selectedZone, selectedStatus]);

  const handleReset = () => {
    setSearchTerm('');
    setSelectedProvince('');
    setSelectedZone('');
    setSelectedStatus('');
  };

  const getStatusBadge = (status) => {
    if (status === 'ติดตั้งเสร็จแล้ว' || status === 'ส่งมอบงานแล้ว') {
      return <span className="bg-emerald-100 text-emerald-700 text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1">✓ {status}</span>;
    }
    if (status === 'ยังไม่ได้ดำเนินการ') {
      return <span className="bg-amber-100 text-amber-700 text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1">⏳ {status}</span>;
    }
    return <span className="bg-blue-100 text-blue-700 text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1">📄 {status}</span>;
  };

  const getBorderColor = (status) => {
    if (status === 'ติดตั้งเสร็จแล้ว' || status === 'ส่งมอบงานแล้ว') return 'border-t-4 border-t-emerald-500 border-x border-b border-slate-200';
    if (status === 'ยังไม่ได้ดำเนินการ') return 'border-t-4 border-t-amber-500 border-x border-b border-slate-200';
    return 'border-t-4 border-t-blue-500 border-x border-b border-slate-200';
  };

  return (
    <div className="min-h-screen bg-slate-100/70 flex font-sans">
      {/* Sidebar ฝั่งซ้าย */}
      <aside className="w-64 bg-[#0B132B] text-white p-4 flex flex-col justify-between hidden md:flex shrink-0">
        <div>
          <div className="flex items-center gap-3 px-2 py-4 border-b border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-lg text-white shadow-lg shadow-blue-500/30">NH</div>
            <div>
              <h1 className="font-bold text-sm tracking-wide text-white">NHIPAgent</h1>
              <p className="text-[11px] text-slate-400">ระบบติดตามสถานะติดตั้ง</p>
            </div>
          </div>
          <nav className="mt-6 space-y-1.5">
            <a href="#" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs shadow-md shadow-blue-600/20">
              <Building2 className="w-4 h-4" /> หน้าหลัก
            </a>
            <a href="#" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-400 hover:bg-slate-800/60 hover:text-white text-xs transition-all">
              <Monitor className="w-4 h-4" /> สถานะการติดตั้ง
            </a>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">สถานะการติดตั้ง NHIPAgent</h2>
          <p className="text-xs text-slate-500 mt-1">ติดตามสถานะการติดตั้งและการจัดทำเอกสารของโรงพยาบาลทั่วประเทศ</p>
        </div>

        {/* 1. KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 mb-1">สถานะการติดตั้งทั้งหมด</p>
              <p className="text-3xl font-black text-slate-800">769 <span className="text-xs font-normal text-slate-400">แห่ง</span></p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">🏥</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between border-l-4 border-l-emerald-500">
            <div>
              <p className="text-xs font-semibold text-slate-500 mb-1">ติดตั้งเสร็จแล้ว</p>
              <p className="text-3xl font-black text-emerald-600">520 <span className="text-xs font-normal text-slate-400">แห่ง (67.6%)</span></p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center"><CheckCircle2 className="w-6 h-6" /></div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between border-l-4 border-l-amber-500">
            <div>
              <p className="text-xs font-semibold text-slate-500 mb-1">ยังไม่ได้ดำเนินการ</p>
              <p className="text-3xl font-black text-amber-600">249 <span className="text-xs font-normal text-slate-400">แห่ง (32.4%)</span></p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center"><Clock className="w-6 h-6" /></div>
          </div>
        </div>

        {/* 2. Filter Bar (ใช้งานได้จริง) */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm mb-6 flex flex-wrap gap-3 items-center justify-between">
          <div className="flex flex-wrap gap-2 items-center flex-1">
            <div className="relative min-w-[220px]">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ค้นหาโรงพยาบาล / รหัส..." 
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
              />
            </div>
            <select 
              value={selectedProvince} 
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-700 font-medium cursor-pointer"
            >
              <option value="">จังหวัด ทั้งหมด</option>
              <option value="เชียงใหม่">เชียงใหม่</option>
              <option value="เชียงราย">เชียงราย</option>
            </select>
            <select 
              value={selectedZone} 
              onChange={(e) => setSelectedZone(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-700 font-medium cursor-pointer"
            >
              <option value="">เขตสุขภาพ ทั้งหมด</option>
              <option value="1">เขต 1</option>
            </select>
            <select 
              value={selectedStatus} 
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-700 font-medium cursor-pointer"
            >
              <option value="">สถานะการติดตั้ง ทั้งหมด</option>
              <option value="ติดตั้งเสร็จแล้ว">ติดตั้งเสร็จแล้ว</option>
              <option value="ยังไม่ได้ดำเนินการ">ยังไม่ได้ดำเนินการ</option>
              <option value="กำลังจัดทำรายงาน">กำลังจัดทำรายงาน</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handleReset}
              className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-xl text-xs font-bold transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" /> รีเซ็ต
            </button>
            <button 
              onClick={() => alert(`ส่งออกข้อมูลทั้งหมด ${filteredHospitals.length} รายการ`)}
              className="flex items-center gap-1 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 transition-all"
            >
              <Download className="w-3.5 h-3.5" /> ดาวน์โหลดข้อมูล
            </button>
          </div>
        </div>

        {/* 3. Cards View Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-extrabold text-slate-800 text-sm">รายการโรงพยาบาล ({filteredHospitals.length} แห่ง)</h3>
          <div className="bg-slate-200/80 p-1 rounded-xl flex gap-1">
            <button 
              onClick={() => setViewMode('cards')}
              className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold transition-all ${viewMode === 'cards' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600'}`}
            >
              <LayoutGrid className="w-3.5 h-3.5" /> การ์ด
            </button>
            <button 
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold transition-all ${viewMode === 'table' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600'}`}
            >
              <TableIcon className="w-3.5 h-3.5" /> ตาราง
            </button>
          </div>
        </div>

        {/* 4. Grid Cards & Detail Drawer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className={`${selectedHospital ? 'lg:col-span-8' : 'lg:col-span-12'} transition-all duration-300`}>
            {viewMode === 'cards' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredHospitals.map((hosp) => (
                  <div 
                    key={hosp.id}
                    onClick={() => setSelectedHospital(hosp)}
                    className={`bg-white p-4 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-0.5 cursor-pointer transition-all ${getBorderColor(hosp.status)} ${selectedHospital?.id === hosp.id ? 'ring-2 ring-blue-500' : ''}`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
                        <Building2 className="w-4 h-4" />
                      </div>
                      {getStatusBadge(hosp.status)}
                    </div>
                    <h4 className="font-extrabold text-slate-800 text-sm mb-0.5">{hosp.name}</h4>
                    <p className="text-xs font-semibold text-slate-400 mb-3">{hosp.id}</p>
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium mb-3">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" /> {hosp.province} เขต {hosp.zone}
                    </div>
                    <div className="flex gap-1.5 mb-3">
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-semibold">Windows</span>
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-semibold">Ubuntu</span>
                    </div>
                    <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-[11px] text-slate-400">
                      <span>อัปเดตล่าสุด {hosp.date}</span>
                      <ChevronRight className="w-4 h-4 text-blue-600 font-bold" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                    <tr>
                      <th className="p-3 font-bold">รหัส</th>
                      <th className="p-3 font-bold">ชื่อโรงพยาบาล</th>
                      <th className="p-3 font-bold">จังหวัด</th>
                      <th className="p-3 font-bold">สถานะ</th>
                      <th className="p-3 font-bold">อัปเดตล่าสุด</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredHospitals.map(hosp => (
                      <tr 
                        key={hosp.id} 
                        onClick={() => setSelectedHospital(hosp)}
                        className="hover:bg-blue-50/50 cursor-pointer transition-colors"
                      >
                        <td className="p-3 font-semibold text-slate-500">{hosp.id}</td>
                        <td className="p-3 font-bold text-slate-800">{hosp.name}</td>
                        <td className="p-3 text-slate-600">{hosp.province}</td>
                        <td className="p-3">{getStatusBadge(hosp.status)}</td>
                        <td className="p-3 text-slate-400">{hosp.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* 5. Detail Drawer ฝั่งขวา */}
          {selectedHospital && (
            <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-5 shadow-lg relative h-fit sticky top-6">
              <button 
                onClick={() => setSelectedHospital(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-3">
                {getStatusBadge(selectedHospital.status)}
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-800 text-base">{selectedHospital.name}</h3>
                  <p className="text-xs text-slate-400">{selectedHospital.id} • {selectedHospital.province} เขต {selectedHospital.zone}</p>
                </div>
              </div>

              <div className="border-b border-slate-100 mb-4 pb-2 flex gap-4 text-xs font-bold text-slate-500">
                <span className="text-blue-600 border-b-2 border-blue-600 pb-2">รายละเอียด</span>
                <span className="hover:text-slate-800 cursor-pointer">เอกสาร</span>
                <span className="hover:text-slate-800 cursor-pointer">ประวัติการติดตั้ง</span>
              </div>

              <div className="space-y-3 text-xs text-slate-600 mb-6">
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400">อัปเดต V ใหม่</span>
                  <span className="font-bold text-slate-800">{selectedHospital.version}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400">สถานะการติดตั้ง</span>
                  <span className="font-bold text-emerald-600">✓ {selectedHospital.status}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400">สถานะเอกสาร</span>
                  <span className="font-bold text-emerald-600">✓ {selectedHospital.docStatus}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400">วันที่ส่งเอกสาร PIS ตรวจ</span>
                  <span className="font-bold text-slate-800">{selectedHospital.pisDate}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400">เจ้าหน้าที่ติดตั้ง</span>
                  <span className="font-bold text-slate-800">{selectedHospital.installer}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400">วันที่ติดตั้งเสร็จ</span>
                  <span className="font-bold text-slate-800">{selectedHospital.installDate}</span>
                </div>
              </div>

              {/* Action Buttons ใน Drawer */}
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all">
                  <Printer className="w-3.5 h-3.5" /> พิมพ์รายงาน
                </button>
                <button className="flex-1 flex items-center justify-center gap-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 transition-all">
                  <Edit3 className="w-3.5 h-3.5" /> แก้ไขข้อมูล
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}