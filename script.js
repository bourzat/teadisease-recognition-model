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
    console.log("Data from model", data);
  
    document.querySelector('.result p').innerText = `Predicted Disease: ${data.prediction}`;
  });
