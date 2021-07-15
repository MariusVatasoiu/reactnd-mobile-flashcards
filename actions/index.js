import { generateUID } from "../utils/helpers";

export const RECEIVE_DECKS = "RECEIVE_DECKS";
export const ADD_DECK = "ADD_DECK";
export const ADD_CARD = "ADD_CARD";

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  };
}

export function addDeck(text) {
  const deck = {
    id: generateUID(),
    title: text,
    cards: {},
  };
  return {
    type: ADD_DECK,
    deck,
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
