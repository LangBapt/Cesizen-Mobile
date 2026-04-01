import { useState, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import api from "../api/axiosInstance";

const InformationListScreen = ({ navigation }) => {
  const [infos, setInfos] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(useCallback(() => {
    api.get("/informations").then(res => { setInfos(res.data); setLoading(false); });
  }, []));

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#2c7a7b" />;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📰 Informations Santé Mentale</Text>
      <FlatList
        data={infos}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("InformationDetail", { info: item })}>
            <View style={styles.badge}><Text style={styles.badgeText}>{item.category}</Text></View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
            <Text style={styles.date}>{new Date(item.publicationDate).toLocaleDateString("fr-FR")}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f4f8" },
  header: { fontSize: 20, fontWeight: "700", color: "#2c7a7b", padding: 20, paddingBottom: 0, paddingTop: 50 },
  card: { backgroundColor: "white", borderRadius: 12, padding: 16, marginBottom: 12, elevation: 3, shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 6 },
  badge: { backgroundColor: "#e6fffa", alignSelf: "flex-start", paddingHorizontal: 10, paddingVertical: 3, borderRadius: 12, marginBottom: 8 },
  badgeText: { color: "#2c7a7b", fontSize: 12, fontWeight: "600" },
  title: { fontSize: 16, fontWeight: "600", color: "#2d3748", marginBottom: 4 },
  desc: { fontSize: 14, color: "#718096", lineHeight: 20 },
  date: { fontSize: 12, color: "#a0aec0", marginTop: 8 },
});

export default InformationListScreen;