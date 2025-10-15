class ParkingSlot{
    constructor(id, type){
        this.type = type
        this.isAvailable = true
        this.id = id
    }
    Occupy(){
        this.isAvailable = false
    }
    Free(){
        this.isAvailable = true
    }
}

module.exports = ParkingSlot