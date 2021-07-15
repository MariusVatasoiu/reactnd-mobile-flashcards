import React, { Component } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";

class QuizScreen extends Component {
  state = {
    currentCard: "",
    score: 0,
    finished: false,
  };

  showAnswer = (id) => {
    console.log("Show Answer", id);
  };

  answer = (answer, index) => {
    if (answer === "correct") {
      this.setState((state) => ({
        score: state.score + 1,
      }));
    }
    console.log(this.props.cards[index + 1]);

    // Show next card
    if (index < this.props.cards.length - 1) {
      this.setState({
        currentCard: this.props.cards[index + 1].id,
      });
    }

    // If it's the last card
    if (index === this.props.cards.length - 1) {
      this.setState({
        finished: true,
      });

      // Save the quiz to AsyncStorage
    }
  };

  resetQuiz = () => {
    this.setState({
      currentCard: "",
      score: 0,
      finished: false,
    });
  };

  render() {
    const { currentCard, finished, score } = this.state;
    const { cards, navigation } = this.props;
    console.log(navigation);
    if (cards.length === 0) {
      return (<View>
        <Text>
          Sorry, cannot take a quiz because there are no cards in the deck.
        </Text>
      </View>);
    }
    return (
      <View>
        <Text>Quiz Screen</Text>
        {!finished && cards.map((card, index) => (
          <View
            key={card.id}
            style={{
              display:
                currentCard === card.id || (currentCard === "" && index === 0)
                  ? "flex"
                  : "none",
            }}
          >
            <Text>{card.question}</Text>
            <Button
              title="Show Answer"
              onPress={() => this.showAnswer(card.id)}
            />
            <View style={styles.row}>
              <Button
                title="Correct"
                onPress={() => this.answer("correct", index)}
              />
              <Button
                title="Incorrect"
                onPress={() => this.answer("incorrect", index)}
              />
            </View>
            <Text>{cards.length - index - 1} questions left</Text>
          </View>
        ))}

        {finished && (<View>
          <Text>You answered {score} correct.</Text>
          <Button
            title="Reset Quiz"
            onPress={this.resetQuiz}
          />

          <Button
            title="Back to Deck"
            onPress={() => navigation.goBack()}
          />
        </View>)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
});

function mapStateToProps(state, { navigation }) {
  const deckId = navigation.getParam("id");
  return {
    deckId,
    cards: Object.values(state[deckId].cards),
  };
}

export default connect(mapStateToProps)(QuizScreen);
