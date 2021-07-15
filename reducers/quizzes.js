import { ADD_QUIZ, RECEIVE_QUIZZES } from "../actions/quizzes";

function quizzes(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUIZZES:
      return {
        ...state,
        ...action.quizzes,
      };
    case ADD_QUIZ:
      return {
        ...state,
        [action.quiz.date]: action.quiz,
      };

    default:
      return state;
  }
}

export default quizzes;
