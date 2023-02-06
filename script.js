'use strict';

const rootElement = document.querySelector('#root');
const GET_POSTS_URL = `https://jsonplaceholder.typicode.com/posts`;
const limitPostText = 50;

function cutStr(str, sym) {
    if (str.length <= sym) {
        return str;
    } else {
        return str.slice(0, sym);
    }
}

function renderPostItem(id, title, body) {
    return `<div class="postShort" data-id=${id}>
            <h3 class="postTitle">${title}</h3>
            <p>${cutStr(body, limitPostText)} ...</p>
            <a href="#">Read more ...</a>
        </div>`;
}

fetch(GET_POSTS_URL)
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
        throw ({
            statusCode: response.status,
            statusText: response.statusText,
        });
    })
    .then((data) => {
        let arrayLayout = data.map(({id, title, body}) => {
            return renderPostItem(id, title, body);
        });
        rootElement.innerHTML = arrayLayout.join('');
    }).catch((payload) => {
    rootElement.innerHTML = renderError(payload.statusCode, payload.statusText);
});

function renderError(statusCode, statusText) {
    return `<div class="errorContainer">
            <h3 class="errorNumber">${statusCode}</h3>
            <p class="errorStatus">${statusText}</p>
            <p>... something went wrong ...</p>
            <a href="#">Back to the main page ...</a>
        </div>`
}
