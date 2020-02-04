module.exports = {
	webpack: (config, { isServer }) => {
		if (!isServer) {
			config.node = {
				fs: 'empty',
				module: 'empty'
			}
		}

		return config
	}
}