import { QuizAdminConstants } from '../../constants/quiz.admin.constants';
import { adminQuizService } from '../../_services/quiz/admin.quiz.service';
import { alertActions } from './alert.actions';
export const adminQuizActions = {
    createQuiz
};
function createQuiz(quiz) {
    return dispatch => {
        //        dispatch(request({ quiz }));
        return adminQuizService.createQuiz(quiz)
            .then(
                quiz => {
                    dispatch(success(quiz));
                    return Promise.resolve();
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                    return Promise.reject();
                }
            );
    };

    function request(quiz) { return { type: QuizAdminConstants.CREATE_QUIZ_REQUEST, quiz } }
    function success(quiz) { return { type: QuizAdminConstants.CREATE_QUIZ_SUCCESS, quiz } }
    function failure(error) { return { type: QuizAdminConstants.CREATE_QUIZ_FAILURE, error } }
}
