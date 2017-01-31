{
  document.querySelector('.choice_a button').addEventListener('click', onVote)
  document.querySelector('.choice_b button').addEventListener('click', onVote)

  function onVote () {
    //hide buttons
    document.querySelectorAll('button').forEach(btn => btn.remove());
    //show current vote totals
    //submit vote

  }
}
