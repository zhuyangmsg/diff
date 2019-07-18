function createElement(type,props,children){
    return new Element(type,props,children)
}
class Element{
    constructor(type,props,children){
        this.type = type;
        this.props = props;
        this.children = children;
    }
}