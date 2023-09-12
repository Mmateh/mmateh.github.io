function Search(){
    if(document.baseURI.includes("t%C3%B6ri.html")){
        var all = document.getElementById("pdfselector").innerHTML;
        var query = document.getElementById("keres").value;
        const matchit = Array.from(all.matchAll(query));
        if(matchit.length <= 10){
            const Arr = Array.from(all.matchAll("<option"));
            console.log(Arr)
            var many = []
            var result = []
            var count = 0
            var item = NaN
            var name = NaN
            var items = NaN
            for(let cunt=1;cunt<=Arr.length;cunt++){
                items = all.slice(all.indexOf("<option", count)+7, all.indexOf("/option>", count))
                count = all.indexOf("</option>", count)+9
                item = items.slice(items.indexOf('value="')+7, items.indexOf('">', items.indexOf('value="')+6)).toString()
                name = items.slice(items.indexOf('>')+1, items.indexOf('<')).toString()
                many.push({"name":name, "id":item})
        }
        for(let cunt=0;cunt<many.length;cunt++){
            console.log(cunt)
            console.log(many[cunt].name)
            if(many[cunt].name.includes(query)){
                result.push({"name":many[cunt].name, "id":many[cunt].id})
            }
        }
        }
    }
}