'use strict';
const sizes = ["Short", "Tall", "Grande", "Venti"];
const coffeePrices = [2.99, 3.19, 3.49, 3.99];
const teaPrices = [2.85, 3.05, 3.25, 3.50];

class OrderItem {
  #quantity; 
  #size;
  #description

  constructor(quantity, size, description) {
    this.quantity = quantity;
    this.size = size;
    this.description = description;
  }
  get quantity() {
    return this.#quantity;
  }
  set quantity(quantity) {
    this.#quantity = quantity;
  }
  get size() {
    return this.#size;
  }
  set size(size) {
    this.#size = size;
  }
  get description() {
    return this.#description;
  }
  set description(description) {
    this.#description = description;
  } 
  cost() {
    let price;
    for( let i in sizes){
      if(this.size.includes(sizes[i])){ //if the size is found in the sizes array. this.size calls the getter
        if(this.description.includes("Coffee")){
          price = coffeePrices[i];
        }else if(this.description.includes("Tea")){ //assume the description is either Coffee or Tea
          price = teaPrices[i];
        }
      }
    }

  price = this.#quantity * price;
  return price;
}
/*
Add a new method `tr(d)` to the class  which returns a `tr` DOM element
for document `d`. The `tr` element you return must have 4 cells:

- the quantitity
- the size
- the description
- a "Delete" button
*/
tr(d) {
  let tr = d.createElement("tr");
  let td1 = d.createElement("td");
  let td2 = d.createElement("td");
  let td3 = d.createElement("td");
  let td4 = d.createElement("td");
  let button = d.createElement("button");
  button.innerHTML = "Delete";
  td1.textContent = this.quantity;
  td2.textContent = this.size;
  td3.textContent = this.description;
  td4.appendChild(button);
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  return tr;
}
}
/*
Create a new class `Order` as follows:

The class should maintain an array of `OrderItem` objects.

The class should have `add(item)` method that adds an item to the order.
Here, `item` is expected to be an `OrderItem` object.

The class should also have a `delete(index)` method that deletes an item
from the order at index position `index`.

The class should have a method `tbody(d)` which returns a `tbody` DOM element
for document `d`. The `tbody` element you return must have a `tr` DOM element
for each of the items in the order. You may use the `tr(d)` method of the `OrderItem`
class described above to help with this.

The class should also have a `cost()` method which returns the total cost of the
entire order. You can use the existing `cost()` method from Assignment #5
to get the cost of the individual `OrderItem` objects.
*/
class Order {
  #orderItems;
  constructor() {
    this.#orderItems = [];
  }
  get orderItems() {
    return this.#orderItems;
  }
  add(item) {
    this.#orderItems.push(item);
  }
  delete(index) {
    this.#orderItems.splice(index, 1);
  }

  tbody(d) {
    let tbody = d.createElement("tbody");
    for (let i in this.#orderItems) {
      tbody.appendChild(this.orderItems[i].tr(d));
    }
    return tbody;
  }
  cost(d) {
    let total = 0;
    for (let i in this.orderItems) {
      total += this.#orderItems[i].cost();
    }
    return total;
  }
}