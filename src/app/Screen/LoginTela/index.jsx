import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { auth } from '../../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useUser } from '../../contexts/UserContext';
import { firestore } from '../../../firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { setUser } = useUser();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);
    try {
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Pegando o userId do Firebase e atualizando o contexto
      const userId = userCredential.user.uid;

      // Ref para o documento do usuário no Firestore
      const userDocRef = doc(firestore, 'users', userId);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        // Se o documento não existir, criamos um novo com dados iniciais
        await setDoc(userDocRef, {
          name: 'Usuário Novo', // Nome padrão
          email: userCredential.user.email, // E-mail do usuário
          createdDate: new Date(), // Data de criação do usuário
        });
      }

      setUser(userId); // Atualiza o contexto com o userId

      Alert.alert('Login bem-sucedido!');
      navigation.navigate('Stats'); // Ajuste para a tela desejada
    } catch (error) {
      Alert.alert('Erro ao fazer login', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Carregando...' : 'Entrar'}</Text>
      </TouchableOpacity>

      <Text style={styles.registerText}>
        Ainda não tem uma conta?{' '}
        <Text style={styles.registerLink} onPress={() => navigation.navigate('Register')}>
          Cadastre-se
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 48,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  button: {
    height: 48,
    borderRadius: 8,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerText: {
    marginTop: 24,
    textAlign: 'center',
    color: '#666',
  },
  registerLink: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});

export default Login;
