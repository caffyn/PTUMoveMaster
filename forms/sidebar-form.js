import { PTUAutoFight } from '../code.js'

export class SidebarForm extends FormApplication {
    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "ptu-sidebar",
            classes: ["pokemon", "ptu", "ptu-sidebar"],
            title: "PTU Sidebar",
            template: "modules/PTUMoveMaster/templates/forms/sidebar-form.hbs",
        });
    }

    /** @override */
    getData() {
        // Get current value
        const x = $(window).width();
        const y = $(window).height();

        this.position.left = x - 505;//515;
        this.position.top = Math.round(y * 0.005);
        this.position.width = 200;
        this.position.height = Math.round(y * 0.985);
        
        var obj = this;
        $(window).resize(function() {
            obj.setPosition({left: $(window).width() - 515})
        })

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
    _updateObject(event, formData) {}

    /** @override */
    async close(options = {}) {}

    /** @override */
    activateListeners(html) {
        html.find(".MoveMaster-button").click(this._onClickButton.bind(this));
        // if ( this.data.render instanceof Function ) this.data.render(this.options.jQuery ? html : html[0]);
    }

    /**
	 * Handle a left-mouse click on one of the dialog choice buttons
	 * @param {MouseEvent} event    The left-mouse click event
	 * @private
	 */
	_onClickButton(event) {
        const id = event.currentTarget.dataset.button;
        // console.log("___________ event _________________");
        // console.log(event);
        // console.log("___________ event.currentTarget _________________");
        // console.log(event.currentTarget);
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
            let current_actor = canvas.tokens.controlled[0].actor;
            setTimeout(() => {  PTUAutoFight().ChatWindow(current_actor); }, 100);
          }
          
        } catch(err) {
          ui.notifications.error(err);
          throw new Error(err);
        }
      }
}