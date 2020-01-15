---
title: Customizing JSON parser and stringifier
date: 2019-09-11
image: https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ7pdGqnbQneek9mD0QbbdEFO1kjNHxeG2jRt42OoCY2a9HefQy
tag:
  - json
  - python
  - javascript
---

I have always wanted `JSON.parse` and `JSON.stringify` to deal with custom objects, such as `Date` and `Set`.

BTW, I have successfully done so in two languages, Python and JavaScript (TypeScript).

===

In Python, you have to override `default` and `object_hook` for `json.dumps` and `json.loads` respectively.

```python
import json
from datetime import datetime


def default(obj):
    if isinstance(obj, datetime):
        return str(obj)

    raise TypeError


class ComplexEncoder(json.JSONEncoder):
    def default(self, obj):
        try:
            return default(obj)
        except TypeError:
            return super().default(self, obj)


def object_hook(d):
    date_formats = [
        "%Y-%m-%d %H:%M:%S.%f"
    ]

    for k, v in d.items():
        if isinstance(v, str):
            for f in date_formats:
                try:
                    d[k] = datetime.strptime(v, f)
                    break
                except ValueError:
                    pass

    return d


if __name__ == "__main__":
    print(json.dumps(datetime.now(), cls=ComplexEncoder))
    print(json.dumps(datetime.now(), default=default))
    print(json.loads(json.dumps({"a": datetime.now()}, default=default), object_hook=object_hook))
```

For JavaScript, there is `Object.prototype.toJSON` and `reviver`. You can override both, like this,

```typescript
Date.prototype.toJSON = function() {
  return this.toISOString();
};

function reviver(key: string, value: any) {
  if (typeof value === "string") {
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+\S+$/.test(value)) {
      return new Date(value)
    }
  }
  return value;
}

console.log(JSON.stringify(new Date()));
console.log(JSON.parse(JSON.stringify(new Date()), reviver));
```

Indeed, if you want to handle Python's `datetime` string, you might need [moment.js](https://momentjs.com/) library.
