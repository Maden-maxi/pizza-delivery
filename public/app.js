document.addEventListener('DOMContentLoaded', function (event) {

    var app = {};
    app.client = {};

    app.client.storage = {};

    app.client.storage.prefix = 'app_';

    app.client.storage.set = function(key, data) {
        localStorage.setItem(app.client.storage.prefix + key, JSON.stringify(data));
    }

    app.client.storage.get = function(key) {
        return JSON.parse(localStorage.getItem(app.client.storage.prefix + key));
    }
    app.client.storage.remove = function(key) {
        localStorage.removeItem(app.client.storage.prefix + key);
    }

    app.setSession = function(payload) {
        app.client.storage.set('token', payload);
        app.setLoggedInClass(true, payload.user.role);
    }
    app.getSession = function() {
        return app.client.storage.get('token');
    }
    app.destroySession = function() {
        const token = app.getSession();
        app.setLoggedInClass(false, token.user.role);
        app.client.storage.remove('token');
    }

    app.cart = {};
    app.cart.counter = document.getElementById('cart-counter');
    app.cart.count = function() {
        app.cart.counter.innerHTML = app.cart.get().length;
    }
    app.cart.key = app.getSession() ? 'cart_' + app.getSession().user._id : '';
    app.cart.get = function() {
        return app.client.storage.get(app.cart.key) || [];
    }
    app.cart.add = function(prductId) {
        const cart = app.cart.get();
        if (cart.includes(prductId)) {
            alert('Product already in the cart!');
        } else {
            const add = cart ? [...cart, prductId] : [prductId];
            app.client.storage.set(app.cart.key, add);
            app.cart.count();
        }
    }
    app.cart.remove = function(productId) {
        const cart = app.cart.get();
        const remove = cart ? cart.filter(id => id !== productId) : [];
        app.client.storage.set(app.cart.key, remove);
        app.cart.count();
    }

    app.cart.clear = function() {
        app.client.storage.set(app.cart.key, []);
    }

    app.cart.render = function() {
        const cartItems = document.getElementById('cart_items');
        if (cartItems) {
            const cartIds = app.cart.get();
            app.client.request('POST', 'api/cart', {ids: cartIds}, function (status, data) {
                console.log(status, data);
                const cartFields = data.map(item => `
                <tr>
                    <td> <input type="hidden" name="cart_item[${item._id}][id]" value="${item._id}"> ${item.title}</td>
                    <td><div class="price">${item.price}$</div></td>
                    <td>
                        <div class="form-group">
                            <label for="count_${item._id}">Count <sup class="text-danger">*</sup></label>
                            <input class="form-control" id="count_${item._id}" type="number" name="cart_item[${item._id}]" min="1" max="10" required>    
                        </div>
                    </td>
                    <td><button type="button" class="btn btn-danger cart-remove-item" data-product_id="${item._id}">Remove from cart</button></td>
                </tr>
                `).join('');
                cartItems.innerHTML = cartFields;
                const cartForm = document.getElementById('cart_form');

                function calcSum () {
                    const totalCountDiv = document.getElementById('total_count');
                    const totalSumDiv = document.getElementById('total_price');
                    const cartGoods = data.map( item => {
                        const countField = document.getElementById('count_' + item._id);
                        return {...item, count: countField.value || 0};
                    });
                    const totalCount = cartGoods.map(item =>  parseInt(item.count, 10) ).reduce((prev, next) => prev + next);
                    const totalSum = cartGoods.map( (item) => parseInt(item.count, 10) * parseInt(item.price, 10) )
                        .reduce((prev, next) => prev + next);

                    totalCountDiv.innerHTML = totalCount;
                    totalSumDiv.innerHTML = totalSum;
                    return {totalCount, totalSum, cartGoods};
                }

                calcSum();
                cartForm.addEventListener('change', function () {
                    calcSum();
                });

                cartForm.addEventListener('submit', function (event) {
                    event.preventDefault();
                    const cartInfo = calcSum();
                    const token = app.getSession();
                    const order = {
                        amount: cartInfo.totalSum,
                        email: token.email,
                        description: cartInfo.cartGoods
                    };
                    app.client.request('post', 'api/orders', order, function (statusCode, response) {
                        console.log(statusCode, response);
                        if (statusCode === 201 ) {
                            app.cart.clear();
                            alert('Your order has been accepted!');
                            location.assign(location.origin + '/orders')
                        }
                    });
                });
            });
        }
    }


    app.setLoggedInClass = function(add, role){
        var target = document.querySelector("body");
        if(add){
            target.classList.add(role)
            target.classList.add('loggedIn');
        } else {
            target.classList.remove(role);
            target.classList.remove('loggedIn');
        }
    };

    app.checkLoggedIn = function() {
        const token = app.getSession();
        if (token) {
            app.setLoggedInClass(true, token.user.role);
        }
    }

    app.client.request = function (method, path, payload, callback, config) {

        const token = app.getSession();

        if (token) {
            path = path + '?email=' + token.email;
        }

        var xhr = new XMLHttpRequest();
        xhr.open(method.toUpperCase(), path, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        if (config) {
            if (typeof config.headers === 'object') {
                for(var headerKey in config.headers) {
                    if(headers.hasOwnProperty(headerKey)) {
                        xhr.setRequestHeader(headerKey, headers[headerKey]);
                    }
                }
            }
        }


        if (token) {
            xhr.setRequestHeader('authorization', `Bearer ${token.token}`);
        }


        // When the request comes back, handle the response
        xhr.onreadystatechange = function() {
            if(xhr.readyState == XMLHttpRequest.DONE) {
                var statusCode = xhr.status;
                var responseReturned = xhr.responseText;

                // Callback if requested
                if(callback){
                    try{
                        var parsedResponse = JSON.parse(responseReturned);
                        callback(statusCode, parsedResponse);
                    } catch(e){
                        console.log(e);
                        // callback(statusCode,false);
                    }

                }
            }
        }

        xhr.onerror = function (event) {
            callback(400, event);
        }

        // Send the payload as JSON
        var payloadString = JSON.stringify(payload);
        xhr.send(payloadString);

    }
    
    app.refreshToken = function (callback) {
        var token = app.storage.get('token');
        var fail = function () {
            app.destroySession();
            callback(true);
        };

        if (token) {
            app.client.request('PUT', 'api/tokens/', {token: token.token}, function (statusCode, payload) {
                if (statusCode === 200) {
                    app.client.request('GET', 'api/tokens/', {token: token.token}, function (code, response) {
                        if (code === 200) {
                            app.setSession(response);
                            callback(false);
                        } else {
                            fail();
                        }
                    });
                } else {
                    fail();
                }
            });
        } else {
            fail();
        }
    }

    app.tokenRefreshLoop = function(){
        setInterval(function(){
            app.refreshToken(function(err){
                if(!err){
                    console.log("Token renewed successfully @ "+Date.now());
                }
            });
        }, 1000 * 60);
    };

    app.logoutHandler = function () {
        const logoutLink = document.querySelector('.nav-link.logout');
        logoutLink.addEventListener('click', function (event) {
            event.preventDefault();
            app.client.request('DELETE', 'api/tokens', app.getSession(), function (status, response) {
                if (status === 200) {
                    app.destroySession();
                    location.assign(location.origin);
                }
                if (status >= 400) {
                    alert('Something when wrong');
                }
            });
        });
    }



    app.basicFormHandler = function(selector, request, transformAction) {
        var form = document.querySelector(selector);
        if (form) {
            var errorsDiv = form.querySelector('#errors');
            var formButton = form.querySelector('.btn-submit');
            var requestUrl = transformAction ? transformAction(form.action, form) : form.action;
            var userId = form.querySelector('#userId');
            var token = app.getSession();

            if (userId && token) {
                userId.value = token.user._id;
            }

            if (form.dataset.entity) {
                app.client.request('GET', requestUrl, {}, (status, response) => {
                    if (status === 200) {
                        console.log(response);
                        Object.keys(response).forEach((key) => {
                            const field = form.querySelector(`[name=${key}]`);
                            if (field) {
                                field.value = response[key];
                            }
                        });
                    }

                    if (status >= 400) {
                        alert('Something went wrong');
                    }
                });
            }

            form.addEventListener('keyup', function () {
                formButton.disabled = !this.checkValidity();
            });

            form.addEventListener('submit',  function (event) {
                event.preventDefault();
                var formData = new FormData(this);
                var payload = {};
                formData.forEach((value, key) => payload[key] = value);

                app.client.request(this.dataset.method, requestUrl, payload, (statusCode, data) => {
                    errorsDiv.classList.add('d-none');
                    if (statusCode >= 400) {
                        const errors = data.errors;

                        let errorMessage = '';
                        for(let key in errors) {
                            errorMessage += `<div><span class="text-danger">${key}: </span>${errors[key]}</div>`;
                        }
                        errorsDiv.classList.remove('d-none');
                        errorsDiv.innerHTML = errorMessage;
                    }

                    request(statusCode, data, this);

                });
            });
        }

    }

    app.getProducts = function () {

        const token = app.getSession();
        const catalog = document.getElementById('catalog');

        if (token && catalog) {
            app.client.request('GET', 'api/products', {}, function (status, data) {
               console.log(data);

               if (data.length) {
                    catalog.innerHTML = data
                        .map(product => `
                            <div class="col-4">
                                <div class="card">
                                    <h1 class="card__title"><a href="product/${product._id}">${product.title}</a></h1>
                                    <div class="card__text">${product.description}</div>
                                    <div class="card__footer"><b>${product.price}$</b></div>
                                    <button class="hide-seller btn btn-primary btn-add-to-cart" data-product_id="${product._id}" type="button">Add to cart</button>
                                </div>
                            </div>
                        `)
                        .join('');
               } else {
                   catalog.innerHTML = `<h1 class="text-center">Shop don't have products yet.</h1>`
               }
            });
        }

    }

    app.getOrders = function () {
        const orderTablle = document.getElementById('orders-table');
        if (orderTablle) {
            app.client.request('GET', 'api/orders', {}, function (status, data) {
                const orderTableBody = orderTablle.querySelector('tbody');
                if (status === 200) {
                    console.log(data);
                    const output = data.map(item => {
                        const details = JSON.parse(item.description);
                        const createdAt = new Date(item.createdAt);
                        return `
                        <tr>
                            <td>${item._id}</td>
                            <td>${item.amount / 100}$</td>
                            <td>${details.map(product => `<div>${product.title} - ${product.price}$ x ${product.count}</div>`).join('')}</td>
                            <td>${createdAt.toLocaleString()}</td>
                            <td><button type="button" class="btn btn-danger remove-order" data-order_id="${item._id}">Delete</button></td>
                        </tr>
                        `;
                    }).join('');
                    orderTableBody.innerHTML = output;
                }

                if (status >= 400) {
                    alert('Somethig went wrong');
                }
            });
        }
    }

    function delegateEvent(eventName, selector, callback) {
        document.querySelector('body').addEventListener(eventName, function (event) {
            if (event.target.classList.contains(selector)) {
                callback(event);
            }
        })
    }

    app.init = function () {
        app.checkLoggedIn();

        app.basicFormHandler('.form', function (statusCode, data, form) {
            const successStatuses = [200, 201];
            if (successStatuses.includes(statusCode)) {
                switch (form.id) {
                    case 'sign_up_form':
                        alert('Your account has beed created! Please sign in!');
                        location.assign(location.origin + '/login');
                        break;
                    case 'login_form':
                        app.setSession(data);
                        app.checkLoggedIn();
                        location.assign(location.origin + '/');
                        break;
                    case 'account_form':
                        alert('Account has been changed');
                        break;
                    case 'create_product':
                        alert('Product has been created');
                        location.assign(location.origin + '/product/' + data._id);
                        break;
                    case 'edit_product':
                        alert('Product has been changed');
                        break;
                }
            }
        }, function (url, form) {
            switch (form.id) {
                case 'account_form':
                    const token = app.getSession();
                    return url + token.user._id
                default:
                    return url;
            }
        });


        app.getProducts()
        app.cart.count();
        app.cart.render();
        app.getOrders();

        app.logoutHandler();

        delegateEvent('click', 'btn-add-to-cart', function (event) {
            if (event.target.dataset.product_id) {
                app.cart.add(event.target.dataset.product_id);
            }
        });

        delegateEvent('click', 'cart-remove-item', function (event) {

            if (event.target.dataset.product_id) {
                app.cart.remove(event.target.dataset.product_id);
                location.reload();
            }
        });

    }



    app.init();

});