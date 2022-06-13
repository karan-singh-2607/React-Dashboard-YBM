import { override, fixBabelImports, addLessLoader } from 'customize-cra';

export default override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),

  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#6237a0',
      '@link-color': '#6237a0',
      '@success-color': '#0ea70e',
    },
  })
);
