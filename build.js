
var bundle = require('browserify')(),
    fs = require('fs'),
    uglify = require('uglify-js');

function buildCompress (source) {
    fs.writeFile('./lib/formup.min.js', uglify.minify(source, {fromString: true}).code, function (err) {
        if (err) throw err;
    });
}

function buildSimple (source) {
    fs.writeFile('./lib/formup.min.js', source, function (err) {
        if (err) throw err;
    });
}

function build (source) {
    buildCompress(source);
    //buildSimple(source);
}

bundle.add('./lib/formup.js');
bundle.bundle({standalone: 'FormUP'}, function (err, source) {
    if (err) console.error(err);
    fs.writeFileSync('./lib/formup.bundle.js', source);
    build(source);
});
