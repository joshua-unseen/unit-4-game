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
    player: "",
    enemy: "",

    // Methods:
    init(){
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
    choose(choice){
        // if player has been chosen, choose opponent
        if (this.player) {
        //     this.opponent.toggleClass("opponent character");
        //     this.opponent.off("click");
        //     $("#enemy").append(this.opponent);
        //     $(".character").css("display", "none");
            this.enemy = this.muster("enemy", choice);
            $(".character").css("display", "none");
        }
        // else, choose player
        else {
            this.player = this.muster("player", choice);
            // this.player = $("#"+choice);
            // this.player.toggleClass("player character");
            // $("#player").append(this.player);
        }
    },
    muster(designate, choice){
        var kludge = $("#"+choice);
        kludge.toggleClass(designate+" character");
        kludge.off("click");
        $("#"+designate).append(kludge);
        return kludge;
},
    win(){},
    lose(){},

}