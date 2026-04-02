import { View, Text, ScrollView, StyleSheet } from "react-native";

const InformationDetailScreen = ({ route }) => {
  const { info } = route.params;
  return (
    <ScrollView style={styles.container}>
      <View style={styles.badge}><Text style={styles.badgeText}>{info.category}</Text></View>
      <Text style={styles.title}>{info.title}</Text>
      <Text style={styles.date}>{new Date(info.publicationDate).toLocaleDateString("fr-FR")}</Text>
      <Text style={styles.description}>{info.description}</Text>
      <View style={styles.divider} />
      <Text style={styles.content}>{info.content}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", padding: 24 },
  badge: { backgroundColor: "#e6fffa", alignSelf: "flex-start", paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, marginBottom: 12 },
  badgeText: { color: "#01bf60", fontWeight: "600" },
  title: { fontSize: 24, fontWeight: "700", color: "#2d3748", marginBottom: 8 },
  date: { fontSize: 13, color: "#a0aec0", marginBottom: 16 },
  description: { fontSize: 16, color: "#4a5568", fontStyle: "italic", lineHeight: 24, marginBottom: 16 },
  divider: { height: 1, backgroundColor: "#e2e8f0", marginVertical: 16 },
  content: { fontSize: 15, color: "#4a5568", lineHeight: 26 },
});

export default InformationDetailScreen;