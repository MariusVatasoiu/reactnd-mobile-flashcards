import React, { Component } from "react";
import { Button, Text, View } from "react-native";
import { connect } from "react-redux";

class DeckScreen extends Component {
  render() {
    const { deck } = this.props;
    console.log(deck);
    return (
      <View>
        <Text>{deck.title}</Text>
        <Text>{Object.keys(deck.cards).length} cards</Text>

        <Button
          title="Add Card"
          onPress={() =>
            this.props.navigation.navigate("AddCard", { id: deck.id })}
        />
        <Button
          title="Start Quiz"
          onPress={() =>
            this.props.navigation.navigate("Quiz", { id: deck.id })}
        />
      </View>
    );
  }
}

function mapStateToProps(state, { navigation }) {
  return {
    deck: state[navigation.getParam("id")],
  };
}
export default connect(mapStateToProps)(DeckScreen);
