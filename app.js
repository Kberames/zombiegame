var Fruit = (function () {
    function Fruit(name, price, color) {
        this.name = name;
        this.price = price;
        this.color = color;
    }
    return Fruit;
}());
var Telephone = (function () {
    function Telephone(name, price, loudness) {
        this.name = name;
        this.price = price;
        this.loudness = loudness;
    }
    return Telephone;
}());
var fruit1 = new Fruit("orange", .50, "orange");
var fruit2 = new Fruit("apple", .75, "red");
var fruit3 = new Fruit("lime", 1, "green");
var phone1 = new Telephone("iPhone", 699, 7);
var phone2 = new Telephone("android", 649, 8);
var inventory = [];
inventory[0] = fruit1;
inventory[1] = fruit2;
inventory[2] = fruit3;
inventory[3] = phone1;
inventory[4] = phone2;
function showInventory(product) {
    console.log("Product: " + product.name + " Price: " + product.price);
}
for (var i = 0; i < inventory.length; i++) {
    showInventory(inventory[i]);
}
