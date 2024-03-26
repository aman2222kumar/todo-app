import React, { useState } from "react";
import {
  Button,
  FlatList,
  Modal,
  StyleSheet,
  TextInput,
  View,
  Text,
} from "react-native";
import { useTodoContext } from "./TodoContext";

const TodoScreen: React.FC = () => {
  const { todos, dispatch } = useTodoContext();
  const [text, setText] = useState("");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editTodoId, setEditTodoId] = useState<number | null>(null);
  const [editedText, setEditedText] = useState("");

  const handleAddTodo = () => {
    if (text.trim()) {
      dispatch({ type: "ADD_TODO", payload: text });
      setText("");
    }
  };

  const handleDeleteTodo = (id: number) => {
    dispatch({ type: "DELETE_TODO", payload: id });
  };

  const handleEditTodo = () => {
    if (editedText.trim() && editTodoId !== null) {
      dispatch({
        type: "EDIT_TODO",
        payload: { id: editTodoId, text: editedText },
      });
      setEditModalVisible(false);
      setEditedText("");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainerField}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Enter todo..."
        />
        <Button title="Add Todo" onPress={handleAddTodo} />
      </View>
      <View style={styles.flatListContainer}>
        <FlatList
          data={todos}
          renderItem={({ item }) => (
            <View style={styles.todoItem}>
              <Text>{item.text}</Text>
              <View style={styles.buttonContainer}>
                <Button
                  title="Edit"
                  onPress={() => {
                    setEditModalVisible(true);
                    setEditTodoId(item.id);
                    setEditedText(item.text);
                  }}
                />
                <Button
                  title="Delete"
                  onPress={() => handleDeleteTodo(item.id)}
                />
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.flatListContent}
        />
      </View>
      <Modal
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.input}
            value={editedText}
            onChangeText={setEditedText}
            placeholder="Edit todo..."
          />
          <Button title="Save" onPress={handleEditTodo} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainerField: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 3,
  },
  flatListContainer: {
    flex: 1,
  },
  flatListContent: {
    flexGrow: 1,
  },
  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: 10,
  },
  todoText: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    marginLeft: 10,
    gap: 10, // Adjust spacing between buttons
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
});

export default TodoScreen;
