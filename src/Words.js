let TECHNOLOGY = [
    "JavaScript",
    "Android",
    "Agile",
    "Python",
    "Linus",
    "Firewall",
    "Windows",
    'Visual Studio',
    'Git',
    'Unix',
    'Coding',

    
];


let OCCUPATION = [
    'Programmer',
    'Teacher',
    'Doctor',
    'Lawyer',
    'Athlete',
    'Software Developer',
    'Engineer',
    'Nurse',
    'Photographer',
    'Surgeon',
    'Judge',
    'Accountant',

    
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
    'Darts',
    'Badminton',

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

    function randomWord (type= TECHNOLOGY) {
        // we set the default parameters to array Technology
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
    export { randomWord };