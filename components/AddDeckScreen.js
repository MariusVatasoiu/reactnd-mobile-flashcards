import React, { Component } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { connect } from "react-redux";
import { addDeck } from "../actions";

class AddDeckScreen extends Component {
  state = {
    text: "",
  };

  onChangeText = (text) => {
    this.setState({ text });
  };

  onSubmit = () => {
    console.log("onSubmit");
    const { text } = this.state;
    const { dispatch } = this.props;

    if (text === "") {
      return;
    }
    dispatch(addDeck(text));

    this.setState({ text: "" });
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
