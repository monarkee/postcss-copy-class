var postcss = require('postcss')

var plugin = require('./')

function run(input, opts) {
    return postcss([plugin(opts)]).process(input)
}

test('it applies previous classes', () => {
    output = '.a { color: red; } .b { color: red; }'

    return run('.a { color: red; } .b { @apply .a; }', {}).then(result => {
        expect(result.css).toEqual(output)
        expect(result.warnings().length).toBe(0)
    })
})

test('it fails if the class does not exist', () => {
    run('.b { @apply .a; }', {}).catch(error => {
        expect(error.reason).toEqual('No .a class found.')
    })
})
