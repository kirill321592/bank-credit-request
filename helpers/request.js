import { api } from 'core-front';

const sendRequest = async (url = '', options= {}) => {
    const res = await fetch(url, options);

    return await res.json();
};

export const sendGetRequest = url => sendRequest(url, api.headers.get);

export const sendPostRequest = (url, data) => {
    const options = {
        ...api.headers.post,
        body: JSON.stringify(data),
    };

    return sendRequest(url, options);
};
