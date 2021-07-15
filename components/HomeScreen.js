import React, { Component } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import { white } from "../utils/colors";

class HomeScreen extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  onPress = (id) => {
    console.log("go to deck");
    this.props.navigation.navigate("Deck", { id });
  };

  renderItem = ({ item }) => (
    <TouchableOpacity
      style={{ textAlign: "center", marginBottom: 20 }}
      onPress={() => this.onPress(item.id)}
    >
      <Text style={{ fontSize: 24 }}>{item.title}</Text>
      <Text>{Object.keys(item.cards).length} cards</Text>
    </TouchableOpacity>
  );

  render() {
    const { decks } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={decks}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
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

function mapStateToProps({ decks }) {
  return {
    decks: Object.values(decks),
  };
}

export default connect(mapStateToProps)(HomeScreen);
