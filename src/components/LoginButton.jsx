import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";

const LoginButton = () => {
  const { user } = useAuth();
  const navigation = useNavigation();

  if (user) return null; 

  return (
    <TouchableOpacity 
      style={styles.btn} 
      onPress={() => navigation.navigate("Login")}
    >
      <Text style={styles.text}>🔑 Se connecter</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: { backgroundColor: "#ffffff", padding: 10, borderRadius: 20, position: "absolute", top: 50, right: 20, zIndex: 10, elevation: 5 },
  text: { color: "#01bf60", fontWeight: "bold", fontSize: 12 }
});

export default LoginButton;