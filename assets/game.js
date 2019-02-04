window.runGame = function () {
  //create an array with the alphabet letters
  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  var showLives = document.getElementById("mylives", "hint", "clue");
  // create the list for alphabet
  var buttons = function () {
    var myButtons = document.getElementById('buttons');
    var letters = document.createElement('ul');

    for (var i = 0; i < alphabet.length; i++) {
      letters.id = 'alphabet';
      list = document.createElement('li');
      list.id = 'letter';
      list.innerHTML = alphabet[i];
      check();
      myButtons.appendChild(letters);
      letters.appendChild(list);
    }
  }
  // Create guess list, should be dependent on the list of words
  var result = function () {
    var wordHolder = document.getElementById('hold');
    correct = document.createElement('ul');

    for (var i = 0; i < word.length; i++) {
      correct.setAttribute('id', 'my-word');
      guess = document.createElement('li');
      guess.setAttribute('class', 'guess');
      if (word[i] === "-") {
        guess.innerHTML = "-";
        space = 1;
      } else {
        guess.innerHTML = "_";
      }

      guesses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  }

  // Show lives
  var comments = function () {
    showLives.innerHTML = "You have " + lives + " lives";
    if (lives < 1) {
      showLives.innerHTML = "Game Over";
    }
    for (var i = 0; i < guesses.length; i++) {
      if (counter + space === guesses.length) {
        showLives.innerHTML = "You Win!";
      }
    }
  }

  // Animate man
  var animate = function () {
    var drawMe = lives;
    drawArray[drawMe]();
  }


  // Hangman - I could not figure out the handman and how to make it, I googled it.
  //I understand the concept of getting the element by ID but I could not figure out how to attach the action of drawing a stick with the click simultaneously

  var canvas = function () {

    myStickman = document.getElementById("stickman");
    context = myStickman.getContext('2d');
    context.beginPath();
    context.strokeStyle = "#fff";
    context.lineWidth = 2;
  };
  var head = function () {
    myStickman = document.getElementById("stickman");
    context = myStickman.getContext('2d');
    context.beginPath();
    context.arc(60, 25, 10, 0, Math.PI * 2, true);
    context.stroke();
  }

  var draw = function ($pathFromx, $pathFromy, $pathTox, $pathToy) {

    context.moveTo($pathFromx, $pathFromy);
    context.lineTo($pathTox, $pathToy);
    context.stroke();
  }

  var frame1 = function () {
    draw(0, 150, 150, 150);
  };

  var frame2 = function () {
    draw(10, 0, 10, 600);
  };

  var frame3 = function () {
    draw(0, 5, 70, 5);
  };

  var frame4 = function () {
    draw(60, 5, 60, 15);
  };

  var torso = function () {
    draw(60, 36, 60, 70);
  };

  var rightArm = function () {
    draw(60, 46, 100, 50);
  };

  var leftArm = function () {
    draw(60, 46, 20, 50);
  };

  var rightLeg = function () {
    draw(60, 70, 100, 100);
  };

  var leftLeg = function () {
    draw(60, 70, 20, 100);
  };

  drawArray = [rightLeg, leftLeg, rightArm, leftArm, torso, head, frame4, frame3, frame2, frame1];


  // OnClick Function
  var check = function () {
    list.onclick = function () {
      var guess = this.innerHTML;
      this.setAttribute("class", "active");
      for (var i = 0; i < word.length; i++) {
        if (word[i] === guess) {
          guesses[i].innerHTML = guess;
          counter += 1;
        }
      }
      var j = (word.indexOf(guess));
      if (j === -1) {
        lives -= 1;
        comments();
        animate();
      } else {
        comments();
      }
    }
  }


  // Play
  var play = function () {
    survivalsongs = [
      ["cant-stop"],
      ["eye-of-the-tiger"],
      ["fighter"],
      ["survivor"],
      ["white flag"],
      ["i-will-survive"],
      ["my-way"],
      ["not-afraid"],
      ["stayin-alive"]
    ];

    chosenCategory = survivalsongs[Math.floor(Math.random() * survivalsongs.length)];
    word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
    word = word.replace(/\s/g, "-");
    console.log(word);
    buttons();

    guesses = [];
    lives = 10;
    counter = 0;
    space = 0;
    result();
    comments();
    canvas();
  }

  play();

  // SECTION of JS for Songs. play music or pause it
  ///Notes for me - do not forget to tie specific songs to the answers
  //function to play a song
  document.getElementById("play").addEventListener('click', function (e) {
    console.log("play");
    document.getElementById("Cant-Stop").play();

  });
  //function to Stop the same song
  document.getElementById("stop").addEventListener('click', function (e) {
    console.log("stop");
    document.getElementById("Cant-Stop").pause();
    document.getElementById("Cant-Stop").currentTime = 0;

  });

  document.getElementById("pause").addEventListener('click', function (e) {
    console.log("stop");
    document.getElementById("Cant-Stop").pause();

  });

  // Hint
//having trouble to tie the hint to the correct song
  hint.onclick = function () {

    hints = [
      //index 0 will be can't stop clue
      ["The song is about trial and error and how we learn from the mistakes we make that are caused by temptation. In this case drug abuse"],
      //index 1 will be eye of the tiger clue
      ["This was the theme song to Rocky III"],
      //index 2 will be fighter clue
      ["This song a 21-year old female pop-vocalist wrote about her perseverance in the face of public scrutiny and abuse father"],
      //index 3 will be survivor song
      ["This song signifies a rebirth of the famous girl-band after three former bandmates quit the tour and issued a lawsuit against the group"],
      //index 4 will be white flag clue
      ["This song's title is a symbol of surrender"],
      //index 5 will be i will survive clue
      ["This female-empowerment anthem is about moving on after a bad relationship"],
      //index 6 will be my way clue
      ["This song is about a man who is looking back fondly on a life he lived on his own terms"],
      //index 7 will not afraid clue
      ["In this song a famous rapper admits his past mistakes and promises his fans to come back stronger and persevere his mental illness and drug abuse"],
      //index 8 will be stayin alive clue
      ["This song has been written specifically for the Saturday Night Fever movie where John Travolta plays a young man working a dead-end job with only dancing and music helping him to see the light at the end of the tunnel"]
    ];

    var categoryIndex = survivalsongs(indexOf[i]);
    var hintIndex = survivalsongs.indexOf(word);
    showClue.innerHTML = "Clue: - " + hints[categoryIndex][hintIndex];
  };
}
document.addEventListener('DOMContentLoaded', function () {
  runGame();
});