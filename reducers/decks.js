import {
  ADD_CARD,
  ADD_DECK,
  DELETE_DECK,
  RECEIVE_DECKS,
} from "../actions/decks";

function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks,
      };
    case ADD_DECK:
      return {
        ...state,
        [action.deck.id]: action.deck,
      };
    case DELETE_DECK:
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    case ADD_CARD:
      return {
        ...state,
        [action.card.deckId]: {
          ...state[action.card.deckId],
          cards: {
            ...state[action.card.deckId].cards,
            [action.card.id]: action.card,
          },
        },
      };
    default:
      return state;
  }
}

export default decks;
