function SideBar() {
    if (document.getElementById("sidebar").style.width == "0px") {
        document.getElementById("sidebar").style.height = "250px"
        document.getElementById("sidebar").style.width = "250px"

        // setTimeout(() => {
        //     document.getElementById("sidebar").style.transition = "0.5s"
        //     document.getElementById("sidebar").style.width = "250px"
        // }, 50);

    }
    else {
        document.getElementById("sidebar").style.width = "0px"
        document.getElementById("sidebar").style.height = "0px"

        // setTimeout(() => {
        //     document.getElementById("sidebar").style.transition = "0.5s"
        //     document.getElementById("sidebar").style.height = "0px"
        // }, 50);
    }
}

function OpenEduc() {
    console.log("Hello!")
}