// app/login.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';

const API_BASE_URL = 'http://192.168.1.69/Parqueacuatico/Parque/api'; // Reemplaza con la URL de tu servidor

export default function LoginScreen() {
  const router = useRouter();
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!correo.trim() || !password.trim()) {
      Alert.alert('Error', 'Ingresa correo y contraseña');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/login.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, password }),
      });
      const data = await response.json();
      if (data.success) {
        // Validamos que el usuario NO sea admin para esta app de cliente
        if (data.user.tipo_usuario !== 'admin') {
          router.replace('/(tabs)/home');
        } else {
          Alert.alert('Acceso denegado', 'El usuario no corresponde al perfil de cliente.');
        }
      } else {
        Alert.alert('Error', data.message || 'Credenciales incorrectas.');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cliente Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Ingresar" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});
