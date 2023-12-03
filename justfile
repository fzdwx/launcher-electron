build:
  cd launcher-native && go build . && mv launcher-native ../bin/launcher-native
  pnpm run build

test:
  deno fmt  src/native/desktop/index.ts
  deno run --allow-all src/native/desktop/index.ts

air:
    cd launcher-native && air
