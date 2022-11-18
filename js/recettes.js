import { createRecettesCards } from "./cardRecettes.js";
import {recipes} from "../js/recipes.js"
import {createAllDataList} from "../Js/recherche/tagSearch.js"

//affiche toutes les recette passé en parametre
function getRecette(recette){
    recette.forEach(plat => {
        createRecettesCards(plat); 
    });
}

getRecette(recipes);
createAllDataList(recipes);









