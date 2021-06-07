
import { MoveMasterBonusDamageOptions } from './MoveMasterBonusDamageForm.js'
import { MoveMasterRestHoursOptions } from './MoveMasterRestHoursForm.js'
import { MoveMasterBonusDamageReductionOptions } from './MoveMasterBonusDamageReductionForm.js'
import { SidebarForm } from './forms/sidebar-form.js'

/* -------------------------------------------- */
/*  Module Setting Initialization               */
/* -------------------------------------------- */

function _loadModuleSettings() {
	game.settings.register("PTUMoveMaster", "autoApplyInjuries", {
	  name: "GM Setting: Automatically Apply Injuries",
	  hint: "",
	  scope: "world",
	  config: true,
	  type: String,
	  choices: {
		"true": "Automatically Apply Injuries Upon Applying Damage",
		"false": "Don't Automatically Apply Injuries"
	  },
	  default: "true"
	});

	game.settings.register("PTUMoveMaster", "showEffectiveness", {
		name: "GM Setting: Show move effectiveness on current target",
		hint: "",
		scope: "world",
		config: true,
		type: String,
		choices: {
		  "never": "Never",
		  "always": "Always",
		  "neutralOrBetter": "Only on neutral or better targets",
		},
		default: "neutralOrBetter"
	  });

	game.settings.register("PTUMoveMaster", "showEffectivenessText", {
		name: "Player Setting: Show Effectiveness as Text",
		hint: "",
		scope: "client",
		config: true,
		type: String,
		choices: {
		  "true": "Show Effectiveness as Text",
		  "false": "Show Effectiveness as Color Only"
		},
		default: "true"
	  });

	game.settings.register("PTUMoveMaster", "alwaysDisplayTokenNames", {
		name: "GM Setting: Always Display Token Names",
		hint: "Always set tokens to display their name to everyone when they're dragged out.",
		scope: "world",
		config: true,
		type: Boolean,
		default: true
	});

	game.settings.register("PTUMoveMaster", "alwaysDisplayTokenHealth", {
		name: "GM Setting: Always Display Token Health",
		hint: "Always set tokens to display their health as a bar to everyone when they're dragged out.",
		scope: "world",
		config: true,
		type: Boolean,
		default: true
	});

	game.settings.register("PTUMoveMaster", "alwaysDisplayTokenNature", {
		name: "GM Setting: Always Display Token Nature in names.",
		hint: "Always set tokens to display their nature, as an appendation to their names, to everyone when they're dragged out.",
		scope: "world",
		config: true,
		type: Boolean,
		default: true
	});

	game.settings.register("PTUMoveMaster", "pokepsychologistCanReplaceCommand", {
		name: "GM Setting: Pokepsychologist allows replacing Command with Pokemon Education for Loyalty checks.",
		hint: "As written, Pokepsychologist is relatively worthless, and technically does not allow for one of the uses a casual reading of it might imply. This homebrew option allows trainers with Pokepsychologist to use Pokemon Education in place of Command for Loyalty checks.",
		scope: "world",
		config: true,
		type: Boolean,
		default: false
	});

	game.settings.register("PTUMoveMaster", "autoResetStagesOnCombatEnd", {
		name: "GM Setting: Automatically reset stages when ending an encounter.",
		hint: "This will offer an option to make all combatants reset their combat stages and EOT/Scene moves when you end an encounter.",
		scope: "world",
		config: true,
		type: Boolean,
		default: false
	});

	game.settings.register("PTUMoveMaster", "usePokeballAnimationOnDragOut", {
		name: "GM Setting: Use an animated pokeball effect when dragging an owned pokemon onto a field with their trainer present.",
		hint: "Disable this if you are having problems with the effects.",
		scope: "world",
		config: true,
		type: Boolean,
		default: true
	});

	game.settings.register("PTUMoveMaster", "useAlternateChatStyling", {
		name: "Player Setting: Styles the chat to have (what I think is) a more readable font, compact size, and low-contrast look.",
		hint: "Disable this if you are having compatibility issues with the chat pane styling, or if you just don't like it.",
		scope: "client",
		config: true,
		type: Boolean,
		default: true
	});

	game.settings.register("PTUMoveMaster", "currentWeather", {
		name: "Current Weather",
		hint: "This is usually set via internal scripts, but it's exposed here if you need to change it manually.",
		scope: "world",
		config: true,
		type: String,
		choices: {
		  "Clear": "Clear Weather is the default weather, conferring no innate bonuses or penalties of any sort.",
		  "Sunny": "While Sunny, Fire-Type Attacks gain a +5 bonus to Damage Rolls, and Water-Type Attacks suffer a -5 Damage penalty.",
		  "Rainy": "While Rainy, Water-Type Attacks gain a +5 bonus to Damage Rolls, and Fire-Type Attacks suffer a -5 Damage penalty.",
		  "Hail": "While it is Hailing, all non-Ice Type Pokémon lose a Tick of Hit Points at the beginning of their turn.",
		  "Sandstorm": "While it is Sandstorming, all non-Ground, Rock, or Steel Type Pokémon lose a Tick of Hit Points at the beginning of their turn.",
		},
		default: "Clear"
	  });

	// game.settings.register("PTUMoveMaster", "useErrataConditions", {
	// 	name: "GM Setting: This determines whether to use the original condition rules, or the errata'd versions.",
	// 	hint: "",
	// 	scope: "world",
	// 	config: true,
	// 	type: String,
	// 	choices: {
	// 	  "Original": "Use the original condition effects.",
	// 	  "Errata": "Use the errata'd condition effects."
	// 	},
	// 	default: "Original"
	// });

	game.settings.register("PTUMoveMaster", "autoSkipTurns", {
		name: "GM Setting: Auto-skip turns when no actions possible, due to failing certain saves or being fainted.",
		hint: "Disable this if you are a coward. (Or if you want to manually advance turns all the time)",
		scope: "world",
		config: true,
		type: Boolean,
		default: true
	});

	game.settings.register("PTUMoveMaster", "hideConfettiButton", {
		name: "Player Setting: Hides the Confetti button.",
		hint: "Disable this if you have a reason to manually trigger confetti blasts.",
		scope: "client",
		config: true,
		type: Boolean,
		default: true
	});

	game.settings.register("PTUMoveMaster", "useExtraActionHomebrew", {
		name: "GM Setting: Use Kindled Embers' Extra Action homebrew.",
		hint: "Enable this to give each actor an extra standard action per turn that cannot be used for directly damaging moves (physical, special), nor to repeat the same standard action twice in the same turn. The intent of this change is to diversify action choice and provide more reasons for some of the less popular moves or maneuvers to be used.",
		scope: "world",
		config: true,
		type: Boolean,
		default: false
	});
} 

var MoveMasterSidebar = {};

Hooks.once('init', async function() 
{
	_loadModuleSettings();
	game.PTUMoveMaster = {
		PTUAutoFight,
		RollDamageMove,
		MoveMasterBonusDamageOptions,
		MoveMasterBonusDamageReductionOptions,
		MoveMasterRestHoursOptions,
		sendMoveMessage,
		chatMessage,
		adjustActorStage,
		healActorPercent,
		healActor,
		setActorHealth,
		setActorHealthPercent,
		damageActorPercent,
		CalculateAcRoll,
		PerformFullAttack,
		GetDiceResult,
		CalculateDmgRoll,
		sendMoveRollMessage,
		ApplyInjuries,
		GetSoundDirectory,
		CreatePokeballButtonList,
		ThrowPokeball,
		PokedexScan,
		CreateStatusMoveButtonList,
		CreateDamageMoveButtonList,
		PokeballRelease,
		SpeakPokemonName,
		TakeAction,
		ShowPokeballMenu,
		ShowStruggleMenu,
		ShowManeuverMenu,
		ShowInventoryMenu,
		UseInventoryItem,
		GetItemArt,
		GetTargetTypingHeader,
		cureActorAffliction,
		ResetStagesToDefault,
		ThisPokemonsTrainerCommandCheck,
		GetCurrentWeather,
		damageActorTick,
		damageActorFlatValue,
		healActorTick,
		healActorRest,
		healActorRestPrompt,
		SetCurrentWeather,
		RollSkillCheck,
		ResetActionEconomy,
		GetActorActionIcon,
		GetRangeIcons,
		ShowSkillsMenu,
		resetDailyMoves,
		resetSceneMoves,
		resetEOTMoves,
		resetStandardAction,
		resetShiftAction,
		resetSwiftAction,
		enableCondition,
		applyDamageWithBonus: applyDamageWithBonusDR,
		SidebarForm,
		MoveMasterSidebar
	};

	Handlebars.registerHelper('ifeq', function (a, b, options) {
		if (a == b) { return options.fn(this); }
		return options.inverse(this);
	});
	
	Handlebars.registerHelper('ifnoteq', function (a, b, options) {
		if (a != b) { return options.fn(this); }
		return options.inverse(this);
	});

	Handlebars.registerHelper('ifincludes', function (a, b, options) {
		if (a.includes(b)) { return options.fn(this); }
		return options.inverse(this);
	});

	if(game.settings.get("PTUMoveMaster", "hideConfettiButton"))
	{
		console.log("Hiding Confetti");
		$("body").addClass('confetti-hidden');
	}
	else
	{
		console.log("Un-Hiding Confetti");
		$("body").removeClass('confetti-hidden');
	}

	// game.ptu.disableCombatAutomation = true;
	// if(game.ptu.combats?.size > 0) 
	// {
	// 	for(let combat of game.ptu.combats.values()) combat.destroy(false)
	// }
	
});

Hooks.on("ready", async () => {
	if(game.settings.get("PTUMoveMaster", "hideConfettiButton"))
	{
		console.log("Hiding Confetti");
		$("body").addClass('confetti-hidden');
	}
	else
	{
		console.log("Un-Hiding Confetti");
		$("body").removeClass('confetti-hidden');
	}

	loadTemplates(["./modules/PTUMoveMaster/move-combined.hbs"]);

	if(game.settings.get("PTUMoveMaster", "useAlternateChatStyling"))
	{
		$("body").addClass('messages-dark-theme');
		$("#combat-carousel.wrapper").addClass('dark-theme');
		$("#sidebar").addClass('dark-theme');
		$("#sidebar-tabs").addClass('dark-theme');
		$("#chat-log").addClass('dark-theme');
	}
	else
	{
		$("body").removeClass('messages-dark-theme');
		$("#combat-carousel.wrapper").removeClass('dark-theme');
		$("#sidebar").removeClass('dark-theme');
		$("#sidebar-tabs").removeClass('dark-theme');
		$("#chat-log").removeClass('dark-theme');
	}

	// eval('game.PTUMoveMaster.MoveMasterSidebar.'+game.user.data._id+' = new game.PTUMoveMaster.SidebarForm({ classes: "ptu-sidebar"})');
	// eval('game.PTUMoveMaster.MoveMasterSidebar.'+game.user.data._id+'.render(true)');
	ui.sidebar.render();
});

Hooks.on("endTurn", async (combat, actor, round_and_turn, diff, id) => {

	console.log("endTurn: actor");
	console.log(actor);
	let current_actor = game.actors.get(actor.data.actorId);

	// if(current_actor.data.flags.ptu.actions_taken.standard || current_actor.data.flags.ptu.actions_taken.support)
	// {
	// 	let actor_has_Magic_Guard = false;
	// 	for(let item of current_actor.data.items)
	// 	{
	// 		if(item.name == "Magic Guard")
	// 		{
	// 			actor_has_Magic_Guard = true;
	// 			break;
	// 		}
	// 	}

	// 	let actorInjuries = current_actor.data.data.health.injuries;

	// 	if(actorInjuries >=5)
	// 	{
	// 		game.PTUMoveMaster.chatMessage(current_actor, current_actor.name + ' took a standard action while they have '+ actorInjuries +' injuries - they take '+actorInjuries+' damage!');
	// 		current_actor.modifyTokenAttribute("health", (-actorInjuries), true, true);
	// 		game.PTUMoveMaster.ApplyInjuries(current_actor, actorInjuries);
	// 	}

	// 	let actor_active_effects = current_actor.effects;
	// 	console.log("actor_active_effects");
	// 	console.log(actor_active_effects);

	// 	if (current_actor.data.flags.ptu)
	// 	{
	// 		if (current_actor.data.flags.ptu.is_badly_poisoned)
	// 		{
	// 			let round_of_badly_poisoned = 0;

	// 			for(let active_effect of actor_active_effects)
	// 			{
	// 				console.log("active_effect");
	// 				console.log(active_effect);

	// 				if(active_effect.data.changes[1])
	// 				{
	// 					if(active_effect.data.changes[1].key == "flags.ptu.is_badly_poisoned")
	// 					{
	// 						console.log('active_effect.getFlag("ptu", "roundsElapsed")');
	// 						console.log(active_effect.getFlag("ptu", "roundsElapsed"));

	// 						round_of_badly_poisoned = active_effect.getFlag("ptu", "roundsElapsed");									
	// 						console.log("round_of_badly_poisoned");
	// 						console.log(round_of_badly_poisoned);

	// 						break;
	// 					}
	// 				}
	// 			}

	// 			let badly_poisoned_damage = 5*(2**round_of_badly_poisoned);

	// 			game.PTUMoveMaster.damageActorFlatValue(current_actor, badly_poisoned_damage, ("round "+Number(round_of_badly_poisoned+1)+" of Badly Poisoned"));
	// 		}
	// 		else if(current_actor.data.flags.ptu.is_poisoned)
	// 		// if(current_actor.data.flags.ptu.is_poisoned)
	// 		{
	// 			if(actor_has_Magic_Guard)
	// 			{
	// 				game.PTUMoveMaster.chatMessage(current_actor, current_actor.name+"'s Magic Guard prevents damage from Poisoned!");
	// 			}
	// 			else
	// 			{
	// 				game.PTUMoveMaster.damageActorTick(current_actor, "Poisoned");
	// 			}
	// 		}

	// 		if(current_actor.data.flags.ptu.is_burned)
	// 		{
	// 			if(actor_has_Magic_Guard)
	// 			{
	// 				game.PTUMoveMaster.chatMessage(current_actor, current_actor.name+"'s Magic Guard prevents damage from Burned!");
	// 			}
	// 			else
	// 			{
	// 				game.PTUMoveMaster.damageActorTick(current_actor, "Burned");
	// 			}
	// 		}
	// 	}
	// }

	await game.PTUMoveMaster.ResetActionEconomy(current_actor);
});


Hooks.on("preDeleteCombat", (combat, misc, tokenID) => {
    if( (game.user.isGM) && (game.settings.get("PTUMoveMaster", "autoResetStagesOnCombatEnd")) )
    {
	let volatile_conditions = ["Flinch", "Sleep", "Cursed", "Confused", "Disabled", "Infatuation", "Rage", "BadSleep", "Suppressed", "Fainted"];

      Dialog.confirm({
        title: "End Scene?",
        content: "Do you wish to end the Scene as well as the combat? This will reset combat stages, refresh per-scene and EOT cooldowns, and end volatile conditions for all combatants.",
        yes: async () => {
          let combatants = combat.data.combatants;
		  let current_actor;
          for(let combatant of combatants)
          {
			current_actor = game.actors.get(combatant.actor.id);
			console.log("END OF SCENE: __________ current_actor");
			console.log(current_actor);


            await game.PTUMoveMaster.ResetStagesToDefault(current_actor, true);
			await game.PTUMoveMaster.ResetActionEconomy(current_actor);
            await game.PTUMoveMaster.resetEOTMoves(current_actor, true);
			await game.PTUMoveMaster.resetSceneMoves(current_actor, true);

			for(let affliction of volatile_conditions)
			{
				await game.PTUMoveMaster.cureActorAffliction(current_actor, affliction);
			}

          }
		  AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"Stat%20Fall%20Down.mp3", volume: 0.5, autoplay: true, loop: false}, true);
        },
        defaultYes: false 
      })
    }
});


Hooks.on("closeSettingsConfig", async (ExtendedSettingsConfig, S) => {

	if(game.settings.get("PTUMoveMaster", "useAlternateChatStyling"))
	{
		$("body").addClass('messages-dark-theme');
		$("#combat-carousel.wrapper").addClass('dark-theme');
		$("#sidebar").addClass('dark-theme');
		$("#sidebar-tabs").addClass('dark-theme');
		$("#chat-log").addClass('dark-theme');
	}
	else
	{
		$("body").removeClass('messages-dark-theme');
		$("#combat-carousel.wrapper").removeClass('dark-theme');
		$("#sidebar").removeClass('dark-theme');
		$("#sidebar-tabs").removeClass('dark-theme');
		$("#chat-log").removeClass('dark-theme');
	}

	if(game.settings.get("PTUMoveMaster", "hideConfettiButton"))
	{
		console.log("Hiding Confetti");
		$("body").addClass('confetti-hidden');
	}
	else
	{
		console.log("Un-Hiding Confetti");
		$("body").removeClass('confetti-hidden');
	}

	ui.sidebar.render();
	game.PTUMoveMaster.MoveMasterSidebar = new game.PTUMoveMaster.SidebarForm({ classes: "ptu-sidebar"});
	game.PTUMoveMaster.MoveMasterSidebar.render(true);

});

Hooks.on("renderChatMessage", (message, html, data) => {
    setTimeout(() => {
		$(html).find(".skill-button-1").click("click", function(){game.PTUMoveMaster.RollSkillCheck(
			this.dataset.skill
		)});
		$(html).find(".skill-button-2").click("click", function(){game.PTUMoveMaster.RollSkillCheck(
			this.dataset.skill
		)});
    }, 1000);
});

Hooks.on("updateCombat", async (combat, update, options, userId) => {

	console.log("updateCombat: userId: " + userId);
	console.log("game.user.data._id:");
	console.log(game.user.data._id);

	console.log("combat:");
	console.log(combat);


	if(userId != game.user.data._id)
	{
		console.log("updateCombat: Not the right user! Returning.")
		return;
	}
	console.log("updateCombat: The right user! Proceeding.")

	let this_round = combat.current.round;
	let this_turn = combat.current.turn;
	let previous_round = combat.previous.round;
	let previous_turn = combat.previous.turn;

	console.log("previous_round:");
	console.log(previous_round);
	console.log("this_round:");
	console.log(this_round);

	console.log("previous_turn:");
	console.log(previous_turn);
	console.log("this_turn:");
	console.log(this_turn);

	if( (this_turn != (previous_turn+1)) && (this_round != (previous_round+1)) )
	{
		console.log("updateCombat: Not the turn/round after the previous one! Returning.")
		return;
	}

	let current_token = game.combat.current.tokenId;
	console.log("updateCombat current_token");
	console.log(current_token);

	let current_actor = canvas.tokens.get(current_token).actor;
	let current_token_species = current_actor.data.data.species;
	let currentWeather = await game.PTUMoveMaster.GetCurrentWeather();
	let actor_type_1 = "Untyped";
	let actor_type_2 = "Untyped";

	let actor_has_Magic_Guard = false;
	for(let item of current_actor.data.items)
	{
		if(item.name == "Magic Guard")
		{
			actor_has_Magic_Guard = true;
			break;
		}
	}

	
	if( (this_turn == 0) && (this_round == (previous_round+1)) )
	{
		console.log("-------- NEW ROUND TRIGGER ---------");
		for(let combatant of game.combat.combatants)
		{
			let this_actor = combatant.actor;

			for(let effect of this_actor.effects)
			{
				await effect.setFlag("ptu", "roundsElapsed", Number(effect.getFlag("ptu", "roundsElapsed"))+1);
			}
		}
	}
	
	console.log("-------- NEW TURN TRIGGER ---------");

	// await game.PTUMoveMaster.ResetActionEconomy(current_actor); // TODO: Move this to turn end

	let queue_turn_skip = false;
	if(current_actor.data.flags.ptu)
	{
		// let condition_version = game.settings.get("PTUMoveMaster", "useErrataConditions");

		// if(condition_version == "Original")
		// {

		// 	if(current_actor.data.flags.ptu.is_paralyzed)
		// 	{
		// 		setTimeout(() => {  
		// 			let numDice=1;
		// 			let dieSize = "d20";
		// 			let paralyzed_DC = 5;
		// 			let save_roll_modifier = current_actor.data.data.modifiers.saveChecks.total;

		// 			let roll= new Roll(`${numDice}${dieSize}+${save_roll_modifier}`).roll()
		// 			roll.toMessage({flavor: `${current_actor.name} attempts a save check vs DC ${paralyzed_DC} to resist the paralyzed condition at the beginning of their turn...`,
		// 			speaker: ChatMessage.getSpeaker({token: current_actor}),});

		// 			setTimeout(() => {  
		// 				if(Number(roll._total) < paralyzed_DC)
		// 				{
		// 					AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"warning.wav", volume: 0.5, autoplay: true, loop: false}, true);
		// 					game.PTUMoveMaster.chatMessage(current_actor, current_actor.name+" failed their save against Paralysis and cannot take any Standard, Shift, or Swift Actions this turn - automatically skipping to next turn.");
		// 					game.PTUMoveMaster.TakeAction(current_actor, "Standard");
		// 					queue_turn_skip = true;
		// 				}
		// 				else
		// 				{
		// 					AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+heal_sound_file, volume: 0.8, autoplay: true, loop: false}, true);
		// 					game.PTUMoveMaster.chatMessage(current_actor, current_actor.name+" succeeded their save against Paralysis and may act normally!");
		// 				}
		// 			}, 500);
		// 		}, 750);
		// 	}

		// 	if(current_actor.data.flags.ptu.is_frozen)
		// 	{
		// 		setTimeout(() => {  
		// 			let numDice=1;
		// 			let dieSize = "d20";
		// 			let weather_modifier = 0;

		// 			if(currentWeather == "Sunny")
		// 			{
		// 				weather_modifier = 4;
		// 			}
		// 			else if (currentWeather == "Hail")
		// 			{
		// 				weather_modifier = -2;
		// 			}

		// 			let save_roll_modifier = Number(current_actor.data.data.modifiers.saveChecks.total + weather_modifier);
		// 			let frozen_DC = 16;
		// 			if(current_actor.data.data.typing)
		// 			{
		// 				if(current_actor.data.data.typing[0] == "Fire" || current_actor.data.data.typing[1] == "Fire")
		// 				{
		// 					frozen_DC = 11;
		// 				}
		// 			}
					
		// 			let roll= new Roll(`${numDice}${dieSize}+${save_roll_modifier}`).roll()
		// 			roll.toMessage({flavor: `${current_actor.name} attempts a save check vs DC ${frozen_DC} to break free from the frozen condition at the end of their turn...`,
		// 				speaker: ChatMessage.getSpeaker({token: current_actor}),});

		// 			setTimeout(() => {  
		// 				if(Number(roll._total) < frozen_DC)
		// 				{
		// 					AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"warning.wav", volume: 0.5, autoplay: true, loop: false}, true);
		// 					game.PTUMoveMaster.chatMessage(current_actor, current_actor.name+" failed their save against Frozen and remains frozen - automatically skipping to next turn.");
		// 					game.PTUMoveMaster.TakeAction(current_actor, "Standard");
		// 					queue_turn_skip = true;
		// 				}
		// 				else
		// 				{
		// 					AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+heal_sound_file, volume: 0.8, autoplay: true, loop: false}, true);
		// 					game.PTUMoveMaster.chatMessage(current_actor, current_actor.name+" succeeded their save against Frozen and broke free! Automatically skipping to next turn.");
		// 					game.PTUMoveMaster.TakeAction(current_actor, "Standard");

		// 					for(let effect of current_actor.effects)
		// 					{
		// 						if(effect.data.label == "Frozen")
		// 						{
		// 							effect.delete();
		// 							break;
		// 						}
		// 					}
		// 					queue_turn_skip = true;
		// 				}
		// 			}, 750);
		// 		}, 750);
		// 	}

		// 	if(current_actor.data.flags.ptu.is_sleeping)
		// 	{
		// 		setTimeout(() => {  
		// 			let numDice=1;
		// 			let dieSize = "d20";

		// 			let save_roll_modifier = Number(current_actor.data.data.modifiers.saveChecks.total);
		// 			let sleep_DC = 16;
					
		// 			let roll= new Roll(`${numDice}${dieSize}+${save_roll_modifier}`).roll()

		// 			if(current_actor.data.flags.ptu.is_badly_sleeping)
		// 			{
		// 				if(actor_has_Magic_Guard)
		// 				{
		// 					game.PTUMoveMaster.chatMessage(current_actor, current_actor.name+"'s Magic Guard prevents damage from Bad Sleep!");
		// 				}
		// 				else
		// 				{
		// 					game.PTUMoveMaster.damageActorTick(current_actor, "Bad Sleep", 2);
		// 				}
		// 			}

		// 			roll.toMessage({flavor: `${current_actor.name} attempts a save check vs DC ${sleep_DC} to wake up from the sleeping condition at the end of their turn...`,
		// 				speaker: ChatMessage.getSpeaker({token: current_actor}),});

		// 			setTimeout(() => {  
		// 				if(Number(roll._total) < sleep_DC)
		// 				{
		// 					AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"warning.wav", volume: 0.5, autoplay: true, loop: false}, true);
		// 					game.PTUMoveMaster.chatMessage(current_actor, current_actor.name+" failed their save against Sleep and remains asleep - automatically skipping to next turn.");
		// 					game.PTUMoveMaster.TakeAction(current_actor, "Standard");
		// 					queue_turn_skip = true;
		// 				}
		// 				else
		// 				{
		// 					AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+heal_sound_file, volume: 0.8, autoplay: true, loop: false}, true);
		// 					game.PTUMoveMaster.chatMessage(current_actor, current_actor.name+" succeeded their save against Sleep and woke up! Automatically skipping to next turn.");
		// 					game.PTUMoveMaster.TakeAction(current_actor, "Standard");

		// 					for(let effect of current_actor.effects)
		// 					{
		// 						if(effect.data.label == "Sleep")
		// 						{
		// 							effect.delete();
		// 							break;
		// 						}
		// 					}
		// 					for(let effect of current_actor.effects)
		// 					{
		// 						if(effect.data.label == "BadSleep")
		// 						{
		// 							effect.delete();
		// 							break;
		// 						}
		// 					}
		// 					queue_turn_skip = true;
		// 				}
		// 			}, 750);
		// 		}, 750);
		// 	}

		// 	if(current_actor.data.flags.ptu.is_confused)
		// 	{
		// 		setTimeout(() => {  
		// 			let numDice=1;
		// 			let dieSize = "d20";
		// 			let confused_normal_action_DC = 9;
		// 			let confused_cured_DC = 16;
		// 			let save_roll_modifier = current_actor.data.data.modifiers.saveChecks.total;

		// 			let roll= new Roll(`${numDice}${dieSize}+${save_roll_modifier}`).roll()
		// 			roll.toMessage({flavor: `${current_actor.name} attempts a save check vs DC ${confused_normal_action_DC} to resist the confused condition (or DC ${confused_cured_DC} to cure it) at the beginning of their turn...`,
		// 			speaker: ChatMessage.getSpeaker({token: current_actor}),});

		// 			setTimeout(() => {  
		// 				if(Number(roll._total) >= confused_cured_DC)
		// 				{
		// 					AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+heal_sound_file, volume: 0.8, autoplay: true, loop: false}, true);
		// 					game.PTUMoveMaster.chatMessage(current_actor, current_actor.name+" succeeded their save to cure their Confusion and may act normally!");

		// 					for(let effect of current_actor.effects)
		// 					{
		// 						if(effect.data.label == "Confused")
		// 						{
		// 							effect.delete();
		// 							break;
		// 						}
		// 					}
		// 				}
		// 				else if(Number(roll._total) >= confused_normal_action_DC)
		// 				{
		// 					AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+heal_sound_file, volume: 0.8, autoplay: true, loop: false}, true);
		// 					game.PTUMoveMaster.chatMessage(current_actor, current_actor.name+" succeeded their save against Confusion and may act normally!");
		// 				}
		// 				else
		// 				{
		// 					AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"warning.wav", volume: 0.5, autoplay: true, loop: false}, true);
		// 					game.PTUMoveMaster.chatMessage(current_actor, current_actor.name+" failed their save against Confusion and hit themselves using a Typeless Physical Struggle Attack as a Standard Action and may take no other actions this turn. This attack automatically hits, and deals damage as if it’s resisted 1 Step. Automatically skipping to next turn.");
		// 					game.PTUMoveMaster.TakeAction(current_actor, "Standard");

		// 					// TODO: Struggle self, resisted 1 step

		// 					queue_turn_skip = true;
		// 				}
		// 			}, 500);
		// 		}, 750);
		// 	}

		// 	if(current_actor.data.flags.ptu.is_infatuated)
		// 	{
		// 		setTimeout(() => {  
		// 			let numDice=1;
		// 			let dieSize = "d20";
		// 			let infatuated_normal_action_DC = 11;
		// 			let infatuated_cured_DC = 19;
		// 			let save_roll_modifier = current_actor.data.data.modifiers.saveChecks.total;

		// 			let roll= new Roll(`${numDice}${dieSize}+${save_roll_modifier}`).roll()
		// 			roll.toMessage({flavor: `${current_actor.name} attempts a save check vs DC ${infatuated_normal_action_DC} to resist the Infatuated condition (or DC ${infatuated_cured_DC} to cure it) at the beginning of their turn...`,
		// 			speaker: ChatMessage.getSpeaker({token: current_actor}),});

		// 			setTimeout(() => {  
		// 				if(Number(roll._total) >= infatuated_cured_DC)
		// 				{
		// 					AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+heal_sound_file, volume: 0.8, autoplay: true, loop: false}, true);
		// 					game.PTUMoveMaster.chatMessage(current_actor, current_actor.name+" succeeded their save to cure their Infatuation and may act normally!");

		// 					for(let effect of current_actor.effects)
		// 					{
		// 						if(effect.data.label == "Infatuation")
		// 						{
		// 							effect.delete();
		// 							break;
		// 						}
		// 					}
		// 				}
		// 				else if(Number(roll._total) >= infatuated_normal_action_DC)
		// 				{
		// 					AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+heal_sound_file, volume: 0.8, autoplay: true, loop: false}, true);
		// 					game.PTUMoveMaster.chatMessage(current_actor, current_actor.name+" succeeded their save against Infatuation and may act normally!");
		// 				}
		// 				else
		// 				{
		// 					AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"warning.wav", volume: 0.5, autoplay: true, loop: false}, true);
		// 					game.PTUMoveMaster.chatMessage(current_actor, current_actor.name+" failed their save against Infatuation and may not target the Pokémon or Trainer that they are Infatuated towards with a Move or Attack, but may otherwise Shift and use actions normally.");
		// 				}
		// 			}, 500);
		// 		}, 750);
		// 	}

		// 	if(current_actor.data.flags.ptu.is_fainted)
		// 	{
		// 		setTimeout(() => {  
		// 			if(game.settings.get("PTUMoveMaster", "autoSkipTurns"))
		// 			{
		// 				// AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"warning.wav", volume: 0.5, autoplay: true, loop: false}, true);
		// 				game.PTUMoveMaster.chatMessage(current_actor, current_actor.name+" is fainted - automatically skipping to next turn.");
		// 				game.combat.nextTurn();
		// 			}
		// 		}, 100);
		// 	}

		// 	// TODO: Cursed: If a Cursed Target takes a Standard Action, they lose two ticks of Hit Points at the end of that turn.

		// 	// TODO: Rage: While enraged, the target must use a Damaging Physical or Special Move or Struggle Attack. At the end of each turn, roll a DC15 Save Check; if they succeed, they are cured of Rage.

		// 	// TODO: Flinch: (Actually, probably use the homebrew one the system assumes) You may not take actions during your next turn that round. The Flinched Status does not carry over onto the next round.

		// 	setTimeout(() => {
		// 		if(queue_turn_skip)
		// 		{
		// 			if(game.settings.get("PTUMoveMaster", "autoSkipTurns"))
		// 			{
		// 				game.combat.nextTurn();
		// 			}
		// 		}
		// 	}, 2500);
		// }
		// else if (condition_version == "Errata")
		// {
		// 	if(current_actor.data.flags.ptu.is_paralyzed)
		// 	{
		// 		setTimeout(() => {  
		// 			let numDice=1;
		// 			let dieSize = "d20";
		// 			let paralyzed_DC = 11;
		// 			let save_roll_modifier = current_actor.data.data.modifiers.saveChecks.total;

		// 			let roll= new Roll(`${numDice}${dieSize}+${save_roll_modifier}`).roll()
		// 			roll.toMessage({flavor: `${current_actor.name} attempts a save check vs DC ${paralyzed_DC} to resist the paralyzed condition at the beginning of their turn...`,
		// 			speaker: ChatMessage.getSpeaker({token: current_actor}),});

		// 			setTimeout(() => {  
		// 				if(Number(roll._total) < paralyzed_DC)
		// 				{
		// 					AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"warning.wav", volume: 0.5, autoplay: true, loop: false}, true);
		// 					game.PTUMoveMaster.chatMessage(current_actor, current_actor.name+" failed their save against Paralysis and can only take a Standard OR Shift Action that round, but not both, is Vulnerable for 1 full round, and cannot take AOOs for 1 full round. (These effects are not automated.)");
		// 				}
		// 				else
		// 				{
		// 					AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+heal_sound_file, volume: 0.8, autoplay: true, loop: false}, true);
		// 					game.PTUMoveMaster.chatMessage(current_actor, current_actor.name+" succeeded their save against Paralysis and may act normally!");
		// 				}
		// 			}, 500);
		// 		}, 750);
		// 	}

		// 	if(current_actor.data.flags.ptu.is_frozen)
		// 	{
		// 		setTimeout(() => {  
		// 			let numDice=1;
		// 			let dieSize = "d20";
		// 			let weather_modifier = 0;

		// 			if(currentWeather == "Sunny")
		// 			{
		// 				weather_modifier = 4;
		// 			}
		// 			else if (currentWeather == "Hail")
		// 			{
		// 				weather_modifier = -2;
		// 			}

		// 			let save_roll_modifier = Number(current_actor.data.data.modifiers.saveChecks.total + weather_modifier);
		// 			let frozen_DC = 16;
		// 			if(current_actor.data.data.typing)
		// 			{
		// 				if(current_actor.data.data.typing[0] == "Fire" || current_actor.data.data.typing[1] == "Fire")
		// 				{
		// 					frozen_DC = 11;
		// 				}
		// 			}
					
		// 			let roll= new Roll(`${numDice}${dieSize}+${save_roll_modifier}`).roll()
		// 			roll.toMessage({flavor: `${current_actor.name} attempts a save check vs DC ${frozen_DC} to break free from the frozen condition at the end of their turn...`,
		// 				speaker: ChatMessage.getSpeaker({token: current_actor}),});

		// 			setTimeout(() => {  
		// 				if(Number(roll._total) < frozen_DC)
		// 				{
		// 					AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"warning.wav", volume: 0.5, autoplay: true, loop: false}, true);
		// 					game.PTUMoveMaster.chatMessage(current_actor, current_actor.name+" failed their save against Frozen and remains frozen - automatically skipping to next turn.");
		// 					game.PTUMoveMaster.TakeAction(current_actor, "Standard");
		// 					queue_turn_skip = true;
		// 				}
		// 				else
		// 				{
		// 					AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+heal_sound_file, volume: 0.8, autoplay: true, loop: false}, true);
		// 					game.PTUMoveMaster.chatMessage(current_actor, current_actor.name+" succeeded their save against Frozen and broke free! Automatically skipping to next turn.");
		// 					game.PTUMoveMaster.TakeAction(current_actor, "Standard");

		// 					for(let effect of current_actor.effects)
		// 					{
		// 						if(effect.data.label == "Frozen")
		// 						{
		// 							effect.delete();
		// 							break;
		// 						}
		// 					}
		// 					queue_turn_skip = true;
		// 				}
		// 			}, 750);
		// 		}, 750);
		// 	}

		// 	if(current_actor.data.flags.ptu.is_sleeping)
		// 	{
		// 		setTimeout(() => {  
		// 			let numDice=1;
		// 			let dieSize = "d20";

		// 			let save_roll_modifier = Number(current_actor.data.data.modifiers.saveChecks.total);
		// 			let sleep_DC = 16;
					
		// 			let roll= new Roll(`${numDice}${dieSize}+${save_roll_modifier}`).roll()

		// 			if(current_actor.data.flags.ptu.is_badly_sleeping)
		// 			{
		// 				if(actor_has_Magic_Guard)
		// 				{
		// 					game.PTUMoveMaster.chatMessage(current_actor, current_actor.name+"'s Magic Guard prevents damage from Bad Sleep!");
		// 				}
		// 				else
		// 				{
		// 					game.PTUMoveMaster.damageActorTick(current_actor, "Bad Sleep", 2);
		// 				}
		// 			}

		// 			roll.toMessage({flavor: `${current_actor.name} attempts a save check vs DC ${sleep_DC} to wake up from the sleeping condition at the end of their turn...`,
		// 				speaker: ChatMessage.getSpeaker({token: current_actor}),});

		// 			setTimeout(() => {  
		// 				if(Number(roll._total) < sleep_DC)
		// 				{
		// 					AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"warning.wav", volume: 0.5, autoplay: true, loop: false}, true);
		// 					game.PTUMoveMaster.chatMessage(current_actor, current_actor.name+" failed their save against Sleep and remains asleep - automatically skipping to next turn.");
		// 					game.PTUMoveMaster.TakeAction(current_actor, "Standard");
		// 					queue_turn_skip = true;
		// 				}
		// 				else
		// 				{
		// 					AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+heal_sound_file, volume: 0.8, autoplay: true, loop: false}, true);
		// 					game.PTUMoveMaster.chatMessage(current_actor, current_actor.name+" succeeded their save against Sleep and woke up! Automatically skipping to next turn.");
		// 					game.PTUMoveMaster.TakeAction(current_actor, "Standard");

		// 					for(let effect of current_actor.effects)
		// 					{
		// 						if(effect.data.label == "Sleep")
		// 						{
		// 							effect.delete();
		// 							break;
		// 						}
		// 					}
		// 					for(let effect of current_actor.effects)
		// 					{
		// 						if(effect.data.label == "BadSleep")
		// 						{
		// 							effect.delete();
		// 							break;
		// 						}
		// 					}
		// 					queue_turn_skip = true;
		// 				}
		// 			}, 750);
		// 		}, 750);
		// 	}

		// 	if(current_actor.data.flags.ptu.is_confused)
		// 	{
		// 		setTimeout(() => {  
		// 			let numDice=1;
		// 			let dieSize = "d20";
		// 			let confused_cured_DC = 16;
		// 			let save_roll_modifier = current_actor.data.data.modifiers.saveChecks.total;

		// 			let roll= new Roll(`${numDice}${dieSize}+${save_roll_modifier}`).roll()
		// 			roll.toMessage({flavor: `${current_actor.name} attempts a save check vs DC ${confused_cured_DC} to cure the confused condition at the end of their turn...`,
		// 			speaker: ChatMessage.getSpeaker({token: current_actor}),});

		// 			setTimeout(() => {  
		// 				if(Number(roll._total) >= confused_cured_DC)
		// 				{
		// 					AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+heal_sound_file, volume: 0.8, autoplay: true, loop: false}, true);
		// 					game.PTUMoveMaster.chatMessage(current_actor, current_actor.name+" succeeded their save to cure their Confusion at the end of their turn!");

		// 					for(let effect of current_actor.effects)
		// 					{
		// 						if(effect.data.label == "Confused")
		// 						{
		// 							effect.delete();
		// 							break;
		// 						}
		// 					}
		// 				}
		// 				else
		// 				{
		// 					AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"warning.wav", volume: 0.5, autoplay: true, loop: false}, true);
		// 					game.PTUMoveMaster.chatMessage(current_actor, current_actor.name+" failed their save against Confusion and remains confused.");
		// 				}
		// 			}, 500);
		// 		}, 750);
		// 	}

		// 	if(current_actor.data.flags.ptu.is_infatuated)
		// 	{
		// 		setTimeout(() => {  
		// 			let numDice=1;
		// 			let dieSize = "d20";
		// 			let infatuated_cured_DC = 16;
		// 			let save_roll_modifier = current_actor.data.data.modifiers.saveChecks.total;

		// 			let roll= new Roll(`${numDice}${dieSize}+${save_roll_modifier}`).roll()
		// 			roll.toMessage({flavor: `${current_actor.name} attempts a save check vs DC ${infatuated_cured_DC} to cure the Infatuated condition at the end of their turn...`,
		// 			speaker: ChatMessage.getSpeaker({token: current_actor}),});

		// 			setTimeout(() => {  
		// 				if(Number(roll._total) >= infatuated_cured_DC)
		// 				{
		// 					AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+heal_sound_file, volume: 0.8, autoplay: true, loop: false}, true);
		// 					game.PTUMoveMaster.chatMessage(current_actor, current_actor.name+" succeeded their save to cure their Infatuation at the end of their turn!");

		// 					for(let effect of current_actor.effects)
		// 					{
		// 						if(effect.data.label == "Infatuation")
		// 						{
		// 							effect.delete();
		// 							break;
		// 						}
		// 					}
		// 				}
		// 				else
		// 				{
		// 					AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"warning.wav", volume: 0.5, autoplay: true, loop: false}, true);
		// 					game.PTUMoveMaster.chatMessage(current_actor, current_actor.name+" failed their save against Infatuation and remains Infatuated. The creature that Infatuated the target becomes the target’s Crush. Infatuated targets take a -5 penalty on all Damage Rolls that do not include their Crush as a target. For determining Damage Rolls that do include their Crush as a target, the Infatuated target’s Attack and Special Attack are halved.");
		// 				}
		// 			}, 500);
		// 		}, 750);
		// 	}

	if(current_actor.data.flags.ptu.is_fainted)
	{
		setTimeout(() => {  
			if(game.settings.get("PTUMoveMaster", "autoSkipTurns"))
			{
				// AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"warning.wav", volume: 0.5, autoplay: true, loop: false}, true);
				game.PTUMoveMaster.chatMessage(current_actor, current_actor.name+" is fainted - automatically skipping to next turn.");
				game.combat.nextTurn();
			}
		}, 100);
	}

		// 	// TODO: Cursed: If a Cursed Target takes a Standard Action, they lose two ticks of Hit Points at the end of that turn.

		// 	// TODO: Rage: While enraged, the target must use a Damaging Physical or Special Move or Struggle Attack. At the end of each turn, roll a DC15 Save Check; if they succeed, they are cured of Rage.

		// 	// TODO: Flinch: (Actually, probably use the homebrew one the system assumes) You may not take actions during your next turn that round. The Flinched Status does not carry over onto the next round.

		// 	setTimeout(() => {
		// 		if(queue_turn_skip)
		// 		{
		// 			if(game.settings.get("PTUMoveMaster", "autoSkipTurns"))
		// 			{
		// 				game.combat.nextTurn();
		// 			}
		// 		}
		// 	}, 2500);
		// }
	}
	
	let not_fainted = true;
	if(current_actor.data.flags.ptu)
	{
		if(current_actor.data.flags.ptu.is_fainted)
		{
			not_fainted = false;
		}
	}

	if(current_token_species && not_fainted)
	{
		game.ptu.PlayPokemonCry(current_token_species);
	}

	if(current_actor.data.data.typing)
	{
		actor_type_1 = current_actor.data.data.typing[0];
		actor_type_2 = current_actor.data.data.typing[1];
	}

	setTimeout(() => {

		if(currentWeather == "Sandstorm")
		{
			if(actor_type_1 != "Ground" && actor_type_1 != "Rock" && actor_type_1 != "Steel" && actor_type_2 != "Ground" && actor_type_2 != "Rock" && actor_type_2 != "Steel" && !actor_has_Magic_Guard)
			{
				game.PTUMoveMaster.damageActorTick(current_actor, "Sandstorm");
			}
			else
			{
				game.PTUMoveMaster.chatMessage(current_actor, current_actor.name + ' is immune to the Sandstorm\'s effects!');
			}
		}

		if(currentWeather == "Hail")
		{
			if(actor_type_1 != "Ice" && actor_type_2 != "Ice" && !actor_has_Magic_Guard)
			{
				game.PTUMoveMaster.damageActorTick(current_actor, "Hail");
			}
			else
			{
				game.PTUMoveMaster.chatMessage(current_actor, current_actor.name + ' is immune to the Hail\'s effects!');
			}
		}

	}, 800);
	
});


// Hooks.on("preDeleteCombat", async (combat) => {

// 	if(game.settings.get("PTUMoveMaster", "autoResetStagesOnCombatEnd"))
// 	{
// 		let combatants = combat.data.combatants;
// 		for(let combatant of combatants)
// 		{
// 			await game.PTUMoveMaster.ResetStagesToDefault(combatant.actor);
// 		}
// 	}
// });


Hooks.on("controlToken", async (token, selected) => {
	if(selected)
	{
		// console.log("token");
		// console.log(token);

		// console.log("selected");
		// console.log(selected);

		let current_actor = game.actors.get(token.data.actorId);
		
		// console.log("current_actor:");
		// console.log(current_actor);

		PTUAutoFight().ChatWindow(current_actor);
		// PTUAutoFight().ChatWindow(token.actor);
	}
	else
	{
		game.PTUMoveMaster.MoveMasterSidebar = new game.PTUMoveMaster.SidebarForm({ classes: "ptu-sidebar"});
		game.PTUMoveMaster.MoveMasterSidebar.render(true);
	}
});


Hooks.on("targetToken", async (user, token, targeted) => {
	console.log("HOOK: targetToken, user.data");
	console.log(user.data);

	console.log("HOOK: targetToken, game.user");
	console.log(game.user);

	if(user.data._id == game.user.data._id)
	{
		let selected_token = canvas.tokens.controlled[0];
		if(selected_token)
		{
			let current_actor = game.actors.get(selected_token.data.actorId);
			PTUAutoFight().ChatWindow(current_actor);
		}
	}
});


Hooks.on("updateToken", async (token, change, diff, userid) => {

	console.log("HOOK: updateToken, game.combat");
	console.log(game.combat);

	console.log("HOOK: updateToken, game.user.id");
	console.log(game.user.id);

	console.log("HOOK: updateToken, userid");
	console.log(userid);

	if(game.combat && userid == game.user.id)
	{
		console.log("token");
		console.log(token);

		let current_actor = game.actors.get(token.data.actorId);
		// let current_actor = game.actors.get(token.actor.data.id);

		console.log("current_actor");
		console.log(current_actor);

		if(diff.diff)
		{
			if(change.x > 0 || change.y > 0)
			{
				game.PTUMoveMaster.TakeAction(current_actor, "Shift");
				setTimeout(() => { 
					PTUAutoFight().ChatWindow(current_actor);
				}, 1000);
			}
		}
	}
});


Hooks.on("createToken", (token, options, id) => { // If an owned Pokemon is dropped onto the field, play pokeball release sound, and create lightshow

	if(game.userId == id)
	{
		setTimeout(() => {
			
			let tokenData = token.data;
			let actor = game.actors.get(tokenData.actorId);
	
			function capitalizeFirstLetter(string) {
				return string[0].toUpperCase() + string.slice(1);
			}
	
			if(actor)
			{
				let target_token;
	
				if(tokenData.actorLink == false)
				{
					target_token = canvas.tokens.get(tokenData.id);//.slice(-1)[0]; // The thrown pokemon
				}
				else
				{
					target_token = game.actors.get(actor.id).getActiveTokens().slice(-1)[0]; // The thrown pokemon
				}

				let pokeball = "Basic Ball"
				if(actor.data.data.pokeball != "" && actor.data.data.pokeball != null)
				{
					pokeball = actor.data.data.pokeball;
				}
	
				let current_token_species = actor.name;
				if(actor.data.data.species)
				{
					current_token_species = capitalizeFirstLetter((actor.data.data.species).toLowerCase());
				}
				
				let current_token_nature = "";
				if(actor.data.data.nature && game.settings.get("PTUMoveMaster", "alwaysDisplayTokenNature"))
				{
					current_token_nature = capitalizeFirstLetter((actor.data.data.nature.value).toLowerCase())+" ";
				}
	
				if(actor.data.type == "pokemon" && (actor.data.data.owner != "0" && actor.data.data.owner != ""))
				{
					let trainer_actor = game.actors.get(actor.data.data.owner);
					let trainer_tokens = trainer_actor.getActiveTokens();
					let actor_token = trainer_tokens[0]; // The throwing trainer
	
					if(!actor_token)
					{
						game.ptu.PlayPokemonCry(current_token_species);	
						return;
					}
	
					let throwRange = trainer_actor.data.data.capabilities["Throwing Range"];
					let rangeToTarget = GetDistanceBetweenTokens(actor_token, tokenData);
	
					if(throwRange < rangeToTarget)
					{
						ui.notifications.warn(`Target square is ${rangeToTarget}m away, which is outside your ${throwRange}m throwing range!`);
						game.actors.get(actor.id).getActiveTokens().slice(-1)[0].delete(); // Delete the last (assumed to be latest, i.e. the one just dragged out) token
					}
					else
					{
						setTimeout(() => { game.ptu.PlayPokemonCry(current_token_species); }, 2000);
						
						if(game.settings.get("PTUMoveMaster", "usePokeballAnimationOnDragOut")){ target_token.update({"scale": (0.25/target_token.data.width)}); }
	
						ui.notifications.info(`Target square is ${rangeToTarget}m away, which is within your ${throwRange}m throwing range!`);
						AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"pokeball_sounds/"+"pokeball_miss.mp3", volume: 0.5, autoplay: true, loop: false}, true);
	
						let transitionType = 9;
						let targetImagePath = "/item_icons/"+pokeball+".png";
	
						let polymorphFilterId = "pokeball";
						let pokeball_polymorph_quick_params =
						[{
							filterType: "polymorph",
							filterId: polymorphFilterId,
							type: transitionType,
							padding: 70,
							magnify: 1,
							imagePath: targetImagePath,
							animated:
							{
								progress:
								{
									active: true,
									animType: "halfCosOscillation",
									val1: 0,
									val2: 100,
									loops: 1,
									loopDuration: 1
								}
							}
						},
	
						{
							filterType: "transform",
							filterId: "pokeball_bounce",
							autoDestroy: true,
							padding: 80,
							animated:
							{
								translationY:
								{
									animType: "cosOscillation",
									val1: 0,
									val2: 0.25,
									loops: 1,
									loopDuration: 450
								},
								// translationX:
								// {
								// 	animType: "cosOscillation",
								// 	val1: 0.15,
								// 	val2: 0.12,
								// 	loops: 1,
								// 	loopDuration: 450
								// },
								scaleY:
								{
									animType: "cosOscillation",
									val1: 1,
									val2: 0.75,
									loops: 2,
									loopDuration: 450,
								},
								scaleX:
								{
									animType: "cosOscillation",
									val1: 1,
									val2: 0.75,
									loops: 2,
									loopDuration: 450,
								}
							}
						}
	
						];
	
						let pokeball_polymorph_params =
						[{
							filterType: "polymorph",
							filterId: polymorphFilterId,
							type: transitionType,
							padding: 70,
							magnify: 1,
							imagePath: targetImagePath,
							animated:
							{
								progress:
								{
									active: true,
									animType: "halfCosOscillation",
									val1: 0,
									val2: 100,
									loops: 1,
									loopDuration: 1
								}
							}
						}];
	
						if(game.settings.get("PTUMoveMaster", "usePokeballAnimationOnDragOut"))
						{ 
							target_token.TMFXaddUpdateFilters(pokeball_polymorph_quick_params);
	
							function castSpell(effect) {
								canvas.fxmaster.drawSpecialToward(effect, actor_token, game.actors.get(actor.id).getActiveTokens().slice(-1)[0]);//target_token);
							}
							
	
							castSpell({
								file:
									"item_icons/"+pokeball+".webm",
								anchor: {
									x: -0.08,
									y: 0.5,
								},
								speed: 1,
								angle: 0,
								scale: {
									x: 0.5,
									y: 0.5,
								},
							});
							
	
							setTimeout(() => { target_token.TMFXaddUpdateFilters(pokeball_polymorph_params); }, 1000);
	
							let pokeballShoop_params =
							[
								{
									filterType: "transform",
									filterId: "pokeballShoop",
									bpRadiusPercent: 100,
									//padding: 0,
									autoDestroy: true,
									animated:
									{
										bpStrength:
										{
											animType: "cosOscillation",//"cosOscillation",
											val1: 0,
											val2: -0.99,//-0.65,
											loopDuration: 1500,
											loops: 1,
										}
									}
								},
	
								{
									filterType: "glow",
									filterId: "pokeballShoop",
									outerStrength: 40,
									innerStrength: 20,
									color: 0xFFFFFF,//0x5099DD,
									quality: 0.5,
									//padding: 0,
									//zOrder: 2,
									autoDestroy: true,
									animated:
									{
										color: 
										{
										active: true, 
										loopDuration: 1500, 
										loops: 1,
										animType: "colorOscillation", 
										val1:0xFFFFFF,//0x5099DD, 
										val2:0xff0000,//0x90EEFF
										}
									}
								},
	
								{
									filterType: "adjustment",
									filterId: "pokeballShoop",
									saturation: 1,
									brightness: 10,
									contrast: 1,
									gamma: 1,
									red: 1,
									green: 1,
									blue: 1,
									alpha: 1,
									autoDestroy: true,
									animated:
									{
										alpha: 
										{ 
										active: true, 
										loopDuration: 1500, 
										loops: 1,
										animType: "syncCosOscillation",
										val1: 0.35,
										val2: 0.75 }
									}
								}
							];
	
							setTimeout(() => {  target_token.TMFXaddUpdateFilters(pokeballShoop_params); }, 1000);
						}
						setTimeout(() => {  
	
							if(game.settings.get("PTUMoveMaster", "alwaysDisplayTokenNames") == true)
							{
								if(game.settings.get("PTUMoveMaster", "alwaysDisplayTokenHealth") == true)
								{
									target_token.update({
										"scale": (1),
										"bar1.attribute": "health",
										"displayBars": 50,
										"displayName": 50
									});  
								}
								else
								{
									target_token.update({
										"scale": (1),
										"displayName": 50
									});  
								}
							}
							else if (game.settings.get("PTUMoveMaster", "alwaysDisplayTokenHealth") == true)
							{
								target_token.update({
									"scale": (1),
									"bar1.attribute": "health",
									"displayBars": 50,
								});  
							}
							else
							{
								target_token.update({"scale": (1)});
							}
							
						}, 2000);
	
						setTimeout(() => { AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"pokeball_sounds/"+"pokeball_release.mp3", volume: 0.5, autoplay: true, loop: false}, true); }, 500);
					}
				}
				else if (actor.data.type == "pokemon")
				{
					if(game.settings.get("PTUMoveMaster", "alwaysDisplayTokenNames") == true)
					{
						if(game.settings.get("PTUMoveMaster", "alwaysDisplayTokenHealth") == true)
						{
							target_token.update({
								"name": (current_token_nature+current_token_species),
								"bar1.attribute": "health",
								"displayBars": 50,
								"displayName": 50
							});  
						}
						else
						{
							target_token.update({
								"name": (current_token_nature+current_token_species),
								"displayName": 50
							});  
						}
					}
					else if (game.settings.get("PTUMoveMaster", "alwaysDisplayTokenHealth") == true)
					{
						target_token.update({
							"name": (current_token_nature+current_token_species),
							"bar1.attribute": "health",
							"displayBars": 50,
						});  
					}
					else
					{
						target_token.update({"name": (current_token_nature+current_token_species)});
					}	
					game.ptu.PlayPokemonCry(current_token_species);	
				}
				
				if(game.combat)
				{
					target_token.toggleCombat().then(() => game.combat.rollAll({rollMode: 'gmroll'}));
					// game.combat.rollAll({rollMode: 'gmroll'});
	
				}
			}
		}, 100);
	}
});


// Hooks.on("endTurn", function(combat, combatant, prevTurnInfo, options, sender) {
// 	combat // Combat Object
// 	combatant // Combatant Object that just Ended it's turn.
// 	prevTurnInfo // {round, turn} info on which round & turn the last turn was.
// 	options // {round, turn, diff} 
// 	  // round: {direction} where direction is either -1, 0 or 1. Signifying the direction the combat is moving for in relation to round. Shorthands available in: CONFIG.PTUCombat.DirectionOptions
// 	  // turn: {direction}where direction is either -1, 0 or 1. Signifying the direction the combat is moving for in relation to turn. Shorthands available in: CONFIG.PTUCombat.DirectionOptions
// 	  // diff: Boolean
// 	sender // Origin of request
//   }
// );


// Hooks.on("hoverToken", async (token, update, options, userId) => {

// 	console.log(token);
// 	// let current_token_species = canvas.tokens.get(token).actor.data.data.species;

// 	if(update) // Hover-on
// 	{
// 		console.log("Mouse has hovered the token.");
// 		console.log(token.data);
// 	}

// 	if(!update) // Hover-off
// 	{
// 		console.log("Mouse has left the token.");
// 	}
// });

// function PokedexCheck (actorData, targetData)   {
// 	return new Roll('1d20-@ac+@acBonus', {
// 		ac: (parseInt(moveData.ac) || 0),
// 		acBonus: (parseInt(actorData.modifiers.acBonus) || 0)
// 	})
// };


Hooks.once("dragRuler.ready", (SpeedProvider) => {
    class PTUMoveMasterSpeedProvider extends SpeedProvider {
        get colors() {
            return [
                {id: "shift", default: 0x00FF00, name: "PTUMoveMaster.speeds.shift"},
                {id: "sprint", default: 0xFFFF00, name: "PTUMoveMaster.speeds.sprint"},
            ]
        }

        getRanges(token) {
            const overland_speed = token.actor.data.data.capabilities.Overland || 0;
            const sky_speed = token.actor.data.data.capabilities.Sky || 0;
            const levitate_speed = token.actor.data.data.capabilities.Levitate || 0;
            const burrow_speed = token.actor.data.data.capabilities.Burrow || 0;
            const teleporter_speed = token.actor.data.data.capabilities.Teleporter || 0;

            // const swim_speed = token.actor.data.data.capabilities.Swim || 0;

			const highest_speed = Math.max(overland_speed, sky_speed, levitate_speed, burrow_speed, teleporter_speed);

			// A character can always shift it's base speed and sprint 1.5x it's base speed
			const ranges = [
				{range: highest_speed, color: "shift"},
				{range: highest_speed * 1.5, color: "sprint"}
			]

			// Characters that have the feat 'Training Regime (Speed)' can sprint 2x instead of 1.5x
			let can_double_sprint = false;
			for(let item of token.actor.items)
			{
				if(item.name == "Training Regime (Speed)")
				{
					can_double_sprint = true;
					break;
				}
			}
			if (can_double_sprint) {
				ranges[1] = {range: highest_speed * 2, color: "sprint"};
			}

            return ranges
        }
    }

    dragRuler.registerModule("PTUMoveMaster", PTUMoveMasterSpeedProvider)
})


var stats = ["atk", "def", "spatk", "spdef", "spd"];

var move_stage_changes = {
	"Blank Template"  :   {
		"roll-trigger": 20,
		"atk"   : 0,
		"def"   : 0,
		"spatk" : 0,
		"spdef" : 0,
		"spd"   : 0,
		"accuracy": 0,
		"pct-healing": 0,
		"pct-self-damage": 0,
		"recoil": 0,
		"crit-range": 20,
		"effect-range": 20,
		"weather": "Clear"
	},
	"Calm Mind"  :   {
		"spatk" : 1,
		"spdef" : 1
	},
	"Nasty Plot"  :   {
		"spatk" : 2,
	},
	"Swords Dance"  :   {
		"atk" : 2,
	},
	"Recover"  :   {
		"pct-healing": 0.5,
	},
	"Defend Order"  :   {
		"def" : 1,
		"spdef" : 1
	},
	"Quiver Dance"  :   {
		"spatk" : 1,
		"spdef" : 1,
		"spd" : 1
	},
	"Tail Glow"  :   {
		"spatk" : 3
	},
	"Hone Claws"  :   {
		"atk" : 1,
		"accuracy" : 1 // TODO: Implement Accuracy 'stage' changing.
	},
	"Draco Meteor"  :   {
		"spatk" : -2,
	},
	"Dragon Dance"  :   {
		"atk" : 1,
		"spd" : 1,
	},
	"Charge"  :   {
		"spdef" : 1,
	},
	"Bulk Up"  :   {
		"atk" : 1,
		"def" : 1,
	},
	"Close Combat"  :   {
		"def" : -1,
		"spdef" : -1,
	},
	"Hammer Arm"  :   {
		"spd" : -1,
	},
	"Superpower"  :   {
		"atk" : -1,
		"def" : -1,
	},
	"Flame Charge"  :   {
		"spd" : 1,
	},
	"Overheat"  :   {
		"spatk" : -2,
	},
	"Dragon Ascent"  :   {
		"def" : -1,
		"spdef" : -1,
	},
	"Cotton Guard"  :   {
		"def" : 3,
	},
	"Leaf Storm"  :   {
		"spatk" : -2,
	},
	"Belly Drum"  :   {
		"atk" : 6,
		"pct-self-damage": 0.5,
	},
	"Growth"  :   { // TODO: Double these gains if in Sunny Weather
		"atk" : 1,
		"spatk" : 1,
	},
	"Harden"  :   {
		"def" : 1,
	},
	"Howl"  :   {
		"atk" : 1,
	},
	"Howl [OG]"  :   {
		"atk" : 1,
	},
	"Sharpen"  :   {
		"atk" : 1,
	},
	"Shell Smash"  :   {
		"atk" : 2,
		"spatk" : 2,
		"spd" : 2,
		"def" : -1,
		"spdef" : -1,
	},
	"Stockpile"  :   {
		"def" : 1,
		"spdef" : 1,
	},
	"Work Up"  :   {
		"atk" : 1,
		"spatk" : 1,
	},
	"Coil"  :   {
		"atk" : 1,
		"def" : 1,
		"accuracy" : 1,
	},
	"Agility"  :   {
		"spd" : 2,
	},
	"Amnesia"  :   {
		"spdef" : 2,
	},
	"Cosmic Power"  :   {
		"def" : 1,
		"spdef" : 1,
	},
	"Meditate"  :   {
		"atk" : 1,
	},
	"Psycho Boost"  :   {
		"spatk" : -2,
	},
	"Rock Polish"  :   {
		"spd" : 2,
	},
	"Autotomize"  :   {
		"spd" : 2,
		"weight" : -1, // TODO: Implement weight changes
	},
	"Iron Defense"  :   {
		"def" : 2,
	},
	"Shift Gear"  :   {
		"atk" : 1,
		"spd" : 2,
	},
	"Heal Order"  :   {
		"pct-healing": 0.5,
	},
	"Silver Wind"  :   {
		"roll-trigger": 19,
		"atk"   : 1,
		"def"   : 1,
		"spatk" : 1,
		"spdef" : 1,
		"spd"   : 1,
	},
	"Moonlight"  :   {// TODO: The healing percent varies depending on the weather
		"pct-healing": 0.5,
	},
	"Roost"  :   {
		"pct-healing": 0.5,
	},
	"Ominous Wind"  :   {
		"roll-trigger": 19,
		"atk"   : 1,
		"def"   : 1,
		"spatk" : 1,
		"spdef" : 1,
		"spd"   : 1,
	},
	"Synthesis"  :   {// TODO: The healing percent varies depending on the weather
		"pct-healing": 0.5,
	},
	// "Double-Edge"  :   {
	// 	"pct-self-damage": 0.33333,
	// },
	"Morning Sun"  :   {// TODO: The healing percent varies depending on the weather
		"pct-healing": 0.5,
	},
	"Slack Off"  :   {
		"pct-healing": 0.5,
	},
	"Substitute"  :   {
		"pct-self-damage": 0.25,
	},
	"Rest"  :   {
		"pct-healing": 1,
	},
	"Ancient Power"  :   {
		"roll-trigger": 19,
		"atk"   : 1,
		"def"   : 1,
		"spatk" : 1,
		"spdef" : 1,
		"spd"   : 1,
	},
	// "Head Smash"  :   {
	// 	"pct-self-damage": 0.33333,
	// },
	"Metal Claw"  :   {
		"roll-trigger": 18,
		"atk"   : 1,
	},
	"Meteor Mash"  :   {
		"roll-trigger": 15,
		"atk"   : 1,
	},
	"Steel Wing"  :   {
		"roll-trigger": 15,
		"def"   : 1,
	},
	"Hail"  :   {
		"weather"   : "Hail"
	},
	"Sunny Day"  :   {
		"weather"   : "Sunny"
	},
	"Defog"  :   {
		"weather"   : "Clear"
	},
	"Sandstorm"  :   {
		"weather"   : "Sandstorm"
	},
	"Rain Dance"  :   {
		"weather"   : "Rainy"
	},
	"Attack Order"	:	{
		"crit-range":	18,
	},
	"Night Slash"	:	{
		"crit-range":	18,
	},
	// "Spacial Rend"	:	{ // TODO: Implement even/odd effects
	// 	"crit-range":	"Even",
	// },
	"Cross Chop"	:	{
		"crit-range":	16,
	},
	"Karate Chop"	:	{
		"crit-range":	17,
	},
	"Storm Throw"	:	{
		"crit-range":	2,
	},
	"Blaze Kick"	:	{
		"crit-range":	18,
	},
	// "Aeroblast"	:	{ // TODO: Implement even/odd effects
	// 	"crit-range":	"Even",
	// },
	"Air Cutter"	:	{
		"crit-range":	18,
	},
	"Shadow Claw"	:	{
		"crit-range":	18,
	},
	"Leaf Blade"	:	{
		"crit-range":	18,
	},
	"Razor Leaf"	:	{
		"crit-range":	18,
	},
	"Drill Run"	:	{
		"crit-range":	18,
	},
	"Frost Breath"	:	{
		"crit-range":	2,
	},
	"Razor Wind"	:	{
		"crit-range":	18,
	},
	"Slash"	:	{
		"crit-range":	18,
	},
	"Cross Poison"	:	{
		"crit-range":	18,
	},
	"Poison Tail"	:	{
		"crit-range":	18,
	},
	"Psycho Cut"	:	{
		"crit-range":	18,
	},
	"Stone Edge"	:	{
		"crit-range":	17,
	},
	"Crabhammer"	:	{
		"crit-range":	18,
	},
};

const ButtonHeight = 100;
const RangeFontSize = 14;
const RangeIconFontSizeOffset = (8);
const MoveButtonBackgroundColor = "#333333";
const MoveButtonTextColor = "#cccccc";

const TypeIconWidth = 97;
const EffectivenessBorderThickness = 5;

const TypeIconSuffix = "IC.png";
const CategoryIconSuffix = ".png";

// const TypeIconPath = "systems/ptu/css/images/types/";
// const CategoryIconPath = "systems/ptu/css/images/categories/";

const AlternateIconPath = "modules/PTUMoveMaster/images/icons/";

// const AtWillReadyMark = "∞";

// const SceneReadyMark = "✅";
// const SceneExpendedMark = "❌";

// const EOTReadyMark = "🔳";
// const EOTCooldownMark = "⏳";

// // const DailyReadyMark = "🔆";
// const DailyReadyMark = "<img title='Daily (Ready)' src='" + AlternateIconPath + "daily_ready" + CategoryIconSuffix + "' style='height: "+Number(RangeFontSize)+"px ;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
// // const DailyExpendedMark = "💤";
// const DailyExpendedMark = "<img title='Daily (Ready)' src='" + AlternateIconPath + "daily_expended" + CategoryIconSuffix + "' style='height: "+Number(RangeFontSize)+"px ;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";


// const ResetEOTMark = "🔁⏳";
// const ResetSceneMark = "🔁❌";
// const ResetDailyMark = "🔁💤";

const ResetEOTMark = "<img title='Reset EOT Frequency' src='"+AlternateIconPath+"FrequencyIcon_ResetEOT.png' style='border:none; width:55px;'>";
const ResetSceneMark = "<img title='Reset Scene Frequency' src='"+AlternateIconPath+"FrequencyIcon_ResetScene.png' style='border:none; width:55px;'>";
const ResetDailyMark = "<img title='Reset Daily Frequency' src='"+AlternateIconPath+"FrequencyIcon_ResetDaily.png' style='border:none; width:55px;'>";

const ResetStandardMark = "<img title='Reset Standard Action' src='"+AlternateIconPath+"reset_Standard.png' style='border:none; width:55px;'>";
const ResetShiftMark = "<img title='Reset Shift Action' src='"+AlternateIconPath+"reset_Shift.png' style='border:none; width:55px;'>";
const ResetSwiftMark = "<img title='Reset Swift Action' src='"+AlternateIconPath+"reset_Swift.png' style='border:none; width:55px;'>";

const TickDamageMark = "<img title='Apply Tick Damage' src='"+AlternateIconPath+"TickDamageIcon.png' style='border:none; width:55px;'>";
const TickHealMark = "<img title='Heal Tick Damage' src='"+AlternateIconPath+"TickHealIcon.png' style='border:none; width:55px;'>";
const RestMark = "<img title='Rest' src='"+AlternateIconPath+"RestIcon.png' style='border:none; width:55px;'>";

// const AbilityIcon = "Ability: ";
const AbilityIcon = "";

const RangeIcon = "<img title='Ranged' src='" + AlternateIconPath + "ranged" + CategoryIconSuffix + "' style='height: "+Number(RangeFontSize+RangeIconFontSizeOffset)+"px ;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
const MeleeIcon = "<img title='Melee' src='" + AlternateIconPath + "melee" + CategoryIconSuffix + "' style='height: "+Number(RangeFontSize+RangeIconFontSizeOffset)+"px ;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
const SelfIcon = "<img title='Self' src='" + AlternateIconPath + "self" + CategoryIconSuffix + "' style='height: "+Number(RangeFontSize+RangeIconFontSizeOffset)+"px ;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
const BurstIcon = "<img title='Burst' src='" + AlternateIconPath + "burst" + CategoryIconSuffix + "' style='height: "+Number(RangeFontSize+RangeIconFontSizeOffset)+"px ;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
const BlastIcon = "<img title='Blast' src='" + AlternateIconPath + "blast" + CategoryIconSuffix + "' style='height: "+Number(RangeFontSize+RangeIconFontSizeOffset)+"px ;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
const ConeIcon = "<img title='Cone' src='" + AlternateIconPath + "cone" + CategoryIconSuffix + "' style='height: "+Number(RangeFontSize+RangeIconFontSizeOffset)+"px ;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
const LineIcon = "<img title='Line' src='" + AlternateIconPath + "line" + CategoryIconSuffix + "' style='height: "+Number(RangeFontSize+RangeIconFontSizeOffset)+"px ;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
const BlessingIcon = "<img title='Blessing' src='" + AlternateIconPath + "blessing" + CategoryIconSuffix + "' style='height: "+Number(RangeFontSize+RangeIconFontSizeOffset)+"px ;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
const FriendlyIcon = "<img title='Friendly' src='" + AlternateIconPath + "friendly" + CategoryIconSuffix + "' style='height: "+Number(RangeFontSize+RangeIconFontSizeOffset)+"px ;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
const SonicIcon = "<img title='Sonic' src='" + AlternateIconPath + "sonic" + CategoryIconSuffix + "' style='height: "+Number(RangeFontSize+RangeIconFontSizeOffset)+"px ;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
const SocialIcon = "<img title='Social' src='" + AlternateIconPath + "social" + CategoryIconSuffix + "' style='height: "+Number(RangeFontSize+RangeIconFontSizeOffset)+"px ;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
const InterruptIcon = "<img title='Interrupt' src='" + AlternateIconPath + "interrupt" + CategoryIconSuffix + "' style='height: "+Number(RangeFontSize+RangeIconFontSizeOffset)+"px ;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
const ShieldIcon = "<img title='Shield' src='" + AlternateIconPath + "shield" + CategoryIconSuffix + "' style='height: "+Number(RangeFontSize+RangeIconFontSizeOffset)+"px ;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
const TriggerIcon = "<img title='Trigger' src='" + AlternateIconPath + "trigger" + CategoryIconSuffix + "' style='height: "+Number(RangeFontSize+RangeIconFontSizeOffset)+"px ;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
const HealingIcon = "<img title='Healing' src='" + AlternateIconPath + "healing" + CategoryIconSuffix + "' style='height: "+Number(RangeFontSize+RangeIconFontSizeOffset)+"px ;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
const DoubleStrikeIcon = "<img title='Double Strike' src='" + AlternateIconPath + "doublestrike_icon" + CategoryIconSuffix + "' style='height: "+Number(RangeFontSize+RangeIconFontSizeOffset)+"px ;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
const FiveStrikeIcon = "<img title='Five Strike' src='" + AlternateIconPath + "fivestrike_icon" + CategoryIconSuffix + "' style='height: "+Number(RangeFontSize+RangeIconFontSizeOffset)+"px ;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
const GroundsourceIcon = "<img title='Groundsource' src='" + AlternateIconPath + "groundsource" + CategoryIconSuffix + "' style='height: "+Number(RangeFontSize+RangeIconFontSizeOffset)+"px ;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
const FieldIcon = "<img title='Field' src='" + AlternateIconPath + "field" + CategoryIconSuffix + "' style='height: "+Number(RangeFontSize+RangeIconFontSizeOffset)+"px ;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
const SmiteIcon = "<img title='Smite' src='" + AlternateIconPath + "smite" + CategoryIconSuffix + "' style='height: "+Number(RangeFontSize+RangeIconFontSizeOffset)+"px ;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
const ExhaustIcon = "<img title='Exhaust' src='" + AlternateIconPath + "exhaust" + CategoryIconSuffix + "' style='height: "+Number(RangeFontSize+RangeIconFontSizeOffset)+"px ;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
const SwiftActionIcon = "<img title='Swift Action' src='" + AlternateIconPath + "SwiftAction" + CategoryIconSuffix + "' style='height: "+Number(RangeFontSize+RangeIconFontSizeOffset)+"px ;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
const ShiftActionIcon = "<img title='Shift Action' src='" + AlternateIconPath + "ShiftAction" + CategoryIconSuffix + "' style='height: "+Number(RangeFontSize+RangeIconFontSizeOffset)+"px ;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
const StandardActionIcon = "<img title='Standard Action' src='" + AlternateIconPath + "StandardAction" + CategoryIconSuffix + "' style='height: "+Number(RangeFontSize+RangeIconFontSizeOffset)+"px ;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
const FullActionIcon = "<img title='Full (Standard + Shift) Action' src='" + AlternateIconPath + "FullAction" + CategoryIconSuffix + "' style='height: "+Number(RangeFontSize+RangeIconFontSizeOffset)+"px ;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
const SetupIcon = "<img title='Setup' src='" + AlternateIconPath + "setup" + CategoryIconSuffix + "' style='height: "+Number(RangeFontSize+RangeIconFontSizeOffset)+"px ;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
const PassIcon = "<img title='Pass' src='" + AlternateIconPath + "pass" + CategoryIconSuffix + "' style='height: "+Number(RangeFontSize+RangeIconFontSizeOffset)+"px ;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
const IllusionIcon = "<img title='Illusion' src='" + AlternateIconPath + "illusion" + CategoryIconSuffix + "' style='height: "+Number(RangeFontSize+RangeIconFontSizeOffset)+"px ;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
const CoatIcon = "<img title='Coat' src='" + AlternateIconPath + "coat" + CategoryIconSuffix + "' style='height: "+Number(RangeFontSize+RangeIconFontSizeOffset)+"px ;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";

const SwiftActionBackground = AlternateIconPath + "SwiftActionBackground" + CategoryIconSuffix;
const StandardActionBackground = AlternateIconPath + "StandardActionBackground" + CategoryIconSuffix;
const ShiftActionBackground = AlternateIconPath + "ShiftActionBackground" + CategoryIconSuffix;
const FullActionBackground = AlternateIconPath + "FullActionBackground" + CategoryIconSuffix;
const StaticBackground = AlternateIconPath + "StaticBackground" + CategoryIconSuffix;
const FreeActionBackground = AlternateIconPath + "FreeActionBackground" + CategoryIconSuffix;
const ExtendedActionBackground = AlternateIconPath + "ExtendedActionBackground" + CategoryIconSuffix;


const bodyBackground = AlternateIconPath + "BodyBackground" + CategoryIconSuffix;
const mindBackground = AlternateIconPath + "MindBackground" + CategoryIconSuffix;
const spiritBackground = AlternateIconPath + "SpiritBackground" + CategoryIconSuffix;


const SkillColors = {
	"Pathetic": "#cfe2f3",
	"Untrained": "#9fc5e8",
	"Novice": "#6fa8dc",
	"Adept": "#3d85c6",
	"Expert": "#0b5394",
	"Master": "#073763"
};

const VolatileAfflictions = [
	"Flinch", 
	"Sleep", 
	"Cursed", 
	"Confused", 
	"Disabled", 
	"Infatuation", 
	"Rage", 
	"BadSleep", 
	"Suppressed",
];

const JingleDirectory = "pokemon_jingles/";
const NameVoiceLinesDirectory = "pokemon_names/";

const UIButtonClickSound = "buttonclickrelease.wav";
const UIPopupSound = "packopen_6_A_cardflip.wav";

const RefreshEOTMovesSound = "In-Battle%20Recall%20Switch%20Flee%20Run.mp3";
const RefreshSceneMovesSound = "In-Battle%20Recall%20Switch%20Flee%20Run.mp3";
const RefreshDailyMovesSound = "In-Battle%20Recall%20Switch%20Flee%20Run.mp3";

const stat_up_sound_file = "Stat%20Rise%20Up.mp3";
const stat_zero_sound_file = "Stat%20Fall%20Down.mp3";
const stat_down_sound_file = "Stat%20Fall%20Down.mp3";
const heal_sound_file = "In-Battle%20Held%20Item%20Activate.mp3";
const damage_sound_file = "Hit%20Weak%20Not%20Very%20Effective.mp3";

const PhysicalIcon = "Physical.png";
const SpecialIcon = "Special.png";
const StatusIcon = "Status.png";

const DISPOSITION_HOSTILE = -1;
const DISPOSITION_NEUTRAL = 0;
const DISPOSITION_FRIENDLY = 1;

const MoveMessageTypes = {
	DAMAGE: 'damage',
	TO_HIT: 'to-hit',
	DETAILS: 'details',
	FULL_ATTACK: 'full-attack'
};


export function PTUAutoFight()
{

	async function ApplyDamage(event)
	{
		let key_shift = keyboard.isDown("Shift");
		if (key_shift) 
		{
			let form = new game.PTUMoveMaster.MoveMasterBonusDamageReductionOptions({event}, {"submitOnChange": false, "submitOnClose": true});
			form.render(true);
		}
		else
		{
			var initial_damage_total=event.currentTarget.dataset.damage;
			var damage_category=event.currentTarget.dataset.category;
			var damage_type=event.currentTarget.dataset.type;
			var mode=event.currentTarget.dataset.mode;
			var crit=event.currentTarget.dataset.crit;
			let damageSoundFile = "";
	
			for(let token of canvas.tokens.controlled)
			{
				let def = token.actor.data.data.stats.def.total
				let spdef = token.actor.data.data.stats.spdef.total
				let extraDR = 0;
				let extraDRSource = "";
	
				var flavor;
				var postEffectNotes = "";
				var extraDRNotes = "";
	
				let effectiveness = {"Normal":1, "Fire":1, "Water":1, "Electric":1, "Grass":1, "Ice":1, "Fighting":1, "Poison":1, "Ground":1, "Flying":1, "Psychic":1, "Bug":1, "Rock":1, "Ghost":1, "Dragon":1, "Dark":1, "Steel":1, "Fairy":1 };
	
				if(token.actor.data.data.effectiveness)
				{
					effectiveness = token.actor.data.data.effectiveness.All;
				}
	
				let this_moves_effectiveness = effectiveness[damage_type];
				if (isNaN(this_moves_effectiveness) || this_moves_effectiveness == null)
				{
					this_moves_effectiveness = 1;
					damage_type = "Untyped";
				}

				if(game.combat == null)
				{
					var currentRound = 0;
					var currentEncounterID = 0;
				}
				else
				{
					var currentRound = game.combat.round;
					var currentEncounterID = game.combat.data.id;
				}
	
				if( (currentRound - token.actor.data.data.TypeStrategistLastRoundUsed <= 1) && (currentEncounterID == token.actor.data.data.TypeStrategistLastEncounterUsed) )
				{
					extraDR = token.actor.data.data.TypeStrategistDR;
					extraDRSource = "Type Strategist, " + token.actor.data.data.TypeStrategistLastTypeUsed;
					extraDRNotes = "(including +" + extraDR + " DR from " + extraDRSource + ")";
				}
	
				if(crit=="true")
				{
					flavor = "Critical Hit! ";
					damageSoundFile = "Hit%20Super%20Effective.mp3";
				}
				else
				{
					flavor = "Hit! ";
					damageSoundFile = "Hit%20Normal%20Damage.mp3";
				}
	
				
				if(mode=="resist")
				{
					flavor+="(resisted 1 step) "
					let old_effectiveness=this_moves_effectiveness;
					if(old_effectiveness > 1)
					{
						this_moves_effectiveness=this_moves_effectiveness - .5;
					}
					else
					{
						this_moves_effectiveness=Number(this_moves_effectiveness /2);
					}
				}
	
				if(damage_category == "Physical")
				{
					var DR = def + extraDR;
				}
				if(damage_category == "Special")
				{
					var DR = spdef + extraDR;
				}
				if(mode=="half")
				{
					flavor+="(1/2 damage) ";
					initial_damage_total=Number(initial_damage_total/2);
				}
	
				var defended_damage = Number(Number(initial_damage_total) - Number(DR));
				var final_effective_damage = Math.max(Math.floor(Number(defended_damage)*Number(this_moves_effectiveness)), 0);
	
				if(mode=="flat")
				{
					flavor+="(flat damage) ";
					final_effective_damage = initial_damage_total;
					defended_damage = 0;
					this_moves_effectiveness = 1;
				}
				// ui.notifications.info(flavor + initial_damage_total + " Damage! "+ token.actor.name + "'s " + damage_category + " defense" + extraDRNotes + " is " + DR + ", reducing the incoming damage to "+defended_damage+", and their defensive effectiveness against " + damage_type + " is x" + effectiveness + "; They take " + final_effective_damage + " damage after effectiveness and defenses.");
	
				chatMessage(token, flavor + initial_damage_total + " Damage! "+ token.actor.name + "'s " + damage_category + " defense" + extraDRNotes + " is " + DR + ", reducing the incoming damage to "+defended_damage+", and their defensive effectiveness against " + damage_type + " is x" + this_moves_effectiveness + "; They take " + final_effective_damage + " damage after effectiveness and defenses.");
	
				// token.actor.update({'data.health.value': Number(token.actor.data.data.health.value - final_effective_damage) });
				token.actor.modifyTokenAttribute("health", (-final_effective_damage), true, true);
	
				ApplyInjuries(token.actor, final_effective_damage);
				
			}
			AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+damageSoundFile, volume: 0.8, autoplay: true, loop: false}, true);
		}
		
	};


	async function chatMessage(token, messageContent) {
        // create the message
		if (messageContent !== '') {
		        let chatData = {
			      user: game.user.data._id,
			      speaker: ChatMessage.getSpeaker(token),
			      content: messageContent,
		        };
			ChatMessage.create(chatData, {});
  		}
	}


	async function ChatWindow(actor)
	{

		AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+UIPopupSound, volume: 0.8, autoplay: true, loop: false}, false);

		let target = Array.from(game.user.targets)[0];
		let targetTypingText = game.PTUMoveMaster.GetTargetTypingHeader(target, actor)
		let background_field = 'background-image: url("background_fields/BG_Grass.png"); background-repeat: repeat-x; background-position: left bottom';
		
		var items=actor.data.items;
		var item_entities=actor.items;
		var i = 0;

		if(game.combat == null)
		{
			var currentRound = 0;
			var currentEncounterID = 0;
		}
		else
		{
			var currentRound = game.combat.current.round;
			var currentEncounterID = game.combat.data._id;
		}

		var typeStrategist = [];
		var technician = false;
		var hasPokedex = false;

		for(let item of items) // START Ability Check Loop
		{
			var item_data = item.data.data;
			if(item_data.name.search("Type Strategist \\(") > -1)
			{
				typeStrategist.push(item_data.name.slice(item_data.name.search('\\(')+1, item_data.name.search('\\)') ));
			}
			if(item_data.name.search("Technician") > -1)
			{
				technician = true;
			}
			if(item_data.name.search(/[Pp]ok[eé]dex/) > -1)
			{
				hasPokedex = true;
			}
		} // END Ability Check Loop

		let dialogEditor;
		var buttons={};

		let menuButtonWidth = "90px";
		let bigButtonWidth = "191px";

		buttons["skillsMenu"] = {noRefresh: true, id:"skillsMenu", label: "<center><div style='background-color:lightgray;color:black;border:2px solid black;width:"+menuButtonWidth+";height:25px;font-size:16px;font-family:Modesto Condensed;line-height:1.4'>"+"Skills 💬"+"</div></center>",
			callback: () => {
				game.PTUMoveMaster.ShowSkillsMenu(actor);
				AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+UIPopupSound, volume: 0.8, autoplay: true, loop: false}, false);
			}};

		buttons["struggleMenu"] = {noRefresh: true, id:"struggleMenu", label: "<center><div style='background-color:lightgray;color:black;border:2px solid black;width:"+menuButtonWidth+";height:25px;font-size:16px;font-family:Modesto Condensed;line-height:1.4'>"+"Struggle 💬"+"</div></center>",
			callback: () => {
				game.PTUMoveMaster.ShowStruggleMenu(actor);
				AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+UIPopupSound, volume: 0.8, autoplay: true, loop: false}, false);
			}};

		buttons["maneuverMenu"] = {noRefresh: true, id:"maneuverMenu", label: "<center><div style='background-color:lightgray;color:black;border:2px solid black;width:"+menuButtonWidth+";height:25px;font-size:16px;font-family:Modesto Condensed;line-height:1.4'>"+"Maneuvers 💬"+"</div></center>",
		callback: () => {
			game.PTUMoveMaster.ShowManeuverMenu(actor);
			AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+UIPopupSound, volume: 0.8, autoplay: true, loop: false}, false);
		}};

		if(actor.data.type == "character")
		{
			buttons["itemMenu"] = {noRefresh: true, id:"itemMenu", label: "<center><div style='background-color:lightgray;color:black;border:2px solid black;width:"+menuButtonWidth+";height:25px;font-size:16px;font-family:Modesto Condensed;line-height:1.4'>"+"Items 💬"+"</div></center>",
			callback: () => {
				game.PTUMoveMaster.ShowInventoryMenu(actor);
			}};


			buttons["pokeballMenu"] = {noRefresh: true, id:"pokeballMenu", label: "<center><div style='background-color:lightgray;color:black;border:2px solid black;width:"+menuButtonWidth+";height:25px;font-size:16px;font-family:Modesto Condensed;line-height:1.4'>"+"Pokeballs 💬"+"</div></center>",
			callback: async () => {
				await game.PTUMoveMaster.ShowPokeballMenu(actor);
			}};

			if(hasPokedex)
			{
				buttons["pokedexScanBigButton"] = {id:"pokedexScanBigButton", label: "<center><div style='background-color:none;color:black;border-bottom:2px solid black;width:"+bigButtonWidth+";height:35px;font-size:16px;font-family:Modesto Condensed;color:grey;line-height:1.4'>"+"<img title='Pokedex Scan!' src='"+AlternateIconPath+"Gen_I_dex.png' style='height:33px; border:none'></div></center>",
				callback: async () => {
					let trainer_tokens = actor.getActiveTokens();
					let actor_token = trainer_tokens[0];
					await game.PTUMoveMaster.PokedexScan(actor_token, target);
				}};
			}
			else
			{
				buttons["pokedexScanBigButton"] = {noRefresh:true, id:"pokedexScanBigButton", label: "<center><div style='background-color:none;color:black;border-bottom:2px solid black;width:"+bigButtonWidth+";height:35px;font-size:16px;font-family:Modesto Condensed;color:grey;line-height:1.4'>"+"<img title='No Pokedex to Use' src='"+AlternateIconPath+"Gen_I_dex_No.png' style='height:33px; border:none'></div></center>",
				callback: async () => {
					ui.notifications.warn("You have no Pokedex in your inventory!");
					AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"warning.wav", volume: 0.5, autoplay: true, loop: false}, true);
			}};
			}
			
		}
		else if(actor.data.data.owner!= "0")
		{
			let trainer_token_on_field 
			
			if(game.actors.get(actor.data.data.owner))
			{
				trainer_token_on_field = ((game.actors.get(actor.data.data.owner)).getActiveTokens().slice(-1)[0]);
			}
			if(trainer_token_on_field)
			{
				buttons["trainerBigButton"] = {noRefresh: true, id:"trainerBigButton", label: "<center><div style='background-color:lightgray;color:black;border:2px solid black;width:"+bigButtonWidth+";height:25px;font-size:16px;font-family:Modesto Condensed;line-height:1.4'>"+"🔎 Select Trainer 🔍"+"</div></center>",
				callback: () => {
			
					trainer_token_on_field.control(true);
					//PerformStruggleAttack ("Normal", "Physical");
			
				}};
			}
			else
			{
				buttons["trainerBigButton"] = {noRefresh: true, id:"trainerBigButton", label: "<center><div style='background-color:lightred;color:black;border:2px solid black;width:"+bigButtonWidth+";height:25px;font-size:16px;font-family:Modesto Condensed;line-height:1.4'>"+"❌ Trainer Unavailable ❌"+"</div></center>",
				callback: () => {
			
					ui.notifications.warn("Trainer is not on the field.")
					AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"warning.wav", volume: 0.5, autoplay: true, loop: false}, false);
				}};
			}
		}

		buttons["abilityDivider"] = {noRefresh: true, id:"abilityDivider", label: "<img src='"+AlternateIconPath+"DividerIcon_Abilities.png' style='border:none; width:200px;'>",
		callback: () => {

		}};
	

		for(let item of items) // START ABILITY BUTTON LOOP
		{
			var item_data = item.data.data;
			var currentid=item.id;
			var currentlabel=item.data.name;
			var currenttype=item.data.type;
			var currentCooldownLabel = "";
			var currentEffectivenessLabel = "";
			var respdata=item.data;
			let AbilityActionIcon = "";
			let AbilityActionBackground = "";

			if(currenttype=="ability")
			{
				currentlabel=item.data.name;
				respdata['category']='details';
				
				if(item_data.frequency.includes("Swift Action"))
				{
					// AbilityActionIcon = SwiftActionIcon + "&numsp;";
					AbilityActionBackground = SwiftActionBackground;
				}
				else if(item_data.frequency.includes("Standard Action"))
				{
					// AbilityActionIcon = StandardActionIcon + "&numsp;";
					AbilityActionBackground = StandardActionBackground;
				}
				else if(item_data.frequency.includes("Shift Action"))
				{
					// AbilityActionIcon = ShiftActionIcon + "&numsp;";
					AbilityActionBackground = ShiftActionBackground;
				}
				else if(item_data.frequency.includes("Full Action"))
				{
					// AbilityActionIcon = FullActionIcon + "&numsp;";
					AbilityActionBackground = FullActionBackground;
				}
				else if(item_data.frequency.includes("Static"))
				{
					AbilityActionBackground = StaticBackground;
				}
				else if(item_data.frequency.includes("Free Action"))
				{
					AbilityActionBackground = FreeActionBackground;
				}
				else if(item_data.frequency.includes("Extended Action"))
				{
					AbilityActionBackground = ExtendedActionBackground;
				}
				buttons[currentid]={id:currentid, label: "<center><div title='"+(item_data.frequency+"\n"+item_data.effect).replace("'","&#39;")+"' style='background-image: url("+AbilityActionBackground+");background-color: #333333; color:#cccccc; border-left:5px solid darkgray; width:200px; height:25px;font-size:20px;font-family:Modesto Condensed;display: flex;justify-content: center;align-items: center;'>"+AbilityIcon+AbilityActionIcon+currentlabel+"</div></center>",
					callback: async () => {
						
						AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+UIButtonClickSound, volume: 0.5, autoplay: true, loop: false}, true);


						
						sendMoveMessage({
							move: item_data,
							moveName: item.name,
							templateType: MoveMessageTypes.DETAILS,
							category: "details", 
							hasAC: (!isNaN(item_data.ac)),
							isAbility: true
						});

						if(item_data.frequency.includes("Swift"))
						{
							TakeAction(actor, "Swift");
						}

						if(item_data.frequency.includes("Standard"))
						{
							TakeAction(actor, "Standard");
						}

						if(item_data.frequency.includes("Shift"))
						{
							TakeAction(actor, "Shift");
						}

						if(item_data.frequency.includes("Full Action"))
						{
							TakeAction(actor, "Full");
						}

					}
				}
			}
		}

		buttons["statusDivider"] = {noRefresh: true, id:"statusDivider", label: "<img src='"+AlternateIconPath+"DividerIcon_Moves.png' style='border:none; width:200px;'>",
		callback: () => {

		}};


		for(let item of items) // START STATUS MOVE LOOP
		{
			var item_data = item.data.data;
			var currentid=item.id;
			var currentlabel=item.data.name;
			var currentCooldownLabel = "";
			var currentEffectivenessLabel = "";
			var currentFrequency=item_data.frequency;
			
			if(!currentFrequency)
			{
				currentFrequency = "";
			}
			
			if((item_data.LastRoundUsed == null || item_data.LastEncounterUsed == null ) && (currentFrequency.search("EOT") > -1 || currentFrequency.search("Scene") > -1 || currentFrequency.search("Daily") > -1))
			{
				for(let search_item of item_entities)
				{
					if (search_item.id == item.id)
					{
						await search_item.update({ "data.LastRoundUsed" : -2});
						await search_item.update({ "data.LastEncounterUsed": 0});
					}
				}
			}

			var currentLastRoundUsed = item_data.LastRoundUsed;
			var currentLastEncounterUsed = item_data.LastEncounterUsed;

			if(item_data.UseCount == null)
			{
				// console.log("USE COUNT == NULL");
				for(let search_item of item_entities)
				{
					if (search_item.id == item.id)
					{
						await search_item.update({ "data.UseCount": 0});
					}
				}
			}

			var currentUseCount = item_data.UseCount;
			var cooldownFileSuffix = "";

			// console.log("Move:");
			// console.log(item.name);

			// console.log("currentRound");
			// console.log(currentRound);

			// console.log("currentLastRoundUsed");
			// console.log(currentLastRoundUsed);

			// console.log("currentEncounterID");
			// console.log(currentEncounterID);

			// console.log("currentLastEncounterUsed");
			// console.log(currentLastEncounterUsed);

			if( (Number(currentRound - currentLastRoundUsed) < 2) && (currentEncounterID == currentLastEncounterUsed) )
			{
				cooldownFileSuffix = "_CD"
			}

			if(currentFrequency == "At-Will" || currentFrequency == "")
			{
				currentCooldownLabel = "<img src='" + AlternateIconPath + "AtWill" + CategoryIconSuffix + "' title='At-Will' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
			}

			else if(currentFrequency == "EOT")
			{
				if( (Number(currentRound - currentLastRoundUsed) < 2) && (currentEncounterID == currentLastEncounterUsed) )
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "EOT_0" + CategoryIconSuffix + "' title='Every Other Turn (On Cooldown)' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
				else
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "EOT_1" + CategoryIconSuffix + "' title='Every Other Turn (Ready)' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
			}

			else if(currentFrequency == "Scene")
			{
				if( Number(currentUseCount) >= 1 )
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "Scene1_0" + cooldownFileSuffix + CategoryIconSuffix + "' title='Scene x1 (0 Remaining)' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
				else
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "Scene1_1" + cooldownFileSuffix + CategoryIconSuffix + "' title='Scene x1 (1 Remaining)' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
			}

			else if(currentFrequency == "Scene x2")
			{
				if( Number(currentUseCount) >= 2 )
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "Scene2_0" + cooldownFileSuffix + CategoryIconSuffix + "' title='Scene x2 (0 Remaining)' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
				else if( Number(currentUseCount) == 1 )
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "Scene2_1" + cooldownFileSuffix + CategoryIconSuffix + "' title='Scene x2 (1 Remaining)' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
				else
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "Scene2_2" + cooldownFileSuffix + CategoryIconSuffix + "' title='Scene x2 (2 Remaining)' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
			}

			else if(currentFrequency == "Scene x3")
			{
				if( Number(currentUseCount) >= 3 )
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "Scene3_0" + cooldownFileSuffix + CategoryIconSuffix + "' title='Scene x3 (0 Remaining)' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
				else if( Number(currentUseCount) == 2 )
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "Scene3_1" + cooldownFileSuffix + CategoryIconSuffix + "' title='Scene x3 (1 Remaining)' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
				else if( Number(currentUseCount) == 1 )
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "Scene3_2" + cooldownFileSuffix + CategoryIconSuffix + "' title='Scene x3 (2 Remaining)' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
				else
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "Scene3_3" + cooldownFileSuffix + CategoryIconSuffix + "' title='Scene x3 (3 Remaining)' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}3
			}

			else if(currentFrequency == "Daily")
			{
				if( Number(currentUseCount) >= 1 )
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "daily1_0" + cooldownFileSuffix + CategoryIconSuffix + "' title='Daily x1 (0 Remaining)' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
				else
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "daily1_1" + cooldownFileSuffix + CategoryIconSuffix + "' title='Daily x1 (1 Remaining)' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
			}

			else if(currentFrequency == "Daily x2")
			{
				if( Number(currentUseCount) >= 2 )
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "daily2_0" + cooldownFileSuffix + CategoryIconSuffix + "' title='Daily x2 (0 Remaining)' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
				else if( Number(currentUseCount) == 1 )
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "daily2_1" + cooldownFileSuffix + CategoryIconSuffix + "' title='Daily x2 (1 Remaining)' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
				else
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "daily2_2" + cooldownFileSuffix + CategoryIconSuffix + "' title='Daily x2 (2 Remaining)' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
			}

			else if(currentFrequency == "Daily x3")
			{
				if( Number(currentUseCount) >= 3 )
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "daily3_0" + cooldownFileSuffix + CategoryIconSuffix + "' title='Daily x3 (0 Remaining)' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
				else if( Number(currentUseCount) == 2 )
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "daily3_1" + cooldownFileSuffix + CategoryIconSuffix + "' title='Daily x3 (1 Remaining)' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
				else if( Number(currentUseCount) == 1 )
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "daily3_2" + cooldownFileSuffix + CategoryIconSuffix + "' title='Daily x3 (2 Remaining)' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
				else
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "daily3_3" + cooldownFileSuffix + CategoryIconSuffix + "' title='Daily x3 (3 Remaining)' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
			}

			if(currentlabel == ""){
			currentlabel=item.name;
			}
			var currenttype=item.type;
			var currentCategory=item_data.category;
			var effectivenessBackgroundColor = "darkgrey"
			var effectivenessTextColor = "black";
			var effectivenessText = "";
			let effectiveness = {"Normal":1, "Fire":1, "Water":1, "Electric":1, "Grass":1, "Ice":1, "Fighting":1, "Poison":1, "Ground":1, "Flying":1, "Psychic":1, "Bug":1, "Rock":1, "Ghost":1, "Dragon":1, "Dark":1, "Steel":1, "Fairy":1 };

			if(!target)
			{
				target = game.actors.get(actor.id).getActiveTokens()[0];
			}

			if(target.actor.data.data.effectiveness)
			{
				effectiveness = target.actor.data.data.effectiveness.All;
			}

			if(currenttype=="move" && (currentCategory == "Status"))
			{
				if( (game.settings.get("PTUMoveMaster", "showEffectiveness") != "never") && (target) && (!isNaN(item_data.damageBase)) && (item_data.damageBase != "") && effectiveness)
				{
					if((target.data.disposition > DISPOSITION_HOSTILE) || (game.settings.get("PTUMoveMaster", "showEffectiveness") == "always") )
					{
						currentEffectivenessLabel = " (x"+effectiveness[item_data.type]+")";
						if (effectiveness[item_data.type] == 0.5)
						{
							effectivenessBackgroundColor = "#cc6666";
						}
						else if (effectiveness[item_data.type] == 1)
						{
							effectivenessBackgroundColor = "white";
							effectivenessTextColor = "black";
						}
						else if (effectiveness[item_data.type] == 0.25)
						{
							effectivenessBackgroundColor = "red";
							effectivenessTextColor = "white";
						}
						else if (effectiveness[item_data.type] == 0)
						{
							effectivenessBackgroundColor = "black";
							effectivenessTextColor = "white";
						}
						else if (effectiveness[item_data.type] < 0.25)
						{
							effectivenessBackgroundColor = "darkred";
							effectivenessTextColor = "white";
						}
						else if (effectiveness[item_data.type] == 1.5)
						{
							effectivenessBackgroundColor = "#6699cc";//"#3399ff";
							effectivenessTextColor = "black";
						}
						else if (effectiveness[item_data.type] > 1.5)
						{
							effectivenessBackgroundColor = "blue";
							effectivenessTextColor = "white";
						}
						if(game.settings.get("PTUMoveMaster", "showEffectivenessText") == "true")
						{
							effectivenessText = "<span style='font-size:30px'> / x "+(effectiveness[item_data.type].toString())+"</span>";
						}
					}
				}

				let currentMoveTypeLabel = "<div><img src='" + AlternateIconPath + item_data.category + CategoryIconSuffix + "' style='width:80px height:auto border:0px ! important;width:"+TypeIconWidth+"px;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img><img src='" + AlternateIconPath + item_data.type + TypeIconSuffix + "' style='width:80px height:auto border:0px ! important;width:"+TypeIconWidth+"px;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img></div>";
				if(item_data.type == "Untyped" || item_data.type == "" || item_data.type == null)
				{
					currentMoveTypeLabel = "<div><img src='" + AlternateIconPath + item_data.category + CategoryIconSuffix + "' style='width:80px height:auto border:0px ! important;width:"+TypeIconWidth+"px;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img><img src='" + AlternateIconPath + "Untyped" + TypeIconSuffix + "' style='width:80px height:auto border:0px ! important;width:"+TypeIconWidth+"px;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img></div>";
				}
				
				let move_action = "Standard";
				if(item_data.name == "Splash")
				{
					move_action = "Shift"
				}
				let rangeIconReturn = game.PTUMoveMaster.GetRangeIcons(item_data.range, move_action);
				let currentMoveRange = rangeIconReturn[0];
				let currentMoveRangeIcon = rangeIconReturn[1];

				let currentMoveFiveStrike = false;
				let currentMoveDoubleStrike = false;


				// buttons[currentid]={label: "<center><div style='background-color:"+ effectivenessBackgroundColor +";color:"+ effectivenessTextColor +";border:2px solid black;width:130px;height:130px;font-size:10px;'>"+currentCooldownLabel+""+"<h3>"+currentlabel+currentMoveTypeLabel+"</h3>"+"<h5>"+currentMoveRangeIcon+"</h5>"+currentEffectivenessLabel+"</div></center>",
				buttons[currentid]={
					id:currentid,
					style:"padding-left: 0px;border-right-width: 0px;border-bottom-width: 0px;border-left-width: 0px;border-top-width: 0px;margin-right: 0px;",
					label: "<center><div style='background-color:"+ MoveButtonBackgroundColor +";color:"+ MoveButtonTextColor +";border-left:"+EffectivenessBorderThickness+"px solid; border-color:"+effectivenessBackgroundColor+"; padding-left: 0px ;width:200px;height:"+ButtonHeight+"px;font-size:24px;font-family:Modesto Condensed;line-height:0.6'><h3 style='padding: 0px;font-family:Modesto Condensed;font-size:24px; color: white; background-color: #272727 ; overflow-wrap: normal ! important; word-break: keep-all ! important;'><div style='padding-top:5px' title='"+(item_data.effect).replace("'","&#39;")+"'>"+currentlabel+"</div>"+currentCooldownLabel+currentMoveTypeLabel+"</h3>"+"<h6 style='padding-top: 4px;padding-bottom: 0px;font-size:"+RangeFontSize+"px;'>"+currentMoveRangeIcon+effectivenessText+"</h6>"+"</div></center>",
					callback: async () => {

						if(!ThisPokemonsTrainerCommandCheck(actor))
						{
							game.PTUMoveMaster.chatMessage(actor, "But they did not obey!")
							return;
						}
						let key_shift = keyboard.isDown("Shift");
						// if (key_shift) 
						// {
						// 	console.log("KEYBOARD SHIFT IS DOWN!");
						// }

						AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+UIButtonClickSound, volume: 0.5, autoplay: true, loop: false}, true);
						console.log("STATUS MOVE: item.data.data = ");
						console.log(item.data.data);
						let diceRoll = await PerformFullAttack (actor,item.data.data, item.name);

						if(game.combat == null)
						{
							var currentRound = 0;
							var currentEncounterID = 0;
						}
						else
						{
							var currentRound = game.combat.round;
							var currentEncounterID = game.combat.data._id;
						}

						if(item_data.UseCount == null)
						{
							for(let search_item of item_entities)
							{
								if (search_item.id == item.id)
								{
									await search_item.update({ "data.UseCount": 0});
								}
							}
						}

						if(item_data.frequency == "Daily" || item_data.frequency == "Daily x2" || item_data.frequency == "Daily x3" || item_data.frequency == "Scene" || item_data.frequency == "Scene x2" || item_data.frequency == "Scene x3")
						{
							for(let search_item of item_entities)
							{
								if (search_item.id == item.id)
								{

									await search_item.update({ "data.UseCount": Number(item_data.UseCount + 1)});
								}
							}
						}

						for(let search_item of item_entities)
							{
								if (search_item.id == item.id)
								{
									await search_item.update({ "data.LastRoundUsed": currentRound, "data.LastEncounterUsed": currentEncounterID});

									if( (typeStrategist.length > 0) && (typeStrategist.indexOf(item_data.type) > -1) )
									{
										let oneThirdMaxHealth = Number(actor.data.data.health.max / 3);
										let currentDR = (actor.data.data.health.value < oneThirdMaxHealth ? 10 : 5);
										// console.log("DEBUG: Type Strategist: " + item_data.type + ", activated on round " + currentRound + ", HP = " + actor.data.data.health.value + "/" + actor.data.data.health.max + " (" + Number(actor.data.data.health.value / actor.data.data.health.max)*100 + "%; DR = " + currentDR);
										await actor.update({ "data.TypeStrategistLastRoundUsed": currentRound, "data.TypeStrategistLastEncounterUsed": currentEncounterID, "data.TypeStrategistLastTypeUsed": item_data.type, "data.TypeStrategistDR": currentDR});
									}
								}
							}

						for(let searched_move in move_stage_changes)
						{
							if(searched_move == item.name)
							{
								if(move_stage_changes[searched_move]["roll-trigger"] != null) // Effect Range Check
								{
									let effectThreshold = move_stage_changes[searched_move]["roll-trigger"];

									if(diceRoll >= effectThreshold) // Effect Range Hit
									{
										for (let searched_stat of stats)
										{
											if (move_stage_changes[searched_move][searched_stat] != null)
											{
												adjustActorStage(actor,searched_stat, move_stage_changes[searched_move][searched_stat]);
											}
										}
										if(move_stage_changes[searched_move]["pct-healing"] != null)
										{
											healActorPercent(actor,move_stage_changes[searched_move]["pct-healing"]);
										}
										if(move_stage_changes[searched_move]["pct-self-damage"] != null)
										{
											damageActorPercent(actor,move_stage_changes[searched_move]["pct-self-damage"]);
										}
										if(move_stage_changes[searched_move]["weather"] != null)
										{
											game.PTUMoveMaster.SetCurrentWeather(move_stage_changes[searched_move]["weather"]);
										}
									}
									else // Effect Range Missed
									{
										// console.log("Move Trigger Range Missed: " + diceRoll + "vs " + effectThreshold);
									}
								}
								else // No Effect Range
								{
									for (let searched_stat of stats)
									{
										if (move_stage_changes[searched_move][searched_stat] != null)
										{
											adjustActorStage(actor,searched_stat, move_stage_changes[searched_move][searched_stat]);
										}
									}
									if(move_stage_changes[searched_move]["pct-healing"] != null)
									{
										healActorPercent(actor,move_stage_changes[searched_move]["pct-healing"]);
									}
									if(move_stage_changes[searched_move]["pct-self-damage"] != null)
									{
										damageActorPercent(actor,move_stage_changes[searched_move]["pct-self-damage"]);
									}
									if(move_stage_changes[searched_move]["weather"] != null)
									{
										game.PTUMoveMaster.SetCurrentWeather(move_stage_changes[searched_move]["weather"]);
									}
								}
								
							}
						}

					}

				}

			}

			i++;
		} // END STATUS MOVE LOOP

		for(let item of items) // START DAMAGE MOVE LOOP
		{
			var item_data = item.data.data;
			var currentid=item.id;
			var currentlabel=item.data.name;
			var currentCooldownLabel = "";
			var currentEffectivenessLabel = "";

			var currentFrequency=item_data.frequency;
			if(!currentFrequency)
			{
				currentFrequency = "";
			}
			
			if((item_data.LastRoundUsed == null || item_data.LastEncounterUsed == null ) && (currentFrequency.search("EOT") > -1 || currentFrequency.search("Scene") > -1 || currentFrequency.search("Daily") > -1))
			{
				for(let search_item of item_entities)
				{
					if (search_item.id == item.id)
					{
						await search_item.update({ "data.LastRoundUsed" : -2});
						await search_item.update({ "data.LastEncounterUsed": 0});
					}
				}
			}

			var currentLastRoundUsed = item_data.LastRoundUsed;
			var currentLastEncounterUsed = item_data.LastEncounterUsed;

			if(item_data.UseCount == null)
			{
				for(let search_item of item_entities)
				{
					if (search_item.id == item.id)
					{
						await search_item.update({ "data.UseCount": 0});
					}
				}
				// item.update({ "data.UseCount": Number(0)});
			}

			var currentUseCount = item_data.UseCount;
			var cooldownFileSuffix = "";

			if( (Number(currentRound - currentLastRoundUsed) < 2) && (currentEncounterID == currentLastEncounterUsed) )
				{
					cooldownFileSuffix = "_CD"
				}

			if(currentFrequency == "At-Will" || currentFrequency == "")
			{
				currentCooldownLabel = "<img src='" + AlternateIconPath + "AtWill" + CategoryIconSuffix + "' title='At-Will' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
			}

			else if(currentFrequency == "EOT")
			{
				if( (Number(currentRound - currentLastRoundUsed) < 2) && (currentEncounterID == currentLastEncounterUsed) )
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "EOT_0" + CategoryIconSuffix + "' title='Every Other Turn (On Cooldown)' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
				else
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "EOT_1" + CategoryIconSuffix + "' title='Every Other Turn (Ready)' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
			}

			else if(currentFrequency == "Scene")
			{
				if( Number(currentUseCount) >= 1 )
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "Scene1_0" + cooldownFileSuffix + CategoryIconSuffix + "' title='Scene x1 (0 Remaining)' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
				else
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "Scene1_1" + cooldownFileSuffix + CategoryIconSuffix + "' title='Scene x1 (1 Remaining)' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
			}

			else if(currentFrequency == "Scene x2")
			{
				if( Number(currentUseCount) >= 2 )
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "Scene2_0" + cooldownFileSuffix + CategoryIconSuffix + "' title='Scene x2 (0 Remaining)' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
				else if( Number(currentUseCount) == 1 )
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "Scene2_1" + cooldownFileSuffix + CategoryIconSuffix + "' title='Scene x2 (1 Remaining)' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
				else
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "Scene2_2" + cooldownFileSuffix + CategoryIconSuffix + "' title='Scene x2 (2 Remaining)' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
			}

			else if(currentFrequency == "Scene x3")
			{
				if( Number(currentUseCount) >= 3 )
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "Scene3_0" + cooldownFileSuffix + CategoryIconSuffix + "' title='Scene x3 (0 Remaining)' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
				else if( Number(currentUseCount) == 2 )
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "Scene3_1" + cooldownFileSuffix + CategoryIconSuffix + "' title='Scene x3 (1 Remaining)' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
				else if( Number(currentUseCount) == 1 )
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "Scene3_2" + cooldownFileSuffix + CategoryIconSuffix + "' title='Scene x3 (2 Remaining)' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
				else
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "Scene3_3" + cooldownFileSuffix + CategoryIconSuffix + "' title='Scene x3 (3 Remaining)' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}3
			}

			else if(currentFrequency == "Daily")
			{
				if( Number(currentUseCount) >= 1 )
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "daily1_0" + cooldownFileSuffix + CategoryIconSuffix + "' title='Daily x1 (0 Remaining)' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
				else
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "daily1_1" + cooldownFileSuffix + CategoryIconSuffix + "' title='Daily x1 (1 Remaining)' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
			}

			else if(currentFrequency == "Daily x2")
			{
				if( Number(currentUseCount) >= 2 )
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "daily2_0" + cooldownFileSuffix + CategoryIconSuffix + "' title='Daily x2 (0 Remaining)' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
				else if( Number(currentUseCount) == 1 )
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "daily2_1" + cooldownFileSuffix + CategoryIconSuffix + "' title='Daily x2 (1 Remaining)' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
				else
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "daily2_2" + cooldownFileSuffix + CategoryIconSuffix + "' title='Daily x2 (2 Remaining)' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
			}

			else if(currentFrequency == "Daily x3")
			{
				if( Number(currentUseCount) >= 3 )
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "daily3_0" + cooldownFileSuffix + CategoryIconSuffix + "' title='Daily x3 (0 Remaining)' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
				else if( Number(currentUseCount) == 2 )
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "daily3_1" + cooldownFileSuffix + CategoryIconSuffix + "' title='Daily x3 (1 Remaining)' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
				else if( Number(currentUseCount) == 1 )
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "daily3_2" + cooldownFileSuffix + CategoryIconSuffix + "' title='Daily x3 (2 Remaining)' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
				else
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "daily3_3" + cooldownFileSuffix + CategoryIconSuffix + "' title='Daily x3 (3 Remaining)' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
			}

			if(currentlabel == ""){
			currentlabel=item.name;
			}
			var currenttype=item.type;
			var currentCategory = item_data.category;
			var effectivenessBackgroundColor = "darkgrey"
			var effectivenessTextColor = "black";
			var effectivenessText = "";
			let effectiveness = {"Normal":1, "Fire":1, "Water":1, "Electric":1, "Grass":1, "Ice":1, "Fighting":1, "Poison":1, "Ground":1, "Flying":1, "Psychic":1, "Bug":1, "Rock":1, "Ghost":1, "Dragon":1, "Dark":1, "Steel":1, "Fairy":1 };

			if(target.actor.data.data.effectiveness)
			{
				effectiveness = target.actor.data.data.effectiveness.All;
			}
			if(currenttype=="move" && (currentCategory == "Physical" || currentCategory == "Special"))
			{
				if( (game.settings.get("PTUMoveMaster", "showEffectiveness") != "never") && (target) && (!isNaN(item_data.damageBase)) && (item_data.damageBase != "") && effectiveness)
				{
					if((target.data.disposition > DISPOSITION_HOSTILE) || (game.settings.get("PTUMoveMaster", "showEffectiveness") == "always") )
					{
						currentEffectivenessLabel = " (x"+effectiveness[item_data.type]+")";
						if (effectiveness[item_data.type] == 0.5)
						{
							effectivenessBackgroundColor = "#cc6666";
						}
						else if (effectiveness[item_data.type] == 1)
						{
							effectivenessBackgroundColor = "white";
							effectivenessTextColor = "black";
						}
						else if (effectiveness[item_data.type] == 0.25)
						{
							effectivenessBackgroundColor = "red";
							effectivenessTextColor = "white";
						}
						else if (effectiveness[item_data.type] == 0)
						{
							effectivenessBackgroundColor = "black";
							effectivenessTextColor = "white";
						}
						else if (effectiveness[item_data.type] < 0.25)
						{
							effectivenessBackgroundColor = "darkred";
							effectivenessTextColor = "white";
						}
						else if (effectiveness[item_data.type] == 1.5)
						{
							effectivenessBackgroundColor = "#6699cc";//"#3399ff";
							effectivenessTextColor = "black";
						}
						else if (effectiveness[item_data.type] > 1.5)
						{
							effectivenessBackgroundColor = "blue";
							effectivenessTextColor = "white";
						}
						if(game.settings.get("PTUMoveMaster", "showEffectivenessText") == "true")
						{
							effectivenessText = "<span style='font-size:30px'> / x "+(effectiveness[item_data.type].toString())+"</span>";
						}
					}
				}

				let currentMoveTypeLabel = "<div><img src='" + AlternateIconPath + item_data.category + CategoryIconSuffix + "' style='width:100px height:auto border:0px ! important;width:"+TypeIconWidth+"px;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img><img src='" + AlternateIconPath + item_data.type + TypeIconSuffix + "' style='width:100px height:auto border:0px ! important;width:"+TypeIconWidth+"px;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img></div>";
				if(item_data.type == "Untyped" || item_data.type == "" || item_data.type == null)
				{
					// currentMoveTypeLabel = "<div><img src='" + AlternateIconPath + item_data.category + CategoryIconSuffix + "' width=80px height=auto></img></div>";
					currentMoveTypeLabel = "<div><img src='" + AlternateIconPath + item_data.category + CategoryIconSuffix + "' style='width:100px height:auto border:0px ! important;width:"+TypeIconWidth+"px;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img><img src='" + AlternateIconPath + "Untyped" + TypeIconSuffix + "' style='width:100px height:auto border:0px ! important;width:"+TypeIconWidth+"px;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img></div>";
				}

				let move_action = "Standard";
				if(item_data.name == "Splash")
				{
					move_action = "Shift"
				}
				let rangeIconReturn = game.PTUMoveMaster.GetRangeIcons(item_data.range, move_action);
				let currentMoveRange = rangeIconReturn[0];
				let currentMoveRangeIcon = rangeIconReturn[1];

				let currentMoveFiveStrike = false;
				let currentMoveDoubleStrike = false;

				if(currentMoveRange.search("Five Strike") > -1)
				{
					// console.log("DEBUG: FIVE STRIKE FOUND!");
					currentMoveFiveStrike = true;
				}

				if( (currentMoveRange.search("Doublestrike") > -1) || (currentMoveRange.search("Double Strike") > -1) )
				{
					// console.log("DEBUG: DOUBLE STRIKE FOUND!");
					currentMoveDoubleStrike = true;
				}

				let STABBorderImage = "";
				let DBBorderImage = "";
				let finalDB = 0;
				let actorData = actor.data.data;
				let moveData = item_data;

				let isFiveStrike = false;
				let isDoubleStrike = false;
				let userHasTechnician = false;
				let userHasAdaptability = false;
				let fiveStrikeCount = 0;
				let hasSTAB = false;
				let hitCount = 1;

				let actorType1 = null;
				let actorType2 = null;

				if(actor.data.data.typing)
				{
					actorType1 = actor.data.data.typing[0];
					actorType2 = actor.data.data.typing[1];
				}

				let currentHasExtraEffect = false;
				let currentExtraEffectText = "";

				for(let search_item of actor.items)
				{
					// console.log(search_item.name);
					if(search_item.name == "Technician")
					{
						userHasTechnician = true;
					}
					if(search_item.name == "Adaptability")
					{
						userHasAdaptability = true;
					}
				}

				if (moveData.damageBase.toString().match(/^[0-9]+$/) != null) 
				{
					let db = parseInt(moveData.damageBase);
					let damageBase;
					let damageBaseOriginal;
					let dbRoll;
					let dbRollOriginal;
					let technicianDBBonus = 0;
					let STABBonus = 2;
					let actorType1 = null;
					let actorType2 = null;
		
					if(actorData.typing)
					{
						actorType1 = actorData.typing[0];
						actorType2 = actorData.typing[1];
					}
		
					if(userHasTechnician && ( isDoubleStrike || isFiveStrike || (moveData.damageBase <= 6) ) )
					{
						technicianDBBonus = 2;
					}
		
					if(userHasAdaptability)
					{
						STABBonus = 3;
					}

					if(moveData.name.toString().match(/Stored Power/) != null) // Increase DB if move is one that scales like Stored Power, et. al.
					{
						let atk_stages = actorData.stats.atk.stage < 0 ? 0 : actorData.stats.atk.stage;
						let spatk_stages = actorData.stats.spatk.stage < 0 ? 0 : actorData.stats.spatk.stage;
						let def_stages = actorData.stats.def.stage < 0 ? 0 : actorData.stats.def.stage;
						let spdef_stages = actorData.stats.spdef.stage < 0 ? 0 : actorData.stats.spdef.stage;
						let spd_stages = actorData.stats.spd.stage < 0 ? 0 : actorData.stats.spd.stage;

						let db_from_stages = ( (atk_stages + spatk_stages + def_stages + spdef_stages + spd_stages) * 2 );

						damageBase = (
							moveData.type == actorType1 || moveData.type == actorType2) ? 
							Math.min(db*(hitCount + fiveStrikeCount) + db_from_stages, 20) + STABBonus + technicianDBBonus : 
							Math.min(db*(hitCount + fiveStrikeCount) + db_from_stages, 20) + technicianDBBonus;

						damageBaseOriginal = (
							moveData.type == actorType1 || moveData.type == actorType2) ? 
							Math.min(db + db_from_stages, 20) + STABBonus + technicianDBBonus : 
							Math.min(db + db_from_stages, 20) + technicianDBBonus;
						
						dbRoll = game.ptu.DbData[damageBase];
						dbRollOriginal = game.ptu.DbData[damageBaseOriginal];
					}
					else if(moveData.name.toString().match(/Punishment/) != null) // Increase DB if move is one that scales like Punishment, et. al.
					{
						let atk_stages = actorData.stats.atk.stage < 0 ? 0 : actorData.stats.atk.stage;
						let spatk_stages = actorData.stats.spatk.stage < 0 ? 0 : actorData.stats.spatk.stage;
						let def_stages = actorData.stats.def.stage < 0 ? 0 : actorData.stats.def.stage;
						let spdef_stages = actorData.stats.spdef.stage < 0 ? 0 : actorData.stats.spdef.stage;
						let spd_stages = actorData.stats.spd.stage < 0 ? 0 : actorData.stats.spd.stage;

						let db_from_stages = ( (atk_stages + spatk_stages + def_stages + spdef_stages + spd_stages) * 1 );

						damageBase = (
							moveData.type == actorType1 || moveData.type == actorType2) ? 
							Math.min(db*(hitCount + fiveStrikeCount) + db_from_stages, 12) + STABBonus + technicianDBBonus : 
							Math.min(db*(hitCount + fiveStrikeCount) + db_from_stages, 12) + technicianDBBonus;

						damageBaseOriginal = (
							moveData.type == actorType1 || moveData.type == actorType2) ? 
							Math.min(db + db_from_stages, 20) + STABBonus + technicianDBBonus : 
							Math.min(db + db_from_stages, 20) + technicianDBBonus;
						
						dbRoll = game.ptu.DbData[damageBase];
						dbRollOriginal = game.ptu.DbData[damageBaseOriginal];
					}
					else
					{
						damageBase = (
							moveData.type == actorType1 || moveData.type == actorType2) ? 
							db*(hitCount + fiveStrikeCount) + STABBonus + technicianDBBonus : 
							db*(hitCount + fiveStrikeCount) + technicianDBBonus;

						damageBaseOriginal = (
							moveData.type == actorType1 || moveData.type == actorType2) ? 
							db + STABBonus + technicianDBBonus : 
							db + technicianDBBonus;

						dbRoll = game.ptu.DbData[damageBase];
						dbRollOriginal = game.ptu.DbData[damageBaseOriginal];
					}

					finalDB = damageBase;

					DBBorderImage = '<div class="col" style="padding: 0px ! important;"><span class="type-img"><img title="Damage Base '+finalDB+'" src="/modules/PTUMoveMaster/images/icons/DividerIcon_DB'+finalDB+'.png" style="width: 248px; height: auto; padding: 0px ! important;"></span></div>';
				}
				
				// if(moveData.damageBase)
				// {
				// 	DBBorderImage = '<div class="col" style="padding: 0px ! important;"><span class="type-img"><img src="/modules/PTUMoveMaster/images/icons/DividerIcon_DB'+damageBase+'.png" style="width: 248px; height: auto; padding: 0px ! important;"></span></div>';
				// }

				if(actor.data.data.typing)
				{
					if(item_data.type == actor.data.data.typing[0] || item_data.type == actor.data.data.typing[1])
					{
						STABBorderImage = '<div class="col" style="padding: 0px ! important;"><span class="type-img"><img src="/modules/PTUMoveMaster/images/icons/STAB_Border.png" style="width: 248px; height: 1px; padding: 0px ! important;"></img></span></div>';
					}
				}

				// buttons[currentid]={label: "<center><div style='background-color:"+ effectivenessBackgroundColor +";color:"+ effectivenessTextColor +";border:2px solid black;width:130px;height:130px;font-size:10px;'>"+currentCooldownLabel+""+"<h3>"+currentlabel+currentMoveTypeLabel+"</h3>"+"<h5>"+currentMoveRangeIcon+"</h5>"+currentEffectivenessLabel+"</div></center>",
				buttons[currentid]={
					id:currentid, 
					label: "<center><div style='background-color:"+ MoveButtonBackgroundColor +";color:"+ MoveButtonTextColor +";border-left:"+EffectivenessBorderThickness+"px solid; border-color:"+effectivenessBackgroundColor+"; padding-left: 0px ;width:200px;height:"+Number(ButtonHeight+3)+"px;font-size:24px;font-family:Modesto Condensed;line-height:0.6'><h3 style='padding: 0px;font-family:Modesto Condensed;font-size:24px; color: white; background-color: #272727 ; overflow-wrap: normal ! important; word-break: keep-all ! important;'><div style='padding-top:5px' title='"+(item_data.effect).replace("'","&#39;")+"'>"+currentlabel+"</div>"+currentCooldownLabel+currentMoveTypeLabel+"</h3>"+STABBorderImage+DBBorderImage+"<h6 style='padding-top: 4px;padding-bottom: 0px;font-size:"+RangeFontSize+"px;'>"+currentMoveRangeIcon+effectivenessText+"</h6>"+"</div></center>",
					//label: "<center style='padding: 0px'><div style='background-color:"+ effectivenessBackgroundColor +";color:"+ effectivenessTextColor +";border:2px solid black; padding: 0px ;width:167px;height:95px;font-size:20px;font-family:Modesto Condensed;line-height:0.8'><h6>"+currentCooldownLabel+"</h6>"+"<h3 style='padding: 1px;font-family:Modesto Condensed;font-size:20px; color: white; background-color: #272727 ; overflow-wrap: normal ! important; word-break: keep-all ! important;'>"+currentlabel+DBBorderImage+STABBorderImage+currentMoveTypeLabel+"</h3>"+"<h6>"+currentMoveRangeIcon+"</h6>"+"</div></center>",
					callback: async () => {
						if(!ThisPokemonsTrainerCommandCheck(actor))
						{
							game.PTUMoveMaster.chatMessage(actor, "But they did not obey!")
							return;
						}
						let key_shift = keyboard.isDown("Shift");
						if (key_shift) 
						{
							rollDamageMoveWithBonus(actor , item, finalDB, typeStrategist);
						}
						else
						{
							game.PTUMoveMaster.RollDamageMove(actor, item, item.name, finalDB, typeStrategist, 0);
						}
						

						}

					}

			}

			i++;
		} // END DAMAGE MOVE LOOP


		buttons["resetEOT"] = {id:"resetEOT", label: ResetEOTMark,
			callback: async () => {
				AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+UIButtonClickSound, volume: 0.5, autoplay: true, loop: false}, true);
				game.PTUMoveMaster.resetEOTMoves(actor);
		}};

		buttons["resetScene"] = {id:"resetScene", label: ResetSceneMark,
			callback: async () => {
				AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+UIButtonClickSound, volume: 0.5, autoplay: true, loop: false}, true);
				game.PTUMoveMaster.resetSceneMoves(actor);
		}};

		buttons["resetDaily"] = {id:"resetDaily", label: ResetDailyMark,
		callback: async () => {
				AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+UIButtonClickSound, volume: 0.5, autoplay: true, loop: false}, true);
				game.PTUMoveMaster.resetDailyMoves(actor);
		}};

		buttons["resetStandard"] = {id:"resetStandard", label: ResetStandardMark,
		callback: async () => {
				AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+UIButtonClickSound, volume: 0.5, autoplay: true, loop: false}, true);
				game.PTUMoveMaster.resetStandardAction(actor);
		}};

		buttons["resetShift"] = {id:"resetShift", label: ResetShiftMark,
		callback: async () => {
				AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+UIButtonClickSound, volume: 0.5, autoplay: true, loop: false}, true);
				game.PTUMoveMaster.resetShiftAction(actor);
		}};

		buttons["resetSwift"] = {id:"resetSwift", label: ResetSwiftMark,
		callback: async () => {
				AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+UIButtonClickSound, volume: 0.5, autoplay: true, loop: false}, true);
				game.PTUMoveMaster.resetSwiftAction(actor);
		}};


		buttons["refreshersDivider"] = {noRefresh: true, id:"refreshersDivider", label: "<img src='"+AlternateIconPath+"Divider.png' style='border:none; width:200px;'>",
		callback: () => {

		}};

		buttons["tickDamage_reset"] = {id:"tickDamage_reset", label: TickDamageMark,
			callback: async () => {

				AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+UIButtonClickSound, volume: 0.5, autoplay: true, loop: false}, true);
				game.PTUMoveMaster.damageActorTick(actor);
		}};

		buttons["tickHeal_reset"] = {id:"tickHeal_reset", label: TickHealMark,
		callback: async () => {

			AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+UIButtonClickSound, volume: 0.5, autoplay: true, loop: false}, true);
			game.PTUMoveMaster.healActorTick(actor);
		}};

		buttons["rest_reset"] = {id:"rest_reset", label: RestMark,
		callback: async () => {

			AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+UIButtonClickSound, volume: 0.5, autoplay: true, loop: false}, true);
			game.PTUMoveMaster.healActorRestPrompt(actor);
		}};

		let dialogueID = "ptu-sidebar";
		
		let content = "<style> #"+dialogueID+" .dialog-buttons {background-color:"+ MoveButtonBackgroundColor +";flex-direction: column; padding: 0px !important; border-width: 0px !important; margin: 0px !important; border: none !important;} #"+dialogueID+" .dialog-button {background-color:"+ MoveButtonBackgroundColor +";flex-direction: column; padding: 0px !important; border-width: 0px !important; margin-top: 3px !important; margin-bottom: 3px !important; margin-left: 0px !important; margin-right: 0px !important; border: none !important; width: 200px} #"+dialogueID+" .dialog-content {background-color:"+ MoveButtonBackgroundColor +";flex-direction: column; padding: 0px !important; border-width: 0px !important; margin: 0px !important; width: 200px !important; height: auto !important;} #"+dialogueID+" .window-content {;flex-direction: column; padding: 0px !important; border-width: 0px !important; margin: 0px !important; width: 200px !important;} #"+dialogueID+".app.window-app.MoveMasterSidebarDialog {background-color:"+ MoveButtonBackgroundColor +";flex-direction: column; padding: 0px !important; border-width: 0px !important; margin: 0px !important; width: 200px !important;}</style><center><div style='"+background_field+";font-family:Modesto Condensed;font-size:20px'><h2 style='margin-bottom: 10px;'>"+ targetTypingText+"</h2></div></center>";
		let sidebar = new game.PTUMoveMaster.SidebarForm({content, buttons, dialogueID, classes: "ptu-sidebar"});
		
		sidebar.render(true);
	};


	async function rollDamageMoveWithBonus(actor , item, finalDB, typeStrategist)
	{
		let form = new game.PTUMoveMaster.MoveMasterBonusDamageOptions({actor , item, finalDB, typeStrategist}, {"submitOnChange": false, "submitOnClose": false});
		form.render(true);
	}


	return {
	ChatWindow:ChatWindow,
	ApplyDamage:ApplyDamage
	}

};


export async function applyDamageWithBonusDR(event, bonusDamageReduction)
	{
		var initial_damage_total=event.currentTarget.dataset.damage;
		var damage_category=event.currentTarget.dataset.category;
		var damage_type=event.currentTarget.dataset.type;
		var mode=event.currentTarget.dataset.mode;
		var crit=event.currentTarget.dataset.crit;
		let damageSoundFile = "";

		for(let token of canvas.tokens.controlled)
		{
			let def = token.actor.data.data.stats.def.total
			let spdef = token.actor.data.data.stats.spdef.total
			let extraDR = 0;
			let extraDRSource = "";

			var flavor;
			var postEffectNotes = "";
			var extraDRNotes = "";

			let effectiveness = {"Normal":1, "Fire":1, "Water":1, "Electric":1, "Grass":1, "Ice":1, "Fighting":1, "Poison":1, "Ground":1, "Flying":1, "Psychic":1, "Bug":1, "Rock":1, "Ghost":1, "Dragon":1, "Dark":1, "Steel":1, "Fairy":1 };

			if(token.actor.data.data.effectiveness)
			{
				effectiveness = token.actor.data.data.effectiveness.All;
			}

			let this_moves_effectiveness = effectiveness[damage_type];
			if (isNaN(this_moves_effectiveness) || this_moves_effectiveness == null)
			{
				this_moves_effectiveness = 1;
				damage_type = "Untyped";
			}

			if(game.combat == null)
			{
				var currentRound = 0;
				var currentEncounterID = 0;
			}
			else
			{
				var currentRound = game.combat.round;
				var currentEncounterID = game.combat.data.id;
			}

			if( (currentRound - token.actor.data.data.TypeStrategistLastRoundUsed <= 1) && (currentEncounterID == token.actor.data.data.TypeStrategistLastEncounterUsed) )
			{
				extraDR = Number(Number(extraDR) + Number(token.actor.data.data.TypeStrategistDR));
				extraDRSource = extraDRSource + "Type Strategist, " + token.actor.data.data.TypeStrategistLastTypeUsed + ", ";
				extraDRNotes = "(including +" + extraDR + " DR from " + extraDRSource + ")";
			}

			if(crit=="true")
			{
				flavor = "Critical Hit! ("+"+"+bonusDamageReduction+" Extra DR) ";
				damageSoundFile = "Hit%20Super%20Effective.mp3";
			}
			else
			{
				flavor = "Hit! ("+"+"+bonusDamageReduction+" Extra DR) ";
				damageSoundFile = "Hit%20Normal%20Damage.mp3";
			}

			
			if(mode=="resist")
			{
				flavor+="(resisted 1 step) "
				let old_effectiveness=this_moves_effectiveness;
				if(old_effectiveness > 1)
				{
					this_moves_effectiveness=this_moves_effectiveness - .5;
				}
				else
				{
					this_moves_effectiveness=Number(this_moves_effectiveness /2);
				}
			}

			if(damage_category == "Physical")
			{
				var DR = def + extraDR + bonusDamageReduction;
			}
			if(damage_category == "Special")
			{
				var DR = spdef + extraDR + bonusDamageReduction;
			}
			if(mode=="half")
			{
				flavor+="(1/2 damage) ";
				initial_damage_total=Number(initial_damage_total/2);
			}

			var defended_damage = Number(Number(initial_damage_total) - Number(DR));
			var final_effective_damage = Math.max(Math.floor(Number(defended_damage)*Number(this_moves_effectiveness)), 0);

			if(mode=="flat")
			{
				flavor+="(flat damage) ";
				final_effective_damage = initial_damage_total;
				defended_damage = 0;
				this_moves_effectiveness = 1;
			}
			// ui.notifications.info(flavor + initial_damage_total + " Damage! "+ token.actor.name + "'s " + damage_category + " defense" + extraDRNotes + " is " + DR + ", reducing the incoming damage to "+defended_damage+", and their defensive effectiveness against " + damage_type + " is x" + effectiveness + "; They take " + final_effective_damage + " damage after effectiveness and defenses.");

			chatMessage(token, flavor + initial_damage_total + " Damage! "+ token.actor.name + "'s " + damage_category + " defense (after extra DR)" + extraDRNotes + " is " + DR + ", reducing the incoming damage to "+defended_damage+", and their defensive effectiveness against " + damage_type + " is x" + this_moves_effectiveness + "; They take " + final_effective_damage + " damage after effectiveness and defenses.");

			// token.actor.update({'data.health.value': Number(token.actor.data.data.health.value - final_effective_damage) });
			token.actor.modifyTokenAttribute("health", (-final_effective_damage), true, true);

			ApplyInjuries(token.actor, final_effective_damage);
			
		}
		AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+damageSoundFile, volume: 0.8, autoplay: true, loop: false}, true);
	}



export async function ResetStagesToDefault(actor, silent=false)
{
	var stats = ["atk", "def", "spatk", "spdef", "spd"];

	var default_stages = {
		// Bunker  :   {
		// 	atk   : 2,
		// 	def   : 0,
		// 	spatk : 0,
		// 	spdef : 0,
		// 	spd   : 0
		// },
		// Jasmine  :   {
		// 	atk   : 0,
		// 	def   : 0,
		// 	spatk : 1,
		// 	spdef : 0,
		// 	spd   : 0
		// }
	};

	// for (let token of canvas.tokens.controlled){

		for (let stat of stats)
		{
			var actor_stat_string = String("data.stats." + stat + ".stage");
			if(default_stages[actor.name])
			{
				await actor.update({[actor_stat_string]: Number(default_stages[actor.name][stat])});
			}
			else
			{
				await actor.update({[actor_stat_string]: Number(0)});
			}
		}
		game.PTUMoveMaster.chatMessage(actor, actor.name + " All Stages Reset!");
	// }
	if(!silent)
	{
		AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"Stat%20Fall%20Down.mp3", volume: 0.5, autoplay: true, loop: false}, true);
	}
}


export function GetSoundDirectory()
{
	return game.settings.get("ptu", "moveSoundDirectory");
}

export async function RollDamageMove(actor, item_initial, moveName, finalDB, typeStrategist, bonusDamage)
	{
		var item = item_initial.data.data;
		AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+UIButtonClickSound, volume: 0.5, autoplay: true, loop: false}, true);

		var item_entities=actor.items;
		let diceRoll = await game.PTUMoveMaster.PerformFullAttack (actor, item, moveName, finalDB, bonusDamage);

		if(game.combat == null)
		{
			var currentRound = 0;
			var currentEncounterID = 0;
		}
		else
		{
			var currentRound = game.combat.current.round;
			var currentEncounterID = game.combat.data._id;
		}

		if(item.UseCount == null)
		{
			for(let search_item of item_entities)
			{
				if (search_item.data.id == item_initial.id)
				{
					await search_item.update({ "data.UseCount": 0});
				}
			}
			// item.update({ "data.UseCount": Number(0)});
		}

		if(item.frequency == "Daily" || item.frequency == "Daily x2" || item.frequency == "Daily x3" || item.frequency == "Scene" || item.frequency == "Scene x2" || item.frequency == "Scene x3")
		{
			for(let search_item of item_entities)
			{
				// console.log("search_item.data.id:");
				// console.log(search_item.id);

				// console.log("item_initial.id:");
				// console.log(item_initial.id);
				if (search_item.id == item_initial.id)
				{
					// console.log("DEBUG: search_item.data.id == item_initial.id, updating data.UseCount");
					await search_item.update({ "data.UseCount": Number(item.UseCount + 1)});
				}
			}
			// item.update({ "data.UseCount": Number(item.UseCount + 1)});
		}

		for(let search_item of item_entities)
			{
				if (search_item.id == item_initial.id)
				{
					// console.log("DEBUG: search_item.id == item_initial.id, updating data.LastRoundUsed");

					await search_item.update({ "data.LastRoundUsed": currentRound, "data.LastEncounterUsed": currentEncounterID});

					if( (typeStrategist.length > 0) && (typeStrategist.indexOf(item.type) > -1) )
					{
						let oneThirdMaxHealth = Number(actor.data.data.health.total / 3);
						let currentDR = (actor.data.data.health.value < oneThirdMaxHealth ? 10 : 5);
						// console.log("DEBUG: Type Strategist: " + item.type + ", activated on round " + currentRound + ", HP = " + actor.data.data.health.value + "/" + actor.data.data.health.max + " (" + Number(actor.data.data.health.value / actor.data.data.health.max)*100 + "%; DR = " + currentDR);
						await actor.update({ "data.TypeStrategistLastRoundUsed": currentRound, "data.TypeStrategistLastEncounterUsed": currentEncounterID, "data.TypeStrategistLastTypeUsed": item.type, "data.TypeStrategistDR": currentDR});
					}
				}
			}
		// item.update({ "data.LastRoundUsed": currentRound});
		// item.update({ "data.LastEncounterUsed": currentEncounterID});
		// console.log(item.name + " data.LastRoundUsed = " + item.LastRoundUsed);
		// console.log("search debug",move_stage_changes);

		for(let searched_move in move_stage_changes)
		{
			if(searched_move == item.name)
			{
				if(move_stage_changes[searched_move]["roll-trigger"] != null) // Effect Range Check
				{
					let effectThreshold = move_stage_changes[searched_move]["roll-trigger"];
					// console.log("EFFECT THRESHOLD"+effectThreshold);
					// console.log("DICE ROLL"+diceRoll);
					if(diceRoll >= effectThreshold) // Effect Range Hit
					{
						// console.log("Move Trigger Range Hit: " + diceRoll + "vs " + effectThreshold);
						
						for (let searched_stat of stats)
						{
							if (move_stage_changes[searched_move][searched_stat] != null)
							{
								game.PTUMoveMaster.adjustActorStage(actor,searched_stat, move_stage_changes[searched_move][searched_stat]);
							}
						}
						if(move_stage_changes[searched_move]["pct-healing"] != null)
						{
							game.PTUMoveMaster.healActorPercent(actor,move_stage_changes[searched_move]["pct-healing"]);
						}
						if(move_stage_changes[searched_move]["pct-self-damage"] != null)
						{
							game.PTUMoveMaster.damageActorPercent(actor,move_stage_changes[searched_move]["pct-self-damage"]);
						}
					}
					else // Effect Range Missed
					{
						// console.log("Move Trigger Range Missed: " + diceRoll + "vs " + effectThreshold);
					}
				}
				else // No Effect Range
				{
					for (let searched_stat of stats)
					{
						if (move_stage_changes[searched_move][searched_stat] != null)
						{
							game.PTUMoveMaster.adjustActorStage(actor,searched_stat, move_stage_changes[searched_move][searched_stat]);
						}
					}
					if(move_stage_changes[searched_move]["pct-healing"] != null)
					{
						game.PTUMoveMaster.healActorPercent(actor,move_stage_changes[searched_move]["pct-healing"]);
					}
					if(move_stage_changes[searched_move]["pct-self-damage"] != null)
					{
						game.PTUMoveMaster.damageActorPercent(actor,move_stage_changes[searched_move]["pct-self-damage"]);
					}
				}
				
			}
		}
	}


export async function sendMoveMessage(messageData = {}) 
{
		messageData = mergeObject({
			user: game.user.data._id,
			templateType: MoveMessageTypes.DAMAGE,
			verboseChatInfo: game.settings.get("ptu", "verboseChatInfo") ?? false
		}, messageData);

		if(!messageData.move) {
			console.error("Can't display move chat message without move data.")
			return;
		}
		messageData.content = await renderTemplate('modules/PTUMoveMaster/move-combined.hbs', messageData)

		return ChatMessage.create(messageData, {});
};

export function chatMessage(token, messageContent) 
{
	// create the message
	if (messageContent !== '') {
		let chatData = {
		user: game.user.data._id,
		speaker: ChatMessage.getSpeaker(token),
		content: messageContent,
		};
		ChatMessage.create(chatData, {});
	}
}

export const CritOptions = {
	CRIT_MISS: 'miss',
	NORMAL: 'normal',
	CRIT_HIT: 'hit'
};

export function adjustActorStage(actor, stat, change)
{
	let effects = actor.effects;
	let AE_changes = [];

	effects.forEach((value, key, map) => {	// We check if there are any Active Effects changing the stat and offset them to avoid weird results.
		for(let change of value.data.changes)
		{
			if(change.key == eval("'data.stats."+stat+".stage'"))
			{
				AE_changes.push(change);
			}
		}
	});

	let stage_AE_sum = 0;

	for(let AE_change of AE_changes)
	{
		stage_AE_sum += Number(AE_change.value);
	}

	if(change > 0)
	{
		AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+stat_up_sound_file, volume: 0.8, autoplay: true, loop: false}, true);
	}
	else
	{
		AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+stat_down_sound_file, volume: 0.8, autoplay: true, loop: false}, true);
	}

	let old_stage = eval("(Number(actor.data.data.stats."+stat+".stage))");
	old_stage -= stage_AE_sum;

	let new_stage = eval("Math.max(Math.min((old_stage + Number(change)), 6), -6)");

	eval("actor.update({'data.stats."+stat+".stage': Number("+ new_stage +") })");
	game.PTUMoveMaster.chatMessage(actor, actor.name + ' '+ stat +' Stage +'+ change +'!');
}


export function healActorPercent(actor,pct_healing)
{
	let difference_to_max = Number(actor.data.data.health.max - actor.data.data.health.value);
	let final_healing_amount = Math.min(Math.floor(pct_healing*actor.data.data.health.total), difference_to_max)
	AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+heal_sound_file, volume: 0.8, autoplay: true, loop: false}, true);

	actor.modifyTokenAttribute("health", (final_healing_amount), true, true);
	game.PTUMoveMaster.chatMessage(actor, actor.name + ' healed '+ pct_healing*100 +'% of their max hit points!');
}


export function healActor(actor, healing_amount)
{
	let difference_to_max = Number(actor.data.data.health.max - actor.data.data.health.value);
	let final_healing_amount = Math.min(healing_amount, difference_to_max)
	AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+heal_sound_file, volume: 0.8, autoplay: true, loop: false}, true);

	actor.modifyTokenAttribute("health", (final_healing_amount), true, true);
	game.PTUMoveMaster.chatMessage(actor, actor.name + ' healed '+ final_healing_amount +' hit points!');
}


export function setActorHealth(actor, new_health)
{
	AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+heal_sound_file, volume: 0.8, autoplay: true, loop: false}, true);

	actor.modifyTokenAttribute("health", (new_health), false, true);
	game.PTUMoveMaster.chatMessage(actor, actor.name + '\'s health was set to '+ new_health +' hit points!');
}


export function setActorHealthPercent(actor, new_health_percent) // Percent expressed as fractions of 1. 30% would be 0.3, etc.
{
	AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+heal_sound_file, volume: 0.8, autoplay: true, loop: false}, true);

	actor.modifyTokenAttribute("health", (new_health_percent*actor.data.data.health.total), false, true);
	game.PTUMoveMaster.chatMessage(actor, actor.name + '\'s health was set to '+ new_health_percent*100 +'% of their max hit points!');
}


export function damageActorPercent(actor,pct_damage)
{
	AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+damage_sound_file, volume: 0.8, autoplay: true, loop: false}, true);

	let finalDamage = (Math.floor(pct_damage*actor.data.data.health.total));

	actor.modifyTokenAttribute("health", -finalDamage, true, true);
	game.PTUMoveMaster.chatMessage(actor, actor.name + ' took damage equal to '+ pct_damage*100 +'% of their max hit points!');
	game.PTUMoveMaster.ApplyInjuries(actor, finalDamage);
}


export function damageActorFlatValue(actor, damage_value, source="")
{
	AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+damage_sound_file, volume: 0.8, autoplay: true, loop: false}, true);

	let finalDamage = damage_value;
	let source_string = "";

	if(source != "")
	{
		source_string = " from "+source;
	}

	actor.modifyTokenAttribute("health", -finalDamage, true, true);
	game.PTUMoveMaster.chatMessage(actor, actor.name + ' lost '+ finalDamage +' Hit Points'+source_string+'!');
	game.PTUMoveMaster.ApplyInjuries(actor, finalDamage);
}


export function damageActorTick(actor, source="", tick_count=1)
{
	let tick_DR = 0;

	AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+damage_sound_file, volume: 0.8, autoplay: true, loop: false}, true);

	let finalDamage = Math.max((Math.floor(0.10*actor.data.data.health.total*tick_count)) - (tick_DR*tick_count), 0);
	let source_string = "";

	if(source != "")
	{
		source_string = " from "+source;
	}

	actor.modifyTokenAttribute("health", -finalDamage, true, true);
	game.PTUMoveMaster.chatMessage(actor, actor.name + ' took '+tick_count+' tick of damage ('+ finalDamage +' Hit Points)'+source_string+'!');
	game.PTUMoveMaster.ApplyInjuries(actor, finalDamage);
}


export function healActorTick(actor, source="")
{
	AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+heal_sound_file, volume: 0.8, autoplay: true, loop: false}, true);

	let finalhealing = (Math.floor(0.10*actor.data.data.health.total));
	let source_string = "";

	if(source != "")
	{
		source_string = " from "+source;
	}

	actor.modifyTokenAttribute("health", finalhealing, true, true);
	game.PTUMoveMaster.chatMessage(actor, actor.name + ' healed a tick of damage ('+ finalhealing +' Hit Points)'+source_string+'!');
}


export function healActorRest(actor, hours=8, bandage_used=false)
{

	AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+heal_sound_file, volume: 0.8, autoplay: true, loop: false}, true);

	// let one_eighth_actor_health = (Math.floor(actor.data.data.health.total/8));

	// let finalhealing = (one_eighth_actor_health + (bandage_used ? one_eighth_actor_health : 0)) * hours;


	let health_fractions_healed = hours;
	let health_fraction_size = (bandage_used ? 4 : 8);

	let healing_percent = (health_fractions_healed * (1/health_fraction_size));
	let finalhealing = Math.min(Math.floor(actor.data.data.health.total * healing_percent), (actor.data.data.health.total-actor.data.data.health.value));

	let injuries_healed = 0;

	if(bandage_used && (hours >= 6))
	{
		injuries_healed++;
	}
	if(hours >= 24)
	{
		injuries_healed += Math.floor(hours/24);
	}
	if(hours >= 4)
	{
		game.PTUMoveMaster.resetEOTMoves(actor, true);
		game.PTUMoveMaster.resetSceneMoves(actor, true);
		game.PTUMoveMaster.resetDailyMoves(actor, true);

		let conditions = ["Burned", "Frozen", "Paralysis", "Poisoned", "Badly Poisoned", "Flinch", "Sleep", "Cursed", "Confused", "Disabled", "Infatuation", "Rage", "BadSleep", "Suppressed",];

		for(let affliction of conditions)
		{
			game.PTUMoveMaster.cureActorAffliction(actor, affliction);
		}

	}

	actor.update({'data.health.injuries': Math.max(Number(actor.data.data.health.injuries - injuries_healed), 0) });

	setTimeout(() => {  
		actor.modifyTokenAttribute("health", finalhealing, true, true);
		game.PTUMoveMaster.chatMessage(actor, actor.name + ' rested for '+hours+' hours, healing '+ finalhealing +' Hit Points and '+injuries_healed+' injuries!');
	}, 750);
}


export async function healActorRestPrompt(actor)
{
	let form = new game.PTUMoveMaster.MoveMasterRestHoursOptions({actor}, {"submitOnChange": false, "submitOnClose": false});
	form.render(true);
}


export async function cureActorAffliction(actor, affliction_name)
{
	let affliction_table = {
		"paralysis":	"is_paralyzed",
		"flinch":		"is_flinched",
		"infatuation":	"is_infatuated",
		"rage":			"is_raging",
		"sleep":		"is_sleeping",
		"badsleep":	"is_badly_sleeping",
		"blindness":	"is_blind",
		"total_blindness":"is_totally_blind",
		"fainted":		"is_fainted"
	};

	let lowercase_affliction_name = "is_"+(affliction_name.toLowerCase().replace(" ", "_"));
	if(affliction_table[affliction_name.toLowerCase()])
	{
		lowercase_affliction_name = affliction_table[affliction_name.toLowerCase()];
	}
	let effects = actor.effects;

	if(actor.data.flags.ptu)
	{
		if(eval('actor.data.flags.ptu.'+lowercase_affliction_name) == true)
		{
			// console.log(actor.name+" has effect: "+lowercase_affliction_name);
			
			// await actor.effects.filter(x => x.data.label == affliction_name).forEach(x => await x.delete());

			for(let effect of actor.effects.filter(x => x.data.label == affliction_name))
  			{
				await effect.delete();
			}

			game.PTUMoveMaster.chatMessage(actor, actor.name + ' was cured of '+ affliction_name +'!');

			return true;
		}
		else
		{
			// console.log(actor.name+" does NOT have effect: "+lowercase_affliction_name);
			return false;
		}
	}
	else
	{
		// console.log(actor.name+" does not have any flags set.");
		return false;
	}
}


export function CalculateAcRoll (moveData, actorData)   {
	return new Roll('1d20-@ac+@acBonus', {
		ac: (parseInt(moveData.ac) || 0),
		acBonus: (parseInt(actorData.modifiers.acBonus.total) || 0)
	})
};


export async function PerformFullAttack (actor, move, moveName, finalDB, bonusDamage) 
{
	let isFiveStrike = false;
	let isDoubleStrike = false;
	let userHasTechnician = false;
	let userHasAdaptability = false;
	let lastChanceApplies = false;
	let fiveStrikeCount = 0;
	let hasSTAB = false;

	let actorType1 = null;
	let actorType2 = null;

	let sheet_damage_bonus = 0;
	if(move.category == "Physical")
	{
		sheet_damage_bonus = actor.data.data.modifiers.damageBonus.physical.total;
	}
	if(move.category == "Special")
	{
		sheet_damage_bonus = actor.data.data.modifiers.damageBonus.special.total;
	}

	bonusDamage += sheet_damage_bonus;

	let currentWeather = game.settings.get("PTUMoveMaster", "currentWeather");

	let lastChanceName = "Last Chance ("+move.type+")";

	if(actor.data.data.typing)
	{
		actorType1 = actor.data.data.typing[0];
		actorType2 = actor.data.data.typing[1];
	}

	let currentHasExtraEffect = false;
	let currentExtraEffectText = "";

	for(let search_item of actor.items)
	{
		if(search_item.name == "Technician")
		{
			userHasTechnician = true;
		}
		if(search_item.name == "Adaptability")
		{
			userHasAdaptability = true;
		}
		if(search_item.name == lastChanceName)
		{
			lastChanceApplies = true;
		}
	}

	if(lastChanceApplies)
	{
		let lastChanceHealthThreshold = Number(actor.data.data.health.total / 3);
		let currentHealth = actor.data.data.health.value;
		if(currentHealth < lastChanceHealthThreshold)
		{
			bonusDamage += 10;
			currentExtraEffectText = currentExtraEffectText+ "<br> including +10 damage from " + lastChanceName + " while below 1/3rd HP!";
			currentHasExtraEffect = true;
		}
		else
		{
			bonusDamage += 5;
			currentExtraEffectText = currentExtraEffectText+ "<br> including +5 damage from " + lastChanceName + "!";
			currentHasExtraEffect = true;
		}
	}

	if(!isNaN(move.damageBase))
	{
		if(currentWeather == "Rainy" && move.type == "Water")
		{
			bonusDamage += 5;
			currentExtraEffectText = currentExtraEffectText+ "<br> including +5 damage from Rainy weather!";
			currentHasExtraEffect = true;
		}
	
		if(currentWeather == "Rainy" && move.type == "Fire")
		{
			bonusDamage -= 5;
			currentExtraEffectText = currentExtraEffectText+ "<br> including -5 damage from Rainy weather!";
			currentHasExtraEffect = true;
		}
	
		if(currentWeather == "Sunny" && move.type == "Fire")
		{
			bonusDamage += 5;
			currentExtraEffectText = currentExtraEffectText+ "<br> including +5 damage from Sunny weather!";
			currentHasExtraEffect = true;
		}
	
		if(currentWeather == "Sunny" && move.type == "Water")
		{
			bonusDamage -= 5;
			currentExtraEffectText = currentExtraEffectText+ "<br> including -5 damage from Sunny weather!";
			currentHasExtraEffect = true;
		}
	}

	console.log("move");
	console.log(move);
	if(move.range.search("Five Strike") > -1)
	{
		isFiveStrike = true;
		let fiveStrikeD8 = Math.floor(Math.random() * (8 - 1 + 1)) + 1;
		let fiveStrikeHitsDictionary = {
			1: 1,
			2: 2,
			3: 2,
			4: 3,
			5: 3,
			6: 3,
			7: 4,
			8: 5
		}
		let fiveStrikeHits = fiveStrikeHitsDictionary[fiveStrikeD8];
		fiveStrikeCount = fiveStrikeHits-1;
	}

	if( (move.range.search("Doublestrike") > -1) || (move.range.search("Double Strike") > -1) )
	{
		isDoubleStrike = true;
	}

	let acRoll = game.PTUMoveMaster.CalculateAcRoll(move, actor.data.data);
	let diceResult = await game.PTUMoveMaster.GetDiceResult(acRoll);

	let acRoll2 = game.PTUMoveMaster.CalculateAcRoll(move, actor.data.data);
	let diceResult2 = await game.PTUMoveMaster.GetDiceResult(acRoll2);

	let move_crit_base = 20;
	if(move_stage_changes[move.name])
	{
		if(move_stage_changes[move.name]["crit-range"])
		{
			move_crit_base = move_stage_changes[move.name]["crit-range"];
		}
	}

	let crit = diceResult === 1 ? CritOptions.CRIT_MISS : diceResult >= Number(move_crit_base - actor.data.data.modifiers.critRange.total) ? CritOptions.CRIT_HIT : CritOptions.NORMAL;
	let crit2 = diceResult2 === 1 ? CritOptions.CRIT_MISS : diceResult2 >= Number(move_crit_base - actor.data.data.modifiers.critRange.total) ? CritOptions.CRIT_HIT : CritOptions.NORMAL;

	let damageRoll = game.PTUMoveMaster.CalculateDmgRoll(move, actor.data.data, 'normal', userHasTechnician, userHasAdaptability, isDoubleStrike, isFiveStrike, fiveStrikeCount, 1, 0, bonusDamage);
	if(damageRoll) damageRoll.roll();
	let critDamageRoll = game.PTUMoveMaster.CalculateDmgRoll(move, actor.data.data, 'hit', userHasTechnician, userHasAdaptability, isDoubleStrike, isFiveStrike, fiveStrikeCount, 1, 0, bonusDamage);
	if(!move.name)
	{
		move.name=move.name;
	}
	if(critDamageRoll)
	{
		critDamageRoll.roll();
	}
	if(damageRoll && damageRoll._total)
	{
		game.macros.getName("backend_set_flags")?.execute(damageRoll._total,critDamageRoll._total,move.category,move.type);
	}

	let damageRollTwoHits = game.PTUMoveMaster.CalculateDmgRoll(move, actor.data.data, 'normal', userHasTechnician, userHasAdaptability, isDoubleStrike, isFiveStrike, fiveStrikeCount, 2, 0, bonusDamage);
	if(damageRollTwoHits)
	{
		damageRollTwoHits.roll();
	}

	let critDamageRollOneHitOneCrit = game.PTUMoveMaster.CalculateDmgRoll(move, actor.data.data, 'hit', userHasTechnician, userHasAdaptability, isDoubleStrike, isFiveStrike, fiveStrikeCount, 2, 1, bonusDamage);
	if(critDamageRollOneHitOneCrit)
	{
		critDamageRollOneHitOneCrit.roll();
	}

	let critDamageRollTwoCrits = game.PTUMoveMaster.CalculateDmgRoll(move, actor.data.data, 'hit', userHasTechnician, userHasAdaptability, isDoubleStrike, isFiveStrike, fiveStrikeCount, 2, 2, bonusDamage);
	if(critDamageRollTwoCrits)
	{
		critDamageRollTwoCrits.roll();
	}

	let isUntyped = false;
	if(move.type == "Untyped" || move.type == "" || move.type == null)
	{
		isUntyped = true;
	}

	let typeStrategist = [];
	for(let item of actor.data.items) // START Ability Check Loop
	{
		if(item.name.search("Type Strategist \\(") > -1)
		{
			typeStrategist.push(item.name.slice(item.name.search('\\(')+1, item.name.search('\\)') ));
		}
	} // END Ability Check Loop

	if( (typeStrategist.length > 0) && (typeStrategist.indexOf(move.type) > -1) )
	{
		currentExtraEffectText = currentExtraEffectText+ "<br>Type Strategist (" + move.type + ") activated!";
		currentHasExtraEffect = true;
	}

	let hasAC = true;
	if(move.ac == "" || move.ac == "--")
	{
		hasAC = false;
	}

	if(userHasTechnician && ( isDoubleStrike || isFiveStrike || (move.damageBase <= 6) ) )
	{
		currentExtraEffectText = currentExtraEffectText+ "<br>Technician applied!";
		currentHasExtraEffect = true;
	}

	if(userHasAdaptability && (move.type == actorType1 || move.type == actorType2) )
	{
		currentExtraEffectText = currentExtraEffectText+ "<br>Adaptability applied!";
		currentHasExtraEffect = true;
	}

	if(move.type == actorType1 || move.type == actorType2)
	{
		hasSTAB = true;
	}

	game.PTUMoveMaster.sendMoveRollMessage(moveName, acRoll, acRoll2, {
		speaker: ChatMessage.getSpeaker({
			actor: actor
		}),
		move: move,
		moveName: moveName,
		damageRoll: damageRoll,
		damageRollTwoHits: damageRollTwoHits,
		critDamageRoll: critDamageRoll,
		critDamageRollOneHitOneCrit: critDamageRollOneHitOneCrit,
		critDamageRollTwoCrits: critDamageRollTwoCrits,
		templateType: MoveMessageTypes.FULL_ATTACK,
		crit: crit,
		crit2: crit2,
		hasAC: hasAC,
		hasExtraEffect: currentHasExtraEffect,
		extraEffectText: currentExtraEffectText,
		isUntyped: isUntyped,
		isFiveStrike: isFiveStrike,
		fiveStrikeHits: (fiveStrikeCount+1),
		isDoubleStrike: isDoubleStrike,
		hasSTAB: hasSTAB,
		finalDB: finalDB,
	});//.then(data => console.log(data));

	var moveSoundFile = ((move.name).replace(/( \[.*?\]| \(.*?\)) */g, "") + ".mp3"); // Remove things like [OG] or [Playtest] from move names when looking for sound files.

	if(move.name.toString().match(/Hidden Power/) != null)
	{
		moveSoundFile = ("Hidden Power" + ".mp3");
	}

	if(move.name.toString().match(/Pin Missile/) != null)
	{
		if((fiveStrikeCount+1) <= 1)
		{
			moveSoundFile = ("Pin Missile 1hit" + ".mp3");
		}
		else if((fiveStrikeCount+1) > 1)
		{
			moveSoundFile = ("Pin Missile 2hits" + ".mp3");
		}
		
	}

	moveSoundFile.replace(/ /g,"%20");
	AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+moveSoundFile, volume: 0.8, autoplay: true, loop: false}, true);

	if(move.range.includes("Full Action"))
	{
		game.PTUMoveMaster.TakeAction(actor, "Full", move.category);
	}
	else if(move.name == "Splash")
	{
		game.PTUMoveMaster.TakeAction(actor, "Shift", move.category);
	}
	else
	{
		game.PTUMoveMaster.TakeAction(actor, "Standard", move.category);
	}

	return diceResult;
};


export async function GetDiceResult(roll)
{
	if (!roll._evaluated)
	{
		await roll.evaluate(true);
	}

	let diceResult = -2;
	try 
	{
		diceResult = roll.terms[0].results[0].result;
	}
	catch (err) 
	{
		console.log("Old system detected, using deprecated rolling...")
		diceResult = roll.parts[0].results[0];
	}
	return diceResult;
};


export function CalculateDmgRoll(moveData, actorData, isCrit, userHasTechnician, userHasAdaptability, isDoubleStrike, isFiveStrike, fiveStrikeCount, hitCount, critCount, bonusDamage) 
{
	if (moveData.category === "Status") return;

	if (moveData.damageBase.toString().match(/^[0-9]+$/) != null) 
	{
		let db = parseInt(moveData.damageBase);
		let damageBase;
		let damageBaseOriginal;
		let dbRoll;
		let dbRollOriginal;
		let technicianDBBonus = 0;
		let STABBonus = 2;
		let actorType1 = null;
		let actorType2 = null;

		if(actorData.typing)
		{
			actorType1 = actorData.typing[0];
			actorType2 = actorData.typing[1];
		}

		if(userHasTechnician && ( isDoubleStrike || isFiveStrike || (moveData.damageBase <= 6) ) )
		{
			technicianDBBonus = 2;
		}

		if(userHasAdaptability)
		{
			STABBonus = 3;
		}

		if(moveData.name.toString().match(/Stored Power/) != null) // Increase DB if move is one that scales like Stored Power, et. al.
		{
			let atk_stages = actorData.stats.atk.stage < 0 ? 0 : actorData.stats.atk.stage;
			let spatk_stages = actorData.stats.spatk.stage < 0 ? 0 : actorData.stats.spatk.stage;
			let def_stages = actorData.stats.def.stage < 0 ? 0 : actorData.stats.def.stage;
			let spdef_stages = actorData.stats.spdef.stage < 0 ? 0 : actorData.stats.spdef.stage;
			let spd_stages = actorData.stats.spd.stage < 0 ? 0 : actorData.stats.spd.stage;

			let db_from_stages = ( (atk_stages + spatk_stages + def_stages + spdef_stages + spd_stages) * 2 );

			damageBase = (
				moveData.type == actorType1 || moveData.type == actorType2) ? 
				Math.min(db*(hitCount + fiveStrikeCount) + db_from_stages, 20) + STABBonus + technicianDBBonus : 
				Math.min(db*(hitCount + fiveStrikeCount) + db_from_stages, 20) + technicianDBBonus;

			damageBaseOriginal = (
				moveData.type == actorType1 || moveData.type == actorType2) ? 
				Math.min(db + db_from_stages, 20) + STABBonus + technicianDBBonus : 
				Math.min(db + db_from_stages, 20) + technicianDBBonus;
			
			dbRoll = game.ptu.DbData[damageBase];
			dbRollOriginal = game.ptu.DbData[damageBaseOriginal];
		}
		else if(moveData.name.toString().match(/Punishment/) != null) // Increase DB if move is one that scales like Punishment, et. al.
		{
			let atk_stages = actorData.stats.atk.stage < 0 ? 0 : actorData.stats.atk.stage;
			let spatk_stages = actorData.stats.spatk.stage < 0 ? 0 : actorData.stats.spatk.stage;
			let def_stages = actorData.stats.def.stage < 0 ? 0 : actorData.stats.def.stage;
			let spdef_stages = actorData.stats.spdef.stage < 0 ? 0 : actorData.stats.spdef.stage;
			let spd_stages = actorData.stats.spd.stage < 0 ? 0 : actorData.stats.spd.stage;

			let db_from_stages = ( (atk_stages + spatk_stages + def_stages + spdef_stages + spd_stages) * 1 );

			damageBase = (
				moveData.type == actorType1 || moveData.type == actorType2) ? 
				Math.min(db*(hitCount + fiveStrikeCount) + db_from_stages, 12) + STABBonus + technicianDBBonus : 
				Math.min(db*(hitCount + fiveStrikeCount) + db_from_stages, 12) + technicianDBBonus;

			damageBaseOriginal = (
				moveData.type == actorType1 || moveData.type == actorType2) ? 
				Math.min(db + db_from_stages, 20) + STABBonus + technicianDBBonus : 
				Math.min(db + db_from_stages, 20) + technicianDBBonus;
			
			dbRoll = game.ptu.DbData[damageBase];
			dbRollOriginal = game.ptu.DbData[damageBaseOriginal];
		}
		else
		{
			damageBase = (
				moveData.type == actorType1 || moveData.type == actorType2) ? 
				db*(hitCount + fiveStrikeCount) + STABBonus + technicianDBBonus : 
				db*(hitCount + fiveStrikeCount) + technicianDBBonus;

			damageBaseOriginal = (
				moveData.type == actorType1 || moveData.type == actorType2) ? 
				db + STABBonus + technicianDBBonus : 
				db + technicianDBBonus;

			dbRoll = game.ptu.DbData[damageBase];
			dbRollOriginal = game.ptu.DbData[damageBaseOriginal];
		}

		let bonus = Math.max(moveData.category === "Physical" ? actorData.stats.atk.total : actorData.stats.spatk.total, 0)+bonusDamage;
		let rollString = '@roll+@bonus';
		let rollStringCrit = '@roll+@roll+@bonus';
		if(isDoubleStrike)
		{
			if(critCount == 1)
			{
				rollStringCrit = '@roll+@originalRoll+@bonus';
			}
			else if(critCount == 2)
			{
				rollStringCrit = '@roll+@originalRoll+@originalRoll+@bonus';
			}
		}

		if (!dbRoll)
		{
			return;
		}

		return new Roll(isCrit == CritOptions.CRIT_HIT ? rollStringCrit : rollString, {
			roll: dbRoll,
			originalRoll: dbRollOriginal,
			bonus: bonus
		})
	}
	let dbRoll = game.ptu.DbData[moveData.damageBase];
	if (!dbRoll) 
	{
		return;
	}
	return new Roll('@roll', {
		roll: dbRoll
	})
};

export async function sendMoveRollMessage(moveName, rollData, rollData2, messageData = {})
{
	if (!rollData._evaluated) 
	{
		rollData.evaluate();
	}

	if (!rollData2._evaluated) 
	{
		rollData2.evaluate();
	}

	messageData = mergeObject({
		user: game.user.data._id,
		moveName: moveName,
		roll: rollData,
		roll2: rollData2,
		sound: CONFIG.sounds.dice,
		templateType: MoveMessageTypes.DAMAGE,
		verboseChatInfo: game.settings.get("ptu", "verboseChatInfo") ?? false
	}, messageData);


	if(!messageData.move) 
	{
		console.error("Can't display move chat message without move data.")
		return;
	}

	messageData.content = await renderTemplate('modules/PTUMoveMaster/move-combined.hbs', messageData)

	return ChatMessage.create(messageData, {});
};

export async function ApplyInjuries(target, final_effective_damage)
{
	let targetHealthCurrent = target.data.data.health.value;
	let targetHealthMax = target.data.data.health.total;

	let hitPoints50Pct = targetHealthMax*0.50;
	let hitPoints0Pct = 0;
	let hitPointsNegative50Pct = targetHealthMax*(-0.50);
	let hitPointsNegative100Pct = targetHealthMax*(-1.00);
	let hitPointsNegative150Pct = targetHealthMax*(-1.50);
	let hitPointsNegative200Pct = targetHealthMax*(-2.00);

	let massiveDamageThreshold = hitPoints50Pct+1;

	let injuryCount = 0;

	if(game.settings.get("PTUMoveMaster", "autoApplyInjuries") == "true")
		{
			if(final_effective_damage >= massiveDamageThreshold)
			{
				injuryCount++;
				game.PTUMoveMaster.chatMessage(target, target.name + " suffered massive damage and sustains an injury!");
			}

			if( (final_effective_damage >= 1) && (targetHealthCurrent > hitPoints50Pct) && ((targetHealthCurrent - final_effective_damage) <= hitPoints50Pct) )
			{
				injuryCount++;
				game.PTUMoveMaster.chatMessage(target, target.name + " was damaged to below the 50% health threshold and sustains an injury!");
			}

			if( (final_effective_damage >= 1) && (targetHealthCurrent > hitPoints0Pct) && ((targetHealthCurrent - final_effective_damage) <= hitPoints0Pct) )
			{
				injuryCount++;
				game.PTUMoveMaster.chatMessage(target, target.name + " was damaged to below the 0% health threshold and sustains an injury! "+target.name+" has *fainted*!");
			}

			if( (final_effective_damage >= 1) && (targetHealthCurrent > hitPointsNegative50Pct) && ((targetHealthCurrent - final_effective_damage) <= hitPointsNegative50Pct) )
			{
				injuryCount++;
				game.PTUMoveMaster.chatMessage(target, target.name + " was damaged to below the -50% health threshold and sustains an injury!");
			}

			if( (final_effective_damage >= 1) && (targetHealthCurrent > hitPointsNegative100Pct) && ((targetHealthCurrent - final_effective_damage) <= hitPointsNegative100Pct) )
			{
				injuryCount++;
				game.PTUMoveMaster.chatMessage(target, target.name + " was damaged to below the -100% health threshold and sustains an injury!");
			}

			if( (final_effective_damage >= 1) && (targetHealthCurrent > hitPointsNegative150Pct) && ((targetHealthCurrent - final_effective_damage) <= hitPointsNegative150Pct) )
			{
				injuryCount++;
				game.PTUMoveMaster.chatMessage(target, target.name + " was damaged to below the -150% health threshold and sustains an injury!");
			}

			if( (final_effective_damage >= 1) && (targetHealthCurrent > hitPointsNegative200Pct) && ((targetHealthCurrent - final_effective_damage) <= hitPointsNegative200Pct) )
			{
				injuryCount++;
				game.PTUMoveMaster.chatMessage(target, target.name + " was damaged to below the -200% health threshold and sustains an injury! If using death rules, "+target.name+" *dies*!");
			}

			target.update({'data.health.injuries': Number(target.data.data.health.injuries + injuryCount) });
		}

	if( Number(targetHealthCurrent - final_effective_damage) <= 0 )
	{
		Dialog.confirm({
			title: "Fainted?",
			content: "Hit Points are 0 or below; Apply fainted condition?",
			yes: async () => {
				await game.PTUMoveMaster.enableCondition(target, "fainted", "other"); // TODO: Implement
			},
			defaultYes: false 
		})
	}
	
	
}


export function GetDistanceBetweenTokens(token1, token2)
{
	// let target = Array.from(game.user.targets)[0];
	let ray = new Ray(token1, token2);
	let segments = [{ray}];
	let dist = canvas.grid.measureDistances(segments,{gridSpaces:true})[0]
		
	// ui.notifications.info(`${dist} m apart`)
	return dist;
};


export function CreateStatusMoveButtonList(actor)
{
	// Initialize an array of buttons

	// Iterate over a list of actor's items

	// If item is a status move, add a button to the array based off that move
};


export function CreateDamageMoveButtonList(actor)
{
	// Initialize an array of buttons

	// Iterate over a list of actor's items

	// If item is a damaging move, add a button to the array based off that move
};


export function CreatePokeballButtonList(actor)
{
	// Initialize an array of buttons

	// Iterate over a list of actor's items

	// If item is a pokeball, add a button to the array based off that move
};


export async function ThrowPokeball(actor_token, target_token, pokeball)
{
	let throwRange = actor_token.actor.data.data.capabilities["Throwing Range"];
	let rangeToTarget = GetDistanceBetweenTokens(actor_token, target_token);
	if(throwRange < rangeToTarget)
	{
		ui.notifications.warn(`Target is ${rangeToTarget}m away, which is outside your ${throwRange}m throwing range!`);
	}
	else
	{
		ui.notifications.info(`Target is ${rangeToTarget}m away, which is within your ${throwRange}m throwing range!`);

		let numDice=1;
		let dieSize = "d20";

		let roll= new Roll(`${numDice}${dieSize}-${6}`).roll()

		roll.toMessage()

		function castSpell(effect) {
			// const tokens = canvas.tokens.controlled;
			// if (tokens.length == 0) {
			//   ui.notifications.error("Please select a token");
			//   return;
			// }
			// game.user.targets.forEach((i, t) => {
			//   canvas.fxmaster.drawSpecialToward(effect, tokens[0], t);
			canvas.fxmaster.drawSpecialToward(effect, actor_token, target_token);
			// });
		}
		  
		
		let TargetSpeedEvasion = target_token.actor.data.data.evasion.speed;

		// roll = Math.floor(Math.random() * (20 - 1 + 1)) + 1;

		if(Number(roll.results[0]-roll.results[2]) >= TargetSpeedEvasion)
		{
			castSpell({
				file:
					"item_icons/"+pokeball+".webm",
				anchor: {
					x: -0.08,
					y: 0.5,
				},
				speed: 1,
				angle: 0,
				scale: {
					x: 0.5,
					y: 0.5,
				},
			});
			ui.notifications.info(`Rolled ${roll.results[0]-roll.results[2]} vs ${TargetSpeedEvasion}, hit!`);
			AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"pokeball_sounds/"+"pokeball_hit.mp3", volume: 0.5, autoplay: true, loop: false}, true);

			
			let pokeballShoop_params =
			[
				{
					filterType: "transform",
					filterId: "pokeballShoop",
					bpRadiusPercent: 100,
					//padding: 0,
					autoDestroy: true,
					animated:
					{
						bpStrength:
						{
							animType: "cosOscillation",//"cosOscillation",
							val1: 0,
							val2: -0.99,//-0.65,
							loopDuration: 1500,
							loops: 1,
						}
					}
				},

				{
					filterType: "glow",
					filterId: "pokeballShoop",
					outerStrength: 40,
					innerStrength: 20,
					color: 0xFFFFFF,//0x5099DD,
					quality: 0.5,
					//padding: 0,
					//zOrder: 2,
					autoDestroy: true,
					animated:
					{
						color: 
						{
						active: true, 
						loopDuration: 1500, 
						loops: 1,
						animType: "colorOscillation", 
						val1:0xFFFFFF,//0x5099DD, 
						val2:0xff0000,//0x90EEFF
						}
					}
				},

				{
					filterType: "adjustment",
					filterId: "pokeballShoop",
					saturation: 1,
					brightness: 10,
					contrast: 1,
					gamma: 1,
					red: 1,
					green: 1,
					blue: 1,
					alpha: 1,
					autoDestroy: true,
					animated:
					{
						alpha: 
						{ 
						active: true, 
						loopDuration: 1500, 
						loops: 1,
						animType: "syncCosOscillation",
						val1: 0.35,
						val2: 0.75 }
					}
				}
			];

			setTimeout(() => {  target_token.TMFXaddUpdateFilters(pokeballShoop_params); }, 800);


			let pokeballWiggle_params =
			[{
				filterType: "transform",
				filterId: "pokeballWiggle",
				padding: 50,
				animated:
				{
					translationX:
					{
						animType: "sinOscillation",
						val1: -0.0025,
						val2: +0.0025,
						loopDuration: 500,
					},
					translationY:
					{
						animType: "cosOscillation",
						val1: -0.00035,
						val2: +0.00035,
						loopDuration: 500,
					},
					rotation:
					{
						animType: "cosOscillation",
						val1: 15,
						val2: -15,
						loopDuration: 1000,
					},    
				}
			}];
			
			let polymorphFunc = async function () 
			{
				let transitionType = 9;
				let targetImagePath = "/item_icons/"+pokeball+".png";
				let polymorphFilterId = "pokeball";
				let polymorph_params;
				
				// Is the filter already activated on the placeable ? 
				if (target_token.TMFXhasFilterId(polymorphFilterId)) 
				{
				
					// Yes. So we update the type in the general section and loops + active in the progress animated section, to activate the animation for just one loop.
					// "type" to allow you to change the animation type
					// "active" to say at Token Magic : "Hey filter! It's time to work again!"
					// "loops" so that Token Magic can know how many loops it needs to schedule for the animation.
					// Each animation loop decreases "loops" by one. When "loops" reach 0, "active" becomes "false" and the animation will be dormant again.
					// Thank to the halfCosOscillation, a loop brings the value of the property from val1 to val2. A second loop is needed to bring val2 to val1. This is useful for monitoring progress with back and forth movements.
					polymorph_params =
						[{
							filterType: "polymorph",
							filterId: polymorphFilterId,
							type: transitionType,
							animated:
							{
								progress:
								{
									active: true,
									loops: 1
								}
							}
						}];

				} 
				else 
				{
					// No. So we create the entirety of the filter
					polymorph_params =
						[{
							filterType: "polymorph",
							filterId: polymorphFilterId,
							type: transitionType,
							padding: 70,
							magnify: 1,
							imagePath: targetImagePath,
							animated:
							{
								progress:
								{
									active: true,
									animType: "halfCosOscillation",
									val1: 0,
									val2: 100,
									loops: 1,
									loopDuration: 1000
								}
							}
						}];
				}

				// all functions that add, update or delete filters are asynchronous
				// if you are in a loop AND/OR you chain these functions, it is MANDATORY to await them
				// otherwise, data persistence may not works.
				// this is the reason why we use an async function (we cant use await in a non-async function)
				// avoid awaiting in a forEach loop, use "for" or "for/of" loop.
				await target_token.TMFXaddUpdateFilters(polymorph_params);
			};

			// polymorph async function call
			setTimeout(() => {
				  polymorphFunc(); 

				  target_token.update({"scale": (0.25/target_token.data.width)});
				  setTimeout(() => {  target_token.TMFXaddUpdateFilters(pokeballWiggle_params); }, 3500);
			}, 1000);
			

			await RollCaptureChance(actor_token.actor, target_token.actor, pokeball, roll.results[0], target_token);
		}
		else
		{
			let dodge_params =
			[{
				filterType: "transform",
				filterId: "jumpedDodge",
				autoDestroy: true,
				padding: 80,
				animated:
				{
					translationY:
					{
						animType: "cosOscillation",
						val1: 0,
						val2: -0.225,
						loops: 1,
						loopDuration: 900
					},
					scaleY:
					{
						animType: "cosOscillation",
						val1: 1,
						val2: 0.65,
						loops: 2,
						loopDuration: 450,
					},
					scaleX:
					{
						animType: "cosOscillation",
						val1: 1,
						val2: 0.65,
						loops: 2,
						loopDuration: 450,
					}
				}
			}];

			TokenMagic.addFilters(target_token, dodge_params);


			castSpell({
				file:
					"item_icons/"+pokeball+".webm",
				anchor: {
					x: -0.08,
					y: 0.5,
				},
				speed: 1,
				angle: 0,
				scale: {
					x: 0.5,
					y: 0.5,
				},
			});
			AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"pokeball_sounds/"+"pokeball_miss.mp3", volume: 0.5, autoplay: true, loop: false}, true);
			ui.notifications.info(`Rolled ${roll.results[0]-roll.results[2]} vs ${TargetSpeedEvasion}, miss...`);
		}
		
	}

	
};


export function SpeakPokemonName(pokemon_actor)
{
	let species = pokemon_actor.data.data.species;
	let species_data = game.ptu.GetSpeciesData(species);
	let species_number = species_data.number;
	let species_number_string = species_number;

	if(species_number.length == 1)
	{
		species_number_string = "00"+species_number;
	}
	else if(species_number.length == 2)
	{
		species_number_string = "0"+species_number;
	}

	function capitalizeFirstLetter(string) {
		return string[0].toUpperCase() + string.slice(1);
	}

	let pokedexSpeechSoundFile = species_number_string+" - "+capitalizeFirstLetter((species).toLowerCase())+".wav";
	AudioHelper.play({src: "pokemon_names/"+pokedexSpeechSoundFile, volume: 0.8, autoplay: true, loop: false}, true);
};


export function PokedexScan(trainer_token, target_pokemon_token)
{
	let trainer_actor = trainer_token.actor;
	let target_pokemon_actor = target_pokemon_token.actor;
	let distance = GetDistanceBetweenTokens(trainer_token, target_pokemon_token)

	if(distance > 10)
	{
		ui.notifications.warn(`Target is ${distance}m away, which is past the Pokedex's scan range of 10m!`);
		AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"warning.wav", volume: 0.5, autoplay: true, loop: false}, true);
		return;
	}
	if(target_pokemon_actor.data.type != "pokemon")
	{
		ui.notifications.warn(`Target is not a pokemon!`);
		AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"warning.wav", volume: 0.5, autoplay: true, loop: false}, true);
		return;
	}

	if(target_pokemon_token.data.disposition == -1)
	{
		target_pokemon_token.update({"disposition": 0});
	}
	
	AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"pokedex_ding.wav", volume: 0.5, autoplay: true, loop: false}, true);
	setTimeout(() => {  SpeakPokemonName(target_pokemon_actor); }, 800);
	target_pokemon_token.update
	game.PTUMoveMaster.TakeAction(trainer_actor, "Standard");
	return;
};


export function TakeAction(actor, action_type="Standard", action_subtype="N/A")
{
	console.log("TakeAction: actor: " + actor.name + ", action_type: " + action_type + ", action_subtype: " + action_subtype);

	if(action_type == "Standard")
	{
		let support_action = false;

		let actions;
		if(actor.data.flags && actor.data.flags.ptu && actor.data.flags.ptu.actions_taken)
		{
			actions = actor.data.flags.ptu.actions_taken;
			support_action = actions.support;
			console.log("support_action");
			console.log(support_action);
		}

		if( (support_action != true) && (action_subtype != "Physical" && action_subtype != "Special") && (game.settings.get("PTUMoveMaster", "useExtraActionHomebrew")) )
		{	// This handles the homebrew option for extra standard actions that can't be used for directly damaging moves
			if(action_subtype == "Physical")
			{
				actor.update({ 
					"flags.ptu.actions_taken.support": true,
					"flags.ptu.actions_taken.attacked.physical": true
				});
			}
			else if(action_subtype == "Special")
			{
				actor.update({ 
					"flags.ptu.actions_taken.support": true,
					"flags.ptu.actions_taken.attacked.special": true
				});
			}
			else if(action_subtype == "Status")
			{
				actor.update({ 
					"flags.ptu.actions_taken.support": true,
					"flags.ptu.actions_taken.attacked.status": true
				});
			}
			else if(action_subtype == "N/A" || action_subtype == "None")
			{
				actor.update({ "flags.ptu.actions_taken.support": true });
			}
			else
			{
				ui.notifications.warn("Something has gone terribly wrong, no action subtype specified, even the default.");
			}
		}
		else
		{	// Non-homebrew and/or damaging move and/or second nondamaging branch
			if(action_subtype == "Physical")
			{
				actor.update({ 
					"flags.ptu.actions_taken.standard": true,
					"flags.ptu.actions_taken.attacked.physical": true
				});
			}
			else if(action_subtype == "Special")
			{
				actor.update({ 
					"flags.ptu.actions_taken.standard": true,
					"flags.ptu.actions_taken.attacked.special": true
				});
			}
			else if(action_subtype == "Status")
			{
				actor.update({ 
					"flags.ptu.actions_taken.standard": true,
					"flags.ptu.actions_taken.attacked.status": true
				});
			}
			else if(action_subtype == "N/A" || action_subtype == "None")
			{
				actor.update({ "flags.ptu.actions_taken.standard": true });
			}
			else
			{
				ui.notifications.warn("Something has gone terribly wrong, no action subtype specified, even the default.");
			}
		}
	}
	else if(action_type == "Full")
	{
		let support_action = false;

		let actions;
		if(actor.data.flags && actor.data.flags.ptu)
		{
			actions = actor.data.flags.ptu.actions_taken;
			support_action = actions.support;
		}

		if( (support_action != true) && (action_subtype != "Physical" && action_subtype != "Special") && (game.settings.get("PTUMoveMaster", "useExtraActionHomebrew")) )
		{	// This handles the homebrew option for extra standard actions that can't be used for directly damaging moves
			if(action_subtype == "Physical")
			{
				actor.update({ 
					"flags.ptu.actions_taken.support": true,
					"flags.ptu.actions_taken.shift": true,
					"flags.ptu.actions_taken.attacked.physical": true
				});
			}
			else if(action_subtype == "Special")
			{
				actor.update({ 
					"flags.ptu.actions_taken.support": true,
					"flags.ptu.actions_taken.shift": true,
					"flags.ptu.actions_taken.attacked.special": true
				});
			}
			else if(action_subtype == "Status")
			{
				actor.update({ 
					"flags.ptu.actions_taken.support": true,
					"flags.ptu.actions_taken.shift": true,
					"flags.ptu.actions_taken.attacked.status": true
				});
			}
			else if(action_subtype == "N/A" || action_subtype == "None")
			{
				actor.update({ "flags.ptu.actions_taken.support": true, "flags.ptu.actions_taken.shift": true });
				
			}
			else
			{
				ui.notifications.warn("Something has gone terribly wrong, no action subtype specified, even the default.");
			}
		}
		else
		{	// Non-homebrew and/or damaging move and/or second nondamaging branch
			if(action_subtype == "Physical")
			{
				actor.update({ 
					"flags.ptu.actions_taken.standard": true,
					"flags.ptu.actions_taken.shift": true,
					"flags.ptu.actions_taken.attacked.physical": true
				});
			}
			else if(action_subtype == "Special")
			{
				actor.update({ 
					"flags.ptu.actions_taken.standard": true,
					"flags.ptu.actions_taken.shift": true,
					"flags.ptu.actions_taken.attacked.special": true
				});
			}
			else if(action_subtype == "Status")
			{
				actor.update({ 
					"flags.ptu.actions_taken.standard": true,
					"flags.ptu.actions_taken.shift": true,
					"flags.ptu.actions_taken.attacked.status": true
				});
			}
			else if(action_subtype == "N/A" || action_subtype == "None")
			{
				actor.update({ "flags.ptu.actions_taken.standard": true, "flags.ptu.actions_taken.shift": true });
			}
			else
			{
				ui.notifications.warn("Something has gone terribly wrong, no action subtype specified, even the default.");
			}
		}
	}
	else if (action_type == "Swift")
	{
		if(action_subtype == "Physical")
		{
			actor.update({ 
				"flags.ptu.actions_taken.swift": true,
				"flags.ptu.actions_taken.attacked.physical": true
			});
		}
		else if(action_subtype == "Special")
		{
			actor.update({ 
				"flags.ptu.actions_taken.swift": true,
				"flags.ptu.actions_taken.attacked.special": true
			});
		}
		else if(action_subtype == "Status")
		{
			actor.update({ 
				"flags.ptu.actions_taken.swift": true,
				"flags.ptu.actions_taken.attacked.status": true
			});
		}
		else if(action_subtype == "N/A" || action_subtype == "None")
		{
			actor.update({ "flags.ptu.actions_taken.swift": true });
		}
		else
		{
			ui.notifications.warn("Something has gone terribly wrong, no action subtype specified, even the default.");
		}
	}
	else if (action_type == "Shift")
	{
		if(action_subtype == "Physical")
		{
			actor.update({ 
				"flags.ptu.actions_taken.shift": true,
				"flags.ptu.actions_taken.attacked.physical": true
			});
		}
		else if(action_subtype == "Special")
		{
			actor.update({ 
				"flags.ptu.actions_taken.shift": true,
				"flags.ptu.actions_taken.attacked.special": true
			});
		}
		else if(action_subtype == "Status")
		{
			actor.update({ 
				"flags.ptu.actions_taken.shift": true,
				"flags.ptu.actions_taken.attacked.status": true
			});
		}
		else if(action_subtype == "N/A" || action_subtype == "None")
		{
			actor.update({ "flags.ptu.actions_taken.shift": true });
		}
		else
		{
			ui.notifications.warn("Something has gone terribly wrong, no action subtype specified, even the default.");
		}
	}

	// setTimeout(() => {  

	// 	if(action_type == "Standard" || action_type == "Full")
	// 	{
			
	// 		let actor_has_Magic_Guard = false;
	// 		for(let item of actor.data.items)
	// 		{
	// 			if(item.name == "Magic Guard")
	// 			{
	// 				actor_has_Magic_Guard = true;
	// 				break;
	// 			}
	// 		}

	// 		let actorInjuries = actor.data.data.health.injuries;

	// 		if(actorInjuries >=5)
	// 		{
	// 			game.PTUMoveMaster.chatMessage(actor, actor.name + ' took a standard action while they have '+ actorInjuries +' injuries - they take '+actorInjuries+' damage!');
	// 			actor.modifyTokenAttribute("health", (-actorInjuries), true, true);
	// 			game.PTUMoveMaster.ApplyInjuries(actor, actorInjuries);
	// 		}

	// 		let actor_active_effects = actor.effects;
	// 		console.log("actor_active_effects");
	// 		console.log(actor_active_effects);

	// 		if (actor.data.flags.ptu)
	// 		{
	// 			if (actor.data.flags.ptu.is_badly_poisoned)
	// 			{
	// 				let round_of_badly_poisoned = 0;

	// 				for(let active_effect of actor_active_effects)
	// 				{
	// 					console.log("active_effect");
	// 					console.log(active_effect);

	// 					if(active_effect.data.changes[1])
	// 					{
	// 						if(active_effect.data.changes[1].key == "flags.ptu.is_badly_poisoned")
	// 						{
	// 							console.log('active_effect.getFlag("ptu", "roundsElapsed")');
	// 							console.log(active_effect.getFlag("ptu", "roundsElapsed"));
		
	// 							round_of_badly_poisoned = active_effect.getFlag("ptu", "roundsElapsed");									
	// 							console.log("round_of_badly_poisoned");
	// 							console.log(round_of_badly_poisoned);
		
	// 							break;
	// 						}
	// 					}
	// 				}
		
	// 				let badly_poisoned_damage = 5*(2**round_of_badly_poisoned);
		
	// 				game.PTUMoveMaster.damageActorFlatValue(actor, badly_poisoned_damage, ("round "+Number(round_of_badly_poisoned+1)+" of Badly Poisoned"));
	// 			}
	// 			else if(actor.data.flags.ptu.is_poisoned)
	// 			// if(actor.data.flags.ptu.is_poisoned)
	// 			{
	// 				if(actor_has_Magic_Guard)
	// 				{
	// 					game.PTUMoveMaster.chatMessage(actor, actor.name+"'s Magic Guard prevents damage from Poisoned!");
	// 				}
	// 				else
	// 				{
	// 					game.PTUMoveMaster.damageActorTick(actor, "Poisoned");
	// 				}
	// 			}
		
	// 			if(actor.data.flags.ptu.is_burned)
	// 			{
	// 				if(actor_has_Magic_Guard)
	// 				{
	// 					game.PTUMoveMaster.chatMessage(actor, actor.name+"'s Magic Guard prevents damage from Burned!");
	// 				}
	// 				else
	// 				{
	// 					game.PTUMoveMaster.damageActorTick(actor, "Burned");
	// 				}
	// 			}
	// 		}
	// 	}

	// }, 800);
};


export async function ResetActionEconomy(actor)
{
	await actor.update({
		"flags.ptu.actions_taken.standard": false, 
		"flags.ptu.actions_taken.swift": false, 
		"flags.ptu.actions_taken.shift": false, 
		"flags.ptu.actions_taken.attacked.physical": false,
		"flags.ptu.actions_taken.attacked.special": false,
		"flags.ptu.actions_taken.attacked.status": false,
		"flags.ptu.actions_taken.support": false
	});
}


export async function RollCaptureChance(trainer, target, pokeball, to_hit_roll, target_token)
{
	let CaptureRollModifier = 0;
	let CaptureRate = 100;

	let TargetWeight = target.data.data.capabilities["Weight Class"];
	let TrainerActivePokemon = [];

	let TargetSpecies = target.data.data.species;
	let TargetType1 = target.data.data.typing[0];
	let TargetType2 = target.data.data.typing[1];
	let TargetMovementCapabilities = target.data.data.capabilities;
	let TargetMovementAtLeast7 = false;
	let TargetLevel = target.data.data.level.current;

	if( (TargetMovementCapabilities["Overland"] >= 7) || (TargetMovementCapabilities["Swim"] >= 7) || (TargetMovementCapabilities["Sky"] >= 7) || (TargetMovementCapabilities["Burrow"] >= 7) || (TargetMovementCapabilities["Levitate"] >= 7) || (TargetMovementCapabilities["Teleporter"] >= 7) )
	{
		TargetMovementAtLeast7 = true;
	}


	let TargetEvolvesWithStone = false;

	if(to_hit_roll == 20)
	{
		CaptureRollModifier -= 10;
	}

	let PokemonLevel = target.data.data.level.current;
	
	let TrainerLevel = trainer.data.data.level.current;
	CaptureRollModifier -= TrainerLevel;

	let StoneEvolutionPokemon = [
		"Eevee", "Vaporeon", "Jolteon", "Flareon", "Espeon", "Umbreon", "Leafeon", "Glaceon", "Sylveon", "Nucleon", "Vulpix", "Ninetales", "Growlithe", 
		"Arcanine", "Pansear", "Simisear",  "Poliwhirl",  "Poliwrath",  "Poliwag",  "Shellder",  "Cloyster",  "Staryu",  "Starmie",  "Lombre",  "Lotad",  
		"Ludicolo",  "Panpour",  "Simipour",  "Pansage",  "Simisage",  "Pikachu",  "Pichu",  "Raichu",  "Eelektrik",  "Tynamo",  "Eelektross",  "Gloom",  
		"Oddish",  "Vileplume",  "Bellossom",  "Weepinbell",  "Bellsprout",  "Victreebel",  "Exeggcute",  "Exeggutor",  "Alolan Exeggutor",  "Nuzleaf",  
		"Seedot",  "Shiftry",  "Nidorina",  "Nidorino",  "Nidoran",  "Nidoking",  "Nidoqueen",  "nidoran-(m)",  "nidoran-(f)",  "Clefairy",  "Cleffa",  
		"Clefable",  "Jigglypuff",  "Igglybuff",  "Wigglytuff",  "Skitty",  "Delcatty",  "Munna",  "Musharna",  "Sunkern",  "Sunflora",  "Cottonee",  
		"Whimsicott",  "Petilil",  "Lilligant",  "Helioptile",  "Heliolisk",  "Togetic",  "Togepi",  "Togekiss",  "Roselia",  "Budew",  "Roserade",  
		"Minccino",  "Cinccino",  "Floette",  "Florges",  "Flabébé",  "Murkrow",  "Honchkrow",  "Misdreavus",  "Mismagius",  "Lampent",  "Litwick",  
		"Chandelure",  "Doublade",  "Honedge",  "Aegislash",  "Kirlia",  "Ralts",  "Gardevoir",  "Gallade",  "Snorunt",  "Glalie", "Froslass"
	];

	if(StoneEvolutionPokemon.includes(TargetSpecies))
	{
		TargetEvolvesWithStone = true;
	}

	let speciesInfo = game.ptu.GetSpeciesData(TargetSpecies);

	let evolutionData = speciesInfo.Evolution;

	let myEvolution = 0;
	let maxEvolution = 0;
	evolutionData.forEach(j => {
		if (j[1].toLowerCase() == TargetSpecies.toLowerCase()) 
		{
			myEvolution = j[0];
		}
		if (j[0] > maxEvolution)
		{
			maxEvolution = j[0];
		}
	});

	let evolutionsLeft = maxEvolution - myEvolution;

	let currentRound = 1;
	if(game.combat)
	{
		currentRound = game.combat.round;
	}
	
	let currentRoundQuickBallMod = -20;

	if(currentRound == 2)
	{
		currentRoundQuickBallMod = 5;
	}
	else if(currentRound == 3)
	{
		currentRoundQuickBallMod = 10;
	}
	else if (currentRound >= 4)
	{
		currentRoundQuickBallMod = 20;
	}

	let TargetIsWaterOrBug = false;
	if(TargetType1 == "Water" || TargetType1 == "Bug" || TargetType2 == "Water" || TargetType2 == "Bug")
	{
		TargetIsWaterOrBug = true;
	}

	let TargetIsBelowLevel10 = false;
	if(TargetLevel < 10)
	{
		TargetIsBelowLevel10 = true;
	}

	let pokeball_stats = {
		"Basic Ball": {"Base Modifier": 0},
		"Great Ball": {"Base Modifier": -10},
		"Ultra Ball": {"Base Modifier": -15},
		"Master Ball": {"Base Modifier": -100},
		"Safari Ball": {"Base Modifier": 0},
		"Level Ball": {"Base Modifier": 0, "Conditions": "-20 Modifier if the target is under half the level your active Pokémon is.", "Conditional Modifier": -20},
		"Lure Ball": {"Base Modifier": 0, "Conditions": "-20 Modifier if the target was baited into the encounter with food.", "Conditional Modifier": -20},
		"Moon Ball": {"Base Modifier": (0 - (TargetEvolvesWithStone*20) )},
		"Friend Ball": {"Base Modifier": -5, "Effects": "A caught Pokémon will start with +1 Loyalty."},
		"Love Ball": {"Base Modifier": 0, "Conditions": "-30 Modifier if the user has an active Pokémon that is of the same evolutionary line as the target, and the opposite gender. Does not work with genderless Pokémon.", "Conditional Modifier": -30},
		"Heavy Ball": {"Base Modifier": (0- (Math.max(TargetWeight-1, 0)*5) )},
		"Fast Ball": {"Base Modifier": (0 - (TargetMovementAtLeast7*20) )},
		"Sport Ball": {"Base Modifier": 0},
		"Premier Ball": {"Base Modifier": 0},
		"Repeat Ball": {"Base Modifier": 0}, // TODO: -20 Modifier if you already own a Pokémon of the target’s species.
		"Timer Ball": {"Base Modifier": Math.max((5 - ((currentRound-1)*5) ), Number(-20))},
		"Nest Ball": {"Base Modifier": (0 - (TargetIsBelowLevel10*20) )},
		"Net Ball": {"Base Modifier": (0 - (TargetIsWaterOrBug*20) )},
		"Dive Ball": {"Base Modifier": 0, "Conditions": "-20 Modifier, if the target was found underwater or underground.", "Conditional Modifier": -20},
		"Luxury Ball": {"Base Modifier": -5, "Effects": "A caught Pokémon is easily pleased and starts with a raised happiness."},
		"Heal Ball": {"Base Modifier": -5, "Effects": "A caught Pokémon will heal to Max HP immediately upon capture."},
		"Quick Ball": {"Base Modifier": (currentRoundQuickBallMod)},
		"Dusk Ball": {"Base Modifier": 0, "Conditions": "-20 Modifier if it is dark, or if there is very little light out, when used.", "Conditional Modifier": -20},
		"Cherish Ball": {"Base Modifier": -5},
		"Park Ball": {"Base Modifier": -15}
	};


	console.log("Pokeball modifier: " + pokeball_stats[pokeball]["Base Modifier"] + " from "+ pokeball +".");
	CaptureRollModifier += pokeball_stats[pokeball]["Base Modifier"];
	console.log("CaptureRollModifier = " + CaptureRollModifier);
	
	CaptureRate -= PokemonLevel*2;
	console.log("Pokemon Level = " + PokemonLevel);
	console.log("CaptureRate = " + CaptureRate);

	let PokemonHitPoints = target.data.data.health.value;
	let PokemonHealthPercent = target.data.data.health.percent;
	console.log("PokemonHealthPercent = " + PokemonHealthPercent);

	if (PokemonHitPoints == 1)
	{
		CaptureRate = CaptureRate + 30;
		console.log("HP == 1");
		console.log("CaptureRate = " + CaptureRate);
	}
	else if (PokemonHealthPercent <= 25)
	{
		CaptureRate = CaptureRate + 15;
		console.log("HP <= 25");
		console.log("CaptureRate = " + CaptureRate);
	}
	else if (PokemonHealthPercent <= 50)
	{
		CaptureRate = CaptureRate + 0;
		console.log("HP <= 50");
		console.log("CaptureRate = " + CaptureRate);
	}
	else if (PokemonHealthPercent <= 75)
	{
		CaptureRate = CaptureRate - 15;
		console.log("HP <= 75");
		console.log("CaptureRate = " + CaptureRate);
	}
	else if (PokemonHealthPercent > 75)
	{
		CaptureRate = CaptureRate - 30;
		console.log("HP > 75");
		console.log("CaptureRate = " + CaptureRate);
	}

	let PokemonShiny = target.data.data.shiny;

	if (PokemonShiny)
	{
		CaptureRate = CaptureRate - 10;
		console.log("Shiny == True");
		console.log("CaptureRate = " + CaptureRate);
	}

	let PokemonLegendary = target.data.data.legendary;

	if (PokemonLegendary)
	{
		CaptureRate = CaptureRate - 30;
		console.log("Legendary == True");
		console.log("CaptureRate = " + CaptureRate);
	}

	console.log("EvolutionsLeft == "+evolutionsLeft);
	if(evolutionsLeft == 2)
	{
		CaptureRate = CaptureRate + 10;
	}
	else if(evolutionsLeft == 0)
	{
		CaptureRate = CaptureRate - 10;
	}
	console.log("CaptureRate = " + CaptureRate);

	//TODO: Factor status afflictions; each persistent = +10, each volatile = +5, stuck = +10, slow = +5

	CaptureRate = CaptureRate + (target.data.data.health.injuries * 5)
	console.log("Injuries = " + target.data.data.health.injuries);
	console.log("CaptureRate = " + CaptureRate);


	let numDice=1;
	let dieSize = "d100";

	let roll= new Roll(`${numDice}${dieSize}+${CaptureRollModifier}`).roll()
	console.log("CAPTURE ROLL! ----------------");
	console.log(roll);


	// let dramaticDelayFactor = roll
	

	// const wait = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

	let pokeballShoop_params =
	[
		{
			filterType: "transform",
			filterId: "pokeballShoop",
			bpRadiusPercent: 100,
			//padding: 0,
			autoDestroy: true,
			animated:
			{
				bpStrength:
				{
					animType: "cosOscillation",//"cosOscillation",
					val1: 0,
					val2: -0.99,//-0.65,
					loopDuration: 1500,
					loops: 1,
				}
			}
		},

		{
			filterType: "glow",
			filterId: "pokeballShoop",
			outerStrength: 40,
			innerStrength: 20,
			color: 0xFFFFFF,//0x5099DD,
			quality: 0.5,
			//padding: 0,
			//zOrder: 2,
			autoDestroy: true,
			animated:
			{
				color: 
				{
				active: true, 
				loopDuration: 1500, 
				loops: 1,
				animType: "colorOscillation", 
				val1:0xFFFFFF,//0x5099DD, 
				val2:0xff0000,//0x90EEFF
				}
			}
		},

		{
			filterType: "adjustment",
			filterId: "pokeballShoop",
			saturation: 1,
			brightness: 10,
			contrast: 1,
			gamma: 1,
			red: 1,
			green: 1,
			blue: 1,
			alpha: 1,
			autoDestroy: true,
			animated:
			{
				alpha: 
				{ 
				active: true, 
				loopDuration: 1500, 
				loops: 1,
				animType: "syncCosOscillation",
				val1: 0.35,
				val2: 0.75 }
			}
		}
	];



	let polymorphFunc = async function () 
	{
		let transitionType = 9;
		let targetImagePath = "/item_icons/"+pokeball+".png";
		let polymorphFilterId = "pokeball";
		let polymorph_params;
		
		// Is the filter already activated on the placeable ? 
		if (target_token.TMFXhasFilterId(polymorphFilterId)) 
		{
		
			// Yes. So we update the type in the general section and loops + active in the progress animated section, to activate the animation for just one loop.
			// "type" to allow you to change the animation type
			// "active" to say at Token Magic : "Hey filter! It's time to work again!"
			// "loops" so that Token Magic can know how many loops it needs to schedule for the animation.
			// Each animation loop decreases "loops" by one. When "loops" reach 0, "active" becomes "false" and the animation will be dormant again.
			// Thank to the halfCosOscillation, a loop brings the value of the property from val1 to val2. A second loop is needed to bring val2 to val1. This is useful for monitoring progress with back and forth movements.
			polymorph_params =
				[{
					filterType: "polymorph",
					filterId: polymorphFilterId,
					type: transitionType,
					animated:
					{
						progress:
						{
							active: true,
							loops: 1
						}
					}
				}];

		} 
		else 
		{
			// No. So we create the entirety of the filter
			polymorph_params =
				[{
					filterType: "polymorph",
					filterId: polymorphFilterId,
					type: transitionType,
					padding: 70,
					magnify: 1,
					imagePath: targetImagePath,
					animated:
					{
						progress:
						{
							active: true,
							animType: "halfCosOscillation",
							val1: 0,
							val2: 100,
							loops: 1,
							loopDuration: 1000
						}
					}
				}];
		}

		// all functions that add, update or delete filters are asynchronous
		// if you are in a loop AND/OR you chain these functions, it is MANDATORY to await them
		// otherwise, data persistence may not works.
		// this is the reason why we use an async function (we cant use await in a non-async function)
		// avoid awaiting in a forEach loop, use "for" or "for/of" loop.
		await target_token.TMFXaddUpdateFilters(polymorph_params);
	};

	AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"pokeball_sounds/"+"pokeball_catch_attempt.mp3", volume: 0.5, autoplay: true, loop: false}, true);

	setTimeout(() => {  
		chatMessage(target, ("Pokeball hit! The ball wiggles..."));
		// ui.notifications.info(`The ball wiggles!`);
		AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"pokeball_sounds/"+"pokeball_escape_attempt.mp3", volume: 1.0, autoplay: true, loop: false}, true);
		
		setTimeout(() => {  
			roll.toMessage();
			if(Number(roll._total) <= CaptureRate)
			{
				AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"pokeball_sounds/"+"pokeball_catch_confirmed.mp3", volume: 0.8, autoplay: true, loop: false}, true);
				chatMessage(target, (target.name + " was captured! Capture DC was " + CaptureRate + ", and you rolled "+Number(roll._total)+"!"));

				target_token.TMFXdeleteFilters("pokeballWiggle");
				const strength = window.confetti.confettiStrength.high;
  				const shootConfettiProps = window.confetti.getShootConfettiProps(strength);
				
				// Update permissions
				let users = trainer.getUsers(CONST.ENTITY_PERMISSIONS.OWNER, true)
				let non_gm_user;
				let pokemon_parent_actor = game.actors.get(target_token.data.actorId);

				for(let user in users)
				{
					if(users[user].data.role < 4)
					{
						non_gm_user = users[user];
						break;
					}
				}

				game.actors.get(target_token.data.actorId).update({permission: {[non_gm_user.data._id]: CONST.ENTITY_PERMISSIONS.OWNER}, "data.pokeball":pokeball });

				setTimeout(() => {  window.confetti.shootConfetti(shootConfettiProps); }, 750);//364);
				setTimeout(() => {  
					AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"pokeball_sounds/"+"pokeball_success_jingle.wav", volume: 0.8, autoplay: true, loop: false}, true); 
					// await target.update({"data.owner = "});
				}, 750);
			}
			else
			{
				setTimeout(() => {  target_token.TMFXaddUpdateFilters(pokeballShoop_params); }, 800);
				setTimeout(() => {  
					polymorphFunc(); 
					setTimeout(() => { target_token.update({"scale": 1}); 
					target_token.TMFXdeleteFilters("pokeball");
					}, 1000);
				}, 500);
				AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"pokeball_sounds/"+"pokeball_release.mp3", volume: 0.5, autoplay: true, loop: false}, true);
				chatMessage(target, (target.name + " escaped the "+pokeball+"! Capture DC was " + CaptureRate + ", and you rolled "+Number(roll._total)+"."));
				target_token.TMFXdeleteFilters("pokeballWiggle");
			}
		}, 8000);
	}, 4000);
};


export function PokeballRelease(token)
{
	let pokeballShoop_params =
	[
		{
			filterType: "transform",
			filterId: "pokeballShoop",
			bpRadiusPercent: 100,
			//padding: 0,
			autoDestroy: true,
			animated:
			{
				bpStrength:
				{
					animType: "cosOscillation",//"cosOscillation",
					val1: 0,
					val2: -0.99,//-0.65,
					loopDuration: 1500,
					loops: 1,
				}
			}
		},

		{
			filterType: "glow",
			filterId: "pokeballShoop",
			outerStrength: 40,
			innerStrength: 20,
			color: 0xFFFFFF,//0x5099DD,
			quality: 0.5,
			//padding: 0,
			//zOrder: 2,
			autoDestroy: true,
			animated:
			{
				color: 
				{
				active: true, 
				loopDuration: 1500, 
				loops: 1,
				animType: "colorOscillation", 
				val1:0xFFFFFF,//0x5099DD, 
				val2:0xff0000,//0x90EEFF
				}
			}
		},

		{
			filterType: "adjustment",
			filterId: "pokeballShoop",
			saturation: 1,
			brightness: 10,
			contrast: 1,
			gamma: 1,
			red: 1,
			green: 1,
			blue: 1,
			alpha: 1,
			autoDestroy: true,
			animated:
			{
				alpha: 
				{ 
				active: true, 
				loopDuration: 1500, 
				loops: 1,
				animType: "syncCosOscillation",
				val1: 0.35,
				val2: 0.75 }
			}
		}
	];

	AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"pokeball_sounds/"+"pokeball_release.mp3", volume: 0.5, autoplay: true, loop: false}, true);
	token.TMFXaddUpdateFilters(pokeballShoop_params);
	token.update({"scale": 1});
	token.TMFXdeleteFilters("pokeballWiggle");
	token.TMFXdeleteFilters("pokeball");
};


export function ThisPokemonsTrainerCommandCheck(pokemon_actor)
{
	let return_value = true;
	let trainer_actor = game.actors.get(pokemon_actor.data.data.owner)
	let commanding_skill = "command";
	let pokemon_loyalty = pokemon_actor.data.data.loyalty;


	let alternate_commanding_skill_features = {
		"Beast Master": "intimidate",
	};
	if(game.settings.get("PTUMoveMaster", "pokepsychologistCanReplaceCommand") == true)
	{
		alternate_commanding_skill_features = {
			"Beast Master": "intimidate",
			"PokePsychologist": "pokemonEd",
			"PokéPsychologist": "pokemonEd"
		};
	}

	let loyalty_DCs = {
		0: 20,
		1: 8
	};

	let command_DC = loyalty_DCs[pokemon_loyalty];

	if(trainer_actor && command_DC)
	{
		let commanding_skill_rank = (trainer_actor.data.data.skills[commanding_skill].value);
		
		for(let alternate_commanding_skill_feature in alternate_commanding_skill_features)
		{
			for(let item of trainer_actor.items)
			{
				if((item.type == "edge" || item.type == "feat") && item.name == alternate_commanding_skill_feature)
				{
					if(eval(
						'trainer_actor.data.data.skills.'+alternate_commanding_skill_features[alternate_commanding_skill_feature]
						).value > commanding_skill_rank)
					{
						commanding_skill = alternate_commanding_skill_features[alternate_commanding_skill_feature];
						commanding_skill_rank = trainer_actor.data.data.skills[alternate_commanding_skill_features[alternate_commanding_skill_feature]].value;
					}
					break;
				}
			}
		}	

		let numDice=commanding_skill_rank;
		let dieSize = "d6";
		let dieModifier = (trainer_actor.data.data.skills[commanding_skill].modifier);

		let roll= new Roll(`${numDice}${dieSize}+${dieModifier}`).roll()
		roll.toMessage(
			{flavor: `${trainer_actor.name} attempts a ${commanding_skill} check to control a disloyal pokemon.`,
			speaker: ChatMessage.getSpeaker({token: trainer_actor}),}
		)

		if((roll.results[0]+roll.results[2]) < command_DC)
		{
			return_value = false;
		}
	}

	return return_value;
};


export async function ShowPokeballMenu(actor)
{
	AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+UIPopupSound, volume: 0.8, autoplay: true, loop: false}, false);
	AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"pokeball_sounds/pokeball_grow.mp3", volume: 0.8, autoplay: true, loop: false}, false);
	let pokeball_inventory = [];
	let pokeball_buttons = [];

	let target_pokemon_token = Array.from(game.user.targets)[0];

	let trainer_tokens = actor.getActiveTokens();
	let actor_token = trainer_tokens[0]; // The throwing trainer

	for(let item of actor.data.items)
	{
		if(item.type == "item" && item.name.includes("Ball"))
		{
			pokeball_inventory.push(item);
		}
	}

	for(let pokeball of pokeball_inventory)
	{
		let pokeball_image = "";
		let pokeball_count = pokeball.data.quantity;

		for(let i=0; (i < pokeball_count) && (i < 10); i++)
		{
			if(pokeball.name.includes("Thrown"))
			{//filter: sepia(100%) saturate(300%) brightness(70%) hue-rotate(180deg);
				let pokeball_name_without_thrown = pokeball.name.replace("Thrown ", "");
				pokeball_image = pokeball_image + "<img src='item_icons/"+pokeball_name_without_thrown+".png' style='border-width: 0px; height: 30px; filter: saturate(0%) opacity(50%) brightness(100%);'></img>";
			}
			else if(pokeball.name.includes("Broken"))
			{//filter: sepia(100%) saturate(300%) brightness(70%) hue-rotate(180deg);
				let pokeball_name_without_broken = pokeball.name.replace("Broken ", "");
				pokeball_image = pokeball_image + "<img src='item_icons/"+pokeball_name_without_broken+".png' style='border-width: 0px; height: 30px; filter: sepia(100%) saturate(150%) brightness(100%);'></img>";
			}
			else
			{
				pokeball_image = pokeball_image + "<img src='item_icons/"+pokeball.name+".png' style='border-width: 0px; height: 30px;'></img>";
			}
		}

		pokeball_buttons[pokeball.name]={
			label: "<center><div style='background-color:"+ MoveButtonBackgroundColor +";color:"+ MoveButtonTextColor +"; padding-left: 0px ;width:167px;height:"+Number(ButtonHeight)+"px;font-size:20px;font-family:Modesto Condensed;line-height:0.8'><h3 style='padding: 0px;font-family:Modesto Condensed;font-size:20px; color: white; background-color: #272727 ; overflow-wrap: normal ! important; word-break: keep-all ! important;'><div style='padding-top:2px'>"+pokeball.name+" ("+pokeball_count+")</div>"+"</h3>"+pokeball_image+"<h6 style='padding-top: 4px;padding-bottom: 0px;font-size:"+RangeFontSize+"px;'>"+"</h6>"+"</div></center>",
			callback: async () => {

				if(!target_pokemon_token || target_pokemon_token.actor.data.type != "pokemon" || target_pokemon_token.actor.data.data.owner != "0")
				{
					ui.notifications.warn("You must target an unowned Pokemon to throw a Pokeball");
					AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"warning.wav", volume: 0.5, autoplay: true, loop: false}, true);
					return;
				}

				if(await ExpendItem(actor, pokeball))
				{
					await game.PTUMoveMaster.ThrowPokeball(actor_token, target_pokemon_token, pokeball.name);
				}
				else
				{
					AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"warning.wav", volume: 0.5, autoplay: true, loop: false}, true);
				}
				

			}
		};
	}

	let dialogOptions = game.users.filter(u => u.data.role < 3).map(u => `<option value=${u.id}> ${u.data.name} </option>`).join(``);
	let dialogEditor = new Dialog({
	  title: `Pokeball Selector`,
	//   content: `
	//   <div><h2>Paste your image url below:</h2><div>
	//   <div>URL: <input name="url" style="width:350px"/></div>
	//   <div><i>if the image is from the internet do not forget to include http(s):// in the url</i></div>
	//   <div>Whisper to player?<input name="whisper" type="checkbox"/></div>
	//   <div">Player name:<select name="player">${dialogOptions}</select></div>
	//   `,
	  content: "<center><div><h1>Throw a Pokeball!</h1></div><div style='font-family:Modesto Condensed;font-size:20px'><h2>"+"</h2><div><center>",
	  buttons: pokeball_buttons
	});
	
	dialogEditor.render(true);
}


export async function ShowInventoryMenu(actor)
{
	AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+UIPopupSound, volume: 0.8, autoplay: true, loop: false}, false);
	let item_buttons = [];
	let item_inventory = [];

	let target = Array.from(game.user.targets)[0];
	if(!target)
	{
		target = game.actors.get(actor.id).getActiveTokens()[0];
	}

	let targetTypingText = game.PTUMoveMaster.GetTargetTypingHeader(target, actor);
	let background_field = "style='background-image: url('background_fields/BG_Grass.png');'";

	let trainer_tokens = actor.getActiveTokens();
	let actor_token = trainer_tokens[0]; // The using actor

	// let relevant_item_types = [
	// 	"Potion", "Revive", "Antidote", "Repel", "Cure", "Heal", "Bait"
	// ];

	// for(let item_type of relevant_item_types)
	// {
		for(let item of actor.data.items)
		{
			if(item.data.data.type == "item" && !item.data.data.name.includes(" Ball"))
			{
				item_inventory.push(item);
			}
		}
	// }

	for(let inventory_item of item_inventory)
	{
		let item_base_image = await game.PTUMoveMaster.GetItemArt(inventory_item.name);
		let item_image = "";
		let item_count = inventory_item.data.data.quantity;
		
		for(let i=0; (i < item_count) && (i < 10); i++)
		{
			item_image = item_image + "<img src='"+item_base_image+"' style='border-width: 0px; width: 30px;'></img>";
		}

		item_buttons[inventory_item.name]={
			label: "<center><div style='background-color:"+ MoveButtonBackgroundColor +";color:"+ MoveButtonTextColor +"; padding-left: 0px ;width:167px;height:"+Number(ButtonHeight)+"px;font-size:20px;font-family:Modesto Condensed;line-height:0.8'><h3 style='padding: 0px;font-family:Modesto Condensed;font-size:20px; color: white; background-color: #272727 ; overflow-wrap: normal ! important; word-break: keep-all ! important;'><div style='padding-top:2px'>"+inventory_item.name+" ("+item_count+")</div>"+"</h3>"+item_image+"<h6 style='padding-top: 4px;padding-bottom: 0px;font-size:"+RangeFontSize+"px;'>"+"</h6>"+"</div></center>",
			callback: async () => {

				if(await ExpendItem(actor, inventory_item))
				{
					await game.PTUMoveMaster.UseInventoryItem(actor_token, target, inventory_item.name);
				}
				else
				{
					AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"warning.wav", volume: 0.5, autoplay: true, loop: false}, true);
				}

			}
		};
	}

	let dialogOptions = game.users.filter(u => u.data.role < 3).map(u => `<option value=${u.id}> ${u.data.name} </option>`).join(``);
	let dialogEditor = new Dialog({
	  title: `Inventory Selector`,
	//   content: `
	//   <div><h2>Paste your image url below:</h2><div>
	//   <div>URL: <input name="url" style="width:350px"/></div>
	//   <div><i>if the image is from the internet do not forget to include http(s):// in the url</i></div>
	//   <div>Whisper to player?<input name="whisper" type="checkbox"/></div>
	//   <div">Player name:<select name="player">${dialogOptions}</select></div>
	//   `,
	  content: "<center><div><h1>Use an item!</h1></div><div style='font-family:Modesto Condensed;font-size:20px'><h2>"+targetTypingText+"</h2><div><center>",
	  buttons: item_buttons
	});
	
	dialogEditor.render(true);
}


export function ShowManeuverMenu(actor)
{
	let maneuver_list = {
		"Disarm": {
			"Trainer Only":false,
			"Action":"Standard", 
			"AC":6, 
			"Class":"Status", 
			"Frequency":"At-Will", 
			"Range":"Melee, 1 Target", 
			"User Checks":[ "combat", "stealth" ],
			"Target Checks":[ "combat", "stealth" ],
			"Success":"The target’s Held Item (Main Hand or Off-Hand for humans) falls to the ground.",
			"Failure":""
		},
		"Dirty Trick: Hinder": {
			"Trainer Only":false,
			"Action":"Standard", 
			"AC":2, 
			"Class":"Status", 
			"Frequency":"Scene, Per-Target", 
			"Range":"Melee, 1 Target", 
			"User Checks":[ "athletics" ],
			"Target Checks":[ "athletics" ],
			"Success":"The target is Slowed and takes a -2 penalty to all Skill Checks for one full round.",
			"Failure":""
		},
		"Dirty Trick: Blind": {
			"Trainer Only":false,
			"Action":"Standard", 
			"AC":2, 
			"Class":"Status", 
			"Frequency":"Scene, Per-Target", 
			"Range":"Melee, 1 Target", 
			"User Checks":[ "stealth" ],
			"Target Checks":[ "stealth" ],
			"Success":"The target is Blinded for one full round.",
			"Failure":""
		},
		"Dirty Trick: Low Blow": {
			"Trainer Only":false,
			"Action":"Standard", 
			"AC":2, 
			"Class":"Status", 
			"Frequency":"Scene, Per-Target", 
			"Range":"Melee, 1 Target", 
			"User Checks":[ "acrobatics" ],
			"Target Checks":[ "acrobatics" ],
			"Success":"The target is Vulnerable and has their Initiative set to 0 until the end of your next turn.",
			"Failure":""
		},
		"Manipulate: Bon Mot": {
			"Trainer Only":true,
			"Action":"Standard", 
			"AC":2, 
			"Class":"Status", 
			"Frequency":"Scene, Per-Target", 
			"Range":"6, 1 Target", 
			"User Checks":[ "guile" ],
			"Target Checks":[ "guile", "focus" ],
			"Success":"The target is Enraged and cannot spend AP for one full round. The target does not gain a Save Check against this effect.",
			"Failure":""
		},
		"Manipulate: Flirt": {
			"Trainer Only":true,
			"Action":"Standard", 
			"AC":2, 
			"Class":"Status", 
			"Frequency":"Scene, Per-Target", 
			"Range":"6, 1 Target", 
			"User Checks":[ "charm" ],
			"Target Checks":[ "charm", "focus" ],
			"Success":"The target is Infatuated with you for one full round. The target automatically fails their Save Check.",
			"Failure":""
		},
		"Manipulate: Terrorize": {
			"Trainer Only":true,
			"Action":"Standard", 
			"AC":2, 
			"Class":"Status", 
			"Frequency":"Scene, Per-Target", 
			"Range":"6, 1 Target", 
			"User Checks":[ "intimidate" ],
			"Target Checks":[ "intimidate", "focus" ],
			"Success":"The target loses all Temporary Hit Points and can only use At-Will Frequency Moves for one full round.",
			"Failure":""
		},
		"Push": {
			"Trainer Only":false,
			"Action":"Standard", 
			"AC":4, 
			"Class":"Status", 
			"Frequency":"Scene, Per-Target", 
			"Range":"Melee, 1 Target", 
			"User Checks":[ "combat", "athletics" ],
			"Target Checks":[ "combat", "athletics" ],
			"Success":"The target is Pushed back 1 Meter directly away from you. If you have Movement remaining this round, you may then Move into the newly occupied Space, and Push the target again. This continues until you choose to stop, or have no Movement remaining for the round. Push may only be used against a target whose weight is no heavier than your Heavy Lifting rating.",
			"Failure":""
		},
		"Trip": {
			"Trainer Only":false,
			"Action":"Standard", 
			"AC":6, 
			"Class":"Status", 
			"Frequency":"Scene, Per-Target", 
			"Range":"Melee, 1 Target", 
			"User Checks":[ "combat", "acrobatics" ],
			"Target Checks":[ "combat", "acrobatics" ],
			"Success":"The target is knocked over and Tripped.",
			"Failure":""
		},
		"Grapple": {
			"Trainer Only":false,
			"Action":"Standard", 
			"AC":6, 
			"Class":"Status", 
			"Frequency":"Scene, Per-Target", 
			"Range":"Melee, 1 Target", 
			"User Checks":[ "combat", "athletics" ],
			"Target Checks":[ "combat", "athletics" ],
			"Success":"You and the target each become Grappled, and you gain Dominance in the Grapple.",
			"Failure":""
		},
		"Take a Breather": {
			"Trainer Only":false,
			"Action":"Full", 
			"AC":"--", 
			"Class":"None", 
			"Frequency":"At-Will", 
			"Range":"Self, Full Action", 
			"User Checks":[],
			"Target Checks":[],
			"Success":"Trainers and Pokémon can Take a Breather and temporarily remove themselves from the heat of combat to recover from Confusion and other Volatile Status Afflictions, though they still must pass any Save Checks to be able to take this action and do so. Taking a Breather is a Full Action and requires a Pokémon or Trainer to use their Shift Action to move as far away from enemies as possible, using their highest available Movement Capability. They then become Tripped and are Vulnerable until the end of their next turn. When a Trainer or Pokémon Takes a Breather, they set their Combat Stages back to their default level, lose all Temporary Hit Points, and are cured of all Volatile Status effects and the Slow and Stuck conditions. To be cured of Cursed in this way, the source of the Curse must either be Knocked Out or no longer within 12 meters at the end of the Shift triggered by Take a Breather. When a Trainer or Pokémon is unable to choose to Take a Breather themselves, such as when they are inflicted with the Rage Status Affliction or when someone doesn’t want to take a chance on passing a Confusion Save Check, they may be calmed and assisted by a Trainer to attempt to Take a Breather. This is a Full Action by both the assisting Trainer and their target (as an Interrupt for the target), and the assisting Trainer must be able to Shift to the target they intend to help. They then make a Command Check with a DC of 12. Upon success, both the assisting Trainer and their target must Shift as far away from enemies as possible, using the lower of the two’s maximum movement for a single Shift. They then both become Tripped and are treated as having 0 Evasion until the end of their next turn. The Trainer that has been assisted then gains all the effects of Taking a Breather. Upon a failure, nothing happens, and the assisted Trainer is not cured of their Status Afflictions.",
			"Failure":""
		},
		"Intercept Melee": {
			"Trainer Only":false,
			"Action":"Full", 
			"AC":"--", 
			"Class":"Status", 
			"Frequency":"At-Will", 
			"Range":"Interrupt, Trigger", 
			"User Checks":[ "acrobatics", "athletics" ],
			"Target Checks":[],
			"Success":"You must make an Acrobatics or Athletics Check, with a DC equal to three times the number of meters they have to move to reach the triggering Ally; If you succeed, you Push the triggering Ally 1 Meter away from you, and Shift to occupy their space, and are hit by the triggering attack. On Failure to make the Check, the user still Shifts a number of meters equal a third of their check result. Note: If the target that was Intercepted was hit by an Area of Effect Move, and the 1 meter push does not remove them from the Area of Effect, the Intercept has no effect since they are still in the area of the attack – it would cause the Interceptor to be hit by the Move however. <br><br>Additional Rules: <br>» Pokémon and Trainers may only Intercept against Priority and Interrupt Moves if they are faster than the user of those Moves. <br>» Moves that cannot miss (such as Aura Sphere or Swift) cannot be Intercepted.<br>» Pokémon and Trainers cannot attempt Intercepts if they are Asleep, Confused, Enraged, Frozen, Stuck, Paralyzed, or otherwise unable to move.<br>» Intercepts may not be used to move the Intercepting Pokémon or Trainer OUT of the way of an attack. They will always be hit, regardless.",
			"Failure":""
		},
		"Intercept Ranged": {
			"Trainer Only":false,
			"Action":"Full", 
			"AC":"--", 
			"Class":"Status", 
			"Frequency":"At-Will", 
			"Range":"Interrupt, Trigger", 
			"User Checks":[ "acrobatics", "athletics" ],
			"Target Checks":[],
			"Success":"Select a Square within your Movement Range that lies directly between the source of the attack and the target of the attack. Make an Acrobatics or Athletics Check; you may Shift a number of Meters equal to half the result towards the chosen square. If you succeed, you take the attack instead of its intended target. If you fail, you still Shift a number of Meters equal to half the result. Special: Pokemon must have a Loyalty of 3 or greater to make Intercept Melee and Intercept Range Maneuvers, and may only Intercept attacks against their Trainer. At Loyalty 6, Pokemon may Intercept for any Ally. <br><br>Additional Rules: <br>» Pokémon and Trainers may only Intercept against Priority and Interrupt Moves if they are faster than the user of those Moves. <br>» Moves that cannot miss (such as Aura Sphere or Swift) cannot be Intercepted.<br>» Pokémon and Trainers cannot attempt Intercepts if they are Asleep, Confused, Enraged, Frozen, Stuck, Paralyzed, or otherwise unable to move.<br>» Intercepts may not be used to move the Intercepting Pokémon or Trainer OUT of the way of an attack. They will always be hit, regardless.",
			"Failure":""
		},

	};

	for(let item of actor.data.items)
		{
			if(item.name.includes("Telekinetic") && item.type == "capability")
			{
				maneuver_list["Telekinetic Disarm"] = {
					"Trainer Only":false,
					"Action":"Standard", 
					"AC":6, 
					"Class":"Status", 
					"Frequency":"At-Will", 
					"Range":((actor.data.data.skills.focus.value.total)+", 1 Target"), 
					"User Checks":[ "focus" ],
					"Target Checks":[ "combat", "stealth" ],
					"Success":"The target’s Held Item (Main Hand or Off-Hand for humans) falls to the ground.",
					"Failure":""
				};

				maneuver_list["Telekinetic Trip"] = {
					"Trainer Only":false,
					"Action":"Standard", 
					"AC":6, 
					"Class":"Status", 
					"Frequency":"Scene, Per-Target", 
					"Range":((actor.data.data.skills.focus.value.total)+", 1 Target"), 
					"User Checks":[ "focus" ],
					"Target Checks":[ "combat", "acrobatics" ],
					"Success":"The target is knocked over and Tripped.",
					"Failure":""
				};

				maneuver_list["Telekinetic Push"] = {
					"Trainer Only":false,
					"Action":"Standard", 
					"AC":4, 
					"Class":"Status", 
					"Frequency":"Scene, Per-Target", 
					"Range":((actor.data.data.skills.focus.value.total)+", 1 Target"), 
					"User Checks":[ "focus" ],
					"Target Checks":[ "combat", "athletics" ],
					"Success":"The target is Pushed back "+Math.floor(actor.data.data.skills.focus.value.total/2)+" Meters directly away from you. Telekinetic Push may only be used against a target whose weight is no heavier than your Heavy Lifting rating (based off Focus ("+actor.data.data.skills.focus.value.total+") as if it was your Power Capability).",
					"Failure":""
				};

				break;
			}
		}

	// console.log(maneuver_list);

	let maneuver_buttons = {};

	let target = Array.from(game.user.targets)[0];
	let targetTypingText = game.PTUMoveMaster.GetTargetTypingHeader(target, actor)

	var currentType;
	var currentCategory;
	let currentlabel;
	let currentMoveTypeLabel;
	let currentDamageBase;
	let currentRange;
	let currentEffectText;
	let currentMoveRangeIcon = "";
	let effectivenessBackgroundColor = "lightgrey";
	var effectivenessTextColor = "black";
	let currentEffectivenessLabel = "x1";
	var effectivenessText = "";
	let effectiveness = {"Normal":1, "Fire":1, "Water":1, "Electric":1, "Grass":1, "Ice":1, "Fighting":1, "Poison":1, "Ground":1, "Flying":1, "Psychic":1, "Bug":1, "Rock":1, "Ghost":1, "Dragon":1, "Dark":1, "Steel":1, "Fairy":1 };
	let STABBorderImage = "";
	let DBBorderImage = "";
	let finalDB;
	let maneuver_AC;
	let currentUserChecks;
	let currentTargetChecks;

	let currentCooldownLabel = "<img src='" + AlternateIconPath + "AtWill" + CategoryIconSuffix + "' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";

	maneuver_buttons["backToMainSidebar"] = {noRefresh:true, id:"backToMainSidebar", label: "<img title='Go back to main move menu.' src='"+AlternateIconPath+"BackButton.png' style='border:none; margin-top:10px;'>",
		callback: async () => {
			PTUAutoFight().ChatWindow(actor);
		}
	};

	maneuver_buttons["maneuverDivider"] = {noRefresh: true, id:"maneuverDivider", label: "<img src='"+AlternateIconPath+"DividerIcon_ManeuverOptions.png' style='border:none; width:200px;'>",
		callback: () => {

		}};

	for(let maneuver in maneuver_list)
	{
		console.log(maneuver);

		if(actor.data.type == "pokemon" && maneuver_list[maneuver]["Trainer Only"])
		{
			continue;
		}

		currentType=maneuver_list[maneuver]["Type"];
		currentCategory=maneuver_list[maneuver]["Class"];
		currentlabel = maneuver;
		currentMoveTypeLabel = maneuver_list[maneuver]["Type"];
		currentDamageBase = "--";
		currentRange = maneuver_list[maneuver]["Range"];
		currentEffectText = maneuver_list[maneuver]["Success"];
		currentMoveRangeIcon = "";
		effectivenessBackgroundColor = "lightgrey";
		effectivenessTextColor = "black";
		currentEffectivenessLabel = "x1";
		effectivenessText = "";
		effectiveness = {"Normal":1, "Fire":1, "Water":1, "Electric":1, "Grass":1, "Ice":1, "Fighting":1, "Poison":1, "Ground":1, "Flying":1, "Psychic":1, "Bug":1, "Rock":1, "Ghost":1, "Dragon":1, "Dark":1, "Steel":1, "Fairy":1 };
		STABBorderImage = "";
		finalDB = currentDamageBase;
		DBBorderImage = '';
		maneuver_AC = maneuver_list[maneuver]["AC"];
		currentUserChecks = maneuver_list[maneuver]["User Checks"];
		currentTargetChecks = maneuver_list[maneuver]["Target Checks"];

		console.log("currentTargetChecks");
		console.log(currentTargetChecks);


		currentCooldownLabel = "<img src='" + AlternateIconPath + "AtWill" + CategoryIconSuffix + "' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";

		if(!target)
		{
			target = game.actors.get(actor.id).getActiveTokens()[0];
		}

		if(target.actor.data.data.effectiveness)
		{
			effectiveness = target.actor.data.data.effectiveness.All;
		}

		currentMoveTypeLabel = "<div><img src='" + AlternateIconPath + currentCategory + CategoryIconSuffix + "' style='width:100px height:auto border:0px ! important;width:"+TypeIconWidth+"px;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img><img src='" + AlternateIconPath + currentType + TypeIconSuffix + "' style='width:100px height:auto border:0px ! important;width:"+TypeIconWidth+"px;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img></div>";
		if(currentType == "Untyped" || currentType == "" || currentType == null)
		{
			// currentMoveTypeLabel = "<div><img src='" + AlternateIconPath + item.category + CategoryIconSuffix + "' width=80px height=auto></img></div>";
			currentMoveTypeLabel = "<div><img src='" + AlternateIconPath + currentCategory + CategoryIconSuffix + "' style='width:100px height:auto border:0px ! important;width:"+TypeIconWidth+"px;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img><img src='" + AlternateIconPath + "Untyped" + TypeIconSuffix + "' style='width:100px height:auto border:0px ! important;width:"+TypeIconWidth+"px;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img></div>";
		}

		let rangeIconReturn = game.PTUMoveMaster.GetRangeIcons(currentRange);
		let currentMoveRange = rangeIconReturn[0];
		currentMoveRangeIcon = rangeIconReturn[1];

		let currentMoveFiveStrike = false;
		let currentMoveDoubleStrike = false;

		if(currentTargetChecks[0])
		{
			let user_check_skill = "";
			let user_check_rank = 0;
			let user_check_modifier = 0;

			console.log("currentUserChecks");
			console.log(currentUserChecks);

			for(let check of currentUserChecks)
			{
				console.log("check");
				console.log(check);

				let check_skill_rank;
				let check_skill_modifier;

				eval("check_skill_rank = actor.data.data.skills."+check+".value.total;");
				eval("check_skill_modifier = actor.data.data.skills."+check+".modifier.total;");

				console.log("check_skill_rank");
				console.log(check_skill_rank);

				if(check_skill_rank > user_check_rank)
				{
					user_check_skill = check;
					user_check_rank = check_skill_rank;
					user_check_modifier = check_skill_modifier;
				}
			}

			let checkDieSize = "d6";
			let user_check_roll = new Roll(`${user_check_rank}${checkDieSize}+${user_check_modifier}`).roll()
			console.log("user_check_roll");
			console.log(user_check_roll);

			let currentTargetCheckText = '<button class="skill-button-1" style="font-family:Segoe UI; font-size: 14; padding:0px !important; margin-top:5px !important; margin-bottom:5px !important; background-color:#808080;" id="Target Check 1" type="button" value="Target Check 1" data-skill='+currentTargetChecks[0]+'>'+(currentTargetChecks[0])+'</button>';

			if(currentTargetChecks[1] != null)
			{
				currentTargetCheckText += (' or <button class="skill-button-2" style="font-family:Segoe UI; font-size: 14; padding:0px !important; margin-top:5px !important; margin-bottom:5px !important; background-color:#808080;" id="Target Check 1" type="button" value="Target Check 1" data-skill='+currentTargetChecks[1]+'>'+(currentTargetChecks[1])+'</button>');
			}
	
			

			currentEffectText = "If the move hits, "+actor.name+" rolled<br><br><center>[["+user_check_roll.result+"]]</center><br><br>on a "+user_check_skill+" check vs the target's opposed "+currentTargetCheckText+" check. If successful,<br>"+currentEffectText;

		}
		else if(currentUserChecks[0])
		{
			let user_check_skill = "";
			let user_check_rank = 0;
			let user_check_modifier = 0;

			console.log("currentUserChecks");
			console.log(currentUserChecks);

			for(let check of currentUserChecks)
			{
				console.log("check");
				console.log(check);

				let check_skill_rank;
				let check_skill_modifier;

				eval("check_skill_rank = actor.data.data.skills."+check+".value.total;");
				eval("check_skill_modifier = actor.data.data.skills."+check+".modifier.total;");

				console.log("check_skill_rank");
				console.log(check_skill_rank);

				if(check_skill_rank > user_check_rank)
				{
					user_check_skill = check;
					user_check_rank = check_skill_rank;
					user_check_modifier = check_skill_modifier;
				}
			}

			let checkDieSize = "d6";
			let user_check_roll = new Roll(`${user_check_rank}${checkDieSize}+${user_check_modifier}`).roll()
			console.log("user_check_roll");
			console.log(user_check_roll);

			currentEffectText = actor.name+" rolled<br><br><center>[["+user_check_roll.result+"]]</center><br><br>on a "+user_check_skill+" check vs the DC.<br>"+currentEffectText;
		}

		let created_move_item = {
			name:maneuver,
			data:{
				ac: maneuver_AC,
				category: currentCategory,
				damageBase: finalDB,
				effect: currentEffectText,
				frequency: "At-Will",
				name: maneuver,
				range: currentRange,
				type: currentType
			}
		};
		let this_actor = canvas.tokens.controlled[0].actor;

		var moveSoundFile = ("struggle.mp3");

		maneuver_buttons[maneuver] = {
			noRefresh: false,
			id: maneuver,
			label: "<center><div style='background-color:"+ MoveButtonBackgroundColor +";color:"+ MoveButtonTextColor +";border-left:"+EffectivenessBorderThickness+"px solid; border-color:"+effectivenessBackgroundColor+"; padding-left: 0px ;padding-top: 0px !important;width:200px;height:"+Number(ButtonHeight-20)+"px;font-size:20px;font-family:Modesto Condensed;line-height:1;'><h3 style='padding: 0px;font-family:Modesto Condensed;font-size:20px; color: white; background-color: #272727 ; overflow-wrap: normal ! important; word-break: keep-all ! important;'><div style='padding-top:5px'>"+currentlabel+"</div>"/*+currentCooldownLabel*/+currentMoveTypeLabel+"</h3>"+STABBorderImage+DBBorderImage+"<h6 style='padding-top: 4px;padding-bottom: 0px;font-size:"+RangeFontSize+"px;'>"+currentMoveRangeIcon+effectivenessText+"</h6>"+"</div></center>",
			callback: async () => {

				if(!game.PTUMoveMaster.ThisPokemonsTrainerCommandCheck(this_actor))
				{
					game.PTUMoveMaster.chatMessage(this_actor, "But they did not obey!")
					return;
				}
				let key_shift = keyboard.isDown("Shift");
				if (key_shift) 
				{
					console.log("KEYBOARD SHIFT IS DOWN!");
					game.PTUMoveMaster.rollDamageMoveWithBonus(this_actor , created_move_item, finalDB, false);
				}
				else
				{
					game.PTUMoveMaster.RollDamageMove(this_actor, created_move_item, finalDB, false, 0);
				}

				if(maneuver == "Take a Breather")
				{
					// Dialog.confirm({
					// 	title: "Staying Power: Prevent Stage Reset?",
					// 	content: "You have Staying Power, which allows you to choose whether or not to ",
					// 	yes: async () => {
					// 	  let combatants = combat.data.combatants;
					// 	  for(let combatant of combatants)
					// 	  {
					// 		await game.PTUMoveMaster.ResetStagesToDefault(combatant.actor);
					// 	  }
					// 	},
					// 	defaultYes: false 
					//   })
					game.PTUMoveMaster.ResetStagesToDefault(actor);
					for(let affliction of VolatileAfflictions)
					{
						await game.PTUMoveMaster.cureActorAffliction(actor, affliction);
					}
					AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+heal_sound_file, volume: 0.8, autoplay: true, loop: false}, true);
				}
				else
				{
					AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+moveSoundFile, volume: 0.8, autoplay: true, loop: false}, true);
				}
			}
		};
	}

	console.log("______________ MANEUVER BUTTONS ______________");
	console.log(maneuver_buttons);

	let background_field = 'background-image: url("background_fields/BG_Grass.png"); background-repeat: repeat-x; background-position: left bottom';

	let dialogueID = "ptu-sidebar";
	let content = "<style> #"+dialogueID+" .dialog-buttons {background-color:"+ MoveButtonBackgroundColor +";flex-direction: column; padding: 0px !important; border-width: 0px !important; margin: 0px !important; border: none !important;} #"+dialogueID+" .dialog-button {background-color:"+ MoveButtonBackgroundColor +";flex-direction: column; padding: 0px !important; border-width: 0px !important; margin-top: 3px !important; margin-bottom: 3px !important; margin-left: 0px !important; margin-right: 0px !important; border: none !important; width: 200px} #"+dialogueID+" .dialog-content {background-color:"+ MoveButtonBackgroundColor +";flex-direction: column; padding: 0px !important; border-width: 0px !important; margin: 0px !important; width: 200px !important; height: auto !important;} #"+dialogueID+" .window-content {;flex-direction: column; padding: 0px !important; border-width: 0px !important; margin: 0px !important; width: 200px !important;} #"+dialogueID+".app.window-app.MoveMasterSidebarDialog {background-color:"+ MoveButtonBackgroundColor +";flex-direction: column; padding: 0px !important; border-width: 0px !important; margin: 0px !important; width: 200px !important;}</style><center><div style='"+background_field+";font-family:Modesto Condensed;font-size:20px'><h2 style='margin-bottom: 10px;'>"+ targetTypingText+"</h2></div></center>";
	game.PTUMoveMaster.MoveMasterSidebar = new game.PTUMoveMaster.SidebarForm({content, buttons: maneuver_buttons, dialogueID, classes: "ptu-sidebar"});
	game.PTUMoveMaster.MoveMasterSidebar.render(true);


	/////////////////////////////////////////////////////////
}

export function ShowSkillsMenu(actor)
{
	let actor_skills = actor.data.data.skills;

	// console.log("Skills:");
	// for(let skill in actor_skills)
	// {
	// 	console.log(skill);
	// 	console.log(actor_skills[skill]);
	// 	console.log(actor_skills[skill]["value"]["total"]);
	// 	console.log(actor_skills[skill]["modifier"]["total"]);


	// }

	let skill_buttons = {};

	let target = Array.from(game.user.targets)[0];
	let targetTypingText = game.PTUMoveMaster.GetTargetTypingHeader(target, actor)

	// let currentCooldownLabel = "<img src='" + AlternateIconPath + "AtWill" + CategoryIconSuffix + "' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";

	skill_buttons["backToMainSidebar"] = {noRefresh:true, id:"backToMainSidebar", label: "<img title='Go back to main move menu.' src='"+AlternateIconPath+"BackButton.png' style='border:none; margin-top:10px;'>",
			callback: async () => {

				// AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+UIButtonClickSound, volume: 0.5, autoplay: true, loop: false}, true);
				PTUAutoFight().ChatWindow(actor);
				}
			};


	skill_buttons["skillDivider"] = {noRefresh: true, id:"skillDivider", label: "<img src='"+AlternateIconPath+"SkillsDivider.png' style='border:none; width:200px;'>",
		callback: () => {

		}};

	let effectivenessBackgroundColor = "lightgrey";
	let effectivenessTextColor = "black";

	for(let skill in actor_skills)
	{
		console.log(skill);

		let currentSkillName = actor_skills[skill]["label"];

		let currentRankName = actor_skills[skill]["rank"];
		let currentRankValue = actor_skills[skill]["value"]["total"];
		let currentModifier = actor_skills[skill]["modifier"]["total"];
		let currentSkillCategory = actor_skills[skill]["type"];

		let currentSkillCategoryBackground = "";
		eval("currentSkillCategoryBackground = "+currentSkillCategory+"Background;")

		let currentlabel = currentSkillName;
		effectivenessBackgroundColor = SkillColors[currentRankName];

		let currentSkillDiceText = currentRankName + ": " + currentRankValue + "d6+" + currentModifier;
		if(currentModifier == 0)
		{
			currentSkillDiceText = currentRankName + ": " + currentRankValue + "d6";
		}
		
		if(!target)
		{
			target = game.actors.get(actor.id).getActiveTokens()[0];
		}

		var moveSoundFile = ("skill.mp3");

		skill_buttons[skill] = {
			noRefresh: false,
			id: skill,
			label: "<center><div style=';background-color:"+ MoveButtonBackgroundColor +";color:"+ MoveButtonTextColor +";border-left:"+EffectivenessBorderThickness+"px solid; border-color:"+effectivenessBackgroundColor+"; padding-left: 0px ;width:200px;height:"+Number(ButtonHeight-60)+"px; font-size:14px !important;font-family:Segoe UI;line-height:1'><h3 style=';background-image: url("+currentSkillCategoryBackground+");padding: 0px;font-family:Modesto Condensed;font-size:20px; color: white; background-color: #272727 ; overflow-wrap: normal ! important; word-break: keep-all ! important;'><div style='padding-top:0px'>"+currentlabel+"</div>"+"</h3>"+"<h6 style='padding-top: 4px;padding-bottom: 0px;font-size:14px;'>"+currentSkillDiceText+"</h6>"+"</div></center>",
			callback: async () => {

				let numDice=currentRankValue;
				let dieSize = "d6";
				let dieModifier = currentModifier;

				let roll= new Roll(`${numDice}${dieSize}+${dieModifier}`).roll()
				roll.toMessage(
					{flavor: `${actor.name} attempts a ${skill} check.`,
					speaker: ChatMessage.getSpeaker({token: actor}),}
				)

				AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+moveSoundFile, volume: 0.8, autoplay: true, loop: false}, true);
			}
		};
	}

	console.log("______________ SKILL BUTTONS ______________");
	console.log(skill_buttons);


	let background_field = 'background-image: url("background_fields/BG_Grass.png"); background-repeat: repeat-x; background-position: left bottom';

	let dialogueID = "ptu-sidebar";
	let content = "<style> #"+dialogueID+" .dialog-buttons {background-color:"+ MoveButtonBackgroundColor +";flex-direction: column; padding: 0px !important; border-width: 0px !important; margin: 0px !important; border: none !important;} #"+dialogueID+" .dialog-button {background-color:"+ MoveButtonBackgroundColor +";flex-direction: column; padding: 0px !important; border-width: 0px !important; margin-top: 3px !important; margin-bottom: 3px !important; margin-left: 0px !important; margin-right: 0px !important; border: none !important; width: 200px} #"+dialogueID+" .dialog-content {background-color:"+ MoveButtonBackgroundColor +";flex-direction: column; padding: 0px !important; border-width: 0px !important; margin: 0px !important; width: 200px !important; height: auto !important;} #"+dialogueID+" .window-content {;flex-direction: column; padding: 0px !important; border-width: 0px !important; margin: 0px !important; width: 200px !important;} #"+dialogueID+".app.window-app.MoveMasterSidebarDialog {background-color:"+ MoveButtonBackgroundColor +";flex-direction: column; padding: 0px !important; border-width: 0px !important; margin: 0px !important; width: 200px !important;}</style><center><div style='"+background_field+";font-family:Modesto Condensed;font-size:20px'><h2 style='margin-bottom: 10px;'>"+ targetTypingText+"</h2></div></center>";
	game.PTUMoveMaster.MoveMasterSidebar = new game.PTUMoveMaster.SidebarForm({content, buttons: skill_buttons, dialogueID, classes: "ptu-sidebar"});
	game.PTUMoveMaster.MoveMasterSidebar.render(true);
}


export function ShowStruggleMenu(actor)
{
	let struggle_types = ["Normal"];
	let struggle_categories = ["Physical"];

	let struggle_AC = 4;
	let struggle_DB = 4;

	let actor_combat_rank = actor.data.data.skills.combat.value;

	if(actor_combat_rank >= 5)
	{
		struggle_AC = 3;
		struggle_DB = 5;
	}

	let struggle_list = {};

	let struggle_modifying_capabilities = {
		"Firestarter": 	{"Special Damage":true, "Type":"Fire"},
		"Fountain": 	{"Special Damage":true, "Type":"Water"},
		"Freezer": 		{"Special Damage":true, "Type":"Ice"},
		"Guster": 		{"Special Damage":true, "Type":"Flying"},
		"Materializer":	{"Special Damage":true, "Type":"Rock"},
		"Telekinetic": 	{"Special Damage":true, "Type":"Normal"},
		"Zapper": 		{"Special Damage":true, "Type":"Electric"}
	};

	for(let struggle_modifying_capability in struggle_modifying_capabilities)
	{
		for(let item_initial of actor.data.items)
		{
			let item = item_initial.data;
			if(item.type == "capability")
			{
				if(item.name.includes(struggle_modifying_capability))
				{
					if(struggle_modifying_capabilities[struggle_modifying_capability]["Special Damage"] && !struggle_categories.includes("Special"))
					{
						struggle_categories.push("Special");
					}
	
					if(struggle_modifying_capabilities[struggle_modifying_capability]["Type"] && !struggle_types.includes([struggle_modifying_capabilities[struggle_modifying_capability]["Type"]]))
					{
						struggle_types.push(struggle_modifying_capabilities[struggle_modifying_capability]["Type"]);
					}
	
					if(struggle_modifying_capability == "Telekinetic")
					{
						struggle_list["Physical Telekinetic Struggle"] = {
							"Action":"Standard", 
							"AC":struggle_AC, 
							"Class":"Physical",
							"Type":"Normal", 
							"Frequency":"At-Will", 
							"DB":struggle_DB,
							"Range":(actor.data.data.skills.focus.value.total+", 1 Target")
						};

						struggle_list["Special Telekinetic Struggle"] = {
							"Action":"Standard", 
							"AC":struggle_AC, 
							"Class":"Special",
							"Type":"Normal", 
							"Frequency":"At-Will", 
							"DB":struggle_DB,
							"Range":(actor.data.data.skills.focus.value.total+", 1 Target")
						};
					}
					
					break;
				}
			}
		}
	}

	for(let struggle_category of struggle_categories)
	{
		for(let struggle_type of struggle_types)
		{
			struggle_list[(struggle_category+" "+struggle_type+" Struggle")] = {
				"Action":"Standard", 
				"AC":struggle_AC, 
				"Class":struggle_category,
				"Type":struggle_type, 
				"Frequency":"At-Will", 
				"DB":struggle_DB,
				"Range":"Melee, 1 Target"
			};
		}
	}

	console.log(struggle_list);

	let struggle_buttons = {};

	let target = Array.from(game.user.targets)[0];
	let targetTypingText = game.PTUMoveMaster.GetTargetTypingHeader(target, actor)

	var currentType;
	var currentCategory;
	let currentlabel;
	let currentMoveTypeLabel;
	let currentDamageBase;
	let currentRange;
	let currentMoveRangeIcon = "";
	let effectivenessBackgroundColor = "lightgrey";
	var effectivenessTextColor = "black";
	let currentEffectivenessLabel = "x1";
	var effectivenessText = "";
	let effectiveness = {"Normal":1, "Fire":1, "Water":1, "Electric":1, "Grass":1, "Ice":1, "Fighting":1, "Poison":1, "Ground":1, "Flying":1, "Psychic":1, "Bug":1, "Rock":1, "Ghost":1, "Dragon":1, "Dark":1, "Steel":1, "Fairy":1 };
	let STABBorderImage = "";
	let DBBorderImage = "";
	let finalDB;

	let currentCooldownLabel = "<img src='" + AlternateIconPath + "AtWill" + CategoryIconSuffix + "' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";

	struggle_buttons["backToMainSidebar"] = {noRefresh:true, id:"backToMainSidebar", label: "<img title='Go back to main move menu.' src='"+AlternateIconPath+"BackButton.png' style='border:none; margin-top:10px;'>",
			callback: async () => {

				// AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+UIButtonClickSound, volume: 0.5, autoplay: true, loop: false}, true);
				PTUAutoFight().ChatWindow(actor);
				}
			};


	struggle_buttons["struggleDivider"] = {noRefresh: true, id:"struggleDivider", label: "<img src='"+AlternateIconPath+"DividerIcon_StruggleOptions.png' style='border:none; width:200px;'>",
		callback: () => {

		}};

	for(let struggle in struggle_list)
	{
		console.log(struggle);

		currentType=struggle_list[struggle]["Type"];
		currentCategory=struggle_list[struggle]["Class"];
		currentlabel = struggle;
		currentMoveTypeLabel = struggle_list[struggle]["Type"];
		currentDamageBase = struggle_list[struggle]["DB"];
		currentRange = struggle_list[struggle]["Range"];
		currentMoveRangeIcon = "";
		effectivenessBackgroundColor = "lightgrey";
		effectivenessTextColor = "black";
		currentEffectivenessLabel = "x1";
		effectivenessText = "";
		effectiveness = {"Normal":1, "Fire":1, "Water":1, "Electric":1, "Grass":1, "Ice":1, "Fighting":1, "Poison":1, "Ground":1, "Flying":1, "Psychic":1, "Bug":1, "Rock":1, "Ghost":1, "Dragon":1, "Dark":1, "Steel":1, "Fairy":1 };
		STABBorderImage = "";
		finalDB = currentDamageBase;
		DBBorderImage = '<div class="col" style="padding: 0px ! important;"><span class="type-img"><img title="Damage Base '+finalDB+'" src="/modules/PTUMoveMaster/images/icons/DividerIcon_DB'+finalDB+'.png" style="width: 248px; height: auto; padding: 0px ! important;"></span></div>';

		currentCooldownLabel = "<img src='" + AlternateIconPath + "AtWill" + CategoryIconSuffix + "' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";

		if(!target)
		{
			target = game.actors.get(actor.id).getActiveTokens()[0];
		}

		if(target.actor.data.data.effectiveness)
		{
			effectiveness = target.actor.data.data.effectiveness.All;
		}
		
		if(currentCategory == "Physical" || currentCategory == "Special")
		{
			if( (game.settings.get("PTUMoveMaster", "showEffectiveness") != "never") && (target) && (!isNaN(currentDamageBase)) && (currentDamageBase != "") && effectiveness)
			{
				if((target.data.disposition > DISPOSITION_HOSTILE) || (game.settings.get("PTUMoveMaster", "showEffectiveness") == "always") )
				{
					currentEffectivenessLabel = " (x"+effectiveness[currentType]+")";
					if (effectiveness[currentType] == 0.5)
					{
						effectivenessBackgroundColor = "#cc6666";
					}
					else if (effectiveness[currentType] == 1)
					{
						effectivenessBackgroundColor = "white";
						effectivenessTextColor = "black";
					}
					else if (effectiveness[currentType] == 0.25)
					{
						effectivenessBackgroundColor = "red";
						effectivenessTextColor = "white";
					}
					else if (effectiveness[currentType] == 0)
					{
						effectivenessBackgroundColor = "black";
						effectivenessTextColor = "white";
					}
					else if (effectiveness[currentType] < 0.25)
					{
						effectivenessBackgroundColor = "darkred";
						effectivenessTextColor = "white";
					}
					else if (effectiveness[currentType] == 1.5)
					{
						effectivenessBackgroundColor = "#6699cc";//"#3399ff";
						effectivenessTextColor = "black";
					}
					else if (effectiveness[currentType] > 1.5)
					{
						effectivenessBackgroundColor = "blue";
						effectivenessTextColor = "white";
					}
					if(game.settings.get("PTUMoveMaster", "showEffectivenessText") == "true")
					{
						effectivenessText = "<span style='font-size:30px'> / x "+(effectiveness[currentType].toString())+"</span>";
					}
				}
			}

			currentMoveTypeLabel = "<div><img src='" + AlternateIconPath + currentCategory + CategoryIconSuffix + "' style='width:100px height:auto border:0px ! important;width:"+TypeIconWidth+"px;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img><img src='" + AlternateIconPath + currentType + TypeIconSuffix + "' style='width:100px height:auto border:0px ! important;width:"+TypeIconWidth+"px;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img></div>";
			if(currentType == "Untyped" || currentType == "" || currentType == null)
			{
				// currentMoveTypeLabel = "<div><img src='" + AlternateIconPath + item.category + CategoryIconSuffix + "' width=80px height=auto></img></div>";
				currentMoveTypeLabel = "<div><img src='" + AlternateIconPath + currentCategory + CategoryIconSuffix + "' style='width:100px height:auto border:0px ! important;width:"+TypeIconWidth+"px;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img><img src='" + AlternateIconPath + "Untyped" + TypeIconSuffix + "' style='width:100px height:auto border:0px ! important;width:"+TypeIconWidth+"px;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img></div>";
			}

			let rangeIconReturn = game.PTUMoveMaster.GetRangeIcons(currentRange);
			currentRange = rangeIconReturn[0];
			currentMoveRangeIcon = rangeIconReturn[1];

			// let currentMoveFiveStrike = false;
			// let currentMoveDoubleStrike = false;
		}

		let created_move_item = {
			name:struggle,
			data:{
				ac: struggle_AC,
				category: currentCategory,
				damageBase: struggle_DB,
				effect: "--",
				frequency: "At-Will",
				name: struggle,
				range: currentRange,
				type: currentType
			}
		};
		let this_actor = canvas.tokens.controlled[0].actor;

		var moveSoundFile = ("struggle.mp3");

		struggle_buttons[struggle] = {
			noRefresh: false,
			id: struggle,
			label: "<center><div style='background-color:"+ MoveButtonBackgroundColor +";color:"+ MoveButtonTextColor +";border-left:"+EffectivenessBorderThickness+"px solid; border-color:"+effectivenessBackgroundColor+"; padding-left: 0px ;width:200px;height:"+Number(ButtonHeight-25+3)+"px;font-size:20px;font-family:Modesto Condensed;line-height:0.6'><h3 style='padding: 0px;font-family:Modesto Condensed;font-size:20px; color: white; background-color: #272727 ; overflow-wrap: normal ! important; word-break: keep-all ! important;'><div style='padding-top:5px;padding-bottom:5px'>"+currentlabel+"</div>"/*+currentCooldownLabel*/+currentMoveTypeLabel+"</h3>"+STABBorderImage+DBBorderImage+"<h6 style='padding-top: 4px;padding-bottom: 0px;font-size:"+RangeFontSize+"px;'>"+currentMoveRangeIcon+effectivenessText+"</h6>"+"</div></center>",
			callback: async () => {

				if(!game.PTUMoveMaster.ThisPokemonsTrainerCommandCheck(this_actor))
				{
					game.PTUMoveMaster.chatMessage(this_actor, "But they did not obey!")
					return;
				}
				let key_shift = keyboard.isDown("Shift");
				if (key_shift) 
				{
					console.log("KEYBOARD SHIFT IS DOWN!");
					game.PTUMoveMaster.rollDamageMoveWithBonus(this_actor , created_move_item, finalDB, false);
				}
				else
				{
					game.PTUMoveMaster.RollDamageMove(this_actor, created_move_item, finalDB, false, 0);
				}

				AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+moveSoundFile, volume: 0.8, autoplay: true, loop: false}, true);
			}
		};
	}

	console.log("______________ STRUGGLE BUTTONS ______________");
	console.log(struggle_buttons);


	let background_field = 'background-image: url("background_fields/BG_Grass.png"); background-repeat: repeat-x; background-position: left bottom';

	let dialogueID = "ptu-sidebar";
	let content = "<style> #"+dialogueID+" .dialog-buttons {background-color:"+ MoveButtonBackgroundColor +";flex-direction: column; padding: 0px !important; border-width: 0px !important; margin: 0px !important; border: none !important;} #"+dialogueID+" .dialog-button {background-color:"+ MoveButtonBackgroundColor +";flex-direction: column; padding: 0px !important; border-width: 0px !important; margin-top: 3px !important; margin-bottom: 3px !important; margin-left: 0px !important; margin-right: 0px !important; border: none !important; width: 200px} #"+dialogueID+" .dialog-content {background-color:"+ MoveButtonBackgroundColor +";flex-direction: column; padding: 0px !important; border-width: 0px !important; margin: 0px !important; width: 200px !important; height: auto !important;} #"+dialogueID+" .window-content {;flex-direction: column; padding: 0px !important; border-width: 0px !important; margin: 0px !important; width: 200px !important;} #"+dialogueID+".app.window-app.MoveMasterSidebarDialog {background-color:"+ MoveButtonBackgroundColor +";flex-direction: column; padding: 0px !important; border-width: 0px !important; margin: 0px !important; width: 200px !important;}</style><center><div style='"+background_field+";font-family:Modesto Condensed;font-size:20px'><h2 style='margin-bottom: 10px;'>"+ targetTypingText+"</h2></div></center>";
	game.PTUMoveMaster.MoveMasterSidebar = new game.PTUMoveMaster.SidebarForm({content, buttons: struggle_buttons, dialogueID, classes: "ptu-sidebar"});
	game.PTUMoveMaster.MoveMasterSidebar.render(true);
}


export async function UseInventoryItem(actor_token, target_token, inventory_item)
{
	let item_properties = {
		"Blank Template":	{
			"healing":			0,
			"set_hitpoint_to":	0,
			"set_hitpoint_to_pct":	0,
			"condition_cure":	[],
			"repulsive":		false,
			"stage_change":		{"atk":0, "def":0, "spatk":0, "spdef":0, "spd":0 },
			"crit_boost":		0,
			"accuracy_boost":	0,
			"guard_spec":		false,
		},
		"Potion":	{
			"healing":	20,
		},
		"Super Potion":	{
			"healing":	35,
		},
		"Hyper Potion":	{
			"healing":	70,
		},
		"Antidote":	{
			"condition_cure":	["Poisoned", "Badly Poisoned"],
		},
		"Paralyze Heal":	{
			"condition_cure":	["Paralysis"],
		},
		"Burn Heal":	{
			"condition_cure":	["Burned"],
		},
		"Ice Heal":	{
			"condition_cure":	["Frozen"],
		},
		"Full Heal":	{
			"condition_cure":	["Burned", "Frozen", "Paralysis", "Poisoned", "Badly Poisoned"], 
		},
		"Full Restore":	{
			"healing":			80,
			"condition_cure":	["Burned", "Frozen", "Paralysis", "Poisoned", "Badly Poisoned", "Flinch", "Sleep", "Cursed", "Confused", "Disabled", "Infatuation", "Rage", "BadSleep", "Suppressed",], 
		},
		"Revive":	{
			"condition_cure":	["Fainted"],
			"set_hitpoint_to":	20,
		},
		"Energy Powder":	{
			"healing":			25,
			"repulsive":		true,
		},
		"Energy Root":	{
			"healing":			70,
			"repulsive":		true,
		},
		"Heal Powder":	{
			"condition_cure":	["Burned", "Frozen", "Paralysis", "Poisoned", "Badly Poisoned"], 
			"repulsive":		true,
		},
		"Revival Herb":	{
			"condition_cure":	["Fainted"], 
			"set_hitpoint_to_pct":	0.5,
			"repulsive":		true,
		},
		"X Attack":	{
			"stage_change":		{"atk":2},
		},
		"X Defend":	{
			"stage_change":		{"def":2},
		},
		"X Special":	{
			"stage_change":		{"spatk":2},
		},
		"X Sp. Def.":	{
			"stage_change":		{"spdef":2},
		},
		"X Speed":	{
			"stage_change":		{"spd":2},
		},
		"Dire Hit":	{
			"crit_boost":		2,
		},
		"Guard Spec":	{
			"guard_spec":		true,
		},
	};

	if(item_properties[inventory_item]["healing"])
	{
		game.PTUMoveMaster.healActor(target_token.actor, item_properties[inventory_item]["healing"]);
	}

	if(item_properties[inventory_item]["set_hitpoint_to"])
	{
		game.PTUMoveMaster.setActorHealth(target_token.actor, item_properties[inventory_item]["set_hitpoint_to"]);
	}

	if(item_properties[inventory_item]["set_hitpoint_to_pct"])
	{
		game.PTUMoveMaster.healActor(target_token.actor, item_properties[inventory_item]["set_hitpoint_to_pct"]);
	}

	if(item_properties[inventory_item]["condition_cure"])
	{
		if(item_properties[inventory_item]["condition_cure"].length > 0)
		{
			for(let affliction of (item_properties[inventory_item]["condition_cure"]))
			{
				await game.PTUMoveMaster.cureActorAffliction(target_token.actor, affliction);
			}
			AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+heal_sound_file, volume: 0.8, autoplay: true, loop: false}, true);
		}
	}

	// TODO: Range checking for non-pokeball items

	// TODO: Stage Change from item handling

	// TODO: Crit boost from item handling

	// TODO: Accuracy boost from item handling

	// TODO: Guard Spec handling

	// TODO: Repulsive tracking from item handling

	setTimeout(() => {  game.PTUMoveMaster.TakeAction(actor_token.actor, "Standard"); }, 1000);
}


export async function GetItemArt(item_name) 
{
	let item_base_image = ("item_icons/"+item_name+".webp");
    let result = await fetch(item_base_image);
	if(result.status === 404) 
	{
		item_base_image = ("item_icons/"+item_name+".png");
		result = await fetch(item_base_image);
		if(result.status === 404) 
		{
			item_base_image = ("item_icons/Generic Item.webp");
		}
	}
	
    return item_base_image;
}


export function GetTargetTypingHeader(target, actor)
{
	let targetTypingText = "";
	let targetType1 = "???";
	let targetType2 = "???";
	let effectiveness;

	let actions_image = game.PTUMoveMaster.GetActorActionIcon(actor);

	if ( (game.settings.get("PTUMoveMaster", "showEffectiveness") != "never") && (target))
	{
		if((target.data.disposition > DISPOSITION_HOSTILE) || (game.settings.get("PTUMoveMaster", "showEffectiveness") == "always") )
		{
			if(target.actor.data.data.typing)
			{
				targetType1 = target.actor.data.data.typing[0];
				targetType2 = target.actor.data.data.typing[1];
			}
		}

		let tokenImage;
		let actorImage = actor.data.token.img;
		let tokenSize = 60;
		let actorTokenSize = 90;

		if (target.actor.token)
			{
				tokenImage = target.actor.token.data.img;
			}
			else
			{
				tokenImage = target.actor.data.img;
			}
		
		if(!target.actor.data.data.effectiveness)
		{
			targetTypingText = actions_image+"<div class='row' style='width:200px; height=auto;'><div class='column' style='width:200px; height:100px ; color:lightgrey'>Your current target is<br>"+ target.name +"<br>(Trainer)</div><div class='column' style='width:"+actorTokenSize+" height=auto'><img src='"+ actorImage +"' height='"+actorTokenSize+"' style='border:none; transform: scaleX(-1); object-fit: cover; width:"+actorTokenSize+"; height:"+actorTokenSize+";'></img></div><div class='column' style='width:"+tokenSize+"; height=auto; margin-left:50px ; margin-top: 25px;'><img src='"+ tokenImage +"' height='"+tokenSize+"' style='border:none; object-fit: cover; width:"+tokenSize+"; height:"+tokenSize+";'></img></div></div>";
		}
		else
		{
			effectiveness = target.actor.data.data.effectiveness.All;
	
			if(targetType2 == "null")
			{
				if(targetType1 == "???")
				{
					targetTypingText = actions_image+"<div class='row' style='width:200px; height=auto;'><div class='column' style='width:200px; height:100px ; color:lightgrey'>Your current target is<br>"+ target.name +"<br>("+targetType1+ ")</div><div class='column' style='width:"+actorTokenSize+" height=auto'><img src='"+ actorImage +"' height='"+actorTokenSize+"' style='border:none; transform: scaleX(-1); object-fit: cover; width:"+actorTokenSize+"; height:"+actorTokenSize+";'></img></div><div class='column' style='width:"+tokenSize+"; margin-left:50px ; margin-top: 25px;'><img src='"+ tokenImage +"' height='"+tokenSize+"' style='border:none; object-fit: cover; width:"+tokenSize+"; height:"+tokenSize+";'></img></div></div>";
				}
				else
				{
					targetTypingText = actions_image+"<div class='row' style='width:200px; height=auto;'><div class='column' style='width:200px; height:100px ; color:lightgrey'>Your current target is<br>"+ target.name +"<br>(<img src='" + AlternateIconPath+targetType1+TypeIconSuffix+ "' width=80px height=auto>)</div><div class='column' style='width:"+actorTokenSize+"'><img src='"+ actorImage +"' height='"+actorTokenSize+"' style='border:none; transform: scaleX(-1); object-fit: cover; width:"+actorTokenSize+"; height:"+actorTokenSize+";'></img></div><div class='column' style='width:"+tokenSize+"; margin-left:50px ; margin-top: 25px;'><img src='"+ tokenImage +"' height='"+tokenSize+"' style='border:none; object-fit: cover; width:"+tokenSize+"; height:"+tokenSize+";'></img></div></div>";
				}
			}
			else
			{
				if(targetType1 == "???")
				{
					targetTypingText = actions_image+"<div class='row' style='width:200px; height=auto;'><div class='column' style='width:200px; height:100px ; color:lightgrey'>Your current target is<br>"+ target.name +"<br>("+targetType1+"/"+targetType2+ ")</div><div class='column' style='width:"+actorTokenSize+" height=auto'><img src='"+ actorImage +"' height='"+actorTokenSize+"' style='border:none; transform: scaleX(-1); object-fit: cover; width:"+actorTokenSize+"; height:"+actorTokenSize+";'></img></div><div class='column' style='width:"+tokenSize+"; margin-left:50px ; margin-top: 25px;'><img src='"+ tokenImage +"' height='"+tokenSize+"' style='border:none; object-fit: cover; width:"+tokenSize+"; height:"+tokenSize+";'></img></div></div>";
				}
				else
				{
					targetTypingText = actions_image+"<div class='row' style='width:200px; height=auto;'><div class='column' style='width:200px; height:100px ; color:lightgrey'>Your current target is<br>"+ target.name +"<br>(<img src='" + AlternateIconPath+targetType1+TypeIconSuffix+ "' width=80px height=auto>/<img src='" + AlternateIconPath+targetType2+TypeIconSuffix+ "' width=80px height=auto>)</div><div class='column' style='width:"+actorTokenSize+" height=auto' style='border:none;'><img src='"+ actorImage +"' height='"+actorTokenSize+"' style='border:none; transform: scaleX(-1); object-fit: cover; width:"+actorTokenSize+"; height:"+actorTokenSize+";'></img></div><div class='column' style='width:"+tokenSize+"; margin-left:50px ; margin-top: 25px;'><img src='"+ tokenImage +"' height='"+tokenSize+"' style='border:none; object-fit: cover; width:"+tokenSize+"; height:"+tokenSize+";'></img></div></div>";
				}
			}
		}
		

		
	}
	else if (!target)
	{
		let actorImage = actor.data.token.img;
		let tokenSize = 60;
		let actorTokenSize = 90;

		targetTypingText = actions_image+"\
		<div class='row' style='width:200px; height=auto;'>\
			<div class='column' style='width:200px; height:100px ; color:lightgrey'>\
				No current target<br>\
			</div>\
			<div class='column' style='width:"+actorTokenSize+" height=auto'>\
				<img src='"+ actorImage +"' height='"+actorTokenSize+"' style='border:none; transform: scaleX(-1);'></img>\
			</div>\
			<div class='column' style='width:"+tokenSize+"; height=auto; margin-left:50px ; margin-top: 25px;'>\
			</div>\
		</div>\
		";
	}
	else
	{
		let tokenImage;
		if (target.actor.token)
			{
				tokenImage = target.actor.token.data.img;
			}
			else
			{
				tokenImage = target.actor.data.img;
			}
		let actorImage = actor.data.token.img;
		let tokenSize = 60;
		let actorTokenSize = 90;

		targetTypingText = actions_image+"<div class='row' style='width:200px; height=auto;'><div class='column' style='width:200px; height:100px ; color:lightgrey'>Your current target is<br>"+ target.name +"<br>(???/???)</div><div class='column' style='width:"+actorTokenSize+" height=auto'><img src='"+ actorImage +"' height='"+actorTokenSize+"' style='border:none; transform: scaleX(-1);'></img></div><div class='column' style='width:"+tokenSize+"; height=auto; margin-left:50px ; margin-top: 25px;'><img src='"+ tokenImage +"' height='"+tokenSize+"' style='border:none;'></img></div></div>";
	}

	return targetTypingText;
}


export async function ExpendItem(owning_actor, item_object) 
{
	if(item_object.data.quantity < 1)
	{
		ui.notifications.warn("You do not have any of this item left to use!");
		return false;
	}

	if(item_object.name.includes("Thrown") || item_object.name.includes("Broken"))
	{
		ui.notifications.warn("This item is not in a usable state!");
		return false;
	}

	await owning_actor.updateOwnedItem( { id: item_object.id, "data.quantity": Number(item_object.data.quantity-1) }); // Decrement the spent item count

	if(item_object.data.name.includes("Ball")) 	// For balls, create a thrown version that can be picked up after battle (this will be changed to 
	{										// broken or removed entirely by the capture function if it hits and fails/succeeds to capture a 
											// pokemon, respectively.)


		let item = owning_actor.items.find(x => x.name == `Thrown ${item_object.data.name}`) // Search through existing items to see if we have a Thrown entry for this item already
		if(item) 
		{
			await owning_actor.updateOwnedItem({id: item.id, "data.quantity": Number(duplicate(item).data.quantity)+1});
		}
		else // If we get here, then we never found an existing thrown version to increment, so create new thrown version
		{
			await owning_actor.createOwnedItem({
				"name": "Thrown "+(item_object.data.name),
				"type": "item",
				"data": {
					"cost": item_object.data.cost,
					"effect": item_object.data.effect,
					"UseCount": item_object.data.UseCount,
					"origin": item_object.data.effect,
					"quantity": 1
				}
			});
		}
		return true;
	}
	else // Not a ball, just decrement the count
	{
		await owning_actor.updateOwnedItem( { id: item_object.id, "data.quantity": Number(item_object.data.quantity-1) });
		return true;
	}
}


export async function GetCurrentWeather()
{
	let currentWeather = game.settings.get("PTUMoveMaster", "currentWeather");
	return currentWeather;
}


export async function SetCurrentWeather(new_weather)
{
	let current_weather = game.settings.get("PTUMoveMaster", "currentWeather");
	if(current_weather == new_weather)
	{
		ui.notifications.info("The weather remains " + current_weather + ".");
	}
	else
	{
		game.settings.set("PTUMoveMaster", "currentWeather", new_weather);
		ui.notifications.info("The weather changes from " + current_weather + " to " + new_weather + "!");

		let FXMaster_module = game.modules.get("fxmaster");
		if(FXMaster_module)
		{
			let fxmaster_weather_presets = {
				"Clear":{  },
				"Sunny":{ type: "embers", options: {} },
				"Rainy":{ type: "rain", options: {} },
				"Hail":{ type: "snowstorm", options: {speed:100, density:100, direction:25} },
				"Sandstorm":{ type: "fog", options: {speed:100, density:50, direction:69, apply_tint:true, tint:"0xFFC675"} },
			}
			console.log("fxmaster_weather_presets[new_weather]");
			console.log(fxmaster_weather_presets[new_weather]);

			Hooks.call("updateWeather", [
				fxmaster_weather_presets[new_weather]
			]);
			
		}
	}
}


export async function GetWeatherHeader()
{
	let currentWeather = game.settings.get("PTUMoveMaster", "currentWeather");
	let weatherHeader = "";

	

	return weatherHeader;
}



export async function RollSkillCheck(skill)
{
	let selected_token = canvas.tokens.controlled[0];
	let selected_actor = selected_token.actor;

	let numDice = 1;
	let dieSize = 6;
	let modifier = 0;

	eval('numDice = selected_actor.data.data.skills.'+skill+'.value;');
	eval('modifier = selected_actor.data.data.skills.'+skill+'.modifier;');

	let roll= new Roll(`${numDice}d${dieSize}+${modifier}`).roll()

	roll.toMessage(
		{flavor: `${selected_actor.name}: ${skill} check.`,
		speaker: ChatMessage.getSpeaker({token: selected_actor}),}
	);

	// game.PTUMoveMaster.chatMessage(selected_token, "")
}


export function GetActorActionIcon(actor)
{
	let homebrew_actions = game.settings.get("PTUMoveMaster", "useExtraActionHomebrew");
	let standard_action = 1;
	let support_action = 1;
	let shift_action = 1;
	let swift_action = 1;

	let actions;
	if(actor.data.flags && actor.data.flags.ptu && actor.data.flags.ptu.actions_taken)
	{
		actions = (actor.data.flags.ptu.actions_taken); // Token actors don't work right here
		console.log("actions");
		console.log(actions);

		standard_action = (actions.standard ? 0 : 1);
		support_action = (actions.support ? 0 : 1);
		shift_action = (actions.shift ? 0 : 1);
		swift_action = (actions.swift ? 0 : 1);
	}

	let actions_available_icon = "";
	if(homebrew_actions)
	{
		actions_available_icon = AlternateIconPath+standard_action+"Standard_"+support_action+"Support_"+shift_action+"Shift_"+swift_action+"Swift.png";
	}
	else
	{
		actions_available_icon = AlternateIconPath+standard_action+"Standard_"+shift_action+"Shift_"+swift_action+"Swift.png";
	}
	
	let actions_image = "<img src='"+actions_available_icon+"' style='border:none; height:100px'></img>";

	return actions_image;
}


export function GetRangeIcons(currentMoveRange, action="Standard")
{
	let currentMoveRangeIcon = "";

	if (currentMoveRange != "")
	{
		if(currentMoveRange.search("See Effect") > -1)
		{
			currentMoveRangeIcon = currentMoveRange;
		}
		else if(currentMoveRange.search("Blessing") > -1)
		{
			currentMoveRangeIcon = BlessingIcon + currentMoveRange.slice(currentMoveRange.search("Blessing")+9).replace(/[, ]+/g, " ").trim();
		}
		else if(currentMoveRange.search("Self") > -1)
		{
			currentMoveRangeIcon = SelfIcon + currentMoveRange.slice(currentMoveRange.search("Self")+5).replace(/[, ]+/g, " ").trim();
		}
		else if(currentMoveRange.search("Burst") > -1)
		{
			currentMoveRangeIcon = BurstIcon + currentMoveRange.slice(currentMoveRange.search("Burst")+6).replace(/[, ]+/g, " ").trim();
		}
		else if(currentMoveRange.search("Cone") > -1)
		{
			currentMoveRangeIcon = ConeIcon + currentMoveRange.slice(currentMoveRange.search("Cone")+5).replace(/[, ]+/g, " ").trim();
		}
		else if(currentMoveRange.search("Line") > -1)
		{
			currentMoveRangeIcon = LineIcon + currentMoveRange.slice(currentMoveRange.search("Line")+5).replace(/[, ]+/g, " ").trim();
		}
		else if(currentMoveRange.search("Close Blast") > -1)
		{
			currentMoveRangeIcon = MeleeIcon+BlastIcon + currentMoveRange.slice(currentMoveRange.search("Close Blast")+9).replace(/[, ]+/g, " ").trim();
		}
		else if(currentMoveRange.search("Ranged Blast") > -1)
		{
			currentMoveRangeIcon = RangeIcon + currentMoveRange.slice(0, currentMoveRange.search(",")) + BlastIcon + currentMoveRange.slice(currentMoveRange.search("Ranged Blast")+13).replace(/[, ]+/g, " ").trim();
		}
		else if(currentMoveRange.search("Melee") > -1)
		{
			currentMoveRangeIcon = MeleeIcon;
		}
		else if(currentMoveRange.search("Trigger") > -1)
		{
			currentMoveRange = currentMoveRange.replace("Trigger", "");
			currentMoveRangeIcon = currentMoveRangeIcon.replace("Trigger", "");
			currentMoveRangeIcon = currentMoveRangeIcon + " " + TriggerIcon;
		}
		else if(currentMoveRange.search("Field") > -1)
		{
			currentMoveRange = currentMoveRange.replace("Field", "");
			currentMoveRangeIcon = currentMoveRangeIcon.replace("Field", "");
			currentMoveRangeIcon = currentMoveRangeIcon + " " + FieldIcon;
		}
		else
		{
			currentMoveRangeIcon = RangeIcon + currentMoveRange.slice(0, currentMoveRange.search(",")).replace(/[, ]+/g, " ").trim();
		}

		if(currentMoveRange.search("Swift Action") > -1)
		{
			currentMoveRange = currentMoveRange.replace("Swift Action", "");
			currentMoveRangeIcon = currentMoveRangeIcon.replace("Swift Action", "");
			currentMoveRangeIcon = SwiftActionIcon + " " + currentMoveRangeIcon;
		}

		if(currentMoveRange.search("Full Action") > -1)
		{
			currentMoveRange = currentMoveRange.replace("Full Action", "");
			currentMoveRangeIcon = currentMoveRangeIcon.replace("Full Action", "");
			currentMoveRangeIcon = FullActionIcon + " " + currentMoveRangeIcon;
		}

		if(action == "Shift")
		{
			currentMoveRangeIcon = ShiftActionIcon + " " + currentMoveRangeIcon;
		}

		if(currentMoveRange.search("Healing") > -1)
		{
			currentMoveRange = currentMoveRange.replace("Healing", "");
			currentMoveRangeIcon = currentMoveRangeIcon.replace("Healing", "");
			currentMoveRangeIcon = currentMoveRangeIcon + " " + HealingIcon;
		}

		if(currentMoveRange.search("Friendly") > -1)
		{
			currentMoveRange = currentMoveRange.replace("Friendly", "");
			currentMoveRangeIcon = currentMoveRangeIcon.replace("Friendly", "");
			currentMoveRangeIcon = currentMoveRangeIcon + " " + FriendlyIcon;
		}

		if(currentMoveRange.search("Sonic") > -1)
		{
			currentMoveRange = currentMoveRange.replace("Sonic", "");
			currentMoveRangeIcon = currentMoveRangeIcon.replace("Sonic", "");
			currentMoveRangeIcon = currentMoveRangeIcon + " " + SonicIcon;
		}

		if(currentMoveRange.search("Interrupt") > -1)
		{
			currentMoveRange = currentMoveRange.replace("Interrupt", "");
			currentMoveRangeIcon = currentMoveRangeIcon.replace("Interrupt", "");
			currentMoveRangeIcon = currentMoveRangeIcon + " " + InterruptIcon;
		}
		
		if(currentMoveRange.search("Shield") > -1)
		{
			currentMoveRange = currentMoveRange.replace("Shield", "");
			currentMoveRangeIcon = currentMoveRangeIcon.replace("Shield", "");
			currentMoveRangeIcon = currentMoveRangeIcon + " " + ShieldIcon;
		}

		if(currentMoveRange.search("Trigger") > -1)
		{
			currentMoveRange = currentMoveRange.replace("Trigger", "");
			currentMoveRangeIcon = currentMoveRangeIcon.replace("Trigger", "");
			currentMoveRangeIcon = currentMoveRangeIcon + " " + TriggerIcon;
		}

		if(currentMoveRange.search("Social") > -1)
		{
			currentMoveRange = currentMoveRange.replace("Social", "");
			currentMoveRangeIcon = currentMoveRangeIcon.replace("Social", "");
			currentMoveRangeIcon = currentMoveRangeIcon + " " + SocialIcon;
		}

		if(currentMoveRange.search("Five Strike") > -1)
		{
			currentMoveRange = currentMoveRange.replace("Five Strike", "");
			currentMoveRangeIcon = currentMoveRangeIcon.replace("Five Strike", "");
			currentMoveRangeIcon = currentMoveRangeIcon + " " + FiveStrikeIcon;
		}

		if(currentMoveRange.search("Fivestrike") > -1)
		{
			currentMoveRange = currentMoveRange.replace("Fivestrike", "");
			currentMoveRangeIcon = currentMoveRangeIcon.replace("Fivestrike", "");
			currentMoveRangeIcon = currentMoveRangeIcon + " " + FiveStrikeIcon;
		}

		if(currentMoveRange.search("Double Strike") > -1)
		{
			currentMoveRange = currentMoveRange.replace("Double Strike", "");
			currentMoveRangeIcon = currentMoveRangeIcon.replace("Double Strike", "");
			currentMoveRangeIcon = currentMoveRangeIcon + " " + DoubleStrikeIcon;
		}

		if(currentMoveRange.search("Doublestrike") > -1)
		{
			currentMoveRange = currentMoveRange.replace("Doublestrike", "");
			currentMoveRangeIcon = currentMoveRangeIcon.replace("Doublestrike", "");
			currentMoveRangeIcon = currentMoveRangeIcon + " " + DoubleStrikeIcon;
		}

		if(currentMoveRange.search("Groundsource") > -1)
		{
			currentMoveRange = currentMoveRange.replace("Groundsource", "");
			currentMoveRangeIcon = currentMoveRangeIcon.replace("Groundsource", "");
			currentMoveRangeIcon = currentMoveRangeIcon + " " + GroundsourceIcon;
		}

		if(currentMoveRange.search("Field") > -1)
		{
			currentMoveRange = currentMoveRange.replace("Field", "");
			currentMoveRangeIcon = currentMoveRangeIcon.replace("Field", "");
			currentMoveRangeIcon = currentMoveRangeIcon + " " + FieldIcon;
		}

		if(currentMoveRange.search("Smite") > -1)
		{
			currentMoveRange = currentMoveRange.replace("Smite", "");
			currentMoveRangeIcon = currentMoveRangeIcon.replace("Smite", "");
			currentMoveRangeIcon = currentMoveRangeIcon + " " + SmiteIcon;
		}

		if(currentMoveRange.search("Exhaust") > -1)
		{
			currentMoveRange = currentMoveRange.replace("Exhaust", "");
			currentMoveRangeIcon = currentMoveRangeIcon.replace("Exhaust", "");
			currentMoveRangeIcon = currentMoveRangeIcon + " " + ExhaustIcon;
		}

		if(currentMoveRange.search("Pass") > -1)
		{
			currentMoveRange = currentMoveRange.replace("Pass", "");
			currentMoveRangeIcon = currentMoveRangeIcon.replace("Pass", "");
			currentMoveRangeIcon = currentMoveRangeIcon + " " + PassIcon;
		}

		if(currentMoveRange.search("Set-Up") > -1)
		{
			currentMoveRange = currentMoveRange.replace("Set-Up", "");
			currentMoveRangeIcon = currentMoveRangeIcon.replace("Set-Up", "");
			currentMoveRangeIcon = currentMoveRangeIcon + " " + SetupIcon;
		}

		if(currentMoveRange.search("Illusion") > -1)
		{
			currentMoveRange = currentMoveRange.replace("Illusion", "");
			currentMoveRangeIcon = currentMoveRangeIcon.replace("Illusion", "");
			currentMoveRangeIcon = currentMoveRangeIcon + " " + IllusionIcon;
		}

		if(currentMoveRange.search("Coat") > -1)
		{
			currentMoveRange = currentMoveRange.replace("Coat", "");
			currentMoveRangeIcon = currentMoveRangeIcon.replace("Coat", "");
			currentMoveRangeIcon = currentMoveRangeIcon + " " + CoatIcon;
		}
	}
	return [currentMoveRange, currentMoveRangeIcon];
}


export async function resetEOTMoves(actor, silent=false)
{
	let item_entities = actor.items;
	for(let item of actor.data.items)
	{
		var item_data = item.data.data;
		let searched_frequency = item_data.frequency;
		if(!searched_frequency)
		{
			searched_frequency = "";
		}
		if(searched_frequency.search("EOT") > -1 || searched_frequency.search("Scene") > -1 || searched_frequency.search("Daily") > -1)
		{
			for(let search_item of item_entities)
			{
				if (search_item.id == item.id)
				{
					await search_item.update({ "data.LastRoundUsed": Number(-2)});
				}
			}
		}
	}
	chatMessage(actor, (actor.name + " refreshes their EOT-frequency moves!"))
	if(!silent)
	{
		AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+RefreshEOTMovesSound, volume: 0.8, autoplay: true, loop: false}, true);
	}
}


export async function resetSceneMoves(actor, silent=false)
{
	console.log("RESET SCENE MOVES: __________ actor");
	console.log(actor);

	let item_entities = actor.items;
	for(let item of actor.data.items)
	{
		var item_data = item.data.data;
		let searched_frequency = item_data.frequency;
		if(!searched_frequency)
		{
			searched_frequency = "";
		}
		if(item_data.frequency == "Scene" || item_data.frequency == "Scene x2" || item_data.frequency == "Scene x3")
		{
			for(let search_item of item_entities)
			{
				if (search_item.id == item.id)
				{
					await search_item.update({ "data.UseCount": Number(0)});
				}
			}
		}
	}
	chatMessage(actor, (actor.name + " refreshes their Scene-frequency moves!"))
	if(!silent)
	{
		AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+RefreshSceneMovesSound, volume: 0.8, autoplay: true, loop: false}, true);
	}
}


export async function resetDailyMoves(actor, silent=false)
{
	let item_entities = actor.items;
	for(let item of actor.data.items)
	{
		var item_data = item.data.data;
		let searched_frequency = item_data.frequency;
		if(!searched_frequency)
		{
			searched_frequency = "";
		}
		if(item_data.frequency == "Daily" || item_data.frequency == "Daily x2" || item_data.frequency == "Daily x3")
		{
			for(let search_item of item_entities)
			{
				if (search_item.id == item.id)
				{
					await search_item.update({ "data.UseCount": Number(0)});
				}
			}
		}
	}
	chatMessage(actor, (actor.name + " refreshes their Daily-frequency moves!"))
	if(!silent)
	{
		AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+RefreshDailyMovesSound, volume: 0.8, autoplay: true, loop: false}, true);
	}
}


export async function resetStandardAction(actor)
{
	await actor.update({
		"flags.ptu.actions_taken.standard": false, 
		"flags.ptu.actions_taken.attacked.physical": false,
		"flags.ptu.actions_taken.attacked.special": false,
		"flags.ptu.actions_taken.attacked.status": false,
		"flags.ptu.actions_taken.support": false
	});
	chatMessage(actor, (actor.name + " resets their standard action!"))
	AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+RefreshEOTMovesSound, volume: 0.8, autoplay: true, loop: false}, true);
}


export async function resetShiftAction(actor)
{
	await actor.update({
		"flags.ptu.actions_taken.shift": false
	});
	chatMessage(actor, (actor.name + " resets their shift action!"))
	AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+RefreshEOTMovesSound, volume: 0.8, autoplay: true, loop: false}, true);
}


export async function resetSwiftAction(actor)
{
	await actor.update({
		"flags.ptu.actions_taken.swift": false
	});
	chatMessage(actor, (actor.name + " resets their swift action!"))
	AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+RefreshEOTMovesSound, volume: 0.8, autoplay: true, loop: false}, true);
}


export async function enableCondition(actor, condition, condition_type = "other")
{
	chatMessage(actor, (actor.name + " gained the "+condition+" affliction!"));

	let effectData = CONFIG.statusEffects.find(x => x.id == "effect."+condition_type+"."+condition);
	// token.toggleEffect(effectData);
	canvas.tokens.get(actor.token.id).toggleEffect(effectData);

	// await actor.createEmbeddedEntity("ActiveEffect", CONFIG.statusEffects.find(x => x.id == "effect."+condition_type+"."+condition));
	// await canvas.tokens.get(actor.token.id).toggleEffect("icons/svg/skull.svg");
}