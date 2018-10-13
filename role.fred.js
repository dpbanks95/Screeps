var roleFred = {
 
    /** @param {Creep} creep **/
    run: function(creep) {
        if(!creep.memory.west){
            creep.moveTo(32, 27);
            if(creep.pos.x == 32&& creep.pos.y == 27){
                creep.memory.west = true;
            }
        }else if(!creep.memory.north){
            creep.moveTo(34, 25);
            if(creep.pos.x == 34 && creep.pos.y == 25){
                creep.memory.north = true;
            }
        }else if(!creep.memory.east){
            creep.moveTo(36, 27);
            if(creep.pos.x == 36 && creep.pos.y == 27){
                creep.memory.east = true;
            }
        }else {
            creep.moveTo(34, 29);
            if(creep.pos.x == 34 && creep.pos.y == 29){
                creep.memory.west = false;
                creep.memory.north = false;
                creep.memory.east = false;
                Memory.fredLaps++;
                creep.say(Memory.fredLaps + " Laps 🏁", true);
            }
        }
    }
};

module.exports = roleFred;