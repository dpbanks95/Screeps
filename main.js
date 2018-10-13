var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder'); 
var autoSpawn = require('autospawn');
var cleanup = require('cleanup');

module.exports.loop = function () { 

    //Clear non existing creeps from memory
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory: ', name);
        }
    }
    
    //Auto spawn creeps
    if(!Memory.cleanup){
        autoSpawn.run(3, 'harvester', 'small');
        autoSpawn.run(3, 'upgrader', 'small');
        autoSpawn.run(3, 'builder', 'small');
    }
    
    //Remove excess creeps with "Memory.cleanup = true;" in console
    if(Memory.cleanup){
        console.log('IN CLEANUP MODE');
        cleanup.run(3, 'harvester', 'small');
        cleanup.run(3, 'upgrader', 'small');
        cleanup.run(3, 'builder', 'small');
        Memory.cleanup = false;
    }
    
    //Handle creep movement
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}