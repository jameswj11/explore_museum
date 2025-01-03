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
    artObj.id = element.id;

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
    let saveBtn = document.createElement("button");

    saveBtn.addEventListener("click", saveArtwork);
    saveBtn.textContent = "Save";

    image.src = element.imageURL;
    desc.textContent = element.longTitle;

    card.setAttribute('dataImage', element.imageURL);
    card.setAttribute('dataText', element.longTitle);

    card.append(image);
    card.append(desc);

    // check user auth
    axios.get('/user').then((response)=> {
      if (response.data.username) {
        card.append(saveBtn);
      }
    });

    resultsContainer.append(card);
  });
};

// handle save to favorites
function saveArtwork(e) {
  const artwork = {};
  artwork.img = e.target.parentElement.getAttribute('dataImage');
  artwork.desc = e.target.parentElement.getAttribute('dataText');

  axios.post('/user/save', {
    savedArt: artwork
  }).then((response)=> {
    if (!response.data.user) {
      window.location.href = '/user/login';
    };
  }).catch((error)=> {
    console.log(error)
  })

  e.target.textContent = 'Saved';
  e.target.removeEventListener("click", saveArtwork)
  e.target.setAttribute("disabled", "disabled")
};

// handle search queries
$("#searchBtn").on("click", () => {
  queryObject.q = $("input").val();

  // api call with new params
  getData(queryObject);
});
