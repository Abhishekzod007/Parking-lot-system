class RateCard {
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
module.exports = RateCard