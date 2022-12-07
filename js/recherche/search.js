// algo 1
import {createRecettesCards} from "../cardRecettes.js"
import {deleteRecettesDom, displayRecette} from "../recettes.js"

//algo de recherche par rapport au input.
export const search = (recettes) => {
  //supprime toutes les recettes du dom
  deleteRecettesDom();
  //récupération de la recherche dans l'input
  const searchText = document.querySelector("#search-bar").value;
  const findRecette = []
  if (searchText.length > 3){
  //pour toutes les recettes
  for (const recette of recettes) {
    const name = recette.name.toLowerCase();
    // cherche une correspondance dans le titre et l'ajoute dans le tableau de recette trouvé
    if (name.includes(searchText)) {
      findRecette.push(recette)
      createRecettesCards(recette);
    } else {
      const description = recette.description.toLowerCase();
      // cherche une correspondance dans la description et l'ajoute dans le tableau de recette trouvé
      if (description.includes(searchText)) {
        findRecette.push(recette)
        createRecettesCards(recette);
      } else {
        let ingrédient = "";
        for (const ing of recette.ingredients) {
          ingrédient += " " + ing.ingredient;
        }
        // cherche une correspondance dans les ingrédients et l'ajoute dans le tableau de recette trouvé
        if (ingrédient.includes(searchText)) {

          findRecette.push(recette)
          createRecettesCards(recette);
        }
      }
    }
  }
  if (findRecette.length === 0 ){
    const message = document.querySelector("#no-recette")
    message.innerHTML = "<p>Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.</p>"
  }
  return findRecette
}
else {
  displayRecette(recettes)
  return recettes
}
};
