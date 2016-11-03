interface IProduct {
    name: string;
    price: number;
}

class Fruit implements IProduct {
    constructor(public name: string, public price: number, public color: string) { }
}

class Telephone implements IProduct {
    constructor(public name: string, public price: number, public loudness: number) { }
}

let fruit1 = new Fruit("orange", .50, "orange");
let fruit2 = new Fruit("apple", .75, "red");
let fruit3 = new Fruit("lime", 1, "green");

let phone1 = new Telephone("iPhone", 699, 7);
let phone2 = new Telephone("android", 649, 8);

let inventory = [];
inventory[0] = fruit1;
inventory[1] = fruit2;
inventory[2] = fruit3;
inventory[3] = phone1;
inventory[4] = phone2;

function showInventory(product: IProduct) {
    console.log("Product: " + product.name + " Price: " + product.price);
}

for (let i=0; i < inventory.length; i++){
  showInventory(inventory[i]);
}
