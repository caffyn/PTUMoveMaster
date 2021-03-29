// import { log, debug } from "../ptu.js";

/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {FormApplication}
 */
export class MoveMasterBonusDamageReductionOptions extends FormApplication {

    /** @override */
    static get defaultOptions() {
      return mergeObject(super.defaultOptions, {
        // classes: ["ptu", "charactermancer", "pokemon"],
        template: "modules/PTUMoveMaster/MoveMasterBonusDamageReductionOptionsForm.hbs",
        width: 350,
        height: 150,
        title: "Bonus Damage Reduction",
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

        let bonusDamageReduction = Number(formData["data.formBonusDamageReduction"]);
        
        let inherited_event = this.object["event"];

        game.PTUMoveMaster.applyDamageWithBonus(inherited_event, bonusDamageReduction);
    }
}