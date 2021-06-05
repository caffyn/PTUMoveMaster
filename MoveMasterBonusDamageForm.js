// import { log, debug } from "../ptu.js";

/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {FormApplication}
 */
export class MoveMasterBonusDamageOptions extends FormApplication {

    /** @override */
    static get defaultOptions() {
      return mergeObject(super.defaultOptions, {
        // classes: ["ptu", "charactermancer", "pokemon"],
        template: "modules/PTUMoveMaster/MoveMasterBonusDamageOptionsForm.hbs",
        width: 350,
        height: 150,
        title: "Bonus Damage",
        tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "stats" }]
      });
    }
  
    /* -------------------------------------------- */
  
    /** @override */
    getData() {
      const data = super.getData();
      data.dtypes = ["String", "Number", "Boolean"];

      return data;
    }

    /* -------------------------------------------- */
    
    /** @override */
    async _updateObject(event, formData) {

        let bonusDamage = Number(formData["data.formBonusDamage"]);
        
        let actor = this.object["actor"];
        let item = this.object["item"];
        let finalDB = this.object["finalDB"];
        let typeStrategist = this.object["typeStrategist"];

        game.PTUMoveMaster.RollDamageMove(actor, item, item.name, finalDB, typeStrategist, bonusDamage);
    }
}