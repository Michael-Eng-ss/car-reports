import React from 'react';
import { 
  Document, 
  Page, 
  View, 
  Text, 
  StyleSheet, 
  Image 
} from '@react-pdf/renderer';
import ChartJS from 'chart.js/auto';
import { ArcElement, Tooltip } from 'chart.js';
import type { Car } from '../App';

ChartJS.register(ArcElement, Tooltip);

export const getChartImage = (cars: Car[]): Promise<string> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = 500;
    const ctx = canvas.getContext('2d');
    if (!ctx) return resolve('');

    // Dados para o gráfico
    const labels = cars.map(car => car.model);
    const data = cars.map(car => car.price);
    
    // Criar gráfico manualmente
    new ChartJS(ctx, {
      type: 'pie',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
            '#9966FF', '#FF9F40', '#8AC926', '#1982C4'
          ],
        }]
      },
      options: {
        responsive: false,
        animation: {
          onComplete: () => {
            const image = canvas.toDataURL('image/png');
            resolve(image);
          }
        },
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: true,
            text: 'Distribuição de Preços por Modelo'
          }
        }
      }
    });
  });
};

// Estilos para o PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  date: {
    fontSize: 10,
    color: '#666',
  },
  table: {
    width: '100%',
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '50%',
    padding: 8,
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
  },
  tableCol: {
    width: '50%',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  chartContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 10,
    color: '#666',
  },
});

// Componente do documento PDF
export const PDFDocument = ({ cars, chartImage }: { cars: Car[]; chartImage: string }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Relatório de Carros</Text>
        <Text style={styles.date}>
          Gerado em: {new Date().toLocaleDateString('pt-BR')}
        </Text>
      </View>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text>Modelo</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text>Preço (R$)</Text>
          </View>
        </View>
        
        {cars.map((car) => (
          <View key={car.id} style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text>{car.model}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text>
                {car.price.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {chartImage && (
        <View style={styles.chartContainer}>
          <Image src={chartImage} style={{ width: '300px', height: '300px' }} />
        </View>
      )}

      <View style={styles.footer}>
        <Text>Relatório gerado por Car Reports App</Text>
      </View>
    </Page>
  </Document>
);