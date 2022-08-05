async function petClickHandler(event) {
    event.preventDefault();
  
    console.log('button clicked');
    let clickCounter;

    clickCounter = clickCounter + 1;
  };

  document.querySelector('#cat').addEventListener('click', petClickHandler);