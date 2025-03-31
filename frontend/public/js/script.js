
let $mainContainer = $("#mainContainer");

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

let userLoggedIn = false;
axios.get('/user').then((response)=> {
  if (response.data.username) {
    userLoggedIn = true;
  }
})

function createElements(dataArray) {
  // clear container for each new search
  $mainContainer.empty();

  let numCards = dataArray.length;
  let numRows = Math.ceil(numCards/3);
  let numCols = 3;

  for (let i = 0, cardNum = 0; i < numRows; i++) {
    let row = document.createElement("div");
    row.setAttribute('class', 'row');
    $mainContainer.append(row);
    for (let j = 0; j < numCols && cardNum < numCards; j++, cardNum++) {
      let col = document.createElement("div");
      col.setAttribute('class', 'col');
      row.append(col);
      
      let card = document.createElement("div");
      let image = document.createElement("img");
      let desc = document.createElement("p");
      let saveBtn = document.createElement("button");
  
      image.setAttribute('class', '.img-responsive')
  
      saveBtn.addEventListener("click", saveArtwork);
      saveBtn.textContent = "Save";
  
      image.src = dataArray[cardNum].imageURL;
      desc.textContent = dataArray[cardNum].longTitle;
  
      card.setAttribute('dataImage', dataArray[cardNum].imageURL);
      card.setAttribute('dataText', dataArray[cardNum].longTitle);
  
      card.append(image);
      card.append(desc);

      if (userLoggedIn) {
        card.append(saveBtn);
      };

      col.append(card);
    }
  };
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
