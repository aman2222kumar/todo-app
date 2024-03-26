import React from "react";
import { StyleSheet, View } from "react-native";
import TodoScreen from "./TodoScreen";
import { TodoProvider } from "./TodoContext";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const App: React.FC = () => {
  return (
    <TodoProvider>
      <View style={styles.container}>
        <TodoScreen />
      </View>
    </TodoProvider>
  );
};

export default App;
