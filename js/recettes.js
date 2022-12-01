import { createRecettesCards } from "./cardRecettes.js";
import {AllRecettes} from "./allRecettes.js"
import {dataListAll} from "../Js/recherche/tagSearch.js"
import {search} from "../Js/recherche/search.js";

//remet toutes les recettes du DOM à zéro
const deleteRecettesDom = () =>{
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
searchBarButton.addEventListener('submit', function(e){
  e.preventDefault();
  const findRecette = search(AllRecettes.getRecettes());  
  displayRecette(findRecette);
  //AllRecettes.pushCurrentRecette(findRecette)
});


displayRecette(AllRecettes.getRecettes());










