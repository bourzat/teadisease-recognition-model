//where ilyas will work with for the functionality of 
//files and sending results to where neccesary
function displayFileName() {
    const fileInput = document.getElementById("fileInput");
    const fileNameDisplay = document.getElementById("fileName");
    const fileName = fileInput.files[0].name;
    fileNameDisplay.textContent = fileName;
    clearResult(); // Clear previous result when a new image is selected
  }
  
  function clearResult() {
    document.querySelector('.result p').innerText = "";
  }
  
  document.getElementById('uploadForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', document.getElementById('fileInput').files[0]);
  
    console.log('Sending request to:', 'http://127.0.0.1:5000/predict');
    const response = await fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      body: formData
    });
  
    console.log('Response:', response);
    const data = await response.json();
<<<<<<< HEAD
    console.log("Data from model", data)

    document.getElementById('result').innerText = `Predicted Disease: ${data.prediction}`;
});

//end Ilyas' coding in javascript



'use strict';

/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * toggle navbar
 */

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navToggler = document.querySelector("[data-nav-toggler]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  navToggler.classList.toggle("active");
}

addEventOnElem(navToggler, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);



/**
 * header active
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});
=======
    console.log("Data from model", data);
  
    document.querySelector('.result p').innerText = `Predicted Disease: ${data.prediction}`;
  });
>>>>>>> 4c93a01ba89b8678f33cf88cd5b6ce1de7e4c8e7
