import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useTokenContext } from "../../src/contexts/userContext";
import api from "../../src/services/api";
import { Car } from "../../src/types/Car";

export default function Home() {
  const { token } = useTokenContext();
  const [cars, setCars] = useState<Car[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchCars();
  }, [searchQuery]);

  const fetchCars = () => {
    const filterQuery = searchQuery ? `?filter=(model~'${searchQuery}')` : "";
    api
      .get(`/api/collections/schons_cars/records${filterQuery}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setCars(response.data.items);
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/api/collections/schons_cars/records/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      Alert.alert("Deleted!", "Car has been deleted successfully.");
      fetchCars();
    } catch (error) {
      Alert.alert("Error!", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cars API LIST</Text>

      <TouchableOpacity
        style={styles.createButton}
        onPress={() => router.push("/userspace/create_car")}
      >
        <Text style={styles.createButtonText}>Create a New Car</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.searchInput}
        placeholder="Search by model"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={cars}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.id}</Text>
            <Text style={styles.itemText}>{item.brand}</Text>
            <Text style={styles.itemText}>{item.model}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.editButton]}
                onPress={() => router.push(`/userspace/edit_car?id=${item.id}`)}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={() => handleDelete(item.id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(car) => car.id}
        style={styles.flatlist}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#333",
    padding: 16,
  },
  flatlist: {
    width: "100%",
    marginTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#fff",
  },
  link: {
    color: "#ff4757",
    fontSize: 18,
    marginBottom: 16,
  },
  item: {
    backgroundColor: "#444",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    width: "100%",
  },
  itemText: {
    color: "#ff4757",
    fontSize: 16,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  button: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  editButton: {
    backgroundColor: "#1e90ff",
  },
  deleteButton: {
    backgroundColor: "#ff4757",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  createButton: {
    backgroundColor: "#ff4757",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  createButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  searchInput: {
    backgroundColor: "#FFF",
    color: "#ff4757",
    borderRadius: 8,
    padding: 10,
    width: "100%",
    marginBottom: 16,
  },
});
