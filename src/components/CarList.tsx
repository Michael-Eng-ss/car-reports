import { Car } from '../App';

type CarListProps = {
  cars: Car[];
  onRemoveCar: (id: string) => void;
};

export default function CarList({ cars, onRemoveCar }: CarListProps) {
  if (cars.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Nenhum carro cadastrado
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Modelo
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Preço
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {cars.map((car) => (
            <tr key={car.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {car.model}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {car.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <button
                  onClick={() => onRemoveCar(car.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}