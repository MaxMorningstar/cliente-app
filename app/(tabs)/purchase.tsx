// app/purchase.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const API_BASE_URL = 'http://192.168.1.69/Parqueacuatico/Parque/api'; // Reemplaza con la URL de tu servidor

export default function PurchaseScreen() {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [entradasAdulto, setEntradasAdulto] = useState('0');
  const [entradasNino, setEntradasNino] = useState('0');
  const [sillas, setSillas] = useState('0');
  const [mesas, setMesas] = useState('0');
  const [sombrillas, setSombrillas] = useState('0');

  const calcularTotal = () => {
    const total =
      parseInt(entradasAdulto) * 180 +
      parseInt(entradasNino) * 120 +
      parseInt(sillas) * 30 +
      parseInt(mesas) * 50 +
      parseInt(sombrillas) * 50;
    return total;
  };

  const handlePurchase = async () => {
    if (!nombre.trim()) {
      Alert.alert('Error', 'El nombre es requerido');
      return;
    }
    const payload = {
      nombre,
      entradas_adulto: entradasAdulto,
      entradas_nino: entradasNino,
      sillas,
      mesas,
      sombrillas,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/purchase.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (data.success) {
        router.push(`/ticket?codigo=${data.codigo_unico}`);
      } else {
        Alert.alert('Error', data.message || 'Error en la compra');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Nombre Completo</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu nombre completo"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.label}>Entradas Adulto (precio $180 c/u)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={entradasAdulto}
        onChangeText={setEntradasAdulto}
      />

      <Text style={styles.label}>Entradas Niño (precio $120 c/u)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={entradasNino}
        onChangeText={setEntradasNino}
      />

      <Text style={styles.label}>Sillas (precio $30 c/u)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={sillas}
        onChangeText={setSillas}
      />

      <Text style={styles.label}>Mesas (precio $50 c/u)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={mesas}
        onChangeText={setMesas}
      />

      <Text style={styles.label}>Sombrillas (precio $50 c/u)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={sombrillas}
        onChangeText={setSombrillas}
      />

      <Text style={styles.total}>Total: ${calcularTotal()}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Comprar" onPress={handlePurchase} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { marginTop: 15, fontSize: 16, fontWeight: '600' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
  },
  total: { marginTop: 20, fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  buttonContainer: { marginTop: 30 },
});
