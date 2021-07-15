import React, { Component } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { handleDeleteDeck } from "../actions/decks";
import { white } from "../utils/colors";

class DeckScreen extends Component {
  state = { deleted: false };

  deleteDeck = (id) => {
    const { dispatch, navigation } = this.props;
    dispatch(handleDeleteDeck(id, () => navigation.navigate("Home")));
    this.setState({ deleted: true });
  };

  render() {
    const { deleted } = this.state;
    const { deck } = this.props;

    if (deleted) {
      return <View style={styles.container}></View>;
    }

    return (
      <View style={styles.container}>
        <Text style={[styles.center, { paddingTop: 20, fontSize: 24 }]}>
          {deck.title}
        </Text>
        <Text style={[styles.center, { paddingTop: 20, marginBottom: 40 }]}>
          {Object.keys(deck.cards).length} cards
        </Text>

        <View style={{ marginBottom: 20 }}>
          <Button
            style={styles.btn}
            title="Add Card"
            onPress={() =>
              this.props.navigation.navigate("AddCard", { id: deck.id })}
          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <Button
            style={styles.btn}
            title="Start Quiz"
            onPress={() =>
              this.props.navigation.navigate("Quiz", { id: deck.id })}
          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <Button
            style={styles.btn}
            title="Delete Deck"
            onPress={() => this.deleteDeck(deck.id)}
          />
        </View>
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
  btn: {
    paddingBottom: 20,
  },
  center: {
    textAlign: "center",
  },
});

function mapStateToProps({ decks }, { navigation }) {
  console.log(decks);
  return {
    deck: decks[navigation.getParam("id")],
  };
}
export default connect(mapStateToProps)(DeckScreen);
