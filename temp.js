const imports = require('./index.js');

const Dungeon = imports.Dungeon;
const DungeonSolver = imports.DungeonSolver;

const dungeon3 = new Dungeon(3,3);

console.log(dungeon3.cells);
