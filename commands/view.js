//for making the job easier
let fs = require("fs");
let path = require("path");


function viewFn(src,mode){
    console.log("Viewing your folder");
    if(mode=="flat")
        viewHelperFlat(src);
    else
        viewHelperTree(src,"");
}


//because we need to do different kinds of work for folder and file
function checkFileOrFolder(path){
    let isFile = fs.lstatSync(path).isFile();
    return isFile;
}


function viewHelperFlat(src){
    let isFile = checkFileOrFolder(src);
    if(isFile==true){ //this route ends (also serves as base condition for recursion)
        console.log(src,"*");
    }else{
        console.log(src); //printing folder path
        let children = fs.readdirSync(src);//array that will contain immediate children 
        for(let i=0;i<children.length;i++){
            let child = children[i];
            let childPath = path.join(src,child);
            //faith for recursion
            viewHelperFlat(childPath);
        }
    }
}

function viewHelperTree(src,indent){
    let isFile = checkFileOrFolder(src);
    if(isFile==true){
        console.log(indent,path.basename(src),"*");
    }else{
        console.log(indent,path.basename(src),"/");
        let children = fs.readdirSync(src);//array that will contain immediate children 
        for(let i=0;i<children.length;i++){
            let child = children[i];
            let childPath = path.join(src,child);
            //faith for recursion
            viewHelperTree(childPath,indent+"\t");
        }
    }    
}

module.exports = {
    view: viewFn
}