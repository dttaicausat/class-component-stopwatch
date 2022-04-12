import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert
} from "react-native";
import Love from "./components/love"
import React from "react";
export default function App() {
  const [text, onChangeText] = React.useState("Useless Text");
  const [number, onChangeNumber] = React.useState(null);
  return (
    <SafeAreaView style={styles.input}>
     <Love />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 800,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
