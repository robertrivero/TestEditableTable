var productNameElement = document.getElementById("pName");
var productPriceElement = document.getElementById("pPrice");
var productAmountElement = document.getElementById("pAmount");
var productDescriptionElement = document.getElementById("pDesc");
var productNameLabel = document.getElementById("lName");
var productPriceLabel = document.getElementById("lPrice");
var productAmountLabel = document.getElementById("lAmount");
var productDescriptionLabel = document.getElementById("lDesc");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var saveBtn = document.getElementById("saveBtn");
updateBtn.style.display = "none";
var inputs = document.getElementsByClassName("form-control");
var currentIndex;

//productAmountElement.style.display = 'none';

var products = [];
if (JSON.parse(localStorage.getItem("productsList")) != null) {
  products = JSON.parse(localStorage.getItem("productsList"));
  displayProduct();
}

addBtn.onclick = function () {
  addProduct();
  displayProduct();
  resetForm();
};

saveBtn.onclick = function () {
    console.log(JSON.stringify(products));
    postJSON(products);
  };

updateBtn.onclick = function () {
  updateProduct();
  displayProduct();
  resetForm();
  productNameElement.style.display = "block";
  productPriceElement.style.display = "block";
  productAmountElement.style.display = "block";
  productNameLabel.style.display = "block";
  productPriceLabel.style.display = "block";
  productAmountLabel.style.display = "block";
  updateBtn.style.display = "none";
};

function addProduct() {
  var product = {
    name: productNameElement.value,
    price: productPriceElement.value,
    amount: productAmountElement.value,
    desc: productDescriptionElement.value,
  };
  products.push(product);
  console.log(products);
  localStorage.setItem("productsList", JSON.stringify(products));
}

function displayProduct() {
  var row = "";
  for (var i = 0; i < products.length; i++) {
    row += `<tr>
            <td>${i + 1}</td>
            <td>${products[i].name}</td>
            <td>${products[i].price}</td>
            <td>${products[i].amount}</td>
            <td><div class="input-group mb-3"><input id="pUpdate${i}" type="text"  placeholder="${products[i].desc}" class="form-control  nothing"><div class="input-group-append"><button id="pButton${i}" class="btn btn-warning" onclick = "getProductInfo(${i})">Update</button></div></div></td>
            <td><button class="btn btn-danger" onclick = "deleteProduct(${i})">Delete</button></td>
        </tr>`;
  }
  document.getElementById("myTable").innerHTML = row;
  for (var i = 0; i < products.length; i++) {
    getProductInfo(i);
  }
}


function resetForm() {
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
}

function deleteProduct(index) {
  products.splice(index, 1);
  displayProduct();
  localStorage.setItem("productsList", JSON.stringify(products));
}

function getProductInfo(index) {
  const input = document.getElementById("pUpdate" + index);
  currentIndex = index;
  const btn = document.getElementById("pButton" + index);
  btn.style.display = "none";
  btn.addEventListener('click', function(){
    updateProduct(index, input.value);
});
  input.addEventListener("mouseenter", (event) => {
    input.classList.remove('invisibleTextInput');
  });
  input.addEventListener("mouseout", (event) => {
    input.classList.add('invisibleTextInput');
  });
  input.addEventListener("input", (event) => {
    btn.style.display = "block";
  });
  input.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      updateProduct(index, input.value);
    }
  });

}

function updateProduct(index, text) {
console.log(products);
products[index].desc = text;
displayProduct();
localStorage.setItem("productsList", JSON.stringify(products));
console.log(products);
}

async function postJSON(data) {
    try {
      const response = await fetch("https://echo.zuplo.io/", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  

productNameElement.addEventListener("input", null);
productPriceElement.addEventListener("input", null);
productAmountElement.addEventListener("input", null);
productDescriptionElement.addEventListener("input", null);
