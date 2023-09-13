function Search(){
    if(document.baseURI.includes("t%C3%B6ri.html")){
        var all = document.getElementById("pdfselector").innerHTML;
        var query = document.getElementById("keres").value;
        const matchit = Array.from(all.matchAll(query));
        for(let cunt=1;cunt<=45;cunt++){
            document.getElementById("opt"+cunt).style = "display:block;";
            document.getElementById("pdfselector").size = false;
        }
        if(matchit.length <= 10){
            const Arr = Array.from(all.matchAll("<option"));
            var many = [];
            var result = [];
            var count = 0;
            var item = NaN;
            var name = NaN;
            var items = NaN;
            for(let cunt=1;cunt<=Arr.length;cunt++){
                items = all.slice(all.indexOf("<option", count)+7, all.indexOf("/option>", count));
                count = all.indexOf("</option>", count)+9;
                item = items.slice(items.indexOf('value="')+7, items.indexOf('" i')).toString();
                name = items.slice(items.indexOf('>')+1, items.indexOf('<')).toString();
                many.push({"name":name, "id":item});
        }
        for(let cunt=0;cunt<many.length;cunt++){
            if(many[cunt].name.includes(query)){
                result.push({"name":many[cunt].name, "id":many[cunt].id});
                console.log(result);
            }
        }
        document.getElementById("pdfselector").size = result.length.toString();
        for(let cunt=0;cunt<many.length;cunt++){
            for(let count=0;count<result.length;count++){
                if(many[cunt].name==result[count].name){
                    cunt++;
                    count=0;
                }
                else{
                    if((result.length-count)==1){
                        document.getElementById("opt"+many[cunt].id).style = "display:none;";
                    }
                }
        }
        }
        }
    }
}