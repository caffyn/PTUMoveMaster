
import { MoveMasterBonusDamageOptions } from './MoveMasterBonusDamageForm.js'
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
		hint: "This will make all combatants reset their combat stages when you end an encounter.",
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
} 

Hooks.once('init', async function() 
{
	_loadModuleSettings();
	game.PTUMoveMaster = {
		PTUAutoFight,
		RollDamageMove,
		MoveMasterBonusDamageOptions,
		MoveMasterBonusDamageReductionOptions,
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
		PerformStruggleAttack,
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
		TakeStandardAction,
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
		applyDamageWithBonus: applyDamageWithBonusDR,
		SidebarForm,
	};

	let sidebar = new game.PTUMoveMaster.SidebarForm();
	sidebar.render(true);
	//debug(sidebar);
});


Hooks.on("updateCombat", async (combat, update, options, userId) => {

	let current_token = game.combat.current.tokenId;
	let current_token_species = canvas.tokens.get(current_token).actor.data.data.species;

	if(current_token_species)
	{
		game.ptu.PlayPokemonCry(current_token_species);
	}
});


Hooks.on("preDeleteCombat", async (combat) => {

	if(game.settings.get("PTUMoveMaster", "autoResetStagesOnCombatEnd"))
	{
		let combatants = combat.data.combatants;
		for(let combatant of combatants)
		{
			await game.PTUMoveMaster.ResetStagesToDefault(combatant.actor);
		}
	}
});


Hooks.on("controlToken", async (token, selected) => {
	if(selected)
	{
		PTUAutoFight().ChatWindow(token.actor);
	}
	else
	{
		let sidebar = new game.PTUMoveMaster.SidebarForm();
		sidebar.render(true);
	}
});


Hooks.on("targetToken", async (user, token, targeted) => {
	if(user.data._id == game.user._id)
	{
		let selected_token = canvas.tokens.controlled[0];
		if(selected_token)
		{
			PTUAutoFight().ChatWindow(selected_token.actor);
		}
		// else
		// {
		// 	let sidebar = new game.PTUMoveMaster.SidebarForm();
		// 	sidebar.render(true);
		// }
	}
});


Hooks.on("createToken", (scene, tokenData, options, id) => { // If an owned Pokemon is dropped onto the field, play pokeball release sound, and create lightshow

	setTimeout(() => {

		let pokeball = "Basic Ball"
		let actor = game.actors.get(tokenData.actorId);

		function capitalizeFirstLetter(string) {
			return string[0].toUpperCase() + string.slice(1);
		}

		if(actor)
		{
			let target_token;

			if(tokenData.actorLink == false)
			{
				target_token = canvas.tokens.get(tokenData._id);//.slice(-1)[0]; // The thrown pokemon
			}
			else
			{
				target_token = game.actors.get(actor._id).getActiveTokens().slice(-1)[0]; // The thrown pokemon
			}

			let current_token_species = actor.name;
			if(actor.data.data.species)
			{
				current_token_species = capitalizeFirstLetter((actor.data.data.species).toLowerCase());
			}
			
			let current_token_nature = "";
			if(actor.data.data.nature)
			{
				current_token_nature = capitalizeFirstLetter((actor.data.data.nature.value).toLowerCase());
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
					game.actors.get(actor._id).getActiveTokens().slice(-1)[0].delete(); // Delete the last (assumed to be latest, i.e. the one just dragged out) token
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
							canvas.fxmaster.drawSpecialToward(effect, actor_token, game.actors.get(actor._id).getActiveTokens().slice(-1)[0]);//target_token);
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
							"name": (current_token_nature+" "+current_token_species),
							"bar1.attribute": "health",
							"displayBars": 50,
							"displayName": 50
						});  
					}
					else
					{
						target_token.update({
							"name": (current_token_nature+" "+current_token_species),
							"displayName": 50
						});  
					}
				}
				else if (game.settings.get("PTUMoveMaster", "alwaysDisplayTokenHealth") == true)
				{
					target_token.update({
						"name": (current_token_nature+" "+current_token_species),
						"bar1.attribute": "health",
						"displayBars": 50,
					});  
				}
				else
				{
					target_token.update({"name": (current_token_nature+" "+current_token_species)});
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
});


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
		"effect-range": 20
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


const ResetEOTMark = "🔁⏳";
const ResetSceneMark = "🔁❌";
const ResetDailyMark = "🔁💤";

const AbilityIcon = "Ability: ";



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
const damage_sound_file = "In-Battle%20Held%20Item%20Activate.mp3";

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






/**
 * @typedef {Object} MoveMasterSidebarDialogButton
 * @property {string} icon            A Font Awesome icon for the button
 * @property {string} label           The label for the button
 * @property {Function} [callback]    A callback function that fires when the button is clicked
 */
/**
 * Create a dialog window displaying a title, a message, and a set of buttons which trigger callback functions.
 * @implements {Application}
 *
 * @param {Object} data               An object of dialog data which configures how the modal window is rendered
 * @param {string} data.title         The window title
 * @param {string} data.content       HTML content
 * @param {Function} [data.render]    A callback function invoked when the dialog is rendered
 * @param {Function} [data.close]     Common callback operations to perform when the dialog is closed
 * @param {Object<string, MoveMasterSidebarDialogButton>} data.buttons The buttons which are displayed as action choices for the dialog
 *
 * @param {Object} options            MoveMasterSidebarDialog rendering options, see :class:`Application`
 * @param {string} options.default    The name of the default button which should be triggered on Enter
 * @param {boolean} options.jQuery    Whether to provide jQuery objects to callback functions (if true) or plain
 *                                    HTMLElement instances (if false). This is currently true by default but in the
 *                                    future will become false by default.
 *
 * @example <caption>Constructing a custom dialog instance</caption>
 * let d = new MoveMasterSidebarDialog({
 *  title: "Test MoveMasterSidebarDialog",
 *  content: "<p>You must choose either Option 1, or Option 2</p>",
 *  buttons: {
 *   one: {
 *    icon: '<i class="fas fa-check"></i>',
 *    label: "Option One",
 *    callback: () => console.log("Chose One")
 *   },
 *   two: {
 *    icon: '<i class="fas fa-times"></i>',
 *    label: "Option Two",
 *    callback: () => console.log("Chose Two")
 *   }
 *  },
 *  default: "two",
 *  render: html => console.log("Register interactivity in the rendered dialog"),
 *  close: html => console.log("This always is logged no matter which option is chosen")
 * });
 * d.render(true);
 */
 class MoveMasterSidebarDialog extends Application {
	constructor(data, options) {
	  super(options);
	  this.data = data;
	}
	  /* -------------------------------------------- */
	/** @override */
	  static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
		  template: "templates/hud/dialog.html",
		classes: ["MoveMasterSidebarDialog"],
		width: 200,
		jQuery: true
	  });
	}
	/* -------------------------------------------- */
	/** @override */
	get title() {
	  return this.data.title || "MoveMasterSidebarDialog";
	}
	/* -------------------------------------------- */
	/** @override */
	getData(options) {
	  let buttons = Object.keys(this.data.buttons).reduce((obj, key) => {
		let b = this.data.buttons[key];
		b.cssClass = [key, this.data.default === key ? "default" : ""].filterJoin(" ");
		if ( b.condition !== false ) obj[key] = b;
		return obj;
	  }, {});
	  return {
		content: this.data.content,
		buttons: buttons
	  }
	}
	/* -------------------------------------------- */
	/** @override */
	activateListeners(html) {
	  html.find(".dialog-button").click(this._onClickButton.bind(this));
	  $(document).on('keydown.chooseDefault', this._onKeyDown.bind(this));
	  if ( this.data.render instanceof Function ) this.data.render(this.options.jQuery ? html : html[0]);
	}
	/* -------------------------------------------- */
	/**
	 * Handle a left-mouse click on one of the dialog choice buttons
	 * @param {MouseEvent} event    The left-mouse click event
	 * @private
	 */
	_onClickButton(event) {
	  const id = event.currentTarget.dataset.button;
	  const button = this.data.buttons[id];
	  this.submit(button);
	}
	/* -------------------------------------------- */
	/**
	 * Handle a keydown event while the dialog is active
	 * @param {KeyboardEvent} event   The keydown event
	 * @private
	 */
	_onKeyDown(event) {
	  // Close dialog
	  if ( event.key === "Escape" ) {
		event.preventDefault();
		event.stopPropagation();
		return this.close();
	  }
	  // Confirm default choice
	  if ( (event.key === "Enter") && this.data.default ) {
		event.preventDefault();
		event.stopPropagation();
		const defaultChoice = this.data.buttons[this.data.default];
		return this.submit(defaultChoice);
	  }
	}
	/* -------------------------------------------- */
	/**
	 * Submit the MoveMasterSidebarDialog by selecting one of its buttons
	 * @param {Object} button     The configuration of the chosen button
	 * @private
	 */
	submit(button) {
	  try {
		if (button.callback) button.callback(this.options.jQuery ? this.element : this.element[0]);
		//this.close(true);
		let current_actor = canvas.tokens.controlled[0].actor;
		setTimeout(() => {  PTUAutoFight().ChatWindow(current_actor); }, 100);
		
	  } catch(err) {
		ui.notifications.error(err);
		throw new Error(err);
	  }
	}
	/* -------------------------------------------- */
	/** @override */
	close() {
	  if ( this.data.close ) this.data.close(this.options.jQuery ? this.element : this.element[0]);
	  super.close();
	  $(document).off('keydown.chooseDefault');
	}
	/* -------------------------------------------- */
	/*  Factory Methods                             */
	/* -------------------------------------------- */
	/**
	 * A helper factory method to create simple confirmation dialog windows which consist of simple yes/no prompts.
	 * If you require more flexibility, a custom MoveMasterSidebarDialog instance is preferred.
	 *
	 * @param {string} title          The confirmation window title
	 * @param {string} content        The confirmation message
	 * @param {Function} yes          Callback function upon yes
	 * @param {Function} no           Callback function upon no
	 * @param {Function} render       A function to call when the dialog is rendered
	 * @param {boolean} defaultYes    Make "yes" the default choice?
	 * @param {boolean} rejectClose   Reject the Promise if the MoveMasterSidebarDialog is closed without making a choice.
	 * @param {Object} options        Additional rendering options passed to the MoveMasterSidebarDialog
	 *
	 * @return {Promise<*>}           A promise which resolves once the user makes a choice or closes the window
	 *
	 * @example
	 * let d = MoveMasterSidebarDialog.confirm({
	 *  title: "A Yes or No Question",
	 *  content: "<p>Choose wisely.</p>",
	 *  yes: () => console.log("You chose ... wisely"),
	 *  no: () => console.log("You chose ... poorly"),
	 *  defaultYes: false
	 * });
	 */
	static async confirm({title, content, yes, no, render, defaultYes=true, rejectClose=false, options={}}={}, old) {
	  // TODO: Support the old second-paramter options until 0.8.x release
	  if ( old ) {
		console.warn("You are passing an options object as a second parameter to MoveMasterSidebarDialog.confirm. This should now be passed in as the options key of the first parameter.")
		options = old;
	  }
	  return new Promise((resolve, reject) => {
		const dialog = new this({
		  title: title,
		  content: content,
		  buttons: {
			yes: {
			  icon: '<i class="fas fa-check"></i>',
			  label: game.i18n.localize("Yes"),
			  callback: html => {
				const result = yes ? yes(html) : true;
				resolve(result);
			  }
			},
			no: {
			  icon: '<i class="fas fa-times"></i>',
			  label: game.i18n.localize("No"),
			  callback: html => {
				const result = no ? no(html) : false;
				resolve(result);
			  }
			}
		  },
		  default: defaultYes ? "yes" : "no",
		  render: render,
		  close: () => {
			if ( rejectClose ) reject("The confirmation MoveMasterSidebarDialog was closed without a choice being made");
			else resolve(null);
		  },
		}, options);
		dialog.render(true);
	  });
	}
	/* -------------------------------------------- */
	/**
	 * A helper factory method to display a basic "prompt" style MoveMasterSidebarDialog with a single button
	 * @param {string} title          The confirmation window title
	 * @param {string} content        The confirmation message
	 * @param {string} label          The confirmation button text
	 * @param {Function} callback     A callback function to fire when the button is clicked
	 * @param {Function} render       A function that fires after the dialog is rendered
	 * @param {object} options        Additional rendering options
	 * @return {Promise<*>}           A promise which resolves when clicked, or rejects if closed
	 */
	static async prompt({title, content, label, callback, render, options={}}={}) {
	  return new Promise((resolve, reject) => {
		const dialog = new this({
		  title: title,
		  content: content,
		  buttons: {
			ok: {
			  icon: '<i class="fas fa-check"></i>',
			  label: label,
			  callback: html => {
				const result = callback(html);
				resolve(result);
			  }
			},
		  },
		  default: "ok",
		  render: render,
		  close: () => reject,
		}, options);
		dialog.render(true);
	  });
	}
  }
  /**
   * A UI utility to make an element draggable.
   */
  class Draggable {
	constructor(app, element, handle, resizable) {
	  // Setup element data
	  this.app = app;
	  this.element = element[0];
	  this.handle = handle || this.element;
	  this.resizable = resizable || false;
	  /**
	   * Duplicate the application's starting position to track differences
	   * @type {Object}
	   */
	  this.position = null;
	  /**
	   * Remember event handlers associated with this Draggable class so they may be later unregistered
	   * @type {Object}
	   */
	  this.handlers = {};
	  /**
	   * Throttle mousemove event handling to 60fps
	   * @type {number}
	   */
	  this._moveTime = 0;
	  // Activate interactivity
	  this.activateListeners();
	}
	/* ----------------------------------------- */
	/**
	 * Activate event handling for a Draggable application
	 * Attach handlers for floating, dragging, and resizing
	 */
	activateListeners() {
	  // Float to top
	  this.handlers["click"] = ["mousedown", this._onClickFloatTop.bind(this), {capture: true, passive: true}];
	  this.element.addEventListener(...this.handlers.click);
	  // Drag handlers
	  this.handlers["dragDown"] = ["mousedown", e => this._onDragMouseDown(e), false];
	  this.handlers["dragMove"] = ["mousemove", e => this._onDragMouseMove(e), false];
	  this.handlers["dragUp"] = ["mouseup", e => this._onDragMouseUp(e), false];
	  this.handle.addEventListener(...this.handlers.dragDown);
	  this.handle.classList.add("draggable");
	  // Resize handlers
	  if ( !this.resizable ) return;
	  let handle = $('<div class="window-resizable-handle"><i class="fas fa-arrows-alt-h"></i></div>')[0];
	  this.element.appendChild(handle);
	  // Register handlers
	  this.handlers["resizeDown"] = ["mousedown", e => this._onResizeMouseDown(e), false];
	  this.handlers["resizeMove"] = ["mousemove", e => this._onResizeMouseMove(e), false];
	  this.handlers["resizeUp"] = ["mouseup", e => this._onResizeMouseUp(e), false];
	  // Attach the click handler and CSS class
	  handle.addEventListener(...this.handlers.resizeDown);
	  this.handle.classList.add("resizable");
	}
	/* ----------------------------------------- */
	/**
	 * Handle left-mouse down events to float the window to the top of the rendering stack
	 * @param {MouseEvent} event      The mousedown event on the application element
	 * @private
	 */
	_onClickFloatTop(event) {
	  let z = Number(window.document.defaultView.getComputedStyle(this.element).zIndex);
	  if ( z <= _maxZ ) {
		this.element.style.zIndex = Math.min(++_maxZ, 9999);
	  }
	}
	/* ----------------------------------------- */
	/**
	 * Handle the initial mouse click which activates dragging behavior for the application
	 * @private
	 */
	_onDragMouseDown(event) {
	  event.preventDefault();
	  // Record initial position
	  this.position = duplicate(this.app.position);
	  this._initial = {x: event.clientX, y: event.clientY};
	  // Add temporary handlers
	  window.addEventListener(...this.handlers.dragMove);
	  window.addEventListener(...this.handlers.dragUp);
	}
	/* ----------------------------------------- */
	/**
	 * Move the window with the mouse, bounding the movement to ensure the window stays within bounds of the viewport
	 * @private
	 */
	_onDragMouseMove(event) {
	  event.preventDefault();
	  // Limit dragging to 60 updates per second
	  const now = Date.now();
	  if ( (now - this._moveTime) < (1000/60) ) return;
	  this._moveTime = now;
	  // Update application position
	  this.app.setPosition({
		left: this.position.left + (event.clientX - this._initial.x),
		top: this.position.top + (event.clientY - this._initial.y)
	  });
	}
	/* ----------------------------------------- */
	/**
	 * Conclude the dragging behavior when the mouse is release, setting the final position and removing listeners
	 * @private
	 */
	_onDragMouseUp(event) {
	  event.preventDefault();
	  window.removeEventListener(...this.handlers.dragMove);
	  window.removeEventListener(...this.handlers.dragUp);
	}
	/* ----------------------------------------- */
	/**
	 * Handle the initial mouse click which activates dragging behavior for the application
	 * @private
	 */
	_onResizeMouseDown(event) {
	  event.preventDefault();
	  // Limit dragging to 60 updates per second
	  const now = Date.now();
	  if ( (now - this._moveTime) < (1000/60) ) return;
	  this._moveTime = now;
	  // Record initial position
	  this.position = duplicate(this.app.position);
	  if ( this.position.height === "auto" ) this.position.height = this.element.clientHeight;
	  if ( this.position.width === "auto" ) this.position.width = this.element.clientWidth;
	  this._initial = {x: event.clientX, y: event.clientY};
	  // Add temporary handlers
	  window.addEventListener(...this.handlers.resizeMove);
	  window.addEventListener(...this.handlers.resizeUp);
	}
	/* ----------------------------------------- */
	/**
	 * Move the window with the mouse, bounding the movement to ensure the window stays within bounds of the viewport
	 * @private
	 */
	_onResizeMouseMove(event) {
	  event.preventDefault();
	  this.app.setPosition({
		width: this.position.width + (event.clientX - this._initial.x),
		height: this.position.height + (event.clientY - this._initial.y)
	  });
	}
	/* ----------------------------------------- */
	/**
	 * Conclude the dragging behavior when the mouse is release, setting the final position and removing listeners
	 * @private
	 */
	_onResizeMouseUp(event) {
	  event.preventDefault();
	  window.removeEventListener(...this.handlers.resizeMove);
	  window.removeEventListener(...this.handlers.resizeUp);
	  this.app._onResize(event);
	}
  }



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
			      user: game.user._id,
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
		let background_field = 'background-image: url("background_fields/BG_Field.png"); background-repeat: repeat-x; background-position: left bottom';
		
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
			var currentRound = game.combat.round;
			var currentEncounterID = game.combat.data._id;
		}

		var typeStrategist = [];
		var technician = false;

		for(let item of items) // START Ability Check Loop
		{
			if(item.name.search("Type Strategist \\(") > -1)
			{
				typeStrategist.push(item.name.slice(item.name.search('\\(')+1, item.name.search('\\)') ));
			}
			if(item.name.search("Technician") > -1)
			{
				technician = true;
			}
		} // END Ability Check Loop

		let dialogEditor;
		var buttons={};

		for(let item of items) // START STATUS MOVE LOOP
		{
			var currentid=item._id;
			var currentlabel=item.data.name;
			var currentCooldownLabel = "";
			var currentEffectivenessLabel = "";

			var currentFrequency=item.data.frequency;
			if(!currentFrequency)
			{
				currentFrequency = "";
			}
			
			if((item.data.LastRoundUsed == null || item.data.LastEncounterUsed == null ) && (currentFrequency.search("EOT") > -1 || currentFrequency.search("Scene") > -1 || currentFrequency.search("Daily") > -1))
			{
				for(let search_item of item_entities)
				{
					if (search_item._id == item._id)
					{
						await search_item.update({ "data.LastRoundUsed" : -2});
						await search_item.update({ "data.LastEncounterUsed": 0});
					}
				}
			}

			var currentLastRoundUsed = item.data.LastRoundUsed;
			var currentLastEncounterUsed = item.data.LastEncounterUsed;

			if(item.data.UseCount == null)
			{
				for(let search_item of item_entities)
				{
					if (search_item._id == item._id)
					{
						await search_item.update({ "data.UseCount": 0});
					}
				}
			}

			var currentUseCount = item.data.UseCount;
			var cooldownFileSuffix = "";

			if( (Number(currentRound - currentLastRoundUsed) < 2) && (currentEncounterID == currentLastEncounterUsed) )
				{
					cooldownFileSuffix = "_CD"
				}

			if(currentFrequency == "At-Will" || currentFrequency == "")
			{
				currentCooldownLabel = "<img src='" + AlternateIconPath + "AtWill" + CategoryIconSuffix + "' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
			}

			else if(currentFrequency == "EOT")
			{
				if( (Number(currentRound - currentLastRoundUsed) < 2) && (currentEncounterID == currentLastEncounterUsed) )
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "EOT_0" + CategoryIconSuffix + "' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
				else
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "EOT_1" + CategoryIconSuffix + "' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
			}

			else if(currentFrequency == "Scene")
			{
				if( Number(currentUseCount) >= 1 )
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "Scene1_0" + cooldownFileSuffix + CategoryIconSuffix + "' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
				else
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "Scene1_1" + cooldownFileSuffix + CategoryIconSuffix + "' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
			}

			else if(currentFrequency == "Scene x2")
			{
				if( Number(currentUseCount) >= 2 )
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "Scene2_0" + cooldownFileSuffix + CategoryIconSuffix + "' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
				else if( Number(currentUseCount) == 1 )
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "Scene2_1" + cooldownFileSuffix + CategoryIconSuffix + "' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
				else
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "Scene2_2" + cooldownFileSuffix + CategoryIconSuffix + "' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
			}

			else if(currentFrequency == "Scene x3")
			{
				if( Number(currentUseCount) >= 3 )
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "Scene3_0" + cooldownFileSuffix + CategoryIconSuffix + "' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
				else if( Number(currentUseCount) == 2 )
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "Scene3_1" + cooldownFileSuffix + CategoryIconSuffix + "' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
				else if( Number(currentUseCount) == 1 )
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "Scene3_2" + cooldownFileSuffix + CategoryIconSuffix + "' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
				else
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "Scene3_3" + cooldownFileSuffix + CategoryIconSuffix + "' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
			}

			else if(currentFrequency == "Daily")
			{
				if( Number(currentUseCount) >= 1 )
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "daily1_0" + cooldownFileSuffix + CategoryIconSuffix + "' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
				else
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "daily1_1" + cooldownFileSuffix + CategoryIconSuffix + "' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
			}

			else if(currentFrequency == "Daily x2")
			{
				if( Number(currentUseCount) >= 2 )
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "daily2_0" + cooldownFileSuffix + CategoryIconSuffix + "' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
				else if( Number(currentUseCount) == 1 )
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "daily2_1" + cooldownFileSuffix + CategoryIconSuffix + "' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
				else
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "daily2_2" + cooldownFileSuffix + CategoryIconSuffix + "' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
			}

			else if(currentFrequency == "Daily x3")
			{
				if( Number(currentUseCount) >= 3 )
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "daily3_0" + cooldownFileSuffix + CategoryIconSuffix + "' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
				else if( Number(currentUseCount) == 2 )
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "daily3_1" + cooldownFileSuffix + CategoryIconSuffix + "' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
				else if( Number(currentUseCount) == 1 )
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "daily3_2" + cooldownFileSuffix + CategoryIconSuffix + "' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
				else
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "daily3_3" + cooldownFileSuffix + CategoryIconSuffix + "' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
			}

			if(currentlabel == ""){
			currentlabel=item.name;
			}
			var currenttype=item.type;
			var currentCategory=item.data.category;
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
				if( (game.settings.get("PTUMoveMaster", "showEffectiveness") != "never") && (target) && (!isNaN(item.data.damageBase)) && (item.data.damageBase != "") && effectiveness)
				{
					if((target.data.disposition > DISPOSITION_HOSTILE) || (game.settings.get("PTUMoveMaster", "showEffectiveness") == "always") )
					{
						currentEffectivenessLabel = " (x"+effectiveness[item.data.type]+")";
						if (effectiveness[item.data.type] == 0.5)
						{
							effectivenessBackgroundColor = "#cc6666";
						}
						else if (effectiveness[item.data.type] == 1)
						{
							effectivenessBackgroundColor = "white";
							effectivenessTextColor = "black";
						}
						else if (effectiveness[item.data.type] == 0.25)
						{
							effectivenessBackgroundColor = "red";
							effectivenessTextColor = "white";
						}
						else if (effectiveness[item.data.type] == 0)
						{
							effectivenessBackgroundColor = "black";
							effectivenessTextColor = "white";
						}
						else if (effectiveness[item.data.type] < 0.25)
						{
							effectivenessBackgroundColor = "darkred";
							effectivenessTextColor = "white";
						}
						else if (effectiveness[item.data.type] == 1.5)
						{
							effectivenessBackgroundColor = "#6699cc";//"#3399ff";
							effectivenessTextColor = "black";
						}
						else if (effectiveness[item.data.type] > 1.5)
						{
							effectivenessBackgroundColor = "blue";
							effectivenessTextColor = "white";
						}
						if(game.settings.get("PTUMoveMaster", "showEffectivenessText") == "true")
						{
							effectivenessText = "<span style='font-size:30px'> / x "+(effectiveness[item.data.type].toString())+"</span>";
						}
					}
				}

				let currentMoveTypeLabel = "<div><img src='" + AlternateIconPath + item.data.category + CategoryIconSuffix + "' style='width:80px height:auto border:0px ! important;width:"+TypeIconWidth+"px;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img><img src='" + AlternateIconPath + item.data.type + TypeIconSuffix + "' style='width:80px height:auto border:0px ! important;width:"+TypeIconWidth+"px;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img></div>";
				if(item.data.type == "Untyped" || item.data.type == "" || item.data.type == null)
				{
					currentMoveTypeLabel = "<div><img src='" + AlternateIconPath + item.data.category + CategoryIconSuffix + "' style='width:80px height:auto border:0px ! important;width:"+TypeIconWidth+"px;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img><img src='" + AlternateIconPath + "Untyped" + TypeIconSuffix + "' style='width:80px height:auto border:0px ! important;width:"+TypeIconWidth+"px;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img></div>";
				}

				let currentMoveRange = item.data.range;

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
					else
					{
						currentMoveRangeIcon = RangeIcon + currentMoveRange.slice(0, currentMoveRange.search(",")).replace(/[, ]+/g, " ").trim();
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
				}


				// buttons[currentid]={label: "<center><div style='background-color:"+ effectivenessBackgroundColor +";color:"+ effectivenessTextColor +";border:2px solid black;width:130px;height:130px;font-size:10px;'>"+currentCooldownLabel+""+"<h3>"+currentlabel+currentMoveTypeLabel+"</h3>"+"<h5>"+currentMoveRangeIcon+"</h5>"+currentEffectivenessLabel+"</div></center>",
				buttons[currentid]={
					id:currentid,
					style:"padding-left: 0px;border-right-width: 0px;border-bottom-width: 0px;border-left-width: 0px;border-top-width: 0px;margin-right: 0px;",
					label: "<center><div style='background-color:"+ MoveButtonBackgroundColor +";color:"+ MoveButtonTextColor +";border-left:"+EffectivenessBorderThickness+"px solid; border-color:"+effectivenessBackgroundColor+"; padding-left: 0px ;width:200px;height:"+ButtonHeight+"px;font-size:24px;font-family:Modesto Condensed;line-height:0.6'><h3 style='padding: 0px;font-family:Modesto Condensed;font-size:24px; color: white; background-color: #272727 ; overflow-wrap: normal ! important; word-break: keep-all ! important;'><div style='padding-top:5px'>"+currentlabel+"</div>"+currentCooldownLabel+currentMoveTypeLabel+"</h3>"+"<h6 style='padding-top: 4px;padding-bottom: 0px;font-size:"+RangeFontSize+"px;'>"+currentMoveRangeIcon+effectivenessText+"</h6>"+"</div></center>",
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
						let diceRoll = PerformFullAttack (actor,item);
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

						if(item.data.UseCount == null)
						{
							for(let search_item of item_entities)
							{
								if (search_item._id == item._id)
								{
									await search_item.update({ "data.UseCount": 0});
								}
							}
							// item.update({ "data.UseCount": Number(0)});
						}

						if(item.data.frequency == "Daily" || item.data.frequency == "Daily x2" || item.data.frequency == "Daily x3" || item.data.frequency == "Scene" || item.data.frequency == "Scene x2" || item.data.frequency == "Scene x3")
						{
							for(let search_item of item_entities)
							{
								if (search_item._id == item._id)
								{
									await search_item.update({ "data.UseCount": Number(item.data.UseCount + 1)});
								}
							}
							// item.update({ "data.UseCount": Number(item.data.UseCount + 1)});
						}

						for(let search_item of item_entities)
							{
								if (search_item._id == item._id)
								{
									await search_item.update({ "data.LastRoundUsed": currentRound, "data.LastEncounterUsed": currentEncounterID});

									if( (typeStrategist.length > 0) && (typeStrategist.indexOf(item.data.type) > -1) )
									{
										let oneThirdMaxHealth = Number(actor.data.data.health.max / 3);
										let currentDR = (actor.data.data.health.value < oneThirdMaxHealth ? 10 : 5);
										// console.log("DEBUG: Type Strategist: " + item.data.type + ", activated on round " + currentRound + ", HP = " + actor.data.data.health.value + "/" + actor.data.data.health.max + " (" + Number(actor.data.data.health.value / actor.data.data.health.max)*100 + "%; DR = " + currentDR);
										await actor.update({ "data.TypeStrategistLastRoundUsed": currentRound, "data.TypeStrategistLastEncounterUsed": currentEncounterID, "data.TypeStrategistLastTypeUsed": item.data.type, "data.TypeStrategistDR": currentDR});
									}
								}
							}
						// item.update({ "data.LastRoundUsed": currentRound});
						// item.update({ "data.LastEncounterUsed": currentEncounterID});
						// console.log(item.name + " data.LastRoundUsed = " + item.data.LastRoundUsed);
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
			var currentid=item._id;
			var currentlabel=item.data.name;
			var currentCooldownLabel = "";
			var currentEffectivenessLabel = "";

			var currentFrequency=item.data.frequency;
			if(!currentFrequency)
			{
				currentFrequency = "";
			}
			
			if((item.data.LastRoundUsed == null || item.data.LastEncounterUsed == null ) && (currentFrequency.search("EOT") > -1 || currentFrequency.search("Scene") > -1 || currentFrequency.search("Daily") > -1))
			{
				for(let search_item of item_entities)
				{
					if (search_item._id == item._id)
					{
						await search_item.update({ "data.LastRoundUsed" : -2});
						await search_item.update({ "data.LastEncounterUsed": 0});
					}
				}
			}

			var currentLastRoundUsed = item.data.LastRoundUsed;
			var currentLastEncounterUsed = item.data.LastEncounterUsed;

			if(item.data.UseCount == null)
			{
				for(let search_item of item_entities)
				{
					if (search_item._id == item._id)
					{
						await search_item.update({ "data.UseCount": 0});
					}
				}
				// item.update({ "data.UseCount": Number(0)});
			}

			var currentUseCount = item.data.UseCount;
			var cooldownFileSuffix = "";

			if( (Number(currentRound - currentLastRoundUsed) < 2) && (currentEncounterID == currentLastEncounterUsed) )
				{
					cooldownFileSuffix = "_CD"
				}

			if(currentFrequency == "At-Will" || currentFrequency == "")
			{
				currentCooldownLabel = "<img src='" + AlternateIconPath + "AtWill" + CategoryIconSuffix + "' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
			}

			else if(currentFrequency == "EOT")
			{
				if( (Number(currentRound - currentLastRoundUsed) < 2) && (currentEncounterID == currentLastEncounterUsed) )
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "EOT_0" + CategoryIconSuffix + "' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
				else
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "EOT_1" + CategoryIconSuffix + "' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
			}

			else if(currentFrequency == "Scene")
			{
				if( Number(currentUseCount) >= 1 )
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "Scene1_0" + cooldownFileSuffix + CategoryIconSuffix + "' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
				else
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "Scene1_1" + cooldownFileSuffix + CategoryIconSuffix + "' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
			}

			else if(currentFrequency == "Scene x2")
			{
				if( Number(currentUseCount) >= 2 )
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "Scene2_0" + cooldownFileSuffix + CategoryIconSuffix + "' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
				else if( Number(currentUseCount) == 1 )
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "Scene2_1" + cooldownFileSuffix + CategoryIconSuffix + "' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
				else
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "Scene2_2" + cooldownFileSuffix + CategoryIconSuffix + "' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
			}

			else if(currentFrequency == "Scene x3")
			{
				if( Number(currentUseCount) >= 3 )
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "Scene3_0" + cooldownFileSuffix + CategoryIconSuffix + "' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
				else if( Number(currentUseCount) == 2 )
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "Scene3_1" + cooldownFileSuffix + CategoryIconSuffix + "' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
				else if( Number(currentUseCount) == 1 )
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "Scene3_2" + cooldownFileSuffix + CategoryIconSuffix + "' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
				else
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "Scene3_3" + cooldownFileSuffix + CategoryIconSuffix + "' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
			}

			else if(currentFrequency == "Daily")
			{
				if( Number(currentUseCount) >= 1 )
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "daily1_0" + cooldownFileSuffix + CategoryIconSuffix + "' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
				else
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "daily1_1" + cooldownFileSuffix + CategoryIconSuffix + "' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
			}

			else if(currentFrequency == "Daily x2")
			{
				if( Number(currentUseCount) >= 2 )
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "daily2_0" + cooldownFileSuffix + CategoryIconSuffix + "' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
				else if( Number(currentUseCount) == 1 )
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "daily2_1" + cooldownFileSuffix + CategoryIconSuffix + "' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
				else
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "daily2_2" + cooldownFileSuffix + CategoryIconSuffix + "' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
			}

			else if(currentFrequency == "Daily x3")
			{
				if( Number(currentUseCount) >= 3 )
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "daily3_0" + cooldownFileSuffix + CategoryIconSuffix + "' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
				else if( Number(currentUseCount) == 2 )
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "daily3_1" + cooldownFileSuffix + CategoryIconSuffix + "' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
				else if( Number(currentUseCount) == 1 )
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "daily3_2" + cooldownFileSuffix + CategoryIconSuffix + "' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
				else
				{
					currentCooldownLabel = "<img src='" + AlternateIconPath + "daily3_3" + cooldownFileSuffix + CategoryIconSuffix + "' style='border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img>";
				}
			}

			if(currentlabel == ""){
			currentlabel=item.name;
			}
			var currenttype=item.type;
			var currentCategory = item.data.category;
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
				if( (game.settings.get("PTUMoveMaster", "showEffectiveness") != "never") && (target) && (!isNaN(item.data.damageBase)) && (item.data.damageBase != "") && effectiveness)
				{
					if((target.data.disposition > DISPOSITION_HOSTILE) || (game.settings.get("PTUMoveMaster", "showEffectiveness") == "always") )
					{
						currentEffectivenessLabel = " (x"+effectiveness[item.data.type]+")";
						if (effectiveness[item.data.type] == 0.5)
						{
							effectivenessBackgroundColor = "#cc6666";
						}
						else if (effectiveness[item.data.type] == 1)
						{
							effectivenessBackgroundColor = "white";
							effectivenessTextColor = "black";
						}
						else if (effectiveness[item.data.type] == 0.25)
						{
							effectivenessBackgroundColor = "red";
							effectivenessTextColor = "white";
						}
						else if (effectiveness[item.data.type] == 0)
						{
							effectivenessBackgroundColor = "black";
							effectivenessTextColor = "white";
						}
						else if (effectiveness[item.data.type] < 0.25)
						{
							effectivenessBackgroundColor = "darkred";
							effectivenessTextColor = "white";
						}
						else if (effectiveness[item.data.type] == 1.5)
						{
							effectivenessBackgroundColor = "#6699cc";//"#3399ff";
							effectivenessTextColor = "black";
						}
						else if (effectiveness[item.data.type] > 1.5)
						{
							effectivenessBackgroundColor = "blue";
							effectivenessTextColor = "white";
						}
						if(game.settings.get("PTUMoveMaster", "showEffectivenessText") == "true")
						{
							effectivenessText = "<span style='font-size:30px'> / x "+(effectiveness[item.data.type].toString())+"</span>";
						}
					}
				}

				let currentMoveTypeLabel = "<div><img src='" + AlternateIconPath + item.data.category + CategoryIconSuffix + "' style='width:100px height:auto border:0px ! important;width:"+TypeIconWidth+"px;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img><img src='" + AlternateIconPath + item.data.type + TypeIconSuffix + "' style='width:100px height:auto border:0px ! important;width:"+TypeIconWidth+"px;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img></div>";
				if(item.data.type == "Untyped" || item.data.type == "" || item.data.type == null)
				{
					// currentMoveTypeLabel = "<div><img src='" + AlternateIconPath + item.data.category + CategoryIconSuffix + "' width=80px height=auto></img></div>";
					currentMoveTypeLabel = "<div><img src='" + AlternateIconPath + item.data.category + CategoryIconSuffix + "' style='width:100px height:auto border:0px ! important;width:"+TypeIconWidth+"px;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img><img src='" + AlternateIconPath + "Untyped" + TypeIconSuffix + "' style='width:100px height:auto border:0px ! important;width:"+TypeIconWidth+"px;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img></div>";
				}

				let currentMoveRange = item.data.range;

				let currentMoveRangeIcon = "";

				let currentMoveFiveStrike = false;
				let currentMoveDoubleStrike = false;

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
					else
					{
						currentMoveRangeIcon = RangeIcon + currentMoveRange.slice(0, currentMoveRange.search(",")).replace(/[, ]+/g, " ").trim();
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
				}

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
				let moveData = item.data;

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

					DBBorderImage = '<div class="col" style="padding: 0px ! important;"><span class="type-img"><img src="/modules/PTUMoveMaster/images/icons/DividerIcon_DB'+finalDB+'.png" style="width: 248px; height: auto; padding: 0px ! important;"></span></div>';
				}
				
				// if(moveData.damageBase)
				// {
				// 	DBBorderImage = '<div class="col" style="padding: 0px ! important;"><span class="type-img"><img src="/modules/PTUMoveMaster/images/icons/DividerIcon_DB'+damageBase+'.png" style="width: 248px; height: auto; padding: 0px ! important;"></span></div>';
				// }

				if(actor.data.data.typing)
				{
					if(item.data.type == actor.data.data.typing[0] || item.data.type == actor.data.data.typing[1])
					{
						STABBorderImage = '<div class="col" style="padding: 0px ! important;"><span class="type-img"><img src="/modules/PTUMoveMaster/images/icons/STAB_Border.png" style="width: 248px; height: 1px; padding: 0px ! important;"></img></span></div>';
					}
				}

				// buttons[currentid]={label: "<center><div style='background-color:"+ effectivenessBackgroundColor +";color:"+ effectivenessTextColor +";border:2px solid black;width:130px;height:130px;font-size:10px;'>"+currentCooldownLabel+""+"<h3>"+currentlabel+currentMoveTypeLabel+"</h3>"+"<h5>"+currentMoveRangeIcon+"</h5>"+currentEffectivenessLabel+"</div></center>",
				buttons[currentid]={id:currentid, label: "<center><div style='background-color:"+ MoveButtonBackgroundColor +";color:"+ MoveButtonTextColor +";border-left:"+EffectivenessBorderThickness+"px solid; border-color:"+effectivenessBackgroundColor+"; padding-left: 0px ;width:200px;height:"+Number(ButtonHeight+3)+"px;font-size:24px;font-family:Modesto Condensed;line-height:0.6'><h3 style='padding: 0px;font-family:Modesto Condensed;font-size:24px; color: white; background-color: #272727 ; overflow-wrap: normal ! important; word-break: keep-all ! important;'><div style='padding-top:5px'>"+currentlabel+"</div>"+currentCooldownLabel+currentMoveTypeLabel+"</h3>"+STABBorderImage+DBBorderImage+"<h6 style='padding-top: 4px;padding-bottom: 0px;font-size:"+RangeFontSize+"px;'>"+currentMoveRangeIcon+effectivenessText+"</h6>"+"</div></center>",
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
						game.PTUMoveMaster.RollDamageMove(actor, item, finalDB, typeStrategist, 0);
					}
					

					}

				}

			}

			i++;
		} // END DAMAGE MOVE LOOP

		let menuButtonWidth = "200px";

		buttons["struggleMenu"] = {noRefresh: true, id:"struggleMenu", label: "<center><div style='background-color:lightgray;color:black;border:2px solid black;width:"+menuButtonWidth+";height:25px;font-size:16px;font-family:Modesto Condensed;line-height:1.4'>"+"Struggle 💬"+"</div></center>",
			callback: () => {
				game.PTUMoveMaster.ShowStruggleMenu(actor);
			}};

		buttons["maneuverMenu"] = {noRefresh: true, id:"maneuverMenu", label: "<center><div style='background-color:lightgray;color:black;border:2px solid black;width:"+menuButtonWidth+";height:25px;font-size:16px;font-family:Modesto Condensed;line-height:1.4'>"+"Maneuvers 💬"+"</div></center>",
		callback: () => {
			game.PTUMoveMaster.ShowManeuverMenu(actor);
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

			buttons["pokedexScan"] = {id:"pokedexScan", label: "<center><div style='background-color:darkred;color:black;border:2px solid black;width:"+menuButtonWidth+";height:25px;font-size:16px;font-family:Modesto Condensed;color:grey;line-height:1.4'>"+"Pokedex Scan!"+"</div></center>",
			callback: async () => {
				let trainer_tokens = actor.getActiveTokens();
				let actor_token = trainer_tokens[0];
				await game.PTUMoveMaster.PokedexScan(actor_token, target);
			}};
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
				buttons["trainerMenu"] = {noRefresh: true, id:"trainerMenu", label: "<center><div style='background-color:lightgray;color:black;border:2px solid black;width:"+menuButtonWidth+";height:25px;font-size:16px;font-family:Modesto Condensed;line-height:1.4'>"+"🔎 Select Trainer 🔍"+"</div></center>",
				callback: () => {
			
					trainer_token_on_field.control(true);
					//PerformStruggleAttack ("Normal", "Physical");
			
				}};
			}
			else
			{
				buttons["trainerMenu"] = {noRefresh: true, id:"trainerMenu", label: "<center><div style='background-color:lightred;color:black;border:2px solid black;width:"+menuButtonWidth+";height:25px;font-size:16px;font-family:Modesto Condensed;line-height:1.4'>"+"❌ Trainer Unavailable ❌"+"</div></center>",
				callback: () => {
			
					ui.notifications.warn("Trainer is not on the field.")
					AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"warning.wav", volume: 0.5, autoplay: true, loop: false}, false);
				}};
			}
		}

		for(let item of items)
		{
			var currenttype = item.type;
			var currentid=item._id;
			var currentlabel=item.data.name;

			if(currenttype=="ability")
			{
				var currentlabel=item.name;
				var respdata=item.data;
				respdata['category']='details';
				buttons[currentid]={id:currentid, label: "<center><div style='background-color:gray;color:black;border:2px solid darkgray;width:200px;height:25px;font-size:16px;font-family:Modesto Condensed;line-height:1.4'>"+AbilityIcon+currentlabel+"</div></center>",
					callback: async () => {
						
						AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+UIButtonClickSound, volume: 0.5, autoplay: true, loop: false}, true);


						
						sendMoveMessage({
							move: item.data,
							templateType: MoveMessageTypes.DETAILS,
							category: "details", 
							hasAC: (!isNaN(item.data.ac)),
							isAbility: true
						});
				}
				}
			}
		}


		buttons["resetEOT"] = {id:"resetEOT", label: ResetEOTMark,
			callback: async () => {

				AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+UIButtonClickSound, volume: 0.5, autoplay: true, loop: false}, true);
				for(let item of items)
				{
					let searched_frequency = item.data.frequency;
					if(!searched_frequency)
					{
						searched_frequency = "";
					}
					if(searched_frequency.search("EOT") > -1 || searched_frequency.search("Scene") > -1 || searched_frequency.search("Daily") > -1)
					{
						for(let search_item of item_entities)
						{
							if (search_item._id == item._id)
							{
								await search_item.update({ "data.LastRoundUsed": Number(-2)});
							}
						}
						// item.update({ "data.LastRoundUsed": Number(-2)});
					}
				}
				chatMessage(actor, (actor.name + " refreshes their EOT-frequency moves!"))
				AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+RefreshEOTMovesSound, volume: 0.8, autoplay: true, loop: false}, true);
			}};

		buttons["resetScene"] = {id:"resetScene", label: ResetSceneMark,
			callback: async () => {

				AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+UIButtonClickSound, volume: 0.5, autoplay: true, loop: false}, true);
				for(let item of items)
				{
					if(item.data.frequency == "Scene" || item.data.frequency == "Scene x2" || item.data.frequency == "Scene x3")
					{
						for(let search_item of item_entities)
						{
							if (search_item._id == item._id)
							{
								await search_item.update({ "data.UseCount": Number(0)});
							}
						}
						// item.update({ "data.UseCount": Number(0)});
					}
				}
				chatMessage(actor, (actor.name + " refreshes their Scene-frequency moves!"))
				AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+RefreshSceneMovesSound, volume: 0.8, autoplay: true, loop: false}, true);
			}};

		buttons["resetDaily"] = {id:"resetDaily", label: ResetDailyMark,
		callback: async () => {

				AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+UIButtonClickSound, volume: 0.5, autoplay: true, loop: false}, true);
				for(let item of items)
				{
					if(item.data.frequency == "Daily" || item.data.frequency == "Daily x2" || item.data.frequency == "Daily x3")
					{
						for(let search_item of item_entities)
						{
							if (search_item._id == item._id)
							{
								await search_item.update({ "data.UseCount": Number(0)});
							}
						}
						// item.update({ "data.UseCount": Number(0)});
					}
				}
				chatMessage(actor, (actor.name + " refreshes their Daily-frequency moves!"))
				AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+RefreshDailyMovesSound, volume: 0.8, autoplay: true, loop: false}, true);
				//dialogEditor.render(true);
				}
			};



		let dialogueID = "ptu-sidebar";
		// let dialogOptions = game.users.filter(u => u.data.role < 3).map(u => `<option value=${u.id}> ${u.data.name} </option>`).join(``);
		// // dialogEditor = new Dialog({
		// dialogEditor = new MoveMasterSidebarDialog({
		// 	title: `Move Selector`,
		// 	content: "<style> #"+dialogueID+" .dialog-buttons {background-color:"+ MoveButtonBackgroundColor +";flex-direction: column; padding: 0px !important; border-width: 0px !important; margin: 0px !important; border: none !important;} #"+dialogueID+" .dialog-button {background-color:"+ MoveButtonBackgroundColor +";flex-direction: column; padding: 0px !important; border-width: 0px !important; margin: 0px !important; border: none !important; width: 200px} #"+dialogueID+" .dialog-content {background-color:"+ MoveButtonBackgroundColor +";flex-direction: column; padding: 0px !important; border-width: 0px !important; margin: 0px !important; width: 200px !important; height: auto !important;} #"+dialogueID+" .window-content {background-color:"+ MoveButtonBackgroundColor +";flex-direction: column; padding: 0px !important; border-width: 0px !important; margin: 0px !important; width: 200px !important;} #"+dialogueID+".app.window-app.MoveMasterSidebarDialog {background-color:"+ MoveButtonBackgroundColor +";flex-direction: column; padding: 0px !important; border-width: 0px !important; margin: 0px !important; width: 200px !important;}</style><center><div style='"+background_field+";font-family:Modesto Condensed;font-size:20px'><h2>"+ targetTypingText+"</h2><div></center>",
		// 	buttons: buttons
		// },{id: dialogueID});
		
		let content = "<style> #"+dialogueID+" .dialog-buttons {background-color:"+ MoveButtonBackgroundColor +";flex-direction: column; padding: 0px !important; border-width: 0px !important; margin: 0px !important; border: none !important;} #"+dialogueID+" .dialog-button {background-color:"+ MoveButtonBackgroundColor +";flex-direction: column; padding: 0px !important; border-width: 0px !important; margin-top: 3px !important; margin-bottom: 3px !important; margin-left: 0px !important; margin-right: 0px !important; border: none !important; width: 200px} #"+dialogueID+" .dialog-content {background-color:"+ MoveButtonBackgroundColor +";flex-direction: column; padding: 0px !important; border-width: 0px !important; margin: 0px !important; width: 200px !important; height: auto !important;} #"+dialogueID+" .window-content {;flex-direction: column; padding: 0px !important; border-width: 0px !important; margin: 0px !important; width: 200px !important;} #"+dialogueID+".app.window-app.MoveMasterSidebarDialog {background-color:"+ MoveButtonBackgroundColor +";flex-direction: column; padding: 0px !important; border-width: 0px !important; margin: 0px !important; width: 200px !important;}</style><center><div style='"+background_field+";font-family:Modesto Condensed;font-size:20px'><h2>"+ targetTypingText+"</h2></div></center>";
		let sidebar = new game.PTUMoveMaster.SidebarForm({content, buttons, dialogueID});
		
		sidebar.render(true);
		//dialogEditor.render(true, {"left":500, "top":500, "width":200, "height":1000,});
	};


	async function rollDamageMoveWithBonus(actor , item, finalDB, typeStrategist)
	{
		// var bonusDamage = 0; // TODO: Implement this; popup form to type into, etc.

		let form = new game.PTUMoveMaster.MoveMasterBonusDamageOptions({actor , item, finalDB, typeStrategist}, {"submitOnChange": false, "submitOnClose": true});
		form.render(true);

		// new game.ptu.PTUDexDragOptions(update, {"submitOnChange": false, "submitOnClose": true}).render(true);
	}


	return {
	ChatWindow:ChatWindow,
	ApplyDamage:ApplyDamage
	}

};




//////////////////////////////////////////


// let soundList = await FilePicker.browse("data", "/assets/Sounds/SFX");
// let sounds = soundList.files;
// let myButtons = sounds.reduce((button, sound, i) => {
//     button[`button${i}`] = {
//         label: sound.substring(18, sound.length - 4),
//         callback: () => {
//             AudioHelper.play({src: sound, volume: 0.5, autoplay: true, loop: false}, true);
//             d.render(true);
//         }
//     }; 
//     return button;
// }, {} );

// let dialogContent = `<style> #sounds-dialog .dialog-buttons {flex-direction: column;}</style>`;
// const d = new Dialog({ title: "Sound selector", content: dialogContent + "click a button to play", buttons: myButtons },{id: "sounds-dialog"}).render(true);

//////////////////////////////////////////



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

			if( (currentRound - token.actor.data.data.TypeStrategistLastRoundUsed <= 1) && (currentEncounterID == token.actor.data.data.TypeStrategistLastEncounterUsed) )
			{
				extraDR = token.actor.data.data.TypeStrategistDR;
				extraDRSource = "Type Strategist, " + token.actor.data.data.TypeStrategistLastTypeUsed;
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



export async function ResetStagesToDefault(actor)
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
	AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+"Stat%20Fall%20Down.mp3", volume: 0.5, autoplay: true, loop: false}, true);
}


export function GetSoundDirectory()
{
	return game.settings.get("ptu", "moveSoundDirectory");
}

export async function RollDamageMove(actor, item, finalDB, typeStrategist, bonusDamage)
	{
		AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+UIButtonClickSound, volume: 0.5, autoplay: true, loop: false}, true);

		var item_entities=actor.items;
		let diceRoll = game.PTUMoveMaster.PerformFullAttack (actor,item,finalDB, bonusDamage);
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

		if(item.data.UseCount == null)
		{
			for(let search_item of item_entities)
			{
				if (search_item._id == item._id)
				{
					await search_item.update({ "data.UseCount": 0});
				}
			}
			// item.update({ "data.UseCount": Number(0)});
		}

		if(item.data.frequency == "Daily" || item.data.frequency == "Daily x2" || item.data.frequency == "Daily x3" || item.data.frequency == "Scene" || item.data.frequency == "Scene x2" || item.data.frequency == "Scene x3")
		{
			for(let search_item of item_entities)
			{
				if (search_item._id == item._id)
				{
					await search_item.update({ "data.UseCount": Number(item.data.UseCount + 1)});
				}
			}
			// item.update({ "data.UseCount": Number(item.data.UseCount + 1)});
		}

		for(let search_item of item_entities)
			{
				if (search_item._id == item._id)
				{
					await search_item.update({ "data.LastRoundUsed": currentRound, "data.LastEncounterUsed": currentEncounterID});

					if( (typeStrategist.length > 0) && (typeStrategist.indexOf(item.data.type) > -1) )
					{
						let oneThirdMaxHealth = Number(actor.data.data.health.max / 3);
						let currentDR = (actor.data.data.health.value < oneThirdMaxHealth ? 10 : 5);
						// console.log("DEBUG: Type Strategist: " + item.data.type + ", activated on round " + currentRound + ", HP = " + actor.data.data.health.value + "/" + actor.data.data.health.max + " (" + Number(actor.data.data.health.value / actor.data.data.health.max)*100 + "%; DR = " + currentDR);
						await actor.update({ "data.TypeStrategistLastRoundUsed": currentRound, "data.TypeStrategistLastEncounterUsed": currentEncounterID, "data.TypeStrategistLastTypeUsed": item.data.type, "data.TypeStrategistDR": currentDR});
					}
				}
			}
		// item.update({ "data.LastRoundUsed": currentRound});
		// item.update({ "data.LastEncounterUsed": currentEncounterID});
		// console.log(item.name + " data.LastRoundUsed = " + item.data.LastRoundUsed);
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
			user: game.user._id,
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
		user: game.user._id,
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
	let final_healing_amount = Math.min(Math.floor(pct_healing*actor.data.data.health.max), difference_to_max)
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

	actor.modifyTokenAttribute("health", (new_health_percent*actor.data.data.health.max), false, true);
	game.PTUMoveMaster.chatMessage(actor, actor.name + '\'s health was set to '+ new_health_percent*100 +'% of their max hit points!');
}


export function damageActorPercent(actor,pct_damage)
{
	AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+damage_sound_file, volume: 0.8, autoplay: true, loop: false}, true);

	let finalDamage = (Math.floor(pct_damage*actor.data.data.health.max));

	actor.modifyTokenAttribute("health", -finalDamage, true, true);
	game.PTUMoveMaster.chatMessage(actor, actor.name + ' took damage equal to '+ pct_damage*100 +'% of their max hit points!');
	game.PTUMoveMaster.ApplyInjuries(actor, finalDamage);
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
		acBonus: (parseInt(actorData.modifiers.acBonus) || 0)
	})
};


export function PerformFullAttack (actor, move, finalDB, bonusDamage) 
{
	let isFiveStrike = false;
	let isDoubleStrike = false;
	let userHasTechnician = false;
	let userHasAdaptability = false;
	let fiveStrikeCount = 0;
	let hasSTAB = false;

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

	if(move.data.range.search("Five Strike") > -1)
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
	if( (move.data.range.search("Doublestrike") > -1) || (move.data.range.search("Double Strike") > -1) )
	{
		isDoubleStrike = true;
	}

	let acRoll = game.PTUMoveMaster.CalculateAcRoll(move.data, actor.data.data);
	let diceResult = game.PTUMoveMaster.GetDiceResult(acRoll);

	let acRoll2 = game.PTUMoveMaster.CalculateAcRoll(move.data, actor.data.data);
	let diceResult2 = game.PTUMoveMaster.GetDiceResult(acRoll2);

	let crit = diceResult === 1 ? CritOptions.CRIT_MISS : diceResult >= 20 - actor.data.data.modifiers.critRange ? CritOptions.CRIT_HIT : CritOptions.NORMAL;
	let crit2 = diceResult2 === 1 ? CritOptions.CRIT_MISS : diceResult2 >= 20 - actor.data.data.modifiers.critRange ? CritOptions.CRIT_HIT : CritOptions.NORMAL;

	let damageRoll = game.PTUMoveMaster.CalculateDmgRoll(move.data, actor.data.data, 'normal', userHasTechnician, userHasAdaptability, isDoubleStrike, isFiveStrike, fiveStrikeCount, 1, 0, bonusDamage);
	if(damageRoll) damageRoll.roll();
	let critDamageRoll = game.PTUMoveMaster.CalculateDmgRoll(move.data, actor.data.data, 'hit', userHasTechnician, userHasAdaptability, isDoubleStrike, isFiveStrike, fiveStrikeCount, 1, 0, bonusDamage);
	if(!move.data.name)
	{
		move.data.name=move.name;
	}
	if(critDamageRoll)
	{
		critDamageRoll.roll();
	}
	if(damageRoll && damageRoll._total)
	{
		game.macros.getName("backend_set_flags")?.execute(damageRoll._total,critDamageRoll._total,move.data.category,move.data.type);
	}

	let damageRollTwoHits = game.PTUMoveMaster.CalculateDmgRoll(move.data, actor.data.data, 'normal', userHasTechnician, userHasAdaptability, isDoubleStrike, isFiveStrike, fiveStrikeCount, 2, 0, bonusDamage);
	if(damageRollTwoHits)
	{
		damageRollTwoHits.roll();
	}

	let critDamageRollOneHitOneCrit = game.PTUMoveMaster.CalculateDmgRoll(move.data, actor.data.data, 'hit', userHasTechnician, userHasAdaptability, isDoubleStrike, isFiveStrike, fiveStrikeCount, 2, 1, bonusDamage);
	if(critDamageRollOneHitOneCrit)
	{
		critDamageRollOneHitOneCrit.roll();
	}

	let critDamageRollTwoCrits = game.PTUMoveMaster.CalculateDmgRoll(move.data, actor.data.data, 'hit', userHasTechnician, userHasAdaptability, isDoubleStrike, isFiveStrike, fiveStrikeCount, 2, 2, bonusDamage);
	if(critDamageRollTwoCrits)
	{
		critDamageRollTwoCrits.roll();
	}

	let isUntyped = false;
	if(move.data.type == "Untyped" || move.data.type == "" || move.data.type == null)
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

	if( (typeStrategist.length > 0) && (typeStrategist.indexOf(move.data.type) > -1) )
	{
		currentExtraEffectText = currentExtraEffectText+ "<br>Type Strategist (" + move.data.type + ") activated!";
		currentHasExtraEffect = true;
	}

	let hasAC = true;
	if(move.data.ac == "" || move.data.ac == "--")
	{
		hasAC = false;
	}

	if(userHasTechnician && ( isDoubleStrike || isFiveStrike || (move.data.damageBase <= 6) ) )
	{
		currentExtraEffectText = currentExtraEffectText+ "<br>Technician applied!";
		currentHasExtraEffect = true;
	}

	if(userHasAdaptability && (move.data.type == actorType1 || move.data.type == actorType2) )
	{
		currentExtraEffectText = currentExtraEffectText+ "<br>Adaptability applied!";
		currentHasExtraEffect = true;
	}

	if(move.data.type == actorType1 || move.data.type == actorType2)
	{
		hasSTAB = true;
	}

	game.PTUMoveMaster.sendMoveRollMessage(acRoll, acRoll2, {
		speaker: ChatMessage.getSpeaker({
			actor: actor
		}),
		move: move.data,
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

	var moveSoundFile = ((move.data.name).replace(/( \[.*?\]| \(.*?\)) */g, "") + ".mp3"); // Remove things like [OG] or [Playtest] from move names when looking for sound files.

	if(move.data.name.toString().match(/Hidden Power/) != null)
	{
		moveSoundFile = ("Hidden Power" + ".mp3");
	}

	if(move.data.name.toString().match(/Pin Missile/) != null)
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

	game.PTUMoveMaster.TakeStandardAction(actor)

	return diceResult;
};

export function PerformStruggleAttack (move) // TODO: Implement Struggles
{
	let acRoll = game.PTUMoveMaster.CalculateAcRoll(move.data, actor.data.data);
	let diceResult = game.PTUMoveMaster.GetDiceResult(acRoll);

	let crit = diceResult === 1 ? CritOptions.CRIT_MISS : diceResult >= 20 - actor.data.data.modifiers.critRange ? CritOptions.CRIT_HIT : CritOptions.NORMAL;
	let damageRoll = game.PTUMoveMaster.CalculateDmgRoll(move.data, actor.data.data, 'normal');

	if(damageRoll) damageRoll.roll();
	let critDamageRoll = game.PTUMoveMaster.CalculateDmgRoll(move.data, actor.data.data, 'hit');

	if(!move.data.name)
	{
		move.data.name=move.name;
	}
	if(critDamageRoll) critDamageRoll.roll();
	if(damageRoll && damageRoll._total)
	{
		game.macros.getName("backend_set_flags")?.execute(damageRoll._total,critDamageRoll._total,move.data.category,move.data.type);
	}

	game.PTUMoveMaster.sendMoveRollMessage(acRoll, {
		speaker: ChatMessage.getSpeaker({
			actor: actor
		}),
		move: move.data,
		damageRoll: damageRoll,
		critDamageRoll: critDamageRoll,
		templateType: MoveMessageTypes.FULL_ATTACK,
		crit: crit
	});//.then(data => console.log(data));

	var moveSoundFile = (move.data.name + ".mp3");

	if(move.data.name.toString().match(/Hidden Power/) != null)
	{
		moveSoundFile = ("Hidden Power" + ".mp3");
	}

	moveSoundFile.replace(/ /g,"%20");

	AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+moveSoundFile, volume: 0.8, autoplay: true, loop: false}, true);
};


export function GetDiceResult(roll)
{
	if (!roll._rolled)
	{
		roll.evaluate();
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

export async function sendMoveRollMessage(rollData, rollData2, messageData = {})
{
	if (!rollData._rolled) 
	{
		rollData.evaluate();
	}

	if (!rollData2._rolled) 
	{
		rollData2.evaluate();
	}

	messageData = mergeObject({
		user: game.user._id,
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
	game.PTUMoveMaster.TakeStandardAction(trainer_actor);
	return;
};


export function TakeStandardAction(actor)
{
	let actorInjuries = actor.data.data.health.injuries;

	if(actorInjuries >=5)
	{
		game.PTUMoveMaster.chatMessage(actor, actor.name + ' took a standard action while they have '+ actorInjuries +' injuries - they take '+actorInjuries+' damage!');
		actor.modifyTokenAttribute("health", (-actorInjuries), true, true);
		game.PTUMoveMaster.ApplyInjuries(actor, actorInjuries);
	}
};


export async function RollCaptureChance(trainer, target, pokeball, to_hit_roll, target_token)
{
	let CaptureRollModifier = 0;
	let CaptureRate = 100;

	let TargetWeight = target.data.data.weight;
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

				game.actors.get(target_token.data.actorId).update({permission: {[non_gm_user.id]: CONST.ENTITY_PERMISSIONS.OWNER}});

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
	let background_field = "style='background-image: url('background_fields/BG_Field.png');'";

	let trainer_tokens = actor.getActiveTokens();
	let actor_token = trainer_tokens[0]; // The using actor

	// let relevant_item_types = [
	// 	"Potion", "Revive", "Antidote", "Repel", "Cure", "Heal", "Bait"
	// ];

	// for(let item_type of relevant_item_types)
	// {
		for(let item of actor.data.items)
		{
			if(item.type == "item" && !item.name.includes(" Ball"))
			{
				item_inventory.push(item);
			}
		}
	// }

	for(let inventory_item of item_inventory)
	{
		let item_base_image = await game.PTUMoveMaster.GetItemArt(inventory_item.name);
		let item_image = "";
		let item_count = inventory_item.data.quantity;
		
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
			"AC":null, 
			"Class":"", 
			"Frequency":"At-Will", 
			"Range":"Self", 
			"User Checks":null,
			"Target Checks":null,
			"Success":"Trainers and Pokémon can Take a Breather and temporarily remove themselves from the heat of combat to recover from Confusion and other Volatile Status Afflictions, though they still must pass any Save Checks to be able to take this action and do so. Taking a Breather is a Full Action and requires a Pokémon or Trainer to use their Shift Action to move as far away from enemies as possible, using their highest available Movement Capability. They then become Tripped and are Vulnerable until the end of their next turn. When a Trainer or Pokémon Takes a Breather, they set their Combat Stages back to their default level, lose all Temporary Hit Points, and are cured of all Volatile Status effects and the Slow and Stuck conditions. To be cured of Cursed in this way, the source of the Curse must either be Knocked Out or no longer within 12 meters at the end of the Shift triggered by Take a Breather. When a Trainer or Pokémon is unable to choose to Take a Breather themselves, such as when they are inflicted with the Rage Status Affliction or when someone doesn’t want to take a chance on passing a Confusion Save Check, they may be calmed and assisted by a Trainer to attempt to Take a Breather. This is a Full Action by both the assisting Trainer and their target (as an Interrupt for the target), and the assisting Trainer must be able to Shift to the target they intend to help. They then make a Command Check with a DC of 12. Upon success, both the assisting Trainer and their target must Shift as far away from enemies as possible, using the lower of the two’s maximum movement for a single Shift. They then both become Tripped and are treated as having 0 Evasion until the end of their next turn. The Trainer that has been assisted then gains all the effects of Taking a Breather. Upon a failure, nothing happens, and the assisted Trainer is not cured of their Status Afflictions.",
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
					"Range":(actor.data.data.skills.focus.value)+", 1 Target", 
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
					"Range":(actor.data.data.skills.focus.value)+", 1 Target", 
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
					"Range":(actor.data.data.skills.focus.value)+", 1 Target", 
					"User Checks":[ "focus" ],
					"Target Checks":[ "combat", "athletics" ],
					"Success":"The target is Pushed back "+Math.floor(actor.data.data.skills.focus.value/2)+" Meters directly away from you. Telekinetic Push may only be used against a target whose weight is no heavier than your Heavy Lifting rating (based off Focus as if it was your Power Capability).",
					"Failure":""
				};

				break;
			}
		}

	console.log(maneuver_list);

	for(let maneuver in maneuver_list)
	{
		console.log(maneuver);
	}
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
		for(let item of actor.data.items)
		{
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
							"Range":(actor.data.data.skills.focus.value+", 1 Target")
						};

						struggle_list["Special Telekinetic Struggle"] = {
							"Action":"Standard", 
							"AC":struggle_AC, 
							"Class":"Special",
							"Type":"Normal", 
							"Frequency":"At-Will", 
							"DB":struggle_DB,
							"Range":(actor.data.data.skills.focus.value+", 1 Target")
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

	struggle_buttons["backToMainSidebar"] = {id:"backToMainSidebar", label: "🔙",
			callback: async () => {

				// AudioHelper.play({src: game.PTUMoveMaster.GetSoundDirectory()+UIButtonClickSound, volume: 0.5, autoplay: true, loop: false}, true);
				PTUAutoFight().ChatWindow(actor);
				}
			};

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
		DBBorderImage = '<div class="col" style="padding: 0px ! important;"><span class="type-img"><img src="/modules/PTUMoveMaster/images/icons/DividerIcon_DB'+finalDB+'.png" style="width: 248px; height: auto; padding: 0px ! important;"></span></div>';

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
				// currentMoveTypeLabel = "<div><img src='" + AlternateIconPath + item.data.category + CategoryIconSuffix + "' width=80px height=auto></img></div>";
				currentMoveTypeLabel = "<div><img src='" + AlternateIconPath + currentCategory + CategoryIconSuffix + "' style='width:100px height:auto border:0px ! important;width:"+TypeIconWidth+"px;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img><img src='" + AlternateIconPath + "Untyped" + TypeIconSuffix + "' style='width:100px height:auto border:0px ! important;width:"+TypeIconWidth+"px;border-left-width: 0px;border-top-width: 0px;border-right-width: 0px;border-bottom-width: 0px;'></img></div>";
			}

			let currentMoveRange = currentRange;
			console.log("DEBUG: currentMoveRange");
			console.log(currentMoveRange);

			let currentMoveFiveStrike = false;
			let currentMoveDoubleStrike = false;

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
				else
				{
					currentMoveRangeIcon = RangeIcon + currentMoveRange.slice(0, currentMoveRange.search(",")).replace(/[, ]+/g, " ").trim();
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
			}
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
			label: "<center><div style='background-color:"+ MoveButtonBackgroundColor +";color:"+ MoveButtonTextColor +";border-left:"+EffectivenessBorderThickness+"px solid; border-color:"+effectivenessBackgroundColor+"; padding-left: 0px ;width:200px;height:"+Number(ButtonHeight+3)+"px;font-size:20px;font-family:Modesto Condensed;line-height:0.6'><h3 style='padding: 0px;font-family:Modesto Condensed;font-size:20px; color: white; background-color: #272727 ; overflow-wrap: normal ! important; word-break: keep-all ! important;'><div style='padding-top:5px'>"+currentlabel+"</div>"+currentCooldownLabel+currentMoveTypeLabel+"</h3>"+STABBorderImage+DBBorderImage+"<h6 style='padding-top: 4px;padding-bottom: 0px;font-size:"+RangeFontSize+"px;'>"+currentMoveRangeIcon+effectivenessText+"</h6>"+"</div></center>",
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


	let background_field = 'background-image: url("background_fields/BG_Field.png"); background-repeat: repeat-x; background-position: left bottom';

	let dialogueID = "ptu-sidebar";
	let content = "<style> #"+dialogueID+" .dialog-buttons {background-color:"+ MoveButtonBackgroundColor +";flex-direction: column; padding: 0px !important; border-width: 0px !important; margin: 0px !important; border: none !important;} #"+dialogueID+" .dialog-button {background-color:"+ MoveButtonBackgroundColor +";flex-direction: column; padding: 0px !important; border-width: 0px !important; margin-top: 3px !important; margin-bottom: 3px !important; margin-left: 0px !important; margin-right: 0px !important; border: none !important; width: 200px} #"+dialogueID+" .dialog-content {background-color:"+ MoveButtonBackgroundColor +";flex-direction: column; padding: 0px !important; border-width: 0px !important; margin: 0px !important; width: 200px !important; height: auto !important;} #"+dialogueID+" .window-content {;flex-direction: column; padding: 0px !important; border-width: 0px !important; margin: 0px !important; width: 200px !important;} #"+dialogueID+".app.window-app.MoveMasterSidebarDialog {background-color:"+ MoveButtonBackgroundColor +";flex-direction: column; padding: 0px !important; border-width: 0px !important; margin: 0px !important; width: 200px !important;}</style><center><div style='"+background_field+";font-family:Modesto Condensed;font-size:20px'><h2>"+ targetTypingText+"</h2></div></center>";
	let sidebar = new game.PTUMoveMaster.SidebarForm({content, buttons: struggle_buttons, dialogueID});
	sidebar.render(true);
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

	setTimeout(() => {  game.PTUMoveMaster.TakeStandardAction(actor_token.actor); }, 1000);
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
			targetTypingText = "<div class='row' style='width:200px; height=auto;'><div class='column' style='width:200px; height:100px ; color:lightgrey'>Your current target is<br>"+ target.name +"<br>(Trainer)</div><div class='column' style='width:"+actorTokenSize+" height=auto'><img src='"+ actorImage +"' height='"+actorTokenSize+"' style='border:none; transform: scaleX(-1);'></img></div><div class='column' style='width:"+tokenSize+"; height=auto; margin-left:50px ; margin-top: 25px;'><img src='"+ tokenImage +"' height='"+tokenSize+"' style='border:none;'></img></div></div>";
		}
		else
		{
			effectiveness = target.actor.data.data.effectiveness.All;
	
			if(targetType2 == "null")
			{
				if(targetType1 == "???")
				{
					targetTypingText = "<div class='row' style='width:200px; height=auto;'><div class='column' style='width:200px; height:100px ; color:lightgrey'>Your current target is<br>"+ target.name +"<br>("+targetType1+ ")</div><div class='column' style='width:"+actorTokenSize+" height=auto'><img src='"+ actorImage +"' height='"+actorTokenSize+"' style='border:none; transform: scaleX(-1);'></img></div><div class='column' style='width:"+tokenSize+"; margin-left:50px ; margin-top: 25px;'><img src='"+ tokenImage +"' height='"+tokenSize+"' style='border:none;'></img></div></div>";
				}
				else
				{
					targetTypingText = "<div class='row' style='width:200px; height=auto;'><div class='column' style='width:200px; height:100px ; color:lightgrey'>Your current target is<br>"+ target.name +"<br>(<img src='" + AlternateIconPath+targetType1+TypeIconSuffix+ "' width=80px height=auto>)</div><div class='column' style='width:"+actorTokenSize+"'><img src='"+ actorImage +"' height='"+actorTokenSize+"' style='border:none; transform: scaleX(-1);'></img></div><div class='column' style='width:"+tokenSize+"; margin-left:50px ; margin-top: 25px;'><img src='"+ tokenImage +"' height='"+tokenSize+"' style='border:none;'></img></div></div>";
				}
			}
			else
			{
				if(targetType1 == "???")
				{
					targetTypingText = "<div class='row' style='width:200px; height=auto;'><div class='column' style='width:200px; height:100px ; color:lightgrey'>Your current target is<br>"+ target.name +"<br>("+targetType1+"/"+targetType2+ ")</div><div class='column' style='width:"+actorTokenSize+" height=auto'><img src='"+ actorImage +"' height='"+actorTokenSize+"' style='border:none; transform: scaleX(-1);'></img></div><div class='column' style='width:"+tokenSize+"; margin-left:50px ; margin-top: 25px;'><img src='"+ tokenImage +"' height='"+tokenSize+"' style='border:none;'></img></div></div>";
				}
				else
				{
					targetTypingText = "<div class='row' style='width:200px; height=auto;'><div class='column' style='width:200px; height:100px ; color:lightgrey'>Your current target is<br>"+ target.name +"<br>(<img src='" + AlternateIconPath+targetType1+TypeIconSuffix+ "' width=80px height=auto>/<img src='" + AlternateIconPath+targetType2+TypeIconSuffix+ "' width=80px height=auto>)</div><div class='column' style='width:"+actorTokenSize+" height=auto' style='border:none;'><img src='"+ actorImage +"' height='"+actorTokenSize+"' style='border:none; transform: scaleX(-1);'></img></div><div class='column' style='width:"+tokenSize+"; margin-left:50px ; margin-top: 25px;'><img src='"+ tokenImage +"' height='"+tokenSize+"' style='border:none;'></img></div></div>";
				}
			}
		}
		

		
	}
	else if (!target)
	{
		let actorImage = actor.data.token.img;
		let tokenSize = 60;
		let actorTokenSize = 90;

		targetTypingText = "<div class='row' style='width:200px; height=auto;'><div class='column' style='width:200px; height:100px ; color:lightgrey'>No current target<br></div><div class='column' style='width:"+actorTokenSize+" height=auto'><img src='"+ actorImage +"' height='"+actorTokenSize+"' style='border:none; transform: scaleX(-1);'></img></div><div class='column' style='width:"+tokenSize+"; height=auto; margin-left:50px ; margin-top: 25px;'></div></div>";
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

		targetTypingText = "<div class='row' style='width:200px; height=auto;'><div class='column' style='width:200px; height:100px ; color:lightgrey'>Your current target is<br>"+ target.name +"<br>(???/???)</div><div class='column' style='width:"+actorTokenSize+" height=auto'><img src='"+ actorImage +"' height='"+actorTokenSize+"' style='border:none; transform: scaleX(-1);'></img></div><div class='column' style='width:"+tokenSize+"; height=auto; margin-left:50px ; margin-top: 25px;'><img src='"+ tokenImage +"' height='"+tokenSize+"' style='border:none;'></img></div></div>";
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

	await owning_actor.updateOwnedItem( { _id: item_object._id, "data.quantity": Number(item_object.data.quantity-1) }); // Decrement the spent item count

	if(item_object.data.name.includes("Ball")) 	// For balls, create a thrown version that can be picked up after battle (this will be changed to 
	{										// broken or removed entirely by the capture function if it hits and fails/succeeds to capture a 
											// pokemon, respectively.)


		let item = owning_actor.items.find(x => x.name == `Thrown ${item_object.data.name}`) // Search through existing items to see if we have a Thrown entry for this item already
		if(item) 
		{
			await owning_actor.updateOwnedItem({_id: item._id, "data.quantity": Number(duplicate(item).data.quantity)+1});
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
		await owning_actor.updateOwnedItem( { _id: item_object._id, "data.quantity": Number(item_object.data.quantity-1) });
		return true;
	}
}