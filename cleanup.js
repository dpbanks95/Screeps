var cleanup = {
    /**
    * Clean up creeps so that there are only maxCreeps left
    * 
    * @param {int} maxCreeps Max number of creeps there should be
    * @param {String} type Type of creep (harvester, upgrader or builder)
    * @param {String} size Size of creep (small, medium or large)
    */
    run: function(maxCreeps, type, size) { 
        var count = _.filter(Game.creeps, (creep) => creep.memory.role == type && creep.memory.scale == size).length;
        
        var currentCreeps = [];
        for(var name in Game.creeps){
            if(Game.creeps[name].memory.role == type && Game.creeps[name].memory.scale == size){
                currentCreeps.push(Game.creeps[name]);
            }
        }
        
        if(currentCreeps.length > maxCreeps){
            while(currentCreeps.length > maxCreeps){
                var creepsToKill = currentCreeps.length-maxCreeps;
                console.log('Killing ' + creepsToKill + ' ' + size + ' ' + type + ' Creeps');
                Game.creeps[currentCreeps[0].name].suicide();
                currentCreeps.pop();
            }
        }else{
            console.log('No ' + size + ' ' + type + ' Creeps to kill');
        }
	}
};

module.exports = cleanup;