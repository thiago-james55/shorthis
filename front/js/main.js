var enterLinkinput = document.getElementById("enterlink");
var submitButton = document.getElementById("submit");
var toastyMessageDiv = document.getElementById("toastyMessage");

submitButton.addEventListener("click", function() {
    console.log("hovering");
});

enterLinkinput.addEventListener("change", function() {
    
    if (enterLinkinput.value.length > 5) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
        showToasty();
    }
    
});

function showToasty() {

    var toastyMessage = document.getElementById("toastyMessage");
  

    toastyMessage.className = "show";
 
    setTimeout(function(){ toastyMessage.className = toastyMessage.className.replace("show", ""); }, 3000);

  }