import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useTokenContext } from "../../src/contexts/userContext";
import api from "../../src/services/api";
import { Car } from "../../src/types/Car";

export default function CreateCar() {
  const router = useRouter();
  const { token } = useTokenContext();

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [hp, setHp] = useState("");

  const handleCreate = async () => {
    if (!brand || !model || !hp) {
      Alert.alert("Error!", "All fields are required!");
      return;
    }

    const data = {
      model,
      brand,
      hp: parseInt(hp),
    };

    try {
      const createdCar = await api.post<Car>(
        "/api/collections/schons_cars/records",
        data,
        {
          headers: {
            Authorization: token,
            "content-type": "application/json",
          },
        }
      );

      if (createdCar.status === 200) {
        Alert.alert("Created!", createdCar.data.model);
        router.replace("/userspace");
      } else {
        Alert.alert("Error!", "Error Creating Car!");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error!", "Error Creating Car!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cars API CREATE</Text>

      <TextInput
        value={brand}
        onChangeText={setBrand}
        placeholder="Brand"
        style={styles.input}
        placeholderTextColor="#999"
      />
      <TextInput
        value={model}
        onChangeText={setModel}
        placeholder="Model"
        style={styles.input}
        placeholderTextColor="#999"
      />
      <TextInput
        value={hp}
        onChangeText={(text) => setHp(text.replace(/[^0-9]/g, ""))}
        placeholder="HP"
        keyboardType="number-pad"
        style={styles.input}
        placeholderTextColor="#999"
      />

      <Button title="Create Car" onPress={handleCreate} color="#ff4757" />
      <Link href="/userspace" style={styles.link}>
        <Text style={styles.linkText}>Back to List</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#fff",
  },
  input: {
    width: "80%",
    height: 40,
    backgroundColor: "#444",
    borderRadius: 8,
    padding: 10,
    color: "#fff",
    marginBottom: 16,
  },
  link: {
    marginTop: 16,
  },
  linkText: {
    color: "#ff4757",
  },
});
