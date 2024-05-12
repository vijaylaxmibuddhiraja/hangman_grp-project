let TECHNOLOGY = [
    "JavaScript",
    "Android",
    "Agile",
    "Python",
    "Linus",
    "Firewall",
    "Windows",
    'Visual Studio',
    'Git'
    
];


let OCCUPATION = [
    'Programmer',
    'Teacher',
    'Doctor',
    'Lawyer',
    'Athlete',
    

]


let SPORTS = [
    'Basketball',
    'Soccer',
    'Swimming',
    'Tennis',
    'Cricket',
    'Cycling',
    'Volleyball',
    'Boxing',
    'Table tennis',
    'Ice hockey',
    'Horse racing',
    'Sky diving',
    'Karate',
    'Bowling',
    'Rock climbing',
    
    
]

let BRANDS = [
    'Addidas',
    'Gucci',
    'Prada',
    'Puma',
    'Nike',
    'Samsung',
    'Apple',
    'Amazon',
    'Chanel',
    'Vans',
    'Uniqlo',
    'Versace',
    'Tommy Hilifiger',
    
]

    function randomWord (type=TECHNOLOGY) {
        switch (type) {
            case 'occupation':
                return OCCUPATION[Math.floor(Math.random() *OCCUPATION.length)];
            
              
            case 'sports':
                return SPORTS[Math.floor(Math.random() * SPORTS.length)];
            
            case 'brands':
            default:
                return BRANDS[Math.floor(Math.random() * BRANDS.length)];
        }
    }
    export { randoWord };