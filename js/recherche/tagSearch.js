import { AllRecettes } from "../allRecettes.js";
import { displayRecette } from "../recettes.js";


// Recupere tout les tags de recherche en fonction des recette passé en paramètre
export const getTags = (recettes) => {
    // récupère le tableau de recette et en fait un tableau contenant les ingrédients, les ustensils et les appareils
  const allTags = recettes.reduce(
    (acc, curr) => {

        //Ajoute des tag + uniformisation du format (1 lettre en maj reste en min)
        acc.appliance.push(curr.appliance.toString().toLowerCase().replace(/^./, curr.appliance[0].toUpperCase()))
        acc.ingredients.push(...curr.ingredients.map((ing) => ing.ingredient.toString().toLowerCase().replace(/^./, ing.ingredient[0].toUpperCase())))
        acc.ustensils.push(...curr.ustensils.map((ust) => ust.toString().toLowerCase().replace(/^./, ust[0].toUpperCase())))

      return acc
    },
    //contient les éléments vide qui vont être par la suite retourné
    { ingredients: [], appliance: [], ustensils: [] }
  );

  // retire les doublons des différents tableau de tags
  const ingredients =  [...new Set(allTags.ingredients)]
  const ustensils =  [...new Set(allTags.ustensils)]
  const appliance =  [...new Set(allTags.appliance)]

  return {ingredients, ustensils, appliance}
};




//créer la list des tag dans une balise Datalist lié au input correspondant au type de recherche
const createDatalist = (recette, type) => {

    //Selection de l'input correspondant au type
    const searchInput = document.querySelector(`#search-${type}`)
    const dataList = document.createElement("datalist")
    dataList.id= `#search-${type}`
    searchInput.appendChild(dataList)
    let tags = []

    // on récuper les tag du type correspondant 
    if (type === "ingredients"){
         tags = getTags(recette).ingredients 
    }
    else if (type === "appliance")
    {
    tags = getTags(recette).appliance 
    }
    else if (type === "ustensils"){
    tags = getTags(recette).ustensils 
    }
    
  
    dataList.id = `datalistOptions-${type}`
    
    //Pour chaque tag on créer une option dans la datalist
    tags.forEach(tag => {
      const option = document.createElement("option")
      option.value = tag
      dataList.appendChild(option)
    });
    
  }
  
  // créer les datalist de tout les élément de recherche
  export const createAllDataList = (recette) => {
    createDatalist(recette, "ingredients" )
    createDatalist(recette, "appliance" )
    createDatalist(recette, "ustensils" )

  }

  

class Tags {
  constructor(tag, type){
    [this.tag = tag, 
      //contient l'id de la div avec les tags de son type
    this.type = type]
  }
  getTag(){
    return this.tag
  }
  getType(){
    return this.type
  }
  
}

class tabTags {
  constructor(allTags){
    this.allTags=allTags;
  }
  // ajout des tags choisie dans le tableau de tag
  addTags(newTags, type){
    this.allTags.push(new Tags(newTags.value, type));
    this.createTag()
    AllRecettes.filterRecettes(this.allTags)
    displayRecette(AllRecettes.getRecettes());
    
  }
  //suppression des tags choisis dans le tableau de tag
  deleteTag(delTags){
    this.allTags = this.allTags.filter(tag => tag.getTag() != delTags);
    this.createTag()
    AllRecettes.deleteFilterRecettes(this.allTags);
    displayRecette(AllRecettes.getRecettes());
  }
  //créer les tag dans le DOM
  createTag(){
    
    document.getElementById("chooseTags__ingredients").innerHTML=""
    document.getElementById("chooseTags__appliance").innerHTML=""
    document.getElementById("chooseTags__ustensils").innerHTML=""

    this.allTags.forEach(tag => {
      
      const containerType = document.getElementById(tag.getType());
      const div = document.createElement("div");
      const text = document.createElement("p");
      const croix = document.createElement("i");

      croix.classList = ("fa-solid fa-xmark")
     
      
      containerType.appendChild(div);
      div.appendChild(text);
      div.appendChild(croix);
      text.innerText = tag.getTag();
      croix.addEventListener("click",() =>{
        this.deleteTag(text.innerText)
      })
      
    })
   
  }
}
const currentTag = new tabTags([])

// custom dataList
  export class DataList {
    constructor(containerId, inputId, listId, type, options) {
      this.containerId = containerId;
      this.inputId = inputId;
      this.listId = listId;
      this.tagContainerTypeId = type;
      this.options = options;
      this.tags = [];
    }
  
    create(filter = "") {
      const list = document.getElementById(this.listId);
      const filterOptions = this.options.filter(
        d => filter === "" || d.toLowerCase().includes(filter.toLocaleLowerCase())
      );
  
      if (filterOptions.length === 0) {
        list.classList.remove("active");
      } else {
        list.classList.add("active");
      }
  
      list.innerHTML = filterOptions
        .map(o => `<li class="fs-3 col-4 p-1" id=${o.replaceAll(" ", "-" )}>${o}</li>`)
        .join("");
    }
    addListeners(datalist) {
      const container = document.getElementById(this.containerId);
      // récupere tout les container datalist
      const allContainer = document.querySelectorAll(".datalist");
      const inputType = this.tagContainerTypeId
      const input = document.getElementById(this.inputId);
      const list = document.getElementById(this.listId);

      container.addEventListener("click", e => {
        //redonne a toutes les datalist leur forme initial au focus sur un nouveau datalis
        allContainer.forEach(theContainer => {
          theContainer.classList.remove("active")
          theContainer.classList.remove("col-6")
          theContainer.classList.add("col-2")
        })
        if (e.target.id === this.inputId) {
          container.classList.toggle("active");
          container.classList.toggle("col-6");
          container.classList.toggle("col-2")
        } else if (e.target.id === "datalist-icon") {
          container.classList.toggle("active");
          container.classList.toggle("col-6");
          container.classList.toggle("col-2")
          input.focus();
        }
      });
  
      input.addEventListener("input", function(e) {
        if (!container.classList.contains("active")) {
          container.classList.add("active");
        } 
  
        datalist.create(input.value);
      });
  
      list.addEventListener("click", function(e) {
        if (e.target.nodeName.toLocaleLowerCase() === "li") {
          input.value = e.target.textContent;

          currentTag.addTags(input, inputType);
          input.value="";
          
        }
      });
      
    }
    
    //récupération des tag choisie dans le tableau de tag
    getChooseTags(){
      return this.tags;
    }
    //créer les tag dans le DOM
    
    //retourne le type de l'objet
    getType(){
      return this.type;
    }

  }
  
  export const dataListAll= (currentRecette) =>{
    //créer la liste des tag en fonction de toute les recherche
  const tagIngredients = getTags(currentRecette).ingredients 
  const tagAppliance = getTags(currentRecette).appliance 
  const tagUstensils = getTags(currentRecette).ustensils 

  
  //créer les datalist des ingrédient, appareil et ustensils.
   const datalistIngredients = new DataList(
      "datalist-ingredients",
      "search-ingredients",
      "datalist-ingredients-options",
      "chooseTags__ingredients",
      tagIngredients
  
    );
  
   
  
     const datalistAppliance = new DataList(
      "datalist-appliance",
      "search-appliance",
      "datalist-appliance-options",
      "chooseTags__appliance", 
      tagAppliance
    );
    
  
    const datalistUstensils = new DataList(
      "datalist-ustensils",
      "search-ustensils",
      "datalist-ustensils-options",
      "chooseTags__ustensils",
      tagUstensils
    );
    return {datalistAppliance, datalistIngredients, datalistUstensils}
  }

  //initialization des datalist



  const datalist = dataListAll(AllRecettes.getRecettes())
  
datalist.datalistIngredients.create();
  datalist.datalistIngredients.addListeners(datalist.datalistIngredients);
  

  datalist.datalistAppliance.create();
  datalist.datalistAppliance.addListeners(datalist.datalistAppliance);

  datalist.datalistUstensils.create();
  datalist.datalistUstensils.addListeners(datalist.datalistUstensils);



  