async function catClickHandler(event) {
    event.preventDefault();
  
    console.log('button clicked');

    const response = await fetch('/api/cats/clicks', {
        method: 'PUT',
        body: JSON.stringify({
          cat_id: id
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