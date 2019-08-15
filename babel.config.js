/* eslint linebreak-style: ["error", "windows"] */

const presets = [
  [
    '@babel/preset-env',
    {
      useBuiltIns: 'usage',
      corejs: 3,
    },
  ],
];

module.exports = { presets };
