import { afficherTaches,
    ajouterTache,
    filterTache ,
    afficherNames,
    filtrerTachesByNames,
    SearchNames
 } from './functions.js'

import {
    btnAjouter,
    formAddDialog,
    addCardDialog,
    btnAnnulerModal,
    sectionCartes ,
    SelectNames,
    search,
    btnReset,
    section1
} from './dom.js'

let cards = [
    {
        title: "Creer un cour",
        Description: "descrption des cour",
        Nomduresponsable: "mina",
        Priority: "low",
        Status: "todo",
        DateLimite: "18/05/2003"
    },
      {
        title: "Creer un cour",
        Description: "desktop des cour",
        Nomduresponsable: "aya mjhd",
        Priority: "low",
        Status: "done",
        DateLimite: "18/05/2003"
    },
    {
        title: "Creer un cour",
        Description: "descrption des cour",
        Nomduresponsable: "imane bkm",
        Priority: "low",
        Status: "todo",
        DateLimite: "12/05/2003"
    },
    {
        title: "Creer un cour",
        Description: "descrption des cour",
        Nomduresponsable: "salma",
        Priority: "low",
        Status: "inprogress",
        DateLimite: "12/05/2003"
    },
    {
        title: "Creer un cour",
        Description: "descrption des cour",
        Nomduresponsable: "amina",
        Priority: "low",
        Status: "done",
        DateLimite: "12/05/2003"
    }
]



afficherTaches(cards);
afficherNames(cards);

btnAjouter.addEventListener("click" , ()=>{
    addCardDialog.showModal();
})

btnAnnulerModal.addEventListener("click" , ()=>{
    addCardDialog.close();
})



formAddDialog.addEventListener("submit" , (e)=>{
e.preventDefault();
ajouterTache(cards);
afficherNames(cards);

addCardDialog.close();
formAddDialog.reset();
})




sectionCartes.addEventListener("click" , (e)=>{
    if(e.target.closest(".btnDeleteAll")){
        const indexElement = e.target.dataset.index;
    //    console.log(e.target.dataset.index)
       cards.splice(indexElement , 1)
       console.log(cards)
       afficherTaches(cards)
    }
})


sectionCartes.addEventListener("click" , (e)=>{
    const btnNext = e.target.closest(".btnNext");
    const btnPrevious = e.target.closest(".btnPrevious");
    // console.log(btnPrevious)
if(btnNext) {
    console.log(btnNext.dataset.id);
    const element = Number(btnNext.dataset.id);
    cards.forEach((opt , index)=>{
    if(element === index) {
 if(opt.Status === "todo") {
            opt.Status = "inprogress";
               console.log(cards)
             afficherTaches(cards)   
        }
        else{
            opt.Status = "done"
             afficherTaches(cards)

        }
    }     }) }

if(btnPrevious) {
    console.log("salam")
    console.log(btnPrevious.dataset.id)
const element2 = Number(btnPrevious.dataset.id);
 cards.forEach((opt , index)=>{
if(element2 === index) {
    console.log("salama")
if(opt.Status === "done") {
    opt.Status = "inprogress";
    afficherTaches(cards)   
}
else{
    opt.Status = "todo";
    afficherTaches(cards)   
}}
})
}
 

})

const filterStatus = document.querySelector("#filterStatus");
console.log(filterStatus)

filterStatus.addEventListener("change" , (e)=>{
const status1 = e.target.value;
console.log(status1)
    
if(status1 === "all") {
    afficherTaches(cards)
}

else{
const result = filterTache(cards, status1);
   console.log(result);
    afficherTaches(result)
}
})



SelectNames.addEventListener("change" , (e)=>{
    const value = e.target.value;
console.log(value)


if(value === "allNames") {
afficherTaches(cards)}
else {
    const tablenamesFiltre = filtrerTachesByNames(cards , value);
    console.log(tablenamesFiltre)
    afficherTaches(tablenamesFiltre)
}
})


search.addEventListener("input" , ()=>{
    const searchElement = SearchNames(cards);
    afficherTaches(searchElement)
    console.log(searchElement)
if(searchElement.length === 0 ){
    console.log("Aucune tâche trouvée");

section1.querySelector(".messageErrorSearch")?.remove()

const messageErrorSearch = document.createElement("p");
messageErrorSearch.className = "messageErrorSearch";
messageErrorSearch.textContent = "Aucune tâche trouvée";
section1.appendChild(messageErrorSearch)
}
})


btnReset.addEventListener("click" , ()=> {
    search.value="";
    filterStatus.value="all";
    SelectNames.value="allNames";
    afficherTaches(cards)
})