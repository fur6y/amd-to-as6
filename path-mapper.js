var path = require('path');

module.exports = mapper;


const requireConf = {
    baseUrl: 'require/',
    node_modules: {
        'jquery': true,
    },
    paths: {
        'moduleB': 'path/moduleB',
        'moduleC': 'path/to/moduleC',
    }
};

function mapper(dep, filePath) {
    const startIndex = filePath.indexOf(requireConf.baseUrl) + requireConf.baseUrl.length;
    const root = process.cwd() + '/' + filePath.substring(0, startIndex);
    const filePathAbsolute = path.normalize(
        process.cwd() + '/' + filePath
    );

    const depPath = dep.replace(/(\'|\")/g, '');
    const depPathAlias = requireConf.paths[depPath];
    const depPathAbsolute = path.normalize(
        root + (depPathAlias || depPath)
    );
    const depName = path.basename(depPathAbsolute);

    const relative = path.relative(
        path.dirname(filePathAbsolute),
        path.dirname(depPathAbsolute)
    );

    let result;
    if (requireConf.node_modules[depName]) {
        result = depName;
    } else {
        result = relative ? ('./' + relative + '/' + depName) : ('./' + depName);
    }

    console.log('###########');
    console.log('### FILE:', filePathAbsolute);
    console.log('### DEPE:', depPathAbsolute);
    console.log('### RELA:', result);

    return `'${result}'`;
}