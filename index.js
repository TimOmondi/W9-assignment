// Define the Card class
class Card {
    constructor(rank, suit) {
      this.rank = rank;
      this.suit = suit;
    }
  }
  
  // Define the Deck class
  class Deck {
    constructor() {
      this.cards = [];
      const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
      const suits = ['♠', '♥', '♦', '♣'];
      for (let suit of suits) {
        for (let rank of ranks) {
          this.cards.push(new Card(rank, suit));
        }
      }
      this.shuffle();
    }
  
    shuffle() {
      for (let i = this.cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
      }
    }
  
    drawCard() {
      return this.cards.pop();
    }
  
    get length() {
      return this.cards.length;
    }
  }
  
  // Define the Player class
  class Player {
    constructor(name) {
      this.name = name;
      this.points = 0;
      this.hand = [];
    }
  
    playCard() {
      return this.hand.pop();
    }
  
    addPoints(points) {
      this.points += points;
    }
  
    get score() {
      return this.points;
    }
  
    get handSize() {
      return this.hand.length;
    }
  }
  
  // Define the Game class
  class Game {
    constructor() {
      this.deck = new Deck();
      this.player1 = new Player('Player 1');
      this.player2 = new Player('Player 2');
      this.dealCards();
    }
  
    dealCards() {
      while (this.deck.length > 0) {
        this.player1.hand.push(this.deck.drawCard());
        this.player2.hand.push(this.deck.drawCard());
      }
    }
  
    playTurn() {
      const card1 = this.player1.playCard();
      const card2 = this.player2.playCard();
      const rank1 = this.getRankValue(card1.rank);
      const rank2 = this.getRankValue(card2.rank);
      if (rank1 > rank2) {
        this.player1.addPoints(1);
      } else if (rank1 < rank2) {
        this.player2.addPoints(1);
      }
    }
  
    getRankValue(rank) {
      const values = {
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '7': 7,
        '8': 8,
        '9': 9,
        '10': 10,
        'J': 11,
        'Q': 12,
        'K': 13,
        'A': 14,
      };
      return values[rank];
    }
  
    playGame() {
      while (this.player1.handSize > 0 && this.player2.handSize > 0) {
        this.playTurn();
      }
      this.displayScore();
    }
  
    displayScore() {
      console.log(`${this.player1.name}: ${this.player1.score}`);
      console.log(`${this.player2.name}: ${this.player2.score}`);
    }
  }
  
  // Run the game
  const game = new Game();
  game.playGame();