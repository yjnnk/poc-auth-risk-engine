// src/services/apiService.ts

/**
 * Simulates fetching the challenge code from the risk engine.
 */
export async function getChallengeCode(): Promise<string> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  // Return a challenge code for testing purposes
  const codes = ['STONE', 'REV_TOKEN'];
  return codes[Math.floor(Math.random() * codes.length)];
}

/**
 * Simulates polling the token status from the backend.
 * @param token The token to check.
 */
export async function pollTokenStatus(token: number): Promise<boolean> {
  console.log(token)
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // Simulate random verification
  const verified = Math.random() > 0.8; // 20% chance of being verified each poll
  return verified;
}