function Search(){
    if("töri" in document.baseURI){
        var all = document.getElementById("pdfselector").innerHTML;
        var query = document.getElementById("keres").value;
        if(query in all){
            alert("Success")
        }
        else{
            alert("Nincs találat")
        }
    }
}