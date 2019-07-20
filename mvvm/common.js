var common = {
    //返回一个虚拟DOM
    createElement:function(type,props,children){
        return {type,props,children}
    },
    //获得虚拟DOM,进行渲染成真实DOM
    render:function(docDom){
        var createDom = document.createElement(docDom.type);
        //遍历属性，赋值
        Object.keys(docDom.props).forEach((key)=>{
            common.setAttr(createDom,key,docDom.props[key]);
        });
        //遍历子元素，一直获取到文本节点，在把子节点添加到父节点
        docDom.children.forEach(function(childDom){
            var createEle = typeof(childDom)!=="string"?common.render(childDom):document.createTextNode(childDom);
            createDom.appendChild(createEle);
        });
        return createDom;
    },
    //赋予属性
    setAttr:function(dom,key,value){
        switch(key){
            case "value":
                if(dom.tagName.toUpperCase()=="INPUT" || dom.tagName.toUpperCase()=="TEXTAREA"){
                    dom.value = value;
                }else{
                    dom.setAttribute("value",value)
                };
                break;
            case "style":
                dom.style.cssText = value;
            default:
                dom.setAttribute(key,value);
                break;
        }
    },
    patcher:{},
    index:0,
    //根据两个虚拟DOM，比较差异
    diff:function(oldDom,newDom){
        var itemPatch=[];
        if(!newDom){
            itemPatch.push({type:"REMOVE",content:common.index});
            common.patcher[common.index] = itemPatch;
        }else if(typeof(oldDom)=="string" && typeof(newDom)=="string"){
            if(oldDom!==newDom){
                itemPatch.push({type:"TEXT",content:newDom});
                common.patcher[common.index] = itemPatch;
            }
        }else if(oldDom.type===newDom.type){
            var compareAttr = common.compareAttr(oldDom.props,newDom.props);
            if(Object.keys(compareAttr).length > 0){
                itemPatch.push({type:"ATTR",content:compareAttr});
                common.patcher[common.index] = itemPatch;
            }
            //每个子节点都需要遍历验证
            oldDom.children.forEach(function(childDom,idx){
                common.index++;
                common.diff(childDom,newDom.children[idx]);
            })
        }else{
            itemPatch.push({type:"REPLACE",content:newDom});
            common.patcher[common.index] = itemPatch;
        }
        return common.patcher;
    },
    //比较属性，value值不等，说明值改变，老对象不存在新Key,说明新增属性
    compareAttr:function(oldProps,newProps){
        var attrPatcher = {};
        Object.keys(oldProps).forEach(function(key){
            if(oldProps[key]!==newProps[key]){
                attrPatcher[key]=newProps[key];
            }
        });
        Object.keys(newProps).forEach(function(key){
            if(!oldProps.hasOwnProperty(key)){
                attrPatcher[key]=newProps[key];
            }
        });
        return attrPatcher;
    },
    updateIdx:0,
    //算出节点差异的部分，添加到对应的元素上
    update:function(el,diff){
        let childNodes = Array.from(el.childNodes);
        childNodes.forEach(function(item){
            common.renderUpdate(item,diff);    //每个节点都需要验证是否需要修改
            common.updateIdx++;   //给每个节点添加对应的索引，和patch索引对应
            common.update(item,diff);
        })
    },
    renderUpdate:function(node,diff){
        //diff是否存在节点需要更改
        diff[common.updateIdx] && diff[common.updateIdx].forEach(function(item){
            switch (item.type){
                case "ATTR":
                    Object.keys(item.content).forEach(function(key){
                        if(item.content[key]){
                            common.setAttr(node,key,item.content[key]);
                        }else{
                            node.removeAttribute(key);
                        }
                    })
                    break;
                case "TEXT":
                    node.textContent = item.content;
                    break;
                case "REMOVE":
                    node.parentNode.removeChild(node);
                    break;
                case "UPDATE":
                    var newDom = item.content.type?render(item.content):document.createTextNode(item.content);
                    node.parentNode.replaceChild(newDom,node);
                    break
            }
        })
    }
}