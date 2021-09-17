import { PTUAutoFight } from '../code.js'

export class SidebarForm extends FormApplication {
    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "ptu-sidebar",
            classes: ["pokemon", "ptu", "ptu-sidebar"],
            title: "PTU Sidebar",
            template: "modules/PTUMoveMaster/templates/forms/sidebar-form.hbs",
            dragDrop: [{dragSelector: ".directory-item.belt-pokeball", dropSelector: null}],
        });
    }

    /** @override */
    getData() {
        // Get current value
        const x = $(window).width();
        const y = $(window).height();

        let alternate_style = game.settings.get("PTUMoveMaster", "useAlternateChatStyling");

        if(alternate_style)
	      {
          this.position.left = x - 455;//505;//515;
        }
        else
        {
          this.position.left = x - 505;//515;
        }
        this.position.top = Math.round(y * 0.005);
        this.position.width = 200;
        this.position.height = Math.round(y * 0.985);
        
        var obj = this;
        $(window).resize(function() {
          if(alternate_style)
	        {
            obj.setPosition({left: $(window).width() - 455})//515})
          }
          else
          {
            obj.setPosition({left: $(window).width() - 515})
          }
        })


        // const dragHandle = html.find("#dragHandle");
        // new Draggable(this, html, dragHandle, false);

        // console.log("______________this.object_______________");
        // console.log(this.object);

        // console.log("______________this.object.buttons_______________");
        // console.log(this.object.buttons);
        // Return data
        return {
            // isGM: game.user.isGM,
            content: this.object.content,
            buttons: this.object.buttons,
            id: this.object.dialogueID,
            // menu: this.object.menu,
        };

    }


      
  /** @override */
  _onDragStart(event) 
  {
    let li = event.currentTarget.closest(".directory-item.belt-pokeball");
    let dragData = {type: 'Actor', id: li.dataset.entityId};

    event.dataTransfer.setData("text/plain", JSON.stringify(dragData));
  }


    /** @override */
    _updateObject(event, formData) {}

    /** @override */
    async close(options = {}) {}

    /** @override */
    activateListeners(html) {
        html.find(".MoveMaster-button").click(this._onClickButton.bind(this));

        html.find('.directory-item.belt-pokeball')
        .on('dragstart', (ev1) => {
          
          let li = ev1.originalEvent.currentTarget.closest(".directory-item.belt-pokeball");
          let dragData = {type: 'Actor', id: li.dataset.entityId};
          this._onDragStart(ev1.originalEvent);

        })
    }

    /**
	 * Handle a left-mouse click on one of the dialog choice buttons
	 * @param {MouseEvent} event    The left-mouse click event
	 * @private
	 */
	_onClickButton(event) {
        const id = event.currentTarget.dataset.button;
        const button = this.object.buttons[id];
        this.submit(button);
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

          if(!button.noRefresh)
          {
            let current_actor = game.actors.get(canvas.tokens.controlled[0].data.actorId);
            // console.log("Sidebar-form.js current_actor:")
            // console.log(current_actor);
            setTimeout(() => {  PTUAutoFight().ChatWindow(current_actor); }, 150);
          }
          
        } catch(err) {
          ui.notifications.error(err);
          throw new Error(err);
        }
      }
}