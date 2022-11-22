import { createRecettesCards } from "./cardRecettes.js";
import {recipes} from "../js/recipes.js"
import {getTags, DataList} from "../Js/recherche/tagSearch.js"

//affiche toutes les recette passé en parametre
function displayRecette(recette){
    recette.forEach(plat => {
        createRecettesCards(plat); 
    });
}

displayRecette(recipes);
const tagIngredients = getTags(recipes).ingredients 
const tagAppliance = getTags(recipes).appliance 
const tagUstensils = getTags(recipes).ustensils 
//createAllDataList(recipes);


const datalistIngredients = new DataList(
    "datalist-ingredients",
    "search-ingredients",
    "datalist-ingredients-options",
    tagIngredients
  );

 datalistIngredients.create();
  datalistIngredients.addListeners(datalistIngredients);

  const datalistAppliance = new DataList(
    "datalist-appliance",
    "search-appliance",
    "datalist-appliance-options",
    tagAppliance
  );
  datalistAppliance.create();
  datalistAppliance.addListeners(datalistAppliance);

  const datalistUstensils = new DataList(
    "datalist-ustensils",
    "search-ustensils",
    "datalist-ustensils-options",
    tagUstensils
  );
  datalistUstensils.create();
  datalistUstensils.addListeners(datalistUstensils);
 












