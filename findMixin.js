var _ = require('lodash')

module.exports = function findMixin(css, mixin, onError) {
    const matches = []

    css.walkRules(rule => {
        if (rule.selectors.includes(mixin)) {
            matches.push(rule)
        }
    })

    if (_.isEmpty(matches) && _.isFunction(onError)) {
        onError()
    }

    return _.flatten(matches.map(match => match.clone().nodes))
}
