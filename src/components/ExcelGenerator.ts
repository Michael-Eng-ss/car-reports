import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import type { Car } from '../App';

export const generateExcel = (cars: Car[]) => {
  const worksheet = XLSX.utils.json_to_sheet(
    cars.map(car => ({
      Modelo: car.model,
      Preço: car.price,
    }))
  );

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Carros');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { 
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
  });

  saveAs(blob, 'carros.xlsx');
};