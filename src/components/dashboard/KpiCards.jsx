import React from 'react';
import { Building2, CheckCircle2, Clock, Send, Activity } from 'lucide-react';

// การ์ดแสดงผลตัวเลขสรุป 5 ช่องด้านบน
export const KpiCards = ({ kpiData }) => {
  const cards = [
    {
      title: 'สถานะการติดตั้งทั้งหมด',
      value: kpiData.total,
      unit: 'แห่ง',
      subtitle: 'โรงพยาบาลในระบบ',
      icon: Building2,
      color: 'bg-blue-500/10 text-blue-600 border-blue-200'
    },
    {
      title: 'ติดตั้งเสร็จแล้ว',
      value: kpiData.completed,
      unit: 'แห่ง',
      subtitle: `${kpiData.completedPct}% ของทั้งหมด`,
      icon: CheckCircle2,
      color: 'bg-emerald-500/10 text-emerald-600 border-emerald-200'
    },
    {
      title: 'ยังไม่ได้ดำเนินการ',
      value: kpiData.pending,
      unit: 'แห่ง',
      subtitle: `${kpiData.pendingPct}% ของทั้งหมด`,
      icon: Clock,
      color: 'bg-amber-500/10 text-amber-600 border-amber-200'
    },
    {
      title: 'ส่งมอบงานแล้ว',
      value: kpiData.delivered,
      unit: 'แห่ง',
      subtitle: `${kpiData.deliveredPct}% ของทั้งหมด`,
      icon: Send,
      color: 'bg-purple-500/10 text-purple-600 border-purple-200'
    },
    {
      title: 'อยู่ระหว่างดำเนินการ',
      value: kpiData.inProgress,
      unit: 'แห่ง',
      subtitle: `${kpiData.inProgressPct}% ของทั้งหมด`,
      icon: Activity,
      color: 'bg-sky-500/10 text-sky-600 border-sky-200'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div 
            key={index} 
            className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500">{card.title}</span>
              <div className={`p-2.5 rounded-xl border ${card.color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {card.value.toLocaleString()}
                </span>
                <span className="text-xs font-medium text-slate-400">{card.unit}</span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-1">{card.subtitle}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};