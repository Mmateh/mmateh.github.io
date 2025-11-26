function hostname() {
    var Hostname = document.getElementById("hostname");
    Hostname.select();
    Hostname.setSelectionRange(0, 100);
    navigator.clipboard.writeText("hostname "+Hostname.value);
}
function domainlookup() {
    navigator.clipboard.writeText("no ip domain-lookup");
}
function password() {
    var Password = document.getElementById("password");
    Password.select();
    Password.setSelectionRange(0, 100);
    navigator.clipboard.writeText("enable password "+Password.value);
}
function configpswd() {
    var Configpswd = document.getElementById("configpswd");
    Configpswd.select();
    Configpswd.setSelectionRange(0, 100);
    navigator.clipboard.writeText("enable secret "+Configpswd.value);
}
function telnetpswd() {
    var Telnetpswd = document.getElementById("telnetpswd");
    Telnetpswd.select();
    Telnetpswd.setSelectionRange(0, 100);
    navigator.clipboard.writeText("line vty 0 15\npassword "+Telnetpswd.value+"\nlogin");
}
function consolpswd() {
    var Consolpswd = document.getElementById("consolpswd");
    Consolpswd.select();
    Consolpswd.setSelectionRange(0, 100);
    navigator.clipboard.writeText("line console 0\npassword "+Consolpswd.value+"\nlogin");
}
function pswdencryption() {
    navigator.clipboard.writeText("service password-encryption");
}
function banner() {
    var Banner = document.getElementById("banner");
    Banner.select()
    Banner.setSelectionRange(0, 100);
    navigator.clipboard.writeText('banner motd "'+Banner.value+'"')
}
function ip4() {
    var Ip4int = document.getElementById("ip4int")
    var Ip4addr = document.getElementById("ip4addr")
    var Ip4mask = document.getElementById("ip4mask")
    var Ip4desc = document.getElementById("ip4desc")
    const descvalue = Ip4desc.value.trim();
    Ip4int.select();
    Ip4int.setSelectionRange(0, 100);
    Ip4addr.select();
    Ip4addr.setSelectionRange(0, 100);
    Ip4mask.select();
    Ip4mask.setSelectionRange(0, 100);
    Ip4desc.select();
    Ip4desc.setSelectionRange(0, 500);
    if (descvalue == "") {
        navigator.clipboard.writeText("interface "+Ip4int.value+"\nip address "+Ip4addr.value+" "+Ip4mask.value+"\nno shutdown");
        } 
    else {
        navigator.clipboard.writeText("interface "+Ip4int.value+"\nip address "+Ip4addr.value+" "+Ip4mask.value+"\nno shutdown"+"\ndescription "+Ip4desc.value);
        }
}
function dhcp() {
    var Dhcp = document.getElementById("dhcpname")
    var Dhcpaddr = document.getElementById("dhcpaddr")
    var Dhcpmask = document.getElementById("dhcpmask")
    var Dhcpnet = document.getElementById("dhcpnet")
    var Dhcpdns = document.getElementById("dhcpdns")
    var Dhcpexcip1 = document.getElementById("dhcpexcip1")
    var Dhcpexcip2 = document.getElementById("dhcpexcip2")
    const dhcpdnsvalue = Dhcpdns.value.trim();
    const dhcpexcip1value = Dhcpexcip1.value.trim();
    Dhcp.select();
    Dhcp.setSelectionRange(0, 100);
    Dhcpaddr.select();
    Dhcpaddr.setSelectionRange(0, 100);
    Dhcpmask.select();
    Dhcpmask.setSelectionRange(0, 100);
    Dhcpnet.select();
    Dhcpnet.setSelectionRange(0, 100);
    Dhcpdns.select();
    Dhcpdns.setSelectionRange(0, 100);
    Dhcpexcip1.select();
    Dhcpexcip1.setSelectionRange(0, 100);
    Dhcpexcip2.select();
    Dhcpexcip2.setSelectionRange(0, 100);
    if (dhcpdnsvalue == "" && dhcpexcip1value != "") {
        navigator.clipboard.writeText("ip dhcp pool "+Dhcp.value+"\nnetwork "+Dhcpaddr.value+" "+Dhcpmask.value+"\ndefault-router "+Dhcpnet.value+"\nip dhcp excluded-address "+Dhcpexcip1.value+" "+Dhcpexcip2.value);
        }
    else if (dhcpdnsvalue != "" && dhcpexcip1value == "") {
        navigator.clipboard.writeText("ip dhcp pool "+Dhcp.value+"\nnetwork "+Dhcpaddr.value+" "+Dhcpmask.value+"\ndefault-router "+Dhcpnet.value+"\ndns-address "+Dhcpdns.value);
        }
    else {
        navigator.clipboard.writeText("ip dhcp pool "+Dhcp.value+"\nnetwork "+Dhcpaddr.value+" "+Dhcpmask.value+"\ndefault-router "+Dhcpnet.value+"\ndns-address "+Dhcpdns.value+"\nip dhcp excluded-address "+Dhcpexcip1.value+" "+Dhcpexcip2.value);
    }
}
function dhcpoff() {
    navigator.clipboard.writeText("no service dhcp");
}
function dhcpon() {
    navigator.clipboard.writeText("service dhcp");
}