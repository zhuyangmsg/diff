var IndexDom = 0;
function update(el,picker){
    let childNode = Array.from(el.childNodes);
    childNode.forEach(function(node){
        updateDom(IndexDom,node,picker)
        IndexDom++;
        update(node,picker);
    })
}

function updateDom(idx,node,picker){
    console.log(idx);
    console.log(node);
    console.log(picker);
    picker[idx] && picker[idx].forEach(function(item){
        switch(item.attr){
            case "attr":
                for(var key in item.content){
                    let value = item.content[key];
                    if(value){
                        setAttr(node,key,value)
                    }else{
                        node.removeAttribute(key)
                    }
                }
                break;
            case "text":
                node.textContent = item.content;
                break;
            case "remove":
                node.parentNode.removeChild(node);
                break;
            case "replace":
                var newDom = item.content.type?transforDom2(item.content):document.createTextNode(item.content);
                node.parentNode.replaceChild(newDom,node);
                break;
            default:
                break;
        }
    })
}

function transforDom2(dom){
    var byDom = document.createElement(dom.type);
    for(var i in dom.props){
        setAttr(byDom,i,dom.props[i]);
    };
    dom.children && dom.children.forEach((item)=>{
        var itemDom = item.type?transforDom(item):document.createTextNode(item);
        byDom.appendChild(itemDom)
    });
    console.log("byDom",byDom)
    return byDom;
}
function setAttr(dom,key,value){
    console.log("dom.tagName.toUpperCase",dom.tagName.toUpperCase())
    if(key=="value"){
        if(dom.tagName.toUpperCase()=="INPUT"){
            dom.value = value
        }else{
            dom.setAttribute(key,value)
        }
    }else if(key=="style"){
        dom.style.cssText=value;
    }else{
        dom.setAttribute(key,value)
    }
}
