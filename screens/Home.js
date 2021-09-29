import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

// Applied object destructuring in below line, replaced (props) with ({ title })
const ListButton = ({ title, color, onPress, onDelete, onOptions }) => {
  return (
    <TouchableOpacity
      style={[styles.itemContainer, { backgroundColor: color }]}
      onPress={onPress}
    >
      <View>
        <Text style={styles.itemTitle}>{title}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={onOptions}>
          <Ionicons name="options-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <Ionicons name="trash-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const renderAddListIcon = (navigation, addItemToLists) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Edit", { saveChanges: addItemToLists })
      }
    >
      <Text style={styles.icon}>+</Text>
    </TouchableOpacity>
  );
};

export default ({ navigation }) => {
  const [lists, setLists] = useState([
    { title: "School", color: Colors.red },
    { title: "Work", color: Colors.green },
    { title: "Fun", color: Colors.blue },
  ]);

  const addItemToLists = (item) => {
    lists.push(item);
    setLists([...lists]);
  };

  const removeItemFromLists = (index) => {
    lists.splice(index, 1);
    setLists([...lists]);
  };

  const updateItemFromLists = (index, item) => {
    lists[index] = item;
    setLists([...lists]);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => renderAddListIcon(navigation, addItemToLists),
    });
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={lists}
        renderItem={({ item: { title, color }, index }) => {
          return (
            <ListButton
              title={title}
              color={color}
              navigation={navigation}
              onPress={() => {
                navigation.navigate("ToDoList", { title, color });
              }}
              onOptions={() => {
                navigation.navigate("Edit", {
                  title,
                  color,
                  saveChanges: (item) => updateItemFromLists(index, item),
                });
              }}
              onDelete={() => removeItemFromLists(index)}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  itemTitle: { fontSize: 24, padding: 5, color: "white" },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 100,
    flex: 1,
    borderRadius: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 15,
  },
  icon: {
    padding: 5,
    fontSize: 24,
  },
});
