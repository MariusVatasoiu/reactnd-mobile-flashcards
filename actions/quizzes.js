import { generateUID, timeToString } from "../utils/helpers";
import { saveQuizAPI } from "../utils/api";

export const RECEIVE_QUIZZES = "RECEIVE_QUIZZES";
export const ADD_QUIZ = "ADD_QUIZ";

export function receiveQuizzes(quizzes) {
  return {
    type: RECEIVE_QUIZZES,
    quizzes,
  };
}

function addQuiz(deckId) {
  const quiz = {
    date: timeToString(),
    deckId,
  };
  return {
    type: ADD_QUIZ,
    quiz,
  };
}

export function handleAddQuiz(deckId) {
  return (dispatch) => {
    const quiz = {
      id: generateUID(),
      date: timeToString(),
      deckId,
    };

    return saveQuizAPI(quiz).then(() => dispatch(addQuiz(quiz)));
  };
}
