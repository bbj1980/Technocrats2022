import config from '../../config';
import { authHeader } from '../../_helpers/auth-header';
import handleResponse from '../../_helpers/handle.response';
import { UrlConstants } from '../../constants/url.constants';

export const adminQuizService = {
    createQuiz,
    
};

function createQuiz(quiz) {
    const requestOptions = {
        method: 'POST',
        headers:  authHeader(),
        body: JSON.stringify({ quiz }),
    };

    return fetch(`${config.apiUrl}${UrlConstants.ADMIN.CREATE_QUIZ}`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        });
}
