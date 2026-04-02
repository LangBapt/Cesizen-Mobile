import { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from "react-native";

const ExerciseRunScreen = ({ route, navigation }) => {
  const { exercise } = route.params;
  const phases = exercise.composes;
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(phases[0]?.durationSeconds || 0);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);
  
  const scale = useRef(new Animated.Value(1)).current;
  const currentPhase = phases[currentPhaseIndex];

  useEffect(() => {
    if (!running || finished) {
      scale.stopAnimation();
      return;
    }

    const name = currentPhase?.respirationPhase?.respirationPhaseName?.toLowerCase() || "";
    let toValue = scale._value;

    if (name.includes("inspir")) toValue = 1.6;
    if (name.includes("expir")) toValue = 0.8;

    Animated.timing(scale, {
      toValue,
      duration: timeLeft * 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [currentPhaseIndex, running]);

  useEffect(() => {
    let interval = null;

    if (running && !finished) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            const nextIndex = currentPhaseIndex + 1;
            
            if (nextIndex < phases.length) {
              setCurrentPhaseIndex(nextIndex);
              return phases[nextIndex].durationSeconds;
            } else {
              const newCycle = cycleCount + 1;
              const totalCyclesNeeded = Math.floor(exercise.duration / phases.reduce((s, p) => s + p.durationSeconds, 0));

              if (newCycle >= totalCyclesNeeded) {
                setFinished(true);
                setRunning(false);
                return 0;
              } else {
                setCycleCount(newCycle);
                setCurrentPhaseIndex(0);
                return phases[0].durationSeconds;
              }
            }
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [running, currentPhaseIndex, cycleCount, finished]);


  const totalCycles = Math.floor(exercise.duration / phases.reduce((s, p) => s + p.durationSeconds, 0));

  const getPhaseColor = (name = "") => {
    const n = name.toLowerCase();
    if (n.includes("inspir")) return "#2c7a7b";
    if (n.includes("expir")) return "#e53e3e";
    return "#d69e2e";
  };

  if (finished) {
    return (
      <View style={styles.container}>
        <Text style={styles.finishedTitle}>Exercice terminé !</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Retour</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.exerciseTitle}>{exercise.title}</Text>
      <Text style={styles.cycleText}>Cycle {cycleCount + 1} / {totalCycles}</Text>
      
      <View style={styles.animContainer}>
        <Animated.View style={[
          styles.circle, 
          { transform: [{ scale }], backgroundColor: getPhaseColor(currentPhase?.respirationPhase?.respirationPhaseName) }
        ]}>
          <Text style={styles.phaseEmoji}>
            {currentPhase?.respirationPhase?.respirationPhaseName?.toLowerCase().includes("inspir") ? "↑" :
             currentPhase?.respirationPhase?.respirationPhaseName?.toLowerCase().includes("expir") ? "↓" : "—"}
          </Text>
        </Animated.View>
      </View>

      <Text style={styles.phaseName}>{currentPhase?.respirationPhase?.respirationPhaseName}</Text>
      <Text style={styles.timer}>{timeLeft}s</Text>

      <View style={styles.phaseList}>
        {phases.map((p, i) => (
          <View key={i} style={[styles.phaseChip, i === currentPhaseIndex && styles.phaseChipActive]}>
            <Text style={[styles.phaseChipText, i === currentPhaseIndex && styles.phaseChipTextActive]}>
              {p.respirationPhase.respirationPhaseName}
            </Text>
          </View>
        ))}
      </View>

      <TouchableOpacity 
        style={[styles.button, running ? styles.buttonStop : styles.buttonStart]} 
        onPress={() => setRunning(!running)}
      >
        <Text style={styles.buttonText}>{running ? "⏸ Pause" : "▶ Démarrer"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f4f8", alignItems: "center", justifyContent: "center", padding: 24 },
  exerciseTitle: { fontSize: 20, fontWeight: "700", color: "#2d3748", textAlign: "center", marginBottom: 4 },
  cycleText: { fontSize: 14, color: "#718096", marginBottom: 32 },
  animContainer: { width: 200, height: 200, alignItems: "center", justifyContent: "center", marginBottom: 24 },
  circle: { width: 120, height: 120, borderRadius: 60, alignItems: "center", justifyContent: "center" },
  phaseEmoji: { fontSize: 36, color: "white" },
  phaseName: { fontSize: 22, fontWeight: "700", color: "#2c7a7b", marginBottom: 8 },
  timer: { fontSize: 48, fontWeight: "700", color: "#2d3748", marginBottom: 24 },
  phaseList: { flexDirection: "row", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 32 },
  phaseChip: { backgroundColor: "#e2e8f0", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  phaseChipActive: { backgroundColor: "#2c7a7b" },
  phaseChipText: { color: "#4a5568", fontSize: 13 },
  phaseChipTextActive: { color: "white", fontWeight: "600" },
  button: { padding: 16, borderRadius: 12, minWidth: 180, alignItems: "center" },
  buttonStart: { backgroundColor: "#2c7a7b" },
  buttonStop: { backgroundColor: "#2c7a7b" },
  buttonText: { color: "white", fontWeight: "700", fontSize: 16 },
  finishedEmoji: { fontSize: 70, marginBottom: 16 },
  finishedTitle: { fontSize: 28, fontWeight: "700", color: "#2c7a7b", marginBottom: 12 },
  finishedSubtitle: { fontSize: 15, color: "#718096", textAlign: "center", lineHeight: 24, marginBottom: 32 },
});

export default ExerciseRunScreen;
