import React, { Component } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { white } from "../utils/colors";

class HomeScreen extends Component {
  renderItem = ({ item }) => (
    <Text>{item.title}</Text>
  );

  render() {
    const { decks } = this.props;
    return (
      <View style={styles.container}>
        <Text>Home Screens</Text>
        <FlatList
          data={decks}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
        />
        {/* {decks.map((deck) => <Text key={deck.id}>{deck.title} {deck.id}</Text>)} */}
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

function mapStateToProps(state) {
  return {
    decks: Object.values(state),
  };
}

export default connect(mapStateToProps)(HomeScreen);
