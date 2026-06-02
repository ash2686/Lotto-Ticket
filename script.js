let displayArea = document.querySelector(".ticket-display");
let drawButton = document.querySelector("#draw");
let lottoResults = document.querySelector(".lotto-result-numbers");
let pbResults = document.querySelector(".powerball-result-number");
let bonusResults = document.querySelector(".bonus-result-number");
let winnings = document.querySelector("#winning");
let siteInfo = document.getElementById("site-info");
let ticket = {};
let response= true;
let interval,interval1,bonusInterval;
let counter=0;
let drawnNumbers = [];
let gameScore=0;
let drawTime = 500;

drawButton.disabled = true;
// winnings.textContent = "Generate Ticket";

// let abc = 10_000_000;

// console.log(typeof abc);


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
    displayArea.textContent = 'loading...'; 

    // if(!response){response = confirm("Do you want a new ticket?");}
    // if(response){setTimeout(generateTicket,1000);} 
    generateTicket();
}
 
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


// ********************** Ticket Generator *********************************

function generateTicket(){
    displayArea.innerHTML = '';
    siteInfo.textContent = "Lotto Simulator";
    lottoResults.innerHTML = '';
    pbResults.innerHTML = '';
    bonusResults.innerHTML = '';
    drawnNumbers = [];
    counter = 0;
    // winnings.textContent = "Click to draw Result"
    
    ticket = {};
    
    drawButton.disabled = false;


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

    
    let powerBallDiv = document.createElement('p');
    powerBallDiv.classList.add("power-ball");
    powerBallDiv.textContent = 'PowerBall';

    lineDiv.append(lineNameDiv,lottoLineDiv,powerBallDiv);

    displayArea.appendChild(lineDiv);



for( let key in ticket){
    let eachP;
    

    let powerNumber = powerBall();
  

    let lineDiv = document.createElement('div');
    lineDiv.classList.add("ticket-line");

    let lineNameDiv = document.createElement('p');
    lineNameDiv.classList.add("line-name");
    lineNameDiv.textContent = key;

    let lottoLineDiv = document.createElement('div');
    lottoLineDiv.classList.add("lotto-line");    

    for(k=0;k<ticket[key].length;k++){
        eachP = document.createElement('p');
        eachP.classList.add("number");
        eachP.textContent += ticket[key][k];
        lottoLineDiv.appendChild(eachP);
    }
        
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
//  runDraw();
}


// ************************************ Draw Result ***********************************************************

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
    // newP.textContent = `Number - ${newNumber}`;
    newP.textContent = newNumber;

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

            let newP = document.createElement("p");
            newP.classList.add("res-disp");
            newP.textContent = bonusBall;

            bonusResults.appendChild(newP);

                allNumbers.forEach((num)=>{
                    if(parseInt(num.textContent)===bonusBall){
                        num.classList.add("bonus");
                    }
                })
            
                 interval1 = setTimeout(powerBallDraw,drawTime)
        },drawTime)       
        
    }
}

function powerBallDraw(){
    clearTimeout(bonusInterval);
     let powerNumber = powerBall();
      let newP = document.createElement("p");
      newP.classList.add("res-disp");
      newP.textContent = powerNumber;

      pbResults.appendChild(newP);

         let allPowers = document.querySelectorAll(".pw");

      allPowers.forEach((pwr)=>{
        if(parseInt(pwr.textContent)=== powerNumber){
            pwr.classList.add("power");
        }
      })
      clearTimeout(interval1);
      lottoResult();
}

drawButton.addEventListener("click",runDraw);

function runDraw(){
    lottoResults.innerHTML = '';
    pbResults.innerHTML = '';
    bonusResults.innerHTML = '';
    drawnNumbers = [];
    counter = 0;
  interval = setInterval(drawResult,drawTime);
}


// ************************************* Results Section ****************************************

function lottoResult(){    
    
    let higherScore=0;
    let allLines = document.querySelectorAll(".ticket-line");
      
      allLines.forEach((line, index) => {   
        // console.log(line);
        let matchedCount = 0;  
        let bonusCount = 0;  
        let powerCount = 0;
        let numbers = line.querySelectorAll(".number");
        let PN = line.querySelector(".pw");

        numbers.forEach(num => {
             if(num.classList.contains("matched")){matchedCount++;}
             if(num.classList.contains("bonus")){bonusCount= 1;}
             if(PN.classList.contains("power")){powerCount = 1;}
    });
    if((powerCount===1 && matchedCount <=2)||(powerCount===1 && matchedCount === 1 && bonusCount ===1)){
        gameScore = 0;
    }else{
    gameScore = getScore(matchedCount,bonusCount,powerCount);
    }


    if(gameScore>higherScore){
        higherScore = gameScore;
    }
});

// console.log("Highest Score ",higherScore);
let finalDraw = finalResult(higherScore);


if(finalDraw){
if(typeof finalDraw === 'number'){
    finalDraw = `$${finalDraw.toLocaleString()}`;
}else{
    finalDraw = finalDraw;
}
}
  console.log("Final Draw is ",finalDraw);
  if(finalDraw !=="Not a winning ticket"){
  siteInfo.textContent = `You have won - ${finalDraw}`;
  }else{
    siteInfo.textContent = "Not a winnig ticket";
  }
//   (finalDraw)?winnings.textContent = finalDraw : winnings.textContent="Not a winning ticket";

}


function getScore(lotto,bonus,power){
    let score = lotto*200 + bonus*75 + power*500;

    return score;
}

function finalResult(gameScore){
    switch(gameScore) {
    case 1700: return 10_000_000;    // 6,0,1
    case 1575: return 5_000_000;     // 5,1,1
    case 1500: return 2_500_000;     // 5,0,1
    case 1375: return 1_000_000;     // 4,1,1
    case 1300: return 750_000;       // 4,0,1
    case 1200: return 500_000;       // 6,0,0
    case 1175: return 200_000;       // 3,1,1
    case 1100: return 100_000;       // 3,0,1
    case 1075: return 250_000;       // 5,1,0
    case 975:  return 50_000;        // 2,1,1
    case 875:  return 75_000;        // 4,1,0
    case 800:  return 40_000;        // 4,0,0  
    case 675:  return 10_000;        // 3,1,0
    case 600:  return 'Free ticket'  //3,0,0
    case 475:  return 'Free Ticket'  //2,1,0       
    default:   return 'Not a winning ticket';             // No win
  }
}