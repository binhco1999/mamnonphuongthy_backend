export const isEmptyObject = (obj: object):boolean =>{
    return !Object.keys(obj).length;
};

//những cái key trong object truyền vào không có length thì là rỗng