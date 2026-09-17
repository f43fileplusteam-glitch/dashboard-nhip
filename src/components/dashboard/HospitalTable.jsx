import React, { useState, useMemo } from 'react';
import { Search, Filter, CheckCircle2, Clock, FileText, Send, Building2 } from 'lucide-react';

export const HospitalTable = ({ hospitalData = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [installmentFilter, setInstallmentFilter] = useState('all');

  // ระบบค้นหาและกรองข้อมูล (อ้างอิงหัวคอลัมน์ภาษาไทยจาก Google Sheet)
  const filteredData = useMemo(() => {
    return hospitalData.filter(item => {
      const name = item['ชื่อโรงพยาบาล'] || '';
      const code = item['รหัสสถานพยาบาล'] || '';
      const province = item['จังหวัด'] || '';

      const matchesSearch =
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        code.includes(searchTerm) ||
        province.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || item['สถานะการติดตั้ง'] === statusFilter;
      const matchesInstallment = installmentFilter === 'all' || item['งวดงาน'] === installmentFilter;

      return matchesSearch && matchesStatus && matchesInstallment;
    });
  }, [hospitalData, searchTerm, statusFilter, installmentFilter]);

  // ฟังก์ชันช่วยแสดง Badge สีตามสถานะ
  const getStatusBadge = (status) => {
    if (status === 'ติดตั้งเสร็จแล้ว') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <CheckCircle2 className="w-3.5 h-3.5" /> ติดตั้งเสร็จแล้ว
        </span>
      );
    }
    if (status === 'กำลังติดตั้ง') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
          <Clock className="w-3.5 h-3.5" /> กำลังติดตั้ง
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
        ยังไม่ได้ดำเนินการ
      </span>
    );
  };

  const getDocBadge = (status) => {
    if (status === 'ส่งมอบงานแล้ว') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">
          <Send className="w-3 h-3" /> {status}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-50 text-slate-600 border border-slate-200">
        <FileText className="w-3 h-3" /> {status || 'กำลังจัดทำรายงาน'}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden mb-6">
      {/* Header ของตาราง + ตัวกรอง */}
      <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        <div>
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            ตารางข้อมูลการติดตั้งรายโรงพยาบาล
          </h3>
          <p className="text-xs text-slate-500">ค้นหาและติดตามสถานะรายพื้นที่</p>
        </div>

        {/* ช่อง Search & Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="ค้นหาชื่อ รพ., รหัส หรือ จังหวัด..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="all">สถานะติดตั้งทั้งหมด</option>
            <option value="ติดตั้งเสร็จแล้ว">ติดตั้งเสร็จแล้ว</option>
            <option value="กำลังติดตั้ง">กำลังติดตั้ง</option>
            <option value="ยังไม่ได้ดำเนินการ">ยังไม่ได้ดำเนินการ</option>
          </select>

          <select
            value={installmentFilter}
            onChange={(e) => setInstallmentFilter(e.target.value)}
            className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="all">งวดงานทั้งหมด</option>
            <option value="งวด 3">งวด 3</option>
            <option value="งวด 4">งวด 4</option>
            <option value="งวด 5">งวด 5</option>
            <option value="งวด 6">งวด 6</option>
            <option value="งวด 7">งวด 7</option>
          </select>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/80 text-[11px] uppercase tracking-wider font-semibold text-slate-500">
              <th className="py-3.5 px-4">รหัส</th>
              <th className="py-3.5 px-4">ชื่อโรงพยาบาล</th>
              <th className="py-3.5 px-4">จังหวัด / เขต</th>
              <th className="py-3.5 px-4">งวดงาน</th>
              <th className="py-3.5 px-4">สถานะติดตั้ง</th>
              <th className="py-3.5 px-4">สถานะเอกสาร</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={item['รหัสสถานพยาบาล'] || index} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-slate-500">{item['รหัสสถานพยาบาล']}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">{item['ชื่อโรงพยาบาล']}</td>
                  <td className="py-3.5 px-4 text-slate-600">
                    {item['จังหวัด']} <span className="text-slate-400 text-[10px]">(เขต {item['เขต']})</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium text-[11px]">
                      {item['งวดงาน']}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">{getStatusBadge(item['สถานะการติดตั้ง'])}</td>
                  <td className="py-3.5 px-4">{getDocBadge(item['สถานะเอกสาร'])}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-8 text-slate-400">
                  ไม่พบข้อมูลโรงพยาบาลที่ค้นหา
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/30 text-xs text-slate-500 flex justify-between items-center">
        <span>แสดง {filteredData.length} จากทั้งหมด {hospitalData.length} รายการ</span>
      </div>
    </div>
  );
};