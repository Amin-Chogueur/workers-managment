"use strict"
/* get data from local storage */
let moneyData=JSON.parse(localStorage.getItem("moneyData")) || []
/*declaire variables */
let tbody=document.getElementById("tbody");
let tfoot=document.getElementById("tfoot");
let totalS=document.getElementById("totalS");
let totalB=document.getElementById("totalB");
/* function read data */
function read(){
    let day=""
    for(let i=0;i<moneyData.length;i++){
        day+=`
            <tr>
                <td>${moneyData[i].date}</td>
                <td>
                    <span id="s0${i}">${moneyData[i].s[0]} DA</span>
                    <p id="s1${i}">${moneyData[i].s[1]}</p>
                </td>
                <td>
                    <span id="b0${i}">${moneyData[i].b[0]} DA</span>
                    <p id="b1${i}">${moneyData[i].b[1]}</p>
                </td>
                <td class="btn">
                    <button onclick="editDay(${i})">edit</button>
                    <button onclick="deletDay(${i})">delete</button>
                </td>
            </tr>
            
        `
    }
    tbody.innerHTML=day;
    totalMoneyS()
    totalMoneyB()
}
read()

/* function create a new day */

function create(){
    let newdate=`${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()} at ${new Date().getHours()}:${new Date().getMinutes()}`;
    let newDay={
        "date":newdate,
        "s":[0," "],
        "b":[0,""],
    }
    moneyData.push(newDay);
    readFromLocalStorage()
    read()
}
/* function edit day */
function editDay(i){
    /* edit s*/
    let correctS=prompt("please enter the correct (S) !",moneyData[i].s[0]);
    correctS ? moneyData[i].s[0]=correctS : moneyData[i].s[0]="0";
    let commentS=prompt("please enter your comment about the (S) !",moneyData[i].s[1]);
    commentS ? moneyData[i].s[1]=commentS : moneyData[i].s[1]= "";

    /*document.getElementById(`s0${i}`).innerHTML=`${correctS} DA`;
    document.getElementById(`s1${i}`).innerHTML=`${commentS}`;
    /* edit b*/
    let correctB=prompt("please enter the correct (B) !",moneyData[i].b[0]);
    correctB ? moneyData[i].b[0]=correctB : moneyData[i].b[0]= "0";
    
    let commentB=prompt("please enter your comment about the (B) !",moneyData[i].b[1])
    commentB ? moneyData[i].b[1]=commentB :moneyData[i].b[1]= ""

    /*document.getElementById(`b0${i}`).innerHTML=`${correctB} DA`;
    document.getElementById(`b1${i}`).innerHTML=`${commentB}`;*/
    readFromLocalStorage()
    read()
}
/* function delet day */
function deletDay(i){
    let responce=prompt("are you sure you want to delete these day")
    if(responce!==null){
        moneyData.splice(i,1)
        readFromLocalStorage()
    }
    read()
}
/* function calculate total s*/
function totalMoneyS(){
    let total=0
    for(let i=0;i<moneyData.length;i++){
        total+=Number(moneyData[i].s[0])
    }
    totalS.innerHTML=`${total} DA`
}

function totalMoneyB(){
    let total=0
    for(let i=0;i<moneyData.length;i++){
        total+=Number(moneyData[i].b[0])
    }
    totalB.innerHTML=`${total} DA`;
}
/* function reset data*/
function resetData(){
    let responce=prompt("are you sure you want to delete all days")
    if(responce!==null){
        moneyData=[]
    readFromLocalStorage()
    }
    read()
}
/* function read from local storage */
function readFromLocalStorage(){
    localStorage.setItem("moneyData",JSON.stringify(moneyData))
}