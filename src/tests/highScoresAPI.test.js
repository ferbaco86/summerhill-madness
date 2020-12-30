import HighScoresAPI from '../utils/highScoresAPI';


test('Get object from the API', () => {
  HighScoresAPI.getHighScores().then(scores => {
    expect(typeof scores).toBe('object');
  });
});


test('Get the username Fernando from the API', () => {
  let username;
  HighScoresAPI.getHighScores().then(scores => {
    scores.forEach(score => {
      if (score.user === 'Fernando') username = score.user;
    });
    expect(username).toBe('Fernando');
  });
});

test('Post a valid score of 100', () => {
  HighScoresAPI.recordScore({ user: 'Test_1', score: 100 }).then(response => {
    expect(response.result).toBe('Leaderboard score created correctly.');
  });
});

test('Post invalid username', () => {
  HighScoresAPI.recordScore({ user: '', score: 10 }).then(answer => {
    expect(answer.result).toBe(undefined);
  });
});