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
            name: "Darth Vader",
            hP: 22,
            aP: 16,
        },
        {
            name: "Darth Sidious",
            hP: 24,
            aP: 18,
        }
    ],
    player: "",
    opponent: "",

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
            this.opponent = $("#"+choice);
            this.opponent.toggleClass("opponent character");
            $("#waiting").remove(this.opponent);
            $("#enemy").append(this.opponent);
        }
        // else, choose player
        else {
            this.player = $("#"+choice);
            this.player.toggleClass("player character");
            $("#waiting").remove(this.player);
            $("#player").append(this.player);
        }
    },
    win(){},
    lose(){},

}