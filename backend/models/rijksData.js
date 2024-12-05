import axios from "axios";
import "dotenv/config";

const API_KEY = process.env.RIJKSMUSEUM_API;

const searchParams = {
  key: API_KEY,
  q: "",
  imgonly: true,
  ps: 20,
};

const rijksAPI = {
  async searchArt(query) {
    if (query.q != "") {
      searchParams.q = query.q;
    }
    return (
      await axios.get("https://www.rijksmuseum.nl/api/en/collection", {
        params: searchParams,
      })
    ).data;
  },
};

export default rijksAPI;
