new Vue({
    el: "#app",
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        isGameRunning: false,
        turns: []
    },
    methods: {
        startGame: function () {
            this.isGameRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function () {
            var damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: "Palyer hits Monster for " + damage
            });
            if (this.checkWin()) {
                return;
            }

            this.monsterAttack();
        },
        specialAttack: function () {
            var damage = this.calculateDamage(10, 20);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: "Palyer hits Monster hard for " + damage
            });
            if (this.checkWin()) {
                return;
            }

            this.monsterAttack();
        },
        monsterAttack: function () {
            var damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                text: "Monster hits Player for " + damage
            });
            this.checkWin();
        },
        heal: function () {
            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }
            this.turns.unshift({
                isPlayer: true,
                text: "Palyer heals for 10"
            });
            this.monsterAttack();
        },
        giveUp: function () {
            this.isGameRunning = false;
        },

        calculateDamage: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function () {
            if (this.monsterHealth <= 0) {
                if (confirm("You Won! New game?")) {
                    this.startGame();
                } else {
                    this.isGameRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm("You lost! New Game?")) {
                    this.startGame();
                } else {
                    this.isGameRunning = false;
                }
                return true;
            }
            return false;
        }
    }
});