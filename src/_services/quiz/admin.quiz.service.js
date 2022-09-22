import Api from '../../_helpers/api';
import { authHeader } from '../../_helpers/auth-header';
import handleResponse from '../../_helpers/handle.response';
import { UrlConstants } from '../../constants/url.constants';

export const adminQuizService = {
    createQuiz,
    mapQustion

};

async function createQuiz(quiz) {
    const res = await Api.post(`${UrlConstants.ADMIN.CREATE_QUIZ}`,
        quiz
    ).then(handleResponse)
        .then(response => {
            return response;
        });
    return res;
}

function mapQustion(mapping) {
    return Api.post(`${UrlConstants.ADMIN.MAP_QUIZ_QUESTION}`, mapping)
        .then(handleResponse)
        .then(response => {
            return response;
        });
}