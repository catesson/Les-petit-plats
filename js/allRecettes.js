import {recipes} from "./recipes.js"


 class recetteList{
    constructor(recettes){
        this.allRecettes = recettes
        this.currentRecettes =recettes
        this.currentFilter  = []
    }
    getRecettes(){
        return this.currentRecettes;
    }
    //filtrer les recette en fonction des tag. Modifie currentRecettes mais jamais allRecette
    filterRecettes(tag, type){
        if (type === "chooseTags__appliance"){
            const currentRecette = this.currentRecettes.filter(rec => rec.appliance === tag);
            this.currentRecettes=currentRecette
         return this.currentRecettes;
        } else if (type === "chooseTags__ustensils"){
            const currentRecette = []
            console.log(this.currentRecettes)
            this.currentRecettes.forEach(cur => {
            cur.ustensils.forEach( ust => {
               if( ust.toString().toLowerCase().replace(/^./, ust[0].toUpperCase()) === tag){
                currentRecette.push(cur)
                return ;
               }
            })
           
          });
          this.currentRecettes = currentRecette;
          return this.currentRecettes
        }
         
        
    }
    deleteFilterRecettes(appliance){
       
        this.currentRecettes = this.allRecettes; 

        return this.currentRecettes;
         
    }

}
export const AllRecettes = new recetteList(recipes)