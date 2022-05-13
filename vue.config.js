module.exports = {
	pluginOptions: {
		electronBuilder: {
			builderOptions: {
				"productName": "Tramalyse",
				"nsis": {
					"artifactName": "Tramalyse.setup.${version}.${ext}",
					"uninstallDisplayName": "Tramalyse"
				}
			}
		}
	}
}