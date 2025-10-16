class ParkingFloor{
    constructor(FloorNumber, slots){
      this.FloorNumber = FloorNumber
      this.slots = slots

    }
    getAvailableSlot(vehicleType) {
        return this.slots.find(slot=> slot.type.toUpperCase() === vehicleType.toUpperCase() && slot.isAvailable)
    }
}

module.exports = ParkingFloor