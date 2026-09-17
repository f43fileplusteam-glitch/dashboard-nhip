import React from 'react';
import { X, Building2, Download, Edit3, MessageSquare, CheckCircle2 } from 'lucide-react';

export default function DetailDrawer({ data, onClose }) {
  if (!data) return null;

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm h-full flex flex-col justify-between">
      <div>
        {/* Header Drawer */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-50 text-emerald-600 text-xs px-2.5 py-1 rounded-full border border-emerald-100 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {data.status || 'ติดตั้งเสร็จแล้ว'}
            </span>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info รพ. */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-lg">{data.name || 'โรงพยาบาลศรีสังวร'}</h3>
            <p className="text-xs text-slate-400">{data.code || '10706'} • {data.province || 'เชียงใหม่'} เขต {data.zone || '1'}</p>
          </div>
        </div>

        {/* OS Tags */}
        <div className="flex gap-2 mb-6">
          <span className="bg-blue-50 text-blue-600 text-[11px] px-3 py-1 rounded-lg font-medium">Windows</span>
          <span className="bg-amber-50 text-amber-600 text-[11px] px-3 py-1 rounded-lg font-medium">Ubuntu</span>
          <span className="bg-slate-50 text-slate-500 text-[11px] px-3 py-1 rounded-lg font-medium ml-auto">ประเภท: โรงพยาบาลทั่วไป</span>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-100 flex gap-6 text-xs font-semibold mb-4 text-slate-400">
          <span className="border-b-2 border-blue-600 text-blue-600 pb-2 cursor-pointer">รายละเอียด</span>
          <span className="hover:text-slate-600 pb-2 cursor-pointer">เอกสาร</span>
          <span className="hover:text-slate-600 pb-2 cursor-pointer">ประวัติการติดตั้ง</span>
          <span className="hover:text-slate-600 pb-2 cursor-pointer">หมายเหตุ</span>
        </div>

        {/* Field Details */}
        <div className="space-y-3 text-xs">
          <div className="flex justify-between"><span className="text-slate-400">อัปเดต V ใหม่</span><span className="text-slate-700 font-medium">v1.2.3</span></div>
          <div className="flex justify-between"><span className="text-slate-400">สถานะการติดตั้ง</span><span className="text-emerald-600 font-medium">✓ ติดตั้งเสร็จแล้ว</span></div>
          <div className="flex justify-between"><span className="text-slate-400">งวดงาน</span><span className="text-slate-700 font-medium">งวด 5</span></div>
          <div className="flex justify-between"><span className="text-slate-400">สถานะเอกสาร</span><span className="text-emerald-600 font-medium">✓ ส่งมอบงานแล้ว</span></div>
          <div className="flex justify-between"><span className="text-slate-400">วันที่ส่งเอกสาร PIS ตรวจ</span><span className="text-slate-700 font-medium">8 ก.ย. 2568</span></div>
          <div className="flex justify-between"><span className="text-slate-400">เจ้าหน้าที่ติดตั้ง</span><span className="text-slate-700 font-medium">สมชาย ใจดี</span></div>
          <div className="flex justify-between"><span className="text-slate-400">วันที่ติดตั้งเสร็จ</span><span className="text-slate-700 font-medium">12 ก.ย. 2568</span></div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-slate-100">
        <button className="flex items-center justify-center gap-1.5 py-2 px-3 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50">
          <MessageSquare className="w-3.5 h-3.5" /> พิมพ์รายงาน
        </button>
        <button className="flex items-center justify-center gap-1.5 py-2 px-3 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50">
          <Download className="w-3.5 h-3.5" /> ดาวน์โหลด
        </button>
        <button className="flex items-center justify-center gap-1.5 py-2 px-3 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700">
          <Edit3 className="w-3.5 h-3.5" /> แก้ไขข้อมูล
        </button>
      </div>
    </div>
  );
}