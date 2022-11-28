//créer les carte contenant les recettes
export function createRecettesCards(recette){
    const recetteList = document.querySelector("#recette-list");

    //création des éléments du dom
    const card = document.createElement("div"); 
    const cardContent = document.createElement("div"); 
    const image = document.createElement("div"); 
    const row1 = document.createElement("div"); 
    const row2 = document.createElement("div"); 
    const nomRecette = document.createElement("h3"); 
    const temps = document.createElement("p");
    const iconTemps = document.createElement("i");
    temps.appendChild(iconTemps)
    const descriptionRecette = document.createElement("p"); 
    const listIngredients = document.createElement("ul"); 
    
    
    //ajout de tout les ingrédients de la recette
    recette.ingredients.forEach(ingredient => {
        const quantiteIngredient = document.createElement("li");
        const monIngredient = document.createElement("p")
        const nameIngredient = document.createElement("strong")

        listIngredients.appendChild(quantiteIngredient)
        quantiteIngredient.appendChild(monIngredient)
        monIngredient.appendChild(nameIngredient)

        nameIngredient.textContent = ingredient.ingredient
        monIngredient.innerHTML += " " + ingredient.quantity + " " + ingredient.unit

        
    });

    //ajout des classes
    card.className += "col-4  py-3 "  /*bg-light rounded-3 overflow-hidden p-0*/
    cardContent.className += "rounded-3 cardPlat bg-light overflow-hidden"
    image.className +="col-12 cardPlat_image bg-secondary"
    row1.className += "row p-2 "
    nomRecette.className += "col-8 fs-2"
    temps.className += "col-4 fs-2 text-end fw-bold"
    iconTemps.className += "fa-regular fa-clock"
    row2.className += "row px-2"
    listIngredients.className += "col fs-5"
    descriptionRecette.className += "col cardPlat_description fs-5 overflow-hidden"

    //ajout des valeur de la recette
    nomRecette.textContent = recette.name;
    temps.innerHTML += " " +recette.time + " min";
    descriptionRecette.textContent = recette.description

    //ajout au parent
    recetteList.appendChild(card)
    card.appendChild(cardContent)
    cardContent.appendChild(image)
    cardContent.appendChild(row1)
    row1.appendChild(nomRecette)
    row1.appendChild(temps)
   
    cardContent.appendChild(row2)
    row2.appendChild(listIngredients)
    row2.appendChild(descriptionRecette)
}
