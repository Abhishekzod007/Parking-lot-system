// Writing classes for the parking lot system

class Vehicle{
    constructor(number, type){
        this.number = number
        this.type = type
    }
}

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

class ParkingFloor{
    constructor(FloorNumber, slots){
      this.FloorNumber = FloorNumber
      this.slots = slots

    }
    getAvailableSlot(vehicleType) {
        return this.slots.find(slot=> slot.type === vehicleType && slot.isAvalable)
    }
}

class Ticket{
    constructor(EntryTime,SlotNumber, vehicle, ticketId){
        this.EntryTime = EntryTime
        this.SlotNumber = SlotNumber
        this.exitTime = null
        this.vehicle = vehicle
        this.ticketId = ticketId
        this.amount = 0
    }
    
    // here will write logic how price calculates
    closeTicket(exitTime,amount){
         this.exitTime = exitTime
         this.amount = amount
    }
}

class RateCard extends Vehicle{
    constructor(){
    this.dayRates = {
    'Monday':10,
    'Tuesday':10,
    'Wednesday':15,
    'Thursday':15,
    'Friday':20,
    'Saturday':20,
    'Sunday':25
    }
    this.vehicleRates = {
        BIKE: 5,
        CAR: 10,
        TRUCK: 20
    }
    }
    calculateRate(vehicle,day,hours){
        const rate = this.dayRates[day] + this.vehicleRates[vehicle]
        return rate*hours
    }
}

class ParkingLot {
    constructor(){

        const floor1 = new ParkingFloor(1,
            [
            new ParkingSlot(1,'CAR'),
            new ParkingSlot(2,'BIKE')])
        const floor2 = new ParkingFloor(2,
            [
            new ParkingSlot(3,'TRUCK'),
            new ParkingSlot(4,'CAR')])    
        this.floors = [floor1, floor2]
        this.tickets = []
        this.rateCard = new RateCard()
    }
    findAvailableSlot(vehicleType){
        for(const floor of this.floors){
            const slot = floor.getAvailableSlot(vehicleType)
            if(slot){
                return { slot, FloorNumber: floor.FloorNumber}
            }
        }
        return null
    }
    parkVehicle(vehicle){
        const result = this.findAvailableSlot(vehicle.type)
        if(!result){
            console.log('No available slot for this vehicle type');
            return null
        }
        const {slot , FloorNumber} = result
        slot.Occupy()
        const ticket = new Ticket(
            new Date(),
            slot,
            vehicle,
            this.tickets.length +1
            
        )
        this.tickets.push(ticket)
        console.log(`Vehicle ${vehicle.number} parked at Floor ${FloorNumber}, Slot  ${slot.id}`);
        return ticket
    }

    exitVehicle(ticketId){
       const ticket = this.tickets.find(t => t.ticketId === ticketId)
       if(!ticket) return console.log('Invalid ticket');

       const exitTime = new Date();
       const hours = Math.ceil((exitTime-ticket.EntryTime)/(1000*60*60))
       const day = exitTime.toLocaleDateString('en-US', {weekday:'long'})
       const amount = this.rateCard.calculateRate(ticket.vehicle.type, day, hours)

       ticket.closeTicket(exitTime,amount)

       ticket.slot.free()

       console.log(`Vehicle ${ticket.vehicle.number} exited. Total charge: ${amount}`);
       
       return {
        amount,
        vehicleNumber: ticket.vehicle.number,
        exitTime
       }
    }
}