import React, { Component } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { white } from "../utils/colors";

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Home Screens</Text>
        <Button
          title="Deck 1"
          onPress={() => this.props.navigation.navigate("Deck")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
  },
});
