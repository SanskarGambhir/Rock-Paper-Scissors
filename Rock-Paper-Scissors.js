let score = JSON.parse(localStorage.getItem('score')) || {
  Wins: 0,
  Losses: 0,
  Ties: 0
};

localStorage.getItem('score');//This is how we can take out an item from local storage

JSON.parse(localStorage.getItem('score'));
//Here we converted the above string back in object

/*if (score === null) {
  score = {
      Wins: 0,
      Losses: 0,
      Ties: 0
  };
}*/

updateScoreElement();


let isAutoPlaying = false;
let intervalId;

function autoPlay() 
{
  if(!isAutoPlaying) {
          //Here we are using arrow function
      intervalId = setInterval(() => {
          const playerMove = pickComputerMove();
  
          playGame(playerMove);
      }, 1000);
      isAutoPlaying = true;
  }
  else {
      clearInterval(intervalId);
      isAutoPlaying = false;
  }
}

//We can use the below 3 codes of 'addEventListener' instead of 'onclick' 
  document.querySelector('.js-rock-button').addEventListener('click', () => {
      playGame('Rock');
  });

  document.querySelector('.js-paper-button').addEventListener('click', () => {
      playGame('Paper');
  });

  document.querySelector('.js-scissor-button').addEventListener('click', () => {
      playGame('Scissor');
  });

//Here is the code to play the game using keys
  document.body.addEventListener('keydown', (event) => {
      if (event.key === 'r') {
          playGame('Rock');
      }
      else if (event.key === 'p') {
          playGame('Paper');
      }
      else if (event.key === 's') {
          playGame('Scissor');
      }
  })

  
function playGame(playerMove) 
{
  const computerMove= pickComputerMove();

  let result = '';

  if (playerMove === 'Rock') {
      if (computerMove === 'Rock') {
          result = 'Tie.';
      }
      else if(computerMove === 'Paper') {
          result = 'You lose.';
      }
      else if(computerMove === 'Scissor') {
          result = 'You win.';
      } 
  }
  
  else if (playerMove === 'Paper') {
      if(computerMove === 'Rock') {
          result = 'You win.'
      } 
      else if (computerMove === 'Paper') {
          result = 'Tie.'
      }
      else if (computerMove === 'Scissor') {
          result = 'You lose.'
      }
  }

  else if (playerMove === 'Scissor') {
      if(computerMove === 'Rock') {
          result = 'You lose.'
      } 
      else if (computerMove ===   'Paper') {
          result = 'You win.'
      }
      else if (computerMove ===   'Scissor') {
          result = 'Tie.'
      }
  }

  if(result === 'You win.')
  {
      score.Wins= score.Wins + 1;
  }
  else if(result === 'You lose.')
  {
      score.Losses= score.Losses + 1
  }
  else if(result === 'Tie.')
  {
      score.Ties= score.Ties + 1
  }

  localStorage.setItem('score', JSON.stringify(score));//This is how we store score in local storage so that it does not gets reset even if we refresh the page
      //NOTE:- We can only store strings in local storage
  
  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML = `You
      <img src="Images/${playerMove}-emoji.png" class="move-emoji">
      <img src="Images/${computerMove}-emoji.png" class="move-emoji">
      Computer`;
  
  //alert(`You picked ${playerMove}.  Computer picked ${computerMove}. ${result}
  //Wins: ${score.Wins}, Losses: ${score.Losses}, Ties: ${score.Ties}`);
}

function updateScoreElement() {
  document.querySelector('.js-score').innerHTML = `Wins: ${score.Wins}, Losses: ${score.Losses}, Ties: ${score.Ties}`;
}

function pickComputerMove() {
  const randomNumber= Math.random();
  
  if (randomNumber>= 0 &&   randomNumber< 1/3) {
      computerMove = 'Rock';
  }
  else if (randomNumber>= 1/3 && randomNumber< 2/3) {
      computerMove = 'Paper';
  }
  else if (randomNumber>= 2/3 && randomNumber< 1) {
      computerMove = 'Scissor';
  }

  return computerMove; 
}