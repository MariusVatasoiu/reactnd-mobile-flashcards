import React, { Component } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { connect } from "react-redux";
import { handleAddDeck } from "../actions/decks";
import { generateUID } from "../utils/helpers";
import { white } from "../utils/colors";

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
    dispatch(
      handleAddDeck(id, text, () => navigation.navigate("Deck", { id })),
    );

    this.setState({ text: "" });
  };

  render() {
    const { text } = this.state;
    return (
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 18,
            paddingBottom: 20,
            paddingTop: 40,
            textAlign: "center",
          }}
        >
          What is the title of your new deck?
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={this.onChangeText}
          placeholder="Title"
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
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 5,
    marginBottom: 20,
  },
});

export default connect()(AddDeckScreen);
