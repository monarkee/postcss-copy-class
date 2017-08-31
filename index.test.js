var postcss = require('postcss')

var plugin = require('./')

function run(input, opts) {
    return postcss([plugin(opts)]).process(input)
}

test("it copies a class's declarations into itself", () => {
    output = '.a { color: red; } .b { color: red; }'

    return run('.a { color: red; } .b { @copy .a; }', {}).then(result => {
        expect(result.css).toEqual(output)
        expect(result.warnings().length).toBe(0)
    })
})

test("it doesn't copy a media query definition into itself", () => {
    output = `.a {
            color: red;
        }

        @media (min-width: 300px) {
            .a { color: blue; }
        }

        .b {
            color: red;
        }`

    return run(
        `.a {
            color: red;
        }

        @media (min-width: 300px) {
            .a { color: blue; }
        }

        .b {
            @copy .a;
        }`,
        {}
    ).then(result => {
        expect(result.css).toEqual(output)
        expect(result.warnings().length).toBe(0)
    })
})

test('it fails if the class does not exist', () => {
    run('.b { @copy .a; }', {}).catch(error => {
        expect(error.reason).toEqual('No .a class found.')
    })
})
