import { useState } from 'react';

type Car = {
  id: string;
  model: string;
  price: number;
};

type CarFormProps = {
  onAddCar: (car: Car) => void;
};

export default function CarForm({ onAddCar }: CarFormProps) {
  const [model, setModel] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (model && price) {
      onAddCar({
        id: Date.now().toString(),
        model,
        price: Number(price),
      });
      setModel('');
      setPrice('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-4 bg-white rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Modelo</label>
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Preço (R$)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            min="0"
            step="0.01"
            required
          />
        </div>
        
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
          >
            Adicionar Carro
          </button>
        </div>
      </div>
    </form>
  );
}