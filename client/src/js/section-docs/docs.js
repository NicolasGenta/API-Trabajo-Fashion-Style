"use strict";
import { insertHeader } from "../util/functions.js";

insertHeader();

function logItem(e) {
    const item = e.currentTarget.closest('li').querySelector('.collapse-content');
    item.classList.toggle("hidden");
}
const collapseButton = document.querySelectorAll('.collapse-button');

collapseButton.forEach((item)=>{
    item.addEventListener('click', logItem);
})