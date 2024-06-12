import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useTokenContext } from "../../src/contexts/userContext";
import api from "../../src/services/api";
import { Car } from "../../src/types/Car";

export default function EditCar() {
  const { token } = useTokenContext();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [hp, setHp] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (id) {
      api
        .get(`/api/collections/schons_cars/records/${id}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setCar(response.data);
          setBrand(response.data.brand);
          setModel(response.data.model);
          setHp(response.data.hp.toString());
        })
        .catch((error) => {
          Alert.alert(error.message);
        });
    }
  }, [id]);

  const handleUpdate = async () => {
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
      const updatedCar = await api.patch<Car>(
        `/api/collections/schons_cars/records/${id}`,
        data,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );

      if (updatedCar.status === 200) {
        Alert.alert("Updated!", updatedCar.data.model);
        router.replace("/userspace");
      } else {
        Alert.alert("Error!", "Error updating car!");
      }
    } catch (error) {
      Alert.alert("Error!", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Car</Text>

      {car && (
        <>
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
          <Button title="Update Car" onPress={handleUpdate} color="#ff4757" />
        </>
      )}
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
});
