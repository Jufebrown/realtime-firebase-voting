{
  // Initialize Firebase
  firebase.initializeApp({
    apiKey: "AIzaSyCMMNNzEP5HY_JMOGQoam-xH5AZqtvzhAk",
    authDomain: "angularfire-practice.firebaseapp.com",
    databaseURL: "https://angularfire-practice.firebaseio.com",
    storageBucket: "angularfire-practice.appspot.com",
    messagingSenderId: "330870997829"
  });

  document
    .querySelectorAll('.choice button')
    .forEach(btn => btn.addEventListener('click', onVote))

  function onVote (evt) {
    //submit vote
      //what button
    const voteFor = evt.target.closest('.choice').dataset.value
    const url = 'https://angularfire-practice.firebaseio.com/votes.json'

    //go get current counts
    // fetch(url)
    firebase.database().ref('votes').once('value')
      .then(snap => snap.val())
      // .then(res => res.json())
      .then(data => {
        const newCount = data && data[voteFor] ? data[voteFor] += 1 : 1 //ternary
        // fetch(url, {
        //   method: 'PATCH',
        //   body: JSON.stringify({[voteFor]: newCount})
        // })
        return firebase.database().ref('votes').update({[voteFor]: newCount})
        .then(()=>{
          //show current vote totals
          document.querySelectorAll('h3').forEach(h => {
            const total = Object.values(data).reduce((acc, val) => acc + val)
            const current = data[h.closest('.choice').dataset.value]
            h.innerText = Math.round(current / total * 100) + "%"
          })
        })
      })
      //hide buttons
      .then(document.querySelectorAll('button').forEach(btn => btn.remove()))
      .catch(console.error)
  }
}



// Array methods

// forEach - return is undefined
// map - return is the array mangled ex: ['apple','banana'] => ['APPLE', 'BANANA']
// filter - returns the array with possibly fewer items
// reduce - returns a single value
