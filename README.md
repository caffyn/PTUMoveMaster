# PTUMoveMaster
This is an automation assistant for Foundry PTU. 

To invoke new menus, create a new script, enter the following, set the type to Script, select the token to use, and run the script. 

```
PTUAutoFight.ChatWindow(token.actor);
```
Manifest link:
https://raw.githubusercontent.com/caffyn/PTUMoveMaster/main/module.json 

Installation instructions:
1. Install PTU system in Foundry
2. Return to Setup in Foundry and go to Add-on Modules tab
3. Press Install Module
4. Paste the above link into the Manifest URL field and press Install
5. It is highly recommended and/or semi-required that you also install the following modules that this one relies upon to do fancy things with Pokeballs: TokenMagic FX, FXMaster, Confetti (more optional and a matter of taste than the other two).

Hold Shift when clicking a move button in order to enter bonus damage (which can be negative).

Module GM Settings:
- Automatically Apply Injuries: Automatically applies Injuries when pokemon or trainers are damaged with the apply damage buttons in Move Master's roll templates. True by default.

Module Per-Player Settings:
- Show Effectiveness as Text: This allows players to choose whether they would prefer to see actual numbers for type effectiveness within Move Master's move buttons, as opposed to just the color of the left border. True by default.