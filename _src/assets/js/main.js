'use strict';
const input = document.querySelector('.js-input');
const submitBtn = document.querySelector('.js-submit');
const resultList = document.querySelector('.js-results');
let showList = [];
let showListPaintArr = [];
const favoritesShows = [];
let fav = '';



function searchShow() {
  fetch(`http://api.tvmaze.com/search/shows?q=${input.value}`)
    .then(response => response.json())
    .then(data => {
      showList = data;
      paintSearchResult();
      listenShowList();
    })
    .catch(function (err) {
      console.log('Error al traer los datos del servidor', err);
    });
}

function paintSearchResult() {
  let htmlCode = '';
  for (let i = 0; i < showList.length; i++) {
    const favoriteIndex = favoritesShows.indexOf(showList[i].show.id);
    const isFavorite = favoriteIndex !== -1;
    if (isFavorite === true) {
      htmlCode += `<li class="js-showItem show__item--favorite" id=${showList[i].show.id} data-url="${showList[i].show.image.medium || showList[i].show.image.original}" data-name="${showList[i].show.name}">`;
    } else {
      htmlCode += `<li class="js-showItem" id=${showList[i].show.id}>`;
    }
    htmlCode += `<h3>${showList[i].show.name}</h3>`;
    htmlCode += `<div>`;
    if (!!showList[i].show.image === true) {
      htmlCode += `<img src="${showList[i].show.image.medium || showList[i].show.image.original}" alt="imagen de ${showList[i].show.name}">`;
    } else {
      htmlCode += `<img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" alt="imagen por defecto">`;
    }
    htmlCode += `</div>`;
    htmlCode += `</li>`;
    resultList.innerHTML = htmlCode;
  }
}

function toggleFavorites(ev) {
  const clickedId = parseInt(ev.currentTarget.id);
  const index = favoritesShows.findIndex(function (show, index) {
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
  console.log(index);
  console.log(favoritesShows);
}

function listenShowList() {
  showListPaintArr = document.querySelectorAll('.js-showItem');
  for (let i = 0; i < showListPaintArr.length; i++) {
    showListPaintArr[i].addEventListener('click', toggleFavorites);
  }
}

function handler(event) {
  event.preventDefault();
  searchShow();
}

submitBtn.addEventListener('click', handler);
