import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";

function PageIndex() {
  const [login, setLogin] = useState("");
  const [error, setError] = useState("");

  const handleInput = (text: string) => {
    setLogin(text);
  };

  const handleSubmit = () => {
    setError("");
    if (login === "") {
      setError("Veuillez entrer un login");
      return;
    }

    if (login.length < 3) {
      setError("Le login doit contenir au moins 3 caractères");
      return;
    }

    if (login.length > 50) {
      setError("Le login doit contenir au plus 50 caractères");
      return;
    }

    // Redirect to the user page
    router.push(`/${login}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Veuillez entrer un login :</Text>
      <TextInput
        placeholder="Login"
        style={styles.input}
        autoCapitalize="none"
        onChangeText={handleInput}
        value={login}
        onSubmitEditing={handleSubmit}
        returnKeyType="search"
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={{ color: "white", fontSize: 16 }}>Rechercher</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "black",
    padding: 8,
    margin: 8,
    width: 200,
  },
  button: {
    width: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
    color: "white",
    borderRadius: 4,
    padding: 8,
    margin: 8,
  },
  errorText: {
    color: "red",
  },
});

export default PageIndex;
