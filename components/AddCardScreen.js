import React, { Component } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { connect } from "react-redux";
import { addCard } from "../actions/decks";

class AddCardScreen extends Component {
  state = {
    question: "",
    answer: "",
  };

  onChangeText = (text, name) => {
    this.setState({ [name]: text });
  };

  onSubmit = () => {
    const { question, answer } = this.state;
    const { dispatch, navigation } = this.props;
    const deckId = navigation.getParam("id");

    console.log("Add", question, answer);
    dispatch(addCard(deckId, question, answer));

    this.setState({ question: "", answer: "" });

    navigation.navigate("Deck", { id: deckId });
  };

  render() {
    const { question, answer } = this.state;

    return (
      <View>
        <Text>Add Card Screen</Text>
        <TextInput
          style={styles.input}
          onChangeText={(e) => this.onChangeText(e, "question")}
          value={question}
        />
        <TextInput
          style={styles.input}
          onChangeText={(e) => this.onChangeText(e, "answer")}
          value={answer}
        />
        <Button
          title="Submit"
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

export default connect()(AddCardScreen);
