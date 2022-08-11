const cat_id = require('cat_id');

console.log(cat_id)


let clicks = 0;

async function catClickHandler(event) {
    event.preventDefault();
  
   

    

    clicks = clicks + 1;

  

    console.log("Cat clicked " + clicks + " times.");



    const response = await fetch('/api/cats/clicks', {
        method: 'PUT',
        body: JSON.stringify({
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }
  }
  

  document.querySelector('#cat-button').addEventListener('click', catClickHandler);