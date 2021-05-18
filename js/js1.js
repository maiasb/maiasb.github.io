function OpenSideBar() {
    console.log("Hello!")
    if (document.getElementById("sidebar").style.width == "0px") {
        document.getElementById("sidebar").style.width = "250px";
    }
    else {
        document.getElementById("sidebar").style.width = "0px"
    }
}