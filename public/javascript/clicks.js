// const cat_id = require('cat_id')

const btn = document.querySelector('#cat-button')
btn.onclick = Counter
const clicks = document.querySelector('#totalClicks')
var a = 0
function Counter() {
  a += 1
  clicks.innerHTML = a
}

// const clickDisplay = (arr) => {
//   const totalClicks = document.querySelector('#totalClicks')
//   totalClicks.textContent = 'Total Clicks: ' + arr[0]
// }

// async function catClickHandler(event) {
//   event.preventDefault()
//   clicks = clicks + 1
//   clickArr.splice(0, 1, gclicks)
//   console.log(`clicked ${clicks} times`)
//   const response = await fetch('/api/cats/clicks', {
//     method: 'put',
//     body: JSON.stringify({
//       clicks,
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

// // async function catClick() {
// //   let score = await catClickHandler()
// //   console.log('Cat clicked ' + clicks + ' times.')
// //   const totalClicks = document.querySelector('#totalClicks')
// //   totalClicks.textContent('Total Clicks: ' + score)

// //   const response = await fetch('/api/cats/clicks', {
// //     method: 'PUT',
// //     body: JSON.stringify({
// //       score,
// //     }),
// //     headers: {
// //       'Content-Type': 'application/json',
// //     },
// //   })

// //   if (response.ok) {
// //     document.location.reload()
// //   } else {
// //     alert(response.statusText)
// //   }
// // }
// clickDisplay(clickArr)

// document.querySelector('#cat-button').addEventListener('click', catClickHandler)
