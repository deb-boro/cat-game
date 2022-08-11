// const cat_id = require('cat_id')

let clickArr = []
let clicks = 0


async function catClickHandler(event) {
  event.preventDefault()

  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  console.log(id)

  clicks = clicks + 1
  clickArr
  console.log(`clicked ${clicks} times`)

  const response = await fetch('/api/cats/clicks', {
    method: 'put',
    body: JSON.stringify({
      cat_id: id
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (response.ok) {
    document.location.reload()
  } else {
    alert(response.statusText)
  }
}

// async function catClick() {
//   let score = await catClickHandler()
//   console.log('Cat clicked ' + clicks + ' times.')
//   const totalClicks = document.querySelector('#totalClicks')
//   totalClicks.textContent('Total Clicks: ' + score)

//   const response = await fetch('/api/cats/clicks', {
//     method: 'PUT',
//     body: JSON.stringify({
//       score,
//     }),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })

//   if (response.ok) {
//     document.location.reload()
//   } else {
//     alert(response.statusText)
//   }
// }
// catClick()
// const totalClicks = document.querySelector('#totalClicks')
// totalClicks.textContent = 'Total Clicks: ' + clicks
document.querySelector('#cat-button').addEventListener('click', catClickHandler)
