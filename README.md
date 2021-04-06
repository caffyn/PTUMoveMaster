# PTUMoveMaster
This is an automation assistant for Foundry PTU. (Currently this requires the *development* branch of https://github.com/dylanpiera/Foundry-Pokemon-Tabletop-United-System, not the stable release.)


You no longer have to use the script described below! Now, just select a token and the Move Master sidebar will appear. Target a token as well to get effectiveness info (if enabled) throw pokeballs, or apply items. If you have no target, you are assumed to be targeting yourself.


OUTDATED BACKUP INSTRUCTIONS: To invoke new menus, create a new script, enter the following, set the type to Script, select the token to use, and run the script. 
```
PTUAutoFight.ChatWindow(token.actor);
```
END OUTDATED BACKUP INSTRUCTIONS


Manifest link:
https://raw.githubusercontent.com/caffyn/PTUMoveMaster/main/module.json 

Installation instructions:
1. Install PTU system in Foundry
2. Return to Setup in Foundry and go to Add-on Modules tab
3. Press Install Module
4. Paste the above link into the Manifest URL field and press Install
5. It is highly recommended and/or semi-required that you also install the following modules that this one relies upon to do fancy things with Pokeballs: TokenMagic FX, FXMaster, Confetti (more optional and a matter of taste than the other two). Also highly recommended for switching targets with Alt-Click (especially for the GM), is the module Easy Target.

Hold Shift when clicking a move button in order to enter bonus damage (which can be negative).


Module GM Settings:
- Automatically Apply Injuries: Automatically applies Injuries when pokemon or trainers are damaged with the apply damage buttons in Move Master's roll templates. True by default.

- Show move effectiveness on current target: This will let you know (with either colored striping (more blue is more effective, more red is less effective, black is immune, white is neutral), or text multiplier plus colored striping, depending on a different per-player setting) the effectiveness of your moves against your target. By default, this does not show for hostile targets, but does show for neutral and better (used with the pokedex scan button, which will set scanned targets to neutral, thus revealing them), but it can be set to never show or always show, depending on GM preference.

- Always Display Token Names: If true, automatically sets tokens to display their name to everyone when they're dragged out. Also includes Nature as a prefix to the name. May conflict with TokenMold.

- Always Display Token Health: If true, automatically sets tokens to display their health as a bar to everyone when they're dragged out.

- Pokepsychologist allows replacing Command with Pokemon Education for Loyalty checks: As written, Pokepsychologist is relatively worthless, and technically does not allow for one of the uses a casual reading of it might imply. This homebrew option allows trainers with Pokepsychologist to use Pokemon Education in place of Command for Loyalty checks.

- Automatically reset stages when ending an encounter: This will make all active combatants reset their combat stages when you end an encounter.

- Use Pokeball Animation On Drag Out: Use an animated pokeball effect when dragging an owned pokemon onto a field with their trainer present. Disable this if you are having problems with the effects.

- Current Weather: This is usually set via internal scripts, but it's exposed here if you need to change it manually.

- Auto-skip Turns: Automatically skip turns when no actions possible, due to failing certain saves or being fainted. Disable this if you are a coward. (Or if you want to manually advance turns all the time).

Module Per-Player Settings:
- Show Effectiveness as Text: This allows players to choose whether they would prefer to see actual numbers for type effectiveness within Move Master's move buttons, as opposed to just the color of the left border. True by default.

- Use Alternate Chat Styling: Styles the chat to have (what I think is) a more readable font, compact size, and low-contrast look. Disable this if you are having compatibility issues with the chat pane styling, or if you just don't like it.