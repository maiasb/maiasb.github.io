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

function SectionE() {
    if (document.getElementById("sectionE").style.height == "0px"){
        document.getElementById("sectionE").style.height = "500px"
    }
    else{
        document.getElementById("sectionE").style.height = "0px"
    }
}

function SectionC() {
    if (document.getElementById("sectionC").style.height == "0px"){
        document.getElementById("sectionC").style.height = "500px"
    }
    else{
        document.getElementById("sectionC").style.height = "0px"
    }
}

function SectionD() {
    if (document.getElementById("sectionD").style.height == "0px"){
        document.getElementById("sectionD").style.height = "500px"
    }
    else{
        document.getElementById("sectionD").style.height = "0px"
    }
}