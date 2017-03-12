define([
    'moduleA',
    'moduleB',
    'path/to/moduleC'
], function (moduleA, moduleB, moduleC) {

    // do something with dep A
    moduleA();

    // do something with dep B
    moduleB();

    // do something with dep C
    moduleC();

    return function myExport() {
        console.log('text');
    };

});
