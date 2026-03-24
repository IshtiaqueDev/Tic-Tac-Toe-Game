let button=document.querySelector("button");
let boxes=document.querySelectorAll(".box");
let userScore=document.querySelector(".userScore");
let compScore=document.querySelector(".compScore");
let h2=document.querySelector(".not");
let us=0;
let cs=0;
let cross="X";
let circle="O";

let winPattern=[
    ['one', 'two', 'three'],
  ['four', 'five', 'six'],
  ['seven', 'eight', 'nine'],
  ['one', 'four', 'seven'],
  ['two', 'five', 'eight'],
  ['three', 'six', 'nine'],
  ['one', 'five', 'nine'],
  ['three', 'five', 'seven']
];

let userSeq=[];
let comSeq=[];
let choices=['one','two','three','four','five','six','seven','eight','nine'];


  button.addEventListener("click",()=>{
    if(button.innerText=="Start Game"){
    userScore.innerText=`User Score: ${us}`;
    compScore.innerText=`Computer Score: ${cs}`;
    button.innerText="Reset Game";
    }else{
      cs=0;
      us=0;
      button.innerText="Start Game";
    userScore.innerText=`User Score: ${us}`;
    compScore.innerText=`Computer Score: ${cs}`;  
      clearBoxes();
    }
  }); 


function userClick(){
 if(button.innerText==="Reset Game"){
  if(this.innerText==""){
  this.innerText=cross;
  this.style.color="red";
  let box=this.getAttribute("id");
  userSeq.push(box);
  let idx=choices.indexOf(box);
  choices.splice(idx,1);
  comprand();
  checkWin();
}else {
  alert("Double Click not allowed !");
}
  //userSeq.push(clicked);
}

}


function comprand(){
  if(choices.length===0) return;
  let num=Math.floor(Math.random()*choices.length);
  let box=document.querySelector(`#${choices[num]}`);
  if(box!=null){
  box.innerText=circle;
  box.style.color="green";
  }
  comSeq.push(choices[num]);
  choices.splice(num,1);
  checkWin();
}

function checkWin(){
    let userWin=winPattern.some(pattern=>
    pattern.every(el=>userSeq.includes(el))
  );
  let comWin=winPattern.some(pattern=>
    pattern.every(el=>comSeq.includes(el))
  );
  if(userWin==true){
    us+=1;
    h2.innerText="User Win";
   userScore.innerText=`User Score: ${us}`;
   setTimeout(()=>{
    clearBoxes();
   },1000);   
   return;
  }else if(comWin){
    cs+=1;
    h2.classList.add("red");
    h2.innerText="Computer Win";
    compScore.innerText=`Computer Score: ${cs}`;
   setTimeout(()=>{
    clearBoxes();
   },1000);
    return;
  }else if(choices.length==0){
    h2.classList.add("red");  
    h2.innerText="Tie";
    setTimeout(()=>{
        clearBoxes();
    },1000);
  }
  
}

function clearBoxes(){
  h2.innerText='';
  h2.classList.remove("red");
  userSeq=[];
  comSeq=[];
  choices=['one','two','three','four','five','six','seven','eight','nine'];
  for(let box of boxes){
    box.innerText="";
  }
}

function reset(){
  button.innerText="Start Game";

}



for(box of boxes){
  box.addEventListener("click",userClick);
}