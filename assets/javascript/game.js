/*
    Character backgrounds start white.
    Player background stays white,
    Waiting enemies' backgrounds turn red.
    Chosen enemy background turns black.
    Borders are green

*/

/* Game object */
var Game = {
    // variables:
    bathrobeWizards: [
        {
            id: "skywalker",
            name: "Luke Skywalker",
            hP: 100,
            aP: 8,
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
            hP: 200,
            aP: 20,
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
            var dudeDiv = $("<div>", {
                "id": this.bathrobeWizards[i].id,
                // "hit-points": this.bathrobeWizards[i].hP,
                // "attack-power": this.bathrobeWizards[i].aP,
                "class": "character",
                "html": "<p class=\"name\">"
                    + this.bathrobeWizards[i].name + "</p>"
                    + "<p  class=\"hit-points\">"
                    + this.bathrobeWizards[i].hP + "</p>"
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
            $(".enemy").css("background", "black");
            $("#wait-title").text("Enemies waiting");
            // $("#waiting").css("display", "none");
        }
        // else, choose player
        else {
            this.Muster(this.player, choice);
            this.player.baseAP = this.player.aP;
            $(".character").css("background", "red");
            $("#wait-title").text("Choose an Enemy");
        }
    },

    // Muster() sets the new .class for the choice, turns off the event listener, and moves it to its new div
    Muster(designate, choice) {
        $.extend(designate, this.bathrobeWizards.find(dude => dude.id === choice));
        var kludge = $("#" + designate.id);
        kludge.toggleClass(designate.webClass + " character");
        kludge.off("click");
        $("#" + designate.webClass).append(kludge);
        designate.webDiv = kludge;
        // return kludge;
    },

    Attack(attacker, defender) {
        if (defender.name) {
            this.Ouch(defender, attacker.aP);
            if (attacker === this.player) {
                this.player.aP += this.player.baseAP;
            }
        }
    },

    // Counter(){
    //     this.Ouch(this.player, this.enemy.aP)
    // },

    Ouch(combatant, hit) {
        combatant.hP -= hit;
        $(combatant.webDiv).find(".hit-points").text(combatant.hP);
        if (combatant.hP <= 0) {
            this.Die(combatant);
        }
        else if (combatant === this.enemy) {
            $("#status").html("<p>You hit " + combatant.name + " for " + hit + "</p>");
            this.Attack(this.enemy, this.player);
        }
        else {
            $("#status").append("<p>" + this.enemy.name + " hit you for " + hit + "</p>");
        }
    },

    Die(deadGuy) {

        if (deadGuy === this.player) {  // you died.  Sad.
            this.Lose();
        }
        else {
            $("#status").html("<p>You have defeated " + deadGuy.name + "</p><p>Select another opponent")
            this.enemy = {
                webClass: "enemy",
            };
            $("#enemy").empty();
            $("#wait-title").text("Choose an Enemy");
            if ($(".character").length === 0) {   // no more enemies to kill. You win!
                this.Win();
            }
        }
    },

    Win() {
        $("#status").click(function () { location.reload() });
        $("#status").html("<p>You have triumphed over your foes</p><p>Click here to fight again</p>");
    },

    Lose() {
        $("#status").click(function () { location.reload() });
        $("#status").html("<p>Your foes have defeated you</p><p>Click here to fight again</p>");
    },
}