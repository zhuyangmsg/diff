//虚拟DOM
var virtualDom = createElement("ul",{class:"shop-ul",title:"pay goods",style:"color:#000;font-size:18px"},[
    createElement("li",{class:"shop-li",value:"goods"},["goods"]),
    createElement("li",{class:"shop-li"},["goods"]),
    createElement("li",{class:"shop-li"},["goods"])
]);
var virtualDom1 = createElement("ul",{class:"shop-ul a",title:"pay a goods",style:"color:#000;font-size:18px"},[
    createElement("li",{class:"shop-li",value:"goods"},["goods"]),
    createElement("div",{class:"shop-li"},["goods"]),
    createElement("li",{class:"shop-li"},["goods price"]),
]);

//渲染
var transforDom = transforDom(virtualDom);
//插入
document.getElementById("el").appendChild(transforDom);
//diff算法
var diff = diff(virtualDom,virtualDom1);
console.log("diff",diff);
//更新包渲染到页面
update(document.getElementById("el"),diff)
