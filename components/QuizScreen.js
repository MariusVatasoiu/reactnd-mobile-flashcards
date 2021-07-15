import React, { Component } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { handleAddQuiz } from "../actions/quizzes";
import { clearLocalNotification, setLocalNotification } from "../utils/helpers";
import { white } from "../utils/colors";

class QuizScreen extends Component {
  state = {
    currentCard: "",
    showAnswer: false,
    score: 0,
    finished: false,
  };

  showAnswer = (id) => {
    this.setState({ showAnswer: true });
  };

  answer = (answer, index) => {
    const { deckId, dispatch } = this.props;
    this.setState({ showAnswer: false });
    if (answer === "correct") {
      this.setState((state) => ({
        score: state.score + 1,
      }));
    }

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

      // Save the quiz to store
      dispatch(handleAddQuiz(deckId));

      clearLocalNotification()
        .then(setLocalNotification);
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
    const { currentCard, finished, score, showAnswer } = this.state;
    const { cards, navigation } = this.props;
    if (cards.length === 0) {
      return (<View style={styles.container}>
        <Text style={{ fontSize: 16, textAlign: "center", paddingTop: 40 }}>
          Sorry, cannot take a quiz because there are no cards in the deck.
        </Text>
      </View>);
    }
    return (
      <View style={styles.container}>
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
            <Text
              style={{ fontSize: 18, textAlign: "center", paddingBottom: 20 }}
            >
              {card.question}
            </Text>
            {showAnswer &&
              <Text
                style={{ fontSize: 16, textAlign: "center", paddingBottom: 20 }}
              >
                Answer: {card.answer}
              </Text>}
            <Button
              title="Show Answer"
              onPress={() => this.showAnswer(card.id)}
            />
            <View style={[styles.row, { marginTop: 20, marginBottom: 20 }]}>
              <Button
                title="Correct"
                onPress={() => this.answer("correct", index)}
              />
              <Button
                title="Incorrect"
                onPress={() => this.answer("incorrect", index)}
              />
            </View>
            <Text style={{ textAlign: "center" }}>
              {cards.length - index - 1} questions left
            </Text>
          </View>
        ))}

        {finished && (<View>
          <Text
            style={{ fontSize: 24, textAlign: "center", paddingBottom: 20 }}
          >
            You answered {score} correct questions.
          </Text>
          <View style={{ marginBottom: 20 }}>
            <Button
              title="Reset Quiz"
              onPress={this.resetQuiz}
            />
          </View>

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
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
  },
  row: {
    flexDirection: "row",
    // flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
});

function mapStateToProps({ decks }, { navigation }) {
  const deckId = navigation.getParam("id");
  return {
    deckId,
    cards: Object.values(decks[deckId].cards),
  };
}

export default connect(mapStateToProps)(QuizScreen);
