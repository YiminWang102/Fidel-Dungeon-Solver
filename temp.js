const imports = require('./index.js');

const Dungeon = imports.Dungeon;
const DungeonSolver = imports.DungeonSolver;

const dungeon = new Dungeon();
//
// console.log(dungeon.cells);
//
// dungeon.setCell(5,3, 'hello');
//
// console.log(dungeon.cells);

const dungeon3 = new Dungeon(3,3);

console.log(dungeon3.cells);
