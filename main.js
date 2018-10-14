var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder'); 
var roleFred = require('role.fred'); 
var autoSpawn = require('autospawn');
var cleanup = require('cleanup');

/**
 * To Do -
 * - Harvesters Fill storage boxes and other creep types feed from them
 * - Harvesters go to source with free tiles rather than source being hard coded
 * - Build lots-o roads
 * - Create refiller role that refills spawn instead of harvesters
 **/
 
module.exports.loop = function () {
    Memory.lineOpacity = 0.5;
    
    console.log('------------------------------------------------------');
    //Clear non existing creeps from memory
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory: ', name);
        }
    }
    
    var maxEnergy = Game.spawns['Spawn1'].room.energyCapacityAvailable;
    var size = 'small';
    if(maxEnergy >= 550){
        //size = 'large';
    }
    if(maxEnergy >= 450){
        size = 'medium';
    }
    
    var harvMax = 6;
    var upgMax = 2;
    var buildMax = 3;
    
    if(maxEnergy == 550){
        harvMax = 6;
        upgMax = 5;
        buildMax = 1;
    }
    
    //Auto spawn creeps
    if(!Memory.cleanup){
        autoSpawn.run(harvMax, 'harvester', size);
        autoSpawn.run(upgMax, 'upgrader', size);
        autoSpawn.run(buildMax, 'builder', size);
        autoSpawn.run(1, 'fred', 'speedyBoi');
    }
    
    //Remove excess creeps with "Memory.cleanup = true;" in console
    if(Memory.cleanup){
        console.log('IN CLEANUP MODE');
        cleanup.run(4, 'harvester', 'small');
        cleanup.run(2, 'upgrader', 'small');
        cleanup.run(3, 'builder', 'small');
        Memory.cleanup = false;
    }
    
    //Handle creep movement
    var harvCount = 0;
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            harvCount++;
            roleHarvester.run(creep, harvMax, harvCount);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'fred') {
            roleFred.run(creep);
        }
    }
}