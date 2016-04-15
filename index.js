var postcss = require('postcss');
var _ = require('underscore');

function escapeRegexpString(str) {
    if (typeof  str !== 'string') {
        throw new TypeError('Expected argument of type string, ' + typeof str + ' given.')
    }
    var operators = /[|\\{}()[\]^$+*?.]/g;

    return str.replace(operators, '\\$&');
}

function arrayUnique(arr) {
    if (!Array.isArray(arr)) {
        throw new TypeError('Expected argument of type array, ' + typeof str + ' given.')
    }
    var len = arr.length;
    var i = -1;

    while (i++ < len) {
        var j = i + 1;

        for (; j < arr.length; ++j) {
            if (arr[i] === arr[j]) {
                arr.splice(j--, 1);
            }
        }
    }
    return arr;
}

module.exports = postcss.plugin('cssCutter', function cssCutter(options) {

    return function (css) {
        options = options || {};

        var filters = [];
        for (var shard in options.shards) {
            var element = options.shards[shard];

            for (var prop in element.properties) {
                var prefix = escapeRegexpString(element.vendorPrefix + element.componentPrefix + element.properties[prop].prefix);

                var propValues = element.properties[prop].values.map(function (val) {
                    return escapeRegexpString(val)+'(?:\\s|[.#,+~:>[{])';
                })
                var prefixFoundIndex = _.findIndex(filters, {'prefix': prefix});
                if (-1 === prefixFoundIndex) {
                    filters.push({
                        'prefix': prefix,
                        'values': propValues
                    })
                } else {
                    filters[prefixFoundIndex].values = _.uniq(filters[prefixFoundIndex].values.concat(propValues));
                }
            }
        }

        css.walkRules(function (rule) {
            var selectors = rule.selectors;
            var selectrosPassed = [];

            selectors.forEach(function (selector) {
                for(i in filters) {
                    var filter = filters[i],
                        rgxp = new RegExp(filter.prefix,'gim');
                    if (selector.search(rgxp) !== -1) {
                        rgxp = new RegExp(filter.prefix + '(?:' + filter.values.join('|') + ')', 'gim' );
                        if (selector.search(rgxp) === -1) {
                            return;
                        }
                    }
                }
                selectrosPassed.push(selector);
            });

            if (selectrosPassed.length) {
                rule.selectors = selectrosPassed;
            } else {
                rule.remove();
            }
        });
    }
});
