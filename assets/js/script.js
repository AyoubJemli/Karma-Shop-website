function emailExist(email) {
    var users = JSON.parse(localStorage.getItem('users') || "[]");

    var exist = false;

    for (let i = 0; i < users.length; i++) {
        if (users[i].email == email) {
            exist = true;
            break;
        }
    }
    return exist;
}
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
function checkPassword(password) {
    var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return regularExpression.test(password);
}
function signup() {

    var test = true;
    var firstName = document.getElementById('firstName').value;

    if (firstName.length < 3) {
        document.getElementById('firstNameError').innerHTML = "First Name must have at least 3 characters"
        document.getElementById('firstNameError').style.color = "red"
        test = false
    } else {
        document.getElementById('firstNameError').innerHTML = ""

    }


    var lastName = document.getElementById('lastName').value;

    if (lastName.length < 5) {
        document.getElementById('lastNameError').innerHTML = "Last Name must have at least 5 characters"
        document.getElementById('lastNameError').style.color = "red"
        test = false

    } else {
        document.getElementById('lastNameError').innerHTML = ""

    }

    var email = document.getElementById('email').value;
    var verifEmail = validateEmail(email)

    if (verifEmail) {
        document.getElementById('emailError').innerHTML = ""
    } else {
        document.getElementById('emailError').innerHTML = "Invalid email"
        document.getElementById('emailError').style.color = "red"
        test = false
    }

    var verifExistEmail = emailExist(email);
    if (verifExistEmail) {
        document.getElementById('emailExistError').innerHTML = "Email already exists"
        document.getElementById('emailExistError').style.color = "red"
        test = false;
    } else {
        document.getElementById('emailExistError').innerHTML = ""
    }
    var password = document.getElementById('password').value;
    var verifPassword = checkPassword(password);
    if (verifPassword) {
        document.getElementById('passwordError').innerHTML = ""
    } else {
        document.getElementById('passwordError').innerHTML = "Invalid password"
        document.getElementById('passwordError').style.color = "red"
        test = false
    }
    var confirmPassword = document.getElementById('confirmPassword').value;

    if (confirmPassword == password) {
        document.getElementById('confirmPasswordError').innerHTML = ""
    } else {
        document.getElementById('confirmPasswordError').innerHTML = "Confirm password must match password"
        document.getElementById('confirmPasswordError').style.color = "red"
        test = false
    }
    var tel = document.getElementById('tel').value;
    if (isNaN(tel) || tel.length != 8) {
        document.getElementById('telError').innerHTML = "Invalid tel"
        document.getElementById('telError').style.color = "red"
        test = false
    } else {
        document.getElementById('telError').innerHTML = ""
    }
    console.log(test);

    if (test) {
        // stockage

        var idUser = JSON.parse(localStorage.getItem('idUser') || "10")

        // regroupement des valeurs dans un objet JSON

        var user = {
            id: idUser,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            tel: tel,
            role: "client"
        }

        // Récupération des anciennes valeurs
        var users = JSON.parse(localStorage.getItem("users") || "[]")

        // ajout du nouveau utlisateur
        users.push(user)

        // sauvegarde de l'ajout
        localStorage.setItem("users", JSON.stringify(users))

        localStorage.setItem("idUser", idUser + 1)
        location.replace('login.html');
    }

}
function login() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var users = JSON.parse(localStorage.getItem("users") || "[]");
    var findedUser;
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == email && users[i].password == password) {
            findedUser = users[i]
        }

    }

    console.log(findedUser);

    if (findedUser) {
        // user exists
        document.getElementById("msgError").innerHTML = ""

        localStorage.setItem("connectedUser", JSON.stringify(findedUser));

        // redirection 
        switch (findedUser.role) {
            case "admin":
                location.replace('dashboardAdmin.html')
                break;

            case "client":
                location.replace('index.html')
                break;


        }

    }
    else {
        // user not exists
        document.getElementById("msgError").innerHTML = "Wrong informations"
        document.getElementById("msgError").style.color = "red"
    }
}
function insertAdmins() {
    var admin1 = {
        id: 1,
        firstName: "admin1",
        lastName: "admin1",
        email: "admin1@gmail.com",
        password: "admin1@2022",
        tel: "20123123",
        role: "admin",
    }

    var admin2 = {
        id: 2,
        firstName: "admin2",
        lastName: "admin2",
        email: "admin2@gmail.com",
        password: "admin2@2022",
        tel: "20123123",
        role: "admin",
    }

    var admin3 = {
        id: 3,
        firstName: "admin3",
        lastName: "admin3",
        email: "admin3@gmail.com",
        password: "admin3@2022",
        tel: "20123123",
        role: "admin",
    }
    var users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push(admin1, admin2, admin3);
    localStorage.setItem("users", JSON.stringify(users))
    localStorage.setItem("adminsAdded", true)
}
function addProduct() {
    var test = true;
    var productName = document.getElementById('productName').value;

    if (productName.length < 3) {
        document.getElementById('productNameError').innerHTML = "Product name must have at least 3 characters"
        document.getElementById('productNameError').style.color = "red"
        test = false
    } else {
        document.getElementById('productNameError').innerHTML = ""

    }
    var price = document.getElementById('price').value;

    if (price <= 0) {
        document.getElementById('priceError').innerHTML = "Price must be greater than 0"
        document.getElementById('priceError').style.color = "red"
        test = false

    } else {
        document.getElementById('priceError').innerHTML = ""

    }

    var stock = document.getElementById('stock').value;

    if (stock <= 10) {
        document.getElementById('stockError').innerHTML = "Stock must be greater than 10"
        document.getElementById('stockError').style.color = "red"
        test = false

    } else {
        document.getElementById('stockError').innerHTML = ""

    }

    var category = document.getElementById('category').value;
    if (category.length == 0) {
        document.getElementById('categoryError').innerHTML = "Category is required"
        document.getElementById('categoryError').style.color = "red"
        test = false

    } else {
        document.getElementById('categoryError').innerHTML = ""

    }

    var img = document.getElementById('image').value;
    var image = replaceCh(img);
    console.log(image);
    console.log(test);
    if (test) {
        var idProduct = JSON.parse(localStorage.getItem("idProduct") || "1")
        var product = {
            id: idProduct,
            productName: productName,
            price: price,
            stock: stock,
            category: category,
            image: image
        }

        var products = JSON.parse(localStorage.getItem("products") || "[]")

        products.push(product)

        localStorage.setItem("products", JSON.stringify(products));
        localStorage.setItem("idProduct", idProduct + 1);
        location.reload();

    }
}
function displayUsers() {
    var users = JSON.parse(localStorage.getItem("users") || "[]")
    var usersTable = `
    <table class="table">
    <thead>
      <tr>
        <th scope="col">First Name</th>
        <th scope="col">Last Name</th>
        <th scope="col">Email</th>
        <th scope="col">Tel</th>
        <th scope="col">Role</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>`;
    for (let i = 0; i < users.length; i++) {
        usersTable = usersTable + `
        <tr>
        <th >${users[i].firstName}</th>
        <td>${users[i].lastName}</td>
        <td>${users[i].email}</td>
        <td>${users[i].tel}</td>
        <td>${users[i].role}</td>
        <td>
            <button type="button" class="btn btn-warning" onclick="editUser(${users[i].id})">Edit</button>
            <button type="button" class="btn btn-danger" onclick="deleteObject(${users[i].id},'users')" >Delete</button>
        </td>
        </tr>`;
    }

    usersTable = usersTable + `
    </tbody>
    </table>`;


    document.getElementById('usersTable').innerHTML = usersTable
}
function displayProducts() {
    var products = JSON.parse(localStorage.getItem('products') || "[]")
    var productsTable = `
    <table class="table">
    <thead>
      <tr>
        <th scope="col">Product Name</th>
        <th scope="col">Price</th>
        <th scope="col">Stock</th>
        <th scope="col">Category</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>`;

    for (let i = 0; i < products.length; i++) {
        productsTable = productsTable + `
        <tr>
        <td>${products[i].productName}</td>
        <td>${products[i].price}</td>
        <td>${products[i].stock}</td>
        <td>${products[i].category}</td>
        <td>
            <button type="button" class="btn btn-warning" onclick="editProduct(${products[i].id})">Edit</button>
            <button type="button" class="btn btn-danger" onclick="deleteObject(${products[i].id},'products')">Delete</button>

        </td>
      </tr>`

    }
    productsTable = productsTable + `
 </tbody>
 </table>`;
    document.getElementById('productsTable').innerHTML = productsTable
}
function deleteUser(id) {
    // test
    // alert(id)
    var users = JSON.parse(localStorage.getItem('users') || "[]");
    var pos;
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            pos = i;
            break;
        }

    }
    users.splice(pos, 1);
    localStorage.setItem("users", JSON.stringify(users));
    location.reload()
}
function deleteProduct(id) {
    var products = JSON.parse(localStorage.getItem("products") || "[]")

    var pos;

    for (let i = 0; i < products.length; i++) {
        if (products[i].id == id) {
            pos = i;
            break;
        }
    }

    products.splice(pos, 1);
    localStorage.setItem("products", JSON.stringify(products))
    location.reload();
}
function deleteObject(id, key) {
    var tab = JSON.parse(localStorage.getItem(key) || "[]")

    var pos;

    for (let i = 0; i < tab.length; i++) {
        if (tab[i].id == id) {
            pos = i;
            break;
        }

    }

    tab.splice(pos, 1)
    localStorage.setItem(key, JSON.stringify(tab))
    location.reload();
}
function editUser(id) {
    var user = searchById(id, "users")
    console.log("my user", user);
    var userForm = `
   <div class="login_form_inner">
    <h3>Edit User</h3>
    <div class="row login_form"  id="contactForm" novalidate="novalidate">
        <div class="col-md-12 form-group">
            <input type="tel" class="form-control" id="tel" name="name" placeholder="Tel" value="${user.tel}" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Tel'">
        </div>
        <span id="telError"></span>
        
        <div class="col-md-12 form-group">
            <button type="submit" value="submit" class="primary-btn" onclick="validateEditUser(${id})">Validate Edit</button>
            
        </div>
    </div>
</div>
   `;
    document.getElementById('userForm').innerHTML = userForm
}
function searchById(id, key) {
    var tab = JSON.parse(localStorage.getItem(key) || "[]")
    var obj;
    for (let i = 0; i < tab.length; i++) {
        if (tab[i].id == id) {
            obj = tab[i]
            break;
        }
    }

    return obj;
}
function validateEditUser(id) {
    var newTel = document.getElementById('tel').value;
    console.log(newTel);
    var test = true
    if (newTel.length != 8 || isNaN(newTel)) {
        document.getElementById('telError').innerHTML = "Invalid tel"
        document.getElementById('telError').style.color = "red"
        test = false
    } else {
        document.getElementById('telError').innerHTML = ""

    }

    if (test) {
        var users = JSON.parse(localStorage.getItem("users") || "[]")

        for (let i = 0; i < users.length; i++) {
            if (users[i].id == id) {
                users[i].tel = newTel
                break;
            }
        }
        localStorage.setItem('users', JSON.stringify(users))
        location.reload();
    }

}
function editProduct(id) {
    var product = searchById(id, "products")
    var productForm = `
    <div class="login_form_inner">
    <h3>Edit product</h3>
    <div class="row login_form"  id="contactForm" novalidate="novalidate">
       
        <div class="col-md-12 form-group">
            <input type="number" class="form-control" id="price" value="${product.price}" name="name" placeholder="Price" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Price'">
        </div>
        <span id="priceError"></span>

        <div class="col-md-12 form-group">
            <input type="number" class="form-control" id="stock" name="name" value="${product.stock}" placeholder="Stock" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Stock'">
        </div>
        <span id="stockError"></span>
     
       
       
        
        <div class="col-md-12 form-group">
            <button type="submit" value="submit" class="primary-btn" onclick="validateEditProduct(${id})">Validate</button>
            
        </div>
    </div>
</div>`

    document.getElementById('productForm').innerHTML = productForm;
}
function validateEditProduct(id) {
    var newPrice = document.getElementById('price').value;
    var newStock = document.getElementById('stock').value;
    var test = true;
    if (newPrice <= 0) {
        document.getElementById('priceError').innerHTML = "Invalid Price"
        document.getElementById('priceError').style.color = "red"
        test = false
    } else {
        document.getElementById('priceError').innerHTML = ""

    }

    if (newStock <= 10) {
        document.getElementById('stockError').innerHTML = "Invalid Stock"
        document.getElementById('stockError').style.color = "red"
        test = false

    } else {
        document.getElementById('stockError').innerHTML = ""

    }

    if (test) {
        var products = JSON.parse(localStorage.getItem('products') || '[]')

        for (let i = 0; i < products.length; i++) {
            if (products[i].id == id) {
                products[i].price = newPrice
                products[i].stock = newStock
                break;
            }

        }

        localStorage.setItem("products", JSON.stringify(products))
        location.reload();
    }
}
function displayShop() {
    var products = JSON.parse(localStorage.getItem("products") || "[]")
    var shop = ``;

    for (let i = 0; i < products.length; i++) {
        shop = shop + `
        <div class="col-lg-4 col-md-6">
							<div class="single-product">
								<img class="img-fluid" src="${products[i].image}" alt="">
								<div class="product-details">
									<h6>${products[i].productName}</h6>
									<div class="price">
										<h6>${products[i].price} TND</h6>
										<h6 >${products[i].category}</h6>
									</div>
									<div class="prd-bottom">
                        <button type="submit" value="submit" class="primary-btn" onclick="goToDisplayProductDetails(${products[i].id})">Order</button>

									</div>
								</div>
							</div>
						</div>`;

    }

    document.getElementById('shop').innerHTML = shop;
}
function goToDisplayProductDetails(id) {
    localStorage.setItem('idPrToReserve', id)
    location.replace('displayProductDetails.html')
}
function displayProductDetails() {
    var id = localStorage.getItem('idPrToReserve');
    console.log(id);
    var product = searchById(id, "products")
    console.log(product);

    document.getElementById('productName').innerHTML = product.productName
    document.getElementById('price').innerHTML = product.price + "TND"
    document.getElementById('category').innerHTML = product.category
    document.getElementById('stock').innerHTML = product.stock + "pieces"
}
function validateOrder() {
    var qty = document.getElementById('qty').value;
    var idProduct = localStorage.getItem('idPrToReserve');
    var product = searchById(idProduct, "products")

    if (qty <= 0) {
        document.getElementById('qtyError').innerHTML = "Invalid Quantity"
        document.getElementById('qtyError').style.color = "red"
    }
    else if (qty > product.stock) {
        document.getElementById('qtyError').innerHTML = "Quantity not available"
        document.getElementById('qtyError').style.color = "red"
    } else {
        // passage de la commande
        var connectedUser = JSON.parse(localStorage.getItem('connectedUser'))
        var idOrder = JSON.parse(localStorage.getItem('idOrder') || "1")
        var order = {
            id: idOrder,
            idProduct: idProduct,
            idUser: connectedUser.id,
            qty: qty
        }

        var orders = JSON.parse(localStorage.getItem("orders") || "[]")
        orders.push(order)
        localStorage.setItem("orders", JSON.stringify(orders))
        localStorage.setItem('idOrder', idOrder + 1)

        // Mise à jour du stock
        var products = JSON.parse(localStorage.getItem("products") || "[]");

        for (let i = 0; i < products.length; i++) {
            if (products[i].id == idProduct) {
                products[i].stock = products[i].stock - qty
                // products[i].stock -= qty
                break;
            }
        }
        localStorage.setItem("products", JSON.stringify(products))
        location.replace('cart.html');
    }

}
function cart() {
    var orders = JSON.parse(localStorage.getItem('orders') || "[]")
    var connectedUser = JSON.parse(localStorage.getItem("connectedUser"))

    var myOrders = [];

    for (let i = 0; i < orders.length; i++) {
        if (orders[i].idUser == connectedUser.id) {
            myOrders.push(orders[i])
        }
    }

    console.log(myOrders);

    var cart = `
    <table class="table">
    <thead>
        <tr>
            <th scope="col">Product</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Total</th>
            <th scope="col">Actions</th>
        </tr>
    </thead>
    <tbody>`;
    var subtotal = 0;
    for (let i = 0; i < myOrders.length; i++) {
        var product = searchById(myOrders[i].idProduct, "products")
        var total = product.price * myOrders[i].qty
        subtotal = subtotal + total;
        cart = cart + `
        <tr>
            <td>
                <div class="media">
                    <div class="d-flex">
                        <img src="img/cart.jpg" alt="">
                    </div>
                    <div class="media-body">
                        <p>${product.productName}</p>
                    </div>
                </div>
            </td>
            <td>
                <h5>${product.price} TND</h5>
            </td>
            <td>
                <h5>${myOrders[i].qty} pieces</h5>
            </td>
            <td>
                <h5>${total} TND</h5>
            </td>
            <td>
            <button type="button" class="btn btn-warning" onclick="editOrder(${myOrders[i].id})">Edit</button>
            <button type="button" class="btn btn-danger" onclick="deleteOrder(${myOrders[i].id})" >Delete</button>
            </td>
        </tr>`;

    }

    cart = cart + `        <tr>
      <td>

      </td>
      <td>

      </td>
      <td>
          <h5>Subtotal</h5>
      </td>
      <td>
          <h5>${subtotal} TND</h5>
      </td>
      
  </tr>

</tbody>
</table>`



    document.getElementById('cart').innerHTML = cart;
}
function deleteOrder(id) {
    var order = searchById(id, "orders");
    var idProduct = order.idProduct;

    //    Mise à jour product
    var products = JSON.parse(localStorage.getItem('products') || '[]');

    for (let i = 0; i < products.length; i++) {
        if (products[i].id == idProduct) {
            products[i].stock = Number(products[i].stock) + Number(order.qty)
        }
    }

    localStorage.setItem("products", JSON.stringify(products))

    // Suppression de la commande
    deleteObject(id, "orders")

    location.reload();
}
function editOrder(id) {
    var order = searchById(id, "orders");
    var editOrderForm = `
    <div class="login_form_inner">
    <h3>Edit order</h3>
    <div class="row login_form"  id="contactForm" novalidate="novalidate">
       
        <div class="col-md-12 form-group">
            <input type="number" class="form-control" id="qty" value="${order.qty}" name="name" placeholder="Quantity" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Quantity'">
        </div>
        <span id="quantityError"></span>

      
     
       
       
        
        <div class="col-md-12 form-group">
            <button type="submit" value="submit" class="primary-btn" onclick="validateEditOrder(${id})">Validate</button>
            
        </div>
    </div>
</div>`

    document.getElementById('editOrderForm').innerHTML = editOrderForm;
}
function validateEditOrder(id) {
    var newQty = document.getElementById('qty').value;
    var order = searchById(id, "orders");
    var product = searchById(order.idProduct, "products")
    var diff = Number(newQty) - Number(order.qty)

    if (newQty <= 0) {
        document.getElementById('quantityError').innerHTML = "Invalid Qty"
        document.getElementById('quantityError').style.color = "red"
    }
    else if (diff > product.stock) {
        document.getElementById('quantityError').innerHTML = "Qty not available"
        document.getElementById('quantityError').style.color = "red"
    }
    else {
        // mise à jour commande
        var orders = JSON.parse(localStorage.getItem("orders") || "[]");

        for (let i = 0; i < orders.length; i++) {
            if (orders[i].id == id) {
                orders[i].qty = Number(newQty)
                break;
            }

        }
        localStorage.setItem("orders", JSON.stringify(orders))

        // Mise à jour produit 

        var products = JSON.parse(localStorage.getItem("products") || "[]")

        for (let i = 0; i < products.length; i++) {
            if (products[i].id == order.idProduct) {
                products[i].stock = Number(products[i].stock) - diff
            }

        }

        localStorage.setItem("products", JSON.stringify(products))

        location.reload()
    }
}
function dynamicHeader() {

    var connectedUser = JSON.parse(localStorage.getItem('connectedUser'))

    if (connectedUser) {
        // user connected
        switch (connectedUser.role) {
            case 'admin':

                var header = `
        <li class="nav-item active"><a class="nav-link" href="index.html">Home</a></li>
        <li class="nav-item"><a class="nav-link" href="shop.html">Shop</a></li>
        <li class="nav-item"><a class="nav-link" href="dashboardAdmin.html">Dashboard</a></li>
        <li class="nav-item"><a class="nav-link" href="addProduct.html">Add Product</a></li>
        <li class="nav-item"><a class="nav-link" onclick="logout()" >Logout</a></li>`;
                break;


            case 'client':

                var header = `
                    <li class="nav-item active"><a class="nav-link" href="index.html">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="shop.html">Shop</a></li>
                    <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
                    <li class="nav-item"><a class="nav-link"  onclick="logout()" >Logout</a></li>`;
                break;
        }
    } else {
        // visitor

        var header = `
    <li class="nav-item active"><a class="nav-link" href="index.html">Home</a></li>
    <li class="nav-item"><a class="nav-link" href="shop.html">Shop</a></li>
    <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
    <li class="nav-item"><a class="nav-link" href="signup.html">Signup</a></li>
    <li class="nav-item"><a class="nav-link" href="login.html">Login</a></li>`;
    }


    document.getElementById('header').innerHTML = header;
}
function logout() {
    localStorage.removeItem("connectedUser")
    location.replace('index.html')
}
function searchPr(event) {
    var code = event.keyCode;
    console.log(code);
    if (code == 13) {
        var category = document.getElementById('search_input').value;

        localStorage.setItem("categoryToSearch", category)

        location.replace('result.html');
    }
}
function displayResult() {
    var products = JSON.parse(localStorage.getItem("products") || "[]")

    var category = localStorage.getItem("categoryToSearch");

    var result = []

    for (let i = 0; i < products.length; i++) {
        if (products[i].category == category) {
            result.push(products[i])

        }
    }


    var shop = ``;
    
    for (let i = 0; i < result.length; i++) {
        shop = shop + `
        <div class="col-lg-4 col-md-6">
							<div class="single-product">
								<img class="img-fluid" src="img/product/p1.jpg" alt="">
								<div class="product-details">
									<h6>${result[i].productName}</h6>
									<div class="price">
										<h6>${result[i].price} TND</h6>
										<h6 >${result[i].category}</h6>
									</div>
									<div class="prd-bottom">
 <button type="submit" value="submit" class="primary-btn" onclick="goToDisplayProductDetails(${result[i].id})">Order</button>

									</div>
								</div>
							</div>
						</div>`;

    }

    document.getElementById('shop').innerHTML = shop;
}
function replaceCh(ch) {
    var newCh = ch.replace(/\\/g, "/");
    var res = newCh.replace("fakepath", "Users/CrocoCoder Trainer/Desktop/FSJSsoir07-22/karma-masterSoir/karma-master/img");
    return res;
}