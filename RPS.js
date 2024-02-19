            let ComputersWins = 0;
            let UserWins = 0; 
                    

            let score = JSON.parse(localStorage.getItem('score'));

            if (score === null){
                score = {
                    wins: 0,
                    loses: 0,
                    ties: 0
                };
            } 

            const movesElement = document.querySelector('.js-moves');

            const scoreElement = document.querySelector('.js-score') ;

            scoreElement.innerHTML = `Your wins: ${score.wins}<br>Computer wins: ${score.loses}<br>Ties: ${score.ties}`;

            document.querySelector('.js-play-rock').addEventListener('click', () =>{
                PlayGame('rock');
            })

            document.querySelector('.js-play-paper').addEventListener('click', () =>{        //event listenery dla kamien papier nozyc
                PlayGame('paper');
            })

             document.querySelector('.js-play-scissors').addEventListener('click', () =>{
                PlayGame('scissors');
            })


            const autoBtn = document.querySelector('.js-auto-btn');
            autoBtn.addEventListener('click', () =>{                              //event listenery dla auto i reset (za pomoca przyciskow tez)
                autoPlay();
            })

            document.body.addEventListener('keydown', (event) =>{
                if (event.key === 'a'){
                    autoPlay();
                };
            })

            const resetBtn = document.querySelector('.js-reset-btn');

            resetBtn.addEventListener('click', () =>{
                
                if (!localStorage.getItem('score')){

                    alert('score has already been reset');

                } else confirmation();

            } );

            document.body.addEventListener('keydown', (event) => {
                
                if (event.key === 'Backspace'){

                    if (!localStorage.getItem('score')){

                        alert('score has already been reset');

                    } else confirmation();
                }
            });

                


     
            
            Random = () =>{

                let move;
                const RandomNumber = (Math.random());

                let moveIcon 

                if (RandomNumber >= 0 && RandomNumber < 1/3){

                    move = 'rock';

                } else if (RandomNumber >= 1/3 && RandomNumber < 2/3){

                    move = 'paper';

                } else {

                    move = 'scissors';
                }

                return move;

            }

            PlayGame = (PlayerMove) =>{

                move = Random();

                if (PlayerMove === 'rock'){

                    if(move === 'rock'){

                     //   alert(`Computer choose ${move}. A tie.`);
                        score.ties++;

                    } else if (move === 'paper'){

                     //   alert(`Computer choose ${move}. You lose.`);
                        score.loses++;

                    } else {

                    //    alert(`Computer choose ${move}. You win.`);
                        score.wins++;
                    }
                    } else if (PlayerMove === 'paper'){

                        if(move === 'rock'){

                         //   alert(`Computer choose ${move}. You win.`);
                            score.wins++;

                        } else if (move === 'paper'){

                        //    alert(`Computer choose ${move}. A tie`);
                            score.ties++;

                        } else{ 
                            
                          //  alert(`Computer choose ${move}. You lose.`);
                            score.loses++;
                        }

                    } else if (PlayerMove === 'scissors'){

                        if (move === 'scissors'){

                          //  alert(`Computer choose ${move}. A tie.`)
                            score.ties++;

                        } else if (move === 'rock'){

                         //   alert(`Computer choose ${move}. You lose.`);
                            score.loses++;
                        } else {

                         //   alert(`Computer choose ${move}. You win.`);
                            score.wins++;
                        
                        }

                        

                }

                
                localStorage.setItem('score', JSON.stringify(score));

                updateScore();

                movesElement
                 .innerHTML = `You <img src = "${PlayerMove}-emoji.png" class = "moveIcon">
                  - <img src= "${move}-emoji.png" class = "moveIcon"> Computer`;

                console.log(move);
                // alert(`Your wins: ${score.wins}\nComputer wins: ${score.loses}\nTies: ${score.ties}`);
                // przy zapisie w `` można zrobic enter zamiast \n
                

            }  

             

               updateScore = () => {

                scoreElement.innerHTML = `Your wins: ${score.wins}
                <br>Computer wins: ${score.loses}
                <br>Ties: ${score.ties}`;

                //w inner.html juz dajemy br jak chcemy załadować zawartosc tego paragrafu
            }

            console.log((localStorage.getItem('score'))); 

            //pamiętaj localStorage pracuje tylko na stringach!!!

            console.log(score);


            let isAutoPlaying = false;

            function autoPlay(){

                if (isAutoPlaying === false){

                    isAutoPlaying = true;
                    autoBtn.innerHTML = 'Stop playing';

                      autoIntervalId = setInterval(() => {

                        const PlayerMove = Random();

                        PlayGame(PlayerMove);
                        
                    }, 1500);
                } else{

                    autoBtn.innerHTML = 'Auto play';
                    isAutoPlaying = false;

                    clearInterval(autoIntervalId);
                }
            }

            function resetScore(){

                score.wins = 0;
                score.loses = 0;
                score.ties = 0;
                
                localStorage.removeItem('score');

                updateScore();

                alert(`Points have been reset\nYour wins: ${score.wins}\nComputer wins: ${score.loses}\nTies: ${score.ties}`);

                movesElement.innerHTML = ' ';

            }

            function confirmation (){

                const divConfirmEle = document.querySelector('.js-confirm-reset-div');
                
                divConfirmEle.innerHTML = `Are you sure you want to reset the score? <button class="yes">Yes</button><button class="no">No</button>`

                document.querySelector('.yes').addEventListener('click', () => {

                    resetScore();
                    divConfirmEle.innerHTML = '';

                });

                document.querySelector('.no').addEventListener('click', () => {

                    divConfirmEle.innerHTML = '';

                });

                
            }



            