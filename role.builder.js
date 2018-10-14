var roleHarvester = require('role.harvester');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) { 

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('building');
	    }
	    
	    if(creep.memory.building || creep.memory.actingAsHarv) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                creep.memory.actingAsHarv = false;
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#9e0000', opacity: Memory.lineOpacity}});
                }
            }else{
                var closestDamagedStructure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: function(object){ return object.hits < object.hitsMax;}
                });
                
                if (closestDamagedStructure){
                    creep.memory.actingAsHarv = false;
                    if(creep.repair(closestDamagedStructure) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(closestDamagedStructure, {visualizePathStyle: {stroke: '#9e0000', opacity: Memory.lineOpacity}});
                    }
                }else{
                    //If nothing else to do then act as a harvester
                    roleHarvester.run(creep, 1, 1);
                    creep.memory.actingAsHarv = true;
                }
            }
	    }else if(!creep.memory.actingAsHarv){
	        var sources = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType == STRUCTURE_CONTAINER &&
                            _.sum(structure.store) >= creep.carryCapacity;
                    }
                });
            if(sources.length > 0){
                if(creep.withdraw(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#9e0000', opacity: Memory.lineOpacity}});
                }
            }else if(creep.harvest(Game.getObjectById('5bbcac6f9099fc012e635719')) == ERR_NOT_IN_RANGE){
                creep.moveTo(Game.flags['Source2'].pos, {visualizePathStyle: {stroke: '#9e0000', opacity: Memory.lineOpacity}});
            }
	    }
	}
};

module.exports = roleBuilder;