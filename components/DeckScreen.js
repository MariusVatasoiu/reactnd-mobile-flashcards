import React, { Component } from "react";
import { Button, Text, View } from "react-native";

export default class DeckScreen extends Component {
  render() {
    return (
      <View>
        <Text>Deck Screen</Text>

        <Button
          title="Add Card"
          onPress={() => this.props.navigation.navigate("AddCard")}
        />
        <Button
          title="Start Quiz"
          onPress={() => this.props.navigation.navigate("Quiz")}
        />
      </View>
    );
  }
}
