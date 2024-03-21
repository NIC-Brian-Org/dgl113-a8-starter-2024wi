"use strict";
/**
 * @param {Document} d
 * add event listener to the delete button
 * add event listener to the add button
 * 
 */
window.addEventListener("load", function () {
  let myorder = new Order();
  let tbody = document.querySelector("tbody"); // get the tbody element
  let otable = document.querySelector("table"); // get the table element
  // otable.appendChild(tbody); // append the tbody to the table

  let addButton = document.getElementById("addItem");
  document.getElementById("totalCost").textContent = '$' + myorder.cost().toFixed(2);

  addButton.addEventListener("click", function () {
    // get the current row of the table and extract the values
    // create an object of OrderItem using the values
    // add the object to the order using the earlier created add method
    let item = new OrderItem(
      document.getElementById("quantity").value,
      document.getElementById("size").value,
      document.getElementById("description").value
    );

    /**
     * if the item size and description is identical to an existing item, update that item's quantity
     * else add a new row to the table
     */
    combineItems(item, myorder);
    /*
    myorder.add(item);
   
    tbody.appendChild(item.tr(document));
    */
    document.getElementById("totalCost").textContent = '$' + myorder.cost().toFixed(2);

  });
  tbody.addEventListener("click", function (e) {
    if (e.target.tagName === "BUTTON") {
      let row = e.target.parentNode.parentNode;
      let index = row.rowIndex - 2; // get the index of the row there are 2 rows before the tbody
      myorder.delete(index);
      this.removeChild(row);
    } else {// clicked on a regular td- assume change is wanted

    }
      document.getElementById("totalCost").textContent = '$' + myorder.cost().toFixed(2);
    }
  );
  function combineItems(item, myorder) {
    let items = myorder.orderItems;
    for (let i = 0; i < items.length; i++) {
      if (items[i].size === item.size && items[i].description === item.description) {
        items[i].quantity = parseInt(items[i].quantity) + parseInt(item.quantity);
        let tr = tbody.children[i];
        tr.children[0].textContent = items[i].quantity;
        return;
      }
    }
    myorder.add(item);
    tbody.appendChild(item.tr(document));

  }
});
