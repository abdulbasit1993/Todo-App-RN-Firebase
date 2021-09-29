import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import ToDoList from "./screens/ToDoList";
import EditList from "./screens/EditList";
import Colors from "./constants/Colors";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Fire App" component={Home} />
        <Stack.Screen
          name="ToDoList"
          component={ToDoList}
          options={({ route }) => {
            return {
              title: route.params.title,
              headerStyle: {
                backgroundColor: route.params.color,
              },
              headerTintColor: "white",
            };
          }}
        />
        <Stack.Screen
          name="Edit"
          component={EditList}
          options={({ route }) => {
            return {
              title: route.params.title
                ? `Edit ${route.params.title} list`
                : "Create new list",
              headerStyle: {
                backgroundColor: route.params.color || Colors.blue,
              },
              headerTintColor: "white",
            };
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
