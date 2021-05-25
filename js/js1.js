// BOTÃO PARA ABRIR E FECHAR SIDEBAR; ANIMAÇÃO DO BOTÃO;
function SideBar() {
    if (document.getElementById("sidebar").style.height == "0px") {
        document.getElementById("sidebar").style.height = "250px"

        let el = document.getElementById('btn-click');
        el.classList.remove('btn-click');
        el.classList.add('btn-click2');

    }
    else {
        document.getElementById("sidebar").style.height = "0px"

        let el = document.getElementById('btn-click');
        el.classList.remove('btn-click2');
        el.classList.add('btn-click');
    }
}

// BOTÃO PARA ABRIR A SECTION "ATUALMENTE"
function OpenAtual() {
    if (document.getElementById("sectionAtual").style.height == "0px") {
        document.getElementById("sectionAtual").style.height = "500px"
        document.getElementById("bta").style.backgroundColor = "#527d68";
        document.getElementById("atualmente").hidden = false

        document.getElementById("sectionAtual").style.paddingTop = "20px";
    }
    else {
        document.getElementById("sectionAtual").style.height = "0px"
        document.getElementById("bta").style.backgroundColor = "#81b29a";
        document.getElementById("atualmente").hidden = true

        document.getElementById("sectionAtual").style.paddingTop = "0px";
    }
}

// BOTÃO PARA ABRIR A SECTION "EDUCAÇÃO"
function OpenEducacao() {
    if (document.getElementById("sectionEducacao").style.height == "0px") {
        document.getElementById("sectionEducacao").style.height = "500px"
        document.getElementById("bte").style.backgroundColor = "#527d68";
        document.getElementById("educacao").hidden = false
    }
    else {
        document.getElementById("sectionEducacao").style.height = "0px"
        document.getElementById("bte").style.backgroundColor = "#81b29a";
        document.getElementById("educacao").hidden = true
    }
}

// BOTÃO PARA ABRIR A SECTION "CERTIFICADOS"
function OpenD() {
    if (document.getElementById("sectionCert").style.height == "0px") {
        document.getElementById("sectionCert").style.height = "500px"
        document.getElementById("btc").style.backgroundColor = "#527d68";
        document.getElementById("teste").hidden = false
    }
    else {
        document.getElementById("sectionCert").style.height = "0px"
        document.getElementById("btc").style.backgroundColor = "#81b29a";
        document.getElementById("teste").hidden = true
    }
}