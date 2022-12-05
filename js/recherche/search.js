// algo 2

//algo de recherche par rapport au input.
export const search = (recettes) => {
  // récupère la valeur de la bar de recherche
  const searchText = document.querySelector("#search-bar").value;
  // créer le tableau qui contiendra les recette trouver par la recherche
  const findRecette = [];
  // pour toutes les recherche de la base de donnée
  recettes.forEach((recette) => {
    const name = recette.name.toLowerCase();
    if (name.includes(searchText)) {
      console.log("OK titre");
      findRecette.push(recette);
    } else {
      const description = recette.description.toLowerCase();
      // ajoute la recette s'il y a correspondance dans la description
      if (description.includes(searchText)) {
        console.log("OK desc");
        findRecette.push(recette);
      } else {
        //création du tableau d'ingrédient
        const ingrédient = [];
        ingrédient.push(...recette.ingredients.map((ing) => ing.ingredient));
        // créer une chaine de caractère avec le nom de tout les ingrédient de la recette
        const allIngrédients = ingrédient.reduce((acc, cur) => {
          acc += "" + cur.toLowerCase();
          return acc;
        }, "");

        // ajoute la recette s'il y a correspondance dans le titre

        // ajoute la recette s'il y a correspondance dans les ingrédient
        if (allIngrédients.includes(searchText)) {
          console.log("OK ing");
          findRecette.push(recette);
        }
      }
    }
  });
  return findRecette;
};
