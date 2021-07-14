import React, { Component } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { connect } from "react-redux";
import { white } from "../utils/colors";

class HomeScreen extends Component {
  onPress = () => {
    console.log("go to deck");
  };

  renderItem = ({ item }) => (
    <TouchableOpacity
      style={{ textAlign: "center", marginBottom: 20 }}
      onPress={this.onPress}
    >
      <Text>{item.title}</Text>
      <Text>{item.cards.length} cards</Text>
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

function mapStateToProps(state) {
  return {
    decks: Object.values(state),
  };
}

export default connect(mapStateToProps)(HomeScreen);
