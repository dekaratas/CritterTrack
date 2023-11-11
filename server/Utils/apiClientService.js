const axios = require("axios");

// Axios instance to make api GET equests to obis and fill my db
const obisGetOccurrencesAxios = axios.create({
  baseURL: "https://api.obis.org/v3/occurrence",
  timeout: 5000,
});

// Get Data from OBIS API by modifying the query of the endpoint
async function getOccurrences(query) {
  try {
    const response = await obisGetOccurrencesAxios.get(`${query}`);
    return response.data;
  } catch (error) {
    console.error("There has been an issue with the API request: ", error);
  }
}

module.exports = getOccurrences;
