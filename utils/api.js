import { AsyncStorage as Storage } from "react-native";

// ONLY FOR WEB TESTING
Storage = localStorage;

export async function getStoreAPI() {
  try {
    const store = await Storage.getItem("store");
    if (store !== null) {
      return JSON.parse(store);
    }
    console.log("STORE", store);

    return {};
  } catch (error) {
    // Error retrieving data
    console.warn(error);
  }
}

export async function saveStoreAPI(store) {
  try {
    await Storage.setItem("store", JSON.stringify(store));
  } catch (error) {
    // Error saving data
    console.warn(error);
  }
}

export async function getDecksAPI() {
  try {
    const store = await Storage.getItem("store");
    if (store !== null) {
      console.log(store);
      return JSON.parse(store).decks;
    }
    console.log("STORE", store);

    return {};
  } catch (error) {
    // Error retrieving data
    console.warn(error);
  }
}

export async function saveDeckAPI(deck) {
  try {
    const storeString = await Storage.getItem("store");
    let store;
    if (storeString !== null) {
      store = JSON.parse(storeString);
    } else {
      store = { decks: {}, quizzes: {} };
    }

    const newStore = {
      ...store,
      decks: { ...store.decks, [deck.id]: deck },
    };

    await Storage.setItem("store", JSON.stringify(newStore));
    return deck;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteDeckAPI(id) {
  try {
    const storeString = await Storage.getItem("store");
    let store;
    if (storeString !== null) {
      store = JSON.parse(storeString);

      delete store.decks[id];

      await Storage.setItem("store", JSON.stringify(store));
      return;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function saveCardAPI(card) {
  try {
    const storeString = await Storage.getItem("store");
    let store;
    if (storeString !== null) {
      store = JSON.parse(storeString);

      store.decks[card.deckId].cards = {
        ...store.decks[card.deckId].cards,
        [card.id]: card,
      };

      await Storage.setItem("store", JSON.stringify(store));
      return card;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getQuizzesAPI() {
  try {
    const store = await Storage.getItem("store");
    if (store !== null) {
      console.log(store);
      return JSON.parse(store).quizzes;
    }

    return {};
  } catch (error) {
    // Error retrieving data
    console.warn(error);
  }
}

export async function saveQuizAPI(quiz) {
  try {
    const storeString = await Storage.getItem("store");
    let store;
    if (storeString !== null) {
      store = JSON.parse(storeString);
    } else {
      store = { decks: {}, quizzes: {} };
    }

    const newStore = {
      ...store,
      quizzes: { ...store.quizzes, [quiz.id]: quiz },
    };

    await Storage.setItem("store", JSON.stringify(newStore));
    return quiz;
  } catch (error) {
    console.error(error);
  }
}
