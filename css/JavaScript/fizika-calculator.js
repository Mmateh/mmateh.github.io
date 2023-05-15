function szamitas_seb() {
    var v = document.getElementById("seb_v").value;
    var s = document.getElementById("seb_s").value;
    var t = document.getElementById("seb_t").value;
    var kitoltott = 0;
    if (v != "") { kitoltott++; }
    if (s != "") { kitoltott++; }
    if (t != "") { kitoltott++; }
    if (kitoltott != 2) {
        alert("Pontosan két mezőt kell kitölteni!")
        on_seb()
    }
    else if (v == "") {
        v = s / t;
        document.getElementById("seb_v").value = v
        off_seb()
    }
    else if (s == "") {
        s = v * t;
        document.getElementById("seb_s").value = s
        off_seb()
    }
    else {
        t = s / v;
        document.getElementById("seb_t").value = t
        off_seb()
    }
}
function off_seb() {
    document.getElementById("seb_v").disabled = true;
    document.getElementById("seb_s").disabled = true;
    document.getElementById("seb_t").disabled = true;
}
function on_seb() {
    document.getElementById("seb_v").disabled = false;
    document.getElementById("seb_s").disabled = false;
    document.getElementById("seb_t").disabled = false;
    document.getElementById("seb_v").value = "";
    document.getElementById("seb_s").value = "";
    document.getElementById("seb_t").value = "";
}


function szamitas_gyors() {
    var a = document.getElementById("gyors_a").value;
    var v = document.getElementById("gyors_v").value;
    var t = document.getElementById("gyors_t").value;
    var kitoltott = 0;
    if (a != "") { kitoltott++; }
    if (v != "") { kitoltott++; }
    if (t != "") { kitoltott++; }
    if (kitoltott != 2) {
        alert("Pontosan két mezőt kell kitölteni!")
        on_gyors()
    }
    else if (v == "") {
        a = v / t;
        document.getElementById("gyors_a").value = a
        off_gyors()
    }
    else if (s == "") {
        v = a * t;
        document.getElementById("gyors_v").value = v
        off_gyors()
    }
    else {
        t = v / a;
        document.getElementById("gyors_t").value = t
        off_gyors()
    }
}
function off_gyors() {
    document.getElementById("gyors_a").disabled = true;
    document.getElementById("gyors_v").disabled = true;
    document.getElementById("gyors_t").disabled = true;
}
function on_gyors() {
    document.getElementById("gyors_a").disabled = false;
    document.getElementById("gyors_v").disabled = false;
    document.getElementById("gyors_t").disabled = false;
    document.getElementById("gyors_a").value = "";
    document.getElementById("gyors_v").value = "";
    document.getElementById("gyors_t").value = "";
}


function szamitas_szab() {
    var v = document.getElementById("szab_v").value;
    var t = document.getElementById("szab_t").value;
    var s = document.getElementById("szab_s").value;
    var g = 10;
    var kitoltott = 0;
    if (v != "") { kitoltott++; }
    if (t != "") { kitoltott++; }
    if (s != "") { kitoltott++; }
    if (kitoltott != 1) {
        alert("Pontosan egy mezőt kell kitölteni!");
        on_szab()
    }
    else if (s == "" && v == "") {
        s = 0.5 * g * Math.pow(t, 2);
        document.getElementById("szab_s").value = s;
        v = g * t;
        document.getElementById("szab_v").value = v;
        off_szab()
    }
    else if (s == "" && t == "") {
        t = v / g;
        document.getElementById("szab_t").value = t;
        s = 0.5 * g * Math.pow(t, 2);
        document.getElementById("szab_s").value = s;
        off_szab()
    }
    else {
        t = Math.sqrt(s / (0.5 * g));
        document.getElementById("szab_t").value = t;
        v = g * t;
        document.getElementById("szab_v").value = v;
        off_szab()
    }
}
function off_szab() {
    document.getElementById("szab_v").disabled = true;
    document.getElementById("szab_t").disabled = true;
    document.getElementById("szab_s").disabled = true;
}
function on_szab() {
    document.getElementById("szab_v").disabled = false;
    document.getElementById("szab_t").disabled = false;
    document.getElementById("szab_s").disabled = false;
    document.getElementById("szab_v").value = "";
    document.getElementById("szab_t").value = "";
    document.getElementById("szab_s").value = "";
}