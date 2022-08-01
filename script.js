
const hint_el = document.querySelector(".hint"),
guessRemain = document.querySelector(".guess-remain span"),
typingInput = document.querySelector(".typing-input"),
resetBtn = document.querySelector("#reset"),
incorrects = document.querySelector(".wrong-letters span"),
inputsBox = document.querySelector(".inputs");



let guessess = 8, word  , correctLetters = [] , wrongLetters = [];


function randomWord(){
  let ranWord = words[Math.floor(Math.random() * words.length)];
  word = ranWord.word;
  let wordLength = word.length;
  
  guessess = 8 , correctLetters = [] , wrongLetters = [];

  let html = "";
  for(let i = 0 ; i < wordLength ; i++){
     html += `<input type="text" disabled>`;
  }
    inputsBox.innerHTML = html;

  incorrects.innerText = "";
  hint_el.innerText = ranWord.hint;
  guessRemain.innerText = guessess;
}




function initGame(e){
  let key = e.target.value;
  let inputs = inputsBox.querySelectorAll('input');
  if(key.match(/^[\u0600-\u06FF\s]+$/) && !correctLetters.includes(key) && !wrongLetters.includes(` ${key} `)){
    if(word.includes(key)){
      for(let i = 0; i < word.length; i++){
        if(word[i] === key){
          guessess--;
          correctLetters.push(key);
          inputs[i].value = key;
        }
      }
    }else{
      guessess--;
      wrongLetters.push(` ${key} `);
    }
    
    guessRemain.innerText = guessess;
    incorrects.innerText = wrongLetters;
  }

  if(correctLetters.length === word.length){
      alert(`آفرین ، همه حروف ${word} رو پیدا کردی`);
      randomWord();
  }else if(guessess < 1){
    alert('باختی ):');
    for(let i = 0; i < word.length; i++){
      inputs[i].value = word[i];
    }
  }
  
  

  typingInput.value = "";
    
}

randomWord();

typingInput.addEventListener('input', initGame);
resetBtn.addEventListener('click', randomWord);
document.addEventListener('keydown',()=> typingInput.focus());
inputsBox.addEventListener('click', ()=> typingInput.focus());