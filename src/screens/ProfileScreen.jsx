import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import { useAuth } from "../context/AuthContext";
import api from "../api/axiosInstance";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const { user, logout } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigation = useNavigation();

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword) { Alert.alert("Erreur", "Remplissez les deux champs."); return; }
    try {
      await api.put(`/users/${user.id}/password`, { currentPassword, newPassword });
      setMsg("Mot de passe mis à jour !");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      setMsg(err.response?.data?.message || "Erreur.");
    }
  };

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
        <Text style={{ fontSize: 18, marginBottom: 20, textAlign: "center" }}>
          Connectez-vous pour gérer votre profil et vos données.
        </Text>
        <TouchableOpacity 
          style={[styles.button, { width: "100%" }]} 
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>Aller à la connexion</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.avatar}>👤</Text>
        <Text style={styles.username}>{user?.username}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <View style={styles.roleBadge}><Text style={styles.roleText}>{user?.role}</Text></View>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🔒 Changer le mot de passe</Text>
        <TextInput style={styles.input} placeholder="Mot de passe actuel" value={currentPassword} onChangeText={setCurrentPassword} secureTextEntry />
        <TextInput style={styles.input} placeholder="Nouveau mot de passe" value={newPassword} onChangeText={setNewPassword} secureTextEntry />
        {msg ? <Text style={msg.includes("✅") || msg.includes("mis à jour") ? styles.success : styles.error}>{msg}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={handlePasswordChange}>
          <Text style={styles.buttonText}>Mettre à jour</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>🚪 Se déconnecter</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f4f8" },
  header: { backgroundColor: "#01bf60", padding: 32, paddingTop: 60, alignItems: "center" },
  avatar: { fontSize: 60 },
  username: { fontSize: 24, fontWeight: "700", color: "white", marginTop: 8 },
  email: { fontSize: 14, color: "rgba(255,255,255,0.8)", marginTop: 4 },
  roleBadge: { backgroundColor: "rgba(255,255,255,0.2)", paddingHorizontal: 16, paddingVertical: 4, borderRadius: 20, marginTop: 8 },
  roleText: { color: "white", fontWeight: "600" },
  card: { backgroundColor: "white", margin: 16, borderRadius: 12, padding: 20, elevation: 3 },
  cardTitle: { fontSize: 18, fontWeight: "600", color: "#01bf60", marginBottom: 16 },
  input: { borderWidth: 1, borderColor: "#e2e8f0", borderRadius: 8, padding: 14, marginBottom: 12, fontSize: 15 },
  success: { color: "#38a169", marginBottom: 8 },
  error: { color: "#e53e3e", marginBottom: 8 },
  button: { backgroundColor: "#01bf60", padding: 14, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "white", fontWeight: "700", fontSize: 15 },
  logoutButton: { backgroundColor: "#e53e3e", margin: 16, padding: 16, borderRadius: 12, alignItems: "center" },
  logoutText: { color: "white", fontWeight: "700", fontSize: 16 },
});

export default ProfileScreen;