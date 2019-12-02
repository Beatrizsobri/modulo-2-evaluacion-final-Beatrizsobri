'use strict';
const input = document.querySelector('.js-input');
// const inputValue = input.value;
const submitBtn = document.querySelector('.js-submit');
const resultList = document.querySelector('.js-results');
let showList = [];
let showListPaintArr = [];
const favoritesShows = [];


function searchShow() {
  fetch(`http://api.tvmaze.com/search/shows?q=${input.value}`)
    .then(response => response.json())
    .then(data => {
      showList = data;
      console.log(data);
      paintSearchResult();
      listenShowList();
    })
    .catch(function (err) {
      console.log("Error al traer los datos del servidor", err);
    });
}

function paintSearchResult() {
  let htmlCode = '';
  for (let i = 0; i < showList.length; i++) {
    const favoriteIndex = favoritesShows.indexOf(showList[i].show.id);
    const isFavorite = favoriteIndex !== -1;
    if (isFavorite === true) {
      htmlCode += `<li class="js-showItem show__item--favorite" id=${showList[i].show.id}>`;
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
  const favoriteIndex = favoritesShows.indexOf(clickedId);
  const isFavorite = favoriteIndex !== -1;
  if (isFavorite === true) {
    favoritesShows.splice(parseInt(favoriteIndex, 1));
  } else {
    favoritesShows.push(parseInt(ev.currentTarget.id));
  }
  paintSearchResult();
  listenShowList();
}

function listenShowList() {
  showListPaintArr = document.querySelectorAll('.js-showItem');
  console.log(showListPaintArr)
  for (let i = 0; i < showListPaintArr.length; i++) {
    showListPaintArr[i].addEventListener('click', toggleFavorites)
  }
}

function handler(event) {
  event.preventDefault();
  searchShow();
}

submitBtn.addEventListener('click', handler);
