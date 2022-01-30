function helpFn(){
    console.log(`
        Your enetered command is wrong . Check from below ones - 
        node <file> <command> <folder> <argument>
        node mycli view "C:\\Users\\Jaagrat\\OneDrive\\Desktop\\pep\\File_sys_organizer" tree
        node mycli view "C:\\Users\\Jaagrat\\OneDrive\\Desktop\\pep\\File_sys_organizer" flat
        node mycli organize "C:\\Users\\Jaagrat\\OneDrive\\Desktop\\pep\\File_sys_organizer" <optional>
        node mycli help
    `);
}

//helpFn made available using help
module.exports = {
    help: helpFn
}