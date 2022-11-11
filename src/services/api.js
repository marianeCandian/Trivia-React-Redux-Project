const URL_TOKEN = 'https://opentdb.com/api_token.php?command=request';
export async function fetchToken() {
  const response = await fetch(URL_TOKEN);
  const data = await response.json();
  return data;
}

export async function fetchQuiz(token) {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const dataQuiz = await response.json();
  return dataQuiz;
}
