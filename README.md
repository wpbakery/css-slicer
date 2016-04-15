CSS Slicer
-----------

Use CSS Slicer to cut css rules out of file

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
                                    'vendorPrefix' : '.vc_',
                                    'componentPrefix': 'tta-',
                                    'properties': {
                                        'color': {
                                            'prefix': 'color-',
                                            'values': [
                                                'blue'
                                            ]
                                        },
                                        'style': {
                                            'prefix': 'style-',
                                            'values': [
                                                'modern'
                                            ]
                                        }
                                    }
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
