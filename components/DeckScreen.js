import React, { Component } from "react";
import { Button, Text, View } from "react-native";
import { connect } from "react-redux";
import { deleteDeck } from "../actions/decks";

class DeckScreen extends Component {
  state = { deleted: false };

  deleteDeck = (id) => {
    const { dispatch, navigation } = this.props;
    dispatch(deleteDeck(id));
    this.setState({ deleted: true });

    navigation.navigate("Home");
  };

  render() {
    const { deleted } = this.state;
    const { deck } = this.props;

    if (deleted) {
      return <View></View>;
    }

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
        <Button
          title="Delete Deck"
          onPress={() => this.deleteDeck(deck.id)}
        />
      </View>
    );
  }
}

function mapStateToProps({ decks }, { navigation }) {
  return {
    deck: decks[navigation.getParam("id")],
  };
}
export default connect(mapStateToProps)(DeckScreen);
