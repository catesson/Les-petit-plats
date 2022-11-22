















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


// custom dataList
  export class DataList {
    constructor(containerId, inputId, listId, options) {
      this.containerId = containerId;
      this.inputId = inputId;
      this.listId = listId;
      this.options = options;
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
      const input = document.getElementById(this.inputId);
      const list = document.getElementById(this.listId);

      container.addEventListener("click", e => {
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
          input.value = e.target.innerText;
          container.classList.toggle("active");
          container.classList.toggle("col-6");
          container.classList.toggle("col-2")
        }
      });
    }
  }
  
  
