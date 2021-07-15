import { getDecksAPI, getQuizzesAPI } from "../utils/api";
import { receiveDecks } from "./decks";
import { receiveQuizzes } from "./quizzes";

export function handleInitialData() {
  return (dispatch) => {
    return Promise.all([getDecksAPI(), getQuizzesAPI()]).then(
      ([decks, quizzes]) => {
        dispatch(receiveDecks(decks));
        dispatch(receiveQuizzes(quizzes));
      },
    );
  };
}
