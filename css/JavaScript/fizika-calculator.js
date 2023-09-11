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
    else if (a == "") {
        a = v / t;
        document.getElementById("gyors_a").value = a
        off_gyors()
    }
    else if (v == "") {
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



function szamitas_test() {
    var G = document.getElementById("test_G").value;
    var m = document.getElementById("test_m").value;
    var g = 10;
    var kitoltott = 0;    
    if (G!="") {kitoltott++;}
    if (m!="") {kitoltott++;}              
    if (kitoltott!=1) {
        alert("Pontosan egy mezőt kell kitölteni!")
        on_test()
    }
    else if (G=="") {                    
        G = m*g;
        document.getElementById("test_G").value = G;
        off_test()
    }
    else if (m=="") {
        m = G/g;
        document.getElementById("test_m").value = m;
        off_test()
    }
}
function off_test() {
    document.getElementById("test_G").disabled = true;
    document.getElementById("test_m").disabled = true;
}     
function on_test() {
    document.getElementById("test_G").disabled = false;
    document.getElementById("test_m").disabled = false;                   
    document.getElementById("test_G").value = "";
    document.getElementById("test_m").value = "";
}



function szamitas_mech() {
    var W = document.getElementById("mech_W").value;
    var F = document.getElementById("mech_F").value;
    var s = document.getElementById("mech_s").value;
    var kitoltott = 0;    
    if (W!="") {kitoltott++;}
    if (F!="") {kitoltott++;}
    if (s!="") {kitoltott++;}                   
    if (kitoltott!=2) {
        alert("Pontosan két mezőt kell kitölteni!")
        on_mech()}
    else if (s=="") {                    
        s = W/F;                   
        document.getElementById("mech_s").value = s
        off_mech()}
    else if (W=="") {
        W = s*F;
        document.getElementById("mech_W").value = W
        off_mech()}
    else {
        F = W/s;
        document.getElementById("mech_F").value = F
        off_mech()}}
function off_mech() {
    document.getElementById("mech_W").disabled = true;
    document.getElementById("mech_F").disabled = true;
    document.getElementById("mech_s").disabled = true;}           
function on_mech() {                   
    document.getElementById("mech_W").disabled = false;
    document.getElementById("mech_F").disabled = false;
    document.getElementById("mech_s").disabled = false;                   
    document.getElementById("mech_W").value = "";
    document.getElementById("mech_F").value = "";
    document.getElementById("mech_s").value = "";}



function szamitas_telj() {
    var P = document.getElementById("telj_P").value;
    var W = document.getElementById("telj_W").value;
    var t = document.getElementById("telj_t").value;
    var kitoltott = 0;    
    if (P!="") {kitoltott++;}
    if (W!="") {kitoltott++;}
    if (t!="") {kitoltott++;}                   
    if (kitoltott!=2) {
        alert("Pontosan két mezőt kell kitölteni!")
        on_telj()}
    else if (t=="") {                    
        t = W/P;
        document.getElementById("telj_t").value = t
        off_telj()}
    else if (P=="") {
        P = W/t;
        document.getElementById("telj_P").value = P
        off_telj()}
    else {
        W = P*t;
        document.getElementById("telj_W").value = W
        off_telj()}}
function off_telj() {
    document.getElementById("telj_P").disabled = true;
    document.getElementById("telj_W").disabled = true;
    document.getElementById("telj_t").disabled = true;}           
function on_telj() {                   
    document.getElementById("telj_P").disabled = false;
    document.getElementById("telj_W").disabled = false;
    document.getElementById("telj_t").disabled = false;                   
    document.getElementById("telj_P").value = "";
    document.getElementById("telj_W").value = "";
    document.getElementById("telj_t").value = "";}



function szamitas_hely() {
    var E = document.getElementById("hely_E").value;
    var m = document.getElementById("hely_m").value;
    var g = 10;
    var h = document.getElementById("hely_h").value;
    var kitoltott = 0;
    if (E!="") {kitoltott++;}
    if (m!="") {kitoltott++;}
    if (h!="") {kitoltott++;}
    if (kitoltott!=2) {
        alert("Pontosan két mezőt kell kitölteni!")
        on_hely()}
    else if (h=="") {
        h = E/(m*g);
        document.getElementById("hely_h").value = h
        off_hely()}
    else if (E=="") {
        E = h*m*g;
        document.getElementById("hely_E").value = E
        off_hely()}
    else {
        m = E/(h*g);
        document.getElementById("hely_m").value = m
        off_hely()}}
function off_hely() {
    document.getElementById("hely_E").disabled = true;
    document.getElementById("hely_m").disabled = true;
    document.getElementById("hely_h").disabled = true;}
function on_hely() {
    document.getElementById("hely_E").disabled = false;
    document.getElementById("hely_m").disabled = false;
    document.getElementById("hely_h").disabled = false;
    document.getElementById("hely_E").value = "";
    document.getElementById("hely_m").value = "";
    document.getElementById("hely_h").value = "";}



function szamitas_mozg() {
    var E = document.getElementById("mozg_E").value;
    var m = document.getElementById("mozg_m").value;
    var idk = 0.5;
    var v = document.getElementById("mozg_v").value;
    var kitoltott = 0;
    if (E!="") {kitoltott++;}
    if (m!="") {kitoltott++;}
    if (v!="") {kitoltott++;}
    if (kitoltott!=2) {
        alert("Pontosan két mezőt kell kitölteni!")
        on_mozg()}
    else if (v=="") {
        v = Math.sqrt(E/(m*idk));
        document.getElementById("mozg_v").value = v
        off_mozg()}
    else if (E=="") {
        E = (v*v)*m*idk;
        document.getElementById("mozg_E").value = E
        off_mozg()}
    else {
        m = E/((v*v)*idk);
        document.getElementById("mozg_m").value = m
        off_mozg()}}
function off_mozg() {
    document.getElementById("mozg_E").disabled = true;
    document.getElementById("mozg_m").disabled = true;
    document.getElementById("mozg_v").disabled = true;}
function on_mozg() {
    document.getElementById("mozg_E").disabled = false;
    document.getElementById("mozg_m").disabled = false;
    document.getElementById("mozg_v").disabled = false;
    document.getElementById("mozg_E").value = "";
    document.getElementById("mozg_m").value = "";
    document.getElementById("mozg_v").value = "";}



function szamitas_new() {
    var F = document.getElementById("new_F").value;
    var m1 = document.getElementById("new_m1").value;
    var m2 = document.getElementById("new_m2").value;
    var r = document.getElementById("new_r").value;
    var K = 6.67 * Math.pow(10, -11)
    var kitoltott = 0;
    if (F!="") {kitoltott++;}
    if (m1!="") {kitoltott++;}
    if (m2!="") {kitoltott++;}
    if (r!="") {kitoltott++;}
    if (kitoltott!=3) {
        alert("Pontosan három mezőt kell kitölteni!")
        on_new()}
    else if (F=="") {
        F = u/i;
        document.getElementById("new_r").value = r
        off_new()}
    else if (m1=="") {
        u = r*i;
        document.getElementById("new_F").value = u
        off_new()}
    else if (m2==""){
        i = u/r;
        document.getElementById("new_m1").value = i
        off_new()}
    else {
        
    }
    }
function off_new() {
    document.getElementById("new_F").disabled = true;
    document.getElementById("new_m1").disabled = true;
    document.getElementById("new_r").disabled = true;}
function on_new() {
    document.getElementById("new_F").disabled = false;
    document.getElementById("new_m1").disabled = false;
    document.getElementById("new_r").disabled = false;
    document.getElementById("new_F").value = "";
    document.getElementById("new_m1").value = "";
    document.getElementById("new_r").value = "";}