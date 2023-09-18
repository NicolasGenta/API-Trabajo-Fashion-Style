"use strict";
import { METHODS_HTTP } from "../util/dictionary.js";
import { getData, createResContainer, insertHeader, insertFooter } from "../util/functions.js";

insertHeader();

const formAPI = document.getElementById('form-test-api');
const method = formAPI.firstElementChild;
const textarea = formAPI.querySelector('textarea');

method.addEventListener("change", (e)=>{
    const value = e.target.value;
    if(value !== METHODS_HTTP.METHOD_GET && value !== METHODS_HTTP.METHOD_DELETE){
        textarea.classList.remove('hidden');
    }else {
        if(!textarea.classList.contains('hidden')){
            textarea.classList.add('hidden')
        }
    }
});

formAPI.addEventListener("submit", (e)=>{
    e.preventDefault();
    console.log('enviando formulario...');
    const formData = new FormData(formAPI);

    const formMethod = formData.get('method');
    const formUrl = formData.get('input-url').toString();
    const formDataInput = formData.get('data-input');

    console.log(formUrl);
    getData(`${formUrl}`, formMethod, formDataInput)
    .then(res =>{
        const response = createResContainer(JSON.stringify(res.data, null, 2), res.status, res.statusText);
        formAPI.parentNode.appendChild(response);
    })
});

