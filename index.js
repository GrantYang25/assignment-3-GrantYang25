/*
 * Write your client-side JS code in this file.  Don't forget to include your
 * name and @oregonstate.edu email address below.
 *
 * Name: Grant Yang
 * Email: Yanggra@oregonstate.edu
 */
document.getElementById("filter-update-button").addEventListener("click");
document.getElementById("sell-something-button").addEventListener("click", modal);
document.getElementById("modal-accept").addEventListener("click",modalAccept);
document.getElementById("modal-cancel").addEventListener("click", modal);
document.getElementById("modal-close").addEventListener("click", modal);

function modal(){
    document.getElementById("post-photo-input"). value = "";
    document.getElementById("post-price-input").value = "";
    document.getElementById("post-text-input").value = "";
    document.getElementById("post-city-input").value = "";
    document.getElementById("post-conditon-new").checked = true;
    document.getElementById("modal-backdrop").classList.toggle('hidden');
    document.getElementById("sell-something-modal").classList.toggle('hidden');
}
function checkValues(){
    if ((document.getElementById("post-photo-input").value == "") || (document.getElementById("post-price-input").value == "") || (document.getElementById("post-text-input").value == "") || (document.getElementById("post-city-input").value == "")){
        return false;
    }
    return true;
}

function modalAccept(){
    if(!checkValues()){
        console.log("entries are empty");
        return;
    }

    var prevPost = document.getElementById("posts").lastElementChild;
    var copy = prevPost.cloneNode(true);

    var condition = "";
    if (document.getElementById("post-condition-new").checked){
        condition = "new";
    }
    else if(document.getElementById("post-condition-excellent").checked){
        condition = "excellent";
    }
    else if(document.getElementById("post-condition-good").checked){
        condition = "good";
    }
    else if(document.getElementById("post-condition-fair").checked){
        condition = "fair";
    }
    else if(document.getElementById("post-condition-poor").checked){
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
}

