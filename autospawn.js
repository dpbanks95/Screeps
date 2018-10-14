var autoSpawn = {
    /**
    * Auto spawn creeps of given type and size
    * 
    * @param {int} maxCreeps Max number to spawn
    * @param {String} type Type of creep (harvester, upgrader or builder)
    * @param {String} size Size of creep (small, medium or large)
    */
    run: function(maxSpawn, type, size) { 
        var count = _.filter(Game.creeps, (creep) => creep.memory.role == type).length;
        console.log(size + ' ' + type + 's: ' + count + '/' + maxSpawn);
        
        var newName = type + Game.time;
        
        if(count < maxSpawn){
        
            var maxEnergy = Game.spawns['Spawn1'].room.energyAvailable;
        
            switch (size){
               case "small":
                    if(maxEnergy < 300){
                        console.log('Need 300 energy to spawn: ' + size + ' ' + type);
                    }else{
                        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], newName, {memory:{role:type,scale:size}});
                    }
                   break;
                   
               case "medium":
                   if(maxEnergy < 450){
                        console.log('Need 450 energy to spawn: ' + size + ' ' + type);
                    }else{
                        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,MOVE,MOVE], newName, {memory:{role:type,scale:size}});
                    }
                   break;
                   
               case "large":
                   if(maxEnergy < 550){
                        console.log('Need 550 energy to spawn: ' + size + ' ' + type);
                    }else{
                        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], newName, {memory:{role:type,scale:size}});
                    }
                   break;
                case "speedyBoi":
                        Game.spawns['Spawn1'].spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 'fred', {memory:{role:type,scale:size}});
                        if(Game.creeps['fred']){
                            Game.creeps['fred'].memory.west = false;
                            Game.creeps['fred'].memory.north = false;
                            Game.creeps['fred'].memory.east = false;
                        }
                   break;
            
               default: 
                   console.log('Invalid size: ' + size);
            }
        }
        
        if(Game.spawns['Spawn1'].spawning) { 
            var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
            Game.spawns['Spawn1'].room.visual.text(
                'Spawning: ' + spawningCreep.memory.scale + ' ' + spawningCreep.memory.role,
                Game.spawns['Spawn1'].pos.x + 1, 
                Game.spawns['Spawn1'].pos.y, 
                {align: 'left', opacity: 0.8});
        }
        
	}
};

module.exports = autoSpawn;