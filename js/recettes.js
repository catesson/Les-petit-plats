import { createRecettesCards } from "./cardRecettes.js";
import {AllRecettes} from "./allRecettes.js"
import {dataListCreate} from "../Js/recherche/tagSearch.js"
import {search} from "../Js/recherche/search.js";

//remet toutes les recettes du DOM à zéro
export const deleteRecettesDom = () =>{
  const recetteList = document.querySelector("#recette-list");
  recetteList.innerHTML=""
}

//affiche toutes les recette passé en parametre
export function displayRecette(recette){
  deleteRecettesDom();
    recette.forEach(plat => {
        createRecettesCards(plat); 
    });
}

// récuper la bar de recherche dans le DOM 
const searchBarButton = document.getElementById("search-bar__button");
console.log(searchBarButton)

//evenemet au input lance l'algorithme de recherche et affiche les recettes retourné.
searchBarButton.addEventListener('input', function(e){
  e.preventDefault();
  const searchText = document.querySelector("#search-bar").value.length;
   
  if (searchText > 3){
  const findRecette = search(AllRecettes.getRecettes());  
   dataListCreate(findRecette)
  }
    //si moin de 3 caractère affiche les recettes en fonction des tag
  else {
    displayRecette(AllRecettes.getRecettes());
    dataListCreate(AllRecettes.getRecettes())
  }
 
  
});

displayRecette(AllRecettes.getRecettes());










