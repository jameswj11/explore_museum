let $mainContainer = $("#mainContainer");
let $resultsContainer = $("#resultsContainer");

const queryObject = {};

// get all images on page load
getData(queryObject);

function getData(queryObject) {
  axios
    .get("/api/data", { params: queryObject })
    .then((response) => {
      parseData(response.data.artObjects);
    })
    .catch((error) => {
      console.error(error);
    });
}

function parseData(data) {
  const dataArray = [];
  data.forEach((element) => {
    // check broken image links
    if (!element.webImage.url.includes("http")) return;

    const artObj = {};

    artObj.title = element.title;
    artObj.longTitle = element.longTitle;
    artObj.maker = element.principalOrFirstMaker;
    artObj.imageURL = element.webImage.url;

    dataArray.push(artObj);
  });

  createElements(dataArray);
}

function createElements(dataArray) {
  // clear container for each new search
  $resultsContainer.empty();

  dataArray.forEach((element) => {
    let card = document.createElement("div");
    let image = document.createElement("img");
    let desc = document.createElement("p");

    image.src = element.imageURL;
    desc.textContent = element.longTitle;

    card.append(image);
    card.append(desc);

    resultsContainer.append(card);
  });
}

// handle search queries
$("button").on("click", () => {
  queryObject.q = $("input").val();

  // api call with new params
  getData(queryObject);
});
