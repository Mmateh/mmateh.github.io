function Search(){
    if(document.baseURI.includes("t%C3%B6ri.html")){
        var all = document.getElementById("pdfselector").innerHTML;
        var query = document.getElementById("keres").value;
        var max = all.split("\n");
        max = max.at(-2);
        var queryy = new RegExp('value="(.+?)"');
        max = max.match(queryy)[1];
        console.log(max)
        for(let cunt=1;cunt<=max;cunt++){
            document.getElementById("opt"+cunt).style = "display:block;";
            }
        for(let coun=0;coun<=query.length;coun++){
            var queryx = new RegExp(query+"|"+capitalizeLetter(query, coun), "g");
            console.log(queryx)
            const matchit = Array.from(all.matchAll(queryx));
            console.log(matchit)
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
                if(many[cunt].name.includes(capitalizeLetter(query, coun))){
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
    if(document.baseURI.includes("fizika.html")){
        var all = document.getElementById("items").innerHTML;
        var query = document.getElementById("keres").value;
        document.getElementById("inner").innerHTML = ""
        const matchit = Array.from(all.matchAll(query));
        const Arr = Array.from(all.matchAll('href="'));
            var many = [];
            var result = [];
            var item = NaN;
            var name = NaN;
            var items = NaN;
            var count = 0;
            for(let cunt=1;cunt<=Arr.length;cunt++){
                items = all.slice(all.indexOf('href=', count)+5, all.indexOf("/a>", count)+3);
                count = all.indexOf("/a>", count)+3;
                item = items.slice(items.indexOf('"')+1, items.indexOf('"', items.indexOf('"')+1)).toString();
                name = items.slice(items.indexOf('>')+1, items.indexOf('<')).toString();
                many.push({"name":name, "link":item});
            }
            for(let cunt=0;cunt<many.length;cunt++){
                if(many[cunt].name.includes(query)){
                    result.push({"name":many[cunt].name, "link":many[cunt].link});
                    console.log(result);
                }
            }
            for(let cunt=0;cunt<result.length;cunt++){
                var out = document.getElementById("inner").innerHTML;
                out = out+'<li><a class="dropdown-item" href="'+result[cunt].link+'">'+result[cunt].name+'</a></li>'
                document.getElementById("inner").innerHTML = out;
            }
        }
}
function capitalizeLetter(string, num) {
    if(num == 0){
        return string.charAt(num).toUpperCase() + string.slice(num+1);
    }
    else{
        var str = string.charAt(num).toUpperCase() + string.slice(num+1);
        return string.slice(0, num) + str;
    }
}