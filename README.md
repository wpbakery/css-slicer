CSS Slicer
----------

to install run command
npm install https://github.com/wpbakery/css-slicer.git --save



---------

npm install grunt-postcss --save


module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        

        postcss: {
            options: {
                processors: [
                    require('postcss-css-cutter')({
                            shards: {
                                'vce-tta': {
                                    'vendorPrefix' : '.vc_',
                                    'componentPrefix': 'tta-',
                                    'properties': {
                                        'color': {
                                            'prefix': 'color-',
                                            'values': [
                                                'blue'
                                            ]
                                        },
                                        'position': {
                                            'prefix': 'tabs-position-',
                                            'values': [
                                                'top'
                                            ]
                                        },
                                        'style': {
                                            'prefix': 'style-',
                                            'values': [
                                                'modern'
                                            ]
                                        },
                                        'shape': {
                                            'prefix': 'shape-',
                                            'values': [
                                                'round'
                                            ]
                                        },
                                        'spacing': {
                                            'prefix': 'spacing-',
                                            'values': [
                                                '1'
                                            ]
                                        },
                                        'gap': {
                                            'prefix': 'gap-',
                                            'values': [
                                                '1'
                                            ]
                                        }
                                    }
                                }
                            }
                        })
                ]
            },
            dist: {
                src: 'post_src/style.css',
                dest: 'post_src/style_dist.css'
            }
        }

    });


};
