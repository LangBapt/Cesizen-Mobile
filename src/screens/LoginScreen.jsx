import { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  KeyboardAvoidingView, 
  Platform,
  ActivityIndicator 
} from "react-native";
import { useAuth } from "../context/AuthContext";
import AppLogo from "../components/AppLogo";

const LoginScreen = ({ navigation }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) { 
      Alert.alert("Erreur", "Tous les champs sont requis."); 
      return; 
    }

    setIsLoading(true);
    try {
      await login(email, password);
      
      navigation.replace("Main"); 
      
    } catch (err) {
      Alert.alert("Erreur", err.response?.data?.message || "Identifiants incorrects.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <AppLogo size={120} style={styles.logoContainer} />
      <Text style={styles.title}>CESIZen</Text>
      <Text style={styles.subtitle}>Votre santé mentale au quotidien</Text>
      
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
        keyboardType="email-address" 
        autoCapitalize="none" 
      />
      
      <TextInput 
        style={styles.input} 
        placeholder="Mot de passe" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
      />
      
      <TouchableOpacity 
        style={[styles.button, isLoading && { opacity: 0.7 }]} 
        onPress={handleLogin}
        disabled={isLoading} 
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Se connecter</Text>
        )}
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.link}>Pas encore de compte ? S'inscrire</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24, backgroundColor: "#f0f4f8" },
  logoContainer: {
    marginBottom: 20,
  },
  title: { fontSize: 28, fontWeight: "700", textAlign: "center", color: "#01bf60", marginBottom: 4 },
  subtitle: { fontSize: 14, textAlign: "center", color: "#718096", marginBottom: 32 },
  input: { backgroundColor: "white", borderRadius: 8, padding: 14, marginBottom: 12, fontSize: 16, borderWidth: 1, borderColor: "#e2e8f0" },
  button: { backgroundColor: "#01bf60", padding: 16, borderRadius: 8, alignItems: "center", marginTop: 8 },
  buttonText: { color: "white", fontWeight: "700", fontSize: 16 },
  link: { textAlign: "center", color: "#01bf60", marginTop: 20, fontSize: 14 },
});

export default LoginScreen;