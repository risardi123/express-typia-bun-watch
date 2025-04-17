import UnpluginTypia from '@ryoppippi/unplugin-typia/bun'

await Bun.build({
  entrypoints: ["./src/index.ts"],
  outdir: "./out",
  plugins: [
    UnpluginTypia({ cache: false })
  ],
  target: 'bun'
});
