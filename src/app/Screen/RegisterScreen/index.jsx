import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { auth } from "../../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firestore } from "../../../firebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import { useUser } from "../../contexts/UserContext";

const Register = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useUser();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }
  
    try {
      // Criar usuário no Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(firestore, "users", user.uid), {
        name, // Nome do usuário
        email, // E-mail do usuário
        id: user.uid, // ID do Authentication
      });

      setUser(user.uid);

      navigation.navigate("Onboarding");
  
      // Exibir mensagem de sucesso
      Alert.alert("Sucesso", "Usuário registrado com sucesso!");
  
      // Aqui podemos redirecionar para outra página ou salvar mais dados no Firestore
    } catch (error) {
      // Tratamento de erros
      if (error.code === "auth/email-already-in-use") {
        Alert.alert("Erro", "Este e-mail já está sendo usado. Por favor, use outro.");
      } else if (error.code === "auth/invalid-email") {
        Alert.alert("Erro", "O e-mail fornecido é inválido.");
      } else if (error.code === "auth/weak-password") {
        Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres.");
      } else {
        Alert.alert("Erro", error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Registrar" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Centraliza verticalmente
    alignItems: "center", // Centraliza horizontalmente
    padding: 20, // Espaçamento interno
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20, // Espaço abaixo do título
  },
  input: {
    width: "100%", // Ocupar toda a largura disponível
    maxWidth: 400, // Largura máxima para telas grandes
    padding: 10, // Espaço interno do campo
    borderWidth: 1, // Borda simples
    borderColor: "#ccc", // Cor da borda
    borderRadius: 5, // Bordas arredondadas
    marginBottom: 15, // Espaço entre os inputs
  },
});

export default Register;
