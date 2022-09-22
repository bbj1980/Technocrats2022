import handleResponse from '../../_helpers/handle.response';
import { UrlConstants } from '../../constants/url.constants';
import Api from '../../_helpers/api';
export const UserQuizService = {
    QuizeByCode,
    QuizeByUser
};
async function QuizeByCode(quiz) {
    const res = await Api.post(`${UrlConstants.QUIZ.GET_QUIZ_BYCODE}`,
        quiz
    );
    return res;
}
async function QuizeByUser(quiz) {
    const res = await Api.post(`${UrlConstants.QUIZ.GET_QUIZ_BYUSER}`,
        quiz
    );
    return res;
}

