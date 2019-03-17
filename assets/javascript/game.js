/* Characters as objects: (make a class, maybe?)
{
name:
hP:
aP:
Attack() {
    only called if this is the player.
    calls opponent.Ouch(this.aP)
    doubles this.aP
}
CAttack() {
    only called if this is not the player.
    calls opponent.Ouch(this.aP)
}
Ouch(hit) {
    decrement this.hP by hit
    if hp <= 0, call Die()
    else if this is not the player, call CAttack().
},
Die() {
    if this is the player, end the game with a loss.
    else, remove this opponent and go back to 'choose opponent' prompt.
},
}
*/

/* Game object */
var Game = {
    // variables:
    // characters array
    bathrobeWizards: [
        {
            name: "Luke",
            hP: 12,
            aP: 4,
        },
        {
            name: "Obi-Wan",
            hP: 16,
            aP: 8,
        },
        {
            name: "Darth_Vader",
            hP: 22,
            aP: 16,
        },
        {
            name: "Darth_Sidious",
            hP: 24,
            aP: 18,
        }
    ],
    player: {
        webClass: "player",
    },
    enemy: {
        webClass: "enemy",
    },

    // Methods:
    Init(){
        for (i=0; i < this.bathrobeWizards.length; i++){
            var dudeDiv = $("<div>",{
                "id": this.bathrobeWizards[i].name,
                "hit-points": this.bathrobeWizards[i].hP,
                "attack-power": this.bathrobeWizards[i].aP,
                "class": "character",
                "html": this.bathrobeWizards[i].name + "<br>Health " + this.bathrobeWizards[i].hP
            });
            $("#waiting").append(dudeDiv);
        }
    },
    Choose(choice){
        // if player has been chosen, choose opponent
        if (this.player.name) {
            this.Muster(this.enemy, choice);
            $(".character").css("display", "none");
        }
        // else, choose player
        else {
            this.Muster(this.player, choice);
            this.player.baseAP = this.player.aP;
        }
    },
    // Muster() sets the new .class for the choice, turns off the event listener, and moves it to its new div
    Muster(designate, choice){
        $.extend(designate, this.bathrobeWizards.find(dude => dude.name === choice));
        var kludge = $("#"+designate.name);
        kludge.toggleClass(designate.webClass+" character");
        kludge.off("click");
        $("#"+designate.webClass).append(kludge);
        designate.webDiv = kludge;
        // return kludge;
    },
    Attack(attacker, defender){
        this.Ouch(defender, attacker.aP);
        if (attacker === this.player){
            this.player.aP += this.player.baseAP;
        }
    },
    // Counter(){
    //     this.Ouch(this.player, this.enemy.aP)
    // },
    Ouch(combatant, hit){
        combatant.hP -= hit;
        if (combatant.hP <= 0){
            Die(combatant);
        }
        else if (combatant === this.enemy) {
            Attack(this.enemy, this.player);
        }
    },
    Die(deadGuy){

        if (deadGuy === this.player) {  // you died.  Sad.
            this.Lose();
        }
        else if ($(".character").length){   // find me someone else to fight!
            $(".character").css("display", "initial");
        }
        else {  // no more enemies to kill. You win!
            this.Win();
        }
    },
    Win(){},
    Lose(){},
}