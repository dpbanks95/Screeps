var roleUpgrader = {
 
    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('harvesting');
	    }
	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	        creep.say('upgrading');
	    }

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#000a9e', opacity: Memory.lineOpacity}});
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
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#000a9e', opacity: Memory.lineOpacity}});
                }
            }else if(creep.harvest(Game.getObjectById('5bbcac6f9099fc012e635719')) == ERR_NOT_IN_RANGE){
                creep.moveTo(Game.flags['Source2'].pos, {visualizePathStyle: {stroke: '#000a9e', opacity: Memory.lineOpacity}});
            }
        }
	}
};

module.exports = roleUpgrader;