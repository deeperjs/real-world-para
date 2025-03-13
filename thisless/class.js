class Programmer2 {
    constructor() {
        this.languages = [];
    }

    // programming at a distance antipattern
    learnNewLanguage(language) {
        this.languages.push(language);
    }

    isPragmatic() {
        return this.languages.length > 2;
    }
}


const programmer2 = new Programmer2();
programmer2.learnNewLanguage('Java');
programmer2.learnNewLanguage('Ruby');
console.log(programmer2.isPragmatic()); // false
programmer2.learnNewLanguage('Python');
console.log(programmer2.isPragmatic()); // true

['Java', 'Ruby', 'Python'].forEach(programmer2.learnNewLanguage);