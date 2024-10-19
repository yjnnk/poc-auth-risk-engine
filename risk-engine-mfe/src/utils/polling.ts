// src/utils/polling.ts

/**
 * Starts polling a function at specified intervals.
 * @param pollFunction The async function to poll. It should return a boolean indicating whether to continue polling.
 * @param interval The interval in milliseconds between polls.
 * @returns An object with a stop function.
 */
export function startPolling(
  pollFunction: () => Promise<boolean>,
  interval: number = 5000
): { stop: () => void } {
  let isPolling = true;

  async function poll() {
    if (!isPolling) return;

    try {
      const shouldContinue = await pollFunction();
      if (shouldContinue) {
        setTimeout(poll, interval);
      } else {
        // Polling condition met; stop polling
        isPolling = false;
      }
    } catch (error) {
      console.error('Polling error:', error);
      // Decide whether to continue polling in case of an error
      setTimeout(poll, interval);
    }
  }

  // Start initial poll
  poll();

  // Return a function to stop polling
  return {
    stop: () => {
      isPolling = false;
    },
  };
}