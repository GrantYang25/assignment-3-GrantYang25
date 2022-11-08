/*
 * Write your client-side JS code in this file.  Don't forget to include your
 * name and @oregonstate.edu email address below.
 *
 * Name: Grant Yang
 * Email: Yanggra@oregonstate.edu
 */
document.getElementById("filter-update-button").addEventListener("click", updateButton);
document.getElementById("sell-something-button").addEventListener("click", modal);
document.getElementById("modal-accept").addEventListener("click", modalAccept);
document.getElementById("modal-cancel").addEventListener("click", modal);
document.getElementById("modal-close").addEventListener("click", modal);

var posts = [];
var currPost = document.getElementById("posts").firstElementChild;
var size = document.getElementById("posts").childElementCount;
posts.push(currPost);

for (var i = 1; i < size; i++) {
    posts.push(currPost.nextElementSibling);
    currPost = currPost.nextElementSibling;
}

function modal() {

    document.getElementById("post-photo-input").value = "";
    document.getElementById("post-text-input").value = "";
    document.getElementById("post-city-input").value = "";
    document.getElementById("post-price-input").value = "";
    document.getElementById("post-condition-new").checked = true;
    document.getElementById("modal-backdrop").classList.toggle('hidden');
    document.getElementById("sell-something-modal").classList.toggle('hidden');
}

function updateValues() {
    if (document.getElementById("post-text-input").value == ""
        || document.getElementById("post-price-input").value == ""
        || document.getElementById("post-photo-input").value == ""
        || document.getElementById("post-city-input").value == "") {
            return false;
        }
    return true;
}

function modalAccept() {
    if (!updateValues()) {
        alert("Please fill in all entries.");
        return;
    }

    var prevPost = document.getElementById("posts").lastElementChild;
    var copy = prevPost.cloneNode(true);

    var condition = "";
    if (document.getElementById("post-condition-new").checked){
         condition = "new"; 
    }
    else if (document.getElementById("post-condition-excellent").checked){ 
         condition = "excellent"; 
    }
    else if (document.getElementById("post-condition-good").checked){
         condition = "good"; 
    }
    else if (document.getElementById("post-condition-fair").checked) {
         condition = "fair"; 
    }
    else if (document.getElementById("post-condition-poor").checked) {
         condition = "poor"; 
    }

    copy.setAttribute("data-price", document.getElementById("post-price-input").value);
    copy.setAttribute("data-city", document.getElementById("post-city-input").value);
    copy.setAttribute("data-condition", condition);
    copy.firstElementChild.firstElementChild.firstElementChild.setAttribute("src", document.getElementById("post-photo-input").value);
    copy.firstElementChild.firstElementChild.firstElementChild.removeAttribute("alt");
    copy.firstElementChild.lastElementChild.firstElementChild.textContent = document.getElementById("post-text-input").value;
    copy.firstElementChild.lastElementChild.firstElementChild.nextElementSibling.textContent = "$" + document.getElementById("post-price-input").value;
    copy.firstElementChild.lastElementChild.lastElementChild.textContent = "(" + document.getElementById("post-city-input").value + ")";

    var list = document.getElementById("filter-city");
    var cities = list.childElementCount - 1;
    var inputedCity = document.getElementById("post-city-input").value
    var exists = false;

    for (var i = 1; i < cities; i++) {
        var insertedText = document.getElementById("filter-city").children[i].text.toLowerCase();;
        var enteredCity = inputedCity.toLowerCase();
        if (insertedText == enteredCity) {
            exists = true;
            break;
        }
    }

    if (!exists) {
        var element = document.createElement("option");
        var city = inputedCity[0].toUpperCase();
        for(var i = 1; i < inputedCity.length; i++) {
            city += inputedCity[i].toLowerCase();
        }
        element.text = city;
        list.appendChild(element);
    }

    posts.push(copy);

    document.getElementById("posts").appendChild(copy);
}

function updateButton() {
    var text = document.getElementById("filter-text").value.toLowerCase();
    var maxPrice = document.getElementById("filter-max-price").value;
    var minPrice = document.getElementById("filter-min-price").value;
    var city = "";
    var conditions = [];

    var listOfCities = document.getElementById("filter-city");
    var sizeOfList = listOfCities.childElementCount;
    for (var i = 0; i < sizeOfList; i++) {
        if (listOfCities.children[i].selected) {
            city = listOfCities.children[i].text.toLowerCase();
            break;
        }
    }

    var listOfConditions = document.getElementById("filter-condition");
    for (var i = 1; i < 6; i++) {
        if (listOfConditions.children[i].firstElementChild.checked) {
            conditions.push(listOfConditions.children[i].lastElementChild.textContent.toLowerCase());
        }
    }

    var postsElement = document.getElementById("posts");
    var size = postsElement.children.length;
    for (var i = 0; i < size; i++) {
        postsElement.removeChild(postsElement.firstElementChild);
    }

    for (var i = 0; i < posts.length; i++) {
        var element = posts[i];
        var bool = false;
        var conditionBool = false;
        var elementTitle = element.firstElementChild.lastElementChild.firstElementChild.text.toLowerCase();
        var elementPrice = element.getAttribute("data-price");
        var elementCity = element.getAttribute("data-city").toLowerCase();
        var elementCondition = element.getAttribute("data-condition");

        if (elementTitle.search(text) != -1) {
            if (elementCity == city || city == "" || city == "any") {
                for (var j = 0; j < conditions.length; j++) {
                    if (elementCondition == conditions[j]) {
                        conditionBool = true;
                        break;
                    }
                }
                if (conditionBool || conditions.length == 0) {
                    if (minPrice == "" && maxPrice == "") { bool = true; }
                    else if (minPrice != "" && maxPrice == "" && elementPrice >= minPrice) { bool = true; }
                    else if (minPrice == "" && maxPrice != "" && elementPrice <= maxPrice) { bool = true; }
                    else if (elementPrice >= minPrice && elementPrice <= maxPrice) { bool = true; }
                }
            }
        }

        if (bool) {
            postsElement.appendChild(element);
        }
    }
}