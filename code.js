
Hooks.on("updateCombat", async (combat, update, options, userId) => {

	let current_token = game.combat.current.tokenId;
	let current_token_species = canvas.tokens.get(current_token).actor.data.data.species;

	let CryDirectory = "pokemon_cries/";
	let SpeciesCryFilename = current_token_species.toLowerCase() +".mp3";

	AudioHelper.play({src: CryDirectory+SpeciesCryFilename, volume: 0.8, autoplay: true, loop: false}, true);
});

export function PTUAutoFight(){
	var UseAlternateStyling = true;

	var ShowTargetTypeEffectivenessIfKnown = true;

	var stats = ["atk", "def", "spatk", "spdef", "spd"];

	var move_stage_changes = {
		"Blank Template"  :   {
			"atk"   : 0,
			"def"   : 0,
			"spatk" : 0,
			"spdef" : 0,
			"spd"   : 0,
			"accuracy": 0,
			"pct-healing": 0,
			"pct-self-damage": 0
		},
		"Calm Mind"  :   {
			"spatk" : 1,
			"spdef" : 1
		},
		"Nasty Plot"  :   {
			"spdef" : 2,
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
		"Growth"  :   {
			"atk" : 1,
			"spatk" : 1,
		},
		"Harden"  :   {
			"def" : 1,
		},
		"Howl"  :   {
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
	};

	const AtWillReadyMark = "∞";

	const SceneReadyMark = "✅";
	const SceneExpendedMark = "❌";

	const EOTReadyMark = "🔳";
	const EOTCooldownMark = "⏳";

	const DailyReadyMark = "🔆";
	const DailyExpendedMark = "💤";

	const ResetEOTMark = "🔁⏳";
	const ResetSceneMark = "🔁❌";
	const ResetDailyMark = "🔁💤";

	const AbilityIcon = "Ability: ";

	const RangeIcon = "🎯";
	const MeleeIcon = "⚔";
	const SelfIcon = "Self";
	const BurstIcon = "💢";
	const BlastIcon = "💥";
	const ConeIcon = "🔱";
	const LineIcon = "➡";

	const SoundDirectory = "pokemon_sounds/";

	const UIButtonClickSound = "buttonclickrelease.wav";

	const RefreshEOTMovesSound = "In-Battle%20Recall%20Switch%20Flee%20Run.mp3";
	const RefreshSceneMovesSound = "In-Battle%20Recall%20Switch%20Flee%20Run.mp3";
	const RefreshDailyMovesSound = "In-Battle%20Recall%20Switch%20Flee%20Run.mp3";

	const stat_up_sound_file = "Stat%20Rise%20Up.mp3";
	const stat_zero_sound_file = "Stat%20Fall%20Down.mp3";
	const stat_down_sound_file = "Stat%20Fall%20Down.mp3";
	const heal_sound_file = "In-Battle%20Held%20Item%20Activate.mp3";
	const damage_sound_file = "In-Battle%20Held%20Item%20Activate.mp3";

	const TypeIconPath = "systems/ptu/css/images/types/";
	const CategoryIconPath = "systems/ptu/css/images/categories/";

	const AlternateIconPath = "modules/PTUMoveMaster/images/icons/";

	const PhysicalIcon = "Physical.png";
	const SpecialIcon = "Special.png";
	const StatusIcon = "Status.png";

	const TypeIconSuffix = "IC.png";
	const CategoryIconSuffix = ".png";

	const DISPOSITION_HOSTILE = -1;
	const DISPOSITION_NEUTRAL = 0;
	const DISPOSITION_FRIENDLY = 1;

	const MoveMessageTypes = {
	DAMAGE: 'damage',
	TO_HIT: 'to-hit',
	DETAILS: 'details',
	FULL_ATTACK: 'full-attack'
	};


	async function ApplyDamage(event)
	{
		var initial_damage_total=event.currentTarget.dataset.damage;
		var damage_category=event.currentTarget.dataset.category;
		var damage_type=event.currentTarget.dataset.type;
		var mode=event.currentTarget.dataset.mode;
		var crit=event.currentTarget.dataset.crit;
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
				console.log("DEBUG: ApplyDamage TypeStrategist Conditional Triggered!")
				extraDR = token.actor.data.data.TypeStrategistDR;
				extraDRSource = "Type Strategist, " + token.actor.data.data.TypeStrategistLastTypeUsed;
				extraDRNotes = "(including +" + extraDR + " DR from " + extraDRSource + ")";
			}

			if(crit=="true")
			{
				flavor = "Critical Hit! ";
			}else
			{
				flavor = "Hit! ";
			}

			let effectiveness = token.actor.data.data.effectiveness.All[damage_type];
			if (isNaN(effectiveness) || effectiveness == null)
			{
				effectiveness = 1;
				damage_type = "Untyped";
			}
			if(mode=="resist")
			{
				flavor+="(resisted 1 step) "
				let old_effectiveness=effectiveness;
				if(old_effectiveness > 1)
				{
					effectiveness=effectiveness - .5;
				}
				else
				{
					effectiveness=Number(effectiveness /2);
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
			var final_effective_damage = Math.max(Math.floor(Number(defended_damage)*Number(effectiveness)), 0);

			if(mode=="flat")
			{
				flavor+="(flat damage) ";
				final_effective_damage = initial_damage_total;
				defended_damage = 0;
				effectiveness = 1;
			}
			// ui.notifications.info(flavor + initial_damage_total + " Damage! "+ token.actor.name + "'s " + damage_category + " defense" + extraDRNotes + " is " + DR + ", reducing the incoming damage to "+defended_damage+", and their defensive effectiveness against " + damage_type + " is x" + effectiveness + "; They take " + final_effective_damage + " damage after effectiveness and defenses.");

			chatMessage(token, flavor + initial_damage_total + " Damage! "+ token.actor.name + "'s " + damage_category + " defense" + extraDRNotes + " is " + DR + ", reducing the incoming damage to "+defended_damage+", and their defensive effectiveness against " + damage_type + " is x" + effectiveness + "; They take " + final_effective_damage + " damage after effectiveness and defenses.");

			//token.actor.modifyTokenAttribute("health", final_effective_damage, true, true)
			token.actor.update({'data.health.value': Number(token.actor.data.data.health.value - final_effective_damage) });
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


	async function ChatWindow(actor){

		let target = Array.from(game.user.targets)[0];
		let targetTypingText = "";
		let targetType1 = "???";
		let targetType2 = "???";
		let effectiveness;
		if (ShowTargetTypeEffectivenessIfKnown && (target))
		{
			effectiveness = target.actor.data.data.effectiveness.All;
			if(target.data.disposition > DISPOSITION_HOSTILE)
			{
				targetType1 = target.actor.data.data.typing[0];
				targetType2 = target.actor.data.data.typing[1];
			}

			let tokenImage;
			let tokenSize = 80;

			if (target.actor.token)
			{
				tokenImage = target.actor.token.data.img;
			}
			else
			{
				tokenImage = target.actor.data.img;
			}

			if(targetType2 == "null")
			{
				if(targetType1 == "???")
				{
					targetTypingText = "<div class='row'><div class='column' style='width:75%'>Your current target is<br>"+ target.name +" ("+targetType1+ ").</div><div class='column' style='width:"+tokenSize+"'><img src='"+ tokenImage +"' width='"+tokenSize+"' height='"+tokenSize+"'></img></div></div>";
				}
				else
				{
					targetTypingText = "<div class='row'><div class='column' style='width:75%'>Your current target is<br>"+ target.name +" (<img src='" + AlternateIconPath+targetType1+TypeIconSuffix+ "' width=80px height=auto>).</div><div class='column' style='width:"+tokenSize+"'><img src='"+ tokenImage +"' width='"+tokenSize+"' height='"+tokenSize+"'></img></div></div></div>";
					// targetTypingText = "Your current target is <img src='"+ tokenImage +"'; width='"+tokenSize+"' height='"+tokenSize+"'></img>" + target.name +" (<img src='" + TypeIconPath+targetType1+TypeIconSuffix+ "'>).";
				}
			}
			else
			{
				if(targetType1 == "???")
				{
					targetTypingText = "<div class='row'><div class='column' style='width:75%'>Your current target is<br>"+ target.name +" ("+targetType1+"/"+targetType2+ ").</div><div class='column' style='width:"+tokenSize+"'><img src='"+ tokenImage +"' width='"+tokenSize+"' height='"+tokenSize+"'></img></div></div></div>";
					// targetTypingText = "Your current target is <img src='"+ tokenImage +"'; width='"+tokenSize+"' height='"+tokenSize+"'></img>" + target.name +" ("+targetType1+"/"+targetType2+ ").";
				}
				else
				{
					targetTypingText = "<div class='row'><div class='column' style='width:75%'>Your current target is<br>"+ target.name +" (<img src='" + AlternateIconPath+targetType1+TypeIconSuffix+ "' width=80px height=auto>/<img src='" + AlternateIconPath+targetType2+TypeIconSuffix+ "' width=80px height=auto>).</div><div class='column' style='width:"+tokenSize+"'><img src='"+ tokenImage +"' width='"+tokenSize+"' height='"+tokenSize+"'></img></div></div></div>";
					// targetTypingText = "Your current target is <img src='"+ tokenImage +"'; width='"+tokenSize+"' height='"+tokenSize+"'></img>" + target.name +" (<img src='" + TypeIconPath+targetType1+TypeIconSuffix+ "'>/<img src='" + TypeIconPath+targetType2+TypeIconSuffix+ "'>).";
				}
			}

		}
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
			console.log("DEBUG: Type Strategist: " + item.name.slice(item.name.search('\\(')+1, item.name.search('\\)') ));
			console.log(typeStrategist);
			console.log(typeStrategist.length);
		}
		if(item.name.search("Technician") > -1)
		{
			technician = true;
			console.log("DEBUG: Technician Ability Found");
		}
	} // END Ability Check Loop

	var buttons={};

	for(let item of items) // START STATUS MOVE LOOP
	{
		var currentid=item._id;
		var currentlabel=item.data.name;
		var currentCooldownLabel = "";
		var currentEffectivenessLabel = "";

		var currentFrequency=item.data.frequency;

		if(item.data.LastRoundUsed == null)
		{
			for(let search_item of item_entities)
			{
				if (search_item._id == item._id)
				{
					console.log("updating item",search_item);
					await search_item.update({ "data.LastRoundUsed" : -2});
				}
			}
		}

		var currentLastRoundUsed = item.data.LastRoundUsed;

		if(item.data.LastEncounterUsed == null)
		{
			for(let search_item of item_entities)
			{
				if (search_item._id == item._id)
				{
					await search_item.update({ "data.LastEncounterUsed": 0});
				}
			}
			// item.update({ "data.LastEncounterUsed": Number(0)});
		}

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


		if(currentFrequency == "At-Will" || currentFrequency == "")
		{
			currentCooldownLabel = AtWillReadyMark;
		}

		if(currentFrequency == "EOT")
		{
			// console.log(item.name + " data.LastRoundUsed = " + item.data.LastRoundUsed);

			if( (Number(currentRound - currentLastRoundUsed) < 2) && (currentEncounterID == currentLastEncounterUsed) )
			{
				currentCooldownLabel = EOTCooldownMark;
			}
			else
			{
				currentCooldownLabel = EOTReadyMark;
			}
			// console.log(item.name + "currentCooldownLabel = " + currentCooldownLabel);
		}

		if(currentFrequency == "Scene")
		{
			// console.log(item.name + " data.UseCount = " + item.data.UseCount);

			if( Number(currentUseCount) >= 1 )
			{
				currentCooldownLabel = SceneExpendedMark;
			}
			else
			{
				currentCooldownLabel = SceneReadyMark;
			}
			// console.log(item.name + "currentCooldownLabel = " + currentCooldownLabel);
		}

		if(currentFrequency == "Scene x2")
		{
			// console.log(item.name + " data.UseCount = " + item.data.UseCount);

			if( Number(currentUseCount) >= 2 )
			{
				currentCooldownLabel = SceneExpendedMark+SceneExpendedMark;
			}
			else if( Number(currentUseCount) == 1 )
			{
				currentCooldownLabel = SceneExpendedMark+SceneReadyMark;
			}
			else
			{
				currentCooldownLabel = SceneReadyMark+SceneReadyMark;
			}
			// console.log(item.name + "currentCooldownLabel = " + currentCooldownLabel);
		}

		if(currentFrequency == "Scene x3")
		{
			// console.log(item.name + " data.UseCount = " + item.data.UseCount);

			if( Number(currentUseCount) >= 3 )
			{
				currentCooldownLabel = SceneExpendedMark+SceneExpendedMark+SceneExpendedMark;
			}
			else if( Number(currentUseCount) == 2 )
			{
				currentCooldownLabel = SceneExpendedMark+SceneExpendedMark+SceneReadyMark;
			}
			else if( Number(currentUseCount) == 1 )
			{
				currentCooldownLabel = SceneExpendedMark+SceneReadyMark+SceneReadyMark;
			}
			else
			{
				currentCooldownLabel = SceneReadyMark+SceneReadyMark+SceneReadyMark;
			}
			// console.log(item.name + "currentCooldownLabel = " + currentCooldownLabel);
		}

		if(currentFrequency == "Daily")
		{
			// console.log(item.name + " data.UseCount = " + item.data.UseCount);

			if( Number(currentUseCount) >= 1 )
			{
				currentCooldownLabel = DailyExpendedMark;
			}
			else
			{
				currentCooldownLabel = DailyReadyMark;
			}
			// console.log(item.name + "currentCooldownLabel = " + currentCooldownLabel);
		}

		if(currentFrequency == "Daily x2")
		{
			// console.log(item.name + " data.UseCount = " + item.data.UseCount);

			if( Number(currentUseCount) >= 2 )
			{
				currentCooldownLabel = DailyExpendedMark+DailyExpendedMark;
			}
			else if( Number(currentUseCount) == 1 )
			{
				currentCooldownLabel = DailyExpendedMark+DailyReadyMark;
			}
			else
			{
				currentCooldownLabel = DailyReadyMark+DailyReadyMark;
			}
			// console.log(item.name + "currentCooldownLabel = " + currentCooldownLabel);
		}

		if(currentFrequency == "Daily x3")
		{
			// console.log(item.name + " data.UseCount = " + item.data.UseCount);

			if( Number(currentUseCount) >= 3 )
			{
				currentCooldownLabel = DailyExpendedMark+DailyExpendedMark+DailyExpendedMark;
			}
			else if( Number(currentUseCount) == 2 )
			{
				currentCooldownLabel = DailyExpendedMark+DailyExpendedMark+DailyReadyMark;
			}
			else if( Number(currentUseCount) == 1 )
			{
				currentCooldownLabel = DailyExpendedMark+DailyReadyMark+DailyReadyMark;
			}
			else
			{
				currentCooldownLabel = DailyReadyMark+DailyReadyMark+DailyReadyMark;
			}
			// console.log(item.name + "currentCooldownLabel = " + currentCooldownLabel);
		}

		if(currentlabel == ""){
		currentlabel=item.name;
		}
		var currenttype=item.type;
		var currentCategory=item.data.category;
		var effectivenessBackgroundColor = "darkgrey"
		var effectivenessTextColor = "black";
		if(currenttype=="move" && (currentCategory == "Status"))
		{
			if( ShowTargetTypeEffectivenessIfKnown && (target) && (!isNaN(item.data.damageBase)) && (item.data.damageBase != "") && effectiveness)
			{
				if (target.data.disposition > DISPOSITION_HOSTILE)
				{
					currentEffectivenessLabel = " (x"+effectiveness[item.data.type]+")";
					if (effectiveness[item.data.type] == 0.5)
					{
						effectivenessBackgroundColor = "pink";
					}
					else if (effectiveness[item.data.type] == 1)
					{
						effectivenessBackgroundColor = "lightgrey";
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
						effectivenessBackgroundColor = "lightblue";
						effectivenessTextColor = "black";
					}
					else if (effectiveness[item.data.type] > 1.5)
					{
						effectivenessBackgroundColor = "blue";
						effectivenessTextColor = "white";
					}
				}
			}

			let currentMoveTypeLabel = "<div><img src='" + AlternateIconPath + item.data.category + CategoryIconSuffix + "' width=80px height=auto></img><img src='" + AlternateIconPath + item.data.type + TypeIconSuffix + "' width=80px height=auto></img width=80px height=auto></div>";
			if(item.data.type == "Untyped" || item.data.type == "" || item.data.type == null)
			{
				// currentMoveTypeLabel = "<div><img src='" + AlternateIconPath + item.data.category + CategoryIconSuffix + "' width=80px height=auto></img></div>";
				currentMoveTypeLabel = "<div><img src='" + AlternateIconPath + item.data.category + CategoryIconSuffix + "' width=80px height=auto></img><img src='" + AlternateIconPath + "Untyped" + TypeIconSuffix + "' width=80px height=auto></img width=80px height=auto></div>";
			}

			let currentMoveRange = item.data.range;

			let currentMoveRangeIcon = "";

			if (currentMoveRange != "")
			{
				// console.log("currentMoveRange"+currentMoveRange);
				// console.log(currentMoveRange.slice( 0, currentMoveRange.search(",")));

				if(currentMoveRange.search("Self") > -1)
				{
					currentMoveRangeIcon = SelfIcon + currentMoveRange.slice(currentMoveRange.search("Self")+4);
				}
				else if(currentMoveRange.search("Burst") > -1)
				{
					currentMoveRangeIcon = BurstIcon + currentMoveRange.slice(currentMoveRange.search("Burst")+6);
				}
				else if(currentMoveRange.search("Cone") > -1)
				{
					currentMoveRangeIcon = ConeIcon + currentMoveRange.slice(currentMoveRange.search("Cone")+5);
				}
				else if(currentMoveRange.search("Line") > -1)
				{
					currentMoveRangeIcon = LineIcon + currentMoveRange.slice(currentMoveRange.search("Line")+5);
				}
				else if(currentMoveRange.search("Close Blast") > -1)
				{
					currentMoveRangeIcon = MeleeIcon+BlastIcon + currentMoveRange.slice(currentMoveRange.search("Close Blast")+9);
				}
				else if(currentMoveRange.search("Ranged Blast") > -1)
				{
					currentMoveRangeIcon = RangeIcon + currentMoveRange.slice(0, currentMoveRange.search(",")) + BlastIcon + currentMoveRange.slice(currentMoveRange.search("Ranged Blast")+13);
				}
				else if(currentMoveRange.search("Melee") > -1)
				{
					currentMoveRangeIcon = MeleeIcon;
				}
				else
				{
					currentMoveRangeIcon = RangeIcon + currentMoveRange.slice(0, currentMoveRange.search(","));
				}
			}


			// buttons[currentid]={label: "<center><div style='background-color:"+ effectivenessBackgroundColor +";color:"+ effectivenessTextColor +";border:2px solid black;width:130px;height:130px;font-size:10px;'>"+currentCooldownLabel+""+"<h3>"+currentlabel+currentMoveTypeLabel+"</h3>"+"<h5>"+currentMoveRangeIcon+"</h5>"+currentEffectivenessLabel+"</div></center>",
			buttons[currentid]={label: "<center><div style='background-color:"+ effectivenessBackgroundColor +";color:"+ effectivenessTextColor +";border:2px solid black; padding-left: 0px ;width:167px;height:95px;font-size:20px;font-family:Modesto Condensed;line-height:0.8'><h6>"+currentCooldownLabel+"</h6>"+"<h3 style='padding: 1px;font-family:Modesto Condensed;font-size:20px; color: white; background-color: #272727 ; overflow-wrap: normal ! important; word-break: keep-all ! important;'>"+currentlabel+currentMoveTypeLabel+"</h3>"+"<h6>"+currentMoveRangeIcon+"</h6>"+"</div></center>",
			callback: async () => {
				AudioHelper.play({src: SoundDirectory+UIButtonClickSound, volume: 0.5, autoplay: true, loop: false}, true);
				PerformFullAttack (actor,item);
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
							console.log('await search_item.update({ "data.UseCount": Number(item.data.UseCount + 1)}); =' + search_item.data.data.UseCount);
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
								console.log("DEBUG: Type Strategist: " + item.data.type + ", activated on round " + currentRound + ", HP = " + actor.data.data.health.value + "/" + actor.data.data.health.max + " (" + Number(actor.data.data.health.value / actor.data.data.health.max)*100 + "%; DR = " + currentDR);
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
						for (let searched_stat of stats)
						{
							if (move_stage_changes[searched_move][searched_stat] != null)
							{
								adjustActorStage(actor,searched_stat, move_stage_changes[searched_move][searched_stat]);
							}
						}
						if(move_stage_changes[searched_move]["pct-healing"] != null)
						{
							healActor(actor,move_stage_changes[searched_move]["pct-healing"]);
						}
						if(move_stage_changes[searched_move]["pct-self-damage"] != null)
						{
							damageActor(actor,move_stage_changes[searched_move]["pct-self-damage"]);
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

		if(item.data.LastRoundUsed == null)
		{
			for(let search_item of item_entities)
			{
				if (search_item._id == item._id)
				{
					await search_item.update({ "data.LastRoundUsed" : -2});
				}
			}
		}

		var currentLastRoundUsed = item.data.LastRoundUsed;

		if(item.data.LastEncounterUsed == null)
		{
			for(let search_item of item_entities)
			{
				if (search_item._id == item._id)
				{
					await search_item.update({ "data.LastEncounterUsed": 0});
				}
			}
			// item.update({ "data.LastEncounterUsed": Number(0)});
		}

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


		if(currentFrequency == "At-Will" || currentFrequency == "")
		{
			currentCooldownLabel = AtWillReadyMark;
		}

		if(currentFrequency == "EOT")
		{
			// console.log(item.name + " data.LastRoundUsed = " + item.data.LastRoundUsed);

			if( Number(currentRound - currentLastRoundUsed) < 2 && (currentEncounterID == currentLastEncounterUsed) )
			{
				currentCooldownLabel = EOTCooldownMark;
			}
			else
			{
				currentCooldownLabel = EOTReadyMark;
			}
			// console.log(item.name + "currentCooldownLabel = " + currentCooldownLabel);
		}

		if(currentFrequency == "Scene")
		{
			// console.log(item.name + " data.UseCount = " + item.data.UseCount);

			if( Number(currentUseCount) >= 1 )
			{
				currentCooldownLabel = SceneExpendedMark;
			}
			else
			{
				currentCooldownLabel = SceneReadyMark;
			}
			// console.log(item.name + "currentCooldownLabel = " + currentCooldownLabel);
		}

		if(currentFrequency == "Scene x2")
		{
			// console.log(item.name + " data.UseCount = " + item.data.UseCount);

			if( Number(currentUseCount) >= 2 )
			{
				currentCooldownLabel = SceneExpendedMark+SceneExpendedMark;
			}
			else if( Number(currentUseCount) == 1 )
			{
				currentCooldownLabel = SceneExpendedMark+SceneReadyMark;
			}
			else
			{
				currentCooldownLabel = SceneReadyMark+SceneReadyMark;
			}
			// console.log(item.name + "currentCooldownLabel = " + currentCooldownLabel);
		}

		if(currentFrequency == "Scene x3")
		{
			// console.log(item.name + " data.UseCount = " + item.data.UseCount);

			if( Number(currentUseCount) >= 3 )
			{
				currentCooldownLabel = SceneExpendedMark+SceneExpendedMark+SceneExpendedMark;
			}
			else if( Number(currentUseCount) == 2 )
			{
				currentCooldownLabel = SceneExpendedMark+SceneExpendedMark+SceneReadyMark;
			}
			else if( Number(currentUseCount) == 1 )
			{
				currentCooldownLabel = SceneExpendedMark+SceneReadyMark+SceneReadyMark;
			}
			else
			{
				currentCooldownLabel = SceneReadyMark+SceneReadyMark+SceneReadyMark;
			}
			// console.log(item.name + "currentCooldownLabel = " + currentCooldownLabel);
		}

		if(currentFrequency == "Daily")
		{
			// console.log(item.name + " data.UseCount = " + item.data.UseCount);

			if( Number(currentUseCount) >= 1 )
			{
				currentCooldownLabel = DailyExpendedMark;
			}
			else
			{
				currentCooldownLabel = DailyReadyMark;
			}
			// console.log(item.name + "currentCooldownLabel = " + currentCooldownLabel);
		}

		if(currentFrequency == "Daily x2")
		{
			// console.log(item.name + " data.UseCount = " + item.data.UseCount);

			if( Number(currentUseCount) >= 2 )
			{
				currentCooldownLabel = DailyExpendedMark+DailyExpendedMark;
			}
			else if( Number(currentUseCount) == 1 )
			{
				currentCooldownLabel = DailyExpendedMark+DailyReadyMark;
			}
			else
			{
				currentCooldownLabel = DailyReadyMark+DailyReadyMark;
			}
			// console.log(item.name + "currentCooldownLabel = " + currentCooldownLabel);
		}

		if(currentFrequency == "Daily x3")
		{
			// console.log(item.name + " data.UseCount = " + item.data.UseCount);

			if( Number(currentUseCount) >= 3 )
			{
				currentCooldownLabel = DailyExpendedMark+DailyExpendedMark+DailyExpendedMark;
			}
			else if( Number(currentUseCount) == 2 )
			{
				currentCooldownLabel = DailyExpendedMark+DailyExpendedMark+DailyReadyMark;
			}
			else if( Number(currentUseCount) == 1 )
			{
				currentCooldownLabel = DailyExpendedMark+DailyReadyMark+DailyReadyMark;
			}
			else
			{
				currentCooldownLabel = DailyReadyMark+DailyReadyMark+DailyReadyMark;
			}
			// console.log(item.name + "currentCooldownLabel = " + currentCooldownLabel);
		}

		if(currentlabel == ""){
		currentlabel=item.name;
		}
		var currenttype=item.type;
		var currentCategory = item.data.category;
		var effectivenessBackgroundColor = "darkgrey"
		var effectivenessTextColor = "black";
		if(currenttype=="move" && (currentCategory == "Physical" || currentCategory == "Special"))
		{
			if( ShowTargetTypeEffectivenessIfKnown && (target) && (!isNaN(item.data.damageBase)) && (item.data.damageBase != "") && effectiveness)
			{
				if (target.data.disposition > DISPOSITION_HOSTILE)
				{
					currentEffectivenessLabel = " (x"+effectiveness[item.data.type]+")";
					if (effectiveness[item.data.type] == 0.5)
					{
						effectivenessBackgroundColor = "pink";
					}
					else if (effectiveness[item.data.type] == 1)
					{
						effectivenessBackgroundColor = "lightgrey";
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
						effectivenessBackgroundColor = "lightblue";
						effectivenessTextColor = "black";
					}
					else if (effectiveness[item.data.type] > 1.5)
					{
						effectivenessBackgroundColor = "blue";
						effectivenessTextColor = "white";
					}
				}
			}

			let currentMoveTypeLabel = "<div><img src='" + AlternateIconPath + item.data.category + CategoryIconSuffix + "' width=80px height=auto></img><img src='" + AlternateIconPath + item.data.type + TypeIconSuffix + "' width=80px height=auto></img width=80px height=auto></div>";
			if(item.data.type == "Untyped" || item.data.type == "" || item.data.type == null)
			{
				// currentMoveTypeLabel = "<div><img src='" + AlternateIconPath + item.data.category + CategoryIconSuffix + "' width=80px height=auto></img></div>";
				currentMoveTypeLabel = "<div><img src='" + AlternateIconPath + item.data.category + CategoryIconSuffix + "' width=80px height=auto></img><img src='" + AlternateIconPath + "Untyped" + TypeIconSuffix + "' width=80px height=auto></img width=80px height=auto></div>";
			}

			let currentMoveRange = item.data.range;

			let currentMoveRangeIcon = "";

			let currentMoveFiveStrike = false;
			let currentMoveDoubleStrike = false;

			if (currentMoveRange != "")
			{
				// console.log("currentMoveRange"+currentMoveRange);
				// console.log(currentMoveRange.slice( 0, currentMoveRange.search(",")));

				if(currentMoveRange.search("Self") > -1)
				{
					currentMoveRangeIcon = SelfIcon + currentMoveRange.slice(currentMoveRange.search("Self")+4);
				}
				else if(currentMoveRange.search("Burst") > -1)
				{
					currentMoveRangeIcon = BurstIcon + currentMoveRange.slice(currentMoveRange.search("Burst")+6);
				}
				else if(currentMoveRange.search("Cone") > -1)
				{
					currentMoveRangeIcon = ConeIcon + currentMoveRange.slice(currentMoveRange.search("Cone")+5);
				}
				else if(currentMoveRange.search("Line") > -1)
				{
					currentMoveRangeIcon = LineIcon + currentMoveRange.slice(currentMoveRange.search("Line")+5);
				}
				else if(currentMoveRange.search("Close Blast") > -1)
				{
					currentMoveRangeIcon = MeleeIcon+BlastIcon + currentMoveRange.slice(currentMoveRange.search("Close Blast")+9);
				}
				else if(currentMoveRange.search("Ranged Blast") > -1)
				{
					currentMoveRangeIcon = RangeIcon + currentMoveRange.slice(0, currentMoveRange.search(",")) + BlastIcon + currentMoveRange.slice(currentMoveRange.search("Ranged Blast")+13);
				}
				else if(currentMoveRange.search("Melee") > -1)
				{
					currentMoveRangeIcon = MeleeIcon;
				}
				else
				{
					currentMoveRangeIcon = RangeIcon + currentMoveRange.slice(0, currentMoveRange.search(","));
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

			// buttons[currentid]={label: "<center><div style='background-color:"+ effectivenessBackgroundColor +";color:"+ effectivenessTextColor +";border:2px solid black;width:130px;height:130px;font-size:10px;'>"+currentCooldownLabel+""+"<h3>"+currentlabel+currentMoveTypeLabel+"</h3>"+"<h5>"+currentMoveRangeIcon+"</h5>"+currentEffectivenessLabel+"</div></center>",
			buttons[currentid]={label: "<center style='padding: 0px'><div style='background-color:"+ effectivenessBackgroundColor +";color:"+ effectivenessTextColor +";border:2px solid black; padding: 0px ;width:167px;height:95px;font-size:20px;font-family:Modesto Condensed;line-height:0.8'><h6>"+currentCooldownLabel+"</h6>"+"<h3 style='padding: 1px;font-family:Modesto Condensed;font-size:20px; color: white; background-color: #272727 ; overflow-wrap: normal ! important; word-break: keep-all ! important;'>"+currentlabel+currentMoveTypeLabel+"</h3>"+"<h6>"+currentMoveRangeIcon+"</h6>"+"</div></center>",
			callback: async () => {
				AudioHelper.play({src: SoundDirectory+UIButtonClickSound, volume: 0.5, autoplay: true, loop: false}, true);
				PerformFullAttack (actor,item);
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
							console.log('await search_item.update({ "data.UseCount": Number(item.data.UseCount + 1)}); =' + search_item.data.data.UseCount);
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
								console.log("DEBUG: Type Strategist: " + item.data.type + ", activated on round " + currentRound + ", HP = " + actor.data.data.health.value + "/" + actor.data.data.health.max + " (" + Number(actor.data.data.health.value / actor.data.data.health.max)*100 + "%; DR = " + currentDR);
								await actor.update({ "data.TypeStrategistLastRoundUsed": currentRound, "data.TypeStrategistLastEncounterUsed": currentEncounterID, "data.TypeStrategistLastTypeUsed": item.data.type, "data.TypeStrategistDR": currentDR});
							}
						}
					}
				// item.update({ "data.LastRoundUsed": currentRound});
				// item.update({ "data.LastEncounterUsed": currentEncounterID});
				// console.log(item.name + " data.LastRoundUsed = " + item.data.LastRoundUsed);
				console.log("search debug",move_stage_changes);

				for(let searched_move in move_stage_changes)
				{
					if(searched_move == item.name)
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
							healActor(actor,move_stage_changes[searched_move]["pct-healing"]);
						}
					}
				}

			}

			}

		}

		i++;
	} // END DAMAGE MOVE LOOP


	buttons["struggleMenu"] = {label: "<center><div style='background-color:lightgray;color:black;border:2px solid black;width:333px;height:25px;font-size:16px;font-family:Modesto Condensed;line-height:1.4'>"+"Struggle 💬"+"</div></center>",
		callback: () => {

			//PerformStruggleAttack ("Normal", "Physical");

		  }};

	buttons["maneuverMenu"] = {label: "<center><div style='background-color:lightgray;color:black;border:2px solid black;width:333px;height:25px;font-size:16px;font-family:Modesto Condensed;line-height:1.4'>"+"Maneuvers 💬"+"</div></center>",
	callback: () => {

		//PerformStruggleAttack ("Normal", "Physical");

	}};

	for(let item of items)
	{
		// if(currentlabel == "")
		// {
		//         currentlabel=item.name;
		// }

		var currenttype = item.type;
		var currentid=item._id;
		var currentlabel=item.data.name;

		if(currenttype=="ability")
		{
			console.log("ABILITY: " + item.name + ", Type = " + item.type)
			var currentlabel=item.name;
			var respdata=item.data;
			respdata['category']='details';
			buttons[currentid]={label: "<center><div style='background-color:gray;color:black;border:2px solid darkgray;width:333px;height:25px;font-size:16px;font-family:Modesto Condensed;line-height:1.4'>"+AbilityIcon+currentlabel+"</div></center>",
				callback: async () => {
					AudioHelper.play({src: SoundDirectory+UIButtonClickSound, volume: 0.5, autoplay: true, loop: false}, true);
					sendMoveMessage({move: item.data,templateType: MoveMessageTypes.DETAILS,category: "details", hasAC: (!isNaN(item.data.ac))
					});
			}
			}
		}
	}


	buttons["resetEOT"] = {label: ResetEOTMark,
		callback: async () => {
			AudioHelper.play({src: SoundDirectory+UIButtonClickSound, volume: 0.5, autoplay: true, loop: false}, true);
			for(let item of items)
			{
				if(item.data.frequency == "EOT")
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
			AudioHelper.play({src: SoundDirectory+RefreshEOTMovesSound, volume: 0.8, autoplay: true, loop: false}, true);
		  }};

	buttons["resetScene"] = {label: ResetSceneMark,
		callback: async () => {
			AudioHelper.play({src: SoundDirectory+UIButtonClickSound, volume: 0.5, autoplay: true, loop: false}, true);
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
			AudioHelper.play({src: SoundDirectory+RefreshSceneMovesSound, volume: 0.8, autoplay: true, loop: false}, true);
		  }};

	buttons["resetDaily"] = {label: ResetDailyMark,
	callback: async () => {
			AudioHelper.play({src: SoundDirectory+UIButtonClickSound, volume: 0.5, autoplay: true, loop: false}, true);
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
				AudioHelper.play({src: SoundDirectory+RefreshDailyMovesSound, volume: 0.8, autoplay: true, loop: false}, true);
			}};




		let dialogOptions = game.users.filter(u => u.data.role < 3).map(u => `<option value=${u.id}> ${u.data.name} </option>`).join(``);
		let dialogEditor = new Dialog({
		  title: `Move Selector`,
		//   content: `
		//   <div><h2>Paste your image url below:</h2><div>
		//   <div>URL: <input name="url" style="width:350px"/></div>
		//   <div><i>if the image is from the internet do not forget to include http(s):// in the url</i></div>
		//   <div>Whisper to player?<input name="whisper" type="checkbox"/></div>
		//   <div">Player name:<select name="player">${dialogOptions}</select></div>
		//   `,
		  content: "<center><div><h1>Use A Move!</h1></div><div style='font-family:Modesto Condensed;font-size:20px'>"+AtWillReadyMark+"At-Will / "+EOTReadyMark+"EOT / "+SceneReadyMark+"Scene / "+DailyReadyMark+"Daily</div><div style='font-family:Modesto Condensed;font-size:20px'>"+MeleeIcon+"Melee / "+RangeIcon+"Ranged / "+BurstIcon+"Burst / "+ConeIcon+"Cone / "+LineIcon+"Line / "+BlastIcon+"Blast</div><div style='font-family:Modesto Condensed;font-size:20px'><h2>"+ targetTypingText+"</h2><div><center>",
		  buttons: buttons
		});
		
		dialogEditor.render(true);
		};


		async function sendMoveMessage(messageData = {}) {
		console.log("send debug",messageData);
			messageData = mergeObject({
				user: game.user._id,
				templateType: MoveMessageTypes.DAMAGE,
				verboseChatInfo: game.settings.get("ptu", "verboseChatInfo") ?? false
			}, messageData);

			if(!messageData.move) {
				console.error("Can't display move chat message without move data.")
				return;
			}
		console.log("alt path");
			messageData.content = await renderTemplate('modules/PTUMoveMaster/move-combined.hbs', messageData)

			return ChatMessage.create(messageData, {});
		};

		function chatMessage(token, messageContent) {
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

		const CritOptions = {
			CRIT_MISS: 'miss',
			NORMAL: 'normal',
			CRIT_HIT: 'hit'
		};

		function adjustActorStage(actor,stat, change)
		{
			if(change > 0)
			{
				AudioHelper.play({src: SoundDirectory+stat_up_sound_file, volume: 0.8, autoplay: true, loop: false}, true);
			}
			else
			{
				AudioHelper.play({src: SoundDirectory+stat_down_sound_file, volume: 0.8, autoplay: true, loop: false}, true);
			}

			let new_stage = eval("Math.max(Math.min((actor.data.data.stats."+stat+".stage + change), 6), -6)");
			eval("actor.update({'data.stats."+stat+".stage': Number("+ new_stage +") })");
			chatMessage(actor, actor.name + ' '+ stat +' Stage +'+ change +'!');
		}

		function healActor(actor,pct_healing)
		{
			AudioHelper.play({src: SoundDirectory+heal_sound_file, volume: 0.8, autoplay: true, loop: false}, true);

			let new_health = Math.min( (actor.data.data.health.value + Number(pct_healing*actor.data.data.health.max) ), actor.data.data.health.max);
			actor.update({'data.health.value': Number(new_health) });
			chatMessage(actor, actor.name + ' healed '+ pct_healing*100 +'% of their max hit points!');
		}

		function damageActor(actor,pct_damage)
		{
			AudioHelper.play({src: SoundDirectory+damage_sound_file, volume: 0.8, autoplay: true, loop: false}, true);

			let new_health = Math.min( (actor.data.data.health.value - Number(pct_damage*actor.data.data.health.max) ), actor.data.data.health.max);
			actor.update({'data.health.value': Number(new_health) });
			chatMessage(actor, actor.name + ' took damage equal to '+ pct_damage*100 +'% of their max hit points!');
		}

		function CalculateAcRoll (moveData, actorData)   {
			return new Roll('1d20-@ac+@acBonus', {
				ac: (parseInt(moveData.ac) || 0),
				acBonus: (parseInt(actorData.modifiers.acBonus) || 0)
			})
		};




		function PerformFullAttack (actor,move) 
		{
			let isFiveStrike = false;
			let isDoubleStrike = false;
			let userHasTechnician = false;
			let userHasAdaptability = false;
			let fiveStrikeCount = 0;

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

			if(move.data.range.search("Five Strike") > -1)
			{
				isFiveStrike = true;
				// console.log("DEBUG: ROLLING FIVE STRIKE");
				let fiveStrikeD8 = Math.floor(Math.random() * (8 - 1 + 1)) + 1;
				// console.log("DEBUG: FIVE STRIKE D8 = " + fiveStrikeD8);
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
				// console.log("DEBUG: FIVE STRIKE HITS = " + fiveStrikeHits);
				fiveStrikeCount = fiveStrikeHits-1;
			}
			if( (move.data.range.search("Doublestrike") > -1) || (move.data.range.search("Double Strike") > -1) )
			{
				isDoubleStrike = true;
				console.log("DEBUG: ROLLING DOUBLE STRIKE");
			}

			let acRoll = CalculateAcRoll(move.data, actor.data.data);
			let diceResult = GetDiceResult(acRoll);

			let acRoll2 = CalculateAcRoll(move.data, actor.data.data);
			let diceResult2 = GetDiceResult(acRoll2);

			let crit = diceResult === 1 ? CritOptions.CRIT_MISS : diceResult >= 20 - actor.data.data.modifiers.critRange ? CritOptions.CRIT_HIT : CritOptions.NORMAL;
			let crit2 = diceResult2 === 1 ? CritOptions.CRIT_MISS : diceResult2 >= 20 - actor.data.data.modifiers.critRange ? CritOptions.CRIT_HIT : CritOptions.NORMAL;

			// console.log("DEBUG: isDoubleStrike = " + isDoubleStrike);
			let damageRoll = CalculateDmgRoll(move.data, actor.data.data, 'normal', userHasTechnician, userHasAdaptability, isDoubleStrike, isFiveStrike, fiveStrikeCount, 1, 0);
			if(damageRoll) damageRoll.roll();
			let critDamageRoll = CalculateDmgRoll(move.data, actor.data.data, 'hit', userHasTechnician, userHasAdaptability, isDoubleStrike, isFiveStrike, fiveStrikeCount, 1, 0);
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

			let damageRollTwoHits = CalculateDmgRoll(move.data, actor.data.data, 'normal', userHasTechnician, userHasAdaptability, isDoubleStrike, isFiveStrike, fiveStrikeCount, 2, 0);
			if(damageRollTwoHits)
			{
				damageRollTwoHits.roll();
			}

			let critDamageRollOneHitOneCrit = CalculateDmgRoll(move.data, actor.data.data, 'hit', userHasTechnician, userHasAdaptability, isDoubleStrike, isFiveStrike, fiveStrikeCount, 2, 1);
			if(critDamageRollOneHitOneCrit)
			{
				critDamageRollOneHitOneCrit.roll();
			}

			let critDamageRollTwoCrits = CalculateDmgRoll(move.data, actor.data.data, 'hit', userHasTechnician, userHasAdaptability, isDoubleStrike, isFiveStrike, fiveStrikeCount, 2, 2);
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
					// console.log("DEBUG: Type Strategist: " + item.name.slice(item.name.search('\\(')+1, item.name.search('\\)') ));
					// console.log(typeStrategist);
					// console.log(typeStrategist.length);
				}
			} // END Ability Check Loop

			if( (typeStrategist.length > 0) && (typeStrategist.indexOf(move.data.type) > -1) )
			{
				// console.log("DEBUG: PerformFullAttack function TypeStrategist trigger!")
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
				currentExtraEffectText = currentExtraEffectText+ "<br>Technician applies!";
				currentHasExtraEffect = true;
			}

			if(userHasAdaptability && (move.data.type == actor.data.data.typing[0] || move.data.type == actor.data.data.typing[1]) )
			{
				currentExtraEffectText = currentExtraEffectText+ "<br>Adaptability applies!";
				currentHasExtraEffect = true;
			}

			sendMoveRollMessage(acRoll, acRoll2, {
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
				isDoubleStrike: isDoubleStrike
			}).then(data => console.log(data));

			var moveSoundFile = (move.data.name + ".mp3");

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
			AudioHelper.play({src: SoundDirectory+moveSoundFile, volume: 0.8, autoplay: true, loop: false}, true);
			console.log(move.data.name + " attempting to play move sound = " + moveSoundFile);
			};

	function PerformStruggleAttack (move) // TODO: Implement Struggles
	{
		let acRoll = CalculateAcRoll(move.data, actor.data.data);
		let diceResult = GetDiceResult(acRoll);

		let crit = diceResult === 1 ? CritOptions.CRIT_MISS : diceResult >= 20 - actor.data.data.modifiers.critRange ? CritOptions.CRIT_HIT : CritOptions.NORMAL;
		let damageRoll = CalculateDmgRoll(move.data, actor.data.data, 'normal');

		if(damageRoll) damageRoll.roll();
		let critDamageRoll = CalculateDmgRoll(move.data, actor.data.data, 'hit');

		if(!move.data.name)
		{
			move.data.name=move.name;
		}
		if(critDamageRoll) critDamageRoll.roll();
		if(damageRoll && damageRoll._total)
		{
			game.macros.getName("backend_set_flags")?.execute(damageRoll._total,critDamageRoll._total,move.data.category,move.data.type);
		}

		sendMoveRollMessage(acRoll, {
			speaker: ChatMessage.getSpeaker({
				actor: actor
			}),
			move: move.data,
			damageRoll: damageRoll,
			critDamageRoll: critDamageRoll,
			templateType: MoveMessageTypes.FULL_ATTACK,
			crit: crit
		}).then(data => console.log(data));

		var moveSoundFile = (move.data.name + ".mp3");

		if(move.data.name.toString().match(/Hidden Power/) != null)
		{
			moveSoundFile = ("Hidden Power" + ".mp3");
		}

		moveSoundFile.replace(/ /g,"%20");

		AudioHelper.play({src: SoundDirectory+moveSoundFile, volume: 0.8, autoplay: true, loop: false}, true);
		console.log(move.data.name + " attempting to play move sound = " + moveSoundFile);

	};


	function GetDiceResult(roll)
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


	function CalculateDmgRoll(moveData, actorData, isCrit, userHasTechnician, userHasAdaptability, isDoubleStrike, isFiveStrike, fiveStrikeCount, hitCount, critCount) 
	{
		console.log("DEBUG: fiveStrikeCount = " + fiveStrikeCount)
		console.log("DEBUG: hitCount = " + hitCount)
		// console.log("DEBUG: final DB = " + (parseInt(moveData.damageBase)*fiveStrikeCount))
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

			if(userHasTechnician && ( isDoubleStrike || isFiveStrike || (moveData.damageBase <= 6) ) )
			{
				console.log("DEBUG: TECHNICIAN APPLIES");
				technicianDBBonus = 2;
			}

			if(userHasAdaptability)
			{
				console.log("DEBUG: ADAPTABILITY POTENTIALLY APPLIES");
				STABBonus = 3;
			}

			if(moveData.name.toString().match(/Stored Power/) != null) // Increase DB if move is one that scales like Stored Power, et. al.
			{
				console.log("DEBUG: STORED POWER ROLLED!")
			    let atk_stages = actorData.stats.atk.stage < 0 ? 0 : actorData.stats.atk.stage;
			    let spatk_stages = actorData.stats.spatk.stage < 0 ? 0 : actorData.stats.spatk.stage;
			    let def_stages = actorData.stats.def.stage < 0 ? 0 : actorData.stats.def.stage;
			    let spdef_stages = actorData.stats.spdef.stage < 0 ? 0 : actorData.stats.spdef.stage;
			    let spd_stages = actorData.stats.spd.stage < 0 ? 0 : actorData.stats.spd.stage;

			    let db_from_stages = ( (atk_stages + spatk_stages + def_stages + spdef_stages + spd_stages) * 2 );
			    console.log("db_from_stages = " + db_from_stages );

				damageBase = (
					moveData.type == actorData.typing[0] || moveData.type == actorData.typing[1]) ? 
					Math.min(db*(hitCount + fiveStrikeCount) + db_from_stages, 20) + STABBonus + technicianDBBonus : 
					Math.min(db*(hitCount + fiveStrikeCount) + db_from_stages, 20) + technicianDBBonus;

				damageBaseOriginal = (
					moveData.type == actorData.typing[0] || moveData.type == actorData.typing[1]) ? 
					Math.min(db + db_from_stages, 20) + STABBonus + technicianDBBonus : 
					Math.min(db + db_from_stages, 20) + technicianDBBonus;
				
			    dbRoll = game.ptu.DbData[damageBase];
				dbRollOriginal = game.ptu.DbData[damageBaseOriginal];
			}
			else if(moveData.name.toString().match(/Punishment/) != null) // Increase DB if move is one that scales like Punishment, et. al.
			{
				console.log("DEBUG: STORED POWER ROLLED!")
			    let atk_stages = actorData.stats.atk.stage < 0 ? 0 : actorData.stats.atk.stage;
			    let spatk_stages = actorData.stats.spatk.stage < 0 ? 0 : actorData.stats.spatk.stage;
			    let def_stages = actorData.stats.def.stage < 0 ? 0 : actorData.stats.def.stage;
			    let spdef_stages = actorData.stats.spdef.stage < 0 ? 0 : actorData.stats.spdef.stage;
			    let spd_stages = actorData.stats.spd.stage < 0 ? 0 : actorData.stats.spd.stage;

			    let db_from_stages = ( (atk_stages + spatk_stages + def_stages + spdef_stages + spd_stages) * 1 );
			    console.log("db_from_stages = " + db_from_stages );

				damageBase = (
					moveData.type == actorData.typing[0] || moveData.type == actorData.typing[1]) ? 
					Math.min(db*(hitCount + fiveStrikeCount) + db_from_stages, 12) + STABBonus + technicianDBBonus : 
					Math.min(db*(hitCount + fiveStrikeCount) + db_from_stages, 12) + technicianDBBonus;

				damageBaseOriginal = (
					moveData.type == actorData.typing[0] || moveData.type == actorData.typing[1]) ? 
					Math.min(db + db_from_stages, 20) + STABBonus + technicianDBBonus : 
					Math.min(db + db_from_stages, 20) + technicianDBBonus;
				
			    dbRoll = game.ptu.DbData[damageBase];
				dbRollOriginal = game.ptu.DbData[damageBaseOriginal];
			}
			else
			{
				damageBase = (
					moveData.type == actorData.typing[0] || moveData.type == actorData.typing[1]) ? 
					db*(hitCount + fiveStrikeCount) + STABBonus + technicianDBBonus : 
					db*(hitCount + fiveStrikeCount) + technicianDBBonus;

				damageBaseOriginal = (
					moveData.type == actorData.typing[0] || moveData.type == actorData.typing[1]) ? 
					db + STABBonus + technicianDBBonus : 
					db + technicianDBBonus;

				console.log("DEBUG: db = " + db);
				console.log("DEBUG: STABBonus = " + STABBonus);
				console.log("DEBUG: technicianDBBonus = " + technicianDBBonus);

				dbRoll = game.ptu.DbData[damageBase];
				dbRollOriginal = game.ptu.DbData[damageBaseOriginal];
			}

			console.log("damageBase = " + damageBase);
			console.log("damageBaseOriginal = " + damageBaseOriginal);

			let bonus = Math.max(moveData.category === "Physical" ? actorData.stats.atk.total : actorData.stats.spatk.total, 0);
			let rollString = '@roll+@bonus';
			let rollStringCrit = '@roll+@roll+@bonus';
			if(isDoubleStrike)
			{
				// console.log("DEBUG: IS DOUBLE STRIKE DB CALC!");
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
			console.log("DEBUG: DB ROLL: " + dbRoll);
			console.log("DEBUG: DB ROLL ORIGINAL: " + dbRollOriginal);
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

	async function sendMoveRollMessage(rollData, rollData2, messageData = {})
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

	return {
		ChatWindow:ChatWindow,
		ApplyDamage:ApplyDamage
	}
};
