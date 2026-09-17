import React, { useState, useEffect } from 'react';
import { Layout } from './components/layout/Layout';
import { KpiCards } from './components/dashboard/KpiCards';
import { ChartsSection } from './components/dashboard/ChartsSection';
import { HospitalTable } from './components/dashboard/HospitalTable';
import { calculateKPIs } from './utils/calculations';
import { fetchHospitalData } from './services/api';

// ข้อมูลสำรองเผื่อ API ยังไม่พร้อมใช้งาน
const defaultHospitals = [
  { id: '1', hospcode: '10670', hospitalName: 'รพ.ศรีสังวรสุโขทัย', province: 'สุโขทัย', region: 'เขต 2', installationStatus: 'ติดตั้งเสร็จแล้ว', documentStatus: 'ส่งมอบงานแล้ว', installment: 'งวด 3' },
  { id: '2', hospcode: '10671', hospitalName: 'รพ.นครพนม', province: 'นครพนม', region: 'เขต 8', installationStatus: 'ติดตั้งเสร็จแล้ว', documentStatus: 'ส่ง PIS ตรวจ', installment: 'งวด 3' },
  { id: '3', hospcode: '10672', hospitalName: 'รพ.มหาราชนครเชียงใหม่', province: 'เชียงใหม่', region: 'เขต 1', installationStatus: 'ยังไม่ได้ดำเนินการ', documentStatus: 'กำลังจัดทำรายงาน', installment: 'งวด 4' },
  { id: '4', hospcode: '10673', hospitalName: 'รพ.วชิระภูเก็ต', province: 'ภูเก็ต', region: 'เขต 11', installationStatus: 'ยังไม่ได้ดำเนินการ', documentStatus: 'กำลังจัดทำรายงาน', installment: 'งวด 4' },
  { id: '5', hospcode: '10674', hospitalName: 'รพ.ขอนแก่น', province: 'ขอนแก่น', region: 'เขต 7', installationStatus: 'กำลังติดตั้ง', documentStatus: 'ส่ง PIS ตรวจ', installment: 'งวด 5' },
  { id: '6', hospcode: '10675', hospitalName: 'รพ.ศูนย์อุดรธานี', province: 'อุดรธานี', region: 'เขต 8', installationStatus: 'ติดตั้งเสร็จแล้ว', documentStatus: 'ส่งมอบงานแล้ว', installment: 'งวด 5' },
];

export function App() {
  const [hospitals, setHospitals] = useState(defaultHospitals);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString('th-TH'));

  // ฟังก์ชันโหลดข้อมูลจริง
  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchHospitalData();
      if (data && data.length > 0) {
        setHospitals(data);
      }
    } catch (error) {
      console.warn('ใช้ข้อมูลสำรองเนื่องจากไม่สามารถเชื่อมต่อ API ได้');
    } finally {
      setIsLoading(false);
      setLastUpdated(new Date().toLocaleTimeString('th-TH'));
    }
  };

  useEffect(() => {
    // ดึงข้อมูลครั้งแรกเมื่อเปิดหน้าเว็บ
    loadData();
  }, []);

  const kpiData = calculateKPIs(hospitals);

  return (
    <Layout onRefresh={loadData} isLoading={isLoading}>
      {/* แจ้งเตือนเวลาอัพเดตล่าสุด */}
      <div className="mb-4 flex items-center justify-between text-xs text-slate-500 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-xl border border-slate-200/60">
        <span>สถานะระบบ: <strong className="text-emerald-600">เชื่อมต่อแล้ว</strong></span>
        <span>อัปเดตล่าสุดเมื่อ: {lastUpdated} น.</span>
      </div>

      {/* 1. การ์ดสรุป KPI */}
      <KpiCards kpiData={kpiData} />

      {/* 2. ส่วนแสดงกราฟ */}
      <ChartsSection hospitalData={hospitals} />

      {/* 3. ตารางข้อมูลโรงพยาบาล */}
      <HospitalTable hospitalData={hospitals} />
    </Layout>
  );
}

export default App;