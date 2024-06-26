let Technology = [
    "javascript",
    "python",
    "agile",
    "linux",
    "windows",
    "android",
    "firewall",
    "pascal",
    "java",
    "html",
    "csharp",
    "ruby",];

let Jobs = [
    "Programmer",
    "Teacher",
    "Doctor",
    "Lawyer",
    "Athlete",
    'SoftwareDeveloper',
    'Engineer',
    'Nurse',
    'Photographer',
    'Surgeon',
    'Judge',
    'Accountant',
];

let Sports = [
    'Basketball',
    'Soccer',
    'Swimming',
    'Tennis',
    'Cricket',
    'Cycling',
    'Volleyball',
    'Boxing',
    'Tabletennis',
    'Icehockey',
    'Horseracing',
    'Skydiving',
    'Karate',
    'Bowling',
    'Darts',
    'Badminton',

]
let Brands = [
    "Brands",
    "Gucci",
    "Prada",
    "Addidas",
    "Samsung",
    "Puma",
    'Nike',
    'Apple',
    'Amazon',
    'Chanel',
    'Vans',
    'Uniqlo',
    'Versace',
    
]

function randomWord(type = Technology) {
    // we set the default parameters to array Technology
    switch (type) {
        case 'Jobs':
            return Jobs[Math.floor(Math.random() * Jobs.length)]
        case 'Brands':
            return Brands[Math.floor(Math.random() * Brands.length)]
        case 'Sports':
                return Sports[Math.floor(Math.random() * Sports.length)]
            case 'Technology':
        default:
            return Technology[Math.floor(Math.random() * Technology.length)]
    }
}
export { randomWord };

