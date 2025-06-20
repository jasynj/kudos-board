const GIPHY_API_KEY = import.meta.env.VITE_GIF_API_KEY;
const GIPHY_BASE_URL = 'https://api.giphy.com/v1/gifs';

export const giphyAPI = {
  // Search for GIFs
  searchGifs: async (query, limit = 6) => {
    try {
      const response = await fetch(
        `${GIPHY_BASE_URL}/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(query)}&limit=${limit}&rating=g`
      );

      if (!response.ok) {
        throw new Error('Failed to search GIFs');
      }

      const data = await response.json();
      return data.data.map(gif => ({
        id: gif.id,
        title: gif.title,
        url: gif.images.fixed_height.url,
        webp: gif.images.fixed_height.webp,
        preview: gif.images.fixed_height_small.url
      }));
    } catch (error) {
      console.error('Error searching GIFs:', error);
      throw error;
    }
  }
};
