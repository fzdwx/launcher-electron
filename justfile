build:
  pnpm run build

test:
  deno fmt  src/native/desktop/index.ts 
  deno run --allow-all src/native/desktop/index.ts 
