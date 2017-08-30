# PostCSS Apply [![Build Status][ci-img]][ci]

[PostCSS] plugin to apply classes as mixins.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/davidhemphill/postcss-apply.svg
[ci]:      https://travis-ci.org/davidhemphill/postcss-apply

```css
.red {
    color: red;
}

.stop {
    @apply .red;
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
postcss([ require('postcss-apply') ])
```

See [PostCSS] docs for examples for your environment.
