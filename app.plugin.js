const {
  withAndroidManifest,
  withDangerousMod,
} = require("@expo/config-plugins");
const fs = require("fs");
const path = require("path");

/**
 * Adds FileProvider configuration to AndroidManifest.xml
 */
const withFileProvider = (config) => {
  return withAndroidManifest(config, async (config) => {
    const androidManifest = config.modResults;
    const { manifest } = androidManifest;

    if (!manifest.application) {
      manifest.application = [{}];
    }

    const application = manifest.application[0];

    // Check if FileProvider already exists
    const existingProvider = application.provider?.find(
      (provider) =>
        provider.$?.["android:name"] === "androidx.core.content.FileProvider",
    );

    if (!existingProvider) {
      // Add FileProvider
      if (!application.provider) {
        application.provider = [];
      }

      application.provider.push({
        $: {
          "android:name": "androidx.core.content.FileProvider",
          "android:authorities": "${applicationId}.fileprovider",
          "android:exported": "false",
          "android:grantUriPermissions": "true",
        },
        "meta-data": [
          {
            $: {
              "android:name": "android.support.FILE_PROVIDER_PATHS",
              "android:resource": "@xml/file_paths",
            },
          },
        ],
      });
    }

    return config;
  });
};

/**
 * Creates file_paths.xml resource file
 */
const withFilePathsXml = (config) => {
  return withDangerousMod(config, [
    "android",
    async (config) => {
      const projectRoot = config.modRequest.platformProjectRoot;
      const resPath = path.join(
        projectRoot,
        "app",
        "src",
        "main",
        "res",
        "xml",
      );

      // Create xml directory if it doesn't exist
      if (!fs.existsSync(resPath)) {
        fs.mkdirSync(resPath, { recursive: true });
      }

      const filePathsXmlPath = path.join(resPath, "file_paths.xml");
      const filePathsXmlContent = `<?xml version="1.0" encoding="utf-8"?>
<paths xmlns:android="http://schemas.android.com/apk/res/android">
    <files-path name="files" path="." />
    <cache-path name="cache" path="." />
    <external-files-path name="external_files" path="." />
    <external-cache-path name="external_cache" path="." />
</paths>
`;

      // Write file_paths.xml if it doesn't exist or update it
      fs.writeFileSync(filePathsXmlPath, filePathsXmlContent);

      return config;
    },
  ]);
};

module.exports = function withExpoFileViewer(config) {
  config = withFileProvider(config);
  config = withFilePathsXml(config);
  return config;
};
