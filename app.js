var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Vehicle = (function () {
    function Vehicle(year, make, model) {
        this.year = year;
        this.make = make;
        this.model = model;
    }
    Vehicle.prototype.report = function () {
        console.log("Year: " + this.year);
        console.log("Make: " + this.make);
        console.log("Model: " + this.model);
    };
    return Vehicle;
}());
var Car = (function (_super) {
    __extends(Car, _super);
    function Car(year, make, model) {
        return _super.call(this, year, make, model) || this;
    }
    return Car;
}(Vehicle));
var Truck = (function (_super) {
    __extends(Truck, _super);
    function Truck(year, make, model, towingCapacity) {
        var _this = _super.call(this, year, make, model) || this;
        _this.towingCapacity = towingCapacity;
        return _this;
    }
    Truck.prototype.report = function () {
        _super.prototype.report.call(this);
        console.log("Towing Capacity: " + this.towingCapacity);
    };
    return Truck;
}(Vehicle));
var Motorcycle = (function (_super) {
    __extends(Motorcycle, _super);
    function Motorcycle(year, make, model, horsePower) {
        var _this = _super.call(this, year, make, model) || this;
        _this.horsePower = horsePower;
        return _this;
    }
    Motorcycle.prototype.report = function () {
        _super.prototype.report.call(this);
        console.log("Horsepower: " + this.horsePower);
    };
    return Motorcycle;
}(Vehicle));
var newCar = new Car(2015, "Toyota", "Camry");
var newTruck = new Truck(2016, "Toyota", "Tundra", 400);
var newMotorcycle = new Motorcycle(2014, "Honda", "CBR", 250);
newCar.report();
newTruck.report();
newMotorcycle.report();
