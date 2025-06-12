// utils/exportSensorDataToExcel.ts
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

export type SensorRow = {
  created_at: string;
  turbidity_level: number;
  tds_level: number;
  volume_liter: number;
  water_pump_status: boolean;
  air_pump_status: boolean;
};

export const exportSensorDataToExcel = async (
  data: SensorRow[],
  filename = 'sensor_data.xlsx'
) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sensor Data');

  // Define headers
  const headers = [
    { header: 'Waktu', key: 'created_at' },
    { header: 'Turbidity (NTU)', key: 'turbidity_level' },
    { header: 'TDS (ppm)', key: 'tds_level' },
    { header: 'Volume (L)', key: 'volume_liter' },
    { header: 'Water Pump', key: 'water_pump_status' },
    { header: 'Air Pump', key: 'air_pump_status' },
  ];

  worksheet.columns = headers.map((col) => ({
    ...col,
    width: col.header.length + 5,
    style: { font: { name: 'Arial', size: 12 } },
  }));

  data.forEach((item) => {
    worksheet.addRow({
      ...item,
      water_pump_status: item.water_pump_status ? 'ON' : 'OFF',
      air_pump_status: item.air_pump_status ? 'ON' : 'OFF',
    });
  });

  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
    cell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
  });

  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell) => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      if (rowNumber !== 1) {
        cell.alignment = { vertical: 'middle', horizontal: 'left' };
      }
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  saveAs(blob, filename);
};
