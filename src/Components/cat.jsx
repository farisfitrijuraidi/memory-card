export const fetchCatData = async () => {
    const url = `https://api.thecatapi.com/v1/images/search?limit=10`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('The server rejected our request');
        }
        const data = await response.json();
        return data
    } catch (error) {
        console.error('Failed to fetch Cat Image :', error);
    }
};
