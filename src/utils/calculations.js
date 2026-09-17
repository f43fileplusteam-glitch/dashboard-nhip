// ฟังก์ชันคำนวณตัวเลขสรุป KPI
export const calculateKPIs = (hospitalData = []) => {
  const total = hospitalData.length;
  if (total === 0) {
    return {
      total: 0,
      completed: 0,
      completedPct: '0.0',
      pending: 0,
      pendingPct: '0.0',
      delivered: 0,
      deliveredPct: '0.0',
      inProgress: 0,
      inProgressPct: '0.0'
    };
  }

  const completed = hospitalData.filter(h => h.installationStatus === 'ติดตั้งเสร็จแล้ว').length;
  const pending = hospitalData.filter(h => h.installationStatus === 'ยังไม่ได้ดำเนินการ').length;
  const delivered = hospitalData.filter(h => h.documentStatus === 'ส่งมอบงานแล้ว').length;
  const inProgress = total - completed - pending;

  return {
    total,
    completed,
    completedPct: ((completed / total) * 100).toFixed(1),
    pending,
    pendingPct: ((pending / total) * 100).toFixed(1),
    delivered,
    deliveredPct: ((delivered / total) * 100).toFixed(1),
    inProgress: inProgress < 0 ? 0 : inProgress,
    inProgressPct: (((inProgress < 0 ? 0 : inProgress) / total) * 100).toFixed(1)
  };
};