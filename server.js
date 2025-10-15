const express  = require("express")
const app = express()
const port = 3000

app.use(express.json())

const Vehicle = require("./models/Vehicle")
const ParkingLot = require('./models/ParkingLot')

const lot = new ParkingLot()

app.post("/park",(req,res)=>{
    const {number , type} = req.body
    if(!number || !type){
        return res.status(400).json({ error: "Vehicle number and type required"})
    }

    const vehicle =  new Vehicle(number , type)
    const ticket = lot.parkVehicle(vehicle)

    if(!ticket){
        return res
        .status(400)
        .json({ error: "No available slot for this vehicle type"})
    }
    res.json({
        message: 'Vehicle parket=d successfully',
        ticketId: ticket.ticketId,
        slot: ticket.slot.id,
        entryTime: ticket.entryTime
    })
})

app.post("/exit", (req,res) => {
    const {ticketId} =req.body
    if(!ticketId){
        return res.status(400).json({ error: "Ticket ID is required"})
    }

    const result = lot.exitVehicle(ticketId)
    if(result.error){
        return res.status(400).json({ error: result.error})
    }

    res.json({
        message: "Vehicle exited successfully",
        ...result
    })
})

app.get("/slots", (req,res)=>{
    const available= []

    for(const floor of lot.floors){
        floor.slots.forEach(slot => {
            if(slot.isAvailable){
                available.push({
                    floor: floor.FloorNumber,
                    slotId: slot.id,
                    type: slot.type
                })
            }
        });
    }
    res.json(available)
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    
})