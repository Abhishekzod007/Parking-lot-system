const express = require("express");
const app = express();
const port = 3000;

// middleware to parse JSON body
app.use(express.json());

// import your classes
const Vehicle = require("./models/Vehicle");
const ParkingLot = require("./models/ParkingLot");

const parkingLot = new ParkingLot();

// park vehicle endpoint
app.post("/park", (req, res) => {
  const { number, type } = req.body;
  if (!number || !type)
    return res.status(400).json({ error: "Vehicle number and type required" });

  const vehicle = new Vehicle(number, type);
  const ticket = parkingLot.parkVehicle(vehicle);

  if (!ticket)
    return res
      .status(400)
      .json({ error: "No available slot for this vehicle type" });

  res.json({
    message: "Vehicle parked successfully",
    ticketId: ticket.ticketId,
    slot: ticket.SlotNumber.id,
    floor: ticket.floor,
    entryTime: ticket.EntryTime
  });
});

// exit vehicle endpoint
app.post("/exit", (req, res) => {
  const { ticketId } = req.body;
  if (!ticketId)
    return res.status(400).json({ error: "Ticket ID is required" });

  const result = parkingLot.exitVehicle(ticketId);
  if (result.error)
    return res.status(400).json({ error: result.error });

  res.json({
    message: "Vehicle exited successfully",
    ...result
  });
});

// check available slots
app.get("/slots", (req, res) => {
  const available = [];
  for (const floor of parkingLot.floors) {
    floor.slots.forEach(slot => {
      if (slot.isAvailable) {
        available.push({
          floor: floor.FloorNumber,
          slotId: slot.SlotNumber,
          type: slot.type
        });
      }
    });
  }
  res.json(available);
});

// start server
app.listen(port, () => {
  console.log(` Server running at http://localhost:${port}`);
});
