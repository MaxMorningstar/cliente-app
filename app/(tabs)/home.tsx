// app/home.tsx
import React from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Bienvenidos al Parque Acuático</Text>
      <Text style={styles.subtitle}>Instalaciones:</Text>
      <View style={styles.section}>
        <Text>- Alberca infantil</Text>
        <Text>- Alberca familiar</Text>
        <Text>- Alberca de olas con toboganes</Text>
        <Text>- Lago natural</Text>
        <Text>- Cabañas para 4 y 6 personas</Text>
        <Text>- Áreas de camping y estacionamiento</Text>
        <Text>- Servicio médico, regaderas, seguridad 24 Hrs.</Text>
        <Text>- Asadores, áreas verdes y renta de casas de campaña</Text>
      </View>
      <Text style={styles.subtitle}>Costos:</Text>
      <View style={styles.section}>
        <Text>- Entrada Adulto: $180</Text>
        <Text>- Entrada Niño: $120</Text>
        <Text>- Silla: $30</Text>
        <Text>- Mesa: $50</Text>
        <Text>- Sombrilla: $50</Text>
        <Text>- Renta de cabañas y casas de campaña según capacidad</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Realizar Compra" onPress={() => router.push('/purchase')} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginVertical: 20 },
  subtitle: { fontSize: 18, fontWeight: '600', marginTop: 20 },
  section: { marginVertical: 10, alignSelf: 'stretch' },
  buttonContainer: { marginTop: 30, width: '100%' },
});
