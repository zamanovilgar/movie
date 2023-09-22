const movieDetail = document.querySelector("#movieDetail");
const movieSearch = document.querySelector("#movieSearch");

movieSearch.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    console.log(this.value);
    const movieTitle = this.value;
    getMovie(movieTitle);
    this.value = "";
  }
});
function getMovie(title) {
  const myPromises = fetch(
    `https://www.omdbapi.com/?apikey=37164fb6&t=${title}`
  );
  myPromises
    .then((res) => {
      const dataPromises = res.json();
      return dataPromises;
      // console.log(data);
    })
    .then((data) => {
      console.log(data);
      renderDetail(data);
    })
    .catch((err) => {
      console.log(err);
    });
  console.log(myPromises);
}

function renderDetail(movie) {
  movieDetail.innerHTML = `
    <div class="d-flex gap-5 my-5">
        <img height="300" style="object-fit: cover"  src="${movie.Poster}" />
<div>
        <h1 class="text-dark">${movie.Title}</h1>
        <ul>
          <li class="text-success h3"> Coutry: ${movie.Country}</li>
          <li class="text-success h3">Awards: ${
            movie.Awards === "N/A" ? "Not in the system": movie.Awards
          }</li>
          <li class="text-success h3">Runtime:${movie.Runtime}</li>
          <li class="text-success h3">Year:${movie.Year}</li>
          <li class="text-success h3">Genre:${movie.Genre}</li>

          <li class="text-danger h3">imdbRating:
          ${movie.imdbRating}</li>
          
          </ul>
    <ul>

          ${movie.Ratings.map(
            (rait) =>
              `<li class="text-warning h6">${rait.Source}: ${rait.Value} </li>`
          ).join("")}
          </div>
        </ul>
        </div>
      </div>`;
}
