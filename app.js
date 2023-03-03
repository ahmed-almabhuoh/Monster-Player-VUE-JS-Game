function getRandomValue(max, min) {
  return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
  data: function () {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logs: [],
    };
  },
  computed: {
    monsterBarStyle: function () {
      if (this.monsterHealth <= 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyle: function () {
      if (this.playerHealth <= 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
    trackSpecialAttack: function () {
      return this.currentRound % 3 !== 0;
    },
  },
  watch: {
    playerHealth: function (value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "draw";
      } else if (this.playerHealth > 0 && this.monsterHealth <= 0) {
        this.winner = "win";
      }
    },
    monsterHealth: function (value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "draw";
      } else if (this.monsterHealth > 0 && this.playerHealth <= 0) {
        this.winner = "lost";
      }
    },
  },
  methods: {
    startGame: function () {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.winner = null;
      this.logs = [];
    },
    attackMonster: function () {
      this.currentRound++;
      const value = getRandomValue(12, 5);
      this.monsterHealth -= value;
      this.addLogs("player", "attack", value);
      this.attackPlayer();
    },
    attackPlayer: function () {
      const value = getRandomValue(15, 8);
      this.addLogs("player", "attack", value);
      this.playerHealth -= value;
    },
    specialAttack: function () {
      this.currentRound++;
      this.monsterHealth -= getRandomValue(10, 25);
      this.addLogs("player", "special attack", value);
      this.attackPlayer();
    },
    healPlayer: function () {
      this.currentRound++;
      const heal = getRandomValue(10, 25);
      this.addLogs("player", "heal", heal);
      if (this.playerHealth + heal > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += heal;
      }
      this.attackPlayer();
    },
    serrender: function () {
      this.winner = "lost";
    },
    addLogs: function (who, what, value) {
      this.logs.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
});

app.mount("#game");
