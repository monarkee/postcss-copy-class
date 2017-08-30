# PostCSS Copy Class [![Build Status][ci-img]][ci]

[PostCSS] plugin to apply classes as mixins.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/davidhemphill/postcss-copy-class.svg
[ci]:      https://travis-ci.org/davidhemphill/postcss-copy-class

```css
.red {
    color: red;
}

.stop {
    @copy .red;
}
```

```css
.red {
    color: red;
}

.stop {
    color: red;
}
```

## Usage

```js
postcss([ require('postcss-copy-class') ])
```

See [PostCSS] docs for examples for your environment.
