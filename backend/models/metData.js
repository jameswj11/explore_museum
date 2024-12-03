'use strict';
import axios from "axios";

let params = {
	hasImage: true,
	
}

const metAPI = {
	async searchArt(params) {
		return (
			await axios.get("https://collectionapi.metmuseum.org/public/collection/v1/objects/11", {params})
		).data;
	}
};

export default metAPI;