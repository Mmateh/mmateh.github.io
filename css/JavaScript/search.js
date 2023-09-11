function Search(){
    if(document.baseURI.includes("t%C3%B6ri.html")){
        var all = document.getElementById("pdfselector").innerHTML;
        var query = document.getElementById("keres").value;
        const matchit = Array.from(all.matchAll(query));
        if(matchit.length <= 10){
            const Arr = Array.from(all.matchAll("<option"));
            console.log(Arr)
            var many = []
            var count = 0
            var item = NaN
            var name = NaN
            var items = NaN
            for(let cunt=1;cunt<=Arr.length;cunt++){
                console.log(cunt)
                items = all.slice(all.indexOf("<option", count)+7, all.indexOf("/option>", count))
                count = all.indexOf("</option>", count)+9
                console.log(count)
                item = items.slice(items.indexOf('value="')+7, items.indexOf('">', items.indexOf('value="')+6)).toString()
                name = items.slice(items.indexOf('>'), items.indexOf('<')).toString()
                console.log(item)
                console.log(name)
                many.push({"name":name, "id":item})
        }
        for(let cunt=0;cunt<=many.length;cunt++){
            if(query in many[cunt].name){
                var result = document.getElementById("result").innerHTML;
                result = "<h3>"+many[cunt].name+"</h3>"
                document.getElementById("result").innerHTML = result
            }
        }
        }
    }
}