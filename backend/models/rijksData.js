'use strict';
import axios from "axios";
import 'dotenv/config';

const API_KEY = process.env.RIJKSMUSEUM_API;

const searchParams = {
	key: API_KEY,
	q: 'rembrandt',
	imgonly: true
}

const rijksAPI = {
	async searchArt() {
		return (
			await axios.get("https://www.rijksmuseum.nl/api/en/collection", {params: searchParams})

		).data;
	}
};

export default rijksAPI;