function Search(){
    if(document.baseURI.includes("t%C3%B6ri.html")){
        var all = document.getElementById("pdfselector").innerHTML;
        var query = document.getElementById("keres").value;
        const Arr = Array.from(all.matchAll(query))
        if(Arr.length <= 10){
            alert(Arr)
        }
    }
}