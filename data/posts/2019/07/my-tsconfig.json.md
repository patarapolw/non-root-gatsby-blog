---
title: My tsconfig.json
date: 2019-07-17
image: https://3.bp.blogspot.com/-mbCB4VKUAT8/WvB5ZZoslaI/AAAAAAAAUAA/10O-BO8ynwgwf0RPGJiZDkduOw9QqKo8ACLcBGAs/s1600/typescript-configuration-file-tsconfig-json.jpg
tag:
  - tsconfig.json
  - typescript
  - pinned
---

I tried to make it work best for both Node.js runtime and web browser.

<!-- excerpt_separator -->

A result is (<https://github.com/szokodiakos/typegoose/issues/187>)

```json
// tsconfig.json
{
    "compilerOptions": {
        "target": "esnext",
        "module": "commonjs",
        "outDir": "./build",
        "strict": true,
        "esModuleInterop": true,
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "allowSyntheticDefaultImports": true,
        "sourceMap": false,
        "noImplicitReturns": true,
        "noImplicitAny": true,
        "allowJs": true,
        "resolveJsonModule": true,
        "downlevelIteration": true
    },
    "include": [
        "src/**/*"
    ]
}
```

```json
// tsconfig.node.json
{
    "extends": "./tsconfig.json",
    "exclude": [
        "src/web"
    ]
}
```

```json
// tsconfig.web.json
{
    "extends": "./tsconfig.json",
    "compilerOptions": {
        "outDir": "dist/",
        "sourceMap": true,
        "target": "es5",
        "lib": ["es2015", "es2017", "dom"]
    },
    "exclude": [
        "src/node"
    ]
}
```

```json
// tsconfig.electron.json
{
    "extends": "./tsconfig.json",
    "compilerOptions": {
        "sourceMap": false
    }
}
```
