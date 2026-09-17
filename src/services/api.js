import { normalizeHospitalData } from '../utils/normalize';

// URL สำหรับดึงข้อมูลจาก Google Sheet (Google Apps Script Web App)
const GOOGLE_SHEET_API_URL = 'https://script.google.com/macros/s/AKfycbwKR_PBq12X7Rkr0aEKfZbf-VCp7HTWeLT5_h6ZmcJFnjdnPPcLjERsPt61U0pjH1SIvg/exec';

export const fetchHospitalData = async () => {
  try {
    const response = await fetch(GOOGLE_SHEET_API_URL);
    if (!response.ok) {
      throw new Error('ไม่สามารถดึงข้อมูลจาก Google Sheet ได้');
    }
    const data = await response.json();
    
    // แปลงข้อมูลให้อยู่ในรูปแบบมาตรฐานด้วย normalize
    return normalizeHospitalData(data);
  } catch (error) {
    console.error('Fetch Error:', error);
    throw error;
  }
};