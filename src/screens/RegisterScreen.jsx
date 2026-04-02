import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { useAuth } from "../context/AuthContext";
import AppLogo from "../components/AppLogo";

const RegisterScreen = ({ navigation }) => {
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!username || !email || !password) { Alert.alert("Erreur", "Tous les champs sont requis."); return; }
    try {
      await register(username, email, password);
    } catch (err) {
      Alert.alert("Erreur", err.response?.data?.message || "Erreur lors de l'inscription.");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <AppLogo size={120} style={styles.logoContainer} />
      <Text style={styles.title}>Créer un compte</Text>
      <TextInput style={styles.input} placeholder="Nom d'utilisateur" value={username} onChangeText={setUsername} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Mot de passe" value={password} onChangeText={setPassword} secureTextEntry />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>S'inscrire</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Déjà un compte ? Se connecter</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24, backgroundColor: "#f0f4f8" },
  logoContainer: {
    marginBottom: 20,
  },
  title: { fontSize: 26, fontWeight: "700", textAlign: "center", color: "#01bf60", marginBottom: 32 },
  input: { backgroundColor: "white", borderRadius: 8, padding: 14, marginBottom: 12, fontSize: 16, borderWidth: 1, borderColor: "#e2e8f0" },
  button: { backgroundColor: "#01bf60", padding: 16, borderRadius: 8, alignItems: "center", marginTop: 8 },
  buttonText: { color: "white", fontWeight: "700", fontSize: 16 },
  link: { textAlign: "center", color: "#01bf60", marginTop: 20, fontSize: 14 },
});

export default RegisterScreen;