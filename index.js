const puppeteer = require('puppeteer');
const cheerio = require('cheerio')
const fs = require('fs')
const axios = require('axios');
const Path = require('path') 

const saveHtml = (content) => {
  fs.writeFile('ig.html', content, 'utf8', () => {
    console.log('write file success!!')
  });
}

const saveMedia = async (url) => {
  const name = url.split('/')[url.split('/').length - 1]
  const file = fs.createWriteStream(name)
  Path.resolve(__dirname, name)

  const response = await axios({
    method: 'GET',
    url: url,
    responseType: 'stream'
  })

  response.data.pipe(file)
}

const main = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.instagram.com/p/BpiZ45Rnhu9/?utm_source=ig_web_button_share_sheet');
  const content = await page.content()

  const $ = cheerio.load(content)
  const result = $('article').html().toString()
  const pics = result.match(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g);
  const vids = result.match(/(http(s?):)([/|.|\w|\s|-])*\.(?:mp4)/g);
  const media = [...pics, ...vids]

  await page.screenshot({ path: 'ig.png' });
  saveHtml(content)
  media.forEach(url => {
    saveMedia(url)
  });

  console.log({ pics, vids });
  await browser.close();
}

main()