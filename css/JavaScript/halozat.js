function hostname() {
    var copyTextHostname = document.getElementById("hostname");
    copyTextHostname.select();
    copyTextHostname.setSelectionRange(0, 100);
    navigator.clipboard.writeText("hostname "+copyTextHostname.value);
}
function domainlookup() {
    navigator.clipboard.writeText("no ip domain-lookup");
}
function password() {
    var copyTextPassword = document.getElementById("password");
    copyTextPassword.select();
    copyTextPassword.setSelectionRange(0, 100);
    navigator.clipboard.writeText("enable password "+copyTextPassword.value);
}
function configpswd() {
    var copyTextConfigpswd = document.getElementById("configpswd");
    copyTextConfigpswd.select();
    copyTextConfigpswd.setSelectionRange(0, 100);
    navigator.clipboard.writeText("enable secret "+copyTextConfigpswd.value);
}
function telnetpswd() {
    var copyTextTelnetpswd = document.getElementById("telnetpswd");
    copyTextTelnetpswd.select();
    copyTextTelnetpswd.setSelectionRange(0, 100);
    navigator.clipboard.writeText("line vty 0 15\npassword "+copyTextTelnetpswd.value+"\nlogin");
}
function consolpswd() {
    var copyTextConsolpswd = document.getElementById("consolpswd");
    copyTextConsolpswd.select();
    copyTextConsolpswd.setSelectionRange(0, 100);
    navigator.clipboard.writeText("line console 0\npassword "+copyTextConsolpswd.value+"\nlogin");
}
function pswdencryption() {
    navigator.clipboard.writeText("service password-encryption");
}
function banner() {
    var copyTextBanner = document.getElementById("banner");
    copyTextBanner.select()
    copyTextBanner.setSelectionRange(0, 100);
    navigator.clipboard.writeText('banner motd "'+copyTextBanner.value+'"')
}