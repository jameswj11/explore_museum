import axios from "axios";
import 'dotenv/config';

const API_KEY = process.env.RIJKSMUSEUM_API;
console.log(process.env)
const searchParams = {
	key: API_KEY,
	q: 'vermeer',
	imgonly: true
}

// const testData = {
// 	"test": "test1",
// 	"test": "test2"
// }

const rijksAPI = {
	async searchArt() {
		console.log('request reached backend')
		return (
			await axios.get("https://www.rijksmuseum.nl/api/en/collection", {params: searchParams})
		).data;
	}
};

export default rijksAPI;