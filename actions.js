class GameAction {
  static collisionWithNextLevel(player, element) {
    element.disableBody(true, true);
    alert("Colision");
  }
}

export default GameAction;
