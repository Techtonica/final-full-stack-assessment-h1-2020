function generateErrorMessage(path, resp) {
  return `😩 fetch('${path}') failed: Express server responded with HTTP: [${resp.status} ${resp.statusText}].
  
  (Note: this error is custom to Booktonica and you cannot Google it). Check your Network console for more information about the request and the Express logs for more information about the response.`;
}

export function addLike(bookId, username) {
  const path = `/books/${bookId}/likes`;
  return fetch(path, {
    method: "POST",
    headers: {
      // This header is needed or React app won't proxy it along to Express
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username })
  }).then(resp => {
    if (resp.ok) {
      return true;
    } else {
      throw new Error(generateErrorMessage(path, resp));
    }
  });
}

export function getAllLikes() {
  const path = "/books/likes";
  return fetch(path, {
    headers: {
      // This header is needed or React app won't proxy it along to Express
      Accept: "application/json"
    }
  }).then(resp => {
    if (resp.ok) {
      return resp.json();
    } else {
      throw new Error(generateErrorMessage(path, resp));
    }
  });
}

export function getAllBooks() {
  const path = "/books";
  return fetch(path, {
    headers: {
      // This header is needed or React app won't proxy it along to Express
      Accept: "application/json"
    }
  }).then(resp => {
    if (resp.ok) {
      return resp.json();
    } else {
      throw new Error(generateErrorMessage(path, resp));
    }
  });
}

export function getUser(username) {
  const path = `/users/${username}`;
  return fetch(path, {
    headers: {
      // This header is needed or React app won't proxy it along to Express
      Accept: "application/json"
    }
  }).then(resp => {
    if (resp.ok) {
      return resp.json();
    } else {
      throw new Error(generateErrorMessage(path, resp));
    }
  });
}
