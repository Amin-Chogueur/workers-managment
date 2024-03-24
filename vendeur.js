"use strict"
/* get data from local storage */
let newId=JSON.parse(localStorage.getItem("newIdvendeur")) || 0;
let workers=JSON.parse(localStorage.getItem("dataWorkersvendeur"))|| [];
/* declar varibles */
const see=document.querySelectorAll(".see");
const details=document.getElementById("details");
const calander=document.getElementById("calander");
const tbody=document.querySelector(".tbody");
const create=document.getElementById("create");

/* function read data */
function read(){
    tbody.innerHTML="";
    for(let i=0;i<workers.length;i++){
        totalCredit(i)
        totalRest(i)
        let worker=`
                <div class="info">
                <p>
                <button class="see"  onclick="seeCredit(${workers[i].id},${i})" >see</button> ${workers[i].fullname}</p>
                <p style="position:relative">
                <button class="update" style="position:absolute;  left:5px ;width: 40px;"   onclick="editePercent(${i})">edit</button>
                <span id="credit-${workers[i].id}"> ${workers[i].percent} %</span></p>
                <p style="position:relative">
                <button class="update" style="position:absolute;  left:5px ;width: 40px;"   onclick="updateVersement(${workers[i].id},${i})">add</button>
                <span id="credit-${workers[i].id}"> ${workers[i].versement} DA</span></p>
                <p style="position:relative">
                <button class="update" style="position:absolute; left:5px ;width: 40px;"   onclick="addCredit(${i},${workers[i].id})">add</button>
                 ${workers[i].credit} DA</p>
                <p id="rest-${workers[i].id}">${workers[i].rest} DA</p>
                <button class="delete"  onclick="deleteWorker(${workers[i].id},${i})">delete</button>
            </div><!-- info -->
            <div class="details">
            <table class="hidden"  id="calander-${workers[i].id}">
                
            </table>
            </div><!-- details -->
        `
        tbody.innerHTML+=worker
    }
}
//"
read()
 /* function create new worker */
 create.addEventListener("click",function(){
    let fullname=prompt("please enter the name:");
    let percent=prompt("please enter the percentage:")
    let newWorker={
        "id":newId,
        "fullname":fullname,
        "percent":percent,
        "versement":0,
        "versmentDays":[],
        "credit":0,
        "rest":0,
        "creditDays":[]
     }
     console.log(typeof fullname,percent)
     if(fullname!==null && fullname!=="" && percent!==0 && percent!=="" ){
        console.log(fullname,percent)
        workers.push(newWorker)
        newId++
        readFromLocalStorage()
     }
     read()
     
 })
 /* function update Versement */

function updateVersement(id,i){
    let newVersment=prompt("please enetr the new versment: ")
    let newdate=`${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()} at ${new Date().getHours()}:${new Date().getMinutes()}`;
    if(newVersment!==null){
        workers[i].versmentDays.push(
            {
                "newVersment":newVersment,
                "newDate":newdate
            }
        )
        workers[i].creditDays.push(
            {
                "newcredit":0,
                "newDate":newdate
            }
        )
    }
    readFromLocalStorage()
    document.getElementById(`calander-${id}`).classList.remove("hidden")
    totalCredit(i)
    totalVersement(i)
    read()
    seeCredit(id,i)
}

/* function add Credit */

function addCredit(i,id){
    let newcredit=prompt("please enetr the new credit: ")
    let newdate=`${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()} at ${new Date().getHours()}:${new Date().getMinutes()}`;
    if(newcredit!==null){
        workers[i].creditDays.push(
            {
                "newcredit":newcredit,
                "newDate":newdate
            }
        )
        workers[i].versmentDays.push(
            {
                "newVersment":0,
                "newDate":newdate
            }
        )
    }
    readFromLocalStorage()
    document.getElementById(`calander-${id}`).classList.remove("hidden")
    totalCredit(i)
    totalVersement(i)
    read()
    seeCredit(id,i)
}
 /* function see table */
 let newrow;
 function seeCredit(id,i){
    newrow="";
    for(let j=0;j<workers[i].creditDays.length;j++){
        newrow+=`
    <tr >
       
        <td style="width: 55.6%;text-align: left;" >
        <span>${workers[i].versmentDays[j].newDate}</span>
        => versment: ${workers[i].versmentDays[j].newVersment} DA
        </td>
        <td style="text-align: left;" > 
        <span>${workers[i].creditDays[j].newDate}</span>
        => credit:  ${workers[i].creditDays[j].newcredit} DA
        <button style="position:absolute; right:80px;width: 50px;" onclick="editCredit(${i},${j},${id})">edit</button>
        <button onclick="deleteCredit(${i},${j},${id})">delete</button>
        </td>
    </tr>
    `
    }
    document.getElementById(`calander-${id}`).innerHTML=newrow;
    document.getElementById(`calander-${id}`).classList.toggle("hidden")
 }
 function editePercent(i){
    let newPercent=prompt(`please enter the new percent for ${workers[i].fullname}`,workers[i].percent);
    newPercent ? workers[i].percent=newPercent :  workers[i].percent= workers[i].percent
    readFromLocalStorage()
    read()

 }
 /*function update Credit */
 function editCredit(i,j,id){
    let newdate=`${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()} at ${new Date().getHours()}:${new Date().getMinutes()}`;
    let newcredit=prompt("enter the correct credit",workers[i].creditDays[j].newcredit);
    newcredit ? workers[i].creditDays[j].newcredit=newcredit : workers[i].creditDays[j].newcredit=workers[i].creditDays[j].newcredit;

    let newVersment=prompt("enter the correct versment",workers[i].versmentDays[j].newVersment);
    newVersment ? workers[i].versmentDays[j].newVersment=newVersment : workers[i].versmentDays[j].newVersment=workers[i].versmentDays[j].newVersment;
    workers[i].creditDays[j].newDate=newdate;
    readFromLocalStorage();
    document.getElementById(`calander-${id}`).classList.remove("hidden")
    totalCredit(i)
    totalVersement(i)
    read()
    seeCredit(id,i)
 }
 /* function delete versement */
 function deleteCredit(i,j,id){
    let responce=prompt(`are you sure you want to delete this line  credit=${workers[i].creditDays[j].newcredit} DA, versement=${workers[i].versmentDays[j].newVersment} for ${workers[i].fullname} ?`)
    if(responce!==null){
        workers[i].creditDays.splice(j,1)
        workers[i].versmentDays.splice(j,1)
        readFromLocalStorage()
        document.getElementById(`calander-${id}`).classList.remove("hidden")
    }
    totalCredit(i)
    totalVersement(i)
    read()
    seeCredit(id,i)
 }
/* function total versment */
function totalVersement(i){
    let totalV=0;
    for(let j=0;j<workers[i].versmentDays.length;j++){
        totalV+=Number(workers[i].versmentDays[j].newVersment)
    }
    workers[i].versement=totalV;
    readFromLocalStorage()
    totalRest(i)
 }
 /* function total credit */
 function totalCredit(i){
    let totalC=0;
    for(let j=0;j<workers[i].creditDays.length;j++){
        totalC+=Number(workers[i].creditDays[j].newcredit)
    }
    workers[i].credit=totalC;
    readFromLocalStorage()
    totalRest(i)
 }
 /* function total rest */
 function totalRest(i){
    workers[i].rest=Math.trunc((workers[i].versement*workers[i].percent)/100-workers[i].credit);
    readFromLocalStorage()
 }
 
 /* function delete worker */
 function deleteWorker(id,i){
    let responce=prompt(`are you sure you want to delete ${workers[i].fullname} ?`)
    if(responce!==null){
        workers=workers.filter(worker=>worker.id!==id)
        readFromLocalStorage()
    }
    read()
 }
/* function reset data */
function resetData(){
    let responce=prompt("are you sure you want to reset all data?")
    if(responce!==null){
        for(let i=0;i<workers.length;i++){
            workers[i].creditDays=[];
            workers[i].versmentDays=[]
            workers[i].versement=0;
            workers[i].credit=0;
        }
        readFromLocalStorage()
    }
    read()
 } 

 function readFromLocalStorage(){
    localStorage.setItem("newIdvendeur",JSON.stringify(newId))
    localStorage.setItem("dataWorkersvendeur",JSON.stringify(workers));
};