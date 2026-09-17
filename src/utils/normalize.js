// ฟังก์ชันล้างข้อมูล และ Map ชื่อ Header ภาษาไทยให้อ่านง่าย
export const normalizeHospitalData = (rawDataList = []) => {
  if (!Array.isArray(rawDataList)) return [];

  return rawDataList.map((item, index) => {
    const getCleanValue = (keys) => {
      for (const key of keys) {
        if (item[key] !== undefined && item[key] !== null) {
          const str = String(item[key]).trim();
          if (str !== '' && str !== '-') return str;
        }
      }
      return null;
    };

    return {
      id: getCleanValue(['รหัสสถานพยาบาล']) || `hosp-${index}`,
      hospcode: getCleanValue(['รหัสสถานพยาบาล']) || '-',
      hospitalName: getCleanValue(['ชื่อโรงพยาบาล']) || 'ไม่ระบุชื่อโรงพยาบาล',
      province: getCleanValue(['จังหวัด']) || 'ไม่ระบุจังหวัด',
      region: getCleanValue(['เขต']) || 'ไม่ระบุเขต',
      installationStatus: getCleanValue(['สถานะการติดตั้ง']) || 'ยังไม่ได้ดำเนินการ',
      installment: getCleanValue(['งวดงาน']) || 'ไม่ระบุงวด',
      documentStatus: getCleanValue(['สถานะเอกสาร']) || 'กำลังจัดทำรายงาน',
      system: getCleanValue(['ระบบ']) || 'ไม่ระบุ',
      type: getCleanValue(['ประเภท']) || 'โรงพยาบาลทั่วไป',
      installer: getCleanValue(['เจ้าหน้าที่ติดตั้ง']) || 'ไม่ระบุ',
      installedDate: getCleanValue(['วันที่ติดตั้งสำเร็จ']),
      note: getCleanValue(['หมายเหตุ'])
    };
  });
};