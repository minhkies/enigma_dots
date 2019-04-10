var username = document.querySelector(".username"),
    dimmer = document.querySelector(".fade"),
    inpName = document.querySelector(".inp_name"),
    txtName = document.querySelector(".txt_name"),
    txtGreeting = document.querySelector(".txt_greeting"),
    txtWhatsup = document.querySelector(".whatsup"),
    modeOption = document.querySelector(".mode_option"),
    normal = document.querySelector(".normal_mode"),
    hard = document.querySelector(".hard_mode");

function userCheck() {
    if (localStorage.name == null) {
        dimmer.style.visibility = "visible";
        dimmer.style.opacity = "1";
        username.style.visibility = "visible";
        username.style.opacity = "1";
    } else {
        dimmer.style.visibility = "hidden";
        dimmer.style.opacity = "0";
        username.style.visibility = "hidden";
        username.style.opacity = "0";
        txtName.innerHTML = localStorage.name;
        txtGreeting.style.opacity = "1";
        txtWhatsup.style.opacity = "1";
    }
}

function saveUsername() {
    if (inpName.value != "") {
        localStorage.name = inpName.value;
        userCheck();
    }
}

function popUpOps(event) {
    if (localStorage.mode != "hard") {
        normal.style.fontWeight = "bold";
        hard.style.fontWeight = "normal";
    } else {
        normal.style.fontWeight = "normal";
        hard.style.fontWeight = "bold";
    }

    if (localStorage.winCount != 1) {
        hard.style.color = "gray";
        hard.style.pointerEvents = "none";
        hard.style.cursor = "normal";
    }
    modeOption.style.visibility = "visible";
    modeOption.style.opacity = "1";
    event.stopPropagation();
}

window.addEventListener("click", function() {
    if (modeOption.style.visibility == "visible") {
        modeOption.style.visibility = "hidden";
        modeOption.style.opacity = "0";
    }
})

function mode(value) {
    localStorage.mode = value;
}