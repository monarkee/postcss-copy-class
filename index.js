var postcss = require('postcss')
var _ = require('lodash')
var findMixin = require('./findMixin')

module.exports = postcss.plugin('postcss-apply', function() {
    return function(root, result) {
        root.walkRules(function(rule) {
            rule.walkAtRules('apply', atRule => {
                const mixins = postcss.list.space(atRule.params)

                const [
                    customProperties,
                    classes,
                ] = _.partition(mixins, mixin => {
                    return _.startsWith(mixin, '--')
                })

                const decls = _.flatMap(classes, mixin => {
                    return findMixin(root, mixin, () => {
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
