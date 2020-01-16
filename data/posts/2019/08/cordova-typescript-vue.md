---
title: Cordova, TypeScript, Vue and using features beyond WebView
date: 2019-08-08
image: https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS9pgod2gRowruzWDJxQXtxJjS-P4cf3lMYJ-cnqf29fZKQFTQ6
tag:
  - cordova
  - typescript
  - vue
---

An easy way to set a layout for mobile apps, easier than [Flutter](https://flutter.dev/), [React Native](https://facebook.github.io/react-native/) or [NativeScript](https://www.nativescript.org/), for instance, is to use [Apache Cordova](https://cordova.apache.org/) or [PhoneGap](https://phonegap.com/). This is probably due to CSS/SCSS/HTML (rather than partial CSS support in NativeScript).

Why Vue? Because Vue's [Vuetify](https://vuetifyjs.com/en/)'s Material design looks just like Android! While being easier to set the layout than [NativeScript Vue](https://nativescript-vue.org/).

An example app I have used all the above-mentioned in the header is <https://github.com/patarapolw/nltkpass-app>

<!-- excerpt_separator -->

Since I use both Vue-CLI and Apache Cordova, there are two ways to do this.

- `cordova create app-name` followed by `vue create app-name`, and let the folder merge; and follow the instruction in this tutorial -- <https://christos312.eu/blog/2018/11/24/vue-cli-3-cordova/>
- `vue create app-name` followed by `vue add cordova`.

With Vue-CLI it is fairly easy to set up like this (with just an extra `vue add pug`)

```vue
<template lang="pug">
</template>

<script lang="ts">
</script>

<style lang="scss">
</style>
```

What feature do I need beyond WebView? I need file server, because a data text file I used is fairly large (20 MB), and Vue-CLI's Webpack wouldn't compile!.

`fetch()` do work in `cordova run browser`, but not in `cordova run android`; so I have to create a custom script.

```typescript
// cordova.ts
export async function fetchText(path: string): Promise<string> {
  if ((window as any).cordova && cordova.file) {
    return new Promise((resolve, reject) => {
      (window as any).resolveLocalFileSystemURL(`${cordova.file.applicationDirectory}www/${path}`,
      (fileEntry: any) => {
        fileEntry.file((f: any) => {
          const reader = new FileReader();
          reader.onloadend = function() {
            resolve(this.result as string);
          }
          reader.readAsText(f);
        })
      },
      (e: any) => reject(e));
    })
  } else {
    return (await fetch(path)).text();
  }
}
```

This way, when I use `fetchText`, instead of `await fetch`, it will work for Android.

In my next projects, I would undoubtedly use SQLite, and fetch data from API from an online web server...

What worries me after this point, is how do I access native Android API from Cordova... It might not be as easy as Flutter?
