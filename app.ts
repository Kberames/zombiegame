// abstract class
 abstract class Vehicle{
  public report(){
    console.log(`Year: ${this.year}`);
    console.log(`Make: ${this.make}`);
    console.log(`Model: ${this.model}`);
  }
  constructor(public year: number, public make: string, public model: string){}
}

//extension of abstact class
 class Car extends Vehicle{
  constructor(year: number, make: string, model: string){
    super(year, make, model);
  }
}

class Truck extends Vehicle{
  public report(){
    super.report();
    console.log(`Towing Capacity: ${this.towingCapacity}`);
  }
  constructor(year: number, make: string, model: string, public towingCapacity: number){
    super(year, make, model);
  }
}

class Motorcycle extends Vehicle{
  public report(){
    super.report();
    console.log(`Horsepower: ${this.horsePower}`);
  }
  constructor(year: number, make: string, model: string, public horsePower: number){
    super(year, make, model);
  }
}

let newCar = new Car(2015, "Toyota", "Camry");
let newTruck = new Truck(2016, "Toyota", "Tundra", 400);
let newMotorcycle = new Motorcycle(2014, "Honda", "CBR", 250);

newCar.report();
newTruck.report();
newMotorcycle.report();
