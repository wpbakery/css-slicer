CSS Slicer
-----------

Use CSS Slicer to cut css rules out of file.

This processor will find all css selectors in your files what has prefix defined by options (vendorPrefix + componentPrefix + propertyPrefix) and remove all all found rules except given.


To install run command

    npm install https://github.com/wpbakery/css-slicer.git --save



Grunt config
------------
add grunt-postcss to your project

    npm install grunt-postcss --save



configurete grunt
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        postcss: { //configure postcss
            options: {
                processors: [
                    //add css-cutter to postcss processors
                    require('postcss-css-cutter')({
                            shards: {
                                'vce-tta': { //shard name used only to identify shards
                                    'color': {
                                        'prefix': '.vc_tta-color-',
                                        'values': [
                                            'blue',
                                            'turquoise'
                                        ]
                                    },
                                    'style': {
                                        'prefix': '.vc_tta-style-',
                                        'values': [
                                            'modern'
                                        ]
                                    },
                                }
                            }
                        })
                ]
            },
            dist: {
                src: 'src/style.css',
                dest: 'dist/style.css'
            }
        }

    });
};
