import { PTUAutoFight } from "./code.js";

Hooks.once("init", () => {
	console.log("init module");
});
Hooks.on("ready", () => {
	// Initialize 
	console.log("hook test 1");
	window.PTUAutoFight = PTUAutoFight();
});
Hooks.on("renderChatMessage", (message, html, data) => {
    setTimeout(() => {
        $(html).find(".automated-damage-button").click(window.PTUAutoFight.ApplyDamage);
    }, 1000);
});
