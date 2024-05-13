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
];

let Brands = [
    "Brands",
    "Gucci",
    "Prada",
    "Addidas",
    "Samsung",
    "Puma",
]

function randomWord(type = Technology) {
    // we set the default parameters to array Technology
    switch (type) {
        case 'Jobs':
            return Jobs[Math.floor(Math.random() * Jobs.length)]
        case 'Brands':
            return Brands[Math.floor(Math.random() * Brands.length)]
            case 'Technology':
        default:
            return Technology[Math.floor(Math.random() * Technology.length)]
    }
}
export { randomWord }

