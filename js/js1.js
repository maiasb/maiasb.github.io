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
        document.getElementById("bte").style.backgroundColor = "#527d68";
        document.getElementById("teste").hidden = false
    }
    else{
        document.getElementById("sectionE").style.height = "0px"
        document.getElementById("bte").style.backgroundColor = "#81b29a";
        document.getElementById("teste").hidden = true
    }
}

function SectionC() {
    if (document.getElementById("sectionC").style.height == "0px"){
        document.getElementById("sectionC").style.height = "500px"
        document.getElementById("btc").style.backgroundColor = "#527d68";
    }
    else{
        document.getElementById("sectionC").style.height = "0px"
        document.getElementById("btc").style.backgroundColor = "#81b29a";
    }
}

function SectionD() {
    if (document.getElementById("sectionD").style.height == "0px"){
        document.getElementById("sectionD").style.height = "500px"
        document.getElementById("btd").style.backgroundColor = "#527d68";
    }
    else{
        document.getElementById("sectionD").style.height = "0px"
        document.getElementById("btd").style.backgroundColor = "#81b29a";
    }
}