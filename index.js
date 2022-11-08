/*
 * Write your client-side JS code in this file.  Don't forget to include your
 * name and @oregonstate.edu email address below.
 *
 * Name: Grant Yang
 * Email: Yanggra@oregonstate.edu
 */
document.getElementById("filter-update-button").addEventListener("click");
document.getElementById("sell-something-button").addEventListener("click", modal);
document.getElementById("modal-accept").addEventListener("click");
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

