
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

	game.settings.register("PTUMoveMaster", "useInjurySplashes", {
		name: "GM Setting: Apply visual splashes of dirt/soot to tokens when they take auto-applied injuries.",
		hint: "",
		scope: "world",
		config: true,
		type: Boolean,
		default: true
	});

	game.settings.register("PTUMoveMaster", "useBloodSplashes", {
		name: "GM Setting: Apply visual splashes of blood to tokens when they take auto-applied injuries once they reach 5+ injuries.",
		hint: "This might not fit the tone of more lighthearted games, so it can be turned off here.",
		scope: "world",
		config: true,
		type: Boolean,
		default: true
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
		  "dex": "Only on targets that you possess the Dex entry for their species."
		},
		default: "dex"
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
		name: "GM Setting: Always Display Species in Token Name for Wild Pokemon",
		hint: "Always set wild pokemon's tokens to display their species name to everyone when they're dragged out.",
		scope: "world",
		config: true,
		type: Boolean,
		default: true
	});

	game.settings.register("PTUMoveMaster", "alwaysDisplayTokenHealth", {
		name: "GM Setting: Always Display Token Health for Wild Pokemon",
		hint: "Always set wild pokemon's tokens to display their health as a bar to everyone when they're dragged out.",
		scope: "world",
		config: true,
		type: Boolean,
		default: true
	});

	game.settings.register("PTUMoveMaster", "alwaysDisplayTokenNature", {
		name: "GM Setting: Always Display Token Nature in Names of Wild Pokemon.",
		hint: "Always set wild pokemon's tokens to display their nature, as an appendation to their names, to everyone when they're dragged out. Note that this will have no effect if Always Display Species in Token Name for Wild Pokemon is not also active.",
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

	game.settings.register("PTUMoveMaster", "enforcePokeballRangeLimits", {
		name: "GM Setting: Enforce Pokeball Range Limits.",
		hint: "While enabled, this will prevent throwing out owned pokemon, throwing pokeballs to capture, and recalling owned pokemon, if the trainer is on the field but too far away.",
		scope: "world",
		config: true,
		type: Boolean,
		default: true
	});

	game.settings.register("PTUMoveMaster", "PokedexRangeLimit", {
		name: "GM Setting: Custom Pokedex Range Limit",
		hint: "By default, Pokedexes have a scan range of 10 m, but GMs can set a custom value here. A value of 0 will be treated as unlimited range.",
		scope: "world",
		config: true,
		type: String,
		default: "10"
	});

	game.settings.register("PTUMoveMaster", "CustomPokeballAC", {
		name: "GM Setting: Custom Pokeball Throw AC",
		hint: "By default, Pokeball throws have a base AC of 6, but GMs can set a custom value here.",
		scope: "world",
		config: true,
		type: String,
		default: "6"
	});

	game.settings.register("PTUMoveMaster", "AthleticsReducesPokeballAC", {
		name: "GM Setting: Athletics Rank Reduces Pokeball Throw AC",
		hint: "Enable this to turn on a homebrew option to reduce Pokeball Throw AC by the thrower's Athletics Rank (to a minimum of AC 2).",
		scope: "world",
		config: true,
		type: Boolean,
		default: false
	});

	game.settings.register("PTUMoveMaster", "useExtraActionHomebrew", {
		name: "GM Setting: Use Kindled Embers' Extra Action homebrew.",
		hint: "Enable this to give each actor an extra standard action per turn that cannot be used for directly damaging moves (physical, special), nor to repeat the same standard action twice in the same turn. The intent of this change is to diversify action choice and provide more reasons for some of the less popular moves or maneuvers to be used.",
		scope: "world",
		config: true,
		type: Boolean,
		default: false
	});

	game.settings.register("PTUMoveMaster", "trackBrokenPokeballs", {
		name: "GM Setting: Track Broken Pokeballs.",
		hint: "The trainer edge 'Poke Ball Repair' allows for re-using balls that break upon failing to capture a Pokemon, so Move Master will automatically created a broken version of balls in the thrower's inventory when a Pokemon breaks free. If you have no use for tracking this, you can disable it here.",
		scope: "world",
		config: true,
		type: Boolean,
		default: true
	});

	game.settings.register("PTUMoveMaster", "itemIconDirectory", {
        name: "Item Icons Directory",
        hint: "The directory where the user can upload item image files to be used by scripts or modules. Must end with a /",
        scope: "world",
        config: true,
        type: String,
        default: "item_icons/",
        filePicker: true,
        // onChange: (value) => CustomSpeciesFolder.updateFolderDisplay(value),
        category: "other"
    });

	game.settings.register("PTUMoveMaster", "pokedexNameSoundDirectory", {
        name: "Pokedex Name Sounds Directory",
        hint: "The directory where the user can upload sound files of the Pokedex saying the name of a scanned Pokemon when Move Master's Pokedex function is used. Must end with a /",
        scope: "world",
        config: true,
        type: String,
        default: "pokemon_names/",
        filePicker: true,
        // onChange: (value) => CustomSpeciesFolder.updateFolderDisplay(value),
        category: "other"
    });

	game.settings.register("PTUMoveMaster", "backgroundFieldDirectory", {
        name: "Background Field Directory",
        hint: "The directory where the user can upload background image files to be used by Move Master in certain UI elements. Must end with a /",
        scope: "world",
        config: true,
        type: String,
        default: "background_fields/",
        filePicker: true,
        // onChange: (value) => CustomSpeciesFolder.updateFolderDisplay(value),
        category: "other"
    });

	game.settings.register("PTUMoveMaster", "playerBagDirectory", {
        name: "Player Bag Directory",
        hint: "The directory where the user can upload subdirectories, each with image files with appropriate names (items.png, pokeballs.png, etc.) to be used by Move Master in certain UI elements. The subdirectory 'default' will be used for any actor that does not have a subdirectory of that actor's name (not including spaces). Must end with a /",
        scope: "world",
        config: true,
        type: String,
        default: "player_bags/",
        filePicker: true,
        // onChange: (value) => CustomSpeciesFolder.updateFolderDisplay(value),
        category: "other"
    });

	game.settings.register("PTUMoveMaster", "UnavailablePokemonFolderName", {
		name: "GM Setting: Unavailable Pokemon Folder Name",
		hint: "Pokemon that are in any folder whose name contains this string (case insensitive) will be considered to be unavailable, and will not show up on the sidebar 'belt' of their trainers.",
		scope: "world",
		config: true,
		type: String,
		default: "Bench"
	});

} 

var MoveMasterSidebar = {};
var last_turn_combatantId = null;

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
		GetActorFromToken,
		GetTokenFromActor,
		ActorHasItemWithName,
		IsWithinPokeballThrowRange,
		BreakPokeball,
		RecoverThrownPokeballs,
		RemoveThrownPokeball,
		GetCurrentFieldImageURL,
		toggleEffect,
		recallPokemon,
		adjustActorAccuracy,
		PokemonsTrainerHasItemWithName,
		ActorGetAutoOrderState,
		ActorSetAutoOrders,
		ApplyTrainingToActorsActivePokemon,
		GetActorHealthColor,
		ThisActorOrTheirTrainerHasDexEntry,
		ActivateDigestionBuff,
		injuryTokenSplash,
		elementalHitEffect,
		elementalAttackEffect,
		elementalBlastEffect,
		cleanInjuryTokenSplash,
		isMoveOnCooldown,
		getMoveUsesExpended,
		getMoveCooldownStatusIcon,
		expendMove,
		applyDamageWithBonus: applyDamageWithBonusDR,
		SidebarForm,
		MoveMasterSidebar,
		last_turn_combatantId
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
		$("body").addClass('confetti-hidden');
	}
	else
	{
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
		$("body").addClass('confetti-hidden');
	}
	else
	{
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

	for(let journal of game.journal)
	{
		
		if(journal.name == "_PTUMoveMaster_CustomMoves")
		{
			console.log("PTUMoveMaster | Custom Moves Journal:");
			console.log(journal);

			let custom_moves_json = $(`<p>${journal.data.content}</p>`).text()

			custom_moves = JSON.parse(custom_moves_json);

			console.log("PTUMoveMaster | Parsed Custom Moves:");
			console.log(custom_moves);

			break;
		}
	}

	// eval('game.PTUMoveMaster.MoveMasterSidebar.'+game.user.data._id+' = new game.PTUMoveMaster.SidebarForm({ classes: "ptu-sidebar"})');
	// eval('game.PTUMoveMaster.MoveMasterSidebar.'+game.user.data._id+'.render(true)');
	ui.sidebar.render();
});

Hooks.on("renderChatMessage", (message) => {
	if(!message.isRoll)
	{
		message.data.sound = null; // Suppress dice sounds for Move Master roll templates
	}
});
  

Hooks.on("endTurn", async (combat, actor, round_and_turn, diff, id) => {

	if(game.user.isGM)
	{
		let current_actor = game.actors.get(actor.data.actorId);
		await game.PTUMoveMaster.ResetActionEconomy(current_actor, true);
	}
});


Hooks.on("preDeleteCombat", (combat, misc, tokenID) => {
    if( (game.user.isGM) && (game.settings.get("PTUMoveMaster", "autoResetStagesOnCombatEnd")) )
    {

	Dialog.confirm({
		title: "End Scene?",
		content: "Do you wish to end the Scene as well as the combat? This will reset combat stages, refresh per-scene and EOT cooldowns, and end volatile conditions for all combatants.",
		yes: async () => {
			let combatants = combat.data.combatants;
			let current_actor;
			for(let combatant of combatants)
			{
			current_actor = game.actors.get(combatant.actor.id);

			await game.PTUMoveMaster.ResetStagesToDefault(current_actor, true);
			await game.PTUMoveMaster.ResetActionEconomy(current_actor, true);
			await game.PTUMoveMaster.resetEOTMoves(current_actor, true);
			await game.PTUMoveMaster.resetSceneMoves(current_actor, true);

			// for(let affliction of VolatileAfflictions)
			// {
			// 	await game.PTUMoveMaster.cureActorAffliction(current_actor, affliction, true);
			// }
			await game.PTUMoveMaster.cureActorAffliction(current_actor, "Fainted", true);


			}
			await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+stat_down_sound_file, volume: 0.5, autoplay: true, loop: false}, true);
		},
		defaultYes: false 
	})
    }
});


Hooks.on("prePlayerDeleteToken", async (uuids) => {

	let actors_to_be_deleted = [];
	let at_least_one_owned_pokemon = false;

	for(let uuid of uuids)
	{
		let new_token = await fromUuid(uuid);
		let new_actor = game.PTUMoveMaster.GetActorFromToken(new_token);

		actors_to_be_deleted.push(new_actor);
		if( (new_actor.type == 'pokemon') && (new_actor.data.data.owner != "0") )
		{
			at_least_one_owned_pokemon = true;
		}
	}

	// for(let actor of actors_to_be_deleted)
	// {
	// 	// console.log(actor);
	// }
	
	if(at_least_one_owned_pokemon)
	{
		Dialog.confirm({
			title: "Recall Pokemon?",
			content: "Do you wish to recall the selected owned pokemon, resetting stages to default and removing volatile conditions, or simply force a deletion?",
			yes: async () => {
				for(let actor of actors_to_be_deleted)
				{
					// console.log("await game.PTUMoveMaster.recallPokemon(actor);");
					await game.PTUMoveMaster.recallPokemon(actor);
				}
			},
			no: async () => {
				return true;
			},
			defaultYes: false 
		})
	}

	return false;
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
		$("body").addClass('confetti-hidden');
	}
	else
	{
		$("body").removeClass('confetti-hidden');
	}

	ui.sidebar.render();
	game.PTUMoveMaster.MoveMasterSidebar = new game.PTUMoveMaster.SidebarForm({ classes: "ptu-sidebar"});
	game.PTUMoveMaster.MoveMasterSidebar.render(true);

});

Hooks.on("renderChatMessage", (message, html, data) => {
    setTimeout( async () => {
		$(html).find(".skill-button-1").click("click", function(){game.PTUMoveMaster.RollSkillCheck(
			this.dataset.skill
		)});
		$(html).find(".skill-button-2").click("click", function(){game.PTUMoveMaster.RollSkillCheck(
			this.dataset.skill
		)});
		$(html).find(".skill-button-both").click("click", function(){game.PTUMoveMaster.RollSkillCheck(
			this.dataset.skill1, this.dataset.skill2
		)});
    }, 1000);
});

Hooks.on("startTurn", async (combat, combatant, lastTurn, options, sender) => {

	if(sender != game.user.data._id)
	{
		return;
	}

	let this_round = combat.current.round;
	let this_turn = combat.current.turn;
	let previous_round = combat.previous.round;
	let previous_turn = combat.previous.turn;

	if( (this_turn != (previous_turn+1)) && (this_round != (previous_round+1)) )
	{
		return;
	}

	let current_token = game.combat.current.tokenId;
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
		// console.log("-------- NEW ROUND TRIGGER ---------");
		for(let combatant of game.combat.combatants)
		{
			let this_actor = combatant.actor;

			for(let effect of this_actor.effects)
			{
				await effect.setFlag("ptu", "roundsElapsed", Number(effect.getFlag("ptu", "roundsElapsed"))+1);
			}
		}
	}
	
	// console.log("-------- NEW TURN TRIGGER ---------");

	if( (current_actor.data.flags.ptu) && (game.settings.get("PTUMoveMaster", "autoSkipTurns")) )
	{
		if(current_actor.data.flags.ptu.is_fainted)
		{
			game.PTUMoveMaster.chatMessage(current_actor, current_actor.name+" is fainted - automatically skipping to next turn.");
			await game.PTUMoveMaster.TakeAction(current_actor, "Standard");
			await game.PTUMoveMaster.TakeAction(current_actor, "Standard");
			setTimeout( async () => {  
				game.combat.nextTurn();
			}, 100);
		}
		else
		{
			if(current_actor.data.flags.ptu.is_frozen)
			{
				game.PTUMoveMaster.chatMessage(current_actor, current_actor.name+" is frozen - automatically skipping to end of turn.");
				await game.PTUMoveMaster.TakeAction(current_actor, "Standard");
				await game.PTUMoveMaster.TakeAction(current_actor, "Standard");
				setTimeout( async () => {  
					game.combat.nextTurn();
				}, 100);
			}
			else if(current_actor.data.flags.ptu.is_sleeping)
			{
				game.PTUMoveMaster.chatMessage(current_actor, current_actor.name+" is asleep - automatically skipping to end of turn.");
				await game.PTUMoveMaster.TakeAction(current_actor, "Standard");
				await game.PTUMoveMaster.TakeAction(current_actor, "Standard");
				setTimeout( async () => {  
					game.combat.nextTurn();
				}, 100);
			}
		}
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
		setTimeout( async () => {
			game.ptu.PlayPokemonCry(current_token_species);
		}, 500);
	}

	
	
});

Hooks.on("endTurn", async (combat, combatant, lastTurn, options, sender) => {

	console.log("DEBUG: Hooks.on(endTurn): combatant");
	console.log(combatant);
	let current_actor = combatant.actor;
	// let current_token_species = current_actor.data.data.species;
	let currentWeather = await game.PTUMoveMaster.GetCurrentWeather();
	let actor_type_1 = "Untyped";
	let actor_type_2 = "Untyped";

	let actor_immune_to_hail = false;
	let actor_heals_from_hail = false;
	let actor_immune_to_sandstorm = false;
	let actor_heals_from_sandstorm = false;


	if(current_actor.data.data.heldItem.toLowerCase() == "winter cloak")
	{
		actor_immune_to_hail = true;
	}

	if(current_actor.data.data.heldItem.toLowerCase() == "go-goggles")
	{
		actor_immune_to_sandstorm = true;
	}
	

	if(game.PTUMoveMaster.ActorHasItemWithName(current_actor, "Ice Body", "ability"))
	{
		actor_immune_to_hail = true;
		actor_heals_from_hail = true;
	}

	if(game.PTUMoveMaster.ActorHasItemWithName(current_actor, "Ice Body [Playtest]", "ability"))
	{
		actor_immune_to_hail = true;
	}

	// if(game.PTUMoveMaster.ActorHasItemWithName(current_actor, "HEAL FROM SANDSTORM", "ability"))
	// {
	// 	actor_immune_to_sandstorm = true;
	// 	actor_heals_from_sandstorm = true;
	// }


	if(game.PTUMoveMaster.ActorHasItemWithName(current_actor, "Snow Cloak", "ability"))
	{
		actor_immune_to_hail = true;
	}

	if(game.PTUMoveMaster.ActorHasItemWithName(current_actor, "Overcoat", "ability"))
	{
		actor_immune_to_hail = true;
		actor_immune_to_sandstorm = true;
		actor_is_immune_to_weather_ticks = true;
	}

	if(game.PTUMoveMaster.ActorHasItemWithName(current_actor, "Snow Warning", "ability"))
	{
		actor_immune_to_hail = true;
	}

	if(game.PTUMoveMaster.ActorHasItemWithName(current_actor, "Arctic Pilgrim - Tundra Terrain", "feat"))
	{
		actor_immune_to_hail = true;
	}

	if(game.PTUMoveMaster.ActorHasItemWithName(current_actor, "The Cold Never Bothered Me Anyway", "feat"))
	{
		actor_immune_to_hail = true;
	}


	if(game.PTUMoveMaster.ActorHasItemWithName(current_actor, "Dune Walker - Desert Terrain", "feat"))
	{
		actor_immune_to_sandstorm = true;
	}

	if(game.PTUMoveMaster.ActorHasItemWithName(current_actor, "Desert Weather", "ability"))
	{
		actor_immune_to_sandstorm = true;
	}

	if(game.PTUMoveMaster.ActorHasItemWithName(current_actor, "Sand Force", "ability"))
	{
		actor_immune_to_sandstorm = true;
	}

	if(game.PTUMoveMaster.ActorHasItemWithName(current_actor, "Sand Rush", "ability"))
	{
		actor_immune_to_sandstorm = true;
	}

	if(game.PTUMoveMaster.ActorHasItemWithName(current_actor, "Sand Stream", "ability"))
	{
		actor_immune_to_sandstorm = true;
	}

	if(game.PTUMoveMaster.ActorHasItemWithName(current_actor, "Sand Veil", "ability"))
	{
		actor_immune_to_sandstorm = true;
	}


	let actor_is_immune_to_weather_ticks = false;

	if(game.PTUMoveMaster.ActorHasItemWithName(current_actor, "Magic Guard", "ability"))
	{
		actor_is_immune_to_weather_ticks = true;
	}

	if(game.PTUMoveMaster.ActorHasItemWithName(current_actor, "Permafrost [Playtest]", "ability"))
	{
		actor_is_immune_to_weather_ticks = true;
	}

	if(current_actor.data.data.typing)
	{
		actor_type_1 = current_actor.data.data.typing[0];
		actor_type_2 = current_actor.data.data.typing[1];
	}

	setTimeout( async () => {

		if(currentWeather == "Sandstorm")
		{
			if(actor_type_1 != "Ground" && actor_type_1 != "Rock" && actor_type_1 != "Steel" && actor_type_2 != "Ground" && actor_type_2 != "Rock" && actor_type_2 != "Steel" && !actor_is_immune_to_weather_ticks && !actor_immune_to_sandstorm)
			{
				game.PTUMoveMaster.damageActorTick(current_actor, "Sandstorm");
			}
			else if(actor_heals_from_sandstorm)
			{
				game.PTUMoveMaster.healActorTick(current_actor, "Sandstorm");
			}
			else
			{
				game.PTUMoveMaster.chatMessage(current_actor, current_actor.name + ' is immune to the Sandstorm\'s effects!');
			}
		}

		if(currentWeather == "Hail")
		{
			if(actor_type_1 != "Ice" && actor_type_2 != "Ice" && !actor_is_immune_to_weather_ticks && !actor_immune_to_hail)
			{
				game.PTUMoveMaster.damageActorTick(current_actor, "Hail");
			}
			else if(actor_heals_from_hail)
			{
				game.PTUMoveMaster.healActorTick(current_actor, "Hail");
			}
			else
			{
				game.PTUMoveMaster.chatMessage(current_actor, current_actor.name + ' is immune to the Hail\'s effects!');
			}
		}

		if(currentWeather == "Rainy")
		{
			if(game.PTUMoveMaster.ActorHasItemWithName(current_actor, "Rain Dish", "ability"))
			{
				game.PTUMoveMaster.healActorTick(current_actor, "Rainy + Rain Dish");
			}

			if(game.PTUMoveMaster.ActorHasItemWithName(current_actor, "Dry Skin", "ability"))
			{
				game.PTUMoveMaster.healActorTick(current_actor, "Rainy + Dry Skin");
			}
		}

		if(currentWeather == "Sunny")
		{
			if(game.PTUMoveMaster.ActorHasItemWithName(current_actor, "Dry Skin", "ability"))
			{
				game.PTUMoveMaster.damageActorTick(current_actor, "Sunny + Dry Skin");
			}

			if(game.PTUMoveMaster.ActorHasItemWithName(current_actor, "Sun Blanket", "ability"))
			{
				game.PTUMoveMaster.healActorTick(current_actor, "Sunny + Sun Blanket");
			}
		}

	}, 800);

});


Hooks.on("controlToken", async (token, selected) => {
	if(canvas.tokens.controlled.length < 2) // This avoids the multi-select bug.
	{
		if(selected)
		{
			let current_actor = game.actors.get(token.data.actorId);
	
			await PTUAutoFight().ChatWindow(current_actor);
			await $("#ptu-sidebar").slideDown(200);
			// await $(".ptu-sidebar.window-content").scrollTop(300);
		}
		else
		{
			game.PTUMoveMaster.MoveMasterSidebar = await new game.PTUMoveMaster.SidebarForm({ classes: "ptu-sidebar"});
			await game.PTUMoveMaster.MoveMasterSidebar.render(true);
			await $("#ptu-sidebar").slideUp(200);
		}
	}
	
});


Hooks.on("targetToken", async (user, token, targeted) => {
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
	if(game.combat && userid == game.user.id)
	{
		let current_actor = game.actors.get(token.data.actorId);

		if((diff.diff) && (current_actor.data.flags.ptu) && (!current_actor.data.flags.ptu.actions_taken.shift))
		{
			if(change.x > 0 || change.y > 0)
			{
				game.PTUMoveMaster.TakeAction(current_actor, "Shift");
				setTimeout( async () => { 
					PTUAutoFight().ChatWindow(current_actor, true);
				}, 1000);
			}
		}
	}
});


Hooks.on("createToken", async (token, options, id) => { // If an owned Pokemon is dropped onto the field, play pokeball release sound, and create lightshow

	if((game.userId == id) && (token.data.flags["item-piles"] == undefined))
	{
		setTimeout( async () => {
			
			let tokenData = token.data;
			let actor = game.actors.get(tokenData.actorId);
			let original_scale = tokenData.scale;
			let item_icon_path = game.settings.get("PTUMoveMaster", "itemIconDirectory");
			let display_token_nature = game.settings.get("PTUMoveMaster", "alwaysDisplayTokenNature");
			let enable_pokeball_animation = game.settings.get("PTUMoveMaster", "usePokeballAnimationOnDragOut");
			let always_display_token_name = game.settings.get("PTUMoveMaster", "alwaysDisplayTokenNames");
			let always_display_token_health = game.settings.get("PTUMoveMaster", "alwaysDisplayTokenHealth");
	
			function capitalizeFirstLetter(string) {
				return string[0].toUpperCase() + string.slice(1);
			}
	
			if(actor)
			{
				let target_token;
	
				if(tokenData.actorLink == false)
				{
					target_token = canvas.tokens.get(token.id);//.slice(-1)[0]; // The thrown pokemon
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
				if(actor.data.data.nature && display_token_nature)
				{
					current_token_nature = capitalizeFirstLetter((actor.data.data.nature.value).toLowerCase())+" ";
				}
	
				if(actor.data.type == "pokemon" && (actor.data.data.owner != "0" && actor.data.data.owner != "")) // Owned Pokemon
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
	
					if(!await game.PTUMoveMaster.IsWithinPokeballThrowRange(actor_token, target_token, pokeball))
					{
						// ui.notifications.warn(`Target square is ${rangeToTarget}m away, which is outside your ${throwRange}m throwing range!`);
						
						await game.ptu.api.tokensDelete(game.actors.get(actor.id).getActiveTokens().slice(-1)[0]);
					}
					else
					{
						setTimeout( async () => { game.ptu.PlayPokemonCry(current_token_species); }, 2000);
						
						if(enable_pokeball_animation)
						{
							await target_token.document.update({ "alpha": (0) });
						}
	
						// ui.notifications.info(`Target square is ${rangeToTarget}m away, which is within your ${throwRange}m throwing range!`);
						await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"pokeball_sounds/"+"pokeball_miss.mp3", volume: 0.5, autoplay: true, loop: false}, true);
	
						let transitionType = 9;
						let targetImagePath = item_icon_path+pokeball+".png";
	
						if(enable_pokeball_animation)
						{ 
	
							function castSpell(effect) {
								canvas.specials.drawSpecialToward(effect, actor_token, game.actors.get(actor.id).getActiveTokens().slice(-1)[0]);//target_token);
							}
							
	
							castSpell({
								file:
									item_icon_path+pokeball+".webm",
								anchor: {
									x: -0.08,
									y: 0.5,
								},
								speed: "auto",//1,
								angle: 0,
								scale: {
									x: 0.5,
									y: 0.5,
								},
							});
							
	
							// setTimeout( async () => { await target_token.TMFXaddUpdateFilters(pokeball_polymorph_params); }, 1000);
	
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
	
							setTimeout( async () => {  
								await target_token.TMFXaddUpdateFilters(pokeballShoop_params); 
								await target_token.document.update({ "alpha": (1) });
							}, 1000);
						}
						setTimeout( async () => {  
	
							if(always_display_token_name)
							{
								if(game.settings.get("PTUMoveMaster", "alwaysDisplayTokenHealth") == true)
								{
									await target_token.document.update({
										// "scale": original_scale,
										"bar1.attribute": "health",
										"displayBars": 50,
										"displayName": 50,
										"alpha": (1) 
									});  
								}
								else
								{
									await target_token.document.update({
										// "scale": original_scale,
										"displayName": 50,
										"alpha": (1)
									});  
								}
							}
							else if (game.settings.get("PTUMoveMaster", "alwaysDisplayTokenHealth") == true)
							{
								await target_token.document.update({
									// "scale": original_scale,
									"bar1.attribute": "health",
									"displayBars": 50,
									"alpha": (1)
								});  
							}
							else
							{
								// await target_token.document.update({"scale": original_scale, "alpha": (1) });
								await target_token.document.update({ "alpha": (1) });
							}

							// setTimeout( async() =>{
							// 	await target_token.document.update({"scale": original_scale});
							// }, 500);
							
						}, 2000);
	
						setTimeout( async () => { 
							await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"pokeball_sounds/"+"pokeball_release.mp3", volume: 0.5, autoplay: true, loop: false}, true); 
						}, 500);
					}
				}
				else if (actor.data.type == "pokemon")
				{
					if(always_display_token_name)
					{
						if(always_display_token_health)
						{
							await target_token.document.update({
								"name": (current_token_nature+current_token_species),
								"bar1.attribute": "health",
								"displayBars": 50,
								"displayName": 50,
								"alpha": (1)
							});  
						}
						else
						{
							await target_token.document.update({
								"name": (current_token_nature+current_token_species),
								"displayName": 50,
								"alpha": (1)
							});  
						}
					}
					else if (always_display_token_health)
					{
						await target_token.document.update({
							// "name": (current_token_nature+current_token_species),
							"bar1.attribute": "health",
							"displayBars": 50,
							"alpha": (1)
						});  
					}
					else
					{
						await target_token.document.update({/*"name": (current_token_nature+current_token_species),*/ "alpha": (1) });
					}	
					game.ptu.PlayPokemonCry(current_token_species);	
				}
				
				if(game.combat)
				{
					await target_token.toggleCombat().then(() => game.combat.rollAll({rollMode: 'gmroll'}));
					// game.combat.rollAll({rollMode: 'gmroll'});
	
				}
			}
		}, 100);
	}
});

Hooks.on("item-piles-createItemPile", async (token, options) => {

	if(game.user.isGM && token.data.actorData.items)
	{
		let dropped_item = token.data.actorData.items[0];
		let item_art = await game.PTUMoveMaster.GetItemArt(dropped_item.name);
		await token.update({ "data.img": item_art, "name": dropped_item.name});
	}

});

Hooks.on("item-piles-preDropItemDetermined", (source, target, position, itemData, force) => {

	if(itemData.type == "dexentry")
	{
		return false;
	}
});

Hooks.on("item-piles-preDropItemDetermined", async (source, target, position, itemData, force) => {

	let dropped_item = itemData;
	if(dropped_item.img == "icons/svg/mystery-man.svg")
	{
		let item_art = await game.PTUMoveMaster.GetItemArt(dropped_item.name);
		itemData.img = item_art;
	}
});


Hooks.on("preCreateItem", (new_document, source_data, options, userId) => {

	console.log("preCreateItem: source_data.type");
	console.log(source_data.type);
	console.log("preCreateItem: new_document.data.img");
	console.log(new_document.data.img);
	console.log("preCreateItem: game.userId");
	console.log(game.userId);
	console.log("preCreateItem: userId");
	console.log(userId);

	if(source_data.type == "item" && new_document.data.img == "icons/svg/mystery-man.svg" && game.userId == userId)
	{
		let item_icon_path = game.settings.get("PTUMoveMaster", "itemIconDirectory");
		let item_art = (item_icon_path+source_data.name+".webp");
		// if(!fetch(item_icon_path+source_data.name+".webp") , { method: 'HEAD' })
		// {
		// 	item_art = (item_icon_path+source_data.name+".png");
		// }
		// let item_art = //await game.PTUMoveMaster.GetItemArt(source_data.name);

		console.log("DEBUG: preCreateItem item_art: ");
		console.log(item_art);

		new_document.data.update({"img": item_art});

		return true;
	}
});

Hooks.on("createItem", async (new_item, options, userId) => {

	console.log("createItem: new_item");
	console.log(new_item);

	console.log("CreateItem: new_item.type");
	console.log(new_item.type);
	console.log("CreateItem: new_item.data.img");
	console.log(new_item.data.img);
	console.log("CreateItem: game.userId");
	console.log(game.userId);
	console.log("CreateItem: userId");
	console.log(userId);

	if(game.userId == userId)
	{
		let item_art = await game.PTUMoveMaster.GetItemArt(new_item.name);
		console.log("DEBUG: createItem item_art: ");
		console.log(item_art);

		if(new_item.type == "item" && new_item.data.img.replace(/\.[^/.]+$/, "") == item_art.replace(/\.[^/.]+$/, ""))
		{
			await new_item.data.update({"img": item_art});
			return true;
		}
	}

	
});

// Hooks.on("item-piles-transferItems", (sourceUuid, targetUuid, items) => {

// 	console.log("item-piles-transferItems: sourceUuid");
// 	console.log(sourceUuid);
// 	console.log("item-piles-transferItems: targetUuid");
// 	console.log(targetUuid);
// 	console.log("item-piles-transferItems: items");
// 	console.log(items);

	
// });

// Hooks.on("item-piles-addItems", async (tokenRecievingItems, itemArray) => {

// 	console.log("item-piles-addItems: tokenRecievingItems");
// 	console.log(tokenRecievingItems);
// 	console.log("item-piles-addItems: itemArray");
// 	console.log(itemArray);

// 	let token_actor = tokenRecievingItems._actor;
// 	console.log("item-piles-addItems: token_actor");
// 	console.log(token_actor);

// 	for(let item of itemArray)
// 	{
// 		console.log("item");
// 		console.log(item);

// 		console.log("item.data.quantity");
// 		console.log(item.data.quantity);

// 		let found_item = game.PTUMoveMaster.ActorHasItemWithName(token_actor, item.name, "item");
// 		if(found_item)
// 		{
// 			console.log("found_item");
// 			console.log(found_item);

// 			console.log("found_item.data.data.quantity");
// 			console.log(found_item.data.data.quantity);

// 			let new_quantity = Number(item.data.quantity + found_item.data.data.quantity);
// 			console.log("new_quantity");
// 			console.log(new_quantity);

// 			await found_item.update({"data.quantity": new_quantity});

// 			break;
// 		}

// 	}
	
// });


// Hooks.on("preUpdateItem", async (document, changes, options, userId) => {

// 	console.log("preUpdateItem: document:");
// 	console.log(document);
// 	console.log("preUpdateItem: changes:");
// 	console.log(changes);
// 	console.log("preUpdateItem: options:");
// 	console.log(options);
// 	console.log("preUpdateItem: userId:");
// 	console.log(userId);

// 	if( (document.type == "item") && (document.data.img == "icons/svg/mystery-man.svg") && (changes.data) && (!changes.data.img) )
// 	{
// 		let item_art = await game.PTUMoveMaster.GetItemArt(document.data.name);
// 		changes.data.img = item_art;

// 		// await document.data.update({ img: item_art});

// 		console.log("preUpdateItem: Post-update: document");
// 		console.log(document);
// 		console.log("preUpdateItem: Post-update: changes");
// 		console.log(changes);
// 		return true;
// 	}
// });


// Hooks.on("createItem", async (new_item, options, userId) => {

// 	console.log("createItem: new_item:");
// 	console.log(new_item);
// 	console.log("createItem: options:");
// 	console.log(options);
// 	console.log("createItem: userId:");
// 	console.log(userId);

// 	if(new_item.type == "item")
// 	{
// 		let item_art = await game.PTUMoveMaster.GetItemArt(new_item.data.name);
// 		// new_item.data.img = item_art;
// 		// new_item.data.img = item_art;
// 		// item.data.img = item_art;
// 		await new_item.update({ "data.img": item_art});

// 		console.log("createItem: Post-update: new_item");
// 		console.log(new_item);
// 		return true;
// 	}
// });


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
	// "Blank Template"  :   {
	// 	"roll-trigger": 20,
	// 	"atk"   : 0,
	// 	"def"   : 0,
	// 	"spatk" : 0,
	// 	"spdef" : 0,
	// 	"spd"   : 0,
	// 	"accuracy": 0,
	// 	"pct-healing": 0,
	// 	"pct-self-damage": 0,
	// 	"recoil": 0,
	// 	"crit-range": 20,
	// 	"effect-range": 20,
	// 	"weather": "Clear"
	// },

	"Example Move Name":	{

		"self_effects":
		{
			"healing":				{ "value": {"default":50, "Clear":50, "Sunny":75, "Rainy":25, "Hail":25, "Sandstorm":25 }, "effect_threshold": 20, "effect_even_or_odd": "even" },
			"healing_pct":			{ "value": {"default":50, "Clear":50, "Sunny":75, "Rainy":25, "Hail":25, "Sandstorm":25 }, "effect_threshold": 20, "effect_even_or_odd": "even" },
			"set_hitpoint_to":		{ "value": {"default":50, "Clear":50, "Sunny":75, "Rainy":25, "Hail":25, "Sandstorm":25 }, "effect_threshold": 20, "effect_even_or_odd": "even" },
			"set_hitpoint_to_pct":	{ "value": {"default":50, "Clear":50, "Sunny":75, "Rainy":25, "Hail":25, "Sandstorm":25 }, "effect_threshold": 20, "effect_even_or_odd": "even" },
			"inflict_ticks":		{ "value": {"default":50, "Clear":50, "Sunny":75, "Rainy":25, "Hail":25, "Sandstorm":25 }, "effect_threshold": 20, "effect_even_or_odd": "even" },
			"heal_ticks":			{ "value": {"default":50, "Clear":50, "Sunny":75, "Rainy":25, "Hail":25, "Sandstorm":25 }, "effect_threshold": 20, "effect_even_or_odd": "even" },
			"condition_cure":		
			{
				"Poisoned": {"effect_threshold": 20, "effect_even_or_odd": "even" },
				"Badly Poisoned": {"effect_threshold": 20, "effect_even_or_odd": "even" },
			},
			"condition_inflict":	
			{ 
				"Poisoned": {"effect_threshold": 20, "effect_even_or_odd": "even", "duration": {"rounds":0, "scene": false} },
				"Badly Poisoned": {"effect_threshold": 20, "effect_even_or_odd": "even", "duration": {"rounds":0, "scene": false} },
			},
			"stage_change":			{"atk":0, "def":0, "spatk":0, "spdef":0, "spd":0 },
			"crit_mod":				{"value": 0, "duration": {"rounds":0} },
			"accuracy_mod":			{"value": 0, "duration": {"rounds":0} },
			"substitute":			{"value": 0.25, "effect_threshold": 20, "effect_even_or_odd": "even", "duration": {"rounds":0, "scene": false} },
			"above_battlefield":	{"duration": {"rounds":1} },
			"below_battlefield":	{"duration": {"rounds":1} },
			"replace_actor_type": 	{"value": ["Fire", "Water"], "duration": {"rounds":0, "scene": true} },
			"add_actor_type": 		{"value": ["Ghost", "Fairy"], "duration": {"rounds":0, "scene": true} },
			"remove_actor_type": 	{"value": ["Ghost", "Fairy"], "duration": {"rounds":0, "scene": true} },
		},
		
		"target_effects":
		{
			"healing":				{ "value": {"default":50, "Clear":50, "Sunny":75, "Rainy":25, "Hail":25, "Sandstorm":25 }, "effect_threshold": 20, "effect_even_or_odd": "even" },
			"healing_pct":			{ "value": {"default":50, "Clear":50, "Sunny":75, "Rainy":25, "Hail":25, "Sandstorm":25 }, "effect_threshold": 20, "effect_even_or_odd": "even" },
			"set_hitpoint_to":		{ "value": {"default":50, "Clear":50, "Sunny":75, "Rainy":25, "Hail":25, "Sandstorm":25 }, "effect_threshold": 20, "effect_even_or_odd": "even" },
			"set_hitpoint_to_pct":	{ "value": {"default":50, "Clear":50, "Sunny":75, "Rainy":25, "Hail":25, "Sandstorm":25 }, "effect_threshold": 20, "effect_even_or_odd": "even" },
			"inflict_ticks":		{ "value": {"default":50, "Clear":50, "Sunny":75, "Rainy":25, "Hail":25, "Sandstorm":25 }, "effect_threshold": 20, "effect_even_or_odd": "even" },
			"heal_ticks":			{ "value": {"default":50, "Clear":50, "Sunny":75, "Rainy":25, "Hail":25, "Sandstorm":25 }, "effect_threshold": 20, "effect_even_or_odd": "even" },
			"condition_cure":		
			{
				"Poisoned": {"effect_threshold": 20, "effect_even_or_odd": "even" },
				"Badly Poisoned": {"effect_threshold": 20, "effect_even_or_odd": "even" },
			},
			"condition_inflict":	
			{ 
				"Poisoned": {"effect_threshold": 20, "effect_even_or_odd": "even", "duration": {"rounds":0, "scene": false} },
				"Badly Poisoned": {"effect_threshold": 20, "effect_even_or_odd": "even", "duration": {"rounds":0, "scene": false} },
			},
			"stage_change":			{"atk":0, "def":0, "spatk":0, "spdef":0, "spd":0 },
			"crit_mod":				{"value": 0, "duration": {"rounds":0} },
			"accuracy_mod":			{"value": 0, "duration": {"rounds":0} },
			"substitute":			{"value": 0.25, "effect_threshold": 20, "effect_even_or_odd": "even", "duration": {"rounds":0, "scene": false} },
			"above_battlefield":	{"duration": {"rounds":1} },
			"below_battlefield":	{"duration": {"rounds":1} },
			"replace_actor_type": 	{"value": ["Fire", "Water"], "duration": {"rounds":0, "scene": true} },
			"add_actor_type": 		{"value": ["Ghost", "Fairy"], "duration": {"rounds":0, "scene": true} },
			"remove_actor_type": 	{"value": ["Ghost", "Fairy"], "duration": {"rounds":0, "scene": true} },
		},

		"harms_loyalty":		false,
		"weather": 				{"value": "Rainy", "duration":{"rounds":5, "scene": false}},
		"crit-range": 			20,
		"recoil_pct": 			0.33,
		"dynamic_damage_base": 	{ "formula_to_eval_to_DB": "" },
		"dynamic_damage_mod": 	{ "formula_to_eval_to_damage_add": "", "formula_to_eval_to_damage_subtract": "" },
		"use_a_different_move_from_this_list_instead": ["Thunder", "Quick Attack", ],
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
	"Magic Weapon"  :   {
		"spatk" : 1,
		"accuracy" : 1
	},
	"Take Aim"  :   {
		"accuracy" : 1
	},
	"Bullseye"  :   {
		"crit-range": 16
	},
	"Energy Blast"  :   {
		"roll-trigger": 19,
		"spatk" : 1
	},
	"Energy Sphere"  :   {
		"roll-trigger": 19,
		"spdef" : 1
	},
	"Energy Sphere"  :   {
		"roll-trigger": 19,
		"spdef" : 1
	},
	"Deadly Strike"  :   {
		"crit-range":	2,
	},
};

var custom_moves = "";

const soot_splash_params =
[{
	filterType: "splash",
	filterId: "sootSplash",
	rank:5,
	color: 0x999999,
	padding: 30,
	time: Math.random()*1000,
	seed: Math.random(),
	splashFactor: 1,
	spread: 0.4,
	blend: 1,
	dimX: 2,
	dimY: 2,
	cut: false,
	textureAlphaBlend: true,
	anchorX: 0.32+(Math.random()*0.36),
	anchorY: 0.32+(Math.random()*0.36)
}];

const blood_splash_params =
[{
	filterType: "splash",
	filterId: "bloodSplash",
	rank:5,
	color: 0x990505,
	padding: 30,
	time: Math.random()*1000,
	seed: Math.random(),
	splashFactor: 1,
	spread: 0.4,
	blend: 1,
	dimX: 2,
	dimY: 2,
	cut: false,
	textureAlphaBlend: true,
	anchorX: 0.32+(Math.random()*0.36),
	anchorY: 0.32+(Math.random()*0.36)
}];

const hit_params =
[{
	filterType: "transform",
	filterId: "hit_shake",
	autoDestroy: true,
	padding: 80,
	animated:
	{
		translationX:
		{
			animType: "sinOscillation",
			val1: 0.05,
			val2: -0.05,
			loops: 5,
			loopDuration: 100
		},
		translationX:
		{
			animType: "cosOscillation",
			val1: 0.05,
			val2: -0.05,
			loops: 5,
			loopDuration: 50
		},
	}
}];

const ButtonHeight = 100;
const RangeFontSize = 14;
const RangeIconFontSizeOffset = (8);
const MoveButtonBackgroundColor = "#333333";
const MoveButtonTextColor = "#cccccc";

const TypeIconWidth = 97;
const EffectivenessBorderThickness = 5;

const TypeIconSuffix = "IC.png";
const TypeIconSuffixFlipped = "IC_Flipped.png";
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

// const OrdersToggleAuto_on_Mark = "<img title='Toggle automatic order if action available at turn end. Currently active.' src='"+AlternateIconPath+"OrdersToggleAuto_on.png' style='border:none; height:25px;'>";
// const OrdersToggleAuto_off_Mark = "<img title='Toggle automatic order if action available at turn end. Currently inactive.' src='"+AlternateIconPath+"OrdersToggleAuto_off.png' style='border:none; height:25px;'>";

const OrdersToggleAuto_on_Mark = 		"<div title='Toggle automatic order if action available at turn end. Currently active.' 								style='background-color: #333333; color:#cccccc; border-left:5px solid green; 	width:100%; color: #009004;			height:25px;font-size:16px;	font-family: Modesto Condensed;	display: flex;	justify-content: center;align-items: center;'>AUTO</div>";
const OrdersToggleAuto_off_Mark = 		"<div title='Toggle automatic order if action available at turn end. Currently inactive.' 								style='background-color: #333333; color:#cccccc; border-left:5px solid black; 	width:100%; color: #666;			height:25px;font-size:16px;	font-family: Modesto Condensed;	display: flex;	justify-content: center;align-items: center;'>AUTO</div>";

// const Orders_Agility_Training_Mark = "<img title='Agility Orders: +1 bonus to Movement Capabilities and +4 to Initiative.' src='"+AlternateIconPath+"OrderButton_Agility_Training.png' style='border:none; width:140px;'>";
// const Orders_Agility_Training_Mark = "<img title='Agility Orders: +1 bonus to Movement Capabilities and +4 to Initiative.' src='"+AlternateIconPath+"OrderButton_Agility_Training.png' style='border:none; width:134px; margin:none; padding:none;'>"
// const Orders_Brutal_Training_Mark = "<img title='Brutal Orders: Increase the Critical-Hit and Effect Range of all attacks by +1.' src='"+AlternateIconPath+"OrderButton_Brutal_Training.png' style='border:none; width:134px; margin:none; padding:none;'>";
// const Orders_Focused_Training_Mark = "<img title='Focused Orders: gain a +1 bonus to Accuracy Rolls and +2 to Skill Checks.' src='"+AlternateIconPath+"OrderButton_Focused_Training.png' style='border:none; width:134px; margin:none; padding:none;'>";
// const Orders_Inspired_Training_Mark = "<img title='Inspired Orders: +1 bonus to Evasion and +2 to Save Checks.' src='"+AlternateIconPath+"OrderButton_Inspired_Training.png' style='border:none; width:134px; margin:none; padding:none;'>";
// const Orders_Critical_Moment_Mark = "<img title='Critical Moment: The bonuses from your Pokemon’s [Training] are tripled until the end of your next turn.' src='"+AlternateIconPath+"OrderButton_Critical_Moment.png' style='border:none; width:134px; margin:none; padding:none;'>";

const Orders_Agility_Training_Mark_off = 	"<div title='Agility Orders: +1 bonus to Movement Capabilities and +4 to Initiative.' 									style='background-color: #333333; color:#cccccc; border-left:5px solid darkgray; 	width:100%; 					height:25px;font-size:20px;	font-family: Modesto Condensed;	display: flex;	justify-content: center;align-items: center;'>Agility Orders</div>";
const Orders_Brutal_Training_Mark_off = 	"<div title='Brutal Orders: Increase the Critical-Hit and Effect Range of all attacks by +1.' 							style='background-color: #333333; color:#cccccc; border-left:5px solid darkgray; 	width:100%; 					height:25px;font-size:20px;	font-family: Modesto Condensed;	display: flex;	justify-content: center;align-items: center;'>Brutal Orders</div>";
const Orders_Focused_Training_Mark_off = 	"<div title='Focused Orders: gain a +1 bonus to Accuracy Rolls and +2 to Skill Checks.' 								style='background-color: #333333; color:#cccccc; border-left:5px solid darkgray; 	width:100%; 					height:25px;font-size:20px;	font-family: Modesto Condensed;	display: flex;	justify-content: center;align-items: center;'>Focused Orders</div>";
const Orders_Inspired_Training_Mark_off = 	"<div title='Inspired Orders: +1 bonus to Evasion and +2 to Save Checks.' 												style='background-color: #333333; color:#cccccc; border-left:5px solid darkgray; 	width:100%; 					height:25px;font-size:20px;	font-family: Modesto Condensed;	display: flex;	justify-content: center;align-items: center;'>Inspired Orders</div>";
const Orders_Critical_Moment_Mark_off = 	"<div title='Critical Moment: The bonuses from your Pokemon’s [Training] are tripled until the end of your next turn.' 		style='background-color: #333333; color:#cccccc; border-left:5px solid darkgray; 	width:100%; 					height:25px;font-size:20px;	font-family: Modesto Condensed;	display: flex;	justify-content: center;align-items: center;'>Critical Moment!</div>";

const Orders_Agility_Training_Mark_on = 	"<div title='Agility Orders: +1 bonus to Movement Capabilities and +4 to Initiative.' 									style='background-color: #333333; color:#cccccc; border-left:5px solid green; 		width:100%; 					height:25px;font-size:20px;	font-family: Modesto Condensed;	display: flex;	justify-content: center;align-items: center;'>Agility Orders</div>";
const Orders_Brutal_Training_Mark_on = 	"<div title='Brutal Orders: Increase the Critical-Hit and Effect Range of all attacks by +1.' 								style='background-color: #333333; color:#cccccc; border-left:5px solid green; 		width:100%; 					height:25px;font-size:20px;	font-family: Modesto Condensed;	display: flex;	justify-content: center;align-items: center;'>Brutal Orders</div>";
const Orders_Focused_Training_Mark_on = 	"<div title='Focused Orders: gain a +1 bonus to Accuracy Rolls and +2 to Skill Checks.' 								style='background-color: #333333; color:#cccccc; border-left:5px solid green; 		width:100%; 					height:25px;font-size:20px;	font-family: Modesto Condensed;	display: flex;	justify-content: center;align-items: center;'>Focused Orders</div>";
const Orders_Inspired_Training_Mark_on = 	"<div title='Inspired Orders: +1 bonus to Evasion and +2 to Save Checks.' 												style='background-color: #333333; color:#cccccc; border-left:5px solid green; 		width:100%; 					height:25px;font-size:20px;	font-family: Modesto Condensed;	display: flex;	justify-content: center;align-items: center;'>Inspired Orders</div>";
const Orders_Critical_Moment_Mark_on = 	"<div title='Critical Moment: The bonuses from your Pokemon’s [Training] are tripled until the end of your next turn.' 		style='background-color: #333333; color:#cccccc; border-left:5px solid green; 		width:100%; 					height:25px;font-size:20px;	font-family: Modesto Condensed;	display: flex;	justify-content: center;align-items: center;'>Critical Moment!</div>";


const EffectivenessColors = {
	0: "black",
	0.25: "darkred",
	0.5: "#cc6666",
	1: "white",
	1.25: "#89b3b5",
	1.5: "#6699cc",
	2: "blue",
	3: "blue",
	4: "blue",
};


const nature_flavor_table = 
{
	"Cuddly":	["salty", "spicy"],
	"Distracted":["salty", "sour"],
	"Proud":	["salty", "dry"],
	"Decisive":	["salty", "bitter"],
	"Patient":	["salty", "sweet"],
	"Desperate":["spicy", "salty"],
	"Lonely":	["spicy", "sour"],
	"Adamant":	["spicy", "dry"],
	"Naughty":	["spicy", "bitter"],
	"Brave":	["spicy", "sweet"],
	"Stark":	["sour", "salty"],
	"Bold":		["sour", "spicy"],
	"Impish":	["sour", "dry"],
	"Lax":		["sour", "bitter"],
	"Relaxed":	["sour", "sweet"],
	"Curious":	["dry", "salty"],
	"Modest":	["dry", "spicy"],
	"Mild":		["dry", "sour"],
	"Rash":		["dry", "bitter"],
	"Quiet":	["dry", "sweet"],
	"Dreamy":	["bitter", "salty"],
	"Calm":		["bitter", "spicy"],
	"Gentle":	["bitter", "sour"],
	"Careful":	["bitter", "dry"],
	"Sassy":	["bitter", "sweet"],
	"Skittish":	["sweet", "salty"],
	"Timid":	["sweet", "spicy"],
	"Hasty":	["sweet", "sour"],
	"Jolly":	["sweet", "dry"],
	"Naive":	["sweet", "bitter"],
	"Hardy":	["neutral", "neutral"],
	"Docile":	["neutral", "neutral"],
	"Bashful":	["neutral", "neutral"],
	"Quirky":	["neutral", "neutral"],
	"Serious":	["neutral", "neutral"],
	"Composed":	["neutral", "neutral"]
};

const digestionsBuffs = 
{
	"candy bar": {"description": "Snack. Grants a Digestion Buff that heals 5 Hit Points.", "self_effects":{ "healing": 5 } },
	"honey": {"description": "Snack. Grants a Digestion Buff that heals 5 Hit Points. May be used as Bait.", "self_effects":{ "healing": 5 } },
	"leftovers": {"description": "Snack. When their Digestion Buff is traded in, the user recovers 1/16th of their max Hit Points at the beginning of each turn for the rest of the encounter.", "self_effects":{ "healing_fraction": 16 }, "duration":{ "scene": true } },
	"black sludge": {"description": "Poison-Type Pokémon may consume the Black Sludge as a Snack Item; when the Digestion Buff is traded in, they recover 1/8th of their Max Hit Points at the beginning of each turn for the rest of the encounter.", "self_effects":{ "healing_fraction": 8 }, "duration":{ "scene": true } },
	
	"salty surprise": {"description": "The user may trade in this Snack’s Digestion Buff when being hit by an attack to gain 5 Temporary Hit Points. If the user likes Salty Flavors, they gain 10 Temporary Hit Points Instead. If the user dislikes Salty Food, they become Enraged.", "flavor":"salty", "self_effects":{ "healing": 5 }, "enjoyed_effects":{ "healing": 10 }, "disliked_effects":{ "condition_inflict": "Rage" }, },
	"spicy wrap": {"description": "The user may trade in this Snack’s Digestion Buff when making a Physical attack to deal +5 additional Damage. If the user prefers Spicy Food, it deals +10 additional Damage instead. If the user dislikes Spicy Food, they become Enraged.", "flavor":"spicy", "self_effects":{ "physical_damage_mod": 5 }, "enjoyed_effects":{ "physical_damage_mod": 10 }, "disliked_effects":{ "condition_inflict": "Rage" }, },
	"sour candy": {"description": "The user may trade in this Snack’s Digestion Buff when being hit by a Physical Attack to increase their Damage Reduction by +5 against that attack. If the user prefers Sour Food, they gain +10 Damage Reduction instead. If the user dislikes Sour Food, they become Enraged.", "flavor":"sour", "self_effects":{ "physical_damage_reduction_mod": 5 }, "enjoyed_effects":{ "physical_damage_reduction_mod": 10 }, "disliked_effects":{ "condition_inflict": "Rage" }, },
	"dry wafer": {"description": "The user may trade in this Snack’s Digestion Buff when making a Special attack to deal +5 additional Damage. If the user prefers Dry Food, it deals +10 additional Damage instead. If the user dislikes Dry Food, they become Enraged.", "flavor":"dry", "self_effects":{ "special_damage_mod": 5 }, "enjoyed_effects":{ "special_damage_mod": 10 }, "disliked_effects":{ "condition_inflict": "Rage" }, },
	"bitter treat": {"description": "The user may trade in this Snack’s Digestion Buff when being hit by a Special Attack to increase their Damage Reduction by +5 against that attack. If the user prefers Bitter Food, they gain +10 Damage Reduction instead. If the user dislikes Bitter Food, they become Enraged.", "flavor":"bitter", "self_effects":{ "special_damage_reduction_mod": 5 }, "enjoyed_effects":{ "special_damage_reduction_mod": 10 }, "disliked_effects":{ "condition_inflict": "Rage" }, },
	"sweet confection": {"description": "The user may trade in this Snack’s Digestion Buff to gain +4 Evasion until the end of their next turn. If the user prefers Sweet Food, they gain +4 Accuracy as well. If the user dislikes Sweet Food, they become Enraged.", "flavor":"sweet", "self_effects":{ "evasion_mod": 4 }, "enjoyed_effects":{ "evasion_mod": 4, "accuracy_mod": 4 }, "disliked_effects":{ "condition_inflict": "Rage" }, "duration":{ "rounds":1 } },

	"mental herb": {"description": "Cures all Volatile Status Effects.", "self_effects":{ "cure_condition": "BadSleep", "cure_condition": "Sleep", "cure_condition": "Flinch", "cure_condition": "Cursed", "cure_condition": "Confused", "cure_condition": "Disabled", "cure_condition": "Infatuation", "cure_condition": "Rage", "cure_condition": "Suppressed", } },
	"power herb": {"description": "Eliminates the Set-Up turn of Moves with the Set-Up Keyword.", "self_effects":{ "negate_setup":true } },
	"white herb": {"description": "Any negative Combat Stages are set to 0.", "self_effects":{ "reset_negative_combat_stages":true } },

	"cheri berry": {"description": "Cures Paralysis, Cool Poffin Ingredient.", "self_effects":{ "cure_condition": "Paralysis" } },
	"chesto berry": {"description": "Cures Sleep, Beauty Poffin Ingredient", "self_effects":{ "cure_condition": "Sleep" } },
	"pecha berry": {"description": "Cures Poison, Cute Poffin Ingredient", "self_effects":{ "cure_condition": "Poisoned" } },
	"rawst berry": {"description": "Cures Burn, Smart Poffin Ingredient", "self_effects":{ "cure_condition": "Burned" } },
	"aspear berry": {"description": "Cures Freeze, Tough Poffin Ingredient", "self_effects":{ "cure_condition": "Frozen" } },
	"oran berry": {"description": "Restores 5 Hit Points", "self_effects":{ "healing": 5 } },
	"persim berry": {"description": "Cures Confusion", "self_effects":{ "cure_condition": "Confused" } },
	"razz berry": {"description": "Cool Poffin Ingredient" },
	"bluk berry": {"description": "Beauty Poffin Ingredient" },
	"nanab berry": {"description": "Cute Poffin Ingredient" },
	"wepear berry": {"description": "Smart Poffin Ingredient" },
	"pinap berry": {"description": "Tough Poffin Ingredient" },
	"lum berry": {"description": "Cures any single status ailment", "self_effects":{ "cure_any_one_condition":true } },
	"sitrus berry": {"description": "Restores 15 Hit Points", "self_effects":{ "healing": 15 } },
	"figy berry": {"description": "Spicy Treat, Cool Poffin Ingredient.", "flavor":"spicy", "self_effects":{ "healing_fraction_divisor": 8 }, "enjoyed_effects":{ "healing_fraction_divisor": 6 }, "disliked_effects":{ "condition_inflict": "Confused" }, },
	"wiki berry": {"description": "Dry Treat, Beauty Poffin Ingredient.", "flavor":"dry", "self_effects":{ "healing_fraction_divisor": 8 }, "enjoyed_effects":{ "healing_fraction_divisor": 6 }, "disliked_effects":{ "condition_inflict": "Confused" }, },
	"mago berry": {"description": "Sweet Treat, Cute Poffin Ingredient.", "flavor":"sweet", "self_effects":{ "healing_fraction_divisor": 8 }, "enjoyed_effects":{ "healing_fraction_divisor": 6 }, "disliked_effects":{ "condition_inflict": "Confused" }, },
	"aguav berry": {"description": "Bitter Treat, Smart Poffin Ingredient.", "flavor":"bitter", "self_effects":{ "healing_fraction_divisor": 8 }, "enjoyed_effects":{ "healing_fraction_divisor": 6 }, "disliked_effects":{ "condition_inflict": "Confused" }, },
	"iapapa berry": {"description": "Sour Treat, Tough Poffin Ingredient.", "flavor":"sour", "self_effects":{ "healing_fraction_divisor": 8 }, "enjoyed_effects":{ "healing_fraction_divisor": 6 }, "disliked_effects":{ "condition_inflict": "Confused" }, },
	"liechi berry": {"description": "+1 Attack CS.", "self_effects":{ "stage_change":{"atk":1}, } },
	"ganlon berry": {"description": "+1 Defense CS.", "self_effects":{ "stage_change":{"def":1}, } },
	"salac berry": {"description": "+1 Speed CS.", "self_effects":{ "stage_change":{"spd":1}, } },
	"petaya berry": {"description": "+1 Special Attack CS.", "self_effects":{ "stage_change":{"spatk":1}, } },
	"apicot berry": {"description": "+1 Special Defense CS.", "self_effects":{ "stage_change":{"spdef":1}, } },
	"lansat berry": {"description": "Increases Critical Range by +1 for the remainder of the encounter.", "self_effects":{ "crit_mod":{"value": 1, "duration": {"scene":true} }, } },
	"starf berry": {"description": "+2 CS to a random Stat. May be used only at 25% HP or lower.", "self_effects":{ "stage_change":{"random":2}, } },
	"enigma berry": {"description": "User gains Temporary HP equal to 1/6th of their Max HP when hit by a Super Effective Move", "self_effects":{ "temp_pct_HP_divisor":6, } },
	"micle berry": {"description": "Increases Accuracy by +1", "self_effects":{ "accuracy_mod":{"value": 1, "duration": {"scene":true} }, } },
	"jaboca berry": {"description": "Foe dealing Physical Damage to the user loses 1/8 of their Maximum HP.", "physical_damager_effects":{ "damage_pct_divisor":8, } },
	"rowap berry": {"description": "Foe dealing Special Damage to the user loses 1/8 of their Maximum HP.", "special_damager_effects":{ "damage_pct_divisor":8, } },
	"cornn berry": {"description": "Cures Disabled Condition", "self_effects":{ "cure_condition": "Disabled" } },
	"magost berry": {"description": "Cures Disabled Condition", "self_effects":{ "cure_condition": "Rage" } },
	"rabuta berry": {"description": "Cures Disabled Condition", "self_effects":{ "cure_condition": "Suppressed" } },
	"nomel berry": {"description": "Cures Disabled Condition", "self_effects":{ "cure_condition": "Infatuated" } },
	"spelon berry": {"description": "Cool or Beauty Poffin Ingredient" },
	"pamtre berry": {"description": "Cute or Beauty Poffin Ingredient" },
	"watmel berry": {"description": "Cute or Smart Poffin Ingredient" },
	"durin berry": {"description": "Smart or Tough Poffin Ingredient" },
	"belue berry": {"description": "Cool or Tough Poffin Ingredient" },
	"leppa berry": {"description": "Restores a Scene Move.", "self_effects":{ "refresh_one_scene_move": true } },
	"pomeg berry": {"description": "HP Suppressant." },
	"kelpsy berry": {"description": "Attack Suppressant." },
	"qualot berry": {"description": "Defense Suppressant." },
	"hondew berry": {"description": "Special Attack Suppressant." },
	"grepa berry": {"description": "Special Defense Suppressant." },
	"tamato berry": {"description": "Speed Suppressant." },
	"occa berry": {"description": "Weakens foe’s super effective Fire-type move.", "self_effects":{ "resist_SE_move_of_type": "fire" } },
	"passho berry": {"description": "Weakens foe’s super effective Water-type move.", "self_effects":{ "resist_SE_move_of_type": "water" } },
	"wacan berry": {"description": "Weakens foe’s super effective Electric-type move.", "self_effects":{ "resist_SE_move_of_type": "electric" } },
	"rindo berry": {"description": "Weakens foe’s super effective Grass-type move.", "self_effects":{ "resist_SE_move_of_type": "grass" } },
	"yache berry": {"description": "Weakens foe’s super effective Ice-type move.", "self_effects":{ "resist_SE_move_of_type": "ice" } },
	"chople berry": {"description": "Weakens foe’s super effective Fighting-type move.", "self_effects":{ "resist_SE_move_of_type": "fighting" } },
	"kebia berry": {"description": "Weakens foe’s super effective Poison-type move.", "self_effects":{ "resist_SE_move_of_type": "poison" } },
	"shuca berry": {"description": "Weakens foe’s super effective Ground-type move.", "self_effects":{ "resist_SE_move_of_type": "ground" } },
	"coba berry": {"description": "Weakens foe’s super effective Flying-type move.", "self_effects":{ "resist_SE_move_of_type": "flying" } },
	"payapa berry": {"description": "Weakens foe’s super effective Psychic-type move.", "self_effects":{ "resist_SE_move_of_type": "psychic" } },
	"tanga berry": {"description": "Weakens foe’s super effective Bug-type move.", "self_effects":{ "resist_SE_move_of_type": "bug" } },
	"charti berry": {"description": "Weakens foe’s super effective Rock-type move.", "self_effects":{ "resist_SE_move_of_type": "rock" } },
	"kasib berry": {"description": "Weakens foe’s super effective Ghost-type move.", "self_effects":{ "resist_SE_move_of_type": "ghost" } },
	"haban berry": {"description": "Weakens foe’s super effective Dragon-type move.", "self_effects":{ "resist_SE_move_of_type": "dragon" } },
	"colbur berry": {"description": "Weakens foe’s super effective Dark-type move.", "self_effects":{ "resist_SE_move_of_type": "dark" } },
	"babiri berry": {"description": "Weakens foe’s super effective Steel-type move.", "self_effects":{ "resist_SE_move_of_type": "steel" } },
	"chilan berry": {"description": "Weakens foe’s super effective Normal-type move.", "self_effects":{ "resist_SE_move_of_type": "normal" } },
	"roseli berry": {"description": "Weakens foe’s super effective Fairy-type move.", "self_effects":{ "resist_SE_move_of_type": "fairy" } },
	"custap berry": {"description": "Grants the Priority keyword to any Move. May only be used at 25% HP or lower.", "self_effects":{ "grant_priority": true } },
	"kee berry": {"description": "+1 Defense CS. Activates as a Free Action when hit by a Physical Move.", "self_effects":{ "stage_change":{"def":1}, } },
	"maranga berry": {"description": "+1 Special Defense CS. Activates as a Free Action when hit by a Special Move.", "self_effects":{ "stage_change":{"spdef":1}, } },

};

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

const SkillRankNumberColors = {
	1: "#cfe2f3",
	2: "#9fc5e8",
	3: "#6fa8dc",
	4: "#3d85c6",
	5: "#0b5394",
	6: "#073763"
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
		let key_shift = game.keyboard.downKeys.has("ShiftLeft");
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
			let damageSoundFile = "Hit%20Normal%20Damage.mp3";
	
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
					extraDR += token.actor.data.data.TypeStrategistDR;
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
					flavor+="(resisted 1 step more) "
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
					var DR = def + extraDR + token.actor.data.data.modifiers.damageReduction.physical.total;
				}
				if(damage_category == "Special")
				{
					var DR = spdef + extraDR + token.actor.data.data.modifiers.damageReduction.special.total;
				}
				if(mode=="half")
				{
					flavor+="(1/2 damage) ";
					initial_damage_total=Number(initial_damage_total/2);
				}
				if(mode=="weak")
				{
					flavor+="(resisted 1 step less) ";
					let old_effectiveness=this_moves_effectiveness;
					if(old_effectiveness < 1)
					{
						this_moves_effectiveness=this_moves_effectiveness + .5;
					}
					else
					{
						this_moves_effectiveness=Number(this_moves_effectiveness + 0.5);
					}
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

				if(token.actor.data.flags.ptu)
				{
					if(token.actor.data.flags.ptu.is_frozen && (damage_type == "Fire" || damage_type == "Fighting" || damage_type == "Rock" || damage_type == "Steel") )
					{
						game.PTUMoveMaster.cureActorAffliction(token.actor, "Frozen");
					}
				
					if( token.actor.data.flags.ptu.is_sleeping || token.actor.data.flags.ptu.is_badly_sleeping )
					{
						game.PTUMoveMaster.cureActorAffliction(token.actor, "Sleep");
						game.PTUMoveMaster.cureActorAffliction(token.actor, "BadSleep");
					}
				}

				await elementalHitEffect(token.actor, event.currentTarget.dataset.move, damage_category, damage_type);
				await TokenMagic.addFilters(token, hit_params);
			}
			await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+damageSoundFile, volume: 0.8, autoplay: true, loop: false}, true);
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


	async function ChatWindow(actor, silent=false)
	{
		if(!silent)
		{
			await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+UIPopupSound, volume: 0.5, autoplay: true, loop: false}, false);
		}

		let target = Array.from(game.user.targets)[0];
		let targetTypingText = game.PTUMoveMaster.GetTargetTypingHeader(target, actor)
		let background_field_URL = await game.PTUMoveMaster.GetCurrentFieldImageURL();
		let background_field = 'background-image: url("'+background_field_URL+'"); background-repeat: repeat-x; background-position: left bottom';
		let item_icon_path = game.settings.get("PTUMoveMaster", "itemIconDirectory");

		let showEffectivenessMode = game.settings.get("PTUMoveMaster", "showEffectiveness");
		let UnavailablePokemonFolderName = game.settings.get("PTUMoveMaster", "UnavailablePokemonFolderName").toLowerCase();
		
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
		var technician = game.PTUMoveMaster.ActorHasItemWithName(actor, "Technician", "ability");
		var hasPokedex = false;
		if(actor.type == "character")
		{
			hasPokedex = game.PTUMoveMaster.ActorHasItemWithName(actor, "Pokedex", "item");
		}
		else
		{
			if(actor.data.data.owner!= "0")
			{
				hasPokedex = game.PTUMoveMaster.ActorHasItemWithName( (game.actors.get(actor.data.data.owner)), "Pokedex", "item");
			}
		}

		for(let item of actor.itemTypes.ability) // START Ability Check Loop
		{
			var item_data = item.data.data;
			if(item_data.name)
			{
				if(item_data.name.search("Type Strategist \\(") > -1)
				{
					typeStrategist.push(item_data.name.slice(item_data.name.search('\\(')+1, item_data.name.search('\\)') ));
				}
			}
			
		} // END Ability Check Loop

		// let dialogEditor;
		var buttons={};

		// let skillsMenu_mark = 	"<div style='background-image:url("+AlternateIconPath+"NewPokedex_Vertical_CenterScreen_200.png"+"); background-size: contain; background-repeat: no-repeat; background-position: left center; background-color: #333333; color:#cccccc; border-left:5px solid red; width:100%; height:25px;font-size:20px;	font-family: Modesto Condensed;	display: flex;	justify-content: center;align-items: center;'><p title=''>Skills</p></div>";
		
		let menu_image_backdrop_image_height = 104;
		let menu_image_backdrop_image_px_from_top = 20;
		if(actor.type != "character")
		{
			menu_image_backdrop_image_height = 83;
			menu_image_backdrop_image_px_from_top = 10;
		}

		let base_bag_dir = game.settings.get("PTUMoveMaster", "playerBagDirectory");
		let bag_directory = base_bag_dir+"default/";
		if(game.canvas.tokens.controlled[0])
		{
			let current_actor = game.canvas.tokens.controlled[0].actor;
			if (FilePicker.browse("data", base_bag_dir))
			{
				try
				{
					await FilePicker.browse("data", (base_bag_dir+current_actor.name.replace(/ /g,'')+"/") );
					bag_directory = (base_bag_dir+current_actor.name.replace(/ /g,'')+"/");
				}
				catch(err)
				{
					bag_directory = base_bag_dir+"default/";
				}
			}
		}

		let menu_image_backdrop_image = '<div style="position:absolute; top:0; left:5px; width: 105px; border:none; padding:none; margins:none;">\
											<img src="'+AlternateIconPath+'NewPokedex_Vertical_CenterScreen_200.png" style="position:absolute; top:0px; left:90px; height: '+menu_image_backdrop_image_height+'px; width: 104px; border:none; padding:none; margins:none;"/>\
											<img class="menu-button-hover-image" src="'+bag_directory+'closed.png" style="position:absolute; top:'+menu_image_backdrop_image_px_from_top+'px; left:108px; height: 66px; width: 66px; border:none; padding:none; margins:none;"/>\
										</div>';

		buttons["skillsMenu"] = {noRefresh: true, id:"skillsMenu", label: "<div class='skillsMenu' style='background-image:url("+AlternateIconPath+"NewPokedex_Vertical_CenterScreen_200.png"+"); height:20px; font-size:16px;font-family:Modesto Condensed;line-height:1.2'>"+"Skills"+menu_image_backdrop_image+"</div>",
			callback: async () => {
				await game.PTUMoveMaster.ShowSkillsMenu(actor);
				await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+UIPopupSound, volume: 0.8, autoplay: true, loop: false}, false);
			}};

		buttons["struggleMenu"] = {noRefresh: true, id:"struggleMenu", label: "<div class='struggleMenu' style='background-image:url("+AlternateIconPath+"NewPokedex_Vertical_CenterScreen_200.png"+"); height:20px; font-size:16px;font-family:Modesto Condensed;line-height:1.2'>"+"Struggle"+"</div>",
			callback: async () => {
				await game.PTUMoveMaster.ShowStruggleMenu(actor);
				await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+UIPopupSound, volume: 0.8, autoplay: true, loop: false}, false);
			}};

		buttons["maneuverMenu"] = {noRefresh: true, id:"maneuverMenu", label: "<div class='maneuverMenu' style='background-image:url("+AlternateIconPath+"NewPokedex_Vertical_CenterScreen_200.png"+"); height:20px; font-size:16px;font-family:Modesto Condensed;line-height:1.2'>"+"Maneuvers"+"</div>",
		callback: async () => {
			await game.PTUMoveMaster.ShowManeuverMenu(actor);
			await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+UIPopupSound, volume: 0.8, autoplay: true, loop: false}, false);
		}};

		if(actor.data.type == "character")
		{
			buttons["itemMenu"] = {noRefresh: true, id:"itemMenu", label: "<div class='itemMenu' style='background-image:url("+AlternateIconPath+"NewPokedex_Vertical_CenterScreen_200.png"+"); height:20px; font-size:16px;font-family:Modesto Condensed;line-height:1.2'>"+"Items"+"</div>",
			callback: () => {
				game.PTUMoveMaster.ShowInventoryMenu(actor);
			}};


			buttons["pokeballMenu"] = {noRefresh: true, id:"pokeballMenu", label: "<div class='pokeballMenu' style='background-image:url("+AlternateIconPath+"NewPokedex_Vertical_CenterScreen_200.png"+"); height:20px; font-size:16px;font-family:Modesto Condensed;line-height:1.2'>"+"Pokeballs"+"</div>",
			callback: async () => {
				await game.PTUMoveMaster.ShowPokeballMenu(actor);
			}};

			// if(hasPokedex)
			// {
			// 	buttons["pokedexScanBigButton"] = {id:"pokedexScanBigButton", label: "<center><div style='background-color:none;color:black;border-bottom:2px solid black;width:"+bigButtonWidth+";height:35px;font-size:16px;font-family:Modesto Condensed;color:grey;line-height:1.4'>"+"<img title='Pokedex Scan!' src='"+AlternateIconPath+"Gen_I_dex.png' style='height:33px; border:none'></div></center>",
			// 	callback: async () => {
			// 		let trainer_tokens = actor.getActiveTokens();
			// 		let actor_token = trainer_tokens[0];
			// 		await game.PTUMoveMaster.PokedexScan(actor_token, target);
			// 	}};
			// }
			// else
			// {
			// 	buttons["pokedexScanBigButton"] = {noRefresh:true, id:"pokedexScanBigButton", label: "<center><div style='background-color:none;color:black;border-bottom:2px solid black;width:"+bigButtonWidth+";height:35px;font-size:16px;font-family:Modesto Condensed;color:grey;line-height:1.4'>"+"<img title='No Pokedex to Use' src='"+AlternateIconPath+"Gen_I_dex_No.png' style='height:33px; border:none'></div></center>",
			// 	callback: async () => {
			// 		ui.notifications.warn("You have no Pokedex in your inventory!");
			// 		await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"warning.wav", volume: 0.5, autoplay: true, loop: false}, true);
			// }};
			// }
			
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
				buttons["trainerMenu"] = {noRefresh: true, id:"trainerMenu", label: "<div class='trainerMenu' style='background-image:url("+AlternateIconPath+"NewPokedex_Vertical_CenterScreen_200.png"+"); height:20px; font-size:16px;font-family:Modesto Condensed;line-height:1.2'>"+"Select Trainer"+"</div>",
				callback: async () => {
			
					trainer_token_on_field.control(true);
					//PerformStruggleAttack ("Normal", "Physical");
			
				}};
			}
			else
			{
				buttons["trainerMenu"] = {noRefresh: true, id:"trainerMenu", label: "<div class='trainerMenu' style='background-image:url("+AlternateIconPath+"NewPokedex_Vertical_CenterScreen_200.png"+"); filter: brightness(50%); height:20px; font-size:16px;font-family:Modesto Condensed;line-height:1.2'>"+"Select Trainer"+"</div>",
				callback: async () => {
			
					ui.notifications.warn("Trainer is not on the field.")
					await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"warning.wav", volume: 0.5, autoplay: true, loop: false}, false);
				}};
			}
		}
		else
		{
			buttons["trainerMenu"] = {noRefresh: true, id:"trainerMenu", label: "<div class='trainerMenu' style='background-image:url("+AlternateIconPath+"NewPokedex_Vertical_CenterScreen_200.png"+"); filter: brightness(50%); height:20px; font-size:16px;font-family:Modesto Condensed;line-height:1.2'>"+"No Trainer"+"</div>",
				callback: async () => {
			
					ui.notifications.warn("This pokemon has no trainer to select.")
					await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"warning.wav", volume: 0.5, autoplay: true, loop: false}, false);
				}};
		}


		if(actor.data.type == "character")
		{
			let orders_list = [
				"Agility Training",
				"Brutal Training",
				"Focused Training",
				"Inspired Training",
				"Critical Moment",
			];

			buttons["ordersDivider"] = {noRefresh: true, id:"ordersDivider", label: "<img src='"+AlternateIconPath+"DividerIcon_Orders.png' style='border:none; width:200px; margin-bottom:3px;'>",
			callback: () => {

			}};

			let is_auto_active = false;
			let pokemon_order_state = "off";
			let ownerId = actor.id;
			let active_pokemon_list = [];
			let order_flag_string = "";

			// console.log("DEBUG ++++++++++++++++ ownerId");
			// console.log(ownerId);

			for(let token of game.scenes.current.tokens)
			{
				if(token._actor.data.data.owner == ownerId)
				{
					active_pokemon_list[token._actor.id] = token._actor;
					// console.log("DEBUG ++++++++++++++++ ACTIVE POKEMON LIST "+token._actor.name+" token._actor.id = " + token._actor.id);
				}
			}

			for(let order of orders_list)
			{
				pokemon_order_state = "off";

				order_flag_string = "owned_pokemon.data.data.training."+(order.slice(0, order.search(" ")).toLocaleLowerCase()+".ordered");
				if(order == "Critical Moment")
				{
					order_flag_string = "owned_pokemon.data.data.training.critical";
				}
				// console.log("DEBUG ++++++++++++++++ order_flag_string");
				// console.log(order_flag_string);

				for(let owned_pokemon_id in active_pokemon_list)
				{
					let owned_pokemon = game.actors.get(owned_pokemon_id);
					if(owned_pokemon)
					{
						// console.log("DEBUG ++++++++++++++++ owned_pokemon from list");
						// console.log(owned_pokemon);
						// console.log("eval(order_flag_string)");
						// console.log(eval(order_flag_string));
						if(eval(order_flag_string))
						{
							// console.log("DEBUG ++++++++++++++++ eval(order_flag_string) == true");
							pokemon_order_state = "on";
						}
					}
				}
				
				

				let order_string = order.replace(" ", "_");
				if(game.PTUMoveMaster.ActorHasItemWithName(actor, order, "feat"))
				{
					let mark = eval("Orders_"+order_string+"_Mark_"+pokemon_order_state);
					let button_string = ("OrderButton_"+order_string);

					if(pokemon_order_state == "off")
					{
						buttons[button_string] = 
						{
							id:button_string, 
							label: mark,
							callback: async () => 
							{
								await game.PTUMoveMaster.ApplyTrainingToActorsActivePokemon(actor, order, "off", active_pokemon_list);
								await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+UIButtonClickSound, volume: 0.5, autoplay: true, loop: false}, true);
								await game.PTUMoveMaster.TakeAction(actor, "Standard")
							}
						};
					}
					else
					{
						buttons[button_string] = 
						{
							id:button_string, 
							label: mark,
							callback: async () => 
							{
								await game.PTUMoveMaster.ApplyTrainingToActorsActivePokemon(actor, order, "on", active_pokemon_list);
								await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+UIButtonClickSound, volume: 0.5, autoplay: true, loop: false}, true);
								await game.PTUMoveMaster.TakeAction(actor, "Standard")
							}
						};
					}
					

					is_auto_active = await game.PTUMoveMaster.ActorGetAutoOrderState(actor, order);

					if(is_auto_active)
					{
						let on_button_string = (order_string+"AutoOrderToggle_on");
						buttons[on_button_string] = 
						{
							id:on_button_string, 
							label: OrdersToggleAuto_on_Mark,
							callback: async () => 
							{
								// await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+UIButtonClickSound, volume: 0.5, autoplay: true, loop: false}, true);
								await game.PTUMoveMaster.ActorSetAutoOrders(actor, order, false);
							}
						};
					}
					else
					{
						let off_button_string = (order_string+"AutoOrderToggle_off");
						buttons[off_button_string] = 
						{
							id:off_button_string,
							label: OrdersToggleAuto_off_Mark,
							callback: async () => 
							{
								// await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+UIButtonClickSound, volume: 0.5, autoplay: true, loop: false}, true);
								await game.PTUMoveMaster.ActorSetAutoOrders(actor, order, true);
							}
						};
					}
				}
			}


			buttons["activePokemonDivider"] = {noRefresh: true, id:"activePokemonDivider", label: "<img src='"+AlternateIconPath+"DividerIcon_ActivePokemon.png' style='border:none; width:200px;'>",
			callback: () => {

			}};

			for(let owned_pokemon_id in active_pokemon_list)
			{
				let owned_pokemon = game.actors.get(owned_pokemon_id);
				if(owned_pokemon)
				{
					let owned_pokemon_image = "<img src='"+owned_pokemon.img+"' style='border:none; max-height: 50px; max-width: 50px;'>";
					let owned_pokemon_health_color = await GetActorHealthColor(owned_pokemon);

					buttons[("active_pokemon_"+owned_pokemon_id)] = 
					{
						noRefresh: true, 
						id:("active_pokemon_"+owned_pokemon_id), 
						label: "<div title='Click to select your active pokemon's token.'	style=' text-align: left;	background-color: #333333;	border-left:5px solid "+owned_pokemon_health_color+"; 	width:100%; color:#cccccc;	height:50px; font-size:25px;	font-family: Modesto Condensed;	display: flex;	justify-content: left;	align-items: center;'>"+owned_pokemon_image+owned_pokemon.name+"</div>",
						callback: () => 
						{
							let owned_pokemon_token = owned_pokemon.getActiveTokens().slice(-1)[0];
							owned_pokemon_token.control(true);
						}
					};
				}
			}


			buttons["recalledPokemonDivider"] = {noRefresh: true, id:"recalledPokemonDivider", label: "<img src='"+AlternateIconPath+"DividerIcon_PokeballBelt.png' style='border:none; width:200px; margin-bottom:3px;'>",
			callback: () => {

			}};

			for(let recalled_pokemon of game.actors)
			{
				let ownerId = recalled_pokemon.data.data.owner;
				let trainerId = actor.id;
				let pokemon_is_active = false;
				let owned_pokemon_health_color = await GetActorHealthColor(recalled_pokemon);
				let pokemon_is_in_bench_folder = false;
				let folder_name = "";

				if(recalled_pokemon.folder) 
				{
					folder_name = recalled_pokemon.folder.data.name;
					if(folder_name.toLowerCase().includes(UnavailablePokemonFolderName))
					{
						pokemon_is_in_bench_folder = true;
					}
				}

				if( (ownerId == trainerId) && (recalled_pokemon.type == "pokemon") && (!pokemon_is_in_bench_folder) )
				{
					for(const active_pokemon in active_pokemon_list)
					{
						if(active_pokemon == recalled_pokemon.id)
						{
							pokemon_is_active = true;
							break;
						}
					}
					// '<li class="directory-item entity actor flexrow" data-entity-id="322vMosc6AXORbin" draggable="true" style="display: flex;">';
					let draggableAttrs = {
						draggable: "true",
						"data-entity": recalled_pokemon.documentType,
						"data-id": recalled_pokemon.id,
					};
					// let draggable_attr_string = `data-entity="${recalled_pokemon.documentType}" data-entity-id="${recalled_pokemon.id}" draggable="true"`;
					let draggable_attr_string = `data-entity-id="${recalled_pokemon.id}" draggable="true"`;
				
					
					let pokeball_type = recalled_pokemon.data.data.pokeball;
					if(pokeball_type == "")
					{
						pokeball_type = "Basic Ball";
					}

					let recalled_pokemon_pokeball_image = '<div style="position:absolute; top:0; left:5px; border:none; max-width: 50px; max-height: 50px; padding:none; margins:none;">\
																<img src="'+item_icon_path+pokeball_type+'.png" style="position:absolute; top:0; left:0; border:none; max-width: 50px; max-height: 50px; padding:none; margins:none;"/>\
																<img class="directory-item belt-pokeball entity actor" '+draggable_attr_string+'"  src="'+recalled_pokemon.data.img+'" style="position:absolute; top:0; left:0; border:none; max-width: 50px; max-height: 50px; padding:none; margins:none; filter:drop-shadow(1px 1px 2px black);"/>\
															</div>';

					if(pokemon_is_active)
					{
						recalled_pokemon_pokeball_image = '<div class="belt-pokeball entity actor" '+draggable_attr_string+'" style="position:absolute; top:0; left:5px; border:none; max-width: 50px; max-height: 50px; padding:none; margins:none;">\
																<img src="'+item_icon_path+pokeball_type+'.png" style="position:absolute; top:0; left:0; border:none; max-width: 50px; max-height: 50px; padding:none; margins:none; filter: blur(5px);"/>\
																<img class="directory-item belt-pokeball entity actor" '+draggable_attr_string+'"  src="'+recalled_pokemon.data.img+'" style="position:absolute; top:0; left:0; border:none; max-width: 50px; max-height: 50px; padding:none; margins:none; filter: brightness(0%);"/>\
															</div>';
					}

					
					buttons[("recalled_pokemon_PokeballButton"+recalled_pokemon.id)] = 
					{
						noRefresh: true, 
						id:("recalled_pokemon_PokeballButton"+recalled_pokemon.id), 
						label: "<div title='"+recalled_pokemon.name+"'	style='	background-color: #333333;	color:#cccccc;	border-left:5px solid "+owned_pokemon_health_color+"; 	width:100%; color: #666;	height:50px;font-size:16px;	font-family: Modesto Condensed;	display: flex;	justify-content: center;	align-items: center;'>"+recalled_pokemon_pokeball_image+"</div>",
						callback: () => 
						{
							// let owned_pokemon_token = recalled_pokemon.getActiveTokens().slice(-1)[0];
							// owned_pokemon_token.control(true);
							recalled_pokemon.sheet.render(true);
						}
					};
				}
			}

		}



		buttons["heldItemDivider"] = {noRefresh: true, id:"heldItemDivider", label: "<img src='"+AlternateIconPath+"DividerIcon_HeldItem.png' style='border:none; width:200px;'>",
		callback: () => {

		}};

		if((actor.data.data.heldItem) && (actor.data.data.heldItem.toLowerCase() != "none") && (actor.data.data.heldItem.toLowerCase() != "") )
		{
			let heldItem = actor.data.data.heldItem.toLowerCase();

			let heldItem_color = "darkgray";
			let heldItem_description = "";

			let item_to_describe = game.ptu.items.find(i => i.name.toLowerCase().includes(heldItem.toLowerCase()));
      		if(item_to_describe) 
			{
				heldItem_description = item_to_describe.data.data.effect;
			}

			let heldItem_item_icon = await game.PTUMoveMaster.GetItemArt(heldItem);

			let heldItem_mark = 	"<div style='background-image: url(\""+heldItem_item_icon+"\"); background-size: contain; background-repeat: no-repeat; background-position: left center; background-color: #333333; color:#cccccc; border-left:5px solid "+heldItem_color+"; width:100%; height:25px;font-size:20px;	font-family: Modesto Condensed;	display: flex;	justify-content: center;align-items: center;'><p title='"+heldItem_description+"'>"+heldItem+"</p></div>";

			console.log("DEBUG: heldItem");
			console.log(heldItem);

			buttons["heldItem"] = 
			{
				id:"heldItem", 
				label: heldItem_mark,
				callback: async () => 
				{
					// await game.PTUMoveMaster.ApplyTrainingToActorsActivePokemon(actor, order, "off", active_pokemon_list);
					await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+UIButtonClickSound, volume: 0.5, autoplay: true, loop: false}, true);
				}
			};
		}
		else
		{
			const HeldItem_none_Mark = 	"<div style='background-color: #333333; color:#666666; border-left:5px solid black;	width:100%;	height:25px;font-size:20px;	font-family: Modesto Condensed;	display: flex;	justify-content: center;align-items: center;'><p  title='No Held Item'>No Held Item</p></div>";

			buttons["heldItem"] = 
			{
				noRefresh: true,
				id:"heldItem", 
				label: HeldItem_none_Mark,
				callback: async () => 
				{
					// await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+UIButtonClickSound, volume: 0.5, autoplay: true, loop: false}, true);
				}
			};
		}


		buttons["digestionBuffDivider"] = {noRefresh: true, id:"digestionBuffDivider", label: "<img src='"+AlternateIconPath+"DividerIcon_DigestionBuff.png' style='border:none; width:200px;'>",
		callback: () => {

		}};

		if(actor.data.data.digestionBuff)
		{
			let digestionBuff = actor.data.data.digestionBuff.toLowerCase();
			let digestionBuffState = false;
			let digestionBuffState_description = digestionsBuffs[digestionBuff]["description"];
			let digestionBuffState_color = "darkgray";

			if(actor.data.flags)
			{
				if(actor.data.flags.ptu)
				{
					if(actor.data.flags.ptu.digestionBuffActive)
					{
						digestionBuffState = true;
						digestionBuffState_color = "green";
					}
				}
			}

			let disgestion_item_icon = await game.PTUMoveMaster.GetItemArt(digestionBuff);

			let digestion_mark = 	"<div  style='background-image: url(\""+disgestion_item_icon+"\"); background-size: contain; background-repeat: no-repeat; background-position: left center; background-color: #333333; color:#cccccc; border-left:5px solid "+digestionBuffState_color+"; width:100%; height:25px;font-size:20px; font-family: Modesto Condensed;	display: flex;	justify-content: center;align-items: center;'><p title='"+digestionBuffState_description+"'>"+digestionBuff+"</p></div>";

			buttons["digestionBuff"] = 
			{
				id:"digestionBuff", 
				label: digestion_mark,
				callback: async () => 
				{
					await game.PTUMoveMaster.ActivateDigestionBuff(actor, digestionBuff, digestionBuffState);
					await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+UIButtonClickSound, volume: 0.5, autoplay: true, loop: false}, true);
				}
			};
		}
		else
		{
			const DigestionBuff_none_Mark = 	"<div style='background-color: #333333; color:#666666; border-left:5px solid black;	width:100%;	height:25px;font-size:20px;	font-family: Modesto Condensed;	display: flex;	justify-content: center;align-items: center;'><p title='No Digestion Buff'>No Digestion Buff</p></div>";

			buttons["digestionBuff"] = 
			{
				noRefresh: true,
				id:"digestionBuff", 
				label: DigestionBuff_none_Mark,
				callback: async () => 
				{
					// await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+UIButtonClickSound, volume: 0.5, autoplay: true, loop: false}, true);
				}
			};
		}



		buttons["abilityDivider"] = {noRefresh: true, id:"abilityDivider", label: "<img src='"+AlternateIconPath+"DividerIcon_Abilities.png' style='border:none; width:200px;'>",
		callback: () => {

		}};


		//for(let item of items) // START ABILITY BUTTON LOOP
		for(let item of actor.itemTypes.ability)
		{
			let item_data = item.data.data;
			let currentid = item.id;

			let AbilityActionBackground = "";
			let currentlabel = item.data.name;
			
			if(item_data.frequency.includes("Swift Action"))
			{
				AbilityActionBackground = SwiftActionBackground;
			}
			else if(item_data.frequency.includes("Standard Action"))
			{
				AbilityActionBackground = StandardActionBackground;
			}
			else if(item_data.frequency.includes("Shift Action"))
			{
				AbilityActionBackground = ShiftActionBackground;
			}
			else if(item_data.frequency.includes("Full Action"))
			{
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
			buttons[currentid]={id:currentid, label: "<center><div title='"+(item_data.frequency+"\n"+item_data.effect).replace("'","&#39;")+"' style='background-image: url("+AbilityActionBackground+");background-color: #333333; color:#cccccc; border-left:5px solid darkgray; width:200px; height:25px;font-size:20px;font-family:Modesto Condensed;display: flex;justify-content: center;align-items: center;'>"+AbilityIcon+currentlabel+"</div></center>",
				callback: async () => {
					
					await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+UIButtonClickSound, volume: 0.5, autoplay: true, loop: false}, true);


					
					sendMoveMessage({
						move: item_data,
						moveName: item.name,
						templateType: MoveMessageTypes.DETAILS,
						category: "details", 
						hasAC: (!isNaN(item_data.ac)),
						isAbility: true
					});
					if(item_data.frequency !=null)
					{
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
			var currentlabel=item.name;
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

			let actor_has_target_dex_entry = false;

			if(target)
			{
				if(target.actor.data.data.species)
				{
					actor_has_target_dex_entry = game.PTUMoveMaster.ThisActorOrTheirTrainerHasDexEntry(actor, target.actor.data.data.species);
					if(game.user.isGM)
					{
						actor_has_target_dex_entry = true;
					}
				}
			}

			if(currenttype=="move" && (currentCategory == "Status"))
			{
				if( (game.settings.get("PTUMoveMaster", "showEffectiveness") != "never") && (target) && (!isNaN(item_data.damageBase)) && (item_data.damageBase != "") && effectiveness)
				{
					// if((target.data.disposition > DISPOSITION_HOSTILE) || (game.settings.get("PTUMoveMaster", "showEffectiveness") == "always") )
					if(
						(
							(target.data.disposition > DISPOSITION_HOSTILE)
							&& (showEffectivenessMode == "neutralOrBetter")
						) 
						|| 
						(
							actor_has_target_dex_entry
							&& (showEffectivenessMode == "dex")
						)
						||
						(showEffectivenessMode == "always")
						||
						(game.user.isGM)
					)
					{
						currentEffectivenessLabel = " (x"+effectiveness[item_data.type]+")";
						effectivenessBackgroundColor = EffectivenessColors[effectiveness[item_data.type]];
						// if (effectiveness[item_data.type] == 0.5)
						// {
						// 	effectivenessBackgroundColor = "#cc6666";
						// }
						// else if (effectiveness[item_data.type] == 1)
						// {
						// 	effectivenessBackgroundColor = "white";
						// 	effectivenessTextColor = "black";
						// }
						// else if (effectiveness[item_data.type] == 0.25)
						// {
						// 	effectivenessBackgroundColor = "red";
						// 	effectivenessTextColor = "white";
						// }
						// else if (effectiveness[item_data.type] == 0)
						// {
						// 	effectivenessBackgroundColor = "black";
						// 	effectivenessTextColor = "white";
						// }
						// else if (effectiveness[item_data.type] < 0.25)
						// {
						// 	effectivenessBackgroundColor = "darkred";
						// 	effectivenessTextColor = "white";
						// }
						// else if (effectiveness[item_data.type] == 1.25)
						// {
						// 	effectivenessBackgroundColor = "#89b3b5";
						// 	effectivenessTextColor = "white";
						// }
						// else if (effectiveness[item_data.type] == 1.5)
						// {
						// 	effectivenessBackgroundColor = "#6699cc";//"#3399ff";
						// 	effectivenessTextColor = "black";
						// }
						// else if (effectiveness[item_data.type] > 1.5)
						// {
						// 	effectivenessBackgroundColor = "blue";
						// 	effectivenessTextColor = "white";
						// }
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
				let effect_range_bonus = 0;
				if(actor.data.data.modifiers.effectRange.total)
				{
					effect_range_bonus = actor.data.data.modifiers.effectRange.total;
				}


				// buttons[currentid]={label: "<center><div style='background-color:"+ effectivenessBackgroundColor +";color:"+ effectivenessTextColor +";border:2px solid black;width:130px;height:130px;font-size:10px;'>"+currentCooldownLabel+""+"<h3>"+currentlabel+currentMoveTypeLabel+"</h3>"+"<h5>"+currentMoveRangeIcon+"</h5>"+currentEffectivenessLabel+"</div></center>",
				buttons[currentid]={
					id:currentid,
					style:"padding-left: 0px;border-right-width: 0px;border-bottom-width: 0px;border-left-width: 0px;border-top-width: 0px;margin-right: 0px;",
					label: "<center><div style='background-color:"+ MoveButtonBackgroundColor +";color:"+ MoveButtonTextColor +";border-left:"+EffectivenessBorderThickness+"px solid; border-color:"+effectivenessBackgroundColor+"; padding-left: 0px ;width:200px;height:"+ButtonHeight+"px;font-size:24px;font-family:Modesto Condensed;line-height:0.6'><h3 style='padding: 0px;font-family:Modesto Condensed;font-size:24px; color: white; background-color: #272727 ; overflow-wrap: normal ! important; word-break: keep-all ! important;'><div style='padding-top:5px' title='"+(item_data.effect).replace("'","&#39;")+"'>"+currentlabel+"</div>"+currentCooldownLabel+currentMoveTypeLabel+"</h3>"+"<h6 style='padding-top: 4px;padding-bottom: 0px;font-size:"+RangeFontSize+"px;'>"+currentMoveRangeIcon+effectivenessText+"</h6>"+"</div></center>",
					callback: async () => {

						let command_check_result = await ThisPokemonsTrainerCommandCheck(actor);
						if(!command_check_result)
						{
							game.PTUMoveMaster.chatMessage(actor, "But they did not obey!")
							return;
						}
						let key_shift = game.keyboard.downKeys.has("ShiftLeft");

						await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+UIButtonClickSound, volume: 0.5, autoplay: true, loop: false}, true);

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
									let oneThirdMaxHealth = Number(actor.data.data.health.total / 3);
									let currentDR = (actor.data.data.health.value < oneThirdMaxHealth ? 10 : 5);

									await actor.update({ "data.TypeStrategistLastRoundUsed": currentRound, "data.TypeStrategistLastEncounterUsed": currentEncounterID, "data.TypeStrategistLastTypeUsed": item_data.type, "data.TypeStrategistDR": currentDR});
								}
							}
						}

						let move_found_in_custom = false;

						console.log("DEBUG: custom_moves: ");
						console.log(custom_moves);
						for(let searched_move in custom_moves)
						{
							if(item.name.includes(searched_move))
							{
								if(custom_moves[searched_move]["roll-trigger"] != null) // Effect Range Check
								{
									let effectThreshold = custom_moves[searched_move]["roll-trigger"];

									if(diceRoll >= (effectThreshold - effect_range_bonus)) // Effect Range Hit
									{
										for (let searched_stat of stats)
										{
											if (custom_moves[searched_move][searched_stat] != null)
											{
												setTimeout( async () => { 
													await adjustActorStage(actor,searched_stat, custom_moves[searched_move][searched_stat]);
												}, 1000);
											}
										}
										if(custom_moves[searched_move]["pct-healing"] != null)
										{
											await healActorPercent(actor,custom_moves[searched_move]["pct-healing"]);
										}
										if(custom_moves[searched_move]["pct-self-damage"] != null)
										{
											await damageActorPercent(actor,custom_moves[searched_move]["pct-self-damage"]);
										}
										if(custom_moves[searched_move]["weather"] != null)
										{
											await game.PTUMoveMaster.SetCurrentWeather(custom_moves[searched_move]["weather"]);
										}
										if(custom_moves[searched_move]["accuracy"] != null)
										{
											await adjustActorAccuracy(actor,custom_moves[searched_move]["accuracy"]);
										}
									}
								}
								else // No Effect Range
								{
									for (let searched_stat of stats)
									{
										if (custom_moves[searched_move][searched_stat] != null)
										{
											setTimeout( async () => { 
												await adjustActorStage(actor,searched_stat, custom_moves[searched_move][searched_stat]);
											}, 1000);
										}
									}
									if(custom_moves[searched_move]["pct-healing"] != null)
									{
										await healActorPercent(actor,custom_moves[searched_move]["pct-healing"]);
									}
									if(custom_moves[searched_move]["pct-self-damage"] != null)
									{
										await damageActorPercent(actor,custom_moves[searched_move]["pct-self-damage"]);
									}
									if(custom_moves[searched_move]["weather"] != null)
									{
										await game.PTUMoveMaster.SetCurrentWeather(custom_moves[searched_move]["weather"]);
									}
									if(custom_moves[searched_move]["accuracy"] != null)
									{
										await adjustActorAccuracy(actor,custom_moves[searched_move]["accuracy"]);
									}
								}
								move_found_in_custom = true;
								break;
							}
						}
						if(!move_found_in_custom)
						{
							for(let searched_move in move_stage_changes)
							{
								if(item.name.includes(searched_move))
								{
									if(move_stage_changes[searched_move]["roll-trigger"] != null) // Effect Range Check
									{
										let effectThreshold = move_stage_changes[searched_move]["roll-trigger"];
	
										if(diceRoll >= (effectThreshold - effect_range_bonus)) // Effect Range Hit
										{
											for (let searched_stat of stats)
											{
												if (move_stage_changes[searched_move][searched_stat] != null)
												{
													setTimeout( async () => { 
														await adjustActorStage(actor,searched_stat, move_stage_changes[searched_move][searched_stat]);
													}, 1000);
												}
											}
											if(move_stage_changes[searched_move]["pct-healing"] != null)
											{
												await healActorPercent(actor,move_stage_changes[searched_move]["pct-healing"]);
											}
											if(move_stage_changes[searched_move]["pct-self-damage"] != null)
											{
												await damageActorPercent(actor,move_stage_changes[searched_move]["pct-self-damage"]);
											}
											if(move_stage_changes[searched_move]["weather"] != null)
											{
												await game.PTUMoveMaster.SetCurrentWeather(move_stage_changes[searched_move]["weather"]);
											}
											if(move_stage_changes[searched_move]["accuracy"] != null)
											{
												await adjustActorAccuracy(actor,move_stage_changes[searched_move]["accuracy"]);
											}
										}
									}
									else // No Effect Range
									{
										for (let searched_stat of stats)
										{
											if (move_stage_changes[searched_move][searched_stat] != null)
											{
												setTimeout( async () => { 
													await adjustActorStage(actor,searched_stat, move_stage_changes[searched_move][searched_stat]);
												}, 1000);
											}
										}
										if(move_stage_changes[searched_move]["pct-healing"] != null)
										{
											await healActorPercent(actor,move_stage_changes[searched_move]["pct-healing"]);
										}
										if(move_stage_changes[searched_move]["pct-self-damage"] != null)
										{
											await damageActorPercent(actor,move_stage_changes[searched_move]["pct-self-damage"]);
										}
										if(move_stage_changes[searched_move]["weather"] != null)
										{
											await game.PTUMoveMaster.SetCurrentWeather(move_stage_changes[searched_move]["weather"]);
										}
										if(move_stage_changes[searched_move]["accuracy"] != null)
										{
											await adjustActorAccuracy(actor,move_stage_changes[searched_move]["accuracy"]);
										}
									}
									break;
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

			let actor_has_target_dex_entry = false;

			if(target)
			{
				if(target.actor.data.data.species)
				{
					actor_has_target_dex_entry = game.PTUMoveMaster.ThisActorOrTheirTrainerHasDexEntry(actor, target.actor.data.data.species);
					if(game.user.isGM)
					{
						actor_has_target_dex_entry = true;
					}
				}
			}

			if(currenttype=="move" && (currentCategory == "Physical" || currentCategory == "Special"))
			{
				if( (game.settings.get("PTUMoveMaster", "showEffectiveness") != "never") && (target) && (!isNaN(item_data.damageBase)) && (item_data.damageBase != "") && effectiveness)
				{
					// if((target.data.disposition > DISPOSITION_HOSTILE) || (game.settings.get("PTUMoveMaster", "showEffectiveness") == "always") )
					if(
						(
							(target.data.disposition > DISPOSITION_HOSTILE)
							&& (showEffectivenessMode == "neutralOrBetter")
						) 
						|| 
						(
							actor_has_target_dex_entry
							&& (showEffectivenessMode == "dex")
						)
						||
						(showEffectivenessMode == "always")
						||
						(game.user.isGM)
					)
					{
						currentEffectivenessLabel = " (x"+effectiveness[item_data.type]+")";
						effectivenessBackgroundColor = EffectivenessColors[effectiveness[item_data.type]];
						// if (effectiveness[item_data.type] == 0.5)
						// {
						// 	effectivenessBackgroundColor = "#cc6666";
						// }
						// else if (effectiveness[item_data.type] == 1)
						// {
						// 	effectivenessBackgroundColor = "white";
						// 	effectivenessTextColor = "black";
						// }
						// else if (effectiveness[item_data.type] == 0.25)
						// {
						// 	effectivenessBackgroundColor = "red";
						// 	effectivenessTextColor = "white";
						// }
						// else if (effectiveness[item_data.type] == 0)
						// {
						// 	effectivenessBackgroundColor = "black";
						// 	effectivenessTextColor = "white";
						// }
						// else if (effectiveness[item_data.type] < 0.25)
						// {
						// 	effectivenessBackgroundColor = "darkred";
						// 	effectivenessTextColor = "white";
						// }
						// else if (effectiveness[item_data.type] == 1.25)
						// {
						// 	effectivenessBackgroundColor = "#89b3b5";
						// 	effectivenessTextColor = "white";
						// }
						// else if (effectiveness[item_data.type] == 1.5)
						// {
						// 	effectivenessBackgroundColor = "#6699cc";//"#3399ff";
						// 	effectivenessTextColor = "black";
						// }
						// else if (effectiveness[item_data.type] > 1.5)
						// {
						// 	effectivenessBackgroundColor = "blue";
						// 	effectivenessTextColor = "white";
						// }
						if(game.settings.get("PTUMoveMaster", "showEffectivenessText") == "true")
						{
							if(effectiveness[item_data.type])
							{
								effectivenessText = "<span style='font-size:30px'> / x "+(effectiveness[item_data.type].toString())+"</span>";
							}
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
					currentMoveFiveStrike = true;
				}

				if( (currentMoveRange.search("Doublestrike") > -1) || (currentMoveRange.search("Double Strike") > -1) )
				{
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

				if(actor.data.data.typing)
				{
					if(item_data.type == actor.data.data.typing[0] || item_data.type == actor.data.data.typing[1])
					{
						STABBorderImage = '<div class="col" style="padding: 0px ! important;"><span class="type-img"><img src="/modules/PTUMoveMaster/images/icons/STAB_Border.png" style="width: 248px; height: 1px; padding: 0px ! important;"></img></span></div>';
					}
				}

				buttons[currentid]={
					id:currentid, 
					label: "<center><div style='background-color:"+ MoveButtonBackgroundColor +";color:"+ MoveButtonTextColor +";border-left:"+EffectivenessBorderThickness+"px solid; border-color:"+effectivenessBackgroundColor+"; padding-left: 0px ;width:200px;height:"+Number(ButtonHeight+3)+"px;font-size:24px;font-family:Modesto Condensed;line-height:0.6'><h3 style='padding: 0px;font-family:Modesto Condensed;font-size:24px; color: white; background-color: #272727 ; overflow-wrap: normal ! important; word-break: keep-all ! important;'><div style='padding-top:5px' title='"+(item_data.effect).replace("'","&#39;")+"'>"+currentlabel+"</div>"+currentCooldownLabel+currentMoveTypeLabel+"</h3>"+STABBorderImage+DBBorderImage+"<h6 style='padding-top: 4px;padding-bottom: 0px;font-size:"+RangeFontSize+"px;'>"+currentMoveRangeIcon+effectivenessText+"</h6>"+"</div></center>",
					callback: async () => {

							let command_check_result = await ThisPokemonsTrainerCommandCheck(actor);
							if(!command_check_result)
							{
								game.PTUMoveMaster.chatMessage(actor, "But they did not obey!")
								return;
							}
							let key_shift = game.keyboard.downKeys.has("ShiftLeft");
							if (key_shift) 
							{
								rollDamageMoveWithBonus(actor , item, finalDB, typeStrategist);
							}
							else
							{
								await game.PTUMoveMaster.RollDamageMove(actor, item, item.name, finalDB, typeStrategist, 0);
							}
						}

					}

			}

			i++;
		} // END DAMAGE MOVE LOOP


		buttons["resetEOT"] = {id:"resetEOT", label: ResetEOTMark,
			callback: async () => {
				await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+UIButtonClickSound, volume: 0.5, autoplay: true, loop: false}, true);
				game.PTUMoveMaster.resetEOTMoves(actor);
		}};

		buttons["resetScene"] = {id:"resetScene", label: ResetSceneMark,
			callback: async () => {
				await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+UIButtonClickSound, volume: 0.5, autoplay: true, loop: false}, true);
				game.PTUMoveMaster.resetSceneMoves(actor);
		}};

		buttons["resetDaily"] = {id:"resetDaily", label: ResetDailyMark,
		callback: async () => {
				await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+UIButtonClickSound, volume: 0.5, autoplay: true, loop: false}, true);
				game.PTUMoveMaster.resetDailyMoves(actor);
		}};

		buttons["resetStandard"] = {id:"resetStandard", label: ResetStandardMark,
		callback: async () => {
				await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+UIButtonClickSound, volume: 0.5, autoplay: true, loop: false}, true);
				game.PTUMoveMaster.resetStandardAction(actor);
		}};

		buttons["resetShift"] = {id:"resetShift", label: ResetShiftMark,
		callback: async () => {
				await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+UIButtonClickSound, volume: 0.5, autoplay: true, loop: false}, true);
				game.PTUMoveMaster.resetShiftAction(actor);
		}};

		buttons["resetSwift"] = {id:"resetSwift", label: ResetSwiftMark,
		callback: async () => {
				await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+UIButtonClickSound, volume: 0.5, autoplay: true, loop: false}, true);
				game.PTUMoveMaster.resetSwiftAction(actor);
		}};


		buttons["refreshersDivider"] = {noRefresh: true, id:"refreshersDivider", label: "<img src='"+AlternateIconPath+"Divider.png' style='border:none; width:200px;'>",
		callback: () => {

		}};

		buttons["tickDamage_reset"] = {id:"tickDamage_reset", label: TickDamageMark,
			callback: async () => {

				await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+UIButtonClickSound, volume: 0.5, autoplay: true, loop: false}, true);
				game.PTUMoveMaster.damageActorTick(actor);
		}};

		buttons["tickHeal_reset"] = {id:"tickHeal_reset", label: TickHealMark,
		callback: async () => {

			await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+UIButtonClickSound, volume: 0.5, autoplay: true, loop: false}, true);
			game.PTUMoveMaster.healActorTick(actor);
		}};

		buttons["rest_reset"] = {id:"rest_reset", label: RestMark,
		callback: async () => {

			await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+UIButtonClickSound, volume: 0.5, autoplay: true, loop: false}, true);
			game.PTUMoveMaster.healActorRestPrompt(actor);
		}};

		buttons["pokedexBottomBuffer"] = {noRefresh: true, id:"pokedexBottomBuffer", label: "<div class='pokedex-bottom-filler' style='border:none'></div>",
		callback: () => {

		}};

		let dialogueID = "ptu-sidebar";
		let current_weather = game.settings.get("PTUMoveMaster", "currentWeather");
		let weather_icon = "weather_icon_"+current_weather+".png";
		let pokedex_text = "Unidentified Pokemon - Click to Scan!";
		let pokedex_camera_icon = "Pokedex_Camera.png";
		

		let actor_has_target_dex_entry = false;

		if(target)
		{
			if(target.actor.data.data.species)
			{
				actor_has_target_dex_entry = game.PTUMoveMaster.ThisActorOrTheirTrainerHasDexEntry(actor, target.actor.data.data.species);
				if(game.user.isGM)
				{
					actor_has_target_dex_entry = true;
				}
			}

			if(target.actor.type == "character")
			{
				pokedex_camera_icon = "Pokedex_Camera_Scanned.png";
				pokedex_text = "Pokedex: No Pokemon Targeted"
			}
			else if(target && actor_has_target_dex_entry)
			{
				pokedex_camera_icon = "Pokedex_Camera_Scanned.png";
				pokedex_text = "Pokedex: Known Pokemon Species: "+target.actor.data.data.species;
			}
		}
		else
		{
			pokedex_camera_icon = "Pokedex_Camera_Scanned.png";
			pokedex_text = "Pokedex: No Pokemon Targeted"
		}

		let pokedex_camera_button = "<input title='"+pokedex_text+"' type='image' src='"+AlternateIconPath+pokedex_camera_icon+"' name='saveForm' class='pokedex-top-camera' id='saveForm' />";

		if(!hasPokedex)
		{
			pokedex_text = "Pokedex: No Pokedex in Trainer`s Inventory!"
			pokedex_camera_button = "<input title='"+pokedex_text+"' type='image' src='"+AlternateIconPath+pokedex_camera_icon+"' name='saveForm' class='pokedex-top-camera-disabled' id='saveForm' />";
		}
		
		let content = "<img class='pokedex-top' src='"+AlternateIconPath+"NewPokedex_Vertical_Top_200.png"+"'></img>\
		<center>"+pokedex_camera_button+"</img></center>\
		<style> #"+dialogueID+" .dialog-buttons \
			{\
				background-color:"+ MoveButtonBackgroundColor +";\
				flex-direction: column; \
				padding: 0px !important; \
				border-width: 0px !important; \
				margin: 0px !important; \
				border: none !important;\
			} #"+dialogueID+" .dialog-button \
			{\
				background-color:"+ MoveButtonBackgroundColor +";\
				flex-direction: column; \
				padding: 0px !important; \
				border-width: 0px !important; \
				margin-top: 3px !important; \
				margin-bottom: 3px !important; \
				margin-left: 0px !important; \
				margin-right: 0px !important; \
				border: none !important; \
				width: 200px\
			} #"+dialogueID+" .dialog-content \
			{\
				background-color:"+ MoveButtonBackgroundColor +";\
				flex-direction: column; \
				padding: 0px !important; \
				border-width: 0px !important; \
				margin: 0px !important; \
				width: 200px !important; \
				height: auto !important;\
			} #"+dialogueID+" .window-content \
			{\
				;flex-direction: column; \
				padding: 0px !important; \
				border-width: 0px !important; \
				margin: 0px !important; \
				width: 200px !important;\
			} #"+dialogueID+".app.window-app.MoveMasterSidebarDialog \
			{\
				background-color:"+ MoveButtonBackgroundColor +";\
				flex-direction: column; \
				padding: 0px !important; \
				border-width: 0px !important; \
				margin: 0px !important; \
				width: 200px !important;\
			}\
		</style>\
		<center>\
			<h2 style='margin-bottom: 10px;'>\
				"+ targetTypingText+"\
			</h2>\
			<div class='cameraframe-terrain' style='"+background_field+";\
			font-family:Modesto Condensed;\
			font-size:20px'>\
			</div>\
		</center>\
		<img class='pokedex-bottom' src='"+AlternateIconPath+"NewPokedex_Vertical_Bottom_200.png"+"'></img>\
		<center><img class='pokedex-bottom-weather' title='Current Weather: "+current_weather+"' src='"+AlternateIconPath+weather_icon+"'></img></center>";
		let sidebar = new game.PTUMoveMaster.SidebarForm({content, buttons, dialogueID, classes: "ptu-sidebar"});
		
		sidebar.render(true);
		// $(".ptu-sidebar .window-content").scrollTop(300);
	};


	async function rollDamageMoveWithBonus(actor , item, finalDB, typeStrategist)
	{
		let form = new game.PTUMoveMaster.MoveMasterBonusDamageOptions({actor , item, finalDB, typeStrategist}, {"submitOnChange": false, "submitOnClose": false});
		form.render(true);
	}

	async function PokedexScanButton(event)
	{
		// console.log("PokedexScanButton: event");
		// console.log(event);
		// game.PTUMoveMaster.PokedexScan(event.currentTarget.dataset.trainer_token, event.currentTarget.dataset.tarket_pokemon_token);
		game.PTUMoveMaster.PokedexScan(event.currentTarget.dataset.trainer_token, event.currentTarget.dataset.tarket_pokemon_token);
	}


	return {
	ChatWindow:ChatWindow,
	ApplyDamage:ApplyDamage,
	PokedexScanButton:PokedexScanButton
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
			if(mode=="weak")
			{
				flavor+="(resisted 1 step less) ";
				let old_effectiveness=this_moves_effectiveness;
				if(old_effectiveness < 1)
				{
					this_moves_effectiveness=this_moves_effectiveness + .5;
				}
				else
				{
					this_moves_effectiveness=Number(this_moves_effectiveness + 0.5);
				}
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

			await elementalHitEffect(token.actor, event.currentTarget.dataset.move, damage_category, damage_type);
			await TokenMagic.addFilters(token, hit_params);
			chatMessage(token, flavor + initial_damage_total + " Damage! "+ token.actor.name + "'s " + damage_category + " defense (after extra DR)" + extraDRNotes + " is " + DR + ", reducing the incoming damage to "+defended_damage+", and their defensive effectiveness against " + damage_type + " is x" + this_moves_effectiveness + "; They take " + final_effective_damage + " damage after effectiveness and defenses.");

			// token.actor.update({'data.health.value': Number(token.actor.data.data.health.value - final_effective_damage) });
			token.actor.modifyTokenAttribute("health", (-final_effective_damage), true, true);

			ApplyInjuries(token.actor, final_effective_damage);
			
		}
		await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+damageSoundFile, volume: 0.8, autoplay: true, loop: false}, true);
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
		
	if(!silent)
	{
		game.PTUMoveMaster.chatMessage(actor, actor.name + " All Stages Reset!");
		await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"Stat%20Fall%20Down.mp3", volume: 0.5, autoplay: true, loop: false}, true);
	}
}


export function GetSoundDirectory()
{
	return game.settings.get("ptu", "moveSoundDirectory");
}

export async function RollDamageMove(actor, item_initial, moveName, finalDB, typeStrategist, bonusDamage)
	{
		var item = item_initial.data.data;
		await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+UIButtonClickSound, volume: 0.5, autoplay: true, loop: false}, true);

		var item_entities=actor.items;
		let diceRoll = await game.PTUMoveMaster.PerformFullAttack (actor, item, moveName, finalDB, bonusDamage);

		let effect_range_bonus = 0;
		if(actor.data.data.modifiers.effectRange.total)
		{
			effect_range_bonus = actor.data.data.modifiers.effectRange.total;
		}

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
		}

		if(item.frequency == "Daily" || item.frequency == "Daily x2" || item.frequency == "Daily x3" || item.frequency == "Scene" || item.frequency == "Scene x2" || item.frequency == "Scene x3")
		{
			for(let search_item of item_entities)
			{
				if (search_item.id == item_initial.id)
				{
					await search_item.update({ "data.UseCount": Number(item.UseCount + 1)});
				}
			}
		}

		for(let search_item of item_entities)
		{
			if (search_item.id == item_initial.id)
			{
				await search_item.update({ "data.LastRoundUsed": currentRound, "data.LastEncounterUsed": currentEncounterID});

				if( (typeStrategist.length > 0) && (typeStrategist.indexOf(item.type) > -1) )
				{
					let oneThirdMaxHealth = Number(actor.data.data.health.total / 3);
					let currentDR = (actor.data.data.health.value < oneThirdMaxHealth ? 10 : 5);
					await actor.update({ "data.TypeStrategistLastRoundUsed": currentRound, "data.TypeStrategistLastEncounterUsed": currentEncounterID, "data.TypeStrategistLastTypeUsed": item.type, "data.TypeStrategistDR": currentDR});
				}
			}
		}

			let move_found_in_custom = false;

			console.log("DEBUG: custom_moves: ");
			console.log(custom_moves);
			for(let searched_move in custom_moves)
			{
				if(moveName.includes(searched_move))
				{
					if(custom_moves[searched_move]["roll-trigger"] != null) // Effect Range Check
					{
						let effectThreshold = custom_moves[searched_move]["roll-trigger"];

						if(diceRoll >= (effectThreshold - effect_range_bonus)) // Effect Range Hit
						{
							for (let searched_stat of stats)
							{
								if (custom_moves[searched_move][searched_stat] != null)
								{
									setTimeout( async () => { 
										await adjustActorStage(actor,searched_stat, custom_moves[searched_move][searched_stat]);
									}, 1000);
								}
							}
							if(custom_moves[searched_move]["pct-healing"] != null)
							{
								await healActorPercent(actor,custom_moves[searched_move]["pct-healing"]);
							}
							if(custom_moves[searched_move]["pct-self-damage"] != null)
							{
								await damageActorPercent(actor,custom_moves[searched_move]["pct-self-damage"]);
							}
							if(custom_moves[searched_move]["weather"] != null)
							{
								await game.PTUMoveMaster.SetCurrentWeather(custom_moves[searched_move]["weather"]);
							}
							if(custom_moves[searched_move]["accuracy"] != null)
							{
								await adjustActorAccuracy(actor,custom_moves[searched_move]["accuracy"]);
							}
						}
					}
					else // No Effect Range
					{
						for (let searched_stat of stats)
						{
							if (custom_moves[searched_move][searched_stat] != null)
							{
								setTimeout( async () => { 
									await adjustActorStage(actor,searched_stat, custom_moves[searched_move][searched_stat]);
								}, 1000);
							}
						}
						if(custom_moves[searched_move]["pct-healing"] != null)
						{
							await healActorPercent(actor,custom_moves[searched_move]["pct-healing"]);
						}
						if(custom_moves[searched_move]["pct-self-damage"] != null)
						{
							await damageActorPercent(actor,custom_moves[searched_move]["pct-self-damage"]);
						}
						if(custom_moves[searched_move]["weather"] != null)
						{
							await game.PTUMoveMaster.SetCurrentWeather(custom_moves[searched_move]["weather"]);
						}
						if(custom_moves[searched_move]["accuracy"] != null)
						{
							await adjustActorAccuracy(actor,custom_moves[searched_move]["accuracy"]);
						}
					}
					move_found_in_custom = true;
					break;
				}
			}
			if(!move_found_in_custom)
			{
				for(let searched_move in move_stage_changes)
				{
					if(moveName.includes(searched_move))
					{
						if(move_stage_changes[searched_move]["roll-trigger"] != null) // Effect Range Check
						{
							let effectThreshold = move_stage_changes[searched_move]["roll-trigger"];

							if(diceRoll >= (effectThreshold - effect_range_bonus)) // Effect Range Hit
							{
								for (let searched_stat of stats)
								{
									if (move_stage_changes[searched_move][searched_stat] != null)
									{
										setTimeout( async () => { 
											await adjustActorStage(actor,searched_stat, move_stage_changes[searched_move][searched_stat]);
										}, 1000);
									}
								}
								if(move_stage_changes[searched_move]["pct-healing"] != null)
								{
									await healActorPercent(actor,move_stage_changes[searched_move]["pct-healing"]);
								}
								if(move_stage_changes[searched_move]["pct-self-damage"] != null)
								{
									await damageActorPercent(actor,move_stage_changes[searched_move]["pct-self-damage"]);
								}
								if(move_stage_changes[searched_move]["weather"] != null)
								{
									await game.PTUMoveMaster.SetCurrentWeather(move_stage_changes[searched_move]["weather"]);
								}
								if(move_stage_changes[searched_move]["accuracy"] != null)
								{
									await adjustActorAccuracy(actor,move_stage_changes[searched_move]["accuracy"]);
								}
							}
						}
						else // No Effect Range
						{
							for (let searched_stat of stats)
							{
								if (move_stage_changes[searched_move][searched_stat] != null)
								{
									setTimeout( async () => { 
										await adjustActorStage(actor,searched_stat, move_stage_changes[searched_move][searched_stat]);
									}, 1000);
								}
							}
							if(move_stage_changes[searched_move]["pct-healing"] != null)
							{
								await healActorPercent(actor,move_stage_changes[searched_move]["pct-healing"]);
							}
							if(move_stage_changes[searched_move]["pct-self-damage"] != null)
							{
								await damageActorPercent(actor,move_stage_changes[searched_move]["pct-self-damage"]);
							}
							if(move_stage_changes[searched_move]["weather"] != null)
							{
								await game.PTUMoveMaster.SetCurrentWeather(move_stage_changes[searched_move]["weather"]);
							}
							if(move_stage_changes[searched_move]["accuracy"] != null)
							{
								await adjustActorAccuracy(actor,move_stage_changes[searched_move]["accuracy"]);
							}
						}
						break;
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

export async function adjustActorStage(actor, stat, change)
{
	setTimeout( async () => {
		let effects = actor.effects;
		let AE_changes = [];
		let is_simple = game.PTUMoveMaster.ActorHasItemWithName(actor, "Simple", "ability");

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
			await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+stat_up_sound_file, volume: 0.8, autoplay: true, loop: false}, true);
		}
		else
		{
			await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+stat_down_sound_file, volume: 0.8, autoplay: true, loop: false}, true);
		}

		let old_stage = eval("(Number(actor.data.data.stats."+stat+".stage))");
		old_stage -= stage_AE_sum;

		let new_stage = eval("Math.max(Math.min((old_stage + Number(change)), 6), -6)");

		eval("actor.update({'data.stats."+stat+".stage': Number("+ new_stage +") })");
		game.PTUMoveMaster.chatMessage(actor, actor.name + ' '+ stat +' Stage +'+ change +'!');

		if(is_simple)
		{
			setTimeout( async () => {  
				let effects = actor.effects;
				let AE_changes = [];
				let is_simple = game.PTUMoveMaster.ActorHasItemWithName(actor, "Simple", "ability");

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
					await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+stat_up_sound_file, volume: 0.8, autoplay: true, loop: false}, true);
				}
				else
				{
					await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+stat_down_sound_file, volume: 0.8, autoplay: true, loop: false}, true);
				}

				let old_stage = eval("(Number(actor.data.data.stats."+stat+".stage))");
				old_stage -= stage_AE_sum;

				let new_stage = eval("Math.max(Math.min((old_stage + Number(change)), 6), -6)");

				eval("actor.update({'data.stats."+stat+".stage': Number("+ new_stage +") })");
				game.PTUMoveMaster.chatMessage(actor, actor.name + ' '+ stat +' Stage +'+ change +' again, due to Simple!');
			}, 1000);
		}
	}, 100);
}


export async function healActorPercent(actor,pct_healing)
{
	let difference_to_max = Number(actor.data.data.health.max - actor.data.data.health.value);
	let final_healing_amount = Math.min(Math.floor(pct_healing*actor.data.data.health.total), difference_to_max)
	await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+heal_sound_file, volume: 0.8, autoplay: true, loop: false}, true);

	actor.modifyTokenAttribute("health", (final_healing_amount), true, true);
	game.PTUMoveMaster.chatMessage(actor, actor.name + ' healed '+ pct_healing*100 +'% of their max hit points!');
}


export async function healActor(actor, healing_amount)
{
	let difference_to_max = Number(actor.data.data.health.max - actor.data.data.health.value);
	let final_healing_amount = Math.min(healing_amount, difference_to_max)
	await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+heal_sound_file, volume: 0.8, autoplay: true, loop: false}, true);

	actor.modifyTokenAttribute("health", (final_healing_amount), true, true);
	game.PTUMoveMaster.chatMessage(actor, actor.name + ' healed '+ final_healing_amount +' hit points!');
}


export async function setActorHealth(actor, new_health)
{
	await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+heal_sound_file, volume: 0.8, autoplay: true, loop: false}, true);

	actor.modifyTokenAttribute("health", (new_health), false, true);
	game.PTUMoveMaster.chatMessage(actor, actor.name + '\'s health was set to '+ new_health +' hit points!');
}


export async function setActorHealthPercent(actor, new_health_percent) // Percent expressed as fractions of 1. 30% would be 0.3, etc.
{
	await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+heal_sound_file, volume: 0.8, autoplay: true, loop: false}, true);

	actor.modifyTokenAttribute("health", (new_health_percent*actor.data.data.health.total), false, true);
	game.PTUMoveMaster.chatMessage(actor, actor.name + '\'s health was set to '+ new_health_percent*100 +'% of their max hit points!');
}


export async function damageActorPercent(actor,pct_damage)
{
	await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+damage_sound_file, volume: 0.8, autoplay: true, loop: false}, true);

	let finalDamage = (Math.floor(pct_damage*actor.data.data.health.total));

	actor.modifyTokenAttribute("health", -finalDamage, true, true);
	game.PTUMoveMaster.chatMessage(actor, actor.name + ' took damage equal to '+ pct_damage*100 +'% of their max hit points!');
	game.PTUMoveMaster.ApplyInjuries(actor, finalDamage);
}


export async function damageActorFlatValue(actor, damage_value, source="")
{
	await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+damage_sound_file, volume: 0.8, autoplay: true, loop: false}, true);

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


export async function damageActorTick(actor, source="", tick_count=1)
{
	let tick_DR = 0;
	let tick_DR_flavor = "";
	
	if(game.PTUMoveMaster.ActorHasItemWithName(actor, "Permafrost", "ability"))
	{
		tick_DR += 5;
		tick_DR_flavor = ", after "+tick_DR+" Tick DR from Permafrost";
	}

	if(game.PTUMoveMaster.PokemonsTrainerHasItemWithName(actor, "Stat Mastery (Special Defense)", "feat"))
	{
		tick_DR += 5;
		tick_DR_flavor = ", after "+tick_DR+" Tick DR from Trainer's Stat Mastery (Special Defense)";
	}

	await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+damage_sound_file, volume: 0.8, autoplay: true, loop: false}, true);

	let finalDamage = Math.max((Math.floor(0.10*actor.data.data.health.total*tick_count)) - (tick_DR*tick_count), 0);
	let source_string = "";

	if(source != "")
	{
		source_string = " from "+source;
	}

	await actor.modifyTokenAttribute("health", -finalDamage, true, true);
	await game.PTUMoveMaster.chatMessage(actor, actor.name + ' took '+tick_count+' tick of damage ('+ finalDamage +' Hit Points)'+source_string+tick_DR_flavor+'!');
	await game.PTUMoveMaster.ApplyInjuries(actor, finalDamage);
}


export async function healActorTick(actor, source="")
{
	await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+heal_sound_file, volume: 0.8, autoplay: true, loop: false}, true);

	let finalhealing = (Math.floor(0.10*actor.data.data.health.total));
	let source_string = "";

	if(source != "")
	{
		source_string = " from "+source;
	}

	await actor.modifyTokenAttribute("health", finalhealing, true, true);
	await game.PTUMoveMaster.chatMessage(actor, actor.name + ' healed a tick of damage ('+ finalhealing +' Hit Points)'+source_string+'!');
}


export async function healActorRest(actor, hours=8, bandage_used=false, pokecenter=false)
{
	await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+heal_sound_file, volume: 0.8, autoplay: true, loop: false}, true);

	let health_fractions_healed = hours;
	let health_fraction_size = (bandage_used ? 4 : 8);
	let injuries = actor.data.data.health.injuries;
	let pokecenter_text = "";
	let injury_gtr_5_text = "";
	if(pokecenter)
	{
		pokecenter_text = " at a Pokecenter";
	}

	let healing_percent = (health_fractions_healed * (1/health_fraction_size));
	if(pokecenter)
	{
		healing_percent = 3.0;
	}

	let injuries_healed = 0;

	if(bandage_used && (hours >= 6))
	{
		injuries_healed++;
	}
	if(hours >= 24)
	{
		injuries_healed += Math.floor(hours/24);
	}

	let days_spent = Math.ceil(hours/24);
	if(pokecenter)
	{
		if(injuries >= 5)
		{
			injuries_healed = Math.min(Math.floor(hours*1), Math.floor(days_spent*3));
		}
		else
		{
			injuries_healed = Math.min(Math.floor(hours*2), Math.floor(days_spent*3));
		}
	}
	if((hours >= 4) || (pokecenter))
	{
		await game.PTUMoveMaster.resetEOTMoves(actor, true);
		await game.PTUMoveMaster.resetSceneMoves(actor, true);
		await game.PTUMoveMaster.resetDailyMoves(actor, true);

		let conditions = ["Burned", "Frozen", "Paralysis", "Poisoned", "Badly Poisoned", "Flinch", "Sleep", "Cursed", "Confused", "Disabled", "Infatuation", "Rage", "BadSleep", "Suppressed", "Fainted"];

		for(let affliction of conditions)
		{
			await game.PTUMoveMaster.cureActorAffliction(actor, affliction);
		}
	}

	await actor.update({'data.health.injuries': Math.max(Number(actor.data.data.health.injuries - injuries_healed), 0) });


	setTimeout( async () => {  
		let finalhealing = Math.min(Math.floor(actor.data.data.health.total * healing_percent), (actor.data.data.health.total-actor.data.data.health.value));
		if(actor.data.data.health.injuries >= 5) // A Trainer or Pokémon is unable to restore Hit Points through rest if the individual has 5 or more injuries. Once the individual has 4 or fewer injuries (usually by seeking medical attention), he or she may once again restore Hit Points by resting.
		{
			finalhealing = 0;
			injury_gtr_5_text = " Due to still having 5 or more injuries, they are unable to recover any hit points. Seek proper medical attention immediately!"
		}

		await actor.modifyTokenAttribute("health", finalhealing, true, true);
		await game.PTUMoveMaster.chatMessage(actor, actor.name + ' rested for '+hours+' hours'+pokecenter_text+', healing '+ finalhealing +' Hit Points and '+injuries_healed+' injuries!'+injury_gtr_5_text);
	}, 1000);
}


export async function healActorRestPrompt(actor)
{
	let form = new game.PTUMoveMaster.MoveMasterRestHoursOptions({actor}, {"submitOnChange": false, "submitOnClose": false});
	form.render(true);
}


export async function cureActorAffliction(actor, affliction_name, silent=false)
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
		if(eval('actor.data.flags.ptu.'+lowercase_affliction_name) == "true")
		{
			for(let effect of actor.effects.filter(x => x.data.label == affliction_name))
  			{
				await effect.delete();
			}

			if(!silent)
			{
				await game.PTUMoveMaster.chatMessage(actor, actor.name + ' was cured of '+ affliction_name +'!');
			}

			return true;
		}
		else
		{
			return false;
		}
	}
	else
	{
		return false;
	}
}


export async function CalculateAcRoll (moveData, actorData)   {
	
	let blindness_mod = 0;
	if(actorData.flags.ptu)
	{
		if(actorData.flags.ptu.is_totally_blind)
		{
			// blindness_mod = -10;
			blindness_mod = 0;
		}
		else if(actorData.flags.ptu.is_blind)
		{
			// blindness_mod = -6;
			blindness_mod = 0;
		}
	}

	return new Roll('1d20-@ac+@acBonus', {
		ac: (parseInt(moveData.ac) || 0),
		acBonus: ((parseInt(actorData.data.modifiers.acBonus.total)+blindness_mod) || 0)
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
	let target_actor = null;
	let target_token = Array.from(game.user.targets)[0];
	let targeted = false;
	let target_name = "";
	let range_to_target = null;
	let move_range = 1;
	let in_range = true;
	let actor_token = game.PTUMoveMaster.GetTokenFromActor(actor);
	let actor_image = actor.data.img;
	let target_image = "";

	if(target_token)
	{
		target_actor = game.PTUMoveMaster.GetActorFromToken(target_token);
	}
	
	let target_evasion = 0;
	let target_evasion_type = "N/A"

	if(target_actor)
	{
		let target_physical_evasion = target_actor.data.data.evasion.physical;
		let target_special_evasion = target_actor.data.data.evasion.special;
		let target_speed_evasion = target_actor.data.data.evasion.speed;

		target_image = target_actor.data.img;

		range_to_target = GetDistanceBetweenTokens( actor_token.data, target_token.data); //canvas.grid.measureDistance(actor_token.data, target_token.data);

		if(move.range)
		{
			if(move.range.search("Melee") > -1)
			{
				move_range = Math.max( actor_token.data.width , actor_token.data.height);
			}
			else if(move.range.search("Self") > -1)
			{
				move_range = 9999;
			}
			else if(move.range.search("Pass") > -1)
			{
				move_range = 4;
			}
			else if(move.range.search("Burst") > -1)
			{
				move_range = Number(move.range.slice(move.range.search("Burst")+6).replace(/[, ]+/g, "").trim().slice(0, move.range.search(",")).replace(/[, ]+/g, "").trim());
			}
			else if(move.range.search("Cone") > -1)
			{
				move_range = Number(move.range.slice(move.range.search("Cone")+5).replace(/[, ]+/g, "").trim().slice(0, move.range.search(",")).replace(/[, ]+/g, "").trim());
			}
			else if(move.range.search("Line") > -1)
			{
				move_range = Number(move.range.slice(move.range.search("Line")+5).replace(/[, ]+/g, "").trim().slice(0, move.range.search(",")).replace(/[, ]+/g, "").trim());
			}
			else if(move.range.search("Close Blast") > -1)
			{
				move_range = Number(move.range.slice(move.range.search("Close Blast")+9).replace(/[, ]+/g, "").trim().slice(0, move.range.search(",")).replace(/[, ]+/g, "").trim());
			}
			else if(move.range.search("Ranged Blast") > -1)
			{
				move_range = move_range = Number(move.range.slice(0, move.range.search(",")).replace(/[, ]+/g, "").trim());
			}
			else
			{
				move_range = Number(move.range.slice(0, move.range.search(",")).replace(/[, ]+/g, "").trim());
			}
			
			if(range_to_target > move_range)
			{
				in_range = false;
			}
		}
		
		
		switch(move.category)
		{
			case "Physical":
				{
					target_evasion = Math.max(target_physical_evasion, target_speed_evasion);
					target_evasion_type = "Physical/Speed";
					targeted = true;
					target_name = target_token.data.name;
					break;
				}
				
			case "Special":
				{
					target_evasion = Math.max(target_special_evasion, target_speed_evasion);
					target_evasion_type = "Special/Speed";
					targeted = true;
					target_name = target_token.data.name;
					break;
				}
			case "Status":
				{
					target_evasion = target_speed_evasion;
					target_evasion_type = "Speed";
					targeted = true;
					target_name = target_token.data.name;
					break;
				}
		}

	}

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

	let acRoll = await game.PTUMoveMaster.CalculateAcRoll(move, actor.data);
	let diceResult = await game.PTUMoveMaster.GetDiceResult(acRoll);

	let acRoll2 = await game.PTUMoveMaster.CalculateAcRoll(move, actor.data);
	let diceResult2 = await game.PTUMoveMaster.GetDiceResult(acRoll2);

	let move_crit_base = 20;

	if(custom_moves[move.name])
	{
		if(custom_moves[move.name]["crit-range"])
		{
			move_crit_base = custom_moves[move.name]["crit-range"];
		}
	}
	else if(move_stage_changes[move.name])
	{
		if(move_stage_changes[move.name]["crit-range"])
		{
			move_crit_base = move_stage_changes[move.name]["crit-range"];
		}
	}

	let crit = diceResult === 1 ? CritOptions.CRIT_MISS : diceResult >= Number(move_crit_base - actor.data.data.modifiers.critRange.total) ? CritOptions.CRIT_HIT : CritOptions.NORMAL;
	let crit2 = diceResult2 === 1 ? CritOptions.CRIT_MISS : diceResult2 >= Number(move_crit_base - actor.data.data.modifiers.critRange.total) ? CritOptions.CRIT_HIT : CritOptions.NORMAL;

	let damageRoll = await game.PTUMoveMaster.CalculateDmgRoll(move, actor.data.data, 'normal', userHasTechnician, userHasAdaptability, isDoubleStrike, isFiveStrike, fiveStrikeCount, 1, 0, bonusDamage);
	if(damageRoll) 
	{
		await damageRoll.roll();
	}
	let critDamageRoll = await game.PTUMoveMaster.CalculateDmgRoll(move, actor.data.data, 'hit', userHasTechnician, userHasAdaptability, isDoubleStrike, isFiveStrike, fiveStrikeCount, 1, 0, bonusDamage);
	if(!move.name)
	{
		move.name=move.name;
	}
	if(critDamageRoll)
	{
		await critDamageRoll.roll();
	}
	if(damageRoll && damageRoll._total)
	{
		await game.macros.getName("backend_set_flags")?.execute(damageRoll._total,critDamageRoll._total,move.category,move.type);
	}

	let damageRollTwoHits = await game.PTUMoveMaster.CalculateDmgRoll(move, actor.data.data, 'normal', userHasTechnician, userHasAdaptability, isDoubleStrike, isFiveStrike, fiveStrikeCount, 2, 0, bonusDamage);
	if(damageRollTwoHits)
	{
		await damageRollTwoHits.roll();
	}

	let critDamageRollOneHitOneCrit = await game.PTUMoveMaster.CalculateDmgRoll(move, actor.data.data, 'hit', userHasTechnician, userHasAdaptability, isDoubleStrike, isFiveStrike, fiveStrikeCount, 2, 1, bonusDamage);
	if(critDamageRollOneHitOneCrit)
	{
		await critDamageRollOneHitOneCrit.roll();
	}

	let critDamageRollTwoCrits = await game.PTUMoveMaster.CalculateDmgRoll(move, actor.data.data, 'hit', userHasTechnician, userHasAdaptability, isDoubleStrike, isFiveStrike, fiveStrikeCount, 2, 2, bonusDamage);
	if(critDamageRollTwoCrits)
	{
		await critDamageRollTwoCrits.roll();
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

	let roll1_hit = false;
	let roll2_hit = false;

	if(acRoll._total >= target_evasion)
	{
		roll1_hit = true;
	}

	if(acRoll2._total >= target_evasion)
	{
		roll2_hit = true;
	}

	setTimeout( async () => { 
		await game.PTUMoveMaster.sendMoveRollMessage(moveName, acRoll, acRoll2, {
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
			targetEvasion: target_evasion,
			targetEvasionType: target_evasion_type,
			targeted: targeted,
			targetName: target_name,
			hit1: roll1_hit,
			hit2: roll2_hit,
			moveRange: move_range,
			rangeToTarget: range_to_target,
			inRange: in_range,
			actorImage: actor_image,
			targetImage: target_image
		});//.then(data => console.log(data));
	}, 1000);

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
	await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+moveSoundFile, volume: 0.8, autoplay: true, loop: false}, true);
	await elementalAttackEffect(actor, move);
	if(targeted)
	{
		await elementalBlastEffect(actor, target_actor, move);
	}

	if(move.range.includes("Full Action"))
	{
		await game.PTUMoveMaster.TakeAction(actor, "Full", move.category);
	}
	else if(move.name == "Splash")
	{
		await game.PTUMoveMaster.TakeAction(actor, "Shift", move.category);
	}
	else
	{
		await game.PTUMoveMaster.TakeAction(actor, "Standard", move.category);
	}

	if(targeted && !move.range.includes("Self") && !move.range.includes("Blessing") && !move.range.includes("Field"))
	{
		if(!roll1_hit && !(roll2_hit && isDoubleStrike)) // Miss! Play dodge animation on target.
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

			setTimeout( async () => {
			await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"pokeball_sounds/"+"pokeball_miss.mp3", volume: 0.5, autoplay: true, loop: false}, true);
			await TokenMagic.addFilters(target_token, dodge_params);
			}, 1000);
		}
		else // Hit! Play hit animation on target.
		{
			

			// await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"pokeball_sounds/"+"pokeball_hit.mp3", volume: 0.5, autoplay: true, loop: false}, true);

			let damageSoundFile = "Hit%20Normal%20Damage.mp3";
			if(crit == "hit")
			{
				damageSoundFile = "Hit%20Super%20Effective.mp3";
			}
			setTimeout( async () => {
				await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+damageSoundFile, volume: 0.8, autoplay: true, loop: false}, true);
				await TokenMagic.addFilters(target_token, hit_params);
				await elementalHitEffect(target_actor, move);
			}, 1000);
		}
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
		// console.log("Old system detected, using deprecated rolling...")
		diceResult = roll.parts[0].results[0];
	}
	return diceResult;
};


export async function CalculateDmgRoll(moveData, actorData, isCrit, userHasTechnician, userHasAdaptability, isDoubleStrike, isFiveStrike, fiveStrikeCount, hitCount, critCount, bonusDamage) 
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
		await rollData.evaluate();
	}

	if (!rollData2._evaluated) 
	{
		await rollData2.evaluate();
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


export async function ApplyInjuries(target, final_effective_damage, damage_type="Untyped")
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
				await game.PTUMoveMaster.chatMessage(target, target.name + " suffered massive damage and sustains an injury!");
			}

			if( (final_effective_damage >= 1) && (targetHealthCurrent > hitPoints50Pct) && ((targetHealthCurrent - final_effective_damage) <= hitPoints50Pct) )
			{
				injuryCount++;
				await game.PTUMoveMaster.chatMessage(target, target.name + " was damaged to below the 50% health threshold and sustains an injury!");
			}

			if( (final_effective_damage >= 1) && (targetHealthCurrent > hitPoints0Pct) && ((targetHealthCurrent - final_effective_damage) <= hitPoints0Pct) )
			{
				injuryCount++;
				await game.PTUMoveMaster.chatMessage(target, target.name + " was damaged to below the 0% health threshold and sustains an injury! "+target.name+" has *fainted*!");
			}

			if( (final_effective_damage >= 1) && (targetHealthCurrent > hitPointsNegative50Pct) && ((targetHealthCurrent - final_effective_damage) <= hitPointsNegative50Pct) )
			{
				injuryCount++;
				await game.PTUMoveMaster.chatMessage(target, target.name + " was damaged to below the -50% health threshold and sustains an injury!");
			}

			if( (final_effective_damage >= 1) && (targetHealthCurrent > hitPointsNegative100Pct) && ((targetHealthCurrent - final_effective_damage) <= hitPointsNegative100Pct) )
			{
				injuryCount++;
				await game.PTUMoveMaster.chatMessage(target, target.name + " was damaged to below the -100% health threshold and sustains an injury!");
			}

			if( (final_effective_damage >= 1) && (targetHealthCurrent > hitPointsNegative150Pct) && ((targetHealthCurrent - final_effective_damage) <= hitPointsNegative150Pct) )
			{
				injuryCount++;
				await game.PTUMoveMaster.chatMessage(target, target.name + " was damaged to below the -150% health threshold and sustains an injury!");
			}

			if( (final_effective_damage >= 1) && (targetHealthCurrent > hitPointsNegative200Pct) && ((targetHealthCurrent - final_effective_damage) <= hitPointsNegative200Pct) )
			{
				injuryCount++;
				await game.PTUMoveMaster.chatMessage(target, target.name + " was damaged to below the -200% health threshold and sustains an injury! If using death rules, "+target.name+" *dies*!");
			}

			await target.update({'data.health.injuries': Number(target.data.data.health.injuries + injuryCount) });
			if(injuryCount)
			{
				await game.PTUMoveMaster.injuryTokenSplash(target);
			}
		}

	if( (targetHealthCurrent > 0) && (Number(targetHealthCurrent - final_effective_damage) <= 0) )
	{
		Dialog.confirm({
			title: "Fainted?",
			content: "Hit Points are 0 or below; Apply fainted condition?",
			yes: async () => {
				await game.PTUMoveMaster.enableCondition(target, "fainted", "other");
			},
			defaultYes: false 
		})
	}
	
	
}


export function GetDistanceBetweenTokens_Adjusted(token1, token2)
{
	let grid_size = canvas.scene.dimensions.size;

	let token1_height_offset = (token1.height*grid_size)/2;
	let token1_width_offset = (token1.width*grid_size)/2;
	let token1_x = token1.x + token1_width_offset;
	let token1_y = token1.y + token1_height_offset;

	let token1_grid_offset = 0;
	if(Math.max(token1.height, token1.width) > 1)
	{
		token1_grid_offset = Math.max( Math.floor(token1.height/2), Math.floor(token1.width/2) );
	}

	let token2_height_offset = (token2.height*grid_size)/2;
	let token2_width_offset = (token2.width*grid_size)/2;
	let token2_x = token2.x + token2_width_offset;
	let token2_y = token2.y + token2_height_offset;

	let token2_grid_offset = 0;
	if(Math.max(token2.height, token2.width) > 1)
	{
		token2_grid_offset = Math.max( Math.floor(token2.height/2), Math.floor(token2.width/2) );
	}

	let ray = new Ray( {x:token1_x, y:token1_y}, {x:token2_x, y:token2_y} );
	let segments = [{ray}];
	let dist = (canvas.grid.measureDistances(segments,{gridSpaces:true})[0]) - token1_grid_offset - token2_grid_offset;
		
	// ui.notifications.info(`${dist} m apart`)
	return dist;
};

export function GetDistanceBetweenTokens(token1, token2)
{
	let ray = new Ray(token1, token2);
	let segments = [{ray}];
	let dist = canvas.grid.measureDistances(segments,{gridSpaces:true})[0]
	return dist;
}


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


export function GetActorFromToken(token)
{
	let actor = game.actors.get(token.data.actorId);
	return actor;
};


export function GetTokenFromActor(actor)
{
	let actor_id = actor.id;
	let scene_tokens = game.scenes.current.data.tokens; // TODO: fix this looking at *active* scene instead of viewed scene

	let token = false;

	for(let searched_token of scene_tokens)
	{
		if(searched_token.actor.id == actor_id)
		{
			token = searched_token;
			break;
		}
	}
	
	return token;
};


export function ActorHasItemWithName(actor, initial_item_name, item_category="Any", precise_naming=false)
{
	let item_name = initial_item_name.replace("é", "e").toLowerCase();

	if(item_category == "Any" || item_category == "")
	{
		for(let item of actor.items)
		{
			if(item.data.name)
			{
				if( (item.data.name.replace("é", "e") == item_name) || (!precise_naming && (item.data.name.replace("é", "e").toLowerCase().includes(item_name)) ) )
				{
					return item;
				}
			}
		}
	}
	else if(item_category == "move")
	{
		for(let item of actor.itemTypes.move)
		{
			if(item.data.name)
			{
				if( (item.data.name.replace("é", "e") == item_name) || (!precise_naming && (item.data.name.replace("é", "e").toLowerCase().includes(item_name)) ) )
				{
					return item;
				}
			}
		}
	}
	else if(item_category == "edge")
	{
		for(let item of actor.itemTypes.edge)
		{
			if(item.data.name)
			{
				if( (item.data.name.replace("é", "e") == item_name) || (!precise_naming && (item.data.name.replace("é", "e").toLowerCase().includes(item_name)) ) )
				{
					return item;
				}
			}
		}
	}
	else if(item_category == "pokeedge")
	{
		for(let item of actor.itemTypes.pokeedge)
		{
			if(item.data.name)
			{
				if( (item.data.name.replace("é", "e") == item_name) || (!precise_naming && (item.data.name.replace("é", "e").toLowerCase().includes(item_name)) ) )
				{
					return item;
				}
			}
		}
	}
	else if(item_category == "feat")
	{
		for(let item of actor.itemTypes.feat)
		{
			if(item.data.name)
			{
				if( (item.data.name.replace("é", "e") == item_name) || (!precise_naming && (item.data.name.replace("é", "e").toLowerCase().includes(item_name)) ) )
				{
					return item;
				}
			}
		}
	}
	else if(item_category == "item")
	{
		for(let item of actor.itemTypes.item)
		{
			if(item.data.name)
			{
				if( (item.data.name.replace("é", "e") == item_name) || (!precise_naming && (item.data.name.replace("é", "e").toLowerCase().includes(item_name)) ) )
				{
					return item;
				}
			}
		}
	}
	else if(item_category == "ability")
	{
		for(let item of actor.itemTypes.ability)
		{
			if(item.data.name)
			{
				if( (item.data.name.replace("é", "e") == item_name) || (!precise_naming && (item.data.name.replace("é", "e").toLowerCase().includes(item_name)) ) )
				{
					return item;
				}
			}
		}
	}
	else if(item_category == "dexentry")
	{
		for(let item of actor.itemTypes.dexentry)
		{
			if(item.data.name)
			{
				if( (item.data.name.replace("é", "e") == item_name) || (!precise_naming && (item.data.name.replace("é", "e").toLowerCase().includes(item_name)) ) )
				{
					return item;
				}
			}
		}
	}

	
	return false;
};


export function PokemonsTrainerHasItemWithName(pokemonActor, itemName, itemType = undefined)
{
	const ownerId = pokemonActor.data.data.owner;
	const trainerActor = game.actors.get(ownerId);

	if(!trainerActor)
	{
		return 0;
	}

	if(itemType) 
	{
		return trainerActor.itemTypes[itemType].find(i => i.name == itemName);
	}
	return trainerActor.items.getName(itemName);
}


export async function IsWithinPokeballThrowRange(actor_token, target_token, pokeball)
{
	let throwing_actor = game.PTUMoveMaster.GetActorFromToken(actor_token);

	let throwRange = throwing_actor.data.data.capabilities["Throwing Range"];

	let trainerHasThrowingMasteries = game.PTUMoveMaster.ActorHasItemWithName(throwing_actor, "Throwing Masteries", "edge");
	if(trainerHasThrowingMasteries)
	{
		throwRange += 2;
	}3

	let rangeToTarget = GetDistanceBetweenTokens(actor_token, target_token);

	let rangeLimitEnabled = game.settings.get("PTUMoveMaster", "enforcePokeballRangeLimits");
	let AthleticsReducesPokeballAC = game.settings.get("PTUMoveMaster", "AthleticsReducesPokeballAC");

	let pokeballThrowAC = game.settings.get("PTUMoveMaster", "CustomPokeballAC");


	let blindness_mod = 0;
	if(throwing_actor.data.flags.ptu)
	{
		if(throwing_actor.data.flags.ptu.is_totally_blind)
		{
			blindness_mod = -10;
		}
		else if(throwing_actor.data.flags.ptu.is_blind)
		{
			blindness_mod = -6;
		}
	}
	
	let attack_mod = throwing_actor.data.data.modifiers.acBonus.total + blindness_mod;
	let trainerHasToolsOfTheTrade = game.PTUMoveMaster.ActorHasItemWithName(throwing_actor, "Tools of the Trade", "feat")

	if(trainerHasToolsOfTheTrade)
	{
		attack_mod += 2;
	}

	if(AthleticsReducesPokeballAC)
	{
		pokeballThrowAC = Math.max((pokeballThrowAC - actor_token.actor.data.data.skills.athletics.value.total), 2);
	}

	if(( throwRange < rangeToTarget) && rangeLimitEnabled )
	{
		ui.notifications.warn(`Target is ${rangeToTarget}m away, which is outside your ${throwRange}m throwing range!`);
		return false;
	}
	else
	{
		return true;
	}
}


export async function ThrowPokeball(actor_token, target_token, pokeball, pokeball_item)
{
	let item_icon_path = game.settings.get("PTUMoveMaster", "itemIconDirectory");
	
	let throwing_actor = game.PTUMoveMaster.GetActorFromToken(actor_token);

	let throwRange = throwing_actor.data.data.capabilities["Throwing Range"];

	let trainerHasThrowingMasteries = game.PTUMoveMaster.ActorHasItemWithName(throwing_actor, "Throwing Masteries", "edge");
	if(trainerHasThrowingMasteries)
	{
		throwRange += 2;
	}

	let rangeToTarget = GetDistanceBetweenTokens(actor_token, target_token);

	let rangeLimitEnabled = game.settings.get("PTUMoveMaster", "enforcePokeballRangeLimits");
	let AthleticsReducesPokeballAC = game.settings.get("PTUMoveMaster", "AthleticsReducesPokeballAC");

	let pokeballThrowAC = game.settings.get("PTUMoveMaster", "CustomPokeballAC");

	let blindness_mod = 0;
	if(throwing_actor.data.flags.ptu)
	{
		if(throwing_actor.data.flags.ptu.is_totally_blind)
		{
			// blindness_mod = 0;
			blindness_mod = -10;
		}
		else if(throwing_actor.data.flags.ptu.is_blind)
		{
			// blindness_mod = 0;
			blindness_mod = -6;
		}
	}

	let attack_mod = throwing_actor.data.data.modifiers.acBonus.total + blindness_mod;
	let trainerHasToolsOfTheTrade = game.PTUMoveMaster.ActorHasItemWithName(throwing_actor, "Tools of the Trade", "feat")

	if(trainerHasToolsOfTheTrade)
	{
		attack_mod += 2;
	}

	if(AthleticsReducesPokeballAC)
	{
		pokeballThrowAC = Math.max((pokeballThrowAC - actor_token.actor.data.data.skills.athletics.value.total), 2);
	}

	if(( throwRange < rangeToTarget) && rangeLimitEnabled )
	{
		ui.notifications.warn(`Target is ${rangeToTarget}m away, which is outside your ${throwRange}m throwing range!`);
		return "Too Far";
	}
	else
	{
		// ui.notifications.info(`Target is ${rangeToTarget}m away, which is within your ${throwRange}m throwing range!`);

		let numDice=1;
		let dieSize = "d20";

		let roll = await new Roll(`${numDice}${dieSize}-${pokeballThrowAC}+${attack_mod}`).evaluate()

		await roll.toMessage()

		function castSpell(effect) {
			canvas.specials.drawSpecialToward(effect, actor_token, target_token);
		}
		
		let TargetSpeedEvasion = target_token.actor.data.data.evasion.speed;

		if(Number(roll.total) >= TargetSpeedEvasion)
		{
			castSpell({
				file:
					item_icon_path+pokeball+".webm",
				anchor: {
					x: -0.08,
					y: 0.5,
				},
				speed: "auto",//1,
				angle: 0,
				scale: {
					x: 0.5,
					y: 0.5,
				},
			});
			ui.notifications.info(`Rolled ${roll.total} vs ${TargetSpeedEvasion}, hit!`);
			await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"pokeball_sounds/"+"pokeball_hit.mp3", volume: 0.5, autoplay: true, loop: false}, true);

			
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

			setTimeout( async () => {  await target_token.TMFXaddUpdateFilters(pokeballShoop_params); }, 800);


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
				let targetImagePath = item_icon_path+pokeball+".png";
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
			setTimeout( async () => {
				  await polymorphFunc(); 

				  let new_token_scale = Math.max((0.25/target_token.data.width), 0.2)
				  await target_token.document.update({"scale": new_token_scale});
				  setTimeout( async () => {  await target_token.TMFXaddUpdateFilters(pokeballWiggle_params); }, 3500);
			}, 1000);
			
			await RollCaptureChance(actor_token.actor, target_token.actor, pokeball, roll.terms[0].results[0].result, target_token, pokeball_item);
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

			await TokenMagic.addFilters(target_token, dodge_params);


			castSpell({
				file:
					item_icon_path+pokeball+".webm",
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
			await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"pokeball_sounds/"+"pokeball_miss.mp3", volume: 0.5, autoplay: true, loop: false}, true);
			ui.notifications.info(`Rolled ${roll.total} vs ${TargetSpeedEvasion}, miss...`);
			return "Missed"
		}
	}

	
};


export async function SpeakPokemonName(pokemon_actor)
{
	let pokemon_name_sound_path = game.settings.get("PTUMoveMaster", "pokedexNameSoundDirectory");

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
	await AudioHelper.play({src: pokemon_name_sound_path+pokedexSpeechSoundFile, volume: 0.8, autoplay: true, loop: false}, true);
};


export async function PokedexScan(trainer_token = false, target_pokemon_token = false)
{
	let currently_selected_token = game.canvas.tokens.controlled[0];
	let currently_selected_actor = currently_selected_token.actor;
	if(!trainer_token)
	{
		
		if(currently_selected_token.actor.type == "character")
		{
			trainer_token = currently_selected_token;
		}
		else if(currently_selected_token.actor.data.data.owner != "0")
		{
			trainer_token = game.PTUMoveMaster.GetTokenFromActor(game.actors.get(currently_selected_token.actor.data.data.owner));
		}
	}
	if(!target_pokemon_token)
	{
		let currently_targeted_token = Array.from(game.user.targets)[0];
		if(currently_targeted_token)
		{
			target_pokemon_token = currently_targeted_token;
		}
		else
		{
			return;
		}
	}
	let trainer_actor = trainer_token.actor;
	let target_pokemon_actor = target_pokemon_token.actor;
	let distance = GetDistanceBetweenTokens(trainer_token, target_pokemon_token)
	let pokedex_range = game.settings.get("PTUMoveMaster", "PokedexRangeLimit");
	let current_actor_to_add_DEX_entry_for;

	if(distance > pokedex_range)
	{
		ui.notifications.warn(`Target is ${distance}m away, which is past the Pokedex's scan range of ${pokedex_range}m!`);
		await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"warning.wav", volume: 0.5, autoplay: true, loop: false}, true);
		return;
	}
	if(target_pokemon_actor.data.type != "pokemon")
	{
		ui.notifications.warn(`Target is not a pokemon!`);
		await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"warning.wav", volume: 0.5, autoplay: true, loop: false}, true);
		return;
	}

	let species = target_pokemon_actor.data.data.species;
	let species_data = game.ptu.GetSpeciesData(species);
	let species_number = 0;
	if(species_data.number)
	{
		species_number = Number(species_data.number)
	}

	// for(let user of game.users)
	// {
	// 	if(!user.isGM){
	// 		if(!actorIDs.includes(user.character.id))
	// 		{
	// 			actorIDs.push(user.character.id);
	// 		}
	// 		if(!userIDs.includes(user.id))
	// 		{
	// 			userIDs.push(user.id);
	// 		} 
	// 	}
	// }

	current_actor_to_add_DEX_entry_for = trainer_actor;

	// for(let actorID of actorIDs)
	// {
	// 	current_actor_to_add_DEX_entry_for = game.actors.get(actorID);
	// 	if(current_actor_to_add_DEX_entry_for.type == "character")
	// 	{
	// 		if(!game.PTUMoveMaster.ActorHasItemWithName(current_actor_to_add_DEX_entry_for, target_pokemon_actor.data.data.species, "dexentry"))
	// 		{
	// 			await current_actor_to_add_DEX_entry_for.createOwnedItem({name: target_pokemon_actor.data.data.species, type: "dexentry", data: {
	// 				entry: "",
	// 				id: species_number,
	// 				owned: false
	// 			}});
	// 		}
	// 	}
	// }

	await current_actor_to_add_DEX_entry_for.createEmbeddedDocuments("Item", [{name: species.toLowerCase(), type: "dexentry", data: {
		entry: "",
		id: species_number,
		owned: false
	}}]);

	// if(target_pokemon_token.data.disposition == -1)
	// {
	// 	// await target_pokemon_token.document.update({"disposition": 0});
	// 	// API call
	// 	game.ptu.api.tokensUpdate({"data.disposition": Number(-1)});
	// }
	
	await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"pokedex_ding.wav", volume: 0.5, autoplay: true, loop: false}, true);
	setTimeout( async () => {  SpeakPokemonName(target_pokemon_actor); }, 800);
	// target_pokemon_token.update
	await game.PTUMoveMaster.TakeAction(trainer_actor, "Standard");
	setTimeout( async () => { await PTUAutoFight().ChatWindow(currently_selected_actor); }, 800);
	return;
};


export async function TakeAction(actor, action_type="Standard", action_subtype="N/A")
{
	if(action_type == "Standard")
	{
		let support_action = false;

		let actions;
		if(actor.data.flags && actor.data.flags.ptu && actor.data.flags.ptu.actions_taken)
		{
			actions = actor.data.flags.ptu.actions_taken;
			support_action = actions.support;
		}

		if( (support_action != true) && (action_subtype != "Physical" && action_subtype != "Special") && (game.settings.get("PTUMoveMaster", "useExtraActionHomebrew")) )
		{	// This handles the homebrew option for extra standard actions that can't be used for directly damaging moves
			if(action_subtype == "Physical")
			{
				await actor.update({ 
					"flags.ptu.actions_taken.support": true,
					"flags.ptu.actions_taken.attacked.physical": true
				});
			}
			else if(action_subtype == "Special")
			{
				await actor.update({ 
					"flags.ptu.actions_taken.support": true,
					"flags.ptu.actions_taken.attacked.special": true
				});
			}
			else if(action_subtype == "Status")
			{
				await actor.update({ 
					"flags.ptu.actions_taken.support": true,
					"flags.ptu.actions_taken.attacked.status": true
				});
			}
			else if(action_subtype == "N/A" || action_subtype == "None")
			{
				await actor.update({ "flags.ptu.actions_taken.support": true });
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
				await actor.update({ 
					"flags.ptu.actions_taken.standard": true,
					"flags.ptu.actions_taken.attacked.physical": true
				});
			}
			else if(action_subtype == "Special")
			{
				await actor.update({ 
					"flags.ptu.actions_taken.standard": true,
					"flags.ptu.actions_taken.attacked.special": true
				});
			}
			else if(action_subtype == "Status")
			{
				await actor.update({ 
					"flags.ptu.actions_taken.standard": true,
					"flags.ptu.actions_taken.attacked.status": true
				});
			}
			else if(action_subtype == "N/A" || action_subtype == "None")
			{
				await actor.update({ "flags.ptu.actions_taken.standard": true });
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
				await actor.update({ 
					"flags.ptu.actions_taken.support": true,
					"flags.ptu.actions_taken.shift": true,
					"flags.ptu.actions_taken.attacked.physical": true
				});
			}
			else if(action_subtype == "Special")
			{
				await actor.update({ 
					"flags.ptu.actions_taken.support": true,
					"flags.ptu.actions_taken.shift": true,
					"flags.ptu.actions_taken.attacked.special": true
				});
			}
			else if(action_subtype == "Status")
			{
				await actor.update({ 
					"flags.ptu.actions_taken.support": true,
					"flags.ptu.actions_taken.shift": true,
					"flags.ptu.actions_taken.attacked.status": true
				});
			}
			else if(action_subtype == "N/A" || action_subtype == "None")
			{
				await actor.update({ "flags.ptu.actions_taken.support": true, "flags.ptu.actions_taken.shift": true });
				
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
				await actor.update({ 
					"flags.ptu.actions_taken.standard": true,
					"flags.ptu.actions_taken.shift": true,
					"flags.ptu.actions_taken.attacked.physical": true
				});
			}
			else if(action_subtype == "Special")
			{
				await actor.update({ 
					"flags.ptu.actions_taken.standard": true,
					"flags.ptu.actions_taken.shift": true,
					"flags.ptu.actions_taken.attacked.special": true
				});
			}
			else if(action_subtype == "Status")
			{
				await actor.update({ 
					"flags.ptu.actions_taken.standard": true,
					"flags.ptu.actions_taken.shift": true,
					"flags.ptu.actions_taken.attacked.status": true
				});
			}
			else if(action_subtype == "N/A" || action_subtype == "None")
			{
				await actor.update({ "flags.ptu.actions_taken.standard": true, "flags.ptu.actions_taken.shift": true });
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
			await actor.update({ 
				"flags.ptu.actions_taken.swift": true,
				"flags.ptu.actions_taken.attacked.physical": true
			});
		}
		else if(action_subtype == "Special")
		{
			await actor.update({ 
				"flags.ptu.actions_taken.swift": true,
				"flags.ptu.actions_taken.attacked.special": true
			});
		}
		else if(action_subtype == "Status")
		{
			await actor.update({ 
				"flags.ptu.actions_taken.swift": true,
				"flags.ptu.actions_taken.attacked.status": true
			});
		}
		else if(action_subtype == "N/A" || action_subtype == "None")
		{
			await actor.update({ "flags.ptu.actions_taken.swift": true });
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
			await actor.update({ 
				"flags.ptu.actions_taken.shift": true,
				"flags.ptu.actions_taken.attacked.physical": true
			});
		}
		else if(action_subtype == "Special")
		{
			await actor.update({ 
				"flags.ptu.actions_taken.shift": true,
				"flags.ptu.actions_taken.attacked.special": true
			});
		}
		else if(action_subtype == "Status")
		{
			await actor.update({ 
				"flags.ptu.actions_taken.shift": true,
				"flags.ptu.actions_taken.attacked.status": true
			});
		}
		else if(action_subtype == "N/A" || action_subtype == "None")
		{
			await actor.update({ "flags.ptu.actions_taken.shift": true });
		}
		else
		{
			ui.notifications.warn("Something has gone terribly wrong, no action subtype specified, even the default.");
		}
	}
};


export async function ResetActionEconomy(actor, silent=true)
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


export async function RollCaptureChance(trainer, target, pokeball, to_hit_roll, target_token, pokeball_item)
{
	// console.log("ROLLING CAPTURE CHANCE");
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
	let TargetVolatileConditionCount = 0;
	let TargetPersistentConditionCount = 0;

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

	let flags = target.data.flags.ptu;

	if(flags)
	{
		if(flags.is_burned == "true")
		{
			TargetPersistentConditionCount++;
		}
		if(flags.is_frozen == "true")
		{
			TargetPersistentConditionCount++;
		}
		if(flags.is_paralyzed == "true")
		{
			TargetPersistentConditionCount++;
		}
		if(flags.is_poisoned == "true")
		{
			TargetPersistentConditionCount++;
		}
		if(flags.is_badly_poisoned == "true")
		{
			TargetPersistentConditionCount++;
		}

		if(flags.is_confused == "true")
		{
			TargetVolatileConditionCount++;
		}
		if(flags.is_cursed == "true")
		{
			TargetVolatileConditionCount++;
		}
		if(flags.is_disabled == "true")
		{
			TargetVolatileConditionCount++;
		}
		if(flags.is_raging == "true")
		{
			TargetVolatileConditionCount++;
		}
		if(flags.is_flinched == "true")
		{
			TargetVolatileConditionCount++;
		}
		if(flags.is_infatuated == "true")
		{
			TargetVolatileConditionCount++;
		}
		if(flags.is_sleeping == "true")
		{
			TargetVolatileConditionCount++;
		}
		if(flags.is_badly_sleeping == "true")
		{
			TargetVolatileConditionCount++;
		}
		if(flags.is_suppressed == "true")
		{
			TargetVolatileConditionCount++;
		}

		if(flags.is_stuck == "true")
		{
			CaptureRate += 10;
		}

		if(flags.is_slowed == "true")
		{
			CaptureRate += 5;
		}
	}

	CaptureRate += (TargetVolatileConditionCount * 5);
	CaptureRate += (TargetPersistentConditionCount * 10);

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
	
	if(pokeball_stats[pokeball]["Conditional Modifier"] && pokeball_stats[pokeball]["Conditions"])
	{


		const result = await new Promise((resolve, reject) => {
            //Do the blocking action, f.e. 
            const dialog = new Dialog({
            title: "Pokeball conditions?",
            content: ("Is this Pokeball's special condition fulfilled? \n"+pokeball_stats[pokeball]["Conditions"]),
            buttons: {
                yes: {
                    label: "Yes",
                    callback: () => resolve(true)
                },
                no: {
                    label: "No",
                    callback: () => resolve(false)
                }
            },
            // Rejects throws an error and will therefore cancel the execution of the rest of the code. In this case, if dialog is exited without selecting an option, don't continue.
            close: () => reject
            })
            dialog.render(true);
        });

        if(result)
        {
            CaptureRollModifier += pokeball_stats[pokeball]["Conditional Modifier"];
        }
		else
		{
			CaptureRollModifier += pokeball_stats[pokeball]["Base Modifier"];
		}
	}
	else
	{
		CaptureRollModifier += pokeball_stats[pokeball]["Base Modifier"];
	}
	
	CaptureRate -= PokemonLevel*2;

	let PokemonHitPoints = target.data.data.health.value;
	let PokemonHealthPercent = target.data.data.health.percent;

	if (PokemonHitPoints == 1)
	{
		CaptureRate = CaptureRate + 30;
	}
	else if (PokemonHealthPercent <= 25)
	{
		CaptureRate = CaptureRate + 15;
	}
	else if (PokemonHealthPercent <= 50)
	{
		CaptureRate = CaptureRate + 0;
	}
	else if (PokemonHealthPercent <= 75)
	{
		CaptureRate = CaptureRate - 15;
	}
	else if (PokemonHealthPercent > 75)
	{
		CaptureRate = CaptureRate - 30;
	}

	let PokemonShiny = target.data.data.shiny;

	if (PokemonShiny)
	{
		CaptureRate = CaptureRate - 10;
	}

	let PokemonLegendary = target.data.data.legendary;

	if (PokemonLegendary)
	{
		CaptureRate = CaptureRate - 30;
	}

	if(evolutionsLeft == 2)
	{
		CaptureRate = CaptureRate + 10;
	}
	else if(evolutionsLeft == 0)
	{
		CaptureRate = CaptureRate - 10;
	}

	CaptureRate = CaptureRate + (target.data.data.health.injuries * 5)

	let numDice=1;
	let dieSize = "d100";

	let roll = await new Roll(`${numDice}${dieSize}+${CaptureRollModifier}`).roll()

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
		let item_icon_path = game.settings.get("PTUMoveMaster", "itemIconDirectory");
		let transitionType = 9;
		let targetImagePath = item_icon_path+pokeball+".png";
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

	await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"pokeball_sounds/"+"pokeball_catch_attempt.mp3", volume: 0.5, autoplay: true, loop: false}, true);

	setTimeout( async () => {  
		chatMessage(target, ("Pokeball hit! The ball wiggles..."));
		// ui.notifications.info(`The ball wiggles!`);
		await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"pokeball_sounds/"+"pokeball_escape_attempt.mp3", volume: 1.0, autoplay: true, loop: false}, true);
		
		setTimeout( async () => {  
			await roll.toMessage();
			if(Number(roll._total) <= CaptureRate)
			{
				await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"pokeball_sounds/"+"pokeball_catch_confirmed.mp3", volume: 0.8, autoplay: true, loop: false}, true);
				chatMessage(target, (target.name + " was captured! Capture DC was " + CaptureRate + ", and you rolled "+Number(roll._total)+"!"));

				target_token.TMFXdeleteFilters("pokeballWiggle");
				const strength = window.confetti.confettiStrength.high;
  				const shootConfettiProps = window.confetti.getShootConfettiProps(strength);
				
				let users = trainer.data.permission
				let non_gm_user;
				let pokemon_parent_actor = game.actors.get(target_token.data.actorId);

				for(let user in users)
				{
					let user_object = game.users.get(user);
					if(user_object)
					{
						if(user_object.data.role < 4)
						{
							non_gm_user = user_object;
							break;
						}
					}
					
				}

				let current_target = game.actors.get(target_token.data.actorId);

				await game.ptu.api.transferOwnership(current_target, {pokeball:pokeball, timeout:15000, permission:{[non_gm_user.data._id]: CONST.ENTITY_PERMISSIONS.OWNER}});

				setTimeout( async () => {  window.confetti.shootConfetti(shootConfettiProps); }, 750);//364);
				setTimeout( async () => {  
					await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"pokeball_sounds/"+"pokeball_success_jingle.wav", volume: 0.8, autoplay: true, loop: false}, true);
				}, 750);

				game.PTUMoveMaster.RemoveThrownPokeball(trainer, pokeball_item);

				let species = current_target.data.data.species;
				let species_data = game.ptu.GetSpeciesData(species);
				let species_number = 0;
				if(species_data.number)
				{
					species_number = Number(species_data.number)
				}

				let current_actor_to_add_DEX_entry_for = trainer;

				if(game.PTUMoveMaster.ActorHasItemWithName(current_actor_to_add_DEX_entry_for, species.toLowerCase(), "dexentry"))
				{
					for(let item of current_actor_to_add_DEX_entry_for.itemTypes.dexentry)
					{
						if(item.data.name)
						{
							if( (item.data.name.replace("é", "e") == species.toLowerCase()) || (item.data.name.replace("é", "e").toLowerCase().includes(species.toLowerCase())) )
							{
								item.update(
									{
										name: species.toLowerCase(), 
										type: "dexentry", 
										data: 
										{
											entry: "",
											id: species_number,
											owned: true
										}
									}
								);
								break;
							}
						}
					}
				}
				else
				{
					await current_actor_to_add_DEX_entry_for.createOwnedItem({name: species.toLowerCase(), type: "dexentry", data: {
						entry: "",
						id: species_number,
						owned: true
					}});
				}
				
			}
			else
			{
				setTimeout( async () => {  target_token.TMFXaddUpdateFilters(pokeballShoop_params); }, 800);
				setTimeout( async () => {  
					polymorphFunc(); 
					setTimeout( async () => { target_token.document.update({"scale": 1}); 
					target_token.TMFXdeleteFilters("pokeball");
					}, 1000);
				}, 500);
				await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"pokeball_sounds/"+"pokeball_release.mp3", volume: 0.5, autoplay: true, loop: false}, true);
				chatMessage(target, (target.name + " escaped the "+pokeball+"! Capture DC was " + CaptureRate + ", and you rolled "+Number(roll._total)+"."));
				target_token.TMFXdeleteFilters("pokeballWiggle");

				game.PTUMoveMaster.BreakPokeball(trainer, pokeball_item);
			}
		}, 8000);
	}, 4000);
};


export async function PokeballRelease(token)
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

	await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"pokeball_sounds/"+"pokeball_release.mp3", volume: 0.5, autoplay: true, loop: false}, true);
	token.TMFXaddUpdateFilters(pokeballShoop_params);
	token.document.update({"scale": 1});
	token.TMFXdeleteFilters("pokeballWiggle");
	token.TMFXdeleteFilters("pokeball");
};


export async function ThisPokemonsTrainerCommandCheck(pokemon_actor)
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
		let commanding_skill_rank = (trainer_actor.data.data.skills[commanding_skill].value.total);
		
		for(let alternate_commanding_skill_feature in alternate_commanding_skill_features)
		{
			for(let item of trainer_actor.items)
			{
				if((item.type == "edge" || item.type == "feat") && item.name == alternate_commanding_skill_feature)
				{
					if(eval(
						'trainer_actor.data.data.skills.'+alternate_commanding_skill_features[alternate_commanding_skill_feature]
						).value.total > commanding_skill_rank)
					{
						commanding_skill = alternate_commanding_skill_features[alternate_commanding_skill_feature];
						commanding_skill_rank = trainer_actor.data.data.skills[alternate_commanding_skill_features[alternate_commanding_skill_feature]].value.total;
					}
					break;
				}
			}
		}	

		let numDice=commanding_skill_rank;
		let dieSize = "d6";
		let dieModifier = (trainer_actor.data.data.skills[commanding_skill].modifier.total);

		let roll= await new Roll(`${numDice}${dieSize}+${dieModifier}`).roll()
		await roll.toMessage(
			{flavor: `${trainer_actor.name} attempts a ${commanding_skill} check to control a disloyal pokemon.`,
			speaker: ChatMessage.getSpeaker({token: trainer_actor}),}
		)

		if((roll.total) < command_DC)
		{
			return_value = false;
		}
	}

	return return_value;
};


export async function ShowPokeballMenu(actor)
{
	let item_icon_path = game.settings.get("PTUMoveMaster", "itemIconDirectory");

	await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+UIPopupSound, volume: 0.8, autoplay: true, loop: false}, false);
	await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"pokeball_sounds/pokeball_grow.mp3", volume: 0.8, autoplay: true, loop: false}, false);
	let pokeball_inventory = [];
	let pokeball_buttons = [];

	let target_pokemon_token = Array.from(game.user.targets)[0];

	let trainer_tokens = actor.getActiveTokens();
	let actor_token = trainer_tokens[0]; // The throwing trainer

	for(let item of actor.items)
	{
		if(item.type == "item" && item.name.includes("Ball"))
		{
			pokeball_inventory.push(item);
		}
	}

	for(let pokeball of pokeball_inventory)
	// for(let pokeball of actor.items_categorized.PokeBalls)
	{
		let pokeball_image = "";
		let pokeball_count = pokeball.data.data.quantity;
		if(!pokeball_count)
		{
			pokeball_count = 0;
		}

		for(let i=0; (i < pokeball_count) && (i < 10); i++)
		{
			if(pokeball.name.includes("Thrown"))
			{//filter: sepia(100%) saturate(300%) brightness(70%) hue-rotate(180deg);
				let pokeball_name_without_thrown = pokeball.name.replace("Thrown ", "");
				pokeball_image = pokeball_image + "<img src='"+item_icon_path+pokeball_name_without_thrown+".png' style='border-width: 0px; height: 30px; filter: saturate(0%) opacity(50%) brightness(100%);'></img>";
			}
			else if(pokeball.name.includes("Broken"))
			{//filter: sepia(100%) saturate(300%) brightness(70%) hue-rotate(180deg);
				let pokeball_name_without_broken = pokeball.name.replace("Broken ", "");
				pokeball_image = pokeball_image + "<img src='"+item_icon_path+pokeball_name_without_broken+".png' style='border-width: 0px; height: 30px; filter: sepia(100%) saturate(150%) brightness(100%);'></img>";
			}
			else
			{
				pokeball_image = pokeball_image + "<img src='"+item_icon_path+pokeball.name+".png' style='border-width: 0px; height: 30px;'></img>";
			}
		}

		pokeball_buttons[pokeball.name]={
			label: "<center><div style='background-color:"+ MoveButtonBackgroundColor +";color:"+ MoveButtonTextColor +"; padding-left: 0px ;width:167px;height:"+Number(ButtonHeight)+"px;font-size:20px;font-family:Modesto Condensed;line-height:0.8'><h3 style='padding: 0px;font-family:Modesto Condensed;font-size:20px; color: white; background-color: #272727 ; overflow-wrap: normal ! important; word-break: keep-all ! important;'><div style='padding-top:2px'>"+pokeball.name+" ("+pokeball_count+")</div>"+"</h3>"+pokeball_image+"<h6 style='padding-top: 4px;padding-bottom: 0px;font-size:"+RangeFontSize+"px;'>"+"</h6>"+"</div></center>",
			callback: async () => {

				if(!target_pokemon_token || target_pokemon_token.actor.data.type != "pokemon" || target_pokemon_token.actor.data.data.owner != "0")
				{
					ui.notifications.warn("You must target an unowned Pokemon to throw a Pokeball");
					await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"warning.wav", volume: 0.5, autoplay: true, loop: false}, true);
					return;
				}

				if(await game.PTUMoveMaster.IsWithinPokeballThrowRange(actor_token, target_pokemon_token, pokeball.name))
				{
					if(await ExpendItem(actor, pokeball))
					{
						await game.PTUMoveMaster.ThrowPokeball(actor_token, target_pokemon_token, pokeball.name, pokeball);
					}
					else
					{
						await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"warning.wav", volume: 0.5, autoplay: true, loop: false}, true);
					}
				}
				else
				{
					await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"warning.wav", volume: 0.5, autoplay: true, loop: false}, true);
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
	await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+UIPopupSound, volume: 0.8, autoplay: true, loop: false}, false);
	let item_buttons = [];
	let item_inventory = [];

	let target = Array.from(game.user.targets)[0];
	if(!target)
	{
		target = game.actors.get(actor.id).getActiveTokens()[0];
	}

	let targetTypingText = game.PTUMoveMaster.GetTargetTypingHeader(target, actor);
	let background_field_URL = await game.PTUMoveMaster.GetCurrentFieldImageURL();
	let background_field = "style='background-image: url('"+background_field_URL+"');'";

	let trainer_tokens = actor.getActiveTokens();
	let actor_token = trainer_tokens[0]; // The using actor

	let relevant_item_types = [
		"Potion", "Revive", "Antidote", "Repel", "Cure", "Heal", "Bait"
	];

	// for(let item_type of relevant_item_types)
	// {
		for(let item of actor.items)
		{
			// console.log("item: ");
			// console.log(item);
			if(item.data.type == "item" && !item.data.name.includes(" Ball"))
			{
				item_inventory.push(item);
			}
		}
	// }

	for(let inventory_item of item_inventory)
	// for(let inventory_item of actor.items_categorized.Medical)
	{
		// console.log("inventory_item: ");
		// console.log(inventory_item);
		let item_base_image = await game.PTUMoveMaster.GetItemArt(inventory_item.name);
		let item_image = "";
		let item_count = inventory_item.data.data.quantity;
		if(!item_count)
		{
			item_count = 0;
		}
		
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
					await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"warning.wav", volume: 0.5, autoplay: true, loop: false}, true);
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


export async function ShowManeuverMenu(actor)
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
			"Success":"You must make an Acrobatics or Athletics Check, with a DC equal to three times the number of meters they have to move to reach the triggering Ally; If you succeed, you Push the triggering Ally 1 Meter away from you, and Shift to occupy their space, and are hit by the triggering attack. On Failure to make the Check, the user still Shifts a number of meters equal a third of their check result. Note: If the target that was Intercepted was hit by an Area of Effect Move, and the 1 meter push does not remove them from the Area of Effect, the Intercept has no effect since they are still in the area of the attack - it would cause the Interceptor to be hit by the Move however. <br><br>Additional Rules: <br>» Pokémon and Trainers may only Intercept against Priority and Interrupt Moves if they are faster than the user of those Moves. <br>» Moves that cannot miss (such as Aura Sphere or Swift) cannot be Intercepted.<br>» Pokémon and Trainers cannot attempt Intercepts if they are Asleep, Confused, Enraged, Frozen, Stuck, Paralyzed, or otherwise unable to move.<br>» Intercepts may not be used to move the Intercepting Pokémon or Trainer OUT of the way of an attack. They will always be hit, regardless.",
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
	let originalEffectText;
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
		// console.log(maneuver);

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
		originalEffectText = currentEffectText;
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

		// console.log("currentTargetChecks");
		// console.log(currentTargetChecks);


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
		let user_check_rank = 0;

		if(currentTargetChecks[0])
		{
			let user_check_skill = "";
			user_check_rank = 0;
			let user_check_modifier = 0;

			// console.log("currentUserChecks");
			// console.log(currentUserChecks);

			for(let check of currentUserChecks)
			{
				// console.log("check");
				// console.log(check);

				let check_skill_rank;
				let check_skill_modifier;

				eval("check_skill_rank = actor.data.data.skills."+check+".value.total;");
				eval("check_skill_modifier = actor.data.data.skills."+check+".modifier.total;");

				// console.log("check_skill_rank");
				// console.log(check_skill_rank);

				if(check_skill_rank > user_check_rank)
				{
					user_check_skill = check;
					user_check_rank = check_skill_rank;
					user_check_modifier = check_skill_modifier;
				}
			}

			let checkDieSize = "d6";
			let user_check_roll = await new Roll(`${user_check_rank}${checkDieSize}+${user_check_modifier}`).roll()
			// console.log("user_check_roll");
			// console.log(user_check_roll);

			let currentTargetCheckText = '<button class="skill-button-1" style="font-family:Segoe UI; font-size: 14; padding:0px !important; margin-top:5px !important; margin-bottom:5px !important; background-color:#808080;" id="Target Check 1" type="button" value="Target Check 1" data-skill='+currentTargetChecks[0]+'>'+(currentTargetChecks[0])+'</button>';

			if(currentTargetChecks[1] != null)
			{
				currentTargetCheckText += (' or <button class="skill-button-2" style="font-family:Segoe UI; font-size: 14; padding:0px !important; margin-top:5px !important; margin-bottom:5px !important; background-color:#808080;" id="Target Check 1" type="button" value="Target Check 1" data-skill='+currentTargetChecks[1]+'>'+(currentTargetChecks[1])+'</button><button class="skill-button-both" style="font-family:Segoe UI; font-size: 14; padding:0px !important; margin-top:5px !important; margin-bottom:5px !important; background-color:#808080;" id="Target Check Both" type="button" value="Target Check Both" data-skill1='+currentTargetChecks[0]+' data-skill2='+currentTargetChecks[1]+'>Auto Roll Best</button>');
			}
	
			currentEffectText = "If the move hits, "+actor.name+" rolled<br><br><center>[["+user_check_roll.total+"]]</center><br><br>on a "+user_check_skill+" check vs the target's opposed "+currentTargetCheckText+" check. If successful,<br>"+currentEffectText;

		}
		else if(currentUserChecks[0])
		{
			let user_check_skill = "";
			let user_check_rank = 0;
			let user_check_modifier = 0;

			// console.log("currentUserChecks");
			// console.log(currentUserChecks);

			for(let check of currentUserChecks)
			{
				// console.log("check");
				// console.log(check);

				let check_skill_rank;
				let check_skill_modifier;

				eval("check_skill_rank = actor.data.data.skills."+check+".value.total;");
				eval("check_skill_modifier = actor.data.data.skills."+check+".modifier.total;");

				// console.log("check_skill_rank");
				// console.log(check_skill_rank);

				if(check_skill_rank > user_check_rank)
				{
					user_check_skill = check;
					user_check_rank = check_skill_rank;
					user_check_modifier = check_skill_modifier;
				}
			}

			let checkDieSize = "d6";
			let user_check_roll = await new Roll(`${user_check_rank}${checkDieSize}+${user_check_modifier}`).roll()
			// console.log("user_check_roll");
			// console.log(user_check_roll);

			currentEffectText = actor.name+" rolled<br><br><center>[["+user_check_roll+"]]</center><br><br>on a "+user_check_skill+" check vs the DC.<br>"+currentEffectText;
		}

		let created_move_item = {
			name:maneuver,
			data:{
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
			}
		};
		let this_actor = canvas.tokens.controlled[0].actor;

		var moveSoundFile = ("struggle.mp3");


		effectivenessBackgroundColor = SkillRankNumberColors[user_check_rank];
		// console.log("MANEUVER DEBUG: _________________ effectivenessBackgroundColor ______________");
		// console.log(effectivenessBackgroundColor);


		maneuver_buttons[maneuver] = {
			noRefresh: false,
			id: maneuver,
			label: "<center><div style='background-color:"+ MoveButtonBackgroundColor +";color:"+ MoveButtonTextColor +";border-left:"+EffectivenessBorderThickness+"px solid; border-color:"+effectivenessBackgroundColor+"; padding-left: 0px ;padding-top: 0px !important;width:200px;height:"+Number(ButtonHeight-20)+"px;font-size:20px;font-family:Modesto Condensed;line-height:1;'><h3 style='padding: 0px;font-family:Modesto Condensed;font-size:20px; color: white; background-color: #272727 ; overflow-wrap: normal ! important; word-break: keep-all ! important;'><div style='padding-top:5px'title='"+(originalEffectText).replace("'","&#39;")+"'>"+currentlabel+"</div>"/*+currentCooldownLabel*/+currentMoveTypeLabel+"</h3>"+STABBorderImage+DBBorderImage+"<h6 style='padding-top: 4px;padding-bottom: 0px;font-size:"+RangeFontSize+"px;'>"+currentMoveRangeIcon+effectivenessText+"</h6>"+"</div></center>",
			callback: async () => {

				let command_check_result = await game.PTUMoveMaster.ThisPokemonsTrainerCommandCheck(this_actor);
				if(!command_check_result)
				{
					game.PTUMoveMaster.chatMessage(this_actor, "But they did not obey!")
					return;
				}
				let key_shift = game.keyboard.downKeys.has("ShiftLeft");
				if (key_shift) 
				{
					// console.log("KEYBOARD SHIFT IS DOWN!");
					game.PTUMoveMaster.rollDamageMoveWithBonus(this_actor , created_move_item, maneuver, finalDB, false);
				}
				else
				{
					game.PTUMoveMaster.RollDamageMove(this_actor, created_move_item, maneuver, finalDB, false, 0);
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
					await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+heal_sound_file, volume: 0.8, autoplay: true, loop: false}, true);
				}
				else
				{
					await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+moveSoundFile, volume: 0.8, autoplay: true, loop: false}, true);
				}
			}
		};
	}

	maneuver_buttons["pokedexBottomBuffer"] = {noRefresh: true, id:"pokedexBottomBuffer", label: "<div class='pokedex-bottom-filler' style='border:none'></div>",
		callback: () => {
	}};

	// console.log("______________ MANEUVER BUTTONS ______________");
	// console.log(maneuver_buttons);

	var hasPokedex = false;
	if(actor.type == "character")
	{
		hasPokedex = game.PTUMoveMaster.ActorHasItemWithName(actor, "Pokedex", "item");
	}
	else
	{
		if(actor.data.data.owner!= "0")
		{
			hasPokedex = game.PTUMoveMaster.ActorHasItemWithName( (game.actors.get(actor.data.data.owner)), "Pokedex", "item");
		}
	}

	let background_field_URL = await game.PTUMoveMaster.GetCurrentFieldImageURL();
	let background_field = 'background-image: url("'+background_field_URL+'"); background-repeat: repeat-x; background-position: left bottom';

	let current_weather = game.settings.get("PTUMoveMaster", "currentWeather");
	let weather_icon = "weather_icon_"+current_weather+".png";

	let pokedex_text = "Unidentified Pokemon - Click to Scan!";
		let pokedex_camera_icon = "Pokedex_Camera.png";
		

	let actor_has_target_dex_entry = false;

	if(target)
	{
		if(target.actor.data.data.species)
		{
			actor_has_target_dex_entry = game.PTUMoveMaster.ThisActorOrTheirTrainerHasDexEntry(actor, target.actor.data.data.species);
			if(game.user.isGM)
			{
				actor_has_target_dex_entry = true;
			}
		}
	}
	else
	{
		pokedex_camera_icon = "Pokedex_Camera_Scanned.png";
		pokedex_text = "Pokedex: No Pokemon Targeted"
	}

	if(target.actor.type == "character")
	{
		pokedex_camera_icon = "Pokedex_Camera_Scanned.png";
		pokedex_text = "Pokedex: No Pokemon Targeted"
	}
	else if(target && actor_has_target_dex_entry)
	{
		pokedex_camera_icon = "Pokedex_Camera_Scanned.png";
		pokedex_text = "Pokedex: Known Pokemon Species: "+target.actor.data.data.species;
	}

	let pokedex_camera_button = "<input title='"+pokedex_text+"' type='image' src='"+AlternateIconPath+pokedex_camera_icon+"' name='saveForm' class='pokedex-top-camera' id='saveForm' />";

	if(!hasPokedex)
	{
		pokedex_text = "Pokedex: No Pokedex in Trainer`s Inventory!"
		pokedex_camera_button = "<input title='"+pokedex_text+"' type='image' src='"+AlternateIconPath+pokedex_camera_icon+"' name='saveForm' class='pokedex-top-camera-disabled' id='saveForm' />";
	}

	let dialogueID = "ptu-sidebar";
	let content = "<img class='pokedex-top' src='"+AlternateIconPath+"NewPokedex_Vertical_Top_200.png"+"'></img>\
		<center>"+pokedex_camera_button+"</img></center>\
		<style> #"+dialogueID+" .dialog-buttons \
			{\
				background-color:"+ MoveButtonBackgroundColor +";\
				flex-direction: column; \
				padding: 0px !important; \
				border-width: 0px !important; \
				margin: 0px !important; \
				border: none !important;\
			} #"+dialogueID+" .dialog-button \
			{\
				background-color:"+ MoveButtonBackgroundColor +";\
				flex-direction: column; \
				padding: 0px !important; \
				border-width: 0px !important; \
				margin-top: 3px !important; \
				margin-bottom: 3px !important; \
				margin-left: 0px !important; \
				margin-right: 0px !important; \
				border: none !important; \
				width: 200px\
			} #"+dialogueID+" .dialog-content \
			{\
				background-color:"+ MoveButtonBackgroundColor +";\
				flex-direction: column; \
				padding: 0px !important; \
				border-width: 0px !important; \
				margin: 0px !important; \
				width: 200px !important; \
				height: auto !important;\
			} #"+dialogueID+" .window-content \
			{\
				;flex-direction: column; \
				padding: 0px !important; \
				border-width: 0px !important; \
				margin: 0px !important; \
				width: 200px !important;\
			} #"+dialogueID+".app.window-app.MoveMasterSidebarDialog \
			{\
				background-color:"+ MoveButtonBackgroundColor +";\
				flex-direction: column; \
				padding: 0px !important; \
				border-width: 0px !important; \
				margin: 0px !important; \
				width: 200px !important;\
			}\
		</style>\
		<center>\
			<h2 style='margin-bottom: 10px;'>\
				"+ targetTypingText+"\
			</h2>\
			<div class='cameraframe-terrain' style='"+background_field+";\
			font-family:Modesto Condensed;\
			font-size:20px'>\
			</div>\
		</center>\
		<img class='pokedex-bottom' src='"+AlternateIconPath+"NewPokedex_Vertical_Bottom_200.png"+"'></img>\
		<center><img class='pokedex-bottom-weather' title='Current Weather: "+current_weather+"' src='"+AlternateIconPath+weather_icon+"'></img></center>";
	game.PTUMoveMaster.MoveMasterSidebar = new game.PTUMoveMaster.SidebarForm({content, buttons: maneuver_buttons, dialogueID, classes: "ptu-sidebar"});
	game.PTUMoveMaster.MoveMasterSidebar.render(true);


	/////////////////////////////////////////////////////////
}

export async function ShowSkillsMenu(actor)
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

				// await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+UIButtonClickSound, volume: 0.5, autoplay: true, loop: false}, true);
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
		// console.log(skill);

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

				let roll = await new Roll(`${numDice}${dieSize}+${dieModifier}`).roll()
				await roll.toMessage(
					{flavor: `${actor.name} attempts a ${skill} check.`,
					speaker: ChatMessage.getSpeaker({token: actor}),}
				)

				await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+moveSoundFile, volume: 0.8, autoplay: true, loop: false}, true);
			}
		};
	}

	skill_buttons["pokedexBottomBuffer"] = {noRefresh: true, id:"pokedexBottomBuffer", label: "<div class='pokedex-bottom-filler' style='border:none'></div>",
		callback: () => {
	}};

	// console.log("______________ SKILL BUTTONS ______________");
	// console.log(skill_buttons);

	var hasPokedex = false;
	if(actor.type == "character")
	{
		hasPokedex = game.PTUMoveMaster.ActorHasItemWithName(actor, "Pokedex", "item");
	}
	else
	{
		if(actor.data.data.owner!= "0")
		{
			hasPokedex = game.PTUMoveMaster.ActorHasItemWithName( (game.actors.get(actor.data.data.owner)), "Pokedex", "item");
		}
	}

	let background_field_URL = await game.PTUMoveMaster.GetCurrentFieldImageURL();
	let background_field = 'background-image: url("'+background_field_URL+'"); background-repeat: repeat-x; background-position: left bottom';

	let current_weather = game.settings.get("PTUMoveMaster", "currentWeather");
	let weather_icon = "weather_icon_"+current_weather+".png";

	let pokedex_text = "Unidentified Pokemon - Click to Scan!";
		let pokedex_camera_icon = "Pokedex_Camera.png";
		

	let actor_has_target_dex_entry = false;

	if(target)
	{
		if(target.actor.data.data.species)
		{
			actor_has_target_dex_entry = game.PTUMoveMaster.ThisActorOrTheirTrainerHasDexEntry(actor, target.actor.data.data.species);
			if(game.user.isGM)
			{
				actor_has_target_dex_entry = true;
			}
		}
	}
	else
	{
		pokedex_camera_icon = "Pokedex_Camera_Scanned.png";
		pokedex_text = "Pokedex: No Pokemon Targeted"
	}

	if(target.actor.type == "character")
	{
		pokedex_camera_icon = "Pokedex_Camera_Scanned.png";
		pokedex_text = "Pokedex: No Pokemon Targeted"
	}
	else if(target && actor_has_target_dex_entry)
	{
		pokedex_camera_icon = "Pokedex_Camera_Scanned.png";
		pokedex_text = "Pokedex: Known Pokemon Species: "+target.actor.data.data.species;
	}

	let pokedex_camera_button = "<input title='"+pokedex_text+"' type='image' src='"+AlternateIconPath+pokedex_camera_icon+"' name='saveForm' class='pokedex-top-camera' id='saveForm' />";

	if(!hasPokedex)
	{
		pokedex_text = "Pokedex: No Pokedex in Trainer`s Inventory!"
		pokedex_camera_button = "<input title='"+pokedex_text+"' type='image' src='"+AlternateIconPath+pokedex_camera_icon+"' name='saveForm' class='pokedex-top-camera-disabled' id='saveForm' />";
	}

	let dialogueID = "ptu-sidebar";
	let content = "<img class='pokedex-top' src='"+AlternateIconPath+"NewPokedex_Vertical_Top_200.png"+"'></img>\
		<center>"+pokedex_camera_button+"</img></center>\
		<style> #"+dialogueID+" .dialog-buttons \
			{\
				background-color:"+ MoveButtonBackgroundColor +";\
				flex-direction: column; \
				padding: 0px !important; \
				border-width: 0px !important; \
				margin: 0px !important; \
				border: none !important;\
			} #"+dialogueID+" .dialog-button \
			{\
				background-color:"+ MoveButtonBackgroundColor +";\
				flex-direction: column; \
				padding: 0px !important; \
				border-width: 0px !important; \
				margin-top: 3px !important; \
				margin-bottom: 3px !important; \
				margin-left: 0px !important; \
				margin-right: 0px !important; \
				border: none !important; \
				width: 200px\
			} #"+dialogueID+" .dialog-content \
			{\
				background-color:"+ MoveButtonBackgroundColor +";\
				flex-direction: column; \
				padding: 0px !important; \
				border-width: 0px !important; \
				margin: 0px !important; \
				width: 200px !important; \
				height: auto !important;\
			} #"+dialogueID+" .window-content \
			{\
				;flex-direction: column; \
				padding: 0px !important; \
				border-width: 0px !important; \
				margin: 0px !important; \
				width: 200px !important;\
			} #"+dialogueID+".app.window-app.MoveMasterSidebarDialog \
			{\
				background-color:"+ MoveButtonBackgroundColor +";\
				flex-direction: column; \
				padding: 0px !important; \
				border-width: 0px !important; \
				margin: 0px !important; \
				width: 200px !important;\
			}\
		</style>\
		<center>\
			<h2 style='margin-bottom: 10px;'>\
				"+ targetTypingText+"\
			</h2>\
			<div class='cameraframe-terrain' style='"+background_field+";\
			font-family:Modesto Condensed;\
			font-size:20px'>\
			</div>\
		</center>\
		<img class='pokedex-bottom' src='"+AlternateIconPath+"NewPokedex_Vertical_Bottom_200.png"+"'></img>\
		<center><img class='pokedex-bottom-weather' title='Current Weather: "+current_weather+"' src='"+AlternateIconPath+weather_icon+"'></img></center>";
	game.PTUMoveMaster.MoveMasterSidebar = new game.PTUMoveMaster.SidebarForm({content, buttons: skill_buttons, dialogueID, classes: "ptu-sidebar"});
	game.PTUMoveMaster.MoveMasterSidebar.render(true);
}


export async function ShowStruggleMenu(actor)
{
	let struggle_types = ["Normal"];
	let struggle_categories = ["Physical"];

	let struggle_AC = 4;
	let struggle_DB = 4;

	let actor_combat_rank = actor.data.data.skills.combat.value;
	let showEffectivenessMode = game.settings.get("PTUMoveMaster", "showEffectiveness");

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

	// console.log(struggle_list);

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

				// await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+UIButtonClickSound, volume: 0.5, autoplay: true, loop: false}, true);
				PTUAutoFight().ChatWindow(actor);
				}
			};


	struggle_buttons["struggleDivider"] = {noRefresh: true, id:"struggleDivider", label: "<img src='"+AlternateIconPath+"DividerIcon_StruggleOptions.png' style='border:none; width:200px;'>",
		callback: () => {

		}};

	for(let struggle in struggle_list)
	{
		// console.log(struggle);

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

		let actor_has_target_dex_entry = false;

		if(target)
		{
			if(target.actor.data.data.species)
			{
				actor_has_target_dex_entry = game.PTUMoveMaster.ThisActorOrTheirTrainerHasDexEntry(actor, target.actor.data.data.species);
				if(game.user.isGM)
				{
					actor_has_target_dex_entry = true;
				}
			}
		}
		
		if(currentCategory == "Physical" || currentCategory == "Special")
		{
			if( (game.settings.get("PTUMoveMaster", "showEffectiveness") != "never") && (target) && (!isNaN(currentDamageBase)) && (currentDamageBase != "") && effectiveness)
			{
				// if((target.data.disposition > DISPOSITION_HOSTILE) || (game.settings.get("PTUMoveMaster", "showEffectiveness") == "always") )
				if(
					(
						(target.data.disposition > DISPOSITION_HOSTILE)
						&& (showEffectivenessMode == "neutralOrBetter")
					) 
					|| 
					(
						actor_has_target_dex_entry
						&& (showEffectivenessMode == "dex")
					)
					||
					(showEffectivenessMode == "always")
					||
					(game.user.isGM)
				)
				{
					currentEffectivenessLabel = " (x"+effectiveness[currentType]+")";
					effectivenessBackgroundColor = EffectivenessColors[effectiveness[currentType]];
					// if (effectiveness[currentType] == 0.5)
					// {
					// 	effectivenessBackgroundColor = "#cc6666";
					// }
					// else if (effectiveness[currentType] == 1)
					// {
					// 	effectivenessBackgroundColor = "white";
					// 	effectivenessTextColor = "black";
					// }
					// else if (effectiveness[currentType] == 0.25)
					// {
					// 	effectivenessBackgroundColor = "red";
					// 	effectivenessTextColor = "white";
					// }
					// else if (effectiveness[currentType] == 0)
					// {
					// 	effectivenessBackgroundColor = "black";
					// 	effectivenessTextColor = "white";
					// }
					// else if (effectiveness[currentType] < 0.25)
					// {
					// 	effectivenessBackgroundColor = "darkred";
					// 	effectivenessTextColor = "white";
					// }
					// else if (effectiveness[currentType] == 1.25)
					// {
					// 	effectivenessBackgroundColor = "#89b3b5";
					// 	effectivenessTextColor = "white";
					// }
					// else if (effectiveness[currentType] == 1.5)
					// {
					// 	effectivenessBackgroundColor = "#6699cc";//"#3399ff";
					// 	effectivenessTextColor = "black";
					// }
					// else if (effectiveness[currentType] > 1.5)
					// {
					// 	effectivenessBackgroundColor = "blue";
					// 	effectivenessTextColor = "white";
					// }
					
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
			id:struggle,
			data:{
				data:{
					ac: struggle_AC,
					category: currentCategory,
					damageBase: struggle_DB,
					effect: "--",
					frequency: "At-Will",
					name: struggle,
					range: currentRange,
					type: currentType,
					id:struggle
				},
				id:struggle
			}
		};

		let this_actor = canvas.tokens.controlled[0].actor;

		var moveSoundFile = ("struggle.mp3");

		struggle_buttons[struggle] = {
			noRefresh: false,
			id: struggle,
			label: "<center><div style='background-color:"+ MoveButtonBackgroundColor +";color:"+ MoveButtonTextColor +";border-left:"+EffectivenessBorderThickness+"px solid; border-color:"+effectivenessBackgroundColor+"; padding-left: 0px ;width:200px;height:"+Number(ButtonHeight-25+3)+"px;font-size:20px;font-family:Modesto Condensed;line-height:0.6'><h3 style='padding: 0px;font-family:Modesto Condensed;font-size:20px; color: white; background-color: #272727 ; overflow-wrap: normal ! important; word-break: keep-all ! important;'><div style='padding-top:5px;padding-bottom:5px'>"+currentlabel+"</div>"/*+currentCooldownLabel*/+currentMoveTypeLabel+"</h3>"+STABBorderImage+DBBorderImage+"<h6 style='padding-top: 4px;padding-bottom: 0px;font-size:"+RangeFontSize+"px;'>"+currentMoveRangeIcon+effectivenessText+"</h6>"+"</div></center>",
			callback: async () => {

				let command_check_result = await game.PTUMoveMaster.ThisPokemonsTrainerCommandCheck(this_actor);
				if(!command_check_result)
				{
					game.PTUMoveMaster.chatMessage(this_actor, "But they did not obey!")
					return;
				}
				let key_shift = game.keyboard.downKeys.has("ShiftLeft");
				if (key_shift) 
				{
					await game.PTUMoveMaster.rollDamageMoveWithBonus(this_actor , created_move_item, struggle, finalDB, false);
				}
				else
				{
					await game.PTUMoveMaster.RollDamageMove(this_actor, created_move_item, struggle, finalDB, false, 0);
				}

				await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+moveSoundFile, volume: 0.8, autoplay: true, loop: false}, true);
			}
		};
	}

	struggle_buttons["pokedexBottomBuffer"] = {noRefresh: true, id:"pokedexBottomBuffer", label: "<div class='pokedex-bottom-filler' style='border:none'></div>",
		callback: () => {
	}};

	var hasPokedex = false;
	if(actor.type == "character")
	{
		hasPokedex = game.PTUMoveMaster.ActorHasItemWithName(actor, "Pokedex", "item");
	}
	else
	{
		if(actor.data.data.owner!= "0")
		{
			hasPokedex = game.PTUMoveMaster.ActorHasItemWithName( (game.actors.get(actor.data.data.owner)), "Pokedex", "item");
		}
	}

	let background_field_URL = await game.PTUMoveMaster.GetCurrentFieldImageURL();
	let background_field = 'background-image: url("'+background_field_URL+'"); background-repeat: repeat-x; background-position: left bottom';

	let current_weather = game.settings.get("PTUMoveMaster", "currentWeather");
	let weather_icon = "weather_icon_"+current_weather+".png";

	let pokedex_text = "Unidentified Pokemon - Click to Scan!";
		let pokedex_camera_icon = "Pokedex_Camera.png";
		

	let actor_has_target_dex_entry = false;

	if(target)
	{
		if(target.actor.data.data.species)
		{
			actor_has_target_dex_entry = game.PTUMoveMaster.ThisActorOrTheirTrainerHasDexEntry(actor, target.actor.data.data.species);
			if(game.user.isGM)
			{
				actor_has_target_dex_entry = true;
			}
		}
	}
	else
	{
		pokedex_camera_icon = "Pokedex_Camera_Scanned.png";
		pokedex_text = "Pokedex: No Pokemon Targeted"
	}

	if(target.actor.type == "character")
	{
		pokedex_camera_icon = "Pokedex_Camera_Scanned.png";
		pokedex_text = "Pokedex: No Pokemon Targeted"
	}
	else if(target && actor_has_target_dex_entry)
	{
		pokedex_camera_icon = "Pokedex_Camera_Scanned.png";
		pokedex_text = "Pokedex: Known Pokemon Species: "+target.actor.data.data.species;
	}

	let pokedex_camera_button = "<input title='"+pokedex_text+"' type='image' src='"+AlternateIconPath+pokedex_camera_icon+"' name='saveForm' class='pokedex-top-camera' id='saveForm' />";

	if(!hasPokedex)
	{
		pokedex_text = "Pokedex: No Pokedex in Trainer`s Inventory!"
		pokedex_camera_button = "<input title='"+pokedex_text+"' type='image' src='"+AlternateIconPath+pokedex_camera_icon+"' name='saveForm' class='pokedex-top-camera-disabled' id='saveForm' />";
	}

	let dialogueID = "ptu-sidebar";
	let content = "<img class='pokedex-top' src='"+AlternateIconPath+"NewPokedex_Vertical_Top_200.png"+"'></img>\
		<center>"+pokedex_camera_button+"</img></center>\
		<style> #"+dialogueID+" .dialog-buttons \
			{\
				background-color:"+ MoveButtonBackgroundColor +";\
				flex-direction: column; \
				padding: 0px !important; \
				border-width: 0px !important; \
				margin: 0px !important; \
				border: none !important;\
			} #"+dialogueID+" .dialog-button \
			{\
				background-color:"+ MoveButtonBackgroundColor +";\
				flex-direction: column; \
				padding: 0px !important; \
				border-width: 0px !important; \
				margin-top: 3px !important; \
				margin-bottom: 3px !important; \
				margin-left: 0px !important; \
				margin-right: 0px !important; \
				border: none !important; \
				width: 200px\
			} #"+dialogueID+" .dialog-content \
			{\
				background-color:"+ MoveButtonBackgroundColor +";\
				flex-direction: column; \
				padding: 0px !important; \
				border-width: 0px !important; \
				margin: 0px !important; \
				width: 200px !important; \
				height: auto !important;\
			} #"+dialogueID+" .window-content \
			{\
				;flex-direction: column; \
				padding: 0px !important; \
				border-width: 0px !important; \
				margin: 0px !important; \
				width: 200px !important;\
			} #"+dialogueID+".app.window-app.MoveMasterSidebarDialog \
			{\
				background-color:"+ MoveButtonBackgroundColor +";\
				flex-direction: column; \
				padding: 0px !important; \
				border-width: 0px !important; \
				margin: 0px !important; \
				width: 200px !important;\
			}\
		</style>\
		<center>\
			<h2 style='margin-bottom: 10px;'>\
				"+ targetTypingText+"\
			</h2>\
			<div class='cameraframe-terrain' style='"+background_field+";\
			font-family:Modesto Condensed;\
			font-size:20px'>\
			</div>\
		</center>\
		<img class='pokedex-bottom' src='"+AlternateIconPath+"NewPokedex_Vertical_Bottom_200.png"+"'></img>\
		<center><img class='pokedex-bottom-weather' title='Current Weather: "+current_weather+"' src='"+AlternateIconPath+weather_icon+"'></img></center>";

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
			"crit_mod":		0,
			"accuracy_mod":	0,
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
			"crit_mod":		2,
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
			await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+heal_sound_file, volume: 0.8, autoplay: true, loop: false}, true);
		}
	}

	// TODO: Range checking for non-pokeball items

	// TODO: Stage Change from item handling

	// TODO: Crit boost from item handling

	// TODO: Accuracy boost from item handling

	// TODO: Guard Spec handling

	// TODO: Repulsive tracking from item handling

	setTimeout( async () => {  game.PTUMoveMaster.TakeAction(actor_token.actor, "Standard"); }, 1000);
}


export async function GetItemArt(item_name) 
{
	let item_icon_path = game.settings.get("PTUMoveMaster", "itemIconDirectory");

	let item_base_image = (item_icon_path+item_name+".webp");
    let result = await fetch(item_base_image);
	if(result.status === 404) 
	{
		item_base_image = (item_icon_path+item_name+".png");
		result = await fetch(item_base_image);
		if(result.status === 404) 
		{
			item_base_image = (item_icon_path+"/Generic Item.webp");
		}
	}
	
    return item_base_image;
}


export function GetTargetTypingHeader(target, actor)
{
	let targetTypingText = "";
	let targetType1 = "";
	let targetType2 = "";
	let actorType1 = "";
	let actorType2 = "";
	let target_effectiveness;
	let actor_effectiveness;
	let showEffectivenessMode = game.settings.get("PTUMoveMaster", "showEffectiveness");
	let actions_image = game.PTUMoveMaster.GetActorActionIcon(actor);
	let actions_image_target = "";
	if(target)
	{
		console.log("DEBUG: GetTargetTypingHeader: target");
		console.log(target);
		actions_image_target = game.PTUMoveMaster.GetActorActionIcon(target.actor, true);
	}
	let camera_frame_overlay = '<img class="cameraframe-overlay" src="'+AlternateIconPath+'PTU_TargetCamera_Dark.png'+'" ></img>';

	let actor_has_target_dex_entry = false;

	if(target)
	{
		if(target.actor.data.data.species)
		{
			actor_has_target_dex_entry = game.PTUMoveMaster.ThisActorOrTheirTrainerHasDexEntry(actor, target.actor.data.data.species);
			if(game.user.isGM)
			{
				actor_has_target_dex_entry = true;
			}
		}
	}

	if(actor.data.data.typing)
	{
		actorType1 = (actor.data.data.typing[0]) ? actor.data.data.typing[0] : "";
		actorType2 = (actor.data.data.typing[1]) ? actor.data.data.typing[1] : "";
	}
	

	if ( (showEffectivenessMode != "never") && (target))
	{
		if(
			(
				(target.data.disposition > DISPOSITION_HOSTILE)
				&& (showEffectivenessMode == "neutralOrBetter")
			) 
			|| 
			(
				actor_has_target_dex_entry
				&& (showEffectivenessMode == "dex")
			)
			||
			(showEffectivenessMode == "always")
			||
			(game.user.isGM)
		)
		{
			if(target.actor.data.data.typing)
			{
				targetType1 = (target.actor.data.data.typing[0]) ? target.actor.data.data.typing[0] : "";
				targetType2 = (target.actor.data.data.typing[1]) ? target.actor.data.data.typing[1] : "";
			}
		}

		let targetImage;
		let actorImage = actor.data.img;
		let tokenSize = 60;
		let actorTokenSize = 90;

		let target_name_text = "Unidentified Pokemon"

		if (target.actor.token)
		{
			targetImage = target.actor.data.img;
		}
		else
		{
			targetImage = target.actor.data.img;
		}

		if(target.actor.type == "character")
		{
			target_effectiveness = {"Normal":1, "Fire":1, "Water":1, "Electric":1, "Grass":1, "Ice":1, "Fighting":1, "Poison":1, "Ground":1, "Flying":1, "Psychic":1, "Bug":1, "Rock":1, "Ghost":1, "Dragon":1, "Dark":1, "Steel":1, "Fairy":1 };
		}
		else
		{
			if(
				(
					(target.data.disposition > DISPOSITION_HOSTILE)
					&& (showEffectivenessMode == "neutralOrBetter")
				) 
				|| 
				(
					actor_has_target_dex_entry
					&& (showEffectivenessMode == "dex")
				)
				||
				(showEffectivenessMode == "always")
				||
				(game.user.isGM)
			)
			{
				target_effectiveness = target.actor.data.data.effectiveness.All;
				target_name_text = target.actor.name;
			}
			else
			{
				target_effectiveness = {"Normal":1, "Fire":1, "Water":1, "Electric":1, "Grass":1, "Ice":1, "Fighting":1, "Poison":1, "Ground":1, "Flying":1, "Psychic":1, "Bug":1, "Rock":1, "Ghost":1, "Dragon":1, "Dark":1, "Steel":1, "Fairy":1 };
			}
		}
		
		if(actor.type == "character")
		{
			actor_effectiveness = {"Normal":1, "Fire":1, "Water":1, "Electric":1, "Grass":1, "Ice":1, "Fighting":1, "Poison":1, "Ground":1, "Flying":1, "Psychic":1, "Bug":1, "Rock":1, "Ghost":1, "Dragon":1, "Dark":1, "Steel":1, "Fairy":1 };
		}
		else
		{
			actor_effectiveness = actor.data.data.effectiveness.All;
		}
		
		if(!target.actor.data.data.effectiveness) // Trainer Target, no type, show blank
		{
			targetType1 = "";
			targetType2 = "";

			targetTypingText = "<div class='cameraframe-underlay' style='background-image:url("+AlternateIconPath+"NewPokedex_Vertical_CenterScreen_200.png"+")'></div>"+actions_image+actions_image_target+"\
			<div class='row' style='width:200px; height=125px !important;'>\
				"+camera_frame_overlay+"\
				<div class='column' style='width:200px; height:100px ; color:lightgrey; position:absolute;'>\
					<img class='cameraframe-selected-pokemon-type1' src='" + AlternateIconPath+actorType1+TypeIconSuffix+ "' width=80px height=auto style='border:none; position:absolute;'>\
					<img class='cameraframe-selected-pokemon-type2' src='" + AlternateIconPath+actorType2+TypeIconSuffix+ "' width=80px height=auto style='border:none; position:absolute;'>\
				</div>\
				<div class='column' style='width:200px; height:100px ; color:lightgrey; position:absolute;'>\
					<img class='cameraframe-targeted-pokemon-type1' src='" + AlternateIconPath+targetType1+TypeIconSuffixFlipped+ "' width=80px height=auto style='border:none; position:absolute;'>\
					<img class='cameraframe-targeted-pokemon-type2' src='" + AlternateIconPath+targetType2+TypeIconSuffixFlipped+ "' width=80px height=auto style='border:none; position:absolute;'>\
				</div>\
				<div class='column' style='width:100px !important; height=auto; text-align: left;'>\
					<img class='cameraframe-selected-pokemon' src='"+ actorImage +"' height='"+actorTokenSize+"'></img>\
				</div>\
				<div class='column' style='width:100px !important; height=auto; text-align: right; right:0px;'>\
					<img class='cameraframe-targeted-pokemon' src='"+ targetImage +"' height='"+tokenSize+"'></img>\
				</div>\
			</div>\
			<div class='cameraframe-filler'></div>";
		}
		else // Pokemon, type known, show types + effectiveness
		{
			let target_type_1_attacks_actor = actor_effectiveness[targetType1];
			let target_type_2_attacks_actor = target_type_1_attacks_actor;
			let targetType1_text = targetType1;
			let targetType2_text = targetType1;

			if(targetType2 == "" || targetType2 == null)
			{
				targetType2 = "";
			}
			else
			{
				target_type_2_attacks_actor = actor_effectiveness[targetType2];
				targetType2_text = targetType2;
			}

			let actor_type_1_attacks_target = target_effectiveness[actorType1];
			let actor_type_2_attacks_target = actor_type_1_attacks_target;
			let actorType1_text = actorType1;
			let actorType2_text = actorType1;

			if(actorType2 == "" || actorType2 == null)
			{
				actorType2 = "";
			}
			else
			{
				actor_type_2_attacks_target = target_effectiveness[actorType2];
				actorType2_text = actorType2;
			}

			let target_type_1_attacks_actor_color = EffectivenessColors[target_type_1_attacks_actor];
			let target_type_2_attacks_actor_color = EffectivenessColors[target_type_2_attacks_actor];
			let actor_type_1_attacks_target_color = EffectivenessColors[actor_type_1_attacks_target];
			let actor_type_2_attacks_target_color = EffectivenessColors[actor_type_2_attacks_target];

			targetTypingText = "<div class='cameraframe-underlay' style='background-image:url("+AlternateIconPath+"NewPokedex_Vertical_CenterScreen_200.png"+")'></div>"+actions_image+actions_image_target+"\
				<div class='row' style='width:200px; height=125px !important;'>\
					"+camera_frame_overlay+"\
					<div class='column' style='width:200px; height:100px ; color:lightgrey; position:absolute;'>\
						<img title='Your "+actorType1_text+" moves are x"+actor_type_1_attacks_target+" effective vs "+target_name_text+".' class='cameraframe-selected-pokemon-type1' src='" + AlternateIconPath+actorType1+TypeIconSuffix+ "' width=80px height=auto style='border-left:none; border-top:none; border-bottom:none; position:absolute; border-right:3px solid; border-color:"+actor_type_1_attacks_target_color+";'>\
						<img title='Your "+actorType2_text+" moves are x"+actor_type_2_attacks_target+" effective vs "+target_name_text+".' class='cameraframe-selected-pokemon-type2' src='" + AlternateIconPath+actorType2+TypeIconSuffix+ "' width=80px height=auto style='border-left:none; border-top:none; border-bottom:none; position:absolute; border-right:3px solid; border-color:"+actor_type_2_attacks_target_color+";'>\
					</div>\
					<div class='column' style='width:200px; height:100px ; color:lightgrey; position:absolute;'>\
						<img title='"+target_name_text+"`s "+targetType1_text+" moves are x"+target_type_1_attacks_actor+" effective vs you.' class='cameraframe-targeted-pokemon-type1' src='" + AlternateIconPath+targetType1+TypeIconSuffixFlipped+ "' width=80px height=auto style='border-right:none; border-top:none; border-bottom:none; position:absolute; border-left:3px solid; border-color:"+target_type_1_attacks_actor_color+";'>\
						<img title='"+target_name_text+"`s "+targetType2_text+" moves are x"+target_type_2_attacks_actor+" effective vs you.' class='cameraframe-targeted-pokemon-type2' src='" + AlternateIconPath+targetType2+TypeIconSuffixFlipped+ "' width=80px height=auto style='border-right:none; border-top:none; border-bottom:none; position:absolute; border-left:3px solid; border-color:"+target_type_2_attacks_actor_color+";'>\
					</div>\
					<div class='column' style='width:100px !important; height=auto; text-align: left;'>\
						<img class='cameraframe-selected-pokemon' src='"+ actorImage +"' height='"+actorTokenSize+"'></img>\
					</div>\
					<div class='column' style='width:100px !important; height=auto; text-align: right; right:0px;'>\
						<img class='cameraframe-targeted-pokemon' src='"+ targetImage +"' height='"+tokenSize+"'></img>\
					</div>\
				</div>\
				<div class='cameraframe-filler'></div>";
		}
		

		
	}
	else if (!target) // No target, show blank
	{
		let actorImage = actor.data.img;
		let tokenSize = 60;
		let actorTokenSize = 90;

		targetTypingText = "<div class='cameraframe-underlay' style='background-image:url("+AlternateIconPath+"NewPokedex_Vertical_CenterScreen_200.png"+")'></div>"+actions_image+actions_image_target+"\
			<div class='row' style='width:200px; height=125px !important;'>\
				"+camera_frame_overlay+"\
				<div class='column' style='width:200px; height:100px ; color:lightgrey; position:absolute;'>\
					<img class='cameraframe-selected-pokemon-type1' src='" + AlternateIconPath+actorType1+TypeIconSuffix+ "' width=80px height=auto style='border:none; position:absolute;'>\
					<img class='cameraframe-selected-pokemon-type2' src='" + AlternateIconPath+actorType2+TypeIconSuffix+ "' width=80px height=auto style='border:none; position:absolute;'>\
				</div>\
				<div class='column' style='width:200px; height:100px ; color:lightgrey; position:absolute;'>\
					<img class='cameraframe-targeted-pokemon-type1' src='" + AlternateIconPath+targetType1+TypeIconSuffixFlipped+ "' width=80px height=auto style='border:none; position:absolute;'>\
					<img class='cameraframe-targeted-pokemon-type2' src='" + AlternateIconPath+targetType2+TypeIconSuffixFlipped+ "' width=80px height=auto style='border:none; position:absolute;'>\
				</div>\
				<div class='column' style='width:100px !important; height=auto; text-align: left;'>\
					<img class='cameraframe-selected-pokemon' src='"+ actorImage +"' height='"+actorTokenSize+"' style='border:none; transform: scaleX(-1); vertical-align: bottom; text-align: left; position:absolute;'></img>\
				</div>\
				<div class='column' style='width:100px !important; height=auto; text-align: right; right:0px;'>\
					\
				</div>\
			</div>\
			<div class='cameraframe-filler'></div>";
	}
	else // Don't know typing in-character, show ???
	{
		let targetImage;
		if (target.actor.token)
			{
				targetImage = target.actor.data.img;
			}
			else
			{
				targetImage = target.actor.data.img;
			}
		let actorImage = actor.data.img;
		let tokenSize = 60;
		let actorTokenSize = 90;

		targetType1 = "Blank";
		targetType2 = "Blank";

		targetTypingText = "<div class='cameraframe-underlay' style='background-image:url("+AlternateIconPath+"NewPokedex_Vertical_CenterScreen_200.png"+")'></div>"+actions_image+actions_image_target+"\
			<div class='row' style='width:200px; height=125px !important;'>\
				"+camera_frame_overlay+"\
				<div class='column' style='width:200px; height:100px ; color:lightgrey; position:absolute;'>\
					<img class='cameraframe-selected-pokemon-type1' src='" + AlternateIconPath+actorType1+TypeIconSuffix+ "' width=80px height=auto style='border:none; position:absolute;'>\
					<img class='cameraframe-selected-pokemon-type2' src='" + AlternateIconPath+actorType2+TypeIconSuffix+ "' width=80px height=auto style='border:none; position:absolute;'>\
				</div>\
				<div class='column' style='width:200px; height:100px ; color:lightgrey; position:absolute;'>\
					<img class='cameraframe-targeted-pokemon-type1' src='" + AlternateIconPath+targetType1+TypeIconSuffixFlipped+ "' width=80px height=auto style='border:none; position:absolute;'>\
					<img class='cameraframe-targeted-pokemon-type2' src='" + AlternateIconPath+targetType2+TypeIconSuffixFlipped+ "' width=80px height=auto style='border:none; position:absolute;'>\
				</div>\
				<div class='column' style='width:"+actorTokenSize+" height=auto; position:absolute;'>\
					<img class='cameraframe-selected-pokemon' src='"+ actorImage +"' height='"+actorTokenSize+"' style='border:none; transform: scaleX(-1);'></img>\
				</div>\
				<div class='column' style='width:"+tokenSize+"; height=auto; margin-left:50px ; margin-top: 25px; right:0px;'>\
					<img class='cameraframe-targeted-pokemon' src='"+ targetImage +"' height='"+tokenSize+"' style='border:none;'></img>\
				</div>\
			</div>\
			<div class='cameraframe-filler'></div>";
	}

	return targetTypingText;
}


export async function ExpendItem(owning_actor, item_object) 
{
	if((item_object.data.data.quantity < 1) || (item_object.data.data.quantity == null))
	{
		ui.notifications.warn("You do not have any of this item left to use!");
		return false;
	}

	if(item_object.name.includes("Thrown") || item_object.name.includes("Broken"))
	{
		ui.notifications.warn("This item is not in a usable state!");
		return false;
	}

	await owning_actor.updateEmbeddedDocuments(
		"Item", 
		[
			{
				_id: item_object.id, 
				"data.quantity": Number(item_object.data.data.quantity-1)
			}
		]
		); // Decrement the spent item count
	// await item_object.update( { "data.quantity": Number(item_object.data.quantity-1) }); // Decrement the spent item count

	if(item_object.data.name.includes("Ball")) 	// For balls, create a thrown version that can be picked up after battle (this will be changed to 
	{										// broken or removed entirely by the capture function if it hits and fails/succeeds to capture a 
											// pokemon, respectively.)


		let item = owning_actor.items.find(x => x.name == `Thrown ${item_object.data.name}`) // Search through existing items to see if we have a Thrown entry for this item already
		if(item) 
		{
			await owning_actor.updateEmbeddedDocuments(
				"Item", 
				[
					{
						_id: item.id, 
						"data.quantity": Number(duplicate(item).data.quantity+1)
					}
				]
				);
			// await item_object.update({"data.quantity": Number(duplicate(item).data.quantity)+1});
		}
		else // If we get here, then we never found an existing thrown version to increment, so create new thrown version
		{
			await owning_actor.createEmbeddedDocuments("Item", [{
				"name": "Thrown "+(item_object.data.name),
				"type": "item",
				"data": {
					"cost": item_object.data.cost,
					"effect": item_object.data.effect,
					"UseCount": item_object.data.UseCount,
					"origin": item_object.data.effect,
					"quantity": 1
				}
			}]);
		}
		return true;
	}
	else // Not a ball, just decrement the count
	{
		// await owning_actor.updateOwnedItem( { _id: item_object._id, "data.quantity": Number(item_object.data.data.quantity-1) });
		// await item_object.update( { "data.quantity": Number(item_object.data.quantity-1) });
		return true;
	}
}


export async function BreakPokeball(owning_actor, item_object) 
{
	let thrown_item = owning_actor.items.find(x => x.name == `Thrown ${item_object.data.name}`) // Search through existing items to see if we have a Thrown entry for this item already
	if(thrown_item)
	{
		await owning_actor.updateEmbeddedDocuments("Item", [{_id: thrown_item.id, "data.quantity": Number(duplicate(thrown_item).data.quantity)-1}]);
	}

	if(game.settings.get("PTUMoveMaster", "trackBrokenPokeballs"))
	{
		let broken_item = owning_actor.items.find(x => x.name == `Broken ${item_object.data.name}`) // Search through existing items to see if we have a broken entry for this item already
		if(broken_item)
		{
			await owning_actor.updateEmbeddedDocuments("Item", [{_id: broken_item.id, "data.quantity": Number(duplicate(broken_item).data.quantity)+1}]);
		}
		else // If we get here, then we never found an existing broken version to increment, so create new broken version
		{
			await owning_actor.createEmbeddedDocuments("Item", [{
				"name": "Broken "+(item_object.data.name),
				"type": "item",
				"data": {
					"cost": item_object.data.cost,
					"effect": item_object.data.effect,
					"UseCount": item_object.data.UseCount,
					"origin": item_object.data.effect,
					"quantity": 1
				}
			}]);
		}
	}
	
}


export async function RemoveThrownPokeball(owning_actor, item_object) 
{
	let thrown_item = owning_actor.items.find(x => x.name == `Thrown ${item_object.data.name}`) // Search through existing items to see if we have a Thrown entry for this item already
	if(thrown_item)
	{
		await owning_actor.updateEmbeddedDocuments("Item", [{_id: thrown_item.id, "data.quantity": Number(duplicate(thrown_item).data.quantity)-1}]);
	}
}


export async function RecoverThrownPokeballs(owning_actor) // TODO: Remove all actor's thrown balls, add the same number of regular balls.
{
	// let thrown_item = owning_actor.items.find(x => x.name == `Thrown ${item_object.data.name}`) // Search through existing items to see if we have a Thrown entry for this item already
	// if(thrown_item)
	// {
	// 	await owning_actor.updateOwnedItem({_id: thrown_item._id, "data.quantity": Number(duplicate(thrown_item).data.quantity)-1});
	// }

	// let broken_item = owning_actor.items.find(x => x.name == `Broken ${item_object.data.name}`) // Search through existing items to see if we have a broken entry for this item already
	// if(broken_item)
	// {
	// 	await owning_actor.updateOwnedItem({_id: broken_item._id, "data.quantity": Number(duplicate(broken_item).data.quantity)+1});
	// }
	// else // If we get here, then we never found an existing broken version to increment, so create new broken version
	// {
	// 	await owning_actor.createOwnedItem({
	// 		"name": "Broken "+(item_object.data.name),
	// 		"type": "item",
	// 		"data": {
	// 			"cost": item_object.data.cost,
	// 			"effect": item_object.data.effect,
	// 			"UseCount": item_object.data.UseCount,
	// 			"origin": item_object.data.effect,
	// 			"quantity": 1
	// 		}
	// 	});
	// }
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
				"Clear":{ name: "MoveMasterWeather", type: "none", options: {} },
				"Sunny":{ name: "MoveMasterWeather", type: "embers", options: {} },
				"Rainy":{ name: "MoveMasterWeather", type: "rain", options: {} },
				"Hail":{
					name: "MoveMasterWeather",
					options:
					{
						density: 1,
						direction: 30,
						scale: 1,
						speed: 10,
						tint:
						{
							apply: false,
							value: "#FFFFFF"
						},
					},
					type: "snowstorm"
				},
				//{ name: "MoveMasterWeather", type: "snowstorm", options: {scale: 1, speed:5000, density:5000, direction:30} },
				"Sandstorm":{
					name: "MoveMasterWeather",
					options:
					{
						density: 0,
						direction: 180,
						scale: 2,
						speed: 10,
						tint:
						{
							apply: true,
							value: "#baa24a"
						},
					},
					type: "clouds"
				},
				//{ name: "MoveMasterWeather", type: "clouds", options: {scale: 2, speed:1000, density:100, direction:180, tint: {apply: true, value: "#baa24a"} } },
			};
			console.log("fxmaster_weather_presets[new_weather]");
			console.log(fxmaster_weather_presets[new_weather]);

			if(new_weather == "Clear")
			{
				// await Hooks.call("fxmaster.updateWeather", []);
				canvas.scene.unsetFlag("fxmaster", "effects");
			}
			else
			{
				await Hooks.call("fxmaster.updateWeather", [
					fxmaster_weather_presets[new_weather]
				]);
			}
			
		}
	}
}


export async function GetWeatherHeader()
{
	let currentWeather = game.settings.get("PTUMoveMaster", "currentWeather");
	let weatherHeader = "";

	

	return weatherHeader;
}



export async function RollSkillCheck(skill1, skill2="")	// If a second skill is provided, it will roll whichever has a higher rank.
{
	
	let selected_token = canvas.tokens.controlled[0];
	let selected_actor = selected_token.actor;

	let skill = skill1;

	if(skill2 != "")
	{
		let skill1_numDice;
		let skill2_numDice;
		eval('skill1_numDice = selected_actor.data.data.skills.'+skill1+'.value.total;');
		eval('skill2_numDice = selected_actor.data.data.skills.'+skill2+'.value.total;');

		if(skill2_numDice > skill1_numDice)
		{
			skill = skill2;
		}
	}

	let numDice = 1;
	let dieSize = 6;
	let modifier = 0;

	eval('numDice = selected_actor.data.data.skills.'+skill+'.value.total;');
	eval('modifier = selected_actor.data.data.skills.'+skill+'.modifier.total;');

	let roll = await new Roll(`${numDice}d${dieSize}+${modifier}`).evaluate()

	roll.toMessage(
		{flavor: `${selected_actor.name}: ${skill} check.`,
		speaker: ChatMessage.getSpeaker({token: selected_actor}),}
	);
}


export function GetActorActionIcon(actor, right=false)
{
	let homebrew_actions = game.settings.get("PTUMoveMaster", "useExtraActionHomebrew");
	let standard_action = 1;
	let support_action = 1;
	let shift_action = 1;
	let swift_action = 1;
	let icon_class = "action-icon";
	if(right)
	{
		icon_class = "action-icon-right";
	}

	let actions;
	if(actor.data.flags && actor.data.flags.ptu && actor.data.flags.ptu.actions_taken)
	{
		actions = (actor.data.flags.ptu.actions_taken); // Token actors don't work right here

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
	
	let actions_image = "<img class='"+icon_class+"' src='"+actions_available_icon+"' style='border:none; height:25px; position:absolute;'></img>";

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
	
	if(!silent)
	{
		chatMessage(actor, (actor.name + " refreshes their EOT-frequency moves!"))
		await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+RefreshEOTMovesSound, volume: 0.8, autoplay: true, loop: false}, true);
	}
}


export async function resetSceneMoves(actor, silent=false)
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
	
	if(!silent)
	{
		chatMessage(actor, (actor.name + " refreshes their Scene-frequency moves!"))
		await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+RefreshSceneMovesSound, volume: 0.8, autoplay: true, loop: false}, true);
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

	if(!silent)
	{
		chatMessage(actor, (actor.name + " refreshes their Daily-frequency moves!"))
		await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+RefreshDailyMovesSound, volume: 0.8, autoplay: true, loop: false}, true);
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
	await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+RefreshEOTMovesSound, volume: 0.8, autoplay: true, loop: false}, true);
}


export async function resetShiftAction(actor)
{
	await actor.update({
		"flags.ptu.actions_taken.shift": false
	});
	chatMessage(actor, (actor.name + " resets their shift action!"))
	await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+RefreshEOTMovesSound, volume: 0.8, autoplay: true, loop: false}, true);
}


export async function resetSwiftAction(actor)
{
	await actor.update({
		"flags.ptu.actions_taken.swift": false
	});
	chatMessage(actor, (actor.name + " resets their swift action!"))
	await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+RefreshEOTMovesSound, volume: 0.8, autoplay: true, loop: false}, true);
}


export async function toggleEffect({ actor, effectLabel })
{
	if(!actor || !effectLabel) return;
	let effect = actor.effects.find(e => e.data.label === effectLabel);
	if(!effect) return;
	return await effect.update({ disabled : !effect.data.disabled});
}



export async function enableCondition(target_actor, condition, condition_type = "other") // TODO: Implement
{
	chatMessage(target_actor, (target_actor.name + " gained the "+condition+" affliction!"));

	let effectData = CONFIG.statusEffects.find(x => x.id == "effect."+condition_type+"."+condition);
	// token.toggleEffect(effectData);
	// canvas.tokens.get(target_actor.token.id).toggleEffect(effectData);

	// await target_actor.createEmbeddedEntity("ActiveEffect", CONFIG.statusEffects.find(x => x.id == "effect."+condition_type+"."+condition));
	// let target_token = game.PTUMoveMaster.GetTokenFromActor(target_actor);
	// console.log("Target Token:");
	// console.log(target_token);
	// await target_token.toggleEffect("icons/svg/skull.svg");
	// await game.PTUMoveMaster.toggleEffect({ actor : game.actors.getName(target_actor.name), effectLabel : condition });
	await game.ptu.api.toggleEffect(target_actor, effectData);

	if(condition == "fainted")
	{
		let condition_cure = ["Burned", "Frozen", "Paralysis", "Poisoned", "Badly Poisoned", "Flinch", "Sleep", "Cursed", "Confused", "Disabled", "Infatuation", "Rage", "BadSleep", "Suppressed",];
		for(let affliction of (condition_cure))
		{
			await game.PTUMoveMaster.cureActorAffliction(target_actor, affliction);
		}
	}
}


export async function GetCurrentFieldImageURL()
{
	let background_field_path = game.settings.get("PTUMoveMaster", "backgroundFieldDirectory");

	let current_weather = await game.PTUMoveMaster.GetCurrentWeather();
	let current_time_of_day = "Day";
	let current_terrain = "Grass";

	if(current_weather == "Sunny")
	{
		current_time_of_day = "Afternoon";
	}

	if(current_weather == "Rainy")
	{
		current_terrain = "Water";
	}

	if(current_weather == "Hail")
	{
		current_terrain = "Snow";
	}

	if(current_weather == "Sandstorm")
	{
		current_terrain = "Sand";
	}

	let background_image_URL = background_field_path+current_terrain+"_"+current_time_of_day+".png";
	return background_image_URL;
}


export async function recallPokemon(target_actor)
{
	for(let affliction of VolatileAfflictions)
	{
		await game.PTUMoveMaster.cureActorAffliction(target_actor, affliction, true);
	}

	await game.PTUMoveMaster.ResetStagesToDefault(target_actor, true);

	game.PTUMoveMaster.chatMessage(target_actor, target_actor.name + ' was recalled! Stages reset to defaults, and all volatile conditions cured!');
}


export async function adjustActorAccuracy(actor, change)
{
	setTimeout( async () => {

		if(change > 0)
		{
			await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+stat_up_sound_file, volume: 0.8, autoplay: true, loop: false}, true);
		}
		else
		{
			await AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+stat_down_sound_file, volume: 0.8, autoplay: true, loop: false}, true);
		}

		let old_stage = Number(actor.data.data.modifiers.acBonus.value);

		let new_stage = (old_stage + Number(change));

		actor.update({'data.modifiers.acBonus.value': Number(new_stage) });
		game.PTUMoveMaster.chatMessage(actor, actor.name + ' Accuracy +'+ change +'!');

	}, 100);
}


export async function ActorGetAutoOrderState(actor, order)
{
	let return_value = false;
	let get_value = false;
	let order_string = "flags.ptu.auto_orders." + order.replace(" ", "_");

	if(actor)
	{
		if(actor.data.flags.ptu)
		{
			if(actor.data.flags.ptu.auto_orders != null)
			{
				get_value = (eval( "actor.data."+order_string ));

				if(get_value)
				{
					return_value = get_value;
				}
			}
		}
	}
	
	

	return return_value;
}


export async function ActorSetAutoOrders(actor, order, new_state)
{
	let order_string = "flags.ptu.auto_orders." + order.replace(" ", "_");
	// await actor.update({order_string: new_state });
	eval("actor.update({'"+order_string+"': "+ new_state +" })");
	return;
}


export async function ApplyTrainingToActorsActivePokemon(actor, order, previous_state, active_pokemon_list)
{
	let new_state = "true";
	let new_state_string = "applied";
	let order_flag_string = "data.training."+(order.slice(0, order.search(" ")).toLocaleLowerCase()+".ordered");
	if(order == "Critical Moment")
	{
		order_flag_string = "data.training.critical";
	}

	// console.log("Debug: ApplyTrainingToActorsActivePokemon, previous_state = " + previous_state);
	// console.log(previous_state);
	
	if(previous_state == "on")
	{
		new_state = false;
		new_state_string = "cancelled";
	}

	// console.log("Debug: ApplyTrainingToActorsActivePokemon, new_state = " + new_state);
	// console.log(new_state);

	for(let owned_pokemon_id in active_pokemon_list)
	{
		let pokemon = game.actors.get(owned_pokemon_id);
		if(pokemon)
		{
			// console.log("Debug: ApplyTrainingToActorsActivePokemon, owned_pokemon_id = " + owned_pokemon_id);
			// console.log("Debug: ApplyTrainingToActorsActivePokemon, order_flag_string = " + order_flag_string);
			// eval( 'pokemon.update({ "'+order_flag_string+'": '+new_state+' })' );
			chatMessage(actor, (actor.name + " "+new_state_string+" "+order+" to their Pokemon, "+pokemon.name+"!"));

			//////////////////////////////////////
			const path = order_flag_string;
			const training = path.split('.')[2];
			const isOrder = path.split('.')[3] == "ordered";

			// If property is true
			if(getProperty(pokemon.data, path)) {
				const effects = [];
				pokemon.data.effects.forEach(effect => {
					if(effect.data.changes.some(change => change.key == path)) {
						effects.push(effect.id);
						// return;
					}
				});
				
				if(effects.length == 0 ) {
					await pokemon.update({[path]: false});
				}

				for(let id of effects) {
					await pokemon.effects.get(id).delete();
				}
				// return;
			}

			if(new_state == "true")
			{
				const effectData = new ActiveEffect({
					changes: [{"key":path,"mode":5,"value":true,"priority":50}].concat(game.ptu.getTrainingChanges(training, isOrder).changes),
					label: `${training.capitalize()} ${training == 'critical' ? "Moment" : isOrder ? "Order" : "Training"}`,
					icon: "",
					transfer: false,
					'flags.ptu.editLocked': true,
					_id: randomID()
				}).data
				await pokemon.createEmbeddedDocuments("ActiveEffect", [effectData]);
			}
			
			//////////////////////////////////////
		}
	}

	
	
	return;
}


export async function GetActorHealthColor(actor)
{
	let color_value = "green";

	const actor_health_current = actor.data.data.health.value;
	const actor_health_max = actor.data.data.health.max;
	const actor_injuries = actor.data.data.health.injuries;

	let actor_health_pct = (actor_health_current/actor_health_max);

	if(actor_health_pct >= 1)
	{
		color_value = "green";//"#3d85c6";
	}
	else if(actor_health_pct > 0.75)
	{
		color_value = "#4dab00";
	}
	else if(actor_health_pct > 0.50)
	{
		color_value = "#92790e";//"#cccc00";
	}
	else if(actor_health_pct > 0.25)
	{
		color_value = "#ab380e";//"orangered";
	}
	else if(actor_health_pct > 0)
	{
		color_value = "#b51712";
	}
	else
	{
		color_value = "black";
	}

	return color_value;
}


export function ThisActorOrTheirTrainerHasDexEntry(actor, species_name)
{
	let return_value = false;
	let actor_type = actor.type;
	let actors_trainer;

	if(actor_type == "character")
	{
		if(game.PTUMoveMaster.ActorHasItemWithName(actor, species_name.toLowerCase(), "dexentry"))
		{
			return_value = true;
		}
	}
	else if(actor_type == "pokemon")
	{
		actors_trainer = game.actors.get( actor.data.data.owner );

		if(actors_trainer)
		{
			if(game.PTUMoveMaster.ActorHasItemWithName(actors_trainer, species_name.toLowerCase(), "dexentry"))
			{
				return_value = true;
			}
		}
	}

	return return_value;
}


export async function ActivateDigestionBuff(actor, digestionBuff, currentDigestionBuffState)
{
	let new_state = true;
	let new_state_string = "turned in";
	let digestion_description = digestionsBuffs[digestionBuff]["description"];
	let snack_flavor = digestionsBuffs[digestionBuff]["flavor"];
	let actor_nature = actor.data.data.nature;
	let liked_disliked_neutral = "self_effects";

	if(snack_flavor && actor_nature)
	{
		if(nature_flavor_table[actor_nature][0] == snack_flavor)
		{
			liked_disliked_neutral = "enjoyed_effects";
		}
		else if (nature_flavor_table[actor_nature][1] == snack_flavor)
		{
			liked_disliked_neutral = "disliked_effects";
		}
	}

	if(currentDigestionBuffState == true)
	{
		new_state = false;
		new_state_string = "cleared";
	}
	
	actor.update({"flags.ptu.digestionBuffActive": new_state });

	chatMessage(actor, actor.name+" "+new_state_string+" the digestion buff for "+digestionBuff+"!<br><br>("+digestion_description+")");


	if(new_state == true)
	{
		for(let effect in digestionsBuffs[digestionBuff][liked_disliked_neutral])
		{
			console.log(effect);

			if(effect == "cure_condition")
			{
				game.PTUMoveMaster.cureActorAffliction(actor, digestionsBuffs[digestionBuff][liked_disliked_neutral][effect], false);
			}

			if(effect == "condition_inflict")
			{
				game.PTUMoveMaster.inflictActorAffliction(actor, digestionsBuffs[digestionBuff][liked_disliked_neutral][effect], false);
			}

			if(effect == "healing")
			{
				game.PTUMoveMaster.healActor(actor, digestionsBuffs[digestionBuff][liked_disliked_neutral][effect]);
			}

			if(effect == "healing_fraction")
			{
				game.PTUMoveMaster.healActorPercent(actor, Number(1/digestionsBuffs[digestionBuff][liked_disliked_neutral][effect]));
			}
		}
	}
	

	return;
}


export async function inflictActorAffliction(actor, affliction_name, silent=false) // TODO
{
	// let affliction_table = {
	// 	"paralysis":	"is_paralyzed",
	// 	"flinch":		"is_flinched",
	// 	"infatuation":	"is_infatuated",
	// 	"rage":			"is_raging",
	// 	"sleep":		"is_sleeping",
	// 	"badsleep":	"is_badly_sleeping",
	// 	"blindness":	"is_blind",
	// 	"total_blindness":"is_totally_blind",
	// 	"fainted":		"is_fainted"
	// };

	// let lowercase_affliction_name = "is_"+(affliction_name.toLowerCase().replace(" ", "_"));

	// if(affliction_table[affliction_name.toLowerCase()])
	// {
	// 	lowercase_affliction_name = affliction_table[affliction_name.toLowerCase()];
	// }

	// let effects = actor.effects;

	// if(actor.data.flags.ptu)
	// {
	// 	if(eval('actor.data.flags.ptu.'+lowercase_affliction_name) == "true")
	// 	{
	// 		for(let effect of actor.effects.filter(x => x.data.label == affliction_name))
  	// 		{
	// 			await effect.delete();
	// 		}

	// 		if(!silent)
	// 		{
	// 			game.PTUMoveMaster.chatMessage(actor, actor.name + ' was cured of '+ affliction_name +'!');
	// 		}

	// 		return true;
	// 	}
	// 	else
	// 	{
	// 		return false;
	// 	}
	// }
	// else
	// {
	// 	return false;
	// }
}


export async function injuryTokenSplash(actor)
{
	// let actor_token = GetTokenFromActor(actor);
	let injury_splash_allowed = game.settings.get("PTUMoveMaster", "useInjurySplashes");
	let blood_allowed = game.settings.get("PTUMoveMaster", "useBloodSplashes");

	let actor_tokens = actor.getActiveTokens();
	let actor_token = actor_tokens[0];

	if(injury_splash_allowed)
	{
		if( (actor.data.data.health.injuries >= 5) && (blood_allowed) )
		{
			await actor_token.TMFXaddUpdateFilters(blood_splash_params);
		}
		else
		{
			await actor_token.TMFXaddUpdateFilters(soot_splash_params);
		}
	}
}


export async function cleanInjuryTokenSplash(actor)
{
	let actor_tokens = actor.getActiveTokens();
	let actor_token = actor_tokens[0];

	await actor_token.TMFXdeleteFilters("sootSplash");
	await actor_token.TMFXdeleteFilters("bloodSplash");
}



export async function elementalHitEffect(actor, move, category="N/A", type="N/A")
{
	let actor_tokens = actor.getActiveTokens();
	let actor_token = actor_tokens[0];

	const generic_hit_params =
	[{
		filterType: "electric",
		filterId: "elementalHitEffect",
		color: 0xFFFFFF,
		time: 0,
		blend: 0.1,
		intensity: 2,
		autoDestroy: true,
		animated :
		{
		time : 
		{ 
			active: true, 
			speed: 0.0040, 
			animType: "move",
			loops: 1,
			loopDuration: 500
			
		}
		}
	}];

	const hit_param_table = {
		"Electric":{
			"Physical":[{
				filterType: "electric",
				filterId: "elementalHitEffect",
				color: 0xeeff00,
				time: 0,
				blend: 0.1,
				intensity: 5,
				autoDestroy: true,
				animated :
				{
				time : 
				{ 
					active: true, 
					speed: 0.0040, 
					animType: "move",
					loops: 1,
					loopDuration: 500
					
				}
				}
			}],
			"Special":[{
				filterType: "electric",
				filterId: "elementalHitEffect",
				color: 0xeeff00,
				time: 0,
				blend: 0.1,
				intensity: 5,
				autoDestroy: true,
				animated :
				{
				time : 
				{ 
					active: true, 
					speed: 0.0040, 
					animType: "move",
					loops: 1,
					loopDuration: 500
					
				}
				}
			}],
			"Status":[{
				filterType: "electric",
				filterId: "elementalHitEffect",
				color: 0xeeff00,
				time: 0,
				blend: 0.1,
				intensity: 5,
				autoDestroy: true,
				animated :
				{
				time : 
				{ 
					active: true, 
					speed: 0.0040, 
					animType: "move",
					loops: 1,
					loopDuration: 500
					
				}
				}
			}],
		},

		"Fighting":{
			"Physical":[{
				filterType: "electric",
				filterId: "elementalHitEffect",
				color: 0xff0000,
				time: 0,
				blend: 0.1,
				intensity: 5,
				autoDestroy: true,
				animated :
				{
				time : 
				{ 
					active: true, 
					speed: 0.0040, 
					animType: "move",
					loops: 1,
					loopDuration: 500
					
				}
				}
			}],
			"Special":[{
				filterType: "electric",
				filterId: "elementalHitEffect",
				color: 0xff0000,
				time: 0,
				blend: 0.1,
				intensity: 5,
				autoDestroy: true,
				animated :
				{
				time : 
				{ 
					active: true, 
					speed: 0.0040, 
					animType: "move",
					loops: 1,
					loopDuration: 500
					
				}
				}
			}],
			"Status":[{
				filterType: "electric",
				filterId: "elementalHitEffect",
				color: 0xff0000,
				time: 0,
				blend: 0.1,
				intensity: 5,
				autoDestroy: true,
				animated :
				{
				time : 
				{ 
					active: true, 
					speed: 0.0040, 
					animType: "move",
					loops: 1,
					loopDuration: 500
					
				}
				}
			}],
		},


		"Fire":{
			"Physical":[{
				filterType: "xfire",
				filterId: "myFireV2XFire",
				time: 0,
				blend: 0.5,
				amplitude: 0.8,
				dispersion: 0.5,
				chromatic: false,
				scaleX: 1,
				scaleY: 1,
				inlay: false,
				autoDestroy: true,
				animated :
				{
					time : 
					{ 
						active: true, 
						speed: -0.01, 
						animType: "move",
						loops: 1,
						loopDuration: 1000,
					},
					color:
					{
						active: true,
						loopDuration: 1000,
						loops: 1,
						animType: "colorOscillation",
						val1: 0x001000,
						val2: 0xFF9500
					}
				}
			},
			
			
			],
			"Special":[{
				filterType: "xfire",
				filterId: "myFireV2XFire",
				time: 0,
				blend: 0.5,
				amplitude: 0.8,
				dispersion: 0.5,
				chromatic: false,
				scaleX: 1,
				scaleY: 1,
				inlay: false,
				autoDestroy: true,
				animated :
				{
					time : 
					{ 
						active: true, 
						speed: -0.01, 
						animType: "move",
						loops: 1,
						loopDuration: 1000,
					},
					color:
					{
						active: true,
						loopDuration: 1000,
						loops: 1,
						animType: "colorOscillation",
						val1: 0x001000,
						val2: 0xFF9500
					}
				}
			},
			
			
			],
			"Status":[{
				filterType: "xfire",
				filterId: "myFireV2XFire",
				time: 0,
				blend: 0.5,
				amplitude: 0.8,
				dispersion: 0.5,
				chromatic: false,
				scaleX: 1,
				scaleY: 1,
				inlay: false,
				autoDestroy: true,
				animated :
				{
					time : 
					{ 
						active: true, 
						speed: -0.01, 
						animType: "move",
						loops: 1,
						loopDuration: 1000,
					},
					color:
					{
						active: true,
						loopDuration: 1000,
						loops: 1,
						animType: "colorOscillation",
						val1: 0x001000,
						val2: 0xFF9500
					}
				}
			},
			
			
			],
		},

		"Dark":{
			"Physical":[
				{
					filterType: "fumes",
					filterId: "myFumes",
					color: 0x303030,
					time: 0,
					blend: 8,
					autoDestroy: true,
					animated :
					{
					  time : 
					  { 
						active: true, 
						speed: 0.001, 
						animType: "move",
						loops: 1,
						loopDuration: 500,
					  },
					}
				},
				{
				   filterType: "outline",
				   filterId: "myOutline",
				   padding: 10,
				   color: 0x000000,
				   thickness: 0,
				   quality: 5,
				   zOrder: 9,
				   autoDestroy: true,
				   animated :
				   {
					  thickness: 
					  { 
						 active: true,
						 loopDuration: 500,
						 loops: 1,
						 animType: "cosOscillation",
						 val1: 0, 
						 val2: 4
					  }
				   }
				}
				],
			"Special":[
				{
					filterType: "fumes",
					filterId: "myFumes",
					color: 0x303030,
					time: 0,
					blend: 8,
					autoDestroy: true,
					animated :
					{
					  time : 
					  { 
						active: true, 
						speed: 0.001, 
						animType: "move",
						loops: 1,
						loopDuration: 500,
					  },
					}
				},
				{
				   filterType: "outline",
				   filterId: "myOutline",
				   padding: 10,
				   color: 0x000000,
				   thickness: 0,
				   quality: 5,
				   zOrder: 9,
				   autoDestroy: true,
				   animated :
				   {
					  thickness: 
					  { 
						 active: true,
						 loopDuration: 500,
						 loops: 1,
						 animType: "cosOscillation",
						 val1: 0, 
						 val2: 4
					  }
				   }
				}
				],
			"Status":[
				{
					filterType: "fumes",
					filterId: "myFumes",
					color: 0x303030,
					time: 0,
					blend: 8,
					autoDestroy: true,
					animated :
					{
					  time : 
					  { 
						active: true, 
						speed: 0.001, 
						animType: "move",
						loops: 1,
						loopDuration: 500,
					  },
					}
				},
				{
				   filterType: "outline",
				   filterId: "myOutline",
				   padding: 10,
				   color: 0x000000,
				   thickness: 0,
				   quality: 5,
				   zOrder: 9,
				   autoDestroy: true,
				   animated :
				   {
					  thickness: 
					  { 
						 active: true,
						 loopDuration: 500,
						 loops: 1,
						 animType: "cosOscillation",
						 val1: 0, 
						 val2: 4
					  }
				   }
				}
				],
		},


		"Ghost":{
			"Physical":[{
				filterType: "liquid",
				filterId: "mySpectralBody",
				color: 0x20AAEE,
				time: 0,
				blend: 8,
				intensity: 0,
				spectral: true,
				scale: 0.9,
				autoDestroy: true,
				animated :
				{
				   time : 
				   { 
					  active: true, 
					  speed: 0.0010, 
					  animType: "move",
					  loops: 1,
					  loopduration: 500
				   },
				   color: 
				   {
					  active: true, 
					  loopduration: 500, 
					  loops: 1,
					  animType: "colorOscillation", 
					  val1:0xFFFFFF, 
					  val2:0x00AAFF
				   },
				   intensity:
					{
					   active: true, 
					   loopduration: 500, 
					   loops: 1,
					   animType: "cosOscillation",
					   val1:0, 
					   val2:4
					}
				}
			},
			
			{
				filterType: "glow",
				filterId: "superSpookyGlow",
				outerStrength: 0,
				innerStrength: 0,
				color: 0x5099DD,
				quality: 0.5,
				padding: 10,
				autoDestroy: true,
				animated:
				{
					color: 
					{
					   active: true, 
					   loopduration: 500,
					   loops: 1, 
					   animType: "colorOscillation", 
					   val1:0x5099DD, 
					   val2:0x90EEFF
					},
					outerStrength:
					{
					  active: true, 
					  loopduration: 500, 
					  loops: 1,
					   animType: "cosOscillation",
					   val1:0, 
					   val2:4
					}
				}
			}
			
			],
			"Special":[{
				filterType: "liquid",
				filterId: "mySpectralBody",
				color: 0x20AAEE,
				time: 0,
				blend: 8,
				intensity: 0,
				spectral: true,
				scale: 0.9,
				autoDestroy: true,
				animated :
				{
				   time : 
				   { 
					  active: true, 
					  speed: 0.0010, 
					  animType: "move",
					  loops: 1,
					  loopduration: 500
				   },
				   color: 
				   {
					  active: true, 
					  loopduration: 500, 
					  loops: 1,
					  animType: "colorOscillation", 
					  val1:0xFFFFFF, 
					  val2:0x00AAFF
				   },
				   intensity:
					{
					   active: true, 
					   loopduration: 500, 
					   loops: 1,
					   animType: "cosOscillation",
					   val1:0, 
					   val2:4
					}
				}
			},
			
			{
				filterType: "glow",
				filterId: "superSpookyGlow",
				outerStrength: 0,
				innerStrength: 0,
				color: 0x5099DD,
				quality: 0.5,
				padding: 10,
				autoDestroy: true,
				animated:
				{
					color: 
					{
					   active: true, 
					   loopduration: 500,
					   loops: 1, 
					   animType: "colorOscillation", 
					   val1:0x5099DD, 
					   val2:0x90EEFF
					},
					outerStrength:
					{
					  active: true, 
					  loopduration: 500, 
					  loops: 1,
					   animType: "cosOscillation",
					   val1:0, 
					   val2:4
					}
				}
			}
			
			],
			"Status":[{
				filterType: "liquid",
				filterId: "mySpectralBody",
				color: 0x20AAEE,
				time: 0,
				blend: 8,
				intensity: 0,
				spectral: true,
				scale: 0.9,
				autoDestroy: true,
				animated :
				{
				   time : 
				   { 
					  active: true, 
					  speed: 0.0010, 
					  animType: "move",
					  loops: 1,
					  loopduration: 500
				   },
				   color: 
				   {
					  active: true, 
					  loopduration: 500, 
					  loops: 1,
					  animType: "colorOscillation", 
					  val1:0xFFFFFF, 
					  val2:0x00AAFF
				   },
				   intensity:
					{
					   active: true, 
					   loopduration: 500, 
					   loops: 1,
					   animType: "cosOscillation",
					   val1:0, 
					   val2:4
					}
				}
			},
			
			{
				filterType: "glow",
				filterId: "superSpookyGlow",
				outerStrength: 0,
				innerStrength: 0,
				color: 0x5099DD,
				quality: 0.5,
				padding: 10,
				autoDestroy: true,
				animated:
				{
					color: 
					{
					   active: true, 
					   loopduration: 500,
					   loops: 1, 
					   animType: "colorOscillation", 
					   val1:0x5099DD, 
					   val2:0x90EEFF
					},
					outerStrength:
					{
					  active: true, 
					  loopduration: 500, 
					  loops: 1,
					   animType: "cosOscillation",
					   val1:0, 
					   val2:4
					}
				}
			}
			
			],
		}


	};

	let filter_data;
	
	if((move !== null) && (move !== undefined) && (typeof move !== 'string'))
	{
		if(hit_param_table[move.type])
		{
			if(hit_param_table[move.type][move.category])
			{
				filter_data = hit_param_table[move.type][move.category];
			}
			else if(type != "N/A" && category != "N/A")
			{
				filter_data = hit_param_table[type][category];
			}
			else
			{
				filter_data = generic_hit_params;
			}
		}
		else
		{
			filter_data = generic_hit_params;
		}
	}
	else if(type != "N/A" && category != "N/A")
	{
		if(hit_param_table[type])
		{
			if(hit_param_table[type][category])
			{
				filter_data = hit_param_table[type][category];
			}
			else
			{
				filter_data = generic_hit_params;
			}
		}
		else
		{
			filter_data = generic_hit_params;
		}
	}
	else
	{
		filter_data = generic_hit_params;
	}
	
	await actor_token.TMFXaddUpdateFilters(filter_data);
	
}


export async function elementalAttackEffect(actor, move)
{
	let actor_tokens = actor.getActiveTokens();
	let actor_token = actor_tokens[0];


	const generic_attack_params =
	[{
		filterType: "electric",
		filterId: "elementalHitEffect",
		color: 0xFFFFFF,
		time: 0,
		blend: 0.1,
		intensity: 2,
		autoDestroy: true,
		animated :
		{
		time : 
		{ 
			active: true, 
			speed: 0.0020, 
			animType: "move",
			loops: 1,
			loopDuration: 1000
			
		}
		}
	}];

	const attack_param_table = {
		"Electric":{
			"Physical":[{
				filterType: "electric",
				filterId: "elementalHitEffect",
				color: 0xeeff00,
				time: 0,
				blend: 0.1,
				intensity: 5,
				autoDestroy: true,
				animated :
				{
				time : 
				{ 
					active: true, 
					speed: 0.0020, 
					animType: "move",
					loops: 1,
					loopDuration: 1000
					
				}
				}
			}],
			"Special":[{
				filterType: "electric",
				filterId: "elementalHitEffect",
				color: 0xeeff00,
				time: 0,
				blend: 0.1,
				intensity: 5,
				autoDestroy: true,
				animated :
				{
				time : 
				{ 
					active: true, 
					speed: 0.0020, 
					animType: "move",
					loops: 1,
					loopDuration: 1000
					
				}
				}
			}],
			"Status":[{
				filterType: "electric",
				filterId: "elementalHitEffect",
				color: 0xeeff00,
				time: 0,
				blend: 0.1,
				intensity: 5,
				autoDestroy: true,
				animated :
				{
				time : 
				{ 
					active: true, 
					speed: 0.0020, 
					animType: "move",
					loops: 1,
					loopDuration: 1000
					
				}
				}
			}],
		},


		"Fighting":{
			"Physical":[{
				filterType: "electric",
				filterId: "elementalHitEffect",
				color: 0xff0000,
				time: 0,
				blend: 0.1,
				intensity: 5,
				autoDestroy: true,
				animated :
				{
				time : 
				{ 
					active: true, 
					speed: 0.0020, 
					animType: "move",
					loops: 1,
					loopDuration: 1000
					
				}
				}
			}],
			"Special":[{
				filterType: "electric",
				filterId: "elementalHitEffect",
				color: 0xff0000,
				time: 0,
				blend: 0.1,
				intensity: 5,
				autoDestroy: true,
				animated :
				{
				time : 
				{ 
					active: true, 
					speed: 0.0020, 
					animType: "move",
					loops: 1,
					loopDuration: 1000
					
				}
				}
			}],
			"Status":[{
				filterType: "electric",
				filterId: "elementalHitEffect",
				color: 0xff0000,
				time: 0,
				blend: 0.1,
				intensity: 5,
				autoDestroy: true,
				animated :
				{
				time : 
				{ 
					active: true, 
					speed: 0.0020, 
					animType: "move",
					loops: 1,
					loopDuration: 1000
					
				}
				}
			}],
		},


		"Fire":{
			"Physical":[{
				filterType: "xfire",
				filterId: "myFireV2XFire",
				time: 0,
				blend: 0.5,
				amplitude: 0.8,
				dispersion: 0.5,
				chromatic: false,
				scaleX: 1,
				scaleY: 1,
				inlay: false,
				autoDestroy: true,
				animated :
				{
					time : 
					{ 
						active: true, 
						speed: -0.01, 
						animType: "move",
						loops: 1,
						loopDuration: 2000,
					},
					color:
					{
						active: true,
						loopDuration: 2000,
						loops: 1,
						animType: "colorOscillation",
						val1: 0x001000,
						val2: 0xFF9500
					}
				}
			},
			{
			   filterType: "outline",
			   filterId: "myOutline",
			   padding: 10,
			   color: 0xFF9500,
			   thickness: 0,
			   quality: 5,
			   zOrder: 9,
			   autoDestroy: true,
			   animated :
			   {
				  thickness: 
				  { 
					 active: true,
					 loopDuration: 2000,
					 loops: 1,
					 animType: "cosOscillation",
					 val1: 0, 
					 val2: 4
				  }
			   }
			}
			
			],
			"Special":[{
				filterType: "xfire",
				filterId: "myFireV2XFire",
				time: 0,
				blend: 0.5,
				amplitude: 0.8,
				dispersion: 0.5,
				chromatic: false,
				scaleX: 1,
				scaleY: 1,
				inlay: false,
				autoDestroy: true,
				animated :
				{
					time : 
					{ 
						active: true, 
						speed: -0.01, 
						animType: "move",
						loops: 1,
						loopDuration: 2000,
					},
					color:
					{
						active: true,
						loopDuration: 2000,
						loops: 1,
						animType: "colorOscillation",
						val1: 0x001000,
						val2: 0xFF9500
					}
				}
			},
			{
			   filterType: "outline",
			   filterId: "myOutline",
			   padding: 10,
			   color: 0xFF9500,
			   thickness: 0,
			   quality: 5,
			   zOrder: 9,
			   autoDestroy: true,
			   animated :
			   {
				  thickness: 
				  { 
					 active: true,
					 loopDuration: 2000,
					 loops: 1,
					 animType: "cosOscillation",
					 val1: 0, 
					 val2: 4
				  }
			   }
			}
			
			],
			"Status":[{
				filterType: "xfire",
				filterId: "myFireV2XFire",
				time: 0,
				blend: 0.5,
				amplitude: 0.8,
				dispersion: 0.5,
				chromatic: false,
				scaleX: 1,
				scaleY: 1,
				inlay: false,
				autoDestroy: true,
				animated :
				{
					time : 
					{ 
						active: true, 
						speed: -0.01, 
						animType: "move",
						loops: 1,
						loopDuration: 2000,
					},
					color:
					{
						active: true,
						loopDuration: 2000,
						loops: 1,
						animType: "colorOscillation",
						val1: 0x001000,
						val2: 0xFF9500
					}
				}
			},
			{
			   filterType: "outline",
			   filterId: "myOutline",
			   padding: 10,
			   color: 0xFF9500,
			   thickness: 0,
			   quality: 5,
			   zOrder: 9,
			   autoDestroy: true,
			   animated :
			   {
				  thickness: 
				  { 
					 active: true,
					 loopDuration: 2000,
					 loops: 1,
					 animType: "cosOscillation",
					 val1: 0, 
					 val2: 4
				  }
			   }
			}
			
			],
		},

		"Dark":{
			"Physical":[
				{
					filterType: "fumes",
					filterId: "myFumes",
					color: 0x303030,
					time: 0,
					blend: 8,
					autoDestroy: true,
					animated :
					{
					  time : 
					  { 
						active: true, 
						speed: 0.001, 
						animType: "move",
						loops: 1,
						loopDuration: 2000,
					  },
					}
				},
				{
				   filterType: "outline",
				   filterId: "myOutline",
				   padding: 10,
				   color: 0x000000,
				   thickness: 0,
				   quality: 5,
				   zOrder: 9,
				   autoDestroy: true,
				   animated :
				   {
					  thickness: 
					  { 
						 active: true,
						 loopDuration: 2000,
						 loops: 1,
						 animType: "cosOscillation",
						 val1: 0, 
						 val2: 4
					  }
				   }
				}
				],
			"Special":[
				{
					filterType: "fumes",
					filterId: "myFumes",
					color: 0x303030,
					time: 0,
					blend: 8,
					autoDestroy: true,
					animated :
					{
					  time : 
					  { 
						active: true, 
						speed: 0.001, 
						animType: "move",
						loops: 1,
						loopDuration: 2000,
					  },
					}
				},
				{
				   filterType: "outline",
				   filterId: "myOutline",
				   padding: 10,
				   color: 0x000000,
				   thickness: 0,
				   quality: 5,
				   zOrder: 9,
				   autoDestroy: true,
				   animated :
				   {
					  thickness: 
					  { 
						 active: true,
						 loopDuration: 2000,
						 loops: 1,
						 animType: "cosOscillation",
						 val1: 0, 
						 val2: 4
					  }
				   }
				}
				],
			"Status":[
				{
					filterType: "fumes",
					filterId: "myFumes",
					color: 0x303030,
					time: 0,
					blend: 8,
					autoDestroy: true,
					animated :
					{
					  time : 
					  { 
						active: true, 
						speed: 0.001, 
						animType: "move",
						loops: 1,
						loopDuration: 2000,
					  },
					}
				},
				{
				   filterType: "outline",
				   filterId: "myOutline",
				   padding: 10,
				   color: 0x000000,
				   thickness: 0,
				   quality: 5,
				   zOrder: 9,
				   autoDestroy: true,
				   animated :
				   {
					  thickness: 
					  { 
						 active: true,
						 loopDuration: 2000,
						 loops: 1,
						 animType: "cosOscillation",
						 val1: 0, 
						 val2: 4
					  }
				   }
				}
				],
		},

		"Ghost":{
			"Physical":[{
				filterType: "liquid",
				filterId: "mySpectralBody",
				color: 0x20AAEE,
				time: 0,
				blend: 8,
				intensity: 0,
				spectral: true,
				scale: 0.9,
				autoDestroy: true,
				animated :
				{
				   time : 
				   { 
					  active: true, 
					  speed: 0.0010, 
					  animType: "move",
					  loops: 1,
					  loopduration: 1000
				   },
				   color: 
				   {
					  active: true, 
					  loopduration: 2000, 
					  loops: 1,
					  animType: "colorOscillation", 
					  val1:0xFFFFFF, 
					  val2:0x00AAFF
				   },
				   intensity:
					{
					   active: true, 
					   loopduration: 2000, 
					   loops: 1,
					   animType: "cosOscillation",
					   val1:0, 
					   val2:4
					}
				}
			},
			
			{
				filterType: "glow",
				filterId: "superSpookyGlow",
				outerStrength: 0,
				innerStrength: 0,
				color: 0x5099DD,
				quality: 0.5,
				padding: 10,
				autoDestroy: true,
				animated:
				{
					color: 
					{
					   active: true, 
					   loopduration: 2000,
					   loops: 1, 
					   animType: "colorOscillation", 
					   val1:0x5099DD, 
					   val2:0x90EEFF
					},
					outerStrength:
					{
					  active: true, 
					  loopduration: 2000, 
					  loops: 1,
					   animType: "cosOscillation",
					   val1:0, 
					   val2:4
					}
				}
			}
			
			],
			"Special":[{
				filterType: "liquid",
				filterId: "mySpectralBody",
				color: 0x20AAEE,
				time: 0,
				blend: 8,
				intensity: 0,
				spectral: true,
				scale: 0.9,
				autoDestroy: true,
				animated :
				{
				   time : 
				   { 
					  active: true, 
					  speed: 0.0010, 
					  animType: "move",
					  loops: 1,
					  loopduration: 1000
				   },
				   color: 
				   {
					  active: true, 
					  loopduration: 2000, 
					  loops: 1,
					  animType: "colorOscillation", 
					  val1:0xFFFFFF, 
					  val2:0x00AAFF
				   },
				   intensity:
					{
					   active: true, 
					   loopduration: 2000, 
					   loops: 1,
					   animType: "cosOscillation",
					   val1:0, 
					   val2:4
					}
				}
			},
			
			{
				filterType: "glow",
				filterId: "superSpookyGlow",
				outerStrength: 0,
				innerStrength: 0,
				color: 0x5099DD,
				quality: 0.5,
				padding: 10,
				autoDestroy: true,
				animated:
				{
					color: 
					{
					   active: true, 
					   loopduration: 2000,
					   loops: 1, 
					   animType: "colorOscillation", 
					   val1:0x5099DD, 
					   val2:0x90EEFF
					},
					outerStrength:
					{
					  active: true, 
					  loopduration: 2000, 
					  loops: 1,
					   animType: "cosOscillation",
					   val1:0, 
					   val2:4
					}
				}
			}
			
			],
			"Status":[{
				filterType: "liquid",
				filterId: "mySpectralBody",
				color: 0x20AAEE,
				time: 0,
				blend: 8,
				intensity: 0,
				spectral: true,
				scale: 0.9,
				autoDestroy: true,
				animated :
				{
				   time : 
				   { 
					  active: true, 
					  speed: 0.0010, 
					  animType: "move",
					  loops: 1,
					  loopduration: 1000
				   },
				   color: 
				   {
					  active: true, 
					  loopduration: 2000, 
					  loops: 1,
					  animType: "colorOscillation", 
					  val1:0xFFFFFF, 
					  val2:0x00AAFF
				   },
				   intensity:
					{
					   active: true, 
					   loopduration: 2000, 
					   loops: 1,
					   animType: "cosOscillation",
					   val1:0, 
					   val2:4
					}
				}
			},
			
			{
				filterType: "glow",
				filterId: "superSpookyGlow",
				outerStrength: 0,
				innerStrength: 0,
				color: 0x5099DD,
				quality: 0.5,
				padding: 10,
				autoDestroy: true,
				animated:
				{
					color: 
					{
					   active: true, 
					   loopduration: 2000,
					   loops: 1, 
					   animType: "colorOscillation", 
					   val1:0x5099DD, 
					   val2:0x90EEFF
					},
					outerStrength:
					{
					  active: true, 
					  loopduration: 2000, 
					  loops: 1,
					   animType: "cosOscillation",
					   val1:0, 
					   val2:4
					}
				}
			}
			
			],
		},


	};


	let filter_data;
	
	if(attack_param_table[move.type])
	{
		if(attack_param_table[move.type][move.category])
		{
			filter_data = attack_param_table[move.type][move.category];
		}
		else
		{
			filter_data = generic_attack_params;
		}
	}
	else
	{
		filter_data = generic_attack_params;
	}
	
	await actor_token.TMFXaddUpdateFilters(filter_data);

}


export async function elementalBlastEffect(actor, target, move)
{

	const generic_move_effect = "";
	const generic_precursor_effect = "";

	const specific_move_effect_table = {
		"Hyper Beam":{path:"modules/jb2a_patreon/Library/Cantrip/Eldritch_Blast/EldritchBlast_01_Regular_Yellow_30ft_1600x400.webm", scale: 0.9, anchor_x: 0.15, anchor_y: 0.5, speed:0.1, ease:false, melee:false, count:1},
		"Solar Beam":{
			path:"modules/jb2a_patreon/Library/Cantrip/Eldritch_Blast/EldritchBlast_01_Regular_Rainbow_30ft_1600x400.webm", 
			precursor:"modules/jb2a_patreon/Library/Generic/Fireflies/Fireflies_01_Green_Many02_400x400.webm",
			scale: 0.9, anchor_x: 0.15, anchor_y: 0.5, speed:0.1, ease:false, melee:false, count:1,
			precursor_delay:0, precursor_speed:0.1, precursor_scale:0.8, precursor_count:1, precursor_frequency:100, precursor_anchor_x:0.5, precursor_anchor_y:0.5, 
		},
		"Signal Beam":{path:"modules/jb2a_patreon/Library/6th_Level/Disintegrate/Disintegrate_01_Regular_Green01_30ft_1600x400.webm", scale: 0.5, anchor_x: 0.15, anchor_y: 0.5, speed:0.1, ease:false, melee:false, count:1},
		"Moonblast":{
			path:"modules/jb2a_patreon/Library/Cantrip/Ray_Of_Frost/RayOfFrost_01_Regular_PurpleTeal_30ft_1600x400.webm", 
			precursor:"modules/jb2a_patreon/Library/Generic/Energy/SwirlingSparkles_01_Regular_BluePink_400x400.webm", 
			scale: 0.5, anchor_x: 0.15, anchor_y: 0.5, speed:0.1, ease:false, melee:false, count:1, delay:650,
			precursor_count:1, precursor_anchor_x:0.5, precursor_anchor_y:0.5, 
		},
		"Gust":{path:"modules/jb2a_patreon/Library/2nd_Level/Gust_Of_Wind/GustOfWind_01_White_VeryFast_1200x200.webm", scale: 0.4, anchor_x: 0.15, anchor_y: 0.5, speed:0.1, ease:false, melee:false, count:1},
		"Brick Break":{path:"modules/jb2a_patreon/Library/Generic/Unarmed_Attacks/Flurry_Of_Blows/FlurryOfBlows_01_Dark_Red_Physical01_800x600.webm", scale: 0.5, anchor_x: 0.4, anchor_y: 0.5, speed:0.1, ease:false, melee:true, count:1, delay:450},
		"Hammer Arm":{path:"modules/jb2a_patreon/Library/Generic/Unarmed_Attacks/Unarmed_Strike/UnarmedStrike_01_Dark_Red_Physical02_800x600.webm", scale: 0.5, anchor_x: 0.4, anchor_y: 0.5, speed:0.1, ease:false, melee:true, count:1, delay:500},
		"Thunder Punch":{path:"modules/jb2a_patreon/Library/Generic/Unarmed_Attacks/Unarmed_Strike/UnarmedStrike_01_Regular_Yellow_Physical02_800x600.webm", scale: 0.8, anchor_x: 0.4, anchor_y: 0.5, speed:0.1, ease:false, melee:true, count:1, delay:500},
		"Fire Punch":{path:"modules/jb2a_patreon/Library/Generic/Unarmed_Attacks/Unarmed_Strike/UnarmedStrike_01_Regular_Orange_Magical02_800x600.webm", scale: 0.8, anchor_x: 0.4, anchor_y: 0.5, speed:0.1, ease:false, melee:true, count:1, delay:500},
		"Wake-Up Slap":{path:"modules/jb2a_patreon/Library/Generic/Unarmed_Attacks/Unarmed_Strike/UnarmedStrike_01_Dark_Red_Physical01_800x600.webm", scale: 0.5, anchor_x: 0.4, anchor_y: 0.5, speed:0.1, ease:false, melee:true, count:2},
		"Dual Chop":{path:"modules/jb2a_patreon/Library/Generic/Unarmed_Attacks/Flurry_Of_Blows/FlurryOfBlows_01_Regular_Blue_Physical01_800x600.webm", scale: 0.5, anchor_x: 0.4, anchor_y: 0.5, speed:0.1, ease:false, melee:true, count:2},
		"Thunder Shock":{path:"modules/jb2a_patreon/Library/3rd_Level/Lightning_Bolt/LightningBolt_01_Regular_Green_4000x400.webm", scale: 0.1, anchor_x: 0.03, anchor_y: 0.5, speed:0.1, ease:false, melee:false, count:1},
		"Thunderbolt":{path:"modules/jb2a_patreon/Library/3rd_Level/Lightning_Bolt/LightningBolt_01_Regular_Green_4000x400.webm", scale: 0.1, anchor_x: 0.03, anchor_y: 0.5, speed:0.1, ease:false, melee:false, count:1},
		"Thunder Wave":{path:"modules/jb2a_patreon/Library/Generic/Lightning/LightningBall_01_Regular_Green_400x400.webm", scale: 0.4, anchor_x: 0.15, anchor_y: 0.5, speed:0, ease:"OutCirc", melee:false, count:1},
		"Thunder Wave [OG]":{path:"modules/jb2a_patreon/Library/Generic/Lightning/LightningBall_01_Regular_Green_400x400.webm", scale: 0.4, anchor_x: 0.15, anchor_y: 0.5, speed:0, ease:"OutCirc", melee:false, count:1},
		"Thunder":{path:"modules/jb2a_patreon/Library/Generic/Lightning/LightningStrike_01b_800x800.webm", scale: 2, anchor_x: 0.5, anchor_y: 0.5, speed:0.1, ease:"OutCirc", melee:false, count:1},
		"Bullet Seed":{path:"modules/jb2a_patreon/Library/Generic/Weapon_Attacks/Ranged/Bullet_01_Regular_Green_30ft_1600x400.webm", scale: 0.6, anchor_x: 0.15, anchor_y: 0.5, speed:0.1, ease:false, melee:false, count:5},
		"Flamethrower":{path:"modules/jb2a_patreon/Library/Generic/Fire/FireJet_01_Orange_30ft_1200x200.webm", scale: 0.4, anchor_x: 0.05, anchor_y: 0.5, speed:0.1, ease:false, melee:false, count:1},
		"Water Gun":{path:"modules/jb2a_patreon/Library/Generic/Weapon_Attacks/Ranged/Snipe_01_Regular_Blue_30ft_1600x400.webm", scale: 0.35, anchor_x: 0.15, anchor_y: 0.5, speed:0.1, ease:false, melee:false, count:1},
		"Snipe Shot":{path:"modules/jb2a_patreon/Library/Generic/Weapon_Attacks/Ranged/Snipe_01_Regular_Blue_30ft_1600x400.webm", scale: 0.6, anchor_x: 0.15, anchor_y: 0.5, speed:0.1, ease:false, melee:false, count:1},
		"Water Pulse":{path:"modules/jb2a_patreon/Library/Generic/Weapon_Attacks/Ranged/Snipe_01_Regular_Blue_30ft_1600x400.webm", scale: 0.6, anchor_x: 0.15, anchor_y: 0.5, speed:0.1, ease:false, melee:false, count:5},
		"Dragon Pulse":{path:"modules/jb2a_patreon/Library/Generic/Weapon_Attacks/Ranged/Snipe_01_Regular_Blue_30ft_1600x400.webm", scale: 0.6, anchor_x: 0.15, anchor_y: 0.5, speed:0.1, ease:false, melee:false, count:5},
		"Dark Pulse":{path:"modules/jb2a_patreon/Library/Generic/Weapon_Attacks/Ranged/Snipe_01_Regular_Red_30ft_1600x400.webm", scale: 0.6, anchor_x: 0.15, anchor_y: 0.5, speed:0.1, ease:false, melee:false, count:5, frequency:375},
		"Bite":{path:"modules/jb2a_patreon/Library/Generic/Creature/Bite_01_Regular_Purple_400x400.webm", scale: 0.5, anchor_x: 0.1, anchor_y: 0.5, speed:0.1, ease:false, melee:true, count:1},
		"Crunch":{path:"modules/jb2a_patreon/Library/Generic/Creature/Bite_01_Regular_Purple_400x400.webm", scale: 0.5, anchor_x: 0.1, anchor_y: 0.5, speed:0.1, ease:false, melee:true, count:1},
		"Fire Fang":{path:"modules/jb2a_patreon/Library/Generic/Creature/Bite_01_Regular_Orange_400x400.webm", scale: 0.5, anchor_x: 0.1, anchor_y: 0.5, speed:0.1, ease:false, melee:true, count:1},
		"Thunder Fang":{path:"modules/jb2a_patreon/Library/Generic/Creature/Bite_01_Regular_Yellow_400x400.webm", scale: 0.5, anchor_x: 0.1, anchor_y: 0.5, speed:0.1, ease:false, melee:true, count:1},
		"Night Slash":{path:"modules/jb2a_patreon/Library/Generic/Creature/Claws_01_Dark_Red_400x400.webm", scale: 0.5, anchor_x: 0.1, anchor_y: 0.5, speed:0.1, ease:false, melee:true, count:2, delay:200, frequency:600},
		"Shadow Claw":{
			path:"modules/jb2a_patreon/Library/Generic/Creature/Claws_01_Dark_Red_400x400.webm", 
			precursor:"modules/jb2a_patreon/Library/TMFX/OutPulse/Circle/OutPulse_01_Circle_Normal_500.webm", 
			scale: 0.5, anchor_x: 0.1, anchor_y: 0.5, speed:0.1, ease:false, melee:true, count:1, delay:400,
			precursor_delay:0, precursor_speed:0.1, precursor_scale:0.8, precursor_count:1, precursor_frequency:100, precursor_anchor_x:0.5, precursor_anchor_y:0.5, 
		},
		"Metal Claw":{path:"modules/jb2a_patreon/Library/Generic/Creature/Claws_01_Bright_Blue_400x400.webm", scale: 0.5, anchor_x: 0.1, anchor_y: 0.5, speed:0.1, ease:false, melee:true, count:1},
		"Fury Swipes":{path:"modules/jb2a_patreon/Library/Generic/Creature/Claws_01_Bright_Orange_400x400.webm", scale: 0.5, anchor_x: 0.1, anchor_y: 0.5, speed:0.1, ease:false, melee:true, count:5},
		"Double-Edge":{path:"modules/jb2a_patreon/Library/Generic/Weapon_Attacks/Melee/DmgSlashing_01_Regular_Yellow_2Handed_800x600.webm", scale: 0.5, anchor_x: 0.4, anchor_y: 0.5, speed:0.1, ease:false, melee:true, count:1},
		"Aerial Ace":{
			path:"modules/jb2a_patreon/Library/Generic/Weapon_Attacks/Melee/DmgPiercing_01_Regular_Yellow_1Handed_800x600.webm",
			precursor:"modules/jb2a_patreon/Library/Generic/Marker/EnergyStrands_01_Regular_Blue_600x600.webm", precursor_delay:0, precursor_speed:0.1, precursor_scale:0.4, precursor_count:1, precursor_frequency:100,
			precursor_anchor_x:0.5, precursor_anchor_y:0.5, 
			scale: 0.5, anchor_x: 0.4, anchor_y: 0.5, speed:0.1, ease:false, melee:true, count:4, frequency:100, delay:100,
		},
		"Air Slash":{
			path:"modules/jb2a_patreon/Library/Generic/Energy/EnergyStrand_01_Regular_Blue_30ft_1600x400.webm", 
			precursor:"modules/jb2a_patreon/Library/Generic/Energy/EnergyStrand_04_Regular_Blue_30ft_1600x400.webm",
			scale: 0.6, anchor_x: 0.15, anchor_y: 0.5, speed:0.1, ease:false, melee:false, count:1, precursor_count: 1,
		},
		"Stored Power":{path:"modules/jb2a_patreon/Library/Cantrip/Eldritch_Blast/EldritchBlast_01_Regular_Pink_30ft_1600x400.webm", scale: 0.9, anchor_x: 0.15, anchor_y: 0.5, speed:0.1, ease:false, melee:false, count:5},
		"Zap Cannon":{path:"modules/jb2a_patreon/Library/3rd_Level/Lightning_Bolt/LightningBolt_01_Regular_Green_4000x400.webm", scale: 0.3, anchor_x: 0.00, anchor_y: 0.5, speed:0.1, ease:false, melee:false, count:1},
		"Earthquake":{
			path:"modules/jb2a_patreon/Library/Generic/Template/Circle/OutPulse/OutPulse_02_Regular_GreenOrange_Burst_600x600.webm",
			precursor:"modules/jb2a_patreon/Library/Generic/Impact/GroundCrackImpact_01_Regular_Orange_600x600.webm", 
			scale: 1.2, anchor_x: 0.5, anchor_y: 0.5, speed:0.1, ease:false, melee:false, count:15,
			precursor_count:1, precursor_scale: 1.5, precursor_frequency:200, precursor_delay: 800,
		},
		"Explosion":{
			path:"modules/jb2a_patreon/Library/Generic/Explosion/Explosion_02_Orange_400x400.webm", 
			precursor:"modules/jb2a_patreon/Library/Generic/Impact/GroundCrackImpact_01_Regular_Orange_600x600.webm", 
			scale: 1.2, anchor_x: 0.5, anchor_y: 0.5, speed:0.1, ease:false, melee:false, count:4, delay: 2000, frequency:150, 
			precursor_count:1, precursor_delay:0, precursor_frequency:200,
		},
		"Self-Destruct":{
			path:"modules/jb2a_patreon/Library/Generic/Explosion/Explosion_02_Orange_400x400.webm", 
			precursor:"modules/jb2a_patreon/Library/Generic/Impact/GroundCrackImpact_01_Regular_Orange_600x600.webm", 
			scale: 1.6, anchor_x: 0.5, anchor_y: 0.5, speed:0.1, ease:false, melee:false, count:2, delay: 1000, frequency:2000, 
			precursor_count:2, precursor_delay:0, precursor_frequency:3000,
		},
		"Aura Sphere":{
			path:"modules/jb2a_patreon/Library/1st_Level/Shield/Shield_02_Regular_Blue_OutroExplode_400x400.webm", 
			precursor:"modules/jb2a_patreon/Library/1st_Level/Shield/Shield_02_Regular_Blue_Intro_400x400.webm", 
			scale: 0.2, anchor_x: 0.15, anchor_y: 0.5, speed:"auto", ease:"InOutCirc", melee:false, count:1, delay:0, 
			precursor_delay:0, precursor_speed:0.1, precursor_scale:0.8, precursor_count:10, precursor_frequency:100,
			precursor_anchor_x:0.5, precursor_anchor_y:0.5, 
		},
		"Shadow Ball":{
			path:"modules/jb2a_patreon/Library/Generic/Lightning/LightningBall_01_Dark_Purple_400x400.webm", 
			precursor:"modules/jb2a_patreon/Library/TMFX/OutPulse/Circle/OutPulse_01_Circle_Normal_500.webm", 
			scale: 0.2, anchor_x: 0.15, anchor_y: 0.5, speed:"auto", ease:"InOutCirc", melee:false, count:1, delay:0, 
			precursor_delay:0, precursor_speed:0.1, precursor_scale:0.8, precursor_count:1, precursor_frequency:100, precursor_anchor_x:0.5, precursor_anchor_y:0.5, 
		},
		"Energy Ball":{
			path:"modules/jb2a_patreon/Library/2nd_Level/Flaming_Sphere/FlamingSphere_01_Green_200x200.webm", 
			precursor:"modules/jb2a_patreon/Library/Generic/Weapon_Attacks/Ranged/Bullet_01_Regular_Green_30ft_1600x400.webm", 
			scale: 0.4, anchor_x: 0.15, anchor_y: 0.5, speed:2000, ease:"InOutCirc", melee:false, count:1, delay:0, 
			precursor_delay:1500, precursor_speed:0.1, precursor_count:13, precursor_frequency:100,
			precursor_scale: 0.7, precursor_anchor_x: 0.15, precursor_anchor_y: 0.5, precursor_ease:false,
		},
		"Razor Leaf":{
			path:"modules/jb2a_patreon/Library/Generic/Energy/EnergyStrand_02_Dark_Green_30ft_1600x400.webm", 
			precursor:"modules/jb2a_patreon/Library/Generic/Energy/EnergyStrand_04_Dark_Green_30ft_1600x400.webm",
			scale: 0.2, anchor_x: 0.15, anchor_y: 0.5, speed:0.1, ease:false, melee:true, count:7, precursor_count: 7, frequency: 100,
		},
		"Tackle":{path:"modules/jb2a_patreon/Library/Generic/Weapon_Attacks/Melee/DmgBludgeoning_01_Regular_Yellow_1Handed_800x600.webm", scale: 1.0, anchor_x: 0.5, anchor_y: 0.5, speed:0.1, ease:false, melee:true, count:1, delay:650},
		"Quick Attack":{path:"modules/jb2a_patreon/Library/Generic/Weapon_Attacks/Melee/DmgPiercing_01_Regular_Yellow_2Handed_800x600.webm", scale: 0.6, anchor_x: 0.5, anchor_y: 0.5, speed:0.1, ease:false, melee:true, count:1, delay:300},
		"Tail Whip":{
			path:"modules/jb2a_patreon/Library/Generic/Energy/SwirlingSparkles_01_Regular_OrangePurple_400x400.webm", 
			precursor:"modules/jb2a_patreon/Library/Generic/Template/Circle/OutPulse/OutPulse_02_Regular_BlueWhite_Burst_600x600.webm", 
			scale: 1.2, anchor_x: 0.5, anchor_y: 0.5, speed:0.1, ease:false, melee:false, count:2, delay: 0, frequency:500, 
			precursor_count:1, precursor_delay:0, precursor_frequency:200, precursor_scale:0.6,
		},
		"Bone Rush":{
			path:"modules/jb2a_patreon/Library/Generic/Weapon_Attacks/Melee/GreatClub01_Fire_Regular_Blue_800x600.webm", 
			precursor:"modules/jb2a_patreon/Library/Generic/Impact/GroundCrackImpact_02_Regular_Blue_600x600.webm",
			scale: 0.3, anchor_x: 0.3, anchor_y: 0.5, speed:0.1, ease:false, melee:true, count:5,
			precursor_count:1, precursor_scale: 0.5, precursor_frequency:200, precursor_delay: 1000, precursor_anchor_y: 0.5, precursor_anchor_x: 0.2,
		},
		"Ember":{path:"modules/jb2a_patreon/Library/Cantrip/Fire_Bolt/FireBolt_01_Regular_Orange_30ft_1600x400.webm", scale: 0.3, anchor_x: 0.15, anchor_y: 0.5, speed:0.1, ease:false, melee:false, count:4, delay:0, frequency:150},
		"Flame Burst":{
			path:"modules/jb2a_patreon/Library/3rd_Level/Fireball/FireballExplosion_01_Orange_800x800.webm", 
			precursor:"modules/jb2a_patreon/Library/Cantrip/Fire_Bolt/FireBolt_01_Regular_Orange_30ft_1600x400.webm", 
			scale: 0.5, anchor_x: -1.0, anchor_y: 0.5, speed:0.1, ease:"InOutCirc", melee:false, count:1, delay:1000, 
			precursor_delay:0, precursor_speed:0.1, precursor_scale:0.5, precursor_count:1, precursor_frequency:100, precursor_anchor_x:0.15, precursor_anchor_y:0.5, 
		},
		"Will-O-Wisp":{path:"modules/jb2a_patreon/Library/2nd_Level/Flaming_Sphere/FlamingSphere_02_Orange_200x200.webm", scale: 0.2, anchor_x: 0.15, anchor_y: 0.5, speed:200, ease:"OutCirc", melee:false, count:1},
		"Confuse Ray":{path:"modules/jb2a_patreon/Library/Generic/Energy/EnergyBeam_01_Regular_Blue_30ft_1600x400.webm", scale: 0.5, anchor_x: 0.15, anchor_y: 0.5, speed:0.1, ease:false, melee:false, count:1},
		"Feint Attack":{
			path:"modules/jb2a_patreon/Library/Generic/Weapon_Attacks/Melee/DmgPiercing_01_Regular_Yellow_1Handed_800x600.webm", 
			precursor:"modules/jb2a_patreon/Library/1st_Level/Sneak_Attack/Sneak_Attack_Dark_Red_300x300.webm", 
			scale: 0.5, anchor_x: 0.4, anchor_y: 0.5, speed:0.1, ease:false, melee:true, count:1, delay:800,
			precursor_delay:0, precursor_speed:0.1, precursor_scale:0.8, precursor_count:1, precursor_frequency:100, precursor_anchor_x:0.5, precursor_anchor_y:0.5, 
		},
		"Take Down":{
			path:"modules/jb2a_patreon/Library/Generic/Weapon_Attacks/Melee/DmgBludgeoning_01_Regular_Yellow_2Handed_800x600.webm", 
			precursor:"modules/jb2a_patreon/Library/Generic/Conditions/Dizzy_Stars/DizzyStars_01_White_200x200.webm", 
			scale: 0.5, anchor_x: 0.4, anchor_y: 0.5, speed:0.1, ease:false, melee:true, count:1, delay:800,
			precursor_count:1, precursor_scale: 0.5, precursor_frequency:200, precursor_delay: 1000, precursor_anchor_y: 0.5, precursor_anchor_x: -1.0,
		},
		"Fire Spin":{
			path:"modules/jb2a_patreon/Library/7th_Level/Whirlwind/Whirlwind_01_Red_400x400.webm", 
			precursor:"modules/jb2a_patreon/Library/Cantrip/Fire_Bolt/FireBolt_01_Regular_Orange_30ft_1600x400.webm", 
			scale: 0.5, anchor_x: -1.0, anchor_y: 0.5, speed:0.1, ease:"InOutCirc", melee:false, count:1, delay:1000, 
			precursor_delay:0, precursor_speed:0.1, precursor_scale:0.2, precursor_count:10, precursor_frequency:100, precursor_anchor_x:0.15, precursor_anchor_y:0.5, 
		},
		"Payback":{
			path:"modules/jb2a_patreon/Library/Generic/Weapon_Attacks/Melee/DmgPiercing_01_Regular_Yellow_1Handed_800x600.webm", 
			precursor:"modules/jb2a_patreon/Library/1st_Level/Sneak_Attack/Sneak_Attack_Dark_Red_300x300.webm", 
			scale: 0.5, anchor_x: 0.4, anchor_y: 0.5, speed:0.1, ease:false, melee:true, count:4, delay:2200, frequency:150,
			precursor_delay:500, precursor_speed:0.1, precursor_scale:0.8, precursor_count:1, precursor_frequency:100, precursor_anchor_x:0.5, precursor_anchor_y:0.5, 
		},
		"Bubble":{path:"modules/jb2a_patreon/Library/Generic/Marker/MarkerBubbleOutro_01_Regular_Blue_400x400.webm", scale: 0.8, anchor_x: 0.5, anchor_y: 0.5, speed:0.1, ease:false, melee:false, count:5, delay: 0, frequency:200, },
		"Bubblebeam":{
			path:"modules/jb2a_patreon/Library/Cantrip/Dancing_Lights/DancingLights_01_BlueTeal_200x200.webm", 
			precursor:"modules/jb2a_patreon/Library/Cantrip/Dancing_Lights/DancingLights_01_BlueTeal_200x200.webm", 
			scale: 0.05, anchor_x: 0.15, anchor_y: 0.5, speed:150, ease:"OutCirc", melee:true, count:10, delay:0, frequency:300,
			precursor_scale: 0.03, precursor_anchor_x: 0.15, precursor_anchor_y: 0.5, precursor_speed:150, precursor_ease:"OutCirc", melee:true, precursor_count:15, precursor_delay:0, frequency:250,
		},
		"Bubble Beam":{
			path:"modules/jb2a_patreon/Library/Generic/Marker/MarkerBubbleOutro_01_Regular_Blue_400x400.webm", 
			precursor:"modules/jb2a_patreon/Library/Generic/Marker/MarkerBubbleOutro_01_Regular_Blue_400x400.webm", 
			scale: 0.05, anchor_x: 0.15, anchor_y: 0.5, speed:150, ease:"OutCirc", melee:true, count:10, delay:0, frequency:300,
			precursor_scale: 0.03, precursor_anchor_x: 0.15, precursor_anchor_y: 0.5, precursor_speed:150, precursor_ease:"OutCirc", melee:true, precursor_count:15, precursor_delay:0, frequency:250,
		},
		"Liquidation":{
			path:"modules/jb2a_patreon/Library/Generic/Weapon_Attacks/Melee/DmgPiercing_01_Regular_Yellow_1Handed_800x600.webm", 
			precursor:"modules/jb2a_patreon/Library/1st_Level/Thunderwave/Thunderwave_01_Bright_Blue_Center_600x600.webm", 
			scale: 0.5, anchor_x: 0.4, anchor_y: 0.5, speed:0.1, ease:false, melee:true, count:4, delay:1500, frequency:150,
			precursor_delay:500, precursor_speed:0.1, precursor_scale:0.8, precursor_count:1, precursor_frequency:100, precursor_anchor_x:0.5, precursor_anchor_y:0.5, 
		},
		"Peck":{path:"modules/jb2a_patreon/Library/Generic/Weapon_Attacks/Melee/DmgPiercing_01_Regular_Yellow_1Handed_800x600.webm", scale: 0.5, anchor_x: 0.5, anchor_y: 0.5, speed:0.1, ease:false, melee:true, count:2, delay:0, frequency:900},
		"Slash":{path:"modules/jb2a_patreon/Library/Generic/Energy/EnergyStrand_Multiple01_Regular_Blue_30ft_1600x400.webm", scale: 0.35, anchor_x: 0.15, anchor_y: 0.5, speed:0.1, ease:false, melee:false, count:1},
		"Leaf Blade":{
			path:"modules/jb2a_patreon/Library/Generic/Energy/EnergyStrand_02_Dark_Green_30ft_1600x400.webm", 
			precursor:"modules/jb2a_patreon/Library/Generic/Energy/EnergyStrand_03_Dark_Green_30ft_1600x400.webm", 
			scale: 0.35, anchor_x: 0.15, anchor_y: 0.5, speed:0.1, ease:false, melee:false, count:5, frequency: 200, delay:0,
			precursor_count:5, precursor_scale: 0.35, precursor_delay: 50, precursor_frequency: 200, precursor_anchor_x: 0.15, precursor_anchor_y: 0.5,
		},
		"Surf":{
			path:"modules/jb2a_patreon/Library/Generic/Energy/EnergyStrand_01_Regular_Blue_30ft_1600x400.webm", 
			precursor:"modules/jb2a_patreon/Library/Generic/Energy/EnergyStrand_03_Regular_Blue_30ft_1600x400.webm", 
			scale: 0.52, anchor_x: 0.15, anchor_y: 0.5, speed:0.1, ease:false, melee:false, count:5, frequency: 200, delay:0,
			precursor_count:5, precursor_scale: 0.52, precursor_delay: 50, precursor_frequency: 200, precursor_anchor_x: 0.15, precursor_anchor_y: 0.5,
		},

	};

	let actor_tokens = actor.getActiveTokens();
	let actor_token = actor_tokens[0];
	let actor_token_scale = 1;
	if(actor_token.data.height >1 || actor_token.data.width >1)
	{
		actor_token_scale = Math.max(actor_token.data.height, actor_token.data.width)
	}

	let target_tokens = target.getActiveTokens();
	let target_token = target_tokens[0];

	let rangeToTarget = GetDistanceBetweenTokens(actor_token, target_token);
	let effect_path = generic_move_effect;
	let effect_scale = 0.9;
	let effect_anchor_x = 0.15;
	let effect_anchor_y = 0.5;
	let effect_speed = 0.1;
	let effect_ease = false;
	let effect_count = 1;
	let effects_cast_so_far = 0;
	let effect_angle = 0;
	let effect_angle_multiplier = 20;
	let effect_delay = 0;
	let effect_frequency = 200;

	let effect_precursor_path = generic_precursor_effect;
	let effect_precursor_scale = 0.9;
	let effect_precursor_anchor_x = 0.15;
	let effect_precursor_anchor_y = 0.5;
	let effect_precursor_speed = 0.1;
	let effect_precursor_ease = false;
	let effect_precursor_count = 1;
	let effects_precursor_cast_so_far = 0;
	let effect_precursor_angle = 0;
	let effect_precursor_angle_multiplier = 20;
	let effect_precursor_delay = 0;
	let effect_precursor_frequency = 200;

	if(specific_move_effect_table[move.name])
	{
		effect_path = specific_move_effect_table[move.name]["path"];
		effect_scale = specific_move_effect_table[move.name]["scale"];
		effect_anchor_x = specific_move_effect_table[move.name]["anchor_x"];
		effect_anchor_y = specific_move_effect_table[move.name]["anchor_y"];
		effect_speed = specific_move_effect_table[move.name]["speed"];
		effect_ease = specific_move_effect_table[move.name]["ease"];
		effect_count = specific_move_effect_table[move.name]["count"];
		if(!specific_move_effect_table[move.name]["melee"])
		{
			actor_token_scale = 1;
			effect_angle_multiplier = 2;
		}
		if(specific_move_effect_table[move.name]["delay"])
		{
			effect_delay = specific_move_effect_table[move.name]["delay"];
		}
		if(specific_move_effect_table[move.name]["frequency"])
		{
			effect_frequency = specific_move_effect_table[move.name]["frequency"];
		}

		if(specific_move_effect_table[move.name]["precursor"])
		{
			effect_precursor_path = specific_move_effect_table[move.name]["precursor"];

			if(!specific_move_effect_table[move.name]["melee"])
			{
				effect_precursor_angle_multiplier = 2;
			}

			if(specific_move_effect_table[move.name]["precursor_anchor_x"])
			{
				effect_precursor_anchor_x = specific_move_effect_table[move.name]["precursor_anchor_x"];
			}
			else
			{
				effect_precursor_anchor_x = effect_anchor_x
			}

			if(specific_move_effect_table[move.name]["precursor_anchor_y"] !== null)
			{
				effect_precursor_anchor_y = specific_move_effect_table[move.name]["precursor_anchor_y"];
			}
			else
			{
				effect_precursor_anchor_y = effect_anchor_y
			}

			if(specific_move_effect_table[move.name]["precursor_scale"])
			{
				effect_precursor_scale = specific_move_effect_table[move.name]["precursor_scale"];
			}
			else
			{
				effect_precursor_scale = effect_scale;
			}

			if(specific_move_effect_table[move.name]["precursor_delay"] !== null)
			{
				effect_precursor_delay = specific_move_effect_table[move.name]["precursor_delay"];
			}
			else
			{
				effect_precursor_delay = effect_delay;
			}

			if(specific_move_effect_table[move.name]["precursor_speed"] !== null)
			{
				effect_precursor_speed = specific_move_effect_table[move.name]["precursor_speed"];
			}
			else
			{
				effect_precursor_speed = effect_speed;
			}

			if(specific_move_effect_table[move.name]["precursor_ease"] !== null)
			{
				effect_precursor_ease = specific_move_effect_table[move.name]["precursor_ease"];
			}
			else
			{
				effect_precursor_ease = effect_ease;
			}

			if(specific_move_effect_table[move.name]["precursor_count"] !== null)
			{
				effect_precursor_count = specific_move_effect_table[move.name]["precursor_count"];
			}
			else
			{
				effect_precursor_count = effect_count;
			}

			if(specific_move_effect_table[move.name]["precursor_frequency"] !== null)
			{
				effect_precursor_frequency = specific_move_effect_table[move.name]["precursor_frequency"];
			}
			else
			{
				effect_precursor_frequency = effect_frequency;
			}
		}
	}

	function castSpell(effect) {
		canvas.specials.drawSpecialToward(effect, actor_token, target_token);
	}

	async function precursor_callback(i1)
	{
		await castSpell({
			file: effect_precursor_path,
			anchor: {
				x: effect_precursor_anchor_x,
				y: effect_precursor_anchor_y,
			},
			speed: effect_precursor_speed,
			angle: effect_precursor_angles[i1],
			scale: {
				x: Number(effect_precursor_scale * actor_token_scale),
				y: Number(effect_precursor_scale * actor_token_scale),
			},
			ease: effect_precursor_ease,
		});
	}

	async function callback(i)
	{
		await castSpell({
			file: effect_path,
			anchor: {
				x: effect_anchor_x,
				y: effect_anchor_y,
			},
			speed: effect_speed,
			angle: effect_angles[i],
			scale: {
				x: Number(effect_scale * actor_token_scale),
				y: Number(effect_scale * actor_token_scale),
			},
			ease: effect_ease,
		});
	}

	let effect_angles = [effect_count];
	let effect_precursor_angles = [effect_precursor_count];






	while(effects_precursor_cast_so_far < effect_precursor_count)
	{
		effect_precursor_angles[effects_precursor_cast_so_far] = Math.sin(effects_precursor_cast_so_far)*effect_precursor_angle_multiplier;
		effects_precursor_cast_so_far++;
	}

	effects_precursor_cast_so_far = 0;

	while(effects_precursor_cast_so_far < effect_precursor_count)
	{
		setTimeout( precursor_callback, Number( (effect_precursor_frequency*effects_precursor_cast_so_far) + effect_precursor_delay), effects_precursor_cast_so_far);
		effects_precursor_cast_so_far++;
	}



	while(effects_cast_so_far < effect_count)
	{
		effect_angles[effects_cast_so_far] = Math.sin(effects_cast_so_far)*effect_angle_multiplier;
		effects_cast_so_far++;
	}

	effects_cast_so_far = 0;

	while(effects_cast_so_far < effect_count)
	{
		setTimeout( callback, Number( (effect_frequency*effects_cast_so_far) + effect_delay), effects_cast_so_far);
		effects_cast_so_far++;
	}
	

}


export async function isMoveOnCooldown(move_item)
{
	let return_value = false;

	// if()
	// {

	// }

	return return_value;
}


export async function getMoveUsesExpended(move_item)
{
	let return_value = 0;

	// if()
	// {

	// }

	return return_value;
}


export async function expendMove(move_item)
{
	let return_value = 0;

	// if()
	// {

	// }

	return return_value;
}


export async function getMoveCooldownStatusIcon(move_item)
{
	let return_value = "";

	// if()
	// {

	// }

	return return_value;
}