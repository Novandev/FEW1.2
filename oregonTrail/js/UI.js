var OregonH = OregonH || {};

OregonH.UI = {};

//show a notification in the message area
OregonH.UI.notify = function(message, type){
    document.getElementById('updates-area').innerHTML = `<div class="update-${type}">Day ${ Math.ceil(this.caravan.day)} :${message}</div> ${document.getElementById('updates-area').innerHTML}`;
};

//refresh visual caravan stats
OregonH.UI.refreshStats = function() {
    //modify the dom
    document.getElementById('stat-day').innerHTML = Math.ceil(this.caravan.day);
    document.getElementById('stat-distance').innerHTML = Math.floor(this.caravan.distance);
    document.getElementById('stat-crew').innerHTML = this.caravan.crew;
    document.getElementById('stat-oxen').innerHTML = this.caravan.oxen;
    document.getElementById('stat-food').innerHTML = Math.ceil(this.caravan.food);
    document.getElementById('stat-money').innerHTML = this.caravan.money;
    document.getElementById('stat-firepower').innerHTML = this.caravan.firepower;
    document.getElementById('stat-weight').innerHTML = `${Math.ceil(this.caravan.weight)} / ${this.caravan.capacity}`;

    //update caravan position
    document.getElementById('caravan').style.left = `${(380 * this.caravan.distance/OregonH.FINAL_DISTANCE)}px`;
};

//show attack
OregonH.UI.showAttack = function(firepower, gold) {
    var attackDiv = document.getElementById('attack');
    attackDiv.classList.remove('hidden');

    //keep properties
    this.firepower = firepower;
    this.gold = gold;

    //show firepower
    document.getElementById('attack-description').innerHTML = `Firepower: ${firepower}`;

    //init once
    if(!this.attackInitiated) {

        //fight
        document.getElementById('fight').addEventListener('click', this.fight.bind(this));

        //run away
        document.getElementById('runaway').addEventListener('click', this.runaway.bind(this));

        this.attackInitiated = true;
    }
};

//fight
OregonH.UI.fight = function(){

    var firepower = this.firepower;
    var gold = this.gold;

    var damage = Math.ceil(Math.max(0, firepower * 2 * Math.random() - this.caravan.firepower));

    //check there are survivors
    if(damage < this.caravan.crew) {
        this.caravan.crew -= damage;
        this.caravan.money += gold;
        this.notify(`${damage} people were killed fighting`, 'negative');
        this.notify(`Found $ ${gold}`, 'gold');
    }
    else {
        this.caravan.crew = 0;
        this.notify('Everybody died in the fight', 'negative');
    }

    //resume journey
    document.getElementById('attack').classList.add('hidden');
    this.game.resumeJourney();
};

//runing away from enemy
OregonH.UI.runaway = function(){

    var firepower = this.firepower;

    var damage = Math.ceil(Math.max(0, firepower * Math.random()/2));

    //check there are survivors
    if(damage < this.caravan.crew) {
        this.caravan.crew -= damage;
        this.notify(`${damage} people were killed running`, 'negative');
    }
    else {
        this.caravan.crew = 0;
        this.notify('Everybody died running away', 'negative');
    }

    //remove event listener
    document.getElementById('runaway').removeEventListener('click');

    //resume journey
    document.getElementById('attack').classList.add('hidden');
    this.game.resumeJourney();

};

//show shop
OregonH.UI.showShop = function(products){

    //get shop area
    var shopDiv = document.getElementById('shop');
    shopDiv.classList.remove('hidden');

    //init the shop just once
    if(!this.shopInitiated) {

        //event delegation
        shopDiv.addEventListener('click', function(e){
            //what was clicked
            var target = e.target || e.src;

            //exit button
            if(target.tagName == 'BUTTON') {
                //resume journey
                shopDiv.classList.add('hidden');
                OregonH.UI.game.resumeJourney();
            }
            else if(target.tagName == 'DIV' && target.className.match(/product/)) {

                OregonH.UI.buyProduct({
                    item: target.getAttribute('data-item'),
                    qty: target.getAttribute('data-qty'),
                    price: target.getAttribute('data-price')
                });

            }
        });

        this.shopInitiated = true;
    }

    //clear existing content
    var prodsDiv = document.getElementById('prods');
    prodsDiv.innerHTML = '';

    //show products
    var product;
    for(var i=0; i < products.length; i++) {
        product = products[i];
        prodsDiv.innerHTML += `<div class="product" data-qty="${product.qty}" data-item="${product.item}" data-price="${product.price} "> ${product.qty}  ${product.item} - $ ${product.price} </div>`;
    }
};

//buy product
OregonH.UI.buyProduct = function(product) {
    //check we can afford it
    if(product.price > OregonH.UI.caravan.money) {
        OregonH.UI.notify('Not enough money', 'negative');
        return false;
    }

    OregonH.UI.caravan.money -= product.price;

    OregonH.UI.caravan[product.item] += +product.qty;

    OregonH.UI.notify('Bought ' + product.qty + ' x ' + product.item, 'positive');

    //update weight
    OregonH.UI.caravan.updateWeight();

    //update visuals
    OregonH.UI.refreshStats();
};


//--- OOP oriented Oregon trail---//

class UI {
    constructor(game) {
        this.game = game;   // Make an instance of the game class
        this.prodsDiv = document.getElementById('prods');   // Setup to update the products div on the maon page
        this.shopDiv = document.getElementById('shop');     // Set up do update the shop that travelers woill buy items and crew from
        this.shopDiv.addEventListener('click', (event) => { // his handles the events to click on and update what youre biying in the  shop
            this.shopDivHandler(event);
        });
    }
    // This function refrreshed the ui stats
    refreshStats () {
        // Destructure some objects for easy access
        const { day, distance, crew, oxen, food, money, firepower, weight, capacity } = this.caravan;
        const { ceil, floor } = Math;   // the math will be utilized to make sure that objects that may be divieded will be rounded up or down

        // modify the dom

        // This is the base stats section for the game that will be displayed for the user in a div window
        document.getElementById('stat-day').innerHTML = `${ceil(day)}`;
        document.getElementById('stat-distance').innerHTML = `${floor(distance)}`;
        document.getElementById('stat-crew').innerHTML = `${crew}`;
        document.getElementById('stat-oxen').innerHTML = `${oxen}`;
        document.getElementById('stat-food').innerHTML = `${ceil(food)}`;
        document.getElementById('stat-money').innerHTML = `${money}`;
        document.getElementById('stat-firepower').innerHTML = `${firepower}`;
        document.getElementById('stat-weight').innerHTML = `${ceil(weight)}/${capacity}`;

        // update caravan position by multipling my a static amound of 380( can be changed for a shorter or longer game) and dividing my distance
        document.getElementById('caravan').style.left = `${(380 * distance / Config.FINAL_DISTANCE)}px`;
    }

    // This notifies and updates the areas that shows the general story  of the game
    notify (message, type) {
        const { ceil } = Math;
        document.getElementById('updates-area').innerHTML = `<div class="update-${type}">Day ${ceil(this.caravan.day)}: ${message}</div>${document.getElementById('updates-area').innerHTML}`;
    }

    //When an attack is triggered
    showAttack (firepower, gold) {
        var attackDiv = document.getElementById('attack');
        attackDiv.classList.remove('hidden');

        // keep properties
        this.firepower = firepower;
        this.gold = gold;

        // show firepower
        document.getElementById('attack-description').innerHTML = `Firepower: ${firepower}`;

        // init once
        if (!this.attackInitiated) {

            // fight
            document.getElementById('fight').addEventListener('click', this.fight.bind(this));

            // run away
            document.getElementById('runaway').addEventListener('click', this.runaway.bind(this));

            this.attackInitiated = true;
        }
    }

        // fight
        fight () {
            console.log('Fight!');

            var firepower = this.firepower;
            var gold = this.gold;

            // damage can be 0 to 2 * firepower
            var damage = Math.ceil(Math.max(0, firepower * 2 * Math.random() - this.caravan.firepower));

            // check there are survivors
            if (damage < this.caravan.crew) {
                this.caravan.crew -= damage;
                this.caravan.money += gold;
                this.notify(`${damage} people were killed fighting`, 'negative');
                this.notify('Found $' + gold, 'gold');
            } else {
                this.game.caravan.crew = 0;
                this.notify('Everybody died in the fight', 'negative');
            }

            // resume journey
            document.getElementById('attack').classList.add('hidden');
            this.game.resumeJourney();
        }

        // runing away from enemy
        runaway (){

            var firepower = this.firepower;

            // damage can be 0 to firepower / 2
            var damage = Math.ceil(Math.max(0, firepower * Math.random()/2));

            // check there are survivors
            if(damage < this.caravan.crew) {
                this.game.caravan.crew -= damage;
                this.notify(`${damage} people were killed running`, 'negative');
            }
            else {
                this.gamge.caravan.crew = 0;
                this.notify('Everybody died running away', 'negative');
            }

            // remove event listener
            // document.getElementById('runaway').removeEventListener('click', this.runaway);

            // resume journey
            document.getElementById('attack').classList.add('hidden');
            this.game.resumeJourney();
        }

        // show shop
        showShop (products)
        {
            console.log('Show Shop!');
            console.log(products)

            // show shop area
            this.shopDiv.classList.remove('hidden');

            // clear existing content
            this.prodsDiv.innerHTML = '';

            //show products
            let product;
            for(let i = 0; i < products.length; i++) {
                product = products[i];
                this.prodsDiv.innerHTML += `<div class="product" data-qty="${product.qty}" data-item="${product.item}" data-price="${product.price}">${product.qty} ${product.item} - $${product.price}</div>`;
            }
        }

        shopDivHandler (e) {
            // what was clicked
            var target = e.target || e.src;

            // exit button
            if (target.tagName == 'BUTTON') {
                //resume journey
                this.shopDiv.classList.add('hidden');
                this.game.resumeJourney();
            } else if (target.tagName == 'DIV' && target.className.match(/product/)) {
                // Buy a Product
                this.buyProduct({
                    item: target.getAttribute('data-item'),
                    qty: Number(target.getAttribute('data-qty')),
                    price: Number(target.getAttribute('data-price'))
                });

            }
        }

        // ----------------------------------
        //buy product
        buyProduct (product)
        {
            const { item, price, qty } = product
            //check we can afford it
            if (price > this.game.caravan.money) {
                this.notify('Not enough money', 'negative');
                return false;
            }

            this.game.caravan.money -= price;

            this.game.caravan[item] += qty;

            this.notify(`Bought ${qty} x ${item}`, 'positive');

            //update weight
            this.game.caravan.updateWeight();

            //update visuals
            this.refreshStats();
        }



}
