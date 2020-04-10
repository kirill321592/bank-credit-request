import { api } from 'core-front';

export const uploadFile = (file, url) => {
    const formData = new FormData();

    formData.append('file', file);

    return fetch(url, {
        ...api.headers.formDataPost,
        body: formData
    })
        .then(res => res.json())
        .catch(() => null);
};