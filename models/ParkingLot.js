

const Vehicle = require("./Vehicle");
const ParkingSlot = require("./ParkingSlot");
const ParkingFloor = require("./ParkingFloor");
const Ticket = require("./Ticket");
const RateCard = require("./RateCard");

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
        ticket.floor = FloorNumber
        this.tickets.push(ticket)
        console.log(`Vehicle ${vehicle.number} parked at Floor ${FloorNumber}, Slot  ${slot.id}`);
        return ticket
    }

    exitVehicle(ticketId){
       const ticket = this.tickets.find(t => t.ticketId == ticketId)
       if(!ticket) return { error: "Invalid Ticlet ID"};

       const exitTime = new Date();
       const hours = Math.ceil((exitTime-ticket.EntryTime)/(1000*60*60))
       const day = exitTime.toLocaleDateString('en-US', {weekday:'long'})
       const amount = this.rateCard.calculateRate(ticket.vehicle.type, day, hours)

       ticket.closeTicket(exitTime,amount)

       ticket.SlotNumber.Free()

       console.log(`Vehicle ${ticket.vehicle.number} exited. Total charge: ${amount}`);
       
       return {
        amount,
        vehicleNumber: ticket.vehicle.number,
        exitTime
       }
    }
}
module.exports = ParkingLot