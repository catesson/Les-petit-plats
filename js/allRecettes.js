import { recipes } from "./recipes.js";

class recetteList {
  constructor(recettes) {
    this.allRecettes = recettes;
    this.currentRecettes = recettes;
  }
  getRecettes() {
    return this.currentRecettes;
  }
  //filtrer les recette en fonction des tag. Modifie currentRecettes mais jamais allRecette
  filterRecettes(tags) {
   
    tags.forEach((tag) => {
        //chercher les recettes qui utitlise l'appareil renseigner dans les tags
      if (tag.getType() === "chooseTags__appliance") {
        const currentRecette = this.currentRecettes.filter(
          (rec) => rec.appliance === tag.getTag()
        );
        
        this.currentRecettes = currentRecette;
        console.log(this.currentRecettes);
    } //chercher les recettes qui utitlise l'ustensils renseigner dans les tags 
      else if (tag.getType() === "chooseTags__ustensils") {
        const currentRecette = []
        this.currentRecettes.forEach(rec => {
           const ust =  rec.ustensils.map((ust) => ust.toString().toLowerCase().replace(/^./, ust[0].toUpperCase()))
            ust.forEach(ustensil => {
                if (ustensil === tag.getTag()){
                    currentRecette.push(rec)
                }
            })
        })
          this.currentRecettes = currentRecette;
      } //chercher les recettes qui utitlise l'ingrédient renseigner dans les tags
      else if (tag.getType() === "chooseTags__ingredients") {
        const currentRecette = []
        this.currentRecettes.forEach(rec => {
            const ing =  rec.ingredients.map((ing) => ing.ingredient.toString().toLowerCase().replace(/^./, ing.ingredient[0].toUpperCase()))
            ing.forEach(ingredient => {
                if (ingredient === tag.getTag()){
                    currentRecette.push(rec)
                }
            })
        })
        this.currentRecettes = currentRecette;
        console.log(this.currentRecettes)
      }
      else {throw console.error("type de tag inconnue");}
    });
  }
  //retire le tag choisie et rajoute les recettes correspondantes dans la liste des recettes affichées
  deleteFilterRecettes(tags) {
    this.currentRecettes = this.allRecettes;
    this.filterRecettes(tags);
  }
}
export const AllRecettes = new recetteList(recipes);
