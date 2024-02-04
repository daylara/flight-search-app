const response = require('./mock-data.json');

const mockFetch = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                status: 200,
                json: () => Promise.resolve(response) // json fonksiyonunu ekleyin
            });
        }, 2000);
    });
};

export default mockFetch;