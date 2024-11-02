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

  