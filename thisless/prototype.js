function Programmer1() {
    this.languages = [];
    // return this;
}

Programmer1.prototype.learnNewLanguage = function(language) {
    this.languages.push(language);
};

Programmer1.prototype.isPragmatic = function() {
    return this.languages.length > 2;
};

const programmer1 = new Programmer1();
programmer1.learnNewLanguage('Java');
programmer1.learnNewLanguage('Ruby');
console.log(programmer1.isPragmatic()); // false
programmer1.learnNewLanguage('Python');
console.log(programmer1.isPragmatic()); // true

['Java', 'Ruby', 'Python'].forEach(lang => programmer1.learnNewLanguage(lang));

// learnNewLanguage.apply(programmer1);

function foo() {
    return this;
}
// 4 this ways
// foo(); // global, undefined strict
// const o = {};
// o.foo = foo;
// o.foo(); // left of .
// foo.apply(obj); // explicit obj
// new foo(); // newly created {}

