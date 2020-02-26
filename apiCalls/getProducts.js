let unirest = require("unirest");
let _ = require('lodash');
let products = {};
let query;

function getProduct(query) {
    console.log(query);
    let id = new Promise(function (result) {
        let req = unirest("GET", "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/products/search");
        let idReturn = 0;
        this.query = query;

        req.query({
            "offset": "0",
            "number": "10",
            "maxCalories": "5000",
            "minProtein": "0",
            "maxProtein": "100",
            "minFat": "0",
            "maxFat": "100",
            "minCarbs": "0",
            "maxCarbs": "100",
            "minCalories": "0",
            "query": this.query
        });

        req.headers({
            "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            "x-rapidapi-key": "7X0MNUFnWRmshxYgMbgWqlOFnZwcp1lyo5tjsnGS7k2WclVBNw"
        });


        req.end(function (res) {
            if (res.error) throw new Error(res.error);
            idReturn = res.body.products[0].id;
            result(idReturn);
        })
        return idReturn;
    });

    function getProduct(id) {
        let req = unirest("GET", `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/products/${id}`);

        req.headers({
            "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            "x-rapidapi-key": "7X0MNUFnWRmshxYgMbgWqlOFnZwcp1lyo5tjsnGS7k2WclVBNw"
        });

        req.end(function (res) {
            if (res.error) throw new Error(res.error);

            products = res.body.badges;
            console.log(products)
            // return module.exports.result = products;
        });

    }

    id.then(function (value) {
        getProduct(value)
    });
}
function checkNull(query) {
    if (!_.isUndefined(query)) {
        getProduct(query);
    } else {
        console.log('please enter a valid search query');
    }
    return 'check';
}

module.exports.query = query;
