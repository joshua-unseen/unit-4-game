/*
    Character backgrounds start white.
    Player background stays white,
    Waiting enemies' backgrounds turn red.
    Chosen enemy background turns black.
    Borders are green

    If a div is empty, hide it.
    Ideally, auto-move the last enemy from #waiting to #enemy
*/

/* Game object */
var Game = {
    // variables:
    bathrobeWizards: [
        {
            id: "skywalker",
            name: "Luke Skywalker",
            hP: 130,
            aP: 10,
        },
        {
            id: "kenobi",
            name: "Obi-Wan Kenobi",
            hP: 120,
            aP: 12,
        },
        {
            id: "vader",
            name: "Darth Vader",
            hP: 180,
            aP: 18,
        },
        {
            id: "sidious",
            name: "Darth Sidious",
            hP: 140,
            aP: 25,
        }
    ],

    player: {
        webClass: "player",
    },

    enemy: {
        webClass: "enemy",
    },
    
    // Methods:
    Init() {
        for (i = 0; i < this.bathrobeWizards.length; i++) {
            // I may try to store everything in the jQuery object, rather than making it a part of a game object.
            // Yeah, that didn't happen...
            var dudeDiv = $("<div>", {
                "id": this.bathrobeWizards[i].id,
                "class": "character",
                "html": "<p class=\"name\">"
                    + this.bathrobeWizards[i].name + "</p>"
                    + "<img src = \"assets/images/" + this.bathrobeWizards[i].id
                    + ".jpg\" height = 120 width = 160>"
                    + "<p  class=\"hit-points\">"
                    + this.bathrobeWizards[i].hP + "</p>",
            });
            $("#waiting").append(dudeDiv);
        }
    },

    Choose(choice) {
        if (this.player.name && this.enemy.name) {
            // don't do anything if both exist
            return;
        }
        // if player has been chosen, choose opponent
        else if (this.player.name) {
            this.Muster(this.enemy, choice);
            this.AnimDiv("#enemy");
            this.AnimDiv("#fight");
            $(".enemy").css("background", "black");
            $("#wait-title").text("Enemies waiting");
            $("#status").empty();
            // $("#waiting").css("display", "none");
        }
        // else, choose player
        else {
            this.Muster(this.player, choice);
            this.AnimDiv("#player");
            this.player.baseAP = this.player.aP;
            $(".character").toggleClass("character inWait");
            $("#wait-title").text("Choose an Enemy");
        }
    },

    // Muster() sets the new .class for the choice, turns off the event listener, and moves it to its new div
    Muster(designate, choice) {
        $.extend(designate, this.bathrobeWizards.find(dude => dude.id === choice));
        var kludge = $("#" + designate.id);
        var kludgeClass = $(kludge).attr("class");
        kludge.toggleClass(designate.webClass + " "+kludgeClass);
        kludge.off("click");
        $("#" + designate.webClass).append(kludge); // Yes, the div they go into has the same id as their class.
        designate.webDiv = kludge;
    },

    Attack(attacker, defender) {
        if (defender.name) {
            this.Ouch(defender, attacker.aP);
            if (attacker === this.player) {
                this.player.aP += this.player.baseAP;
            }
        }
    },

    Ouch(combatant, hit) {
        combatant.hP -= hit;
        $(combatant.webDiv).find(".hit-points").text(combatant.hP);
        if (combatant.hP <= 0) {
            this.Die(combatant);
        }
        else if (combatant === this.enemy) {
            $("#status").html("<p>You hit " 
                + combatant.name + " for " 
                + hit + "</p>");
            this.Attack(this.enemy, this.player);
        }
        else {
            $("#status").append("<p>" + this.enemy.name 
                + " hit you for " + hit + "</p>");
        }
    },

    Die(deadGuy) {

        if (deadGuy === this.player) {  // you died.  Sad.
            this.Lose();
            this.AnimDiv("#fight");
        }
        else {
            this.AnimDiv("#enemy");
            this.AnimDiv("#fight");
            $("#status").html("<p>You have defeated " + deadGuy.name 
            + "</p><p>Select another opponent")
            this.enemy = {
                webClass: "enemy",
            };
            $("#enemy").empty();
            $("#wait-title").text("Choose an Enemy");
            var dudesWaiting = $("#waiting").children(".inWait");
            if (dudesWaiting.length === 1) { //  Only one dude left.  Fight him!
                $("#status").empty();
                this.AnimDiv("#waiting");
                this.Choose(dudesWaiting.attr("id"));
            }
            else if (dudesWaiting.length === 0) {   // no more enemies to kill. You win!
                this.Win();
            }
        }
    },
    
    Win() {
        this.ResetIt();
        $("#status").html("<p>You have triumphed over your foes</p>");
    },

    Lose() {
        this.ResetIt();
        $("#status").html("<p>Your foes have defeated you</p>");
    },

    ResetIt() {
        var theButton = $("button");
        theButton.off("click");
        theButton.click(function () { location.reload() });
        theButton.text("Reset");
        this.AnimDiv("#fight");
    },

    AnimDiv(theDiv){
        $(theDiv).animate({height: "toggle"});
    },
}