let displayArea = document.querySelector(".ticket-display");
let drawButton = document.querySelector("#draw");
let lottoResults = document.querySelector(".lotto-result-numbers");
let pbResults = document.querySelector(".powerball-result-number");
let bonusResults = document.querySelector(".bonus-result-number");
let ticket = {};
let response= true;
let interval,interval1,bonusInterval;
let counter=0;
let drawnNumbers = [];

drawButton.disabled = true;


let lottoNumber = ()=>{
    let LN = Math.ceil(Math.random()*40);
    return LN;
}

let powerBall = ()=>{
    let PB = Math.ceil(Math.random()*10);
    return PB;
}

function loader(){
    displayArea.innerHTML = '';
    displayArea.textContent = 'loading'; 

    if(!response){         
    response = confirm("Do you want a new ticket?");
    }
    

    if(response){
    setTimeout(generateTicket,1000);     
    } 
}



function generateTicket(){
    displayArea.innerHTML = '';

    lottoResults.innerHTML = '';
    pbResults.innerHTML = '';
    drawnNumbers = [];
    counter = 0;
    
    ticket = {};
    
    drawButton.disabled = false;


function generateLine(){
   let lottoLine = [];
for(let i=0;i<6;i++){
    let number = lottoNumber();
    while(lottoLine.includes(number)){
        number = lottoNumber();        
    }
    lottoLine[i] = number;
}
 return lottoLine.sort((x,y)=>x-y);
}


for(let i=0;i<8;i++){
    ticket[`Line ${i+1}`] = generateLine();
}

 let lineDiv = document.createElement('div');
    lineDiv.classList.add("ticket-line-top","ticket-line");

    let lineNameDiv = document.createElement('p');
    lineNameDiv.classList.add("line-name");
    lineNameDiv.textContent = 'Line Name';

    let lottoLineDiv = document.createElement('p');
    lottoLineDiv.classList.add("lotto-line");    
    lottoLineDiv.textContent = 'Lotto Line';

    // let bonusBallDiv = document.createElement('p');
    // bonusBallDiv.classList.add("bonus-ball");
    // bonusBallDiv.textContent = 'BonusBall';

    let powerBallDiv = document.createElement('p');
    powerBallDiv.classList.add("power-ball");
    powerBallDiv.textContent = 'PowerBall';

    lineDiv.append(lineNameDiv,lottoLineDiv,powerBallDiv);

    displayArea.appendChild(lineDiv);



for( let key in ticket){
    let eachP;
    // let bBall = lottoNumber();

    let powerNumber = powerBall();
    // let bonusBall = ()=>{
    //      while(ticket[key].includes(bBall)){
    //         bBall = lottoNumber();
    //      }
    //         return bBall;
    // }
   
    // console.log(`${key} - ${ticket[key]}`);

    let lineDiv = document.createElement('div');
    lineDiv.classList.add("ticket-line");

    let lineNameDiv = document.createElement('p');
    lineNameDiv.classList.add("line-name");
    lineNameDiv.textContent = key;

    let lottoLineDiv = document.createElement('div');
    lottoLineDiv.classList.add("lotto-line");    
    // lottoLineDiv.textContent = ticket[key].join("  -  ");

    for(k=0;k<ticket[key].length;k++){
        eachP = document.createElement('p');
        eachP.classList.add("number");
        eachP.textContent += ticket[key][k];
        lottoLineDiv.appendChild(eachP);
    }
        
    // let bonusBallDiv = document.createElement('div');
    // let bonusBallNumber = document.createElement('p');
    // bonusBallDiv.classList.add("bonus-ball");
    // bonusBallNumber.classList.add("number");
    
    // bonusBallNumber.textContent = bonusBall();
    // bonusBallDiv.appendChild(bonusBallNumber);


    let powerBallDiv = document.createElement('div');
    let powerBallNumber = document.createElement('p');
    powerBallDiv.classList.add("power-ball");
    powerBallNumber.classList.add("pw")

    powerBallNumber.textContent = powerNumber;
    powerBallDiv.appendChild(powerBallNumber);

    lineDiv.append(lineNameDiv,lottoLineDiv,powerBallDiv);

    displayArea.appendChild(lineDiv);
}
 
response = false;

}

function drawResult(){
    drawButton.disabled = true;
    counter++;
    let newNumber = lottoNumber();
    
    while(drawnNumbers.includes(newNumber)){
        newNumber = lottoNumber();
    }

    drawnNumbers.push(newNumber);    

    let newP = document.createElement('p');
    newP.classList.add("res-disp");
    newP.textContent = `Number - ${newNumber}`;

    lottoResults.appendChild(newP);

   let allNumbers = document.querySelectorAll(".number");
    allNumbers.forEach((num) => {
    if (parseInt(num.textContent) === newNumber) {
      num.classList.add("matched");
    }
  });

    if(counter===6){
        clearInterval(interval);

         bonusInterval = setTimeout(()=>{
            let bonusBall = lottoNumber();
            while(drawnNumbers.includes(bonusBall)){
                bonusBall = lottoNumber();
            }

            console.log("Bonus Ball is - ",bonusBall)

            let newP = document.createElement("p");
            newP.classList.add("res-disp");
            newP.textContent = `Number - ${bonusBall}`;

            bonusResults.appendChild(newP);

                allNumbers.forEach((num)=>{
                    if(parseInt(num.textContent)===bonusBall){
                        num.classList.add("bonus");
                    }
                })
            
                 interval1 = setTimeout(powerBallDraw,1000)
        },2000)


       
        
    }
}

function powerBallDraw(){
    clearTimeout(bonusInterval);
     let powerNumber = powerBall();
      let newP = document.createElement("p");
      newP.classList.add("res-disp");
      newP.textContent = `Number - ${powerNumber}`;

      pbResults.appendChild(newP);

         let allPowers = document.querySelectorAll(".pw");

      allPowers.forEach((pwr)=>{
        if(parseInt(pwr.textContent)=== powerNumber){
            pwr.classList.add("matched");
        }
      })
      clearTimeout(interval1);
      
}

drawButton.addEventListener("click",runDraw);

function runDraw(){
    lottoResults.innerHTML = '';
    pbResults.innerHTML = '';
    drawnNumbers = [];
    counter = 0;
  interval = setInterval(drawResult,1500);
}
