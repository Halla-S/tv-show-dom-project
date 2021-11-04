//You can edit ALL of the code here

function setup() {
  makePageForEpisodes(82);
  let shows = getAllShows();
  showList(shows);
}

const rootElem = document.getElementById("root");
const divCont = document.getElementById("divCont");
const searchbar = document.createElement("input");
searchbar.id = "searchbar";
searchbar.placeholder = "search";
searchbar.type = "text";
searchbar.name = "searchbar";
const select = document.createElement("select");
const selectShow = document.createElement("select");
const showOption = document.createElement("option");
showOption.innerText = "select a show";
const h6 = document.createElement("h6");
const searchSelectDiv = document.getElementById("searchSelect");
searchSelectDiv.appendChild(searchbar);
searchSelectDiv.appendChild(h6);
searchSelectDiv.appendChild(select);
searchSelectDiv.appendChild(selectShow);
selectShow.appendChild(showOption);

function makePageForEpisodes(id) {
  fetch("https://api.tvmaze.com/shows/" + id + "/episodes")
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw `${response.status} ${response.statusText}`;
    })
    .then(function (episodelist) {
      episodelist.forEach((episode) => {
        let seasonNum = "";
        if (episode.season < 10) {
          seasonNum = `S0${episode.season}`;
        } else {
          seasonNum = `S${episode.season}`;
        }
        let episodeNum = "";
        if (episode.number < 10) {
          episodeNum = `E0${episode.number}`;
        } else {
          episodeNum = `E${episode.number}`;
        }

        const option = document.createElement("option");

        option.value = `${episode.name}`;
        option.innerText = `${seasonNum}${episodeNum} - ${episode.name}`;

        const container = document.createElement("div");

        container.setAttribute("id", "container");

        const h5 = document.createElement("h5");

        h5.innerText = `${episode.name}-${seasonNum}${episodeNum}`;

        const img = document.createElement("img");

        img.src = episode.image.original;

        const p = document.createElement("p");

        p.innerText = episode.summary.replace("<p>", "").replace("</p>", "");

        select.appendChild(option);

        divCont.appendChild(container);

        container.appendChild(h5);
        container.appendChild(img);
        container.appendChild(p);

        console.log(container);
        console.log(typeof container);
      });

      searchbar.addEventListener("keyup", (e) => {
        const searchTerm = e.target.value.toUpperCase();
        const filter = episodelist.filter((episode1) => {
          return (
            episode1.name.toUpperCase().includes(searchTerm) ||
            episode1.summary.toUpperCase().includes(searchTerm)
          );
        });

        h6.innerText = `Display ${filter.length}/${episodelist.length} episodes`;
        Array.from(container).forEach((episode) => {
          if (
            !episode.lastChild.innerText.toUpperCase().includes(searchTerm) &
            !episode.firstChild.innerText.toUpperCase().includes(searchTerm)
          ) {
            episode.style.display = "none";
          } else {
            episode.style.display = "block";
          }
        });
      });

      select.addEventListener("click", selectEpisode);
      function selectEpisode(e) {
        Array.from(container).forEach((episode) => {
          let inner = episode.firstChild.innerText.toUpperCase();

          if (
            (e.target.value.toUpperCase() !==
              inner.split("-").splice(0, 1).join("")) &
            (e.target.value !== "Show all episodes")
          ) {
            episode.style.display = "none";
          } else {
            episode.style.display = "block";
          }
        });
      }
    });

  const showAllOption = document.createElement("option");
  showAllOption.value = "Show all episodes";
  showAllOption.innerText = "Show all episodes";
  select.appendChild(showAllOption);
}
function showList(listOfshows) {
  listOfshows.sort((a, b) => a.name.localeCompare(b.name));
  listOfshows.forEach((oneShow) => {
    const showoption = document.createElement("option");
    selectShow.appendChild(showoption);
    showoption.innerHTML = oneShow.name;
    showoption.value = oneShow.id;
  });
}
selectShow.addEventListener("click", changeShow);
function changeShow(e) {
  select.innerHTML = "";
  divCont.innerHTML = "";

  makePageForEpisodes(e.target.value);
}

window.onload = setup;
