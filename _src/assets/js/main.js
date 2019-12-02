'use strict';
const input = document.querySelector('.js-input');
// const inputValue = input.value;
const submitBtn = document.querySelector('.js-submit');
const resultList = document.querySelector('.js-results');
let showList = [];
let showListPaintArr = [];


function searchShow() {
  fetch(`http://api.tvmaze.com/search/shows?q=${input.value}`)
    .then(response => response.json())
    .then(data => {
      showList = data;
      console.log(data);
      paintSearchResult();
      listenShowList();
    })
}

function paintSearchResult() {
  let htmlCode = '';
  for (let i = 0; i < showList.length; i++) {
    htmlCode += `<li class="js-showItem">`;
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
  console.log('pintando favoritos');
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
