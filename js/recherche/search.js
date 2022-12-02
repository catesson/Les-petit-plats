// algo 2


//algo de recherche par rapport au input.
export const search = (recettes) =>{
    const searchText = document.querySelector("#search-bar").value;
    const findRecette = []
    recettes.forEach(recette => {
       
        const name = recette.name.toLowerCase()
        const description = recette.description.toLowerCase()
        const ingrédient = []
        ingrédient.push(...recette.ingredients.map((ing) => ing.ingredient))
        const allIngrédients = ingrédient.reduce((acc, cur) => {
            acc += "" + cur.toLowerCase()
            return acc
        }, "")
        if (name.includes(searchText)){console.log("OK titre"); findRecette.push(recette)} 
        else if (allIngrédients.includes(searchText)){console.log("OK ing"); findRecette.push(recette)}
        else if (description.includes(searchText)){console.log("OK desc"); findRecette.push(recette)}
    });
    return findRecette
}
