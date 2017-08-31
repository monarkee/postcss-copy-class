var _ = require('lodash')

module.exports = function findClass(root, selector, onError) {
    const matches = []

    root.walkRules(rule => {
        if (rule.selectors.includes(selector) && rule.parent.type == 'root') {
            matches.push(rule)
        }
    })

    if (_.isEmpty(matches) && _.isFunction(onError)) {
        onError()
    }

    return _.flatten(matches.map(match => match.clone().nodes))
}
