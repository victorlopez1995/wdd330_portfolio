const year = document.querySelector('#currentyear')

const lastmodific = document.querySelector('#currentdate');

try {
    year.textContent = new Date().getFullYear();
    lastmodific.textContent = document.lastModified;
  } catch (e) {
    alert('Error with code or your browser does not support Locale');
  }