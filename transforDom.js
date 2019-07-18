function transforDom(dom){
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