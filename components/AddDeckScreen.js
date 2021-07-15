import React, { Component } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { connect } from "react-redux";
import { addDeck } from "../actions";
import { generateUID } from "../utils/helpers";

class AddDeckScreen extends Component {
  state = {
    text: "",
  };

  onChangeText = (text) => {
    this.setState({ text });
  };

  onSubmit = () => {
    const { text } = this.state;
    const { dispatch, navigation } = this.props;

    if (text === "") {
      return;
    }

    const id = generateUID();
    dispatch(addDeck(id, text));

    this.setState({ text: "" });

    navigation.navigate("Deck", { id });
  };

  render() {
    const { text } = this.state;
    return (
      <View>
        <Text>What is the title of your new deck?</Text>
        <TextInput
          style={styles.input}
          onChangeText={this.onChangeText}
          value={text}
        />
        <Button
          title="Create Deck"
          onPress={this.onSubmit}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    border: "1px solid black",
    padding: 5,
  },
});

export default connect()(AddDeckScreen);
