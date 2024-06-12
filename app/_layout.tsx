import { Slot } from "expo-router";
import React from "react";
import TokenContextProvider from "../src/contexts/userContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

export default function _layout() {
  return (
    <TokenContextProvider>
      <SafeAreaView style={styles.container}>
        <Slot />
      </SafeAreaView>
    </TokenContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
