---
title: Writing declaration.d.ts for JavaScript modules, and Extending incomplete @types modules
date: 2019-10-27
image: https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTzrjWCZNR3zkBb4XyLO-jLQZiV9SI7tV0cV6HxKHXEYyoVDU5p
tag:
  - typescript
  - "@types"
---

If you have used TypeScript long enough, you should realize that you can create `declaration.d.ts` with `declare module 'javascript-module'` for untyped JavaScript modules.

===

However, you can go far beyond that. Indeed, the best way, if you have time, is to contribute to <https://github.com/DefinitelyTyped/DefinitelyTyped>. However, the process is slow, and can take around 1 week for @types repo to get updated.

I realized that you can do beyond `declare module 'javascript-module';` by

```typescript
declare module 'javascript-module' {
   export = JavaScriptModule;

   class JavaScriptModule {
   }

   namespace JavaScriptModule {
        interface IBlahBlah {}
   }
}
```

Now, the typing is in your control.

Also, if `@types/javascript-module` is insufficient, you can do this,

```typescript
import JavaScriptModule from "javascript-module";

declare module "javascript-module" {
    interface JavaScriptModule {
        additionalMethod: () => void;
    }

    namespace JavaScriptModule {
        interface IBlahBlahBlah {}
   }
}

JavaScriptModule.prototype.additionalMethod = function() {
    this...
}
```

After all, what I want to say is that you can extend TypeScript.

Good luck exploring.
