import { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { FaFilePdf, FaFileExcel } from 'react-icons/fa';
import CarForm from './components/CarForm';
import CarList from './components/CarList';
import { PDFDocument } from './components/ReportPDF';
import { generateExcel } from './components/ExcelGenerator';
import { getChartImage } from './components/ReportPDF';

export type Car = {
  id: string;
  model: string;
  price: number;
};

export default function App() {
  const [cars, setCars] = useState<Car[]>([]);
  const [pdfReady, setPdfReady] = useState(false);
  const [chartImage, setChartImage] = useState('');

  const handleAddCar = (car: Car) => {
    setCars([...cars, car]);
  };

  const handleRemoveCar = (id: string) => {
    setCars(cars.filter(car => car.id !== id));
  };

  const handleGeneratePdf = async () => {
    if (cars.length === 0) return;
    
    setPdfReady(false);
    const image = await getChartImage(cars);
    setChartImage(image);
    setPdfReady(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Sistema de Relatórios de Carros
        </h1>

        <CarForm onAddCar={handleAddCar} />

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Carros Cadastrados</h2>
            <div className="flex space-x-3">
              <button
                onClick={handleGeneratePdf}
                disabled={cars.length === 0}
                className={`flex items-center px-4 py-2 rounded-md ${
                  cars.length === 0 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-red-600 hover:bg-red-700'
                } text-white`}
              >
                <FaFilePdf className="mr-2" />
                Gerar PDF
              </button>
              
              <button
                onClick={() => generateExcel(cars)}
                disabled={cars.length === 0}
                className={`flex items-center px-4 py-2 rounded-md ${
                  cars.length === 0 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-green-600 hover:bg-green-700'
                } text-white`}
              >
                <FaFileExcel className="mr-2" />
                Gerar Excel
              </button>
            </div>
          </div>
          
          <CarList cars={cars} onRemoveCar={handleRemoveCar} />
        </div>

        {pdfReady && (
          <div className="mt-4 text-center">
            <PDFDownloadLink
              document={<PDFDocument cars={cars} chartImage={chartImage} />}
              fileName="relatorio-carros.pdf"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              {({ loading }) => 
                loading ? 'Preparando PDF...' : 'Baixar PDF Agora'
              }
            </PDFDownloadLink>
          </div>
        )}
      </div>
    </div>
  );
}