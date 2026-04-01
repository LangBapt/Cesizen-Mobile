import { useState, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import api from "../api/axiosInstance";

const ExerciseConfigScreen = ({ navigation }) => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(useCallback(() => {
    api.get("/exercises").then(res => { setExercises(res.data); setLoading(false); });
  }, []));

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#2c7a7b" />;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🫁 Exercices de Respiration</Text>
      <Text style={styles.subtitle}>Choisissez un exercice de cohérence cardiaque</Text>
      <FlatList
        data={exercises}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.description}</Text>
            <View style={styles.phases}>
              {item.composes.map((c, i) => (
                <View key={i} style={styles.phase}>
                  <Text style={styles.phaseName}>{c.respirationPhase.respirationPhaseName}</Text>
                  <Text style={styles.phaseDur}>{c.durationSeconds}s</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ExerciseRun", { exercise: item })}>
              <Text style={styles.buttonText}>▶ Lancer l'exercice ({item.duration}s)</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f4f8" },
  header: { fontSize: 22, fontWeight: "700", color: "#2c7a7b", padding: 20, paddingTop: 50, paddingBottom: 4 },
  subtitle: { fontSize: 14, color: "#718096", paddingHorizontal: 20, marginBottom: 4 },
  card: { backgroundColor: "white", borderRadius: 12, padding: 20, marginBottom: 16, elevation: 3, shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 6 },
  title: { fontSize: 18, fontWeight: "700", color: "#2d3748", marginBottom: 6 },
  desc: { fontSize: 14, color: "#718096", lineHeight: 20, marginBottom: 12 },
  phases: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 16 },
  phase: { backgroundColor: "#e6fffa", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, flexDirection: "row", gap: 6 },
  phaseName: { color: "#2c7a7b", fontWeight: "600", fontSize: 13 },
  phaseDur: { color: "#4a5568", fontSize: 13 },
  button: { backgroundColor: "#2c7a7b", padding: 14, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "white", fontWeight: "700", fontSize: 15 },
});

export default ExerciseConfigScreen;