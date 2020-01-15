---
title: SEO meta tags and Server Side Rendering automation
image: https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRB_w1OLUgyb1u3o2WoyZuDVZHMnVpIGxYqw_awuhbxl-WenPIr
date: 2019-11-20
tag:
  - SEO
  - blog.nuxt
  - nuxt
  - SSR
---

I write this topic, because I think SEO should be more about SSR automation, than about manual writing / or SEO training.

`<meta>` tags are much about how your webpage will look like on search engines, like Google, as well, not only about search engine ranking, i.e. on-page SEO.

If you use SSR, such as traditional methods, like templating engines; or SPA-related methods, like Nuxt.js; you still might not be creating enough meta tags...

===

## Which meta tags are needed

A very concise guide can be found from here: <https://css-tricks.com/essential-meta-tags-social-media/>

## How to automate

I suggest this, with a templating engine. This is Nuxt.js, BTW.

```javascript
{
  head: {
    title: title,
    link: [
      {
        rel: 'canonical',
        href: url,
      },
    ],
    meta: [
      { hid: 'description', name: 'description', content: description },
      { hid: 'keywords', name: 'keywords', content: keywords.join(', ') }
      {
        hid: 'og:title',
        property: 'og:title',
        content: title
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: description
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: metaImage
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: url
      },
      {
        hid: 'twitter:title',
        property: 'twitter:title',
        content: title
      },
      {
        hid: 'twitter:description',
        property: 'twitter:description',
        content: description
      },
      {
        hid: 'twitter:image',
        property: 'twitter:image',
        content: metaImage
      },
      {
        hid: 'twitter:card',
        property: 'twitter:card',
        content: 'summary_large_image'
      },
    ],
  }
}
```

## How to double-check on-page SEO

I recently found this Chrome extension <https://chrome.google.com/webstore/detail/seo-extension-metrics-bac/iodbnclobmalekpemjhncgfphojcgocd>.

Also, when you create a website, don't forget to check how it looks on mobile devices. -- <https://developers.google.com/web/tools/chrome-devtools/device-mode>. Often, very small devices and mid size devices can be problematic. If you need different looks for mobile, tablet and desktop, I suggest you look into media query (which is not about CSS, but can be JavaScript).

## Real project

You can check automation script of this blog at <https://github.com/patarapolw/blog>

## Futures

Perhaps, I should learn more about [OpenGraph](https://ogp.me/).

## Related

I have just watched this. It is quite good.

<iframe width="560" height="315" src="https://www.youtube.com/embed/DvwS7cV9GmQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="height: 315px"></iframe>
