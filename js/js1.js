function OpenSideBar() {
    if (document.getElementById("sidebar").style.width == "0px") {
        document.getElementById("sidebar").style.width = "250px";
        // document.getElementById("sidebar").style.height = "250px";
    }
    else {
        document.getElementById("sidebar").style.width = "0px"
        // document.getElementById("sidebar").style.height = "0px" 
    }
}

function OpenEduc() {
    console.log("Hello!")
}