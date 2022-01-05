import { PTUAutoFight } from "./code.js";

Hooks.once("init", () => {
	console.log("init module");
});
Hooks.on("ready", () => {
	// Initialize 
	// console.log("hook test 1");
	window.PTUAutoFight = PTUAutoFight();
});
Hooks.on("renderChatMessage", (message, html, data) => {
    setTimeout(() => {
        $(html).find(".automated-damage-button").click(window.PTUAutoFight.ApplyDamage);
    }, 1000);
});
Hooks.on("renderFormApplication",(form, html, data) => {
    setTimeout(() => {
		// console.log("renderFormApplication form:");
		// console.log(form);
		// console.log("renderFormApplication html:");
		// console.log(html);
		// console.log("renderFormApplication data:");
		// console.log(data);
        $(html).find(".pokedex-top-camera").click(window.PTUAutoFight.PokedexScanButton);
    }, 1000);
});