import React, { Component } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { connect } from "react-redux";
import { handleAddCard } from "../actions/decks";
import { white } from "../utils/colors";

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
    dispatch(
      handleAddCard(
        deckId,
        question,
        answer,
        () => navigation.navigate("Deck", { id: deckId }),
      ),
    );

    this.setState({ question: "", answer: "" });
  };

  render() {
    const { question, answer } = this.state;

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={(e) => this.onChangeText(e, "question")}
          placeholder="Question"
          value={question}
        />
        <TextInput
          style={styles.input}
          onChangeText={(e) => this.onChangeText(e, "answer")}
          placeholder="Answer"
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

export default connect()(AddCardScreen);
