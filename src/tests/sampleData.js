function generateRandomUsername() {
  const adjectives = ["happy", "sunny", "playful", "clever", "brave"];
  const nouns = ["cat", "dog", "rabbit", "bird", "turtle"];

  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

  const randomNumber = Math.floor(Math.random() * 1000);

  const randomUsername = `${randomAdjective}_${randomNoun}_${randomNumber}`;

  return randomUsername;
}

module.exports = generateRandomUsername;
