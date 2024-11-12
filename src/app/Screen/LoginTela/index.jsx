import React, { useState } from "react";
import {
  Alert
} from "react-native";
import { auth } from "../../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useUser } from "../../contexts/UserContext";
import { firestore } from "../../../firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { Container, LoginButton, LoginButtonText, LoginInput, LoginTitle, RegisterLink, RegisterText } from "./style";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setUser } = useUser();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      // Pegando o userId do Firebase e atualizando o contexto
      const userId = userCredential.user.uid;

      // Ref para o documento do usuário no Firestore
      const userDocRef = doc(firestore, "users", userId);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        // Se o documento não existir, criamos um novo com dados iniciais
        await setDoc(userDocRef, {
          name: "Usuário Novo", // Nome padrão
          email: userCredential.user.email, // E-mail do usuário
          createdDate: new Date(), // Data de criação do usuário
        });
      }

      setUser(userId); // Atualiza o contexto com o userId

      Alert.alert("Login bem-sucedido!");
      navigation.navigate("Stats"); // Ajuste para a tela desejada
    } catch (error) {
      Alert.alert("Erro ao fazer login", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container >
      <LoginTitle>Login</LoginTitle>

      <LoginInput
        placeholder='Digite seu e-mail'
        value={email}
        onChangeText={setEmail}
        keyboardType='email-address'
        autoCapitalize='none'
      />

      <LoginInput
        placeholder='Digite sua senha'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <LoginButton
        onPress={handleLogin}
        disabled={loading}
      >
        <LoginButtonText>
          {loading ? "Carregando..." : "Entrar"}
        </LoginButtonText>
      </LoginButton>

      <RegisterText >
        Ainda não tem uma conta?{" "}
        <RegisterLink
          onPress={() => navigation.navigate("Register")}
        >
          Cadastre-se
        </RegisterLink>
      </RegisterText>
    </Container>
  );
};

export default Login;
