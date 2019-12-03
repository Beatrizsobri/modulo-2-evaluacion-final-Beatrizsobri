"use strict";
const input = document.querySelector(".js-input");
const submitBtn = document.querySelector(".js-submit");
const resultList = document.querySelector(".js-results");
const favoriteList = document.querySelector(".js-favoriteList");
const resetBtn = document.querySelector(".js-reset");
let showList = [];
let favoritesShows = [];

function setLocalStorage() {
  localStorage.setItem("favorite", JSON.stringify(favoritesShows));
}

function getLocalStorage() {
  const localStorageFavorites = JSON.parse(localStorage.getItem("favorite"));
  if (localStorageFavorites !== null) {
    favoritesShows = localStorageFavorites;
    paintFavorite();
  } else {
    searchShow();
  }
}

function searchShow() {
  fetch(`http://api.tvmaze.com/search/shows?q=${input.value}`)
    .then(response => response.json())
    .then(data => {
      showList = data;
      paintSearchResult();
      listenShowList();
      paintFavorite();
    })
    .catch(function(err) {
      console.log("Error al traer los datos del servidor", err);
    });
}

function paintSearchResult() {
  let htmlCode = "";
  for (let i = 0; i < showList.length; i++) {
    const index = favoritesShows.findIndex(function(show, index) {
      return show.id === showList[i].show.id;
    });
    const isFavorite = index !== -1;
    if (isFavorite === true) {
      htmlCode += `<li class="js-showItem show__item--favorite" id=${showList[i].show.id}>`;
    } else {
      htmlCode += `<li class="js-showItem" id=${showList[i].show.id}>`;
    }
    htmlCode += `<h3>${showList[i].show.name}</h3>`;
    htmlCode += `<div>`;
    if (!!showList[i].show.image === true) {
      htmlCode += `<img src="${showList[i].show.image.medium ||
        showList[i].show.image.original}" alt="imagen de ${
        showList[i].show.name
      }">`;
    } else {
      htmlCode += `<img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" alt="imagen por defecto">`;
    }
    htmlCode += `</div>`;
    htmlCode += `</li>`;
  }
  resultList.innerHTML = htmlCode;
  listenShowList();
}

function paintFavorite() {
  let htmlFav = "";
  for (let i = 0; i < favoritesShows.length; i++) {
    htmlFav += `<li class="js-favoriteInput">`;
    htmlFav += `<h3>${favoritesShows[i].name}</h3>`;
    htmlFav += `<div>`;
    if (!!favoritesShows[i].image === true) {
      htmlFav += `<img src="${favoritesShows[i].image.medium ||
        favoritesShows[i].image.original}" alt="imagen de ${
        favoritesShows[i].name
      }">`;
    } else {
      htmlFav += `<img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" alt="imagen por defecto">`;
    }
    htmlFav += `</div>`;
    htmlFav += `</li>`;
  }
  favoriteList.innerHTML = htmlFav;
}

function toggleFavorites(ev) {
  const clickedId = parseInt(ev.currentTarget.id);
  const index = favoritesShows.findIndex(function(show, index) {
    return show.id === clickedId;
  });
  const isFavorite = index !== -1;
  if (isFavorite === true) {
    favoritesShows.splice(index, 1);
  } else {
    for (let i = 0; i < showList.length; i++) {
      if (showList[i].show.id === clickedId) {
        favoritesShows.push(showList[i].show);
      }
    }
  }
  setLocalStorage();
  paintFavorite();
  listenShowList();
  paintSearchResult();
}

function listenShowList() {
  const showListPaintArr = document.querySelectorAll(".js-showItem");
  for (let i = 0; i < showListPaintArr.length; i++) {
    showListPaintArr[i].addEventListener("click", toggleFavorites);
  }
}

// function listenFavoriteList() {
//   const favoriteListPaintArr = document.querySelectorAll(".js-favoriteInput");
//   for (let i = 0; i < favoriteListPaintArr.length; i++) {
//     favoriteListPaintArr[i].addEventListener("click", toggleFavorites);
//   }
// }

function reset() {
  favoritesShows.splice(0, favoritesShows.length);
  console.log(favoritesShows);
  paintFavorite();
  listenShowList();
  paintSearchResult();
}

function handler(event) {
  event.preventDefault();
  searchShow();
}

resetBtn.addEventListener("click", reset);

submitBtn.addEventListener("click", handler);

getLocalStorage();
