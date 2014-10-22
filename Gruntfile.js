module.exports = function (grunt)
{
	grunt.initConfig(
	{
		copy: {
			test_root: {
				cwd: 'test/mod/',
				src: ['custom/**/*'],
				dest: 'test/node_modules',
				expand: true
			},
			test_mload: {
				cwd: './',
				src: ['lib/**/*', './*'],
				dest: 'test/node_modules/mload',
				filter: 'isFile',
				expand: true
			},
			test_mload_custom: {
				cwd: './',
				src: ['lib/**/*', './*'],
				dest: 'test/node_modules/custom/node_modules/mload',
				expand: true
			},
			test_no_moload: {
				cwd: 'test/mod/',
				src: ['no_mload/**/*'],
				dest: 'test/node_modules',
				expand: true
			}
		},
		nodeunit: {
			all: ['test/test_*.js']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	grunt.registerTask('default', ['copy', 'nodeunit']);
	grunt.registerTask('test', ['default']);
};