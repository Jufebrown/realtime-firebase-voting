{
  // Initialize Firebase
  firebase.initializeApp({
    apiKey: "AIzaSyCMMNNzEP5HY_JMOGQoam-xH5AZqtvzhAk",
    authDomain: "angularfire-practice.firebaseapp.com",
    databaseURL: "https://angularfire-practice.firebaseio.com",
    storageBucket: "angularfire-practice.appspot.com",
    messagingSenderId: "330870997829"
  });

  const votesRef = firebase.database().ref('votes')
  const messagesRef = firebase.database().ref('messages')

  document
    .querySelectorAll('.choice button')
    .forEach(btn => btn.addEventListener('click', onVote))

  function onVote (evt) {
    //submit vote
      //what button
    const voteFor = evt.target.closest('.choice').dataset.value
    // const url = 'https://angularfire-practice.firebaseio.com/votes.json'

    //go get current counts
    // fetch(url)
    votesRef.once('value')
      .then(snap => snap.val())
      // .then(res => res.json())
      .then(data => {
        const newCount = data && data[voteFor] ? data[voteFor] += 1 : 1 //ternary
        // fetch(url, {
        //   method: 'PATCH',
        //   body: JSON.stringify({[voteFor]: newCount})
        // })
        return votesRef.update({[voteFor]: newCount})
      })
      //hide buttons
      .catch(console.error)
      document.querySelectorAll('button').forEach(btn => btn.remove())
      document.querySelectorAll('.hidden').forEach(item=> item.classList.remove('hidden'))
  }

  votesRef.on('value', onUpdate)

  function onUpdate(snap) {
    const data = snap.val()

    document.querySelectorAll('h3').forEach(h => {
      const total = Object.values(data).reduce((acc, val) => acc + val)
      const current = data[h.closest('.choice').dataset.value]
      h.innerText = Math.round(current / total * 100) + "%"
    })
  }


  const submitMessage = (evt) => {
    evt.preventDefault()
    //post name to messages.name
    //post message to messages.name.messages
    const nameInput = evt.target.elements.name
    const contentInput = evt.target.elements.content

    const name = nameInput.value.trim()
    const content = contentInput.value.trim()

    if(name && content) {
      messagesRef.push({name, content})
      .then(() => contentInput.value = '')
    }
  }

  const onNewMessage = (snap) => {
    const {name, content} = snap.val()
    document.querySelector('.messages').innerHTML += `<div><strong>${name}</strong>: ${content}<div/>`
  }


  messagesRef.limitToLast(3).on('child_added', onNewMessage)

  document.querySelector('form').addEventListener('submit', submitMessage)


}





// Array methods

// forEach - return is undefined
// map - return is the array mangled ex: ['apple','banana'] => ['APPLE', 'BANANA']
// filter - returns the array with possibly fewer items
// reduce - returns a single value
