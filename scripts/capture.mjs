import {chromium} from '@playwright/test';
import {mkdir} from 'node:fs/promises';
const browser=await chromium.launch({headless:true,executablePath:process.env.SANAK_BROWSER});
await mkdir('docs/screenshots',{recursive:true});
for(const [name,width,height] of [['desktop',1440,1000],['mobile',390,844],['tablet',768,1024]]){
  const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1});
  await page.goto('http://127.0.0.1:3000/',{waitUntil:'networkidle'});
  await page.evaluate(()=>document.fonts.ready);
  await page.locator('#studio').scrollIntoViewIfNeeded();
  await page.locator('#studio canvas').waitFor({timeout:30000});
  await page.waitForTimeout(1200);
  await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
  await page.screenshot({path:`docs/screenshots/home-${name}.png`,fullPage:true});
  await page.locator('#studio').screenshot({path:`docs/screenshots/studio-${name}.png`,style:'.header{visibility:hidden}.skip-link{visibility:hidden}'});
  console.log(JSON.stringify({name,title:await page.title(),overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)}));
  await page.close();
}
const page=await browser.newPage();
for(const width of [390,768,1024,1440,1920]){
  await page.setViewportSize({width,height:1000});
  for(const route of ['/','/shop/','/shop/rosewood/']){
    await page.goto(`http://127.0.0.1:3000${route}`,{waitUntil:'networkidle'});
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
    if(overflow)throw new Error(`Horizontal overflow at ${width}px on ${route}`);
  }
  console.log(`Layout width ${width}px: passed homepage, shop and product page`);
}
await browser.close();
