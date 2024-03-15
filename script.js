function displayFileName() {
  clearResult();
}

function clearResult() {
  document.querySelector('.result p').innerText = "";
}



// Function to check if array contains duplicates
function hasDuplicates(array) {
  return new Set(array).size !== array.length;
}


document.getElementById('uploadForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const formData = new FormData();
  const files = document.getElementById('fileInput').files;

  for (let i = 0; i < files.length; i++) {
    formData.append('image', files[i]);
  }

  console.log('Sending request to:', 'http://127.0.0.1:5000/predict');
  const response = await fetch('http://127.0.0.1:5000/predict', {
    method: 'POST',
    body: formData
  });

  console.log('Response:', response);
  const data = await response.json();
  console.log("Data from model", data);

  const resultContainer = document.querySelector('.result p');
  const recommendationsContainer = document.querySelector('.recommendations p');
  resultContainer.innerHTML = ''; // Clear previous results
  recommendationsContainer.innerText = ''; // Clear previous recommendations

  if (data && data.result) {
    if (files.length > 1 && data.diseases.every(disease => disease === 'Healthy')) {
    const allHealthy = data.diseases.every(disease => disease === 'Healthy');
    if (allHealthy) {
      resultContainer.textContent = 'No diseases found in the images you have uploaded. You\'re all clear!';
      recommendationsContainer.textContent = "Since your tea is healthy, no recommendations are required. Regularly upload photos to track plant progress.";
    }
    } else if (data.disease === 'Healthy') {
      if (files.length > 1) {
        resultContainer.textContent = 'No diseases found in the images you have uploaded. You\'re all clear!';
      } else {
        resultContainer.textContent = 'No disease found in the tea leaf image you have uploaded. You\'re all clear!';
      }
      recommendationsContainer.textContent = "Since your tea is healthy, no recommendations are required. Regularly upload photos to track plant progress.";
    } else if (data.result === 'Disease Found' || (data.result === 'Diseases Found' && hasDuplicates(data.diseases))) {
      // const pTagHeader = document.createElement('p');
      // pTagHeader.textContent = `${data.result}`;
      // resultContainer.appendChild(pTagHeader);

      // const pTagDisease = document.createElement('p');
      // pTagDisease.textContent = data.disease;
      // resultContainer.appendChild(pTagDisease);
      const uniqueDiseases = [...new Set(data.diseases)]; // Remove duplicates using Set

      if (uniqueDiseases.length > 0) {
        const diseasesText = uniqueDiseases.join(', ');
        const pTagDisease = document.createElement('p');
        pTagDisease.textContent = `Your plants are infected with ${diseasesText}.`;
        resultContainer.appendChild(pTagDisease);
      } else {
        const pTagHeader = document.createElement('p');
        pTagHeader.textContent = data.result === 'Disease Found' ? `${data.result}` : `${data.result}:`;
        resultContainer.appendChild(pTagHeader);

        const pTagNoDisease = document.createElement('p');
        pTagNoDisease.textContent = 'No specific diseases detected.';
        resultContainer.appendChild(pTagNoDisease);
      }

      // Trigger the prompt for spraying history only if diseases are found
      setTimeout(() => {
        handleRecommendations(recommendationsContainer);
      }, 500); // 500 milliseconds = 0.5 seconds

    } else if (data.result === 'Diseases Found') {
      const pTagHeader = document.createElement('p');
      pTagHeader.textContent = `${data.result}`;
      resultContainer.appendChild(pTagHeader);

      data.diseases.forEach(disease => {
        const pTag = document.createElement('p');
        pTag.textContent = disease;
        resultContainer.appendChild(pTag);
      });

      // Trigger the prompt for spraying history only if diseases are found
      setTimeout(() => {
        handleRecommendations(recommendationsContainer);
      }, 500); // 500 milliseconds = 0.5 seconds
    }
  } else {
    alert('Error in getting predictions. Please try again.');
  }
});

// Function to handle recommendations based on spraying history
function handleRecommendations(container) {
  const sprayingMonths = prompt("When was the tea last sprayed with agrochemicals? (Enter number of months)");

  // Recommendations logic based on spraying history
  if (isNaN(sprayingMonths) || sprayingMonths <= 0) {
    alert("Please input a valid number of months for spraying history.");
  } else if (sprayingMonths > 12) {
    alert("Please input the spraying time in months or a suitable statement.");
  } else if (0 < sprayingMonths <= 1) {
    container.textContent = "Consider changing the type of agrochemicals you use.";
  } else if (sprayingMonths > 1 && sprayingMonths <= 5) {
    container.textContent = "Consider planting resistant varieties and removing infected parts.";
  } else if (sprayingMonths > 5) {
    container.textContent = "Consider re-spraying agrochemicals and using biological control by introducing beneficial organisms to the plants.";
  }
}



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
