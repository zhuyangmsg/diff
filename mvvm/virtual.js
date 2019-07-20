var el = document.getElementById("el");
var createElement1 = common.createElement("div",{class:"vitual"},[
    common.createElement("p",{class:"vitual-p"},["vitual"]),
    common.createElement("p",{class:"vitual-p"},["vitual"]),
    common.createElement("p",{class:"vitual-p"},["vitual"]),
    common.createElement("p",{class:"vitual-p"},["vitual"]),
]);
var createElement2 = common.createElement("div",{class:"vitual",style:"font-size:16px"},[
    common.createElement("p",{class:"vitual-p"},["vitual123"]),
    common.createElement("p",{class:"vitual-p"},["vitual"]),
    common.createElement("p",{class:"vitual-p"},["vitual"])
]);
//渲染成真实的DOM
var docDom = common.render(createElement1);
//插入
el.appendChild(docDom);
//diff算法，比较两个虚拟DOM的差别，也可以是虚拟DOM和真实DOM的差别
var diff = common.diff(createElement1,createElement2);
//算出来的差别，编译到页面中
common.update(el,diff);