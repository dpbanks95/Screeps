var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRefiller = require('role.refiller');
var roleFred = require('role.fred'); 
var autoSpawn = require('autospawn');
var cleanup = require('cleanup');

/**
 * To Do -
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
    var availableEnergy = Game.spawns['Spawn1'].room.energyAvailable;
    console.log('Available Energy: ' + availableEnergy);
    
    var size = 'small';
    if(maxEnergy >= 500){
        //size = 'large';
    }
    if(maxEnergy >= 450){
       size = 'medium';
    }
    
    var harvMax = 4;
    var upgMax = 4;
    var buildMax = 1;
    var refilMax = 1;
    
    //Auto spawn creeps
    if(!Memory.cleanup){
        autoSpawn.run(buildMax, 'builder', size);
        autoSpawn.run(upgMax, 'upgrader', size);
        autoSpawn.run(harvMax, 'harvester', size);
        autoSpawn.run(refilMax, 'refiller', size);
        autoSpawn.run(1, 'fred', 'speedyBoi');
    }
    
    //Remove excess creeps with "Memory.cleanup = true;" in console
    if(Memory.cleanup){
        console.log('IN CLEANUP MODE');
        cleanup.run(harvMax, 'harvester', 'small');
        cleanup.run(upgMax, 'upgrader', 'small');
        cleanup.run(buildMax, 'builder', 'small');
        cleanup.run(refilMax, 'refiller', 'small');
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
        if(creep.memory.role == 'refiller') {
            roleRefiller.run(creep);
        }
        if(creep.memory.role == 'fred') {
            roleFred.run(creep);
        }
    }
}