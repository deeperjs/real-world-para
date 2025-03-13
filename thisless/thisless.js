// rule of least powerful abstraction
function createProgrammer() {
    const languages = [];

    return {
        // local reasoning - declaration
        // eyes
        learnNewLanguage(language) {
            languages.push(language);
        },
        // eyes
        isPragmatic() {
            return languages.length > 2;
        }
    };
}

const programmer3 = createProgrammer();
programmer3.learnNewLanguage('Elm');
programmer3.learnNewLanguage('Clojure');
console.log(programmer3.isPragmatic()); // false
programmer3.learnNewLanguage('Haskell');
console.log(programmer3.isPragmatic()); // true

['Java', 'Ruby', 'Python'].forEach(programmer3.learnNewLanguage);