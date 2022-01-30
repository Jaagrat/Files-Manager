let fs = require("fs");
let path = require("path");

let utility = {
    media: ['mp4','mkv','mp3'],
    archives: ['zip','7z','rar','tar','gz','ar','iso','xz'],
    documents: ['docx','doc','pdf','xlsx','xls','odt','ods','odp','odg','odf','txt','ps','tex'],
    app: ['exe','dmg','pkg','deb'],
    images : ['png','jpg','jpeg'],
}


function organizeFn(src){
    console.log("Organising your folder");
    //if src not provided take it the path of current directory as src
    if(src==undefined){
        src=process.cwd(); //path of the working directory
    }
    let dest = createFolder(src,"organisedFolder");
    organizeHelper(src,dest);
}


function createFolder(src,parameter){
    let folderPath = path.join(src,parameter);
    if(fs.existsSync(folderPath)==false)
        fs.mkdirSync(folderPath);
    return folderPath;
}

function getCategory(src){
    //let extension = path.extname(src); 
    let extension = src.split(".")[1];
    for(let key in utility){
        let valueArr = utility[key];
        for(let i=0;i<valueArr.length;i++){
            if(extension==valueArr[i]) return key;
        }
    }
    return "others";
}

function checkFileOrFolder(path){
    let isFile = fs.lstatSync(path).isFile();
    return isFile;
}

function copyFileAndOrganize(src,dest){
    dest= path.join(dest,path.basename(src));
    fs.copyFileSync(src,dest);
}

function organizeHelper(src,dest){
    let isFile = checkFileOrFolder(src);
    if(isFile==true){
        let category = getCategory(src);
        let categoryPath = createFolder(dest,category);
        copyFileAndOrganize(src,categoryPath);
    }else{
        let children = fs.readdirSync(src);//array that will contain immediate children 
        for(let i=0;i<children.length;i++){
            let child = children[i];
            let childPath = path.join(src,child);
            organizeHelper(childPath,dest);
        }
    }
}


module.exports = {
    organize: organizeFn
}