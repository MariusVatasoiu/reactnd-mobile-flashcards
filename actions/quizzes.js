import { timeToString } from "../utils/helpers";

export const RECEIVE_QUIZZES = "RECEIVE_QUIZZES";
export const ADD_QUIZ = "ADD_QUIZ";

export function receiveQuizzes(quizzes) {
  return {
    type: RECEIVE_QUIZZES,
    quizzes,
  };
}

export function addQuiz(deckId) {
  const quiz = {
    date: timeToString(),
    deckId,
  };
  return {
    type: ADD_QUIZ,
    quiz,
  };
}
