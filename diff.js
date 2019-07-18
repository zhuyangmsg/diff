var Index = 0;
function diff(oldNode,newNode){
    var patch = {};
    diffcompare(oldNode,newNode,patch);
    return patch;
}
function diffcompare(oldNode,newNode,patch){
    var nodepatch = [];
    if(!newNode){
        nodepatch.push({attr:"remove",content:Index});
        patch[Index] = nodepatch;
    }else if(typeof(oldNode)=='string' && typeof(newNode)=='string'){
        if(oldNode!==newNode){
            nodepatch.push({attr:"text",content:newNode});
            patch[Index] = nodepatch;
        }
    }else if(oldNode.type==newNode.type){
        var attr = attrcompare(oldNode.props,newNode.props);
        if(Object.keys(attr).length>0){
            nodepatch.push({attr:"attr",content:attr});
            patch[Index] = nodepatch;
        }
        oldNode.children.forEach(function(oldChild,idx){
            diffcompare(oldChild,newNode.children[idx],patch,++Index)
        })
    }else{
        nodepatch.push({attr:"replace",content:newNode});
        patch[Index] = nodepatch;
        Index++;
    }
}
function attrcompare(oldAttr,newAttr){
    var nodepatch = {};
    Object.keys(oldAttr).forEach(function(key){
        if(oldAttr[key]!==newAttr[key]){
            nodepatch[key]=newAttr[key]
        }
    });
    Object.keys(newAttr).forEach(function(key){
        if(!oldAttr.hasOwnProperty(key)){
            nodepatch[key]=newAttr[key]
        }
    });
    return nodepatch;
}