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
const h5 = document.createElement("h5");
const searchSelectDiv = document.getElementById("searchSelect");
const searchSelectShows = document.getElementById("searchSelect2");

const goto = document.createElement("a");
goto.innerText = "Back to shows";
goto.href = "#";

searchSelectDiv.appendChild(goto);

searchSelectDiv.appendChild(h5);

searchSelectDiv.appendChild(selectShow);
selectShow.appendChild(showOption1);
const select = document.createElement("select");

const searchbar = document.createElement("input");
searchbar.id = "searchbar";
searchbar.placeholder = "search for an episode";
searchbar.type = "text";
searchbar.name = "searchbar";

function makePageForEpisodes(id) {
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
      h5.innerText = `Display ${episodelist.length} /${episodelist.length} episodes`;
      const showAllOption = document.createElement("option");
      showAllOption.value = "Show all episodes";
      showAllOption.innerText = "Show all episodes";
      select.appendChild(showAllOption);
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

        option.value = `${seasonNum}${episodeNum}`;
        option.innerText = `${seasonNum}${episodeNum} - ${episode.name}`;

        const container = document.createElement("div");

        container.setAttribute("id", "container");

        const episodeName = document.createElement("h4");

        episodeName.innerText = `${episode.name}-${seasonNum}${episodeNum}`;

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

        container.appendChild(episodeName);
        container.appendChild(img);
        container.appendChild(p);
      });

      searchbar.addEventListener("keyup", (e) => {
        const searchTerm = e.target.value.toUpperCase().trim();
        const filter = episodelist.filter((episode1) => {
          if (episode1.summary !== null) {
            return (
              episode1.name.toUpperCase().includes(searchTerm) ||
              episode1.summary.toUpperCase().includes(searchTerm)
            );
          }
        });

        h5.innerText = `Display ${filter.length}/${episodelist.length} episodes`;
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
          console.log(inner);
          console.log(e.target.value.toUpperCase());

          if (
            !inner.includes(e.target.value.toUpperCase()) &
            (e.target.value !== "Show all episodes")
          ) {
            episode.style.display = "none";
          } else {
            episode.style.display = "flex";
          }
        });
        if (e.target.value === "Show all episodes") {
          h5.innerText = `Display ${episodelist.length}/${episodelist.length} episodes`;
        } else {
          h5.innerHTML = "";
        }
      }
    });

  goto.addEventListener("click", goToShows);
  function goToShows(e) {
    divCont.innerHTML = "";
    searchSelectDiv.style.display = "none";
    searchSelectShows.style.display = "flex";
    console.log(searchSelectShows);

    console.log(showsContainer);
    showsContainer.innerHTML = "";
    searchSelectShows.children[1].innerHTML = "";
    makeShowPge();
  }
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
    makePageForEpisodes(e.target.value);
  }
  if (e.target.innerText === "select a show") {
    makePageForEpisodes(e.target.value);
  }
}
const showsContainer = document.getElementById("showsContainer");
let showsList = getAllShows();
function makeShowPge() {
  let showSearchBar = document.getElementById("showsSearchBar");
  let showsSelection = document.getElementById("selectShow");
  let SelectAShow = document.createElement("option");
  showsSelection.appendChild(SelectAShow);
  SelectAShow.innerText = "Select a Show";
  SelectAShow.value = "showAll";

  let hShows = document.getElementById("hShows");
  hShows.innerText = `Display ${showsList.length}/${showsList.length} shows`;

  let defaultSelect = document.getElementById("default");
  showsList.sort((a, b) => a.name.localeCompare(b.name));
  showsList.forEach((show) => {
    const optionForShow = document.createElement("option");

    optionForShow.value = `${show.name}`;
    optionForShow.innerText = `${show.name}`;
    showsSelection.appendChild(optionForShow);

    const oneShowCont = document.createElement("div");
    oneShowCont.id = "oneShowCont";
    showsContainer.appendChild(oneShowCont);
    const showName = document.createElement("a");
    oneShowCont.appendChild(showName);
    const showImg = document.createElement("img");
    oneShowCont.appendChild(showImg);
    showImg.id = "image";
    const showP = document.createElement("p");

    oneShowCont.appendChild(showP);
    if (show.image !== null) {
      showImg.src = show.image.original;
    }
    //showImg.id = "image";
    showP.innerText = show.summary
      .replace(/<p>/g, "")
      .replace(/<\/p>/g, "")
      .replace(/<b>/g, "")
      .replace(/<\/b>/g, "")
      .replace(/<br \/>/g, "")
      .replace(/<i>/g, "")
      .replace(/<\/i>/g, "");

    showP.id = "p";
    showName.innerText = show.name;
    showName.id = show.id;
    showName.href = "#";
    searchSelectDiv.style.display = "none";
    showName.addEventListener("click", getEpisodes);
    function getEpisodes(e) {
      showsContainer.innerHTML = "";
      divCont.style.display = "flex";
      searchSelectDiv.style.display = "flex";
      makePageForEpisodes(e.target.id);
      searchSelectDiv.children[3].innerHTML = "";
      selectShow.style.display = "none";
      searchSelectShows.style.display = "none";
    }
  });

  showSearchBar.addEventListener("keyup", (e) => {
    const searchShowTerm = e.target.value.toUpperCase().trim();
    const filter = showsList.filter((show1) => {
      if (show1.summary !== null) {
        return (
          show1.name.toUpperCase().includes(searchShowTerm) ||
          show1.summary.toUpperCase().includes(searchShowTerm)
        );
      }
    });

    hShows.innerText = `Display ${filter.length}/${showsList.length} shows`;
    console.log(oneShowCont);
    Array.from(oneShowCont).forEach((show) => {
      if (
        !show.lastChild.innerText.toUpperCase().includes(searchShowTerm) &
        !show.firstChild.innerText.toUpperCase().includes(searchShowTerm)
      ) {
        show.style.display = "none";
      } else {
        show.style.display = "flex";
      }
    });
  });

  showsSelection.addEventListener("click", showSelection);

  function showSelection(e) {
    Array.from(oneShowCont).forEach((show) => {
      let innerT = show.firstChild.innerText.toUpperCase();

      if (
        (e.target.value.toUpperCase() !== innerT) &
        (e.target.value !== "showAll")
      ) {
        show.style.display = "none";
      } else {
        show.style.display = "flex";
      }
      if (e.target.value === "showAll") {
        hShows.innerText = `Display ${showsList.length}/${showsList.length} shows`;
      } else {
        hShows.innerHTML = "";
      }
    });
  }
}
window.onload = makeShowPge();
