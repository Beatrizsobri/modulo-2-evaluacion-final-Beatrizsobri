'use strict';
const input = document.querySelector('.js-input');
// const inputValue = input.value;
const submitBtn = document.querySelector('.js-submit');
const resultList = document.querySelector('.js-results');
let showList = [];


function searchShow() {
  fetch(`http://api.tvmaze.com/search/shows?q=${input.value}`)
    .then(response => response.json())
    .then(data => {
      showList = data;
      console.log(data);
      paintSearchResult();
    })
}

function paintSearchResult() {
  let htmlCode = '';
  for (let i = 0; i < showList.length; i++) {
    debugger;
    htmlCode += `<li>`;
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

function handler(event) {
  event.preventDefault();
  searchShow();
}

submitBtn.addEventListener('click', handler);
