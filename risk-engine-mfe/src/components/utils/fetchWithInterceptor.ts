// src/utils/fetchWithInterceptor.ts
export async function fetchWithInterceptor(input: RequestInfo, init?: RequestInit): Promise<Response> {
    try {
      const response = await fetch(input, init);
  
      // Check for specific status codes
      if (response.status === 417) {
        // Handle status code 417
        // For example, call method1 from the web component
        const webComponent = document.querySelector('risk-mfe') as any;
        if (webComponent && typeof webComponent.method1 === 'function') {
          webComponent.method1('Error 417 intercepted');
        }
      }
  
      // Optionally, handle other status codes or global error handling
  
      return response;
    } catch (error) {
      // Handle network errors
      console.error('Network error:', error);
      throw error;
    }
  }