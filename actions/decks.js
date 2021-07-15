import { generateUID } from "../utils/helpers";

export const RECEIVE_DECKS = "RECEIVE_DECKS";
export const ADD_DECK = "ADD_DECK";
export const DELETE_DECK = "DELETE_DECK";
export const ADD_CARD = "ADD_CARD";

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  };
}

export function addDeck(id, text) {
  const deck = {
    id,
    title: text,
    cards: {},
  };
  return {
    type: ADD_DECK,
    deck,
  };
}

export function deleteDeck(id) {
  return {
    type: DELETE_DECK,
    id,
  };
}

export function addCard(deckId, question, answer) {
  const card = {
    id: generateUID(),
    deckId,
    question,
    answer,
  };
  return {
    type: ADD_CARD,
    card,
  };
}

export function handleInitialData() {
  const decks = {
    "nszil549i4pgzyva6lf7": {
      "id": "nszil549i4pgzyva6lf7",
      "title": "sdfasdfas",
      "cards": {
        "o0ysosv7nfc3bc8g5xz9o9": {
          "id": "o0ysosv7nfc3bc8g5xz9o9",
          "deckId": "nszil549i4pgzyva6lf7",
          "question": "sdfasdfaf",
          "answer": "dfdfgsdfgsdfg",
        },
        "vnruwtyhb1p6ryfcpdsd": {
          "id": "vnruwtyhb1p6ryfcpdsd",
          "deckId": "nszil549i4pgzyva6lf7",
          "question": "dddddd",
          "answer": "ssssss",
        },
      },
    },
    "4qfcmdhc1aj0hp0qrjm2": {
      "id": "4qfcmdhc1aj0hp0qrjm2",
      "title": "Deck 2",
      "cards": {
        "2prm1tx5ir691mi530nudg": {
          "id": "2prm1tx5ir691mi530nudg",
          "deckId": "4qfcmdhc1aj0hp0qrjm2",
          "question": "Question 1",
          "answer": "Answer 1",
        },
        "hh2sz7kd4j643p3x3qpjwp": {
          "id": "hh2sz7kd4j643p3x3qpjwp",
          "deckId": "4qfcmdhc1aj0hp0qrjm2",
          "question": "Question 2",
          "answer": "Answer 2",
        },
      },
    },
  };
  return (dispatch) => {
    return Promise.resolve().then(() => dispatch(receiveDecks(decks)));
  };
}
