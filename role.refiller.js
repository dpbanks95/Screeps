var roleHarvester = require('role.harvester');

var roleRefiller = {
 
    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.refilling && creep.carry.energy == 0) {
            creep.memory.refilling = false;
            creep.say('harvesting');
	    }
	    if(!creep.memory.refilling && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.refilling = true;
	        creep.say('refilling');
	    }

	    if(creep.memory.refilling) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) &&
                            structure.energy < structure.energyCapacity;
                    }
                });
            //Fill containers if no other important structures to fill
            if(targets.length == 0){
                targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType == STRUCTURE_CONTAINER &&
                            _.sum(structure.store) < structure.storeCapacity;
                    }
                });
            }
            
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#e5dd00', opacity: 1}});
                }else{
                    //If nothing else to do then act as a harvester
                    //roleHarvester.run(creep, 1, 1);
                    //creep.memory.actingAsHarv = true;
                }
            }
        }
        else {
            var sources = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType == STRUCTURE_CONTAINER &&
                            _.sum(structure.store) >= creep.carryCapacity;
                    }
                });
            if(sources.length > 0){
                if(creep.withdraw(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#e5dd00', opacity: Memory.lineOpacity}});
                }
            }else if(creep.harvest(Game.getObjectById('5bbcac6f9099fc012e635719')) == ERR_NOT_IN_RANGE){
                creep.moveTo(Game.flags['Source2'].pos, {visualizePathStyle: {stroke: '#e5dd00', opacity: Memory.lineOpacity}});
            }
        }
	}
};

module.exports = roleRefiller;