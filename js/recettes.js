import { createRecettesCards } from "./cardRecettes.js";
import {AllRecettes} from "./allRecettes.js"
import {dataListAll} from "../Js/recherche/tagSearch.js"

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





displayRecette(AllRecettes.getRecettes());











