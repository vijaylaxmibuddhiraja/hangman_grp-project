let Technology = [
    "Javascript",
    "Python",
    "Agile" ,
    "Linux" , 
    "Windows",
    "Android" ,
    "Firewall",
    "Pascal",
    "Java",
    "html",
    "CSharp",
    "Ruby",];
    
    function randomWord(){
        return Technology[Math.floor(Math.random()*Technology.length)]
    }
    export {randomWord}