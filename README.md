#Mobugger
Mobile debugger for web developers. Suitable if there is no computer at hand.

##Dependency
Mobbuger for their work requires jquery

##Examples
For using include log.js and style.css in your project

```html
  <link rel="stylesheet" type="text/css" href="css/style.css">
  ...
  <script src='js/jquery.min.js'></script>
  <script src='js/log.js'></script>
```  
And logging your variable

```js
let foo = {
  bar: {
    id: 2,
    name: "bar"
}

log(foo)
```
Dom elements can also logging

```js
log(document.body)
```

Аs excretory js errors when you include your code after the logger
