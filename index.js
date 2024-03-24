"use strict"
/* get data from local storage */
let newId=JSON.parse(localStorage.getItem("newId")) || 0;
let workers=JSON.parse(localStorage.getItem("dataWorkers"))|| [];
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
        totalCredit(i);
        totalRest(i)
        let worker=`
                <div class="info " id="info-${i}">
                <p style="position:relative">
                <button style="position:absolute;  left:5px ;width: 40px;" class="see" onclick="seeCredit(${workers[i].id},${i})" >see</button> <span>${workers[i].fullname}</span>
                <button style="position:absolute;  right:-4px ;width: 75px; background-color: ${workers[i].isPayed[0] ? "red" : "green"} " class="update"  onclick="gotPayed(${i})">${workers[i].isPayed[1]}</button>
                </p>
                <p style="position:relative">
                <button style="position:absolute;  left:5px ;width: 40px;" class="update" onclick="editSalary(${i})" >edit</button>
                <span> ${workers[i].salary} DA</span></p>
                <p style="position:relative">
                <button style="position:absolute;  left:5px ;width: 40px;" class="update"  onclick="addCredit(${i},${workers[i].id})">add</button>
                <span>${workers[i].credit} DA</span>
                </p>
                <p>${workers[i].rest} DA</p>
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
read()
 /* function create new worker */
 create.addEventListener("click",function(){
    let fullname=prompt("please enter the name");
    let salary=prompt("please enter the salary")
    let newWorker={
        "id":newId,
        "fullname":fullname,
        "salary":salary,
        "credit":0,
        "rest":salary,
        "creditDays":[],
        "isPayed":[false,"unpayed"]
     }
     if(fullname!==null && salary!==null){
        workers.push(newWorker)
        newId++
        readFromLocalStorage()
        read()
     }
     
 })
 /* function see table of credit*/
 let newrow;
 function seeCredit(id,i){
    newrow="";
    for(let j=0;j<workers[i].creditDays.length;j++){
        newrow+=`
    <tr>
        <td>
         <span>${workers[i].creditDays[j].newDate}</span>
         <button style="position:absolute;  right:-4px ;width: 75px; background-color: ${workers[i].creditDays[j].isPresent[0] ? "red": "green" } " class="update"  onclick="isWorkerPresent(${id},${i},${j})">${workers[i].creditDays[j].isPresent[1]}</button>
        </td>
        <td>
        ${workers[i].creditDays[j].newCredit} DA
        <button style="position:absolute; right:80px;width: 50px;" onclick="editCredit(${i},${j},${id})">edit</button>
        <button onclick="deleteCredit(${i},${j},${id})">delete</button>
        <span style="display: block;margin-top: 5px;">(${workers[i].creditDays[j].notice})</span>
        </td>
    </tr>
    `
    }
    document.getElementById(`calander-${id}`).innerHTML=newrow;
    document.getElementById(`calander-${id}`).classList.toggle("hidden")
 }
 /* function edit salary */
 function editSalary(i){
    let newSalary=prompt(`please enter the new salary for ${workers[i].fullname}:`,workers[i].salary)
    newSalary ? workers[i].salary=newSalary : workers[i].salary=workers[i].salary;
    readFromLocalStorage()
    read()
 }
 /*function edit Credit */
 function editCredit(i,j,id){
    let newdate=`${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()} at ${new Date().getHours()}:${new Date().getMinutes()}`;
    let newcredit=prompt("entre the correct credit",workers[i].creditDays[j].newCredit);
    let notice=prompt("enter your notice here:",workers[i].creditDays[j].notice);
    newcredit ? workers[i].creditDays[j].newCredit=newcredit :  workers[i].creditDays[j].newCredit=workers[i].creditDays[j].newCredit;
    notice ? workers[i].creditDays[j].notice=notice : workers[i].creditDays[j].notice= "" ;
    workers[i].creditDays[j].newDate=newdate;
    readFromLocalStorage()
    document.getElementById(`calander-${id}`).classList.remove("hidden")
    totalCredit(i)
    read()
    seeCredit(id,i)
    totalRest(i)
 }
 /* function got payed */
 function gotPayed(i){
    if(workers[i].isPayed[0]){
        workers[i].isPayed[0]=false;
        workers[i].isPayed[1]="unpayed";
    }else{
        workers[i].isPayed[0]=true;
        workers[i].isPayed[1]="payed";
    }
    
    
    readFromLocalStorage()
    read()
 }
 /* function delete credit */
 function deleteCredit(i,j,id){
    let responce=prompt(`are you sure you want to delete ${workers[i].creditDays[j].newCredit} DA credit for ${workers[i].fullname} ?`)
    if(responce!==null){
        workers[i].creditDays.splice(j,1)
        readFromLocalStorage()
        document.getElementById(`calander-${id}`).classList.remove("hidden")
    }
    totalCredit(i)
    read()
    seeCredit(id,i)
 }
/* function add credit */

function addCredit(i,id){
    let newCredit=prompt("please enter the new credit: ")
    let newdate=`${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()} at  ${new Date().getHours()}:${new Date().getMinutes()}`;
    if(newCredit!==null && newCredit!==""){
            workers[i].creditDays.push(
                {
                    "isPresent":[0,"present"],
                    "newCredit":newCredit,
                    "newDate":newdate,
                    "notice":""
                }
            );
    readFromLocalStorage()
    document.getElementById(`calander-${id}`).classList.remove("hidden")
    }
    totalCredit(i)
    read()
    seeCredit(id,i)
}
 /* function total credit */
 function totalCredit(i){
    let totalC=0;
    for(let j=0;j<workers[i].creditDays.length;j++){
        totalC+=Number(workers[i].creditDays[j].newCredit)
    }
    workers[i].credit=totalC;
    readFromLocalStorage()
    totalRest(i)
 }
 /* function is worker present */
 function isWorkerPresent(id,i,j){
    if(workers[i].creditDays[j].isPresent[0]===0){
        workers[i].creditDays[j].isPresent[0]=1;
        workers[i].creditDays[j].isPresent[1]="absent"
    }else{
        workers[i].creditDays[j].isPresent[0]=0;
        workers[i].creditDays[j].isPresent[1]="present"
    }
    readFromLocalStorage()
    read()
    seeCredit(id,i)
 }
 /*function total rest */
 function totalRest(i){
    let dailyWage=Math.trunc(workers[i].salary/6) 
    let toatalAbsence=0
    for(let j=0;j<workers[i].creditDays.length;j++){
        if(workers[i].creditDays[j].isPresent[0]!==0){
            toatalAbsence+=1;
        }
    }
    workers[i].rest=workers[i].salary-workers[i].credit-(toatalAbsence*dailyWage);
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

 /*function reset data */
 function resetData(){
    let responce=prompt("are you sure you want to reset all data?")
    if(responce!==null){
        for(let i=0;i<workers.length;i++){
            workers[i].creditDays=[];
            workers[i].isPayed[0]=false;
            workers[i].isPayed[1]="unpayed";
        }
        readFromLocalStorage()
    }
    read()
 }

 function readFromLocalStorage(){
    localStorage.setItem("newId",JSON.stringify(newId))
    localStorage.setItem("dataWorkers",JSON.stringify(workers));
}
