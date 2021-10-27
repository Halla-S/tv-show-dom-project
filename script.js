
//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}
const rootElem = document.getElementById("root");
const divCont = document.createElement("div");
divCont.id = "divCont";
const searchSelectDiv = document.createElement("div");
searchSelectDiv.id = "searchSelect";

const searchbar = document.createElement("input");
searchbar.id = "searchbar";
searchbar.type = "text";
searchbar.name = "searchbar";
searchbar.placeholder = "search";
const select = document.createElement("select");
const h6 = document.createElement("h6");

function makePageForEpisodes(episodeList) {
  console.log(episodeList.length);
  episodeList.forEach((episode) => {
    const option = document.createElement("option");
    if (episode.number < 10) {
      option.value = `${episode.name}`;
      option.innerText = `S0${episode.season}E0${episode.number} - ${episode.name}`;
    } else {
      option.value = `${episode.name}`;
      option.innerText = `S0${episode.season}E${episode.number} - ${episode.name}`;
    }

    const container = document.createElement("div");
    container.setAttribute("id", "container");
    const firstDiv = document.createElement("div");
    firstDiv.setAttribute("id", "firstDiv");
    const secondDiv = document.createElement("div");
    secondDiv.setAttribute("id", "secondDiv");
    const thirdDiv = document.createElement("div");
    thirdDiv.setAttribute("id", "thirdDiv");

    const h5 = document.createElement("h5");

    if (episode.number < 10) {
      h5.innerText = `${episode.name}-S0${episode.season}E0${episode.number}`;
    } else {
      h5.innerText = `${episode.name}-S0${episode.season}E${episode.number}`;
    }
    h6.innerText = `Display 73/73 episodes`;
    const img = document.createElement("img");

    img.src = episode.image.original;

    const p = document.createElement("p");

    p.innerText = episode.summary.replace("<p>", "").replace("</p>", "");

    //rootElem.appendChild(searchbar);
    rootElem.appendChild(searchSelectDiv);
    searchSelectDiv.appendChild(searchbar);
    searchSelectDiv.appendChild(h6);
    searchSelectDiv.appendChild(select);

    //rootElem.appendChild(h6)
    //rootElem.appendChild(select);
    select.appendChild(option);
    rootElem.appendChild(divCont);
    divCont.appendChild(container);

    container.appendChild(firstDiv);
    container.appendChild(secondDiv);
    container.appendChild(thirdDiv);
    firstDiv.appendChild(h5);
    secondDiv.appendChild(img);
    thirdDiv.appendChild(p);
  });
  console.log(container);

  searchbar.addEventListener("keyup", (e) => {
    const searchTerm = e.target.value.toUpperCase();
    const filter = episodeList.filter((episode1) => {
      return (
        episode1.name.toUpperCase().includes(searchTerm) ||
        episode1.summary.toUpperCase().includes(searchTerm)
      );
    });
    console.log(filter);
    h6.innerText = `Display ${filter.length}/73 episodes`;
    Array.from(container).forEach((episode) => {
      console.log();
      if (
        !episode.lastChild.innerText.toUpperCase().includes(searchTerm) &
        !episode.firstChild.innerText.toUpperCase().includes(searchTerm)
      ) {
        episode.style.display = "none";
      }
    });
  });

  select.addEventListener("click", selectEpisode);
  function selectEpisode(e) {
    Array.from(container).forEach((episode) => {
      let inner = episode.firstChild.innerText.toUpperCase();
      console.log(inner.split("-").splice(0, 1).join(""));
      console.log(select.value.toUpperCase());
      if (
        e.target.value.toUpperCase() !== inner.split("-").splice(0, 1).join("")
      ) {
        episode.style.display = "none";
      }
    });
  }
}

window.onload = setup;
