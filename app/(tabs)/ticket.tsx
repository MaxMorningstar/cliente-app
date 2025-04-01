// app/ticket.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Button, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import * as Print from 'expo-print';

interface Ticket {
  nombre_cliente: string;
  codigo_unico: string;
  detalles: string;
  total: number;
}

const API_BASE_URL = 'http://192.168.1.69/Parqueacuatico/Parque/api'; // Reemplaza con la URL de tu servidor

export default function TicketScreen() {
  const { codigo } = useLocalSearchParams() as { codigo: string };
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchTicket = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/ticket.php?codigo=${codigo}`);
      const data = await response.json();
      if (data.success) {
        setTicket(data.venta as Ticket);
      }
    } catch (error) {
      console.error('Error fetching ticket', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicket();
  }, []);

  const handlePrintTicket = async () => {
    if (!ticket) return;

    // Genera el contenido HTML para el ticket.
    const htmlContent = `
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { text-align: center; }
            .ticket { margin-top: 20px; }
            .ticket p { margin: 5px 0; }
            .detalles { margin-top: 10px; }
          </style>
        </head>
        <body>
          <h1>Ticket de Compra</h1>
          <div class="ticket">
            <p><strong>Nombre:</strong> ${ticket.nombre_cliente}</p>
            <p><strong>Código Único:</strong> ${ticket.codigo_unico}</p>
            <p><strong>Total:</strong> $${ticket.total.toFixed(2)}</p>
            <div class="detalles">
              <p><strong>Detalles:</strong></p>
              ${ticket.detalles.split('\n').map(line => `<p>${line}</p>`).join('')}
            </div>
          </div>
        </body>
      </html>
    `;

    try {
      await Print.printAsync({
        html: htmlContent,
      });
    } catch (error) {
      Alert.alert('Error', 'No se pudo imprimir el ticket.');
      console.error(error);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (!ticket) {
    return (
      <View style={styles.center}>
        <Text>No se encontró el ticket.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Ticket de Compra</Text>
      <Text style={styles.label}>Nombre: {ticket.nombre_cliente}</Text>
      <Text style={styles.label}>Código Único: {ticket.codigo_unico}</Text>
      <Text style={styles.subtitle}>Detalles:</Text>
      {ticket.detalles.split('\n').map((line: string, index: number) => (
        <Text key={index} style={styles.detail}>{line}</Text>
      ))}
      <Text style={styles.total}>Total: ${ticket.total.toFixed(2)}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Imprimir Ticket" onPress={handlePrintTicket} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 18, marginVertical: 5 },
  subtitle: { fontSize: 20, fontWeight: '600', marginTop: 15 },
  detail: { fontSize: 16, marginVertical: 2 },
  total: { fontSize: 22, fontWeight: 'bold', marginTop: 20, textAlign: 'center' },
  buttonContainer: { marginTop: 30 },
});
