//You can edit ALL of the code here

function setup() {
  makePageForEpisodes(82);
  let shows = getAllShows();
  showList(shows);
  goto.remove();
}

const rootElem = document.getElementById("root");
const divCont = document.getElementById("divCont");

const selectShow = document.createElement("select");
const showOption1 = document.createElement("option");
showOption1.innerText = "select a show";
const h6 = document.createElement("h6");
const searchSelectDiv = document.getElementById("searchSelect");

searchSelectDiv.appendChild(h6);

searchSelectDiv.appendChild(selectShow);
selectShow.appendChild(showOption1);
const select = document.createElement("select");
select.placeholder = "select";
const goto = document.createElement("a");
goto.innerText = "Go to shows";
goto.href = "#";
goto.style.textDecoration = "none";
const searchbar = document.createElement("input");
searchbar.id = "searchbar";
searchbar.placeholder = "search";
searchbar.type = "text";
searchbar.name = "searchbar";

function makePageForEpisodes(id) {
  searchSelectDiv.appendChild(goto);

  searchSelectDiv.appendChild(select);

  searchSelectDiv.appendChild(searchbar);

  fetch("https://api.tvmaze.com/shows/" + id + "/episodes")
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw `${response.status} ${response.statusText}`;
    })
    .then(function (episodelist) {
      h6.innerText = `Display ${episodelist.length} /${episodelist.length} episodes`;
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
        if (episode.image !== null) {
          img.src = episode.image.original;
        }

        const p = document.createElement("p");
        if (episode.summary !== null) {
          p.innerText = episode.summary
            .replace(/<p>/g, "")
            .replace(/<\/p>/g, "");
        }

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
          if (episode1.summary !== null) {
            return (
              episode1.name.toUpperCase().includes(searchTerm) ||
              episode1.summary.toUpperCase().includes(searchTerm)
            );
          }
        });

        h6.innerText = `Display ${filter.length}/${episodelist.length} episodes`;
        Array.from(container).forEach((episode) => {
          if (
            !episode.lastChild.innerText.toUpperCase().includes(searchTerm) &
            !episode.firstChild.innerText.toUpperCase().includes(searchTerm)
          ) {
            episode.style.display = "none";
          } else {
            episode.style.display = "flex";
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
            episode.style.display = "flex";
          }
        });
        //goto.remove();
      }
    });
  goto.addEventListener("click", goToShows);
  function goToShows(e) {
    divCont.innerHTML = "";
    searchSelectDiv.style.display = "none";
    makeShowPge();
  }

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
  if (e.target.innerText !== "select a show") {
    select.innerHTML = "";
    divCont.innerHTML = "";
    //searchbar.remove();

    makePageForEpisodes(e.target.value);
  }
  if (e.target.innerText === "select a show") {
    makePageForEpisodes(e.target.value);
  }
}

function makeShowPge() {
  const showsContainer = document.getElementById("showsContainer");
  let showList = getAllShows();
  showList.forEach((show) => {
    const oneShowCont = document.createElement("div");
    oneShowCont.id = "oneShowCont";
    showsContainer.appendChild(oneShowCont);
    const showName = document.createElement("h5");
    oneShowCont.appendChild(showName);
    const showImg = document.createElement("img");
    oneShowCont.appendChild(showImg);
    const showP = document.createElement("p");
    oneShowCont.appendChild(showP);
    if (show.image !== null) {
      showImg.src = show.image.original;
    }
    showImg.id = "image";
    showP.innerText = show.summary;
    showP.id = "p";
    showName.innerText = show.name;
    showName.id = show.id;
    showName.href = "#";
    //console.log(showName.id);
    searchSelectDiv.style.display = "none";
    //let cc= show.id;

    showName.addEventListener("click", getEpisodes);
    function getEpisodes(e) {
      showsContainer.innerHTML = "";
      divCont.style.display = "flex";

      searchSelectDiv.style.display = "flex";
      makePageForEpisodes(e.target.id);
      searchSelectDiv.children[3].innerHTML = "";
    }
  });
}
window.onload = setup();
