import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useAuth } from "../context/AuthContext";

const HomeScreen = () => {
  const { user } = useAuth();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>🧘</Text>
        <Text style={styles.title}>CESIZen</Text>
        <Text style={styles.welcome}>Bonjour, {user?.username} 👋</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🧠 Votre santé mentale</Text>
        <Text style={styles.cardText}>CESIZen vous accompagne au quotidien avec des exercices de respiration, des informations sur la santé mentale et des outils pour mieux gérer votre stress.</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>💡 Le saviez-vous ?</Text>
        <Text style={styles.cardText}>La cohérence cardiaque est une technique de respiration qui permet de réduire le stress en seulement 5 minutes. Essayez-la dans l'onglet Respiration !</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📖 Explorer</Text>
        <Text style={styles.cardText}>Consultez nos articles sur la santé mentale dans l'onglet Informations pour mieux comprendre et agir sur votre bien-être.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f4f8" },
  header: { backgroundColor: "#2c7a7b", padding: 32, paddingTop: 60, alignItems: "center" },
  logo: { fontSize: 50 },
  title: { fontSize: 28, fontWeight: "700", color: "white", marginTop: 8 },
  welcome: { fontSize: 16, color: "rgba(255,255,255,0.85)", marginTop: 4 },
  card: { backgroundColor: "white", margin: 16, marginBottom: 0, borderRadius: 12, padding: 20, shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 6, elevation: 3 },
  cardTitle: { fontSize: 18, fontWeight: "600", color: "#2c7a7b", marginBottom: 8 },
  cardText: { fontSize: 14, color: "#4a5568", lineHeight: 22 },
});

export default HomeScreen;