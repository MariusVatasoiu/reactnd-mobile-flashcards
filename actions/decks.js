import { generateUID } from "../utils/helpers";
import { deleteDeckAPI, saveCardAPI, saveDeckAPI } from "../utils/api";

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

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck,
  };
}

export function handleAddDeck(id, text, navigate) {
  return (dispatch) => {
    const deck = {
      id,
      title: text,
      cards: {},
    };

    return saveDeckAPI(deck).then((deck) => {
      dispatch(addDeck(deck));
      navigate();
    });
  };
}

export function deleteDeck(id) {
  return {
    type: DELETE_DECK,
    id,
  };
}

export function handleDeleteDeck(id, navigate) {
  return (dispatch) => {
    return deleteDeckAPI(id).then(() => {
      dispatch(deleteDeck(id));
      navigate();
    });
  };
}

export function addCard(card) {
  return {
    type: ADD_CARD,
    card,
  };
}

export function handleAddCard(deckId, question, answer, navigate) {
  return (dispatch) => {
    const card = {
      id: generateUID(),
      deckId,
      question,
      answer,
    };

    return saveCardAPI(card).then(() => {
      dispatch(addCard(card));
      navigate();
    });
  };
}
