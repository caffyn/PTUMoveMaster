import { PTUAutoFight } from "./code.js";
const AlternateIconPath = "modules/PTUMoveMaster/images/icons/";

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
    setTimeout( async () => {
		// console.log("renderFormApplication form:");
		// console.log(form);
		// console.log("renderFormApplication html:");
		// console.log(html);
		// console.log("renderFormApplication data:");
		// console.log(data);

		let bag_directory = "player_bags/default/";

		if(game.canvas.tokens.controlled[0])
		{
			let current_actor = game.canvas.tokens.controlled[0].actor;
			if (FilePicker.browse("data", "player_bags/"))
			{
				try
				{
					await FilePicker.browse("data", ("player_bags/"+current_actor.name.replace(/ /g,'')+"/") );
					bag_directory = ("player_bags/"+current_actor.name.replace(/ /g,'')+"/");
				}
				catch(err)
				{
					bag_directory = "player_bags/default/";
				}
			}
		}

        $(".pokedex-top-camera").click(window.PTUAutoFight.PokedexScanButton);

		$(".skillsMenu").hover(function()
		{
			$(".menu-button-hover-image").attr("src", bag_directory+"skills.png");

		}, function()
		{
			$(".menu-button-hover-image").attr("src", bag_directory+"closed.png");
		});

		$(".struggleMenu").hover(function()
		{
			$(".menu-button-hover-image").attr("src", bag_directory+"struggles.png");

		}, function()
		{
			$(".menu-button-hover-image").attr("src", bag_directory+"closed.png");
		});

		$(".maneuverMenu").hover(function()
		{
			$(".menu-button-hover-image").attr("src", bag_directory+"maneuvers.png");

		}, function()
		{
			$(".menu-button-hover-image").attr("src", bag_directory+"closed.png");
		});

		$(".itemMenu").hover(function()
		{
			$(".menu-button-hover-image").attr("src", bag_directory+"items.png");

		}, function()
		{
			$(".menu-button-hover-image").attr("src", bag_directory+"closed.png");
		});

		$(".pokeballMenu").hover(function()
		{
			$(".menu-button-hover-image").attr("src", bag_directory+"pokeballs.png");

		}, function()
		{
			$(".menu-button-hover-image").attr("src", bag_directory+"closed.png");
		});

		$(".trainerMenu").hover(function()
		{
			$(".menu-button-hover-image").attr("src", bag_directory+"closed.png");

		}, function()
		{
			$(".menu-button-hover-image").attr("src", bag_directory+"closed.png");
		});


    }, 500);
});