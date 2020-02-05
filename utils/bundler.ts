import {
  createReactComponentGenerator,
  ReactStyleVariation,
} from '@teleporthq/teleport-component-generator-react'
import { rollup } from 'rollup'
// @ts-ignore
import virtual from '@rollup/plugin-virtual'
// @ts-ignore
import { transform } from '@babel/standalone'
// @ts-ignore
import babelPresetENV from '@babel/preset-env'
// @ts-ignore
import babelPresetReact from '@babel/preset-react'
import { FileType } from '@teleporthq/teleport-types'
import { generateComponentUIDL } from './uidl-utils'

const INDEX_ENTRY = `import React from "react";
import ReactDOM from "react-dom";
import Component from "./preview.js";
function PreviewWindow(){
  return (
    <>
      <Component />
    </>
  );
};
const elm = document.getElementById("output");
ReactDOM.render(<PreviewWindow />, document.getElementById("output"));
`

export const minify = async (esmComponent: string) => {
  const minifiedCode = transform(esmComponent, {
    presets: [[babelPresetENV, { modules: false }], babelPresetReact],
  })
  return minifiedCode
}

const preview = async (markdown: string) => {
  try {
    const componentUIDL = generateComponentUIDL(markdown)
    const generator = createReactComponentGenerator(ReactStyleVariation.InlineStyles)
    const componentFiles = await generator.generateComponent(componentUIDL)
    const component = componentFiles.files.filter(
      (file) => file.fileType === FileType.JS
    )[0]
    const MINIFIED_INDEX = minify(INDEX_ENTRY)
    const MINIFIED_PREVIEW = minify(component.content)
    const compiler = await rollup({
      input: 'src/entry.js',
      external: ['react', 'react-dom'],
      plugins: [
        virtual({
          'src/entry.js': MINIFIED_INDEX,
          'src/preview.js': MINIFIED_PREVIEW,
        }),
      ],
    })

    const output = await compiler.generate({
      format: 'iife',
      globals: { react: 'React', 'react-dom': 'ReactDOM' },
      name: 'bundled',
      sourcemap: true,
    })

    const bundledCode = output.output[0].code
    eval(bundledCode)
  } catch (e) {
    console.error('Bundling error')
    console.error(e)
  }
}

export default preview
