var productNameValue = document.getElementById("productname")
var productPriceValue = document.getElementById("productprice")
var productCategoryValue = document.getElementById("productCategory")
var productDescriptionValue = document.getElementById("productDescription")
var productImageNameValue = document.getElementById("productFile")
var defaultSelectedProduct = document.getElementById("default")

var productList = [];

// restore products from local storage
if (localStorage.getItem("myStore")) {
    productList = JSON.parse(localStorage.getItem("myStore"))

    // display
    display(productList)
}



// add function
function addProduct() {
    var product =
    {
        productName: productNameValue.value,
        productPrice: productPriceValue.value,
        productCategory: productCategoryValue.value,
        productDescription: productDescriptionValue.value,
        productImageName: productImageNameValue.files[0].name
    }

    // add the product to the product list
    productList.push(product)

    // store the products on local storage
    localStorage.setItem("myStore", JSON.stringify(productList))

    // reset the form
    reset()

    // display All products
    display(productList)

}


// Reset function
function reset() {
    productNameValue.value = ""
    productPriceValue.value = ""
    defaultSelectedProduct.selected = true
    productDescriptionValue.value = ""
    productImageNameValue.value = ""
}

// display function
function display(displayArr) {
    var strdisplayArr = ``;
    for (var i = 0; i < displayArr.length; i++) {
        strdisplayArr += ` <div class="col">
        <div class="item shadow-sm border p-2">
          <div class="img-container mb-4">
            <img class="w-100 h-100 object-fit-contain " src="./images/${displayArr[i].productImageName}" alt="photo">
          </div>
          <h3 class="fs-5 pt-3">${displayArr[i].productName}</h3>
          <p class="text-secondary">${displayArr[i].productDescription}</p>
          <p><span class="fw-semibold">Category :</span> ${displayArr[i].productCategory}</p>
          <div class="d-flex justify-content-between">
            <p class="fw-semibold">${displayArr[i].productPrice}  EGP</p>
            <div class="icons">
              <i onclick="deleteItem(${i})" class="fs-4 text-danger fa-solid fa-trash-can"></i>
              <i onclick="returnForUpdateProduct(${i})" class="fs-4 text-success  fa-solid fa-pen-to-square"></i>
            </div>
          </div>
        </div>
      </div>` ;
    }

    document.getElementById("dis").innerHTML = strdisplayArr
}

// delete function
function deleteItem(deletedindex) {
    productList.splice(deletedindex, 1)

    // send the new array to local storage
    localStorage.setItem("myStore", JSON.stringify(productList))

    // display the new array
    display(productList)
}

// search function
function realTimeSearch(searchText) {
    var filterdList = []

    for (var i = 0; i < productList.length; i++) {
        if (productList[i].productName.toLowerCase().includes(searchText.toLowerCase())) {
            filterdList.push(productList[i])
        }
    }

    // display filterd products
    display(filterdList)
}

//read to update function
function returnForUpdateProduct(i) {
    productNameValue.value = productList[i].productName
    productPriceValue.value = productList[i].productPrice
    productCategoryValue.value = productList[i].productCategory
    productDescriptionValue.value = productList[i].productDescription

    document.getElementById("bt").innerHTML = `      <button onclick="excuteUpdate(${i})" 
    class="btn btn-info text-light mt-3 ms-3">UPDATE</button>`

}

// update function
function excuteUpdate(productToUpdate) {
    // save updates in array
    productList[productToUpdate].productName = productNameValue.value
    productList[productToUpdate].productPrice = productPriceValue.value
    productList[productToUpdate].productCategory = productCategoryValue.value
    productList[productToUpdate].productDescription = productDescriptionValue.value

    console.log(productList[productToUpdate])
    // save updates in local storage
    localStorage.setItem("myStore" , JSON.stringify(productList))

    // display after update
    display(productList)

    // reset
    reset()

    // delete the button
    document.getElementById("bt").innerHTML=""
}



