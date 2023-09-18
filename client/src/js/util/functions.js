"use strict";
import { METHODS_HTTP } from "./dictionary.js";

const SECTION_URL = {
    TEST_API : '../API-test/api-test.html',
    DOCS: '../section-docs/docs.html',
    ABOUT_SECTION: '../about-section/about.html',
    HOME: '../../../index.html'
}

export function insertHeader() {
    const body = document.querySelector('body');
    const header = document.createElement('header');
    header.innerHTML = `
    <a href=${SECTION_URL.HOME}>
    <img src="../../images/logo.svg" alt="">
    </a>
    <ul>
        <li>
            <a href=${SECTION_URL.TEST_API}>Test API</a>
        </li>
        <li>
            <a href=${SECTION_URL.DOCS}>Docs</a>
        </li>
        <li>
            <a href=${SECTION_URL.ABOUT_SECTION}>About</a>
        </li>
    </ul>
    `
    body.appendChild(header);
}

export function insertFooter() {
    const body = document.querySelector('body');
    const footer = document.createElement('footer');

    footer.innerHTML = `
        <a href="http://localhost:3000/productos" target="_blank">Products</a>
        <a href="https://github.com/NicolasGenta/API-Trabajo-Fashion-Style" target="_blank">
            <img src="../../images/github_icon.png" alt="logo-gitHub">
        </a>
        <p><> by 
            <a href="">Aldana Farina,</a>
            <a href="">Axel Ganum,</a>
            <a href="">Javier Reyes,</a>
            <a href="https://github.com/LuzNiz" target="_blank">Luz Niz,</a>
            <a href="https://github.com/NicolasGenta" target="_blank">Nicolás Genta</a>
        | 2023 </p>
    `
    body.appendChild(footer);
}

export async function getData(url, method, formData) {
    try {
        let options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        if (method === METHODS_HTTP.METHOD_GET) {
            const res = await fetch(url);
            const data = await res.json();
            return {
                data: data,
                status: res.status,
                statusText: res.statusText
            };
        } else if (method === METHODS_HTTP.METHOD_DELETE) {
            const res = await fetch(url, options);
            const data = await res.json();
            return {
                data: data,
                status: res.status,
                statusText: res.statusText
            };
        } else {
            options.body = formData;
            const res = await fetch(url, options);
            const data = await res.json();
            return {
                data: data,
                status: res.status,
                statusText: res.statusText
            };
        }
    } catch (err) {
        throw new Error('Fallo el fetch: ' + err.message);
    }
}

export function createResContainer(response, status, statusText) {
    const resContainer = document.getElementById('resContainer');
    resContainer.classList.remove('hidden');
    resContainer.innerHTML = `
    <p>Status: ${status} - ${statusText}</p>
    <pre>${response}</pre>
    `
    return resContainer;
}