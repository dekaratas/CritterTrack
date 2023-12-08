const axios = require("axios");

const obisGetOccurrencesAxios = axios.create({
  baseURL: "https://api.obis.org/v3/occurrence",
  timeout: 5000,
});

async function getOccurrences(query) {
  try {
    const response = await obisGetOccurrencesAxios.get(`${query}`);
    return response.data;
  } catch (error) {
    console.error("There has been an issue with the API request: ", error);
  }
}

module.exports = getOccurrences;
