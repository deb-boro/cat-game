async function catCreationFormHandler(event) {
    event.preventDefault()
    const name = document.querySelector('#cat-name').value.trim()
    const color = document.querySelector('#cat-color').value.trim()

    if (name && color) {
        const response = await fetch('/api/cats/create-cat', {
        method: 'post',
        body: JSON.stringify({
            name,
            color
        }),
        headers: { 'Content-Type': 'application/json' },
        })

        // check the response status
        if (response.ok) {
        document.location.replace('/')
        } else {
        alert(response.statusText)
        }
    };
};
document.querySelector('.creation-form').addEventListener('submit', catCreationFormHandler);
