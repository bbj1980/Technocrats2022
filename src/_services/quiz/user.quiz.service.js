import config from '../../config';
import { authHeader } from '../../_helpers/auth-header';
import handleResponse from '../../_helpers/handle.response';
import { UrlConstants } from '../../constants/url.constants';

export const userQuizService = {
    getQuiz,

};

function getQuiz(code) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ code }),
    };

    return fetch(`${config.apiUrl}${UrlConstants.USER.GET_QUIZ}`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        });
}
