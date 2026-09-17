import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

export const ChartsSection = ({ hospitalData = [] }) => {
  // 1. จัดกลุ่มข้อมูลตามงวดงาน
  const installmentOrder = ['งวด 3', 'งวด 4', 'งวด 5', 'งวด 6', 'งวด 7'];
  const targets = { 'งวด 3': 50, 'งวด 4': 150, 'งวด 5': 223, 'งวด 6': 173, 'งวด 7': 173 };

  const barData = installmentOrder.map(inst => {
    const items = hospitalData.filter(h => h.installment === inst);
    const completed = items.filter(h => h.installationStatus === 'ติดตั้งเสร็จแล้ว').length;
    const delivered = items.filter(h => h.documentStatus === 'ส่งมอบงานแล้ว').length;
    
    return {
      name: inst,
      'เป้าหมาย': targets[inst] || 0,
      'ติดตั้งเสร็จ': completed,
      'ส่งมอบงาน': delivered,
    };
  });

  // 2. จัดกลุ่มข้อมูลสถานะเอกสารสำหรับ Pie Chart
  const docStatusCount = hospitalData.reduce((acc, h) => {
    const status = h.documentStatus || 'อื่นๆ';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#64748B'];
  const pieData = Object.keys(docStatusCount).map(key => ({
    name: key,
    value: docStatusCount[key]
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      {/* Bar Chart - แสดงความก้าวหน้าตามงวดงาน */}
      <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="mb-4">
          <h3 className="text-base font-bold text-slate-800">ความก้าวหน้าการดำเนินงานแยกตามงวดงาน</h3>
          <p className="text-xs text-slate-500">เปรียบเทียบเป้าหมาย การติดตั้ง และการส่งมอบเอกสาร</p>
        </div>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="name" stroke="#64748B" fontSize={12} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={12} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '12px', border: 'none' }}
                itemStyle={{ color: '#FFF', fontSize: '12px' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Bar dataKey="เป้าหมาย" fill="#94A3B8" radius={[4, 4, 0, 0]} />
              <Bar dataKey="ติดตั้งเสร็จ" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="ส่งมอบงาน" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Chart - สัดส่วนสถานะเอกสาร */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-800">สัดส่วนสถานะเอกสาร</h3>
          <p className="text-xs text-slate-500">จำแนกตามขั้นตอนการดำเนินงานเอกสาร</p>
        </div>
        <div className="h-60 w-full my-auto">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '12px', border: 'none' }}
                itemStyle={{ color: '#FFF', fontSize: '12px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
          {pieData.map((entry, index) => (
            <div key={index} className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
              <span className="text-slate-600 truncate">{entry.name}:</span>
              <span className="font-semibold text-slate-800">{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};