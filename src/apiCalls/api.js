export const makeNotionQueryApi = async (question) => {
  const response = await fetch(
    'https://e9a7-103-159-11-246.in.ngrok.io/answer/notion',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: '{\n    "question": "?"\n}',
      body: JSON.stringify({
        question,
      }),
    }
  );

  return response.json();
};

export const makeDocumentationQueryApi = async (question) => {
  const response = await fetch(
    'https://e9a7-103-159-11-246.in.ngrok.io/answer/code_docs',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: '{\n    "question": "?"\n}',
      body: JSON.stringify({
        question,
      }),
    }
  );

  return response.json();
};

export const makeDbQueryApi = async (question) => {
  const response = await fetch(
    'https://e9a7-103-159-11-246.in.ngrok.io/answer/db',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: '{\n    "question": "?"\n}',
      body: JSON.stringify({
        question,
      }),
    }
  );

  return response.json();
};

export const makeRbiQueryApi = async (question) => {
  const response = await fetch(
    'https://e9a7-103-159-11-246.in.ngrok.io/answer/rbi',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: '{\n    "question": "?"\n}',
      body: JSON.stringify({
        question,
      }),
    }
  );

  return response.json();
};
