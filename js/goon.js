document.addEventListener('DOMContentLoaded', () => {
  const rsvpBtn = document.getElementById('rsvpBtn');
  const nameSection = document.getElementById('nameSection');
  const pollSection = document.getElementById('pollSection');
  const nameInput = document.getElementById('nameInput');
  const submitName = document.getElementById('submitName');
  const voteButtons = document.querySelectorAll('.vote-button');
  const pollGraph = document.getElementById('pollGraph');

  const noahBar = document.getElementById('noahBar');
  const vishnuBar = document.getElementById('vishnuBar');

  // Load votes from localStorage or start fresh
  let votes = JSON.parse(localStorage.getItem('votes')) || { Noah: 0, Vishnu: 0 };
  let hasVoted = localStorage.getItem('hasVoted') === 'true';

  updateGraph();

  rsvpBtn.addEventListener('click', () => {
    nameSection.style.display = 'block';
    rsvpBtn.classList.add('clicked');
  });

  submitName.addEventListener('click', () => {
    const name = nameInput.value.trim();
    if (name !== "") {
      nameSection.style.display = 'none';
      pollSection.style.display = 'block';

      // If user already voted, show the graph
      if (hasVoted) {
        pollGraph.style.display = 'block';
        disableVoteButtons();
      }
    } else {
      alert("Please enter your name.");
    }
  });

  voteButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (hasVoted) return;

      const fighter = button.getAttribute('data-fighter');
      votes[fighter]++;
      localStorage.setItem('votes', JSON.stringify(votes));
      localStorage.setItem('hasVoted', 'true');
      hasVoted = true;

      updateGraph();
      pollGraph.style.display = 'block';
      disableVoteButtons();
    });
  });

  function updateGraph() {
    const total = votes.Noah + votes.Vishnu;
    const noahPercent = total ? Math.round((votes.Noah / total) * 100) : 0;
    const vishnuPercent = total ? Math.round((votes.Vishnu / total) * 100) : 0;

    noahBar.style.width = noahPercent + '%';
    vishnuBar.style.width = vishnuPercent + '%';

    noahBar.textContent = noahPercent + '%';
    vishnuBar.textContent = vishnuPercent + '%';
  }

  function disableVoteButtons() {
    voteButtons.forEach(button => {
      button.disabled = true;
      button.style.opacity = 0.5;
      button.style.cursor = 'not-allowed';
    });
  }
});
