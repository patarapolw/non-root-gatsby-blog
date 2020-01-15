---
title: Simple dynamic typing in Kotlin with Kotson
date: 2019-07-25
image: https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRI0rk1ieVKhHnaRc3h1vDHHeRJf7Lb8nycLGq_l3FFVXWRyuqa
tag:
  - kotlin
  - kotson
  - dynamic typing
  - gson
  - pinned
---

Apparently, it is possible to make Kotlin have a very simple dynamic typing, like JavaScript, with a JSON library -- [Kotson](https://github.com/SalomonBrys/Kotson), with some [tweaks](https://github.com/patarapolw/rep2recall-kt/blob/master/src/main/kotlin/rep2recall/json/JsonUtil.kt).

===

In JavaScript, there are only very few types, String, Number, Boolean, Null, Undefined, Object; and Array, which is a special kind of object.

With Kotson, Kotlin and

```kotlin
fun JsonObject.getValueOrNull(key: String): Any? {
    return if (contains(key)) {
        get(key).asValue()
    } else null
}

fun JsonArray.getValueOrNull(index: Int): Any? {
    return if (index >= 0 && index < size()) {
        get(index).asValue()
    } else null
}

fun JsonElement.asValue(): Any {
    return try {
        asDouble
    } catch (e: Exception) {
        try {
            val s = asString
            if (setOf("true", "false").contains(s)) {
                asBoolean
            } else s
        } catch (e: Exception) {
            this
        }
    }
}
```

Now, the typing is now limited a very few...

- String -- class java.lang.String
- Number -- class java.lang.Double
- Null -- class com.google.gson.JsonNull
- Boolean -- class java.lang.Boolean
- Array -- class com.google.gson.JsonArray
- Map -- class com.google.gson.JsonObject
- Undefined -- null

Very simple, isn't it? Also, the comparison is now simpler. For more of how I use it, see <https://github.com/patarapolw/rep2recall-kt/blob/master/src/main/kotlin/rep2recall/json/JsonUtil.kt>
