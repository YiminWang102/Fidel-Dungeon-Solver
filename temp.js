const imports = require('./index.js');

const Dungeon = imports.Dungeon;
const DungeonSolver = imports.DungeonSolver;

const dungeon3 = new Dungeon(6,6);

let count = 0;
dungeon3.forEachPath( () => count++);

//console.log(dungeon3.cells);

console.log(count);
const paths = [];
