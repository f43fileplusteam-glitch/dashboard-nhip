import React, { useState, useEffect, useMemo } from 'react';
import { 
  Building2, LayoutGrid, Table as TableIcon, Search, 
  Download, RotateCcw, MapPin, Monitor, ChevronRight, X, CheckCircle2, Clock, Maximize2, Minimize2
} from 'lucide-react';

export default function App() {
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [viewMode, setViewMode] = useState('cards');

  // State สำหรับ Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedZone, setSelectedZone] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedInstallment, setSelectedInstallment] = useState('');
  const [selectedDocStatus, setSelectedDocStatus] = useState('');
  const [selectedSystem, setSelectedSystem] = useState(''); // เพิ่ม State สำหรับกรองระบบ

  // 1. State สำหรับเก็บข้อมูลจาก Google Sheet
  const [hospitalData, setHospitalData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. ดึงข้อมูลจาก Google Sheet เมื่อเปิดเว็บ
  useEffect(() => {
    fetch('https://script.google.com/macros/s/AKfycbwfetCtqQXU0u7Qy6m5dxMOZqGOQ0-P2oK5_N1yD1g7o0J8JMcBhuWQG9eGL95BKARncw/exec')
      .then(res => res.json())
      .then(data => {
        setHospitalData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  // ดึงรายการตัวเลือกที่ไม่ซ้ำกันจาก Google Sheet มาใส่ Dropdown แบบอัตโนมัติ
  const provinceList = useMemo(() => {
    return [...new Set(hospitalData.map(item => item['จังหวัด']).filter(Boolean))].sort();
  }, [hospitalData]);

  const zoneList = useMemo(() => {
    return [...new Set(hospitalData.map(item => item['เขต']).filter(Boolean))].sort((a, b) => Number(a) - Number(b));
  }, [hospitalData]);

  const installmentList = useMemo(() => {
    return [...new Set(hospitalData.map(item => item['งวดงาน']).filter(Boolean))].sort();
  }, [hospitalData]);

  const docStatusList = useMemo(() => {
    return [...new Set(hospitalData.map(item => item['สถานะเอกสาร']).filter(Boolean))].sort();
  }, [hospitalData]);

  const systemList = useMemo(() => {
    return [...new Set(hospitalData.map(item => item['ระบบ']).filter(Boolean))].sort();
  }, [hospitalData]);

  // กำหนดเป้าหมายของแต่ละงวดตามที่ระบุ
  const installmentTargets = {
    '3': 50,
    '4': 150,
    '5': 223,
    '6': 173,
    '7': 173
  };

  // คำนวณสถิติภาพรวมจากข้อมูลจริง
  const stats = useMemo(() => {
    const total = hospitalData.length;
    const completed = hospitalData.filter(item => String(item['สถานะการติดตั้ง'] || '').includes('ติดตั้งสำเร็จ') || String(item['สถานะการติดตั้ง'] || '').includes('ส่งมอบงานแล้ว')).length;
    const pending = total - completed;

    // นับจำนวนตามงวดงาน
    const installmentCounts = {};
    hospitalData.forEach(item => {
      const inst = String(item['งวดงาน'] || '').trim();
      if (inst) {
        installmentCounts[inst] = (installmentCounts[inst] || 0) + 1;
      }
    });

    // นับจำนวนตามสถานะเอกสาร
    const docStatusCounts = {};
    hospitalData.forEach(item => {
      const doc = String(item['สถานะเอกสาร'] || '').trim();
      if (doc) {
        docStatusCounts[doc] = (docStatusCounts[doc] || 0) + 1;
      }
    });

    return { total, completed, pending, installmentCounts, docStatusCounts };
  }, [hospitalData]);

  // ระบบกรองข้อมูล Real-time
  const filteredHospitals = useMemo(() => {
    return hospitalData.filter(item => {
      const name = String(item['ชื่อโรงพยาบาล'] || '');
      const code = String(item['รหัสสถานพยาบาล'] || '');
      const province = String(item['จังหวัด'] || '');
      const zone = String(item['เขต'] || '');
      const status = String(item['สถานะการติดตั้ง'] || '');
      const installment = String(item['งวดงาน'] || '');
      const docStatus = String(item['สถานะเอกสาร'] || '');
      const system = String(item['ระบบ'] || '');

      const matchSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          code.includes(searchTerm) || 
                          province.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchProvince = selectedProvince ? province.includes(selectedProvince) : true;
      const matchZone = selectedZone ? zone.includes(selectedZone) : true;
      const matchStatus = selectedStatus ? status.includes(selectedStatus) : true;
      const matchInstallment = selectedInstallment ? installment.includes(selectedInstallment) : true;
      const matchDocStatus = selectedDocStatus ? docStatus.includes(selectedDocStatus) : true;
      const matchSystem = selectedSystem ? system.includes(selectedSystem) : true;

      return matchSearch && matchProvince && matchZone && matchStatus && matchInstallment && matchDocStatus && matchSystem;
    });
  }, [hospitalData, searchTerm, selectedProvince, selectedZone, selectedStatus, selectedInstallment, selectedDocStatus, selectedSystem]);

  const handleReset = () => {
    setSearchTerm('');
    setSelectedProvince('');
    setSelectedZone('');
    setSelectedStatus('');
    setSelectedInstallment('');
    setSelectedDocStatus('');
    setSelectedSystem('');
  };

  const getStatusBadge = (status) => {
    if (status === 'ติดตั้งสำเร็จ' || status === 'ส่งมอบงานแล้ว') {
      return <span className="bg-emerald-100 text-emerald-700 text-xs px-2.5 py-1 rounded-full font-bold">✓ {status}</span>;
    }
    if (status === 'ยังไม่ดำเนินการ' || !status) {
      return <span className="bg-amber-100 text-amber-700 text-xs px-2.5 py-1 rounded-full font-bold">⏳ {status || 'ยังไม่ดำเนินการ'}</span>;
    }
    return <span className="bg-blue-100 text-blue-700 text-xs px-2.5 py-1 rounded-full font-bold">📄 {status}</span>;
  };

  const getBorderColor = (status) => {
    if (status === 'ติดตั้งสำเร็จ' || status === 'ส่งมอบงานแล้ว') return 'border-t-4 border-t-emerald-500 border-x border-b border-slate-200';
    if (status === 'ยังไม่ดำเนินการ' || !status) return 'border-t-4 border-t-amber-500 border-x border-b border-slate-200';
    return 'border-t-4 border-t-blue-500 border-x border-b border-slate-200';
  };

  // ฟังก์ชันแปลงวันที่ให้แสดงแค่ปี-เดือน-วัน (เช่น 2569-03-29)
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const cleanDate = String(dateString).split('T')[0];
    return cleanDate;
  };

  return (
    <div className="min-h-screen bg-slate-100/70 flex font-sans">
      {/* Sidebar */}
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
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">ระบบติดตามสถานะการติดตั้ง NHIPAgent</h2>
          <p className="text-xs text-slate-500 mt-1">ติดตามสถานะการติดตั้งและการจัดทำเอกสารของโรงพยาบาลทั่วประเทศ</p>
        </div>

        {/* 1. KPI Summaries */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 mb-1">สถานะการติดตั้งทั้งหมด</p>
              <p className="text-3xl font-black text-slate-800">{stats.total} <span className="text-xs font-normal text-slate-400">แห่ง</span></p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">🏥</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between border-l-4 border-l-emerald-500">
            <div>
              <p className="text-xs font-semibold text-slate-500 mb-1">ติดตั้งสำเร็จ</p>
              <p className="text-3xl font-black text-emerald-600">
                {stats.completed} <span className="text-xs font-normal text-slate-400">แห่ง ({stats.total ? ((stats.completed / stats.total) * 100).toFixed(1) : 0}%)</span>
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center"><CheckCircle2 className="w-6 h-6" /></div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between border-l-4 border-l-amber-500">
            <div>
              <p className="text-xs font-semibold text-slate-500 mb-1">ยังไม่ดำเนินการ</p>
              <p className="text-3xl font-black text-amber-600">
                {stats.pending} <span className="text-xs font-normal text-slate-400">แห่ง ({stats.total ? ((stats.pending / stats.total) * 100).toFixed(1) : 0}%)</span>
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center"><Clock className="w-6 h-6" /></div>
          </div>
        </div>

        {/* 2. สถานะงวดงาน & สถานะเอกสาร */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
          <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <h3 className="text-xs font-bold text-slate-700 mb-3">สถานะแยกตามงวดงาน</h3>
            <div className="grid grid-cols-5 gap-1.5 text-center">
              {['3', '4', '5', '6', '7'].map(inst => (
                <div key={inst} className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <p className="text-[10px] text-slate-500 mb-1">งวด {inst}</p>
                  <p className="text-sm font-black text-slate-800">
                    {stats.installmentCounts[inst] || 0}
                    <span className="text-[10px] font-normal text-slate-400 block">/ {installmentTargets[inst]}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <h3 className="text-xs font-bold text-slate-700 mb-3">สถานะเอกสารภาพรวม</h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <p className="text-[10px] text-slate-500 mb-1">กำลังจัดทำรายงาน</p>
                <p className="text-base font-black text-blue-600">{stats.docStatusCounts['กำลังจัดทำรายงาน'] || 0}</p>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <p className="text-[10px] text-slate-500 mb-1">ส่งเอกสารให้ PI</p>
                <p className="text-base font-black text-indigo-600">{stats.docStatusCounts['ส่งเอกสารให้ PI'] || 0}</p>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <p className="text-[10px] text-slate-500 mb-1">ส่ง รพ. แล้ว</p>
                <p className="text-base font-black text-purple-600">{stats.docStatusCounts['ส่งโรงพยาบาลแล้ว'] || stats.docStatusCounts['ส่ง รพ. แล้ว'] || 0}</p>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <p className="text-[10px] text-slate-500 mb-1">รพ. เซ็นแล้ว</p>
                <p className="text-base font-black text-teal-600">{stats.docStatusCounts['โรงพยาบาลเซ็นแล้ว'] || stats.docStatusCounts['รพ. เซ็นแล้ว'] || 0}</p>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 col-span-2 sm:col-span-1">
                <p className="text-[10px] text-slate-500 mb-1">ส่งมอบงานแล้ว</p>
                <p className="text-base font-black text-emerald-600">{stats.docStatusCounts['ส่งมอบงานแล้ว'] || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Filter Bar */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm mb-6 flex flex-wrap gap-3 items-center justify-between">
          <div className="flex flex-wrap gap-2 items-center flex-1">
            <div className="relative min-w-[200px]">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ค้นหาโรงพยาบาล / รหัส / จังหวัด..." 
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
              />
            </div>
            
            <select 
              value={selectedSystem} 
              onChange={(e) => setSelectedSystem(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-700 font-medium cursor-pointer"
            >
              <option value="">ระบบ ทั้งหมด</option>
              {systemList.map((sys, index) => (
                <option key={index} value={sys}>{sys}</option>
              ))}
            </select>

            <select 
              value={selectedProvince} 
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-700 font-medium cursor-pointer"
            >
              <option value="">จังหวัด ทั้งหมด</option>
              {provinceList.map((prov, index) => (
                <option key={index} value={prov}>{prov}</option>
              ))}
            </select>

            <select 
              value={selectedZone} 
              onChange={(e) => setSelectedZone(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-700 font-medium cursor-pointer"
            >
              <option value="">เขตสุขภาพ ทั้งหมด</option>
              {zoneList.map((z, index) => (
                <option key={index} value={z}>เขต {z}</option>
              ))}
            </select>

            <select 
              value={selectedInstallment} 
              onChange={(e) => setSelectedInstallment(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-700 font-medium cursor-pointer"
            >
              <option value="">งวดงาน ทั้งหมด</option>
              {installmentList.map((inst, index) => (
                <option key={index} value={inst}>{inst}</option>
              ))}
            </select>

            <select 
              value={selectedStatus} 
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-700 font-medium cursor-pointer"
            >
              <option value="">สถานะการติดตั้ง ทั้งหมด</option>
              <option value="ติดตั้งสำเร็จ">ติดตั้งสำเร็จ</option>
              <option value="ยังไม่ดำเนินการ">ยังไม่ดำเนินการ</option>
            </select>

            <select 
              value={selectedDocStatus} 
              onChange={(e) => setSelectedDocStatus(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-700 font-medium cursor-pointer"
            >
              <option value="">สถานะเอกสาร ทั้งหมด</option>
              {docStatusList.map((doc, index) => (
                <option key={index} value={doc}>{doc}</option>
              ))}
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

        {/* 4. Display Toggle & Cards/Table View */}
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className={`${selectedHospital?.isExpanded ? 'hidden' : selectedHospital ? 'lg:col-span-8' : 'lg:col-span-12'} transition-all duration-300`}>
            {loading ? (
              <div className="text-center py-12 text-slate-400 text-xs">กำลังโหลดข้อมูลจาก Google Sheet...</div>
            ) : viewMode === 'cards' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredHospitals.map((hosp, idx) => (
                  <div 
                    key={hosp['รหัสสถานพยาบาล'] || idx}
                    onClick={() => setSelectedHospital(hosp)}
                    className={`bg-white p-4 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-0.5 cursor-pointer transition-all ${getBorderColor(hosp['สถานะการติดตั้ง'])} ${selectedHospital?.['รหัสสถานพยาบาล'] === hosp['รหัสสถานพยาบาล'] ? 'ring-2 ring-blue-500' : ''}`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
                        <Building2 className="w-4 h-4" />
                      </div>
                      {getStatusBadge(hosp['สถานะการติดตั้ง'])}
                    </div>
                    <h4 className="font-extrabold text-slate-800 text-sm mb-0.5">{hosp['ชื่อโรงพยาบาล']}</h4>
                    <p className="text-xs font-semibold text-slate-400 mb-3">{hosp['รหัสสถานพยาบาล']}</p>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium mb-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" /> {hosp['จังหวัด']} เขต {hosp['เขต']}
                      </span>
                      <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-md font-bold">{hosp['งวดงาน']}</span>
                    </div>
                    <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-[11px] text-slate-400">
                      <span>สถานะเอกสาร: <strong className="text-slate-600">{hosp['สถานะเอกสาร'] || '-'}</strong></span>
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
                      <th className="p-3 font-bold">จังหวัด / เขต</th>
                      <th className="p-3 font-bold">งวดงาน</th>
                      <th className="p-3 font-bold">สถานะติดตั้ง</th>
                      <th className="p-3 font-bold">สถานะเอกสาร</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredHospitals.map((hosp, idx) => (
                      <tr 
                        key={hosp['รหัสสถานพยาบาล'] || idx} 
                        onClick={() => setSelectedHospital(hosp)}
                        className="hover:bg-blue-50/50 cursor-pointer transition-colors"
                      >
                        <td className="p-3 font-semibold text-slate-500">{hosp['รหัสสถานพยาบาล']}</td>
                        <td className="p-3 font-bold text-slate-800">{hosp['ชื่อโรงพยาบาล']}</td>
                        <td className="p-3 text-slate-600">{hosp['จังหวัด']} (เขต {hosp['เขต']})</td>
                        <td className="p-3 font-bold text-purple-600">{hosp['งวดงาน']}</td>
                        <td className="p-3">{getStatusBadge(hosp['สถานะการติดตั้ง'])}</td>
                        <td className="p-3 text-slate-600 font-medium">{hosp['สถานะเอกสาร'] || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* 5. Detail Drawer */}
          {selectedHospital && (
            <div className={`bg-white rounded-2xl border border-slate-200 p-5 shadow-lg relative h-fit sticky top-6 transition-all duration-300 ${
              selectedHospital.isExpanded ? 'lg:col-span-12' : 'lg:col-span-4'
            }`}>
              {/* ปุ่มควบคุม (ขยาย/ย่อ และ ปิด) */}
              <div className="absolute top-4 right-4 flex items-center gap-1">
                <button 
                  onClick={() => setSelectedHospital({
                    ...selectedHospital, 
                    isExpanded: !selectedHospital.isExpanded
                  })}
                  className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                  title={selectedHospital.isExpanded ? "ย่อขนาด" : "ขยายให้กว้างขึ้น"}
                >
                  {selectedHospital.isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button 
                  onClick={() => setSelectedHospital(null)}
                  className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                  title="ปิด"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2 mb-3">
                {getStatusBadge(selectedHospital['สถานะการติดตั้ง'])}
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-800 text-base">{selectedHospital['ชื่อโรงพยาบาล']}</h3>
                  <p className="text-xs text-slate-400">{selectedHospital['รหัสสถานพยาบาล']} • {selectedHospital['จังหวัด']} เขต {selectedHospital['เขต']}</p>
                </div>
              </div>

              {/* รายละเอียดข้อมูล */}
              <div className="space-y-3 text-xs text-slate-600 mb-4 pt-2 border-t border-slate-100">
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400">ระบบ</span>
                  <span className="font-bold text-slate-800">{selectedHospital['ระบบ'] || 'NHIPAgent'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400">เจ้าหน้าที่ติดตั้ง</span>
                  <span className="font-bold text-slate-800">{selectedHospital['เจ้าหน้าที่ติดตั้ง'] || '-'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400">สถานะการติดตั้ง</span>
                  <span className="font-bold text-emerald-600">{selectedHospital['สถานะการติดตั้ง'] || '-'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400">วันที่ติดตั้งสำเร็จ</span>
                  <span className="font-bold text-slate-800">{formatDate(selectedHospital['วันที่ติดตั้งสำเร็จ'])}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400">งวดงาน</span>
                  <span className="font-bold text-purple-600">{selectedHospital['งวดงาน'] || '-'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400">สถานะเอกสาร</span>
                  <span className="font-bold text-blue-600">{selectedHospital['สถานะเอกสาร'] || '-'}</span>
                </div>
                <div className="flex flex-col py-1 gap-1 border-b border-slate-50">
                  <span className="text-slate-400">หมายเหตุ</span>
                  <div className="font-medium text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100 max-h-48 overflow-y-auto whitespace-pre-line text-xs leading-relaxed">
                    {selectedHospital['หมายเหตุ'] || '-'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}