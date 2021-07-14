import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { View } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import middleware from "./middleware";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { purple, white } from "./utils/colors";
import { setLocalNotification } from "./utils/helpers";
import HomeScreen from "./components/HomeScreen";
import DeckScreen from "./components/DeckScreen";
import AddDeckScreen from "./components/AddDeckScreen";
import AddCardScreen from "./components/AddCardScreen";
import QuizScreen from "./components/QuizScreen";

import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: () => ({
      title: "Decks",
    }),
  },
  Deck: DeckScreen,
  AddCard: AddCardScreen,
  Quiz: QuizScreen,
});

const AppContainer = createAppContainer(
  createBottomTabNavigator(
    {
      Home: {
        screen: HomeStack,
        navigationOptions: {
          tabBarLabel: "Decks",
          tabBarIcon: () => <AntDesign name="wallet" size={24} color="black" />,
        },
      },
      AddDeck: {
        screen: AddDeckScreen,
        navigationOptions: {
          tabBarLabel: "Add Deck",
          tabBarIcon: () =>
            <Ionicons name="add-circle-outline" size={24} color="black" />,
        },
      },
    },
    {
      /* Other configuration remains unchanged */
    },
  ),
);

export default class App extends Component {
  componentDidMount() {
    setLocalNotification();
  }
  render() {
    return (
      <Provider store={createStore(reducer, middleware)}>
        <View style={{ flex: 1 }}>
          <AppContainer />
        </View>
      </Provider>
    );
  }
}
