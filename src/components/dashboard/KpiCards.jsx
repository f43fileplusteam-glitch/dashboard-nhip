import React from 'react';
import { Building2, CheckCircle2, Clock, FileText, ArrowRight } from 'lucide-react';

export default function KpiCards({ data = {} }) {
  const install = data.install || { total: 769, completed: 520, pending: 249 };
  const docs = data.docs || { draft: 45, pisCheck: 38, sentHospital: 62, pisSigned: 54, delivered: 410 };
  const progress = data.progress || [
    { name: 'งวด 3', count: '12/50' },
    { name: 'งวด 4', count: '45/150' },
    { name: 'งวด 5', count: '78/223' },
    { name: 'งวด 6', count: '60/173' },
    { name: 'งวด 7', count: '58/173' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
      {/* บล็อกที่ 1: สถานะการติดตั้งทั้งหมด */}
      <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
        <div className="flex items-center gap-2 mb-3 text-slate-700 font-semibold text-sm">
          <Building2 className="w-4 h-4 text-blue-600" />
          <span>สถานะการติดตั้งทั้งหมด</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex flex-col justify-between">
            <span className="text-xs text-slate-500 font-medium">สถานะการติดตั้งทั้งหมด</span>
            <div className="mt-2">
              <span className="text-2xl font-bold text-slate-800">{install.total}</span>
              <span className="text-xs text-slate-500 ml-1">แห่ง</span>
            </div>
          </div>
          <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-100 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs text-emerald-700 font-medium">ติดตั้งเสร็จแล้ว</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold text-emerald-600">{install.completed} <span className="text-xs font-normal">แห่ง</span></div>
              <span className="text-[11px] text-emerald-600">
                {((install.completed / install.total) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
          <div className="bg-amber-50/50 p-3 rounded-xl border border-amber-100 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs text-amber-700 font-medium">ยังไม่ได้ดำเนินการ</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold text-amber-600">{install.pending} <span className="text-xs font-normal">แห่ง</span></div>
              <span className="text-[11px] text-amber-600">
                {((install.pending / install.total) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* บล็อกที่ 2: สถานะเอกสาร */}
      <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
        <div className="flex items-center gap-2 mb-3 text-slate-700 font-semibold text-sm">
          <FileText className="w-4 h-4 text-blue-600" />
          <span>สถานะเอกสาร</span>
        </div>
        <div className="grid grid-cols-5 gap-1.5">
          <div className="bg-blue-50/60 p-2 rounded-xl text-center">
            <span className="text-[10px] text-slate-500 block h-6 leading-tight">กำลังจัดทำรายงาน</span>
            <span className="text-lg font-bold text-blue-600">{docs.draft}</span>
          </div>
          <div className="bg-indigo-50/60 p-2 rounded-xl text-center">
            <span className="text-[10px] text-slate-500 block h-6 leading-tight">ส่ง PIS ตรวจ</span>
            <span className="text-lg font-bold text-indigo-600">{docs.pisCheck}</span>
          </div>
          <div className="bg-purple-50/60 p-2 rounded-xl text-center">
            <span className="text-[10px] text-slate-500 block h-6 leading-tight">ส่ง รพ. เซ็น</span>
            <span className="text-lg font-bold text-purple-600">{docs.sentHospital}</span>
          </div>
          <div className="bg-teal-50/60 p-2 rounded-xl text-center">
            <span className="text-[10px] text-slate-500 block h-6 leading-tight">มีลายเซ็น PIS</span>
            <span className="text-lg font-bold text-teal-600">{docs.pisSigned}</span>
          </div>
          <div className="bg-emerald-50/60 p-2 rounded-xl text-center">
            <span className="text-[10px] text-slate-500 block h-6 leading-tight">ส่งมอบงานแล้ว</span>
            <span className="text-lg font-bold text-emerald-600">{docs.delivered}</span>
          </div>
        </div>
      </div>

      {/* บล็อกที่ 3: ความคืบหน้างวดงาน */}
      <div className="lg:col-span-3 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-slate-700">ความคืบหน้างวดงาน</span>
        </div>
        <div className="space-y-1.5 text-xs">
          {progress.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center py-0.5">
              <span className="text-slate-500 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>
                {item.name}
              </span>
              <span className="font-semibold text-slate-700">{item.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}