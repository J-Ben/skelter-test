module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        'babel-preset-expo',
        {
          jsxImportSource: 'react',
          reactCompiler: {
            sources: (filename) => !filename.includes('react-zero-skeleton'),
          },
        },
      ],
    ],
  };
};
