import { AsyncStorage as Storage } from "react-native";

// ONLY FOR WEB TESTING
Storage = localStorage;

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

const quizzes = {
  "2021-07-15": {
    "date": "2021-07-15",
    "deckId": "4qfcmdhc1aj0hp0qrjm2",
  },
};

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
