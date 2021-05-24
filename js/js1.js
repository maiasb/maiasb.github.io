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

function OpenAtual() {
    if (document.getElementById("sectionAtual").style.height == "0px"){
        document.getElementById("sectionAtual").style.height = "500px"
        document.getElementById("bta").style.backgroundColor = "#527d68";
        document.getElementById("atualmente").hidden = false
    }
    else{
        document.getElementById("sectionAtual").style.height = "0px"
        document.getElementById("bta").style.backgroundColor = "#81b29a";
        document.getElementById("atualmente").hidden = true
    }
}

function OpenEducacao() {
    if (document.getElementById("sectionEducacao").style.height == "0px"){
        document.getElementById("sectionEducacao").style.height = "500px"
        document.getElementById("bte").style.backgroundColor = "#527d68";
        document.getElementById("educacao").hidden = false
    }
    else{
        document.getElementById("sectionEducacao").style.height = "0px"
        document.getElementById("bte").style.backgroundColor = "#81b29a";
        document.getElementById("educacao").hidden = true
    }
}

function OpenD() {
    if (document.getElementById("sectionD").style.height == "0px"){
        document.getElementById("sectionD").style.height = "500px"
        document.getElementById("btd").style.backgroundColor = "#527d68";
        document.getElementById("teste").hidden = false
    }
    else{
        document.getElementById("sectionD").style.height = "0px"
        document.getElementById("btd").style.backgroundColor = "#81b29a";
        document.getElementById("teste").hidden = true
    }
}