import axios, { AxiosRequestConfig } from 'axios';

/**
 * Sends a search request to the specified API with given query parameters.
 * @param query - The search query.
 * @param location - The location for the search.
 * @returns {Promise<any>} - The response data from the API.
 */
export const searchGoogle = async (query: string): Promise<any> => {
  // Prepare the data to be sent in the POST request
  const data = JSON.stringify({
    "q": query,
    // "location": location,
    "gl": "cn",
    "hl": "zh-cn",
    "num": 10
  });

  // Configure the axios request
  const config: AxiosRequestConfig = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://google.serper.dev/search',
    headers: { 
      'X-API-KEY': process.env.SERPER_API_KEY, 
      'Content-Type': 'application/json'
    },
    data: data
  };

  try {
    // Make the API request
    const response = await axios.request(config);
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error making the API request:", error);
    throw new Error('Failed to retrieve data.'); // Throw a new error to be handled by calling function
  }
};