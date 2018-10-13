var roleHarvester = {

    /** @param {Creep} creep **/ 
    run: function(creep) {
	    if(creep.carry.energy < creep.carryCapacity) {
            if(creep.harvest(Game.getObjectById('5bbcac6f9099fc012e635718')) == ERR_NOT_IN_RANGE){
                creep.moveTo(Game.flags['Source1'].pos, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        } 
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER ||
                        structure.structureType == STRUCTURE_CONTAINER) &&
                            structure.energy < structure.energyCapacity;
                    }
            });
            
            
            
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }else{
                creep.moveTo(Game.spawns['Spawn1'], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
	}
};

module.exports = roleHarvester;