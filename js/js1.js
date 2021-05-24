function SideBar() {
    if (document.getElementById("sidebar").style.width == "0px") {
        document.getElementById("sidebar").style.height = "250px"
        document.getElementById("sidebar").style.width = "250px"

        let el = document.getElementById('btn-click');
        el.classList.remove('btn-click');
        el.classList.add('btn-click2');

    }
    else {
        document.getElementById("sidebar").style.width = "0px"
        document.getElementById("sidebar").style.height = "0px"

        let el = document.getElementById('btn-click');
        el.classList.remove('btn-click2');
        el.classList.add('btn-click');
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