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
		},
		clean: {
			node_modules: ['test/node_modules']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.registerTask('default', ['clean', 'copy', 'nodeunit']);
	grunt.registerTask('test', ['default']);
};