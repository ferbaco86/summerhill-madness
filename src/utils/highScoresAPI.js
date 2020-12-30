const HighScoresAPI = (() => {
  const scores = {
    user: {
      user: null,
      score: 0,
    },
    topscores: [
    ],
  };
  const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';
  const gameEndPoint = 'games/';
  const scoresEndPoint = 'scores/';
  const id = 'X0lxtUpOaDOUnRcmx8T1/';

  const rank = (a, b) => {
    if (a.score > b.score) return -1;
    if (a.score < b.score) return 1;
    return 0;
  };

  const recordScore = async () => {
    try {
      scores.user.user = scores.user.user == null ? 'Unknown' : scores.user.user;
      scores.user.score = scores.user.score === 0 ? 1 : scores.user.score;
      const response = await fetch(url + gameEndPoint + id + scoresEndPoint, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(scores.user),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  };

  const getHighScores = async () => {
    try {
      const response = await fetch(url + gameEndPoint + id + scoresEndPoint, {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      scores.topscores = data.result.sort(rank).splice(0, 5);
      return scores.topscores;
    } catch (error) {
      return error;
    }
  };

  return {
    recordScore,
    getHighScores,
    scores,
  };
})();

export default HighScoresAPI;