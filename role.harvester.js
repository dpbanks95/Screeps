var roleHarvester = {

    /**
    * harvCount >= harvMax/2 used for selecting source
    * 
    * @param {Creep} creep 
    * @param {number} harvMax - Max number of Harvester creeps
    * @param {number} harvCount - Current harvester creep count
    **/ 
    run: function(creep, harvMax, harvCount) {
        if(creep.memory.harvesting && creep.carry.energy == 0) {
            creep.memory.harvesting = false;
            creep.say('harvesting');
	    }
	    if(!creep.memory.harvesting && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.harvesting = true;
	        creep.say('depositing');
	    }
	    if(!creep.memory.harvesting) {
	        if(harvCount >= harvMax/2){
	            if(creep.harvest(Game.getObjectById('5bbcac6f9099fc012e635718')) == ERR_NOT_IN_RANGE){
                    creep.moveTo(Game.flags['Source1'].pos, {visualizePathStyle: {stroke: '#029e00', opacity: Memory.lineOpacity}});
                }
	        }else{
	            if(creep.harvest(Game.getObjectById('5bbcac6f9099fc012e635719')) == ERR_NOT_IN_RANGE){
                    creep.moveTo(Game.flags['Source2'].pos, {visualizePathStyle: {stroke: '#029e00', opacity: Memory.lineOpacity}});
                }
	        }
            
        } 
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_CONTAINER &&
                        _.sum(structure.store) < structure.storeCapacity;
                }
            });
            
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#029e00', opacity: 1}});
                }
            }
        }
	}
};

module.exports = roleHarvester;