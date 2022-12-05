// algo 2


//algo de recherche par rapport au input.
export const search = (recettes) =>{
    //récupération de la recherche dans l'input
    const searchText = document.querySelector("#search-bar").value;
    //création d'un tableau qui contiendra toutes les recettes trouvé par la recherche
    const findRecette = []
    for (const recette of recettes){
        const name = recette.name.toLowerCase()
        const description = recette.description.toLowerCase()
        let ingrédient = ""
        for (const ing of recette.ingredients){
            ingrédient += " " + ing.ingredient
        }

        // cherche une correspondance dans le titre et l'ajoute dans le tableau de recette trouvé
        if (name.includes(searchText)){console.log("OK titre"); findRecette.push(recette)} 
        // cherche une correspondance dans les ingrédients et l'ajoute dans le tableau de recette trouvé
        else if (ingrédient.includes(searchText)){console.log("OK ing"); findRecette.push(recette)}
        // cherche une correspondance dans la description et l'ajoute dans le tableau de recette trouvé
        else if (description.includes(searchText)){console.log("OK desc"); findRecette.push(recette)}
    }
    return findRecette
}
