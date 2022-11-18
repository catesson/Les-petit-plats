// Recupere tout les tags de recherche en fonction des recette passé en paramètre
const getTags = (recettes) => {
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

  