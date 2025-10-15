class ParkingSlot{
    constructor(type, id){
        this.type = type
        this.isAvalable = true
        this.id = id
    }
    Occupy(){
        this.isAvalable = false
    }
    Free(){
        this.isAvalable = true
    }
}

module.exports = ParkingSlot