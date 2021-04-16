// import { log, debug } from "../ptu.js";

/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {FormApplication}
 */
export class MoveMasterRestHoursOptions extends FormApplication {

    /** @override */
    static get defaultOptions() {
      return mergeObject(super.defaultOptions, {
        // classes: ["ptu", "charactermancer", "pokemon"],
        template: "modules/PTUMoveMaster/MoveMasterRestHoursOptionsForm.hbs",
        width: 250,
        height: 200,
        title: "Hours Rested",
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

        let hours = Number(formData["data.formRestHours"]);
        let bandage_used = Number(formData["data.bandageUsedCheckbox"]);

        let actor = this.object["actor"];

        game.PTUMoveMaster.healActorRest(actor, hours, bandage_used);
    }
}