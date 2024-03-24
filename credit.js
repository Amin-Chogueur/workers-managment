"use strict"
/* get data  from local storage */
let newId=JSON.parse(localStorage.getItem("newIdcredit")) || 0;
let workers=JSON.parse(localStorage.getItem("dataWorkerscredit"))|| [];
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
        totalVersement(i);
        totalRest(i)
        let worker=`
                <div class="info">
                <p style="position:relative">
                <button class="see" style="position:absolute;  left:5px ;width: 40px;"   onclick="seeVersment(${workers[i].id},${i})" >see</button> ${workers[i].fullname}</p>
                <p>
                <span id="credit-${workers[i].id}"> ${workers[i].credit} DA</span></p>
                <p style="position:relative">
                <button style="position:absolute;  left:5px ;width: 40px;"   class="update"  onclick="addVersement(${i},${workers[i].id})">add</button> ${workers[i].versement} DA</p>
                <p id="rest-${workers[i].id}">${workers[i].rest} DA</p>
                <button   class="delete"  onclick="deleteWorker(${workers[i].id},${i})">delete</button>
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
    let fullname=prompt("please enter the name");
    let credit=prompt("please enter the debt")
    let newWorker={
        "id":newId,
        "fullname":fullname,
        "versement":0,
        "credit":credit,
        "rest":credit,
        "versementDays":[]
     }
     if(fullname!==null && credit!==null){
        workers.push(newWorker)
        newId++
        readFromLocalStorage()
        read()
     }
     
 })
 /* function see table */
 let newrow;
 function seeVersment(id,i){
    newrow="";
    for(let j=0;j<workers[i].versementDays.length;j++){
        newrow+=`
    <tr >
        <td>${workers[i].versementDays[j].newDate}</td>
        <td>
        ${workers[i].versementDays[j].newVersement} DA
        <button style="position:absolute; right:80px;width: 50px;" onclick="editVersement(${i},${j},${id})">edit</button>
        <button onclick="deleteVersment(${i},${j},${id})">delete</button>
        </td>
    </tr>
    `
    }
    document.getElementById(`calander-${id}`).innerHTML=newrow;
    document.getElementById(`calander-${id}`).classList.toggle("hidden")
 }

 /*function update versement */
 function editVersement(i,j,id){
    let newdate=`${new Date().getDate()}/ ${new Date().getMonth()+1}/${new Date().getFullYear()} at  ${new Date().getHours()}:${new Date().getMinutes()}`;
    workers[i].versementDays[j].newVersement=prompt("enter the correct payment",workers[i].versementDays[j].newVersement)
    workers[i].versementDays[j].newDate=newdate
    readFromLocalStorage()
    document.getElementById(`calander-${id}`).classList.remove("hidden")
    totalVersement(i)
    read()
    seeVersment(id,i)
   
 }
 /* function delete versement */
 function deleteVersment(i,j,id){
    let responce=prompt(`are you sure you want to delete ${workers[i].versementDays[j].newVersement} DA payment for ${workers[i].fullname} ?`)
    if(responce!==null){
        workers[i].versementDays.splice(j,1)
        readFromLocalStorage()
        document.getElementById(`calander-${id}`).classList.remove("hidden")
    }
    totalVersement(i)
    read()
    seeVersment(id,i)
 }
/* function add versment */

function addVersement(i,id){
    let newVersment=prompt("please enter the new payment: ")
    let newdate=`${new Date().getDate()}/ ${new Date().getMonth()+1}/${new Date().getFullYear()} at  ${new Date().getHours()}:${new Date().getMinutes()}`;

    workers[i].versementDays.push(
            {
                "newVersement":newVersment,
                "newDate":newdate
            }
        );
    readFromLocalStorage()
    document.getElementById(`calander-${id}`).classList.remove("hidden")
    totalVersement(i)
    read()
    seeVersment(id,i)
}
 /* function total versement */
 function totalVersement(i){
    let totalV=0;
    for(let j=0;j<workers[i].versementDays.length;j++){
        totalV+=Number(workers[i].versementDays[j].newVersement)
    }
    workers[i].versement=totalV;
    readFromLocalStorage()
    totalRest(i)
 }
 /* function total rest */
 function totalRest(i){
    workers[i].rest=workers[i].credit-workers[i].versement
    readFromLocalStorage()
 }
 /* function delete worker */
 function deleteWorker(id,i){
    let responce=prompt(`are you sure you want to delete  ${workers[i].fullname} ?`)
    if(responce!==null){
        workers=workers.filter(worker=>worker.id!==id)
        readFromLocalStorage()
    }
    read()
 }

 function readFromLocalStorage(){
    localStorage.setItem("newIdcredit",JSON.stringify(newId))
    localStorage.setItem("dataWorkerscredit",JSON.stringify(workers));
};