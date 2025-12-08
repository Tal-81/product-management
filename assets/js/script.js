// Variables ___________
let title = document.getElementById("productname");
let price = document.getElementById("productprice");
let tax = document.getElementById("producttax");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let category = document.getElementById("category");
let quantity = document.getElementById("productquantity");
let submit = document.getElementById("submit");
let msg = document.getElementById("message");
let search = document.getElementById("search");
let btnByTitle = document.getElementById("btn-by-title");
let btnByCategory = document.getElementById("btn-by-Category");
let btnDeleteAll = document.getElementById("btn-delete-all");
let resultTotal = 0; // total result variable(price + tax - discount)
let products = []; // products array


// call the products array ___________
if (!localStorage.getItem("products")) {
  localStorage.setItem('products', JSON.stringify(products));
} else {
  products = JSON.parse(localStorage.getItem("products"));
}

renderProducts(); // initial call to display products

// show Message when the form has submitted ___________
function showMsg(target, text) {
  if(target !== null) {
    target.style.background = "pink";
    target.focus();
    target.scrollIntoView({ block: 'center', behavior: 'smooth' });
    msg.style.color = "red"; // error case
  } else {
    msg.style.color = "green"; // success case
  }
  msg.innerText = text;
  msg.classList.replace("invisible","visible");
  setTimeout(()=> {
    if (target !== null) target.style.background = null;
    msg.classList.replace("visible","invisible");
    msg.innerText = "";
  }, 10000)
}

// data validation ___________
function dataValidation() {
      // re-enable submit button after 10 seconds___
  setTimeout(()=> {
    submit.removeAttribute("disabled");
    submit.textContent = "Create";
  }, 5000);
      // title validation___
  if (!title.value.trim()) {
    showMsg(title ,"Product title is required");
    return
  }

  if (!discount.value || discount.value < 0 || isNaN(discount.value)) discount.value = 0;
      // price & tax validation____ 
  if (isNaN(price.value)) {
    showMsg(price ,"allowed, Just numbers in price field");
    return

  } else if (!price.value || price.value < 1) {
    showMsg(price ,"Invalid Price, should be more then 0");
    return

  } else {
    if (isNaN(tax.value)) {
      showMsg(tax ,"allowed, Just numbers in tax field");
      return

    } else if (!tax.value || tax.value < 0) {
      showMsg(tax, "Invalid Tax, should be not empty or negative");
      return

    } else {
      resultTotal = parseInt(price.value) + parseInt(tax.value) - parseInt(discount.value);
    }
  }
      // quantity validation___
  if (isNaN(quantity.value)) {
    showMsg(quantity ,"allowed, Just numbers in quantity field");
    return
  }

  if (!quantity.value || quantity.value < 1 || quantity.value > 1000) {
    showMsg(quantity ,"Between 1 and 1000 allowed in quantity");
    return
  }

      // category validation___
  if (!category.value || category.value === "Category*") {
    showMsg(category ,"Product category is required");
    return
  }
  return true;
}

// show total ___________
function showTotal() {
  if (price.value < 1) {
    dataValidation();
  }
  if (tax.value < 0) {
    dataValidation();
  }
  if (discount.value < 0) {
    discount.value = "0";
  }
  let result = parseInt(price.value || 1) + parseInt(tax.value || 0) - parseInt(discount.value || 0);
  total.innerText = "Total:" + result;
}

// create a new product ___________
submit.addEventListener("click", (e)=> {
  e.preventDefault();
  submit.setAttribute("disabled", "true");
  submit.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='currentColor' class='bi bi-hourglass-split' viewBox='0 0 16 16'><path d='M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z'/></svg>";
  let response = dataValidation();

  if (!response) return; // if data is not valid, stop the function here

  let newProd = {
    id: new Date().getTime().toLocaleString(),
    title: title.value.trim().toLowerCase(),
    price: parseInt(price.value),
    tax: parseInt(tax.value),
    discount: parseInt(discount.value),
    total: resultTotal,
    quantity: parseInt(quantity.value),
    category: category.value,
  }

  document.getElementsByTagName('form')[0].reset(); // clear inputs

  products.push(newProd); // add new product to products array

  showMsg(null, "Product has been created successfully");

  localStorage.setItem("products", JSON.stringify(products));

  products = JSON.parse(localStorage.getItem("products")) || [];

  renderProducts();
})

// read data from localStorage ________
function renderProducts() {
  if (products.length == 0) {
    document.getElementById("table-body").innerHTML += `
    <tr><td colspan="10" class="text-center">No products available</td></tr>`;
  }  else {
    document.getElementById("table-body").innerHTML = ""; // clear table before rendering
    products.forEach((product, id) => {
      document.getElementById("table-body").innerHTML += `
      <tr>
        <th scope="row">${id + 1}</th>
        <td>${product.title}</td>
        <td>${product.price}</td>
        <td>${product.tax}</td>
        <td>${product.discount}</td>
        <td>${product.total}</td>
        <td>${product.quantity}</td>
        <td>${product.category}</td>
        <td><button class="btn btn-warning btn-sm">Update</button></td>
        <td><button class="btn btn-danger btn-sm">Delete</button></td>
      </tr>`;
    });
  }  
}



// count products ___________


// delete product ___________


// update product ___________


// search product by title or category


// clean data ___________