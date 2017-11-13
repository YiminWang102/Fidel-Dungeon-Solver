class Dungeon {
  constructor(length = 7, width = 7, startX = 0, startY = 0, endX = width-1, endY = length-1) {
    this.length = length;
    this.width = width;
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;

    this.cells = [];
    for (let i = 0; i < this.length; i++) {
      this.cells.push([]);
      for (let j = 0; j < this.width; j++) {
        this.cells[i][j] = 'temp';
      }
    }

    this.setCell(startX, startY, 'start');
    this.setCell(endX, endY, 'end');

  }

  getCopy() {
    const copy = [];
    for (let i = 0; i < this.length; i++) {
      copy.push([]);
      for (let j = 0; j < this.width; j++) {
        copy[i][j] = this.cells[i][j];
      }
    }
    return copy;
  }

  setCell(x, y, thing) {
    //make sure x and y are withing bounds
    this.cells[y][x] = thing;
  }

  populate(dungeon) {
    //make sure dungeon is same dim;
    for (let i = 0; i < dungeon.length; i++) {
      for (let j = 0; j < dungeon[i].length; j++) {
        this.dungeon[i][j] = dungeon[i][j];
      }
    }
  }

  forEachPath(iteratorFunc) {
    const self = this;
    const visited = {};

    helper(this.startX, this.startY, this.endX, this.endY, []);

    function helper(currX, currY, endX, endY, path) {
      if (currX === endX && currY === endY) iteratorFunc(path.slice(0));
      else {
        setVisited(currX, currY);
        //visit all valid neighbors
        //down
        if (isValid(currX, currY + 1)) {
          path.push('down');
          helper(currX, currY + 1, endX, endY, path);
          path.pop();
        }
        //up
        if (isValid(currX, currY - 1)) {
          path.push('up');
          helper(currX, currY - 1, endX, endY, path);
          path.pop();
        }
        //right
        if (isValid(currX + 1, currY)) {
          path.push('right');
          helper(currX + 1, currY, endX, endY, path);
          path.pop();
        }
        //left
        if (isValid(currX - 1, currY)) {
          path.push('left');
          helper(currX - 1, currY, endX, endY, path);
          path.pop();
        }
        removeVisited(currX, currY);

      }
    }

    function setVisited(x, y) {
      if (!visited[y]) visited[y] = {};
      visited[y][x] = true;
    }

    function removeVisited(x, y) {
      if (!visited[y]) visited[y] = {};
      visited[y][x] = false;
    }

    function isValid(x, y) {
      if (visited[y] && visited[y][x]) return false;
      if (x < 0 || x >= self.width || y < 0 || y >= self.length) return false;
      else return true;
    }



  }
}

class Fidel {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.health = 2;
    this.maxHealth = 2;
    this.poison = 0;
    this.coins = 0;
    this.exp = 0;
    this.killChain = 0;
    this.dead = false;
  }

  getPoisoned() {
    if (this.poison === this.maxHealth) this.dead = true;
    else {
      this.poison++;
      if (this.maxHealth - this.poison < this.health) this.health--;
    }
  }

  isDead() {
    return this.dead;
  }

  healthPack() {
    this.health = this.maxHealth - this.poison;
  }

  coin() {
    this.coins++;
  }

  heal() {
    if (this.health < this.maxHealth - this.poison) this.health++;
  }

  damage(num) {
    this.health -= num;
    if (this.health < 0) this.dead = true;
  }

  interact(thing) {
    switch(thing) {
      case 'coin':
        this.interact_coin();
        break;
      case 'spider':
        this.interact_spider();
        break;
    }
  }

  interact_coin() {
    this.coin += 1;
    this.killChain = 0;
  }

  interact_nothing() {
    this.killChain = 0;
  }

  interact_spider() {
    this.damage(1);
    this.killChain += 1;
    this.exp += this.killChain >= 3 ? 3 : 1;
  }
}

module.exports = {
  Dungeon
};
