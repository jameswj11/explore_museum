// handle delete from favorites
const deleteBtns = document.getElementsByClassName("deleteBtn");
console.log(deleteBtns);
Array.from(deleteBtns).forEach((btn) => {
  btn.addEventListener("click", deleteArtwork);
});

function deleteArtwork(e) {
  const artwork = {};
  const el = e.target.parentElement;

  artwork.img = el.getAttribute("dataImage");
  artwork.desc = el.getAttribute("dataText");

  axios
    .post("/user/delete", {
      savedArt: artwork,
    })
    .then((response) => {})
    .catch((error) => {
      console.log(error);
    });

  el.parentNode.removeChild(el);
}
