async function catClickHandler(event) {
    event.preventDefault();
  
    console.log('button clicked');
  }
  

  document.querySelector('#cat-button').addEventListener('click', catClickHandler);