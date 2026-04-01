import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import { useAuth } from "../context/AuthContext";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import InformationListScreen from "../screens/InformationListScreen";
import InformationDetailScreen from "../screens/InformationDetailScreen";
import ExerciseConfigScreen from "../screens/ExerciseConfigScreen";
import ExerciseRunScreen from "../screens/ExerciseRunScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabIcon = ({ label }) => <Text style={{ fontSize: 18 }}>{label}</Text>;

const MainTabs = () => (
  <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: "#2c7a7b" }}>
    <Tab.Screen name="Accueil" component={HomeScreen} options={{ tabBarIcon: () => <TabIcon label="🏠" /> }} />
    <Tab.Screen name="Informations" component={InformationListScreen} options={{ tabBarIcon: () => <TabIcon label="📰" /> }} />
    <Tab.Screen name="Respiration" component={ExerciseConfigScreen} options={{ tabBarIcon: () => <TabIcon label="🫁" /> }} />
    <Tab.Screen name="Profil" component={ProfileScreen} options={{ tabBarIcon: () => <TabIcon label="👤" /> }} />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const { user, loading } = useAuth();
  if (loading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainTabs} />
        
        {/* Écrans d'authentification accessibles si non connecté */}
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: true, title: "Connexion" }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: true, title: "Inscription" }} />
        
        {/* Écrans de détails */}
        <Stack.Screen name="InformationDetail" component={InformationDetailScreen} options={{ headerShown: true, title: "Détail" }} />
        <Stack.Screen name="ExerciseRun" component={ExerciseRunScreen} options={{ headerShown: true, title: "Exercice en cours" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;