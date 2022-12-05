// algo 2


//algo de recherche par rapport au input.
export const search = (recettes) =>{
    const searchText = document.querySelector("#search-bar").value;
    const findRecette = []
    for (const recette of recettes){
        const name = recette.name.toLowerCase()
        const description = recette.description.toLowerCase()
        let ingrédient = ""
        for (const ing of recette.ingredients){
            ingrédient += " " + ing.ingredient
        }
        if (name.includes(searchText)){console.log("OK titre"); findRecette.push(recette)} 
        else if (ingrédient.includes(searchText)){console.log("OK ing"); findRecette.push(recette)}
        else if (description.includes(searchText)){console.log("OK desc"); findRecette.push(recette)}
    }
    return findRecette
}
