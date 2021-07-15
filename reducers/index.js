import { ADD_CARD, ADD_DECK, RECEIVE_DECKS } from "../actions";

function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.entries,
      };
    case ADD_DECK:
      return {
        ...state,
        [action.deck.id]: action.deck,
      };
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
