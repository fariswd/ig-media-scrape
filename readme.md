# ig-media-scrape
Scrape media for instagram using puppeteer & regex

## Get Screenshot
```js
const content = await page.content()
await page.screenshot({ path: 'ig.png' });
```

## Save HTML
```js
fs.writeFile('ig.html', content, 'utf8', () => {
  console.log('write file success!!')
});
```

## Get Media HTML
```js
const result = await page.evaluate(() => {
  return document.querySelector('article').innerHTML
});
```

## Regex medias
```js
const pics = result.match(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g);
const vids = result.match(/(http(s?):)([/|.|\w|\s|-])*\.(?:mp4)/g);
```

## Save medias
```js
const name = url.split('/')[url.split('/').length - 1]
const file = fs.createWriteStream(name)
Path.resolve(__dirname, name)

const response = await axios({
  method: 'GET',
  url: url,
  responseType: 'stream'
})

response.data.pipe(file)
```

fariswd 2018  
:rocket: