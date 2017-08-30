var postcss = require('postcss')
var _ = require('lodash')
var findClass = require('./findClass')

module.exports = postcss.plugin('postcss-copy-class', function() {
    return function(root, result) {
        root.walkRules(function(rule) {
            rule.walkAtRules('copy', atRule => {
                const mixins = postcss.list.space(atRule.params)

                const [
                    customProperties,
                    classes,
                ] = _.partition(mixins, mixin => {
                    return _.startsWith(mixin, '--')
                })

                const decls = _.flatMap(classes, mixin => {
                    return findClass(root, mixin, () => {
                        throw atRule.error(`No ${mixin} class found.`)
                    })
                })

                atRule.before(decls)

                atRule.params = customProperties.join(' ')

                if (_.isEmpty(customProperties)) {
                    atRule.remove()
                }
            })
        })
    }
})
