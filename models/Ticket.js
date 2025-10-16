class Ticket{
    constructor(EntryTime,SlotNumber, vehicle, ticketId, floor){
        this.EntryTime = EntryTime
        this.SlotNumber = SlotNumber
        this.exitTime = null
        this.vehicle = vehicle
        this.ticketId = ticketId
        this.floor = floor
        this.amount = 0
    }
    
    // here will write logic how price calculates
    closeTicket(exitTime,amount){
         this.exitTime = exitTime
         this.amount = amount
    }
}

module.exports = Ticket