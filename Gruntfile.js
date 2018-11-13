module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			compressjs: {
				files: {
					'./js/hpage.min.js': ['./index.js']
				}
			}
		},
		watch: {
			scripts: {
				files: ['./index.js'],
				tasks: ['uglify']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('compressjs', ['uglify']);
	grunt.registerTask('watchit', ['uglify', 'watch']);
	grunt.registerTask('default');

}