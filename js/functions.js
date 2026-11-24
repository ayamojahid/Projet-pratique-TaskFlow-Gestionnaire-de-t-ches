
import {
    sectionCartes,
    divDone,
    divInProgress,
    divTodo,
    SelectNames,
    search,
    
} from './dom.js'



export function afficherTaches(table) {
    console.log("helo")

    divTodo.textContent = "";
    divInProgress.textContent = "";
    divDone.textContent = "";

    divTodo.className = "w-1/3 bg-green-50 p-4 rounded-xl border border-green-200 shadow-sm font-bold text-gray-800";
    divInProgress.className = "w-1/3 bg-blue-50 p-4 rounded-xl border border-blue-200 shadow-sm font-bold text-gray-800";
    divDone.className = "w-1/3 bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm font-bold text-gray-800";


    const titleTodo = document.createElement("span");
    titleTodo.textContent =`Todo(${table.filter(opt=>opt.Status ==="todo").length})`;

    const titleProgress = document.createElement("span");
titleProgress.textContent = `In Progress (${table.filter(t => t.Status === "inprogress").length})`;

const titleDone = document.createElement("span");
titleDone.textContent = `Done (${table.filter(t => t.Status === "done").length})`;

titleTodo.className = "text-lg font-bold text-green-800";
titleProgress.className = "text-lg font-bold text-blue-800";
titleDone.className = "text-lg font-bold text-gray-800";

divTodo.append(titleTodo);
divInProgress.append(titleProgress);
divDone.append(titleDone);



    sectionCartes.className = "flex w-full gap-5 p-4 items-start";

    sectionCartes.append(divTodo, divInProgress, divDone)

    table.forEach((opt, index) => {
        const divAffiche = document.createElement('div');
        const title = document.createElement('h2');
        const description = document.createElement('h2');
        const nomResponsable = document.createElement('h2');
        const Priority = document.createElement("p");
        const Status = document.createElement("p");
        const DateLimite = document.createElement("p");

        const divBtnMS = document.createElement("div");
        const btnModifier = document.createElement("button");
        const btnSupprimer = document.createElement('button');

        divAffiche.className = "bg-white p-4 mt-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition duration-200";
        title.className = "text-lg font-bold text-gray-800 mb-2";
        description.className = "text-sm text-gray-600 mb-2";
        nomResponsable.className = "text-sm text-gray-700 mb-2";

        Priority.className = "text-sm font-semibold text-orange-600 mb-1";
        Status.className = "text-sm font-medium text-blue-600 mb-1";
        DateLimite.className = "text-sm text-gray-500";

        divBtnMS.className = "flex gap-2 mt-4";

        btnSupprimer.textContent = "Supprimer";
        btnSupprimer.dataset.index = index;
        btnModifier.textContent = "Modifier";
        btnModifier.dataset.index = index;

        btnSupprimer.className = "btnDeleteAll bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition duration-200 cursor-pointer text-sm";
        btnModifier.className = "btnModifierAll bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition duration-200 cursor-pointer text-sm";

        const ligne = document.createElement('hr');
        ligne.className = "my-3 border-gray-200";

        title.textContent = opt.title;
        description.textContent = opt.Description;
        nomResponsable.textContent = opt.Nomduresponsable;
        Priority.textContent = opt.Priority;
        Status.textContent = opt.Status;
        DateLimite.textContent = opt.DateLimite;

        divBtnMS.append(btnModifier, btnSupprimer)
        divAffiche.append(title, description, nomResponsable, Priority, Status, DateLimite, divBtnMS, ligne);

        if (opt.Status === "todo") {
            divTodo.append(divAffiche);
        }
        else if (opt.Status === "inprogress") {
            divInProgress.append(divAffiche);
        }
        else if (opt.Status === "done") {
            divDone.append(divAffiche);
        }

        const btnNext = document.createElement("button");
        btnNext.textContent = "→";
        btnNext.dataset.id = index;
        btnNext.classList.add("btnNext", "bg-green-600", "text-white", "w-10", "h-9", "rounded-lg", "hover:bg-green-700", "transition", "cursor-pointer");

        const btnPrevious = document.createElement("button");
        btnPrevious.textContent = "←";
        btnPrevious.dataset.id = index;
        btnPrevious.classList.add("btnPrevious", "bg-gray-500", "text-white", "w-10", "h-9", "rounded-lg", "hover:bg-gray-600", "transition", "cursor-pointer");

        if (opt.Status === "todo") {
            divAffiche.append(btnNext);
        }
        if (opt.Status === "inprogress") {
            divAffiche.append(btnPrevious, btnNext);
        }
        if (opt.Status === "done") {
            divAffiche.append(btnPrevious)
        }
    })
}


export function ajouterTache(table) {
    const tache =
    {
        title: document.querySelector('[name="titre"]').value,
        Description: document.querySelector('[name="description"]').value,
        Nomduresponsable: document.querySelector('[name="Responsable"]').value,
        Priority: document.querySelector('[name="Priorité"]').value,
        Status: document.querySelector('[name="Statut"]').value,
        DateLimite: document.querySelector('[name="date"]').value
    }

    table.push(tache);
    afficherTaches(table);
    console.log(tache)
    console.log(table)
}


export function filterTache(table , status ) {
 return table.filter((opt)=>opt.Status === status)
}


export function filtrerTachesByNames(table , names){
return table.filter((opt)=> opt.Nomduresponsable === names)
}


export function afficherNames(table) {
    SelectNames.textContent="";

    const opt1Names =document.createElement("option");
    opt1Names.textContent="Tous les responsables";
    opt1Names.value="allNames"
    
    
    SelectNames.appendChild(opt1Names);

    table.forEach((opt)=>{
const OptionNames = document.createElement("option");
OptionNames.textContent=opt.Nomduresponsable;
OptionNames.value = opt.Nomduresponsable
SelectNames.append(OptionNames);
    })


}


export function SearchNames(table) {
const searchValue = search.value.trim().toLowerCase();
console.log(searchValue);
return table.filter((opt)=>{
return opt.Description.includes(searchValue)
})
}

