let Technology = [
    "javascript",
    "python",
    "agile" ,
    "linux" , 
    "windows",
    "android" ,
    "firewall",
    "pascal",
    "java",
    "html",
    "csharp",
    "ruby",];
    
    function randomWord(){
        return Technology[Math.floor(Math.random()*Technology.length)]
    }
    export {randomWord}