import { test, expect } from '@playwright/test';
test('shop, select a shade, persist bag, adjust quantity and demo checkout',async({page})=>{
  await page.goto('/');
  await page.getByRole('link',{name:'Explore the collection',exact:true}).click();
  await expect(page.getByRole('heading',{name:/Your everyday/})).toBeVisible();
  await page.getByRole('link',{name:'Velvet Matte Lipstick — Rosewood',exact:true}).click();
  await expect(page.getByRole('heading',{level:1,name:'Velvet Matte Lipstick'})).toBeVisible();
  await page.locator('.shade-picker').getByRole('button',{name:'Mauve Muse',exact:true}).click();
  await expect(page.locator('.shade-picker legend')).toContainText('Mauve Muse');
  await expect(page.locator('.gallery-main>img')).toHaveAttribute('src','/images/mauve-muse.webp');
  await page.getByRole('button',{name:'Add to bag',exact:true}).click();
  const dialog=page.getByRole('dialog',{name:'Your bag'});
  await expect(dialog).toBeVisible();await expect(dialog).toContainText('Mauve Muse');
  await dialog.getByRole('button',{name:'Increase Mauve Muse quantity'}).click();
  await expect(dialog.locator('.summary-line.total')).toContainText('₹1,798');
  await dialog.getByRole('link',{name:'View your bag'}).click();
  await page.reload();await expect(page.locator('.cart-line')).toContainText('Mauve Muse');
  await expect(page.locator('.cart-line .quantity>span')).toHaveText('2');
  await page.getByRole('button',{name:'Explore demo checkout'}).click();
  await expect(page.locator('.toast[role=status]')).toContainText('no order is placed');
  await page.getByRole('button',{name:'Decrease Mauve Muse quantity'}).click();
  await expect(page.locator('.summary-line.total')).toContainText('₹998');
  await page.getByRole('button',{name:'Remove Velvet Matte Lipstick Mauve Muse from bag'}).click();
  await expect(page.getByRole('heading',{name:'A little room for beauty.'})).toBeVisible();
});
test('wishlist persists and moves the selected product into bag',async({page})=>{
  await page.goto('/shop/');
  await page.getByRole('button',{name:'Save Velvet Matte Lipstick Rosewood to wishlist',exact:true}).click();
  await page.goto('/wishlist/');await page.reload();
  await expect(page.locator('.product-card')).toHaveCount(1);
  await page.getByRole('button',{name:'Add Velvet Matte Lipstick Rosewood to bag',exact:true}).click();
  await expect(page.getByRole('heading',{name:'Keep the lovely things close.'})).toBeVisible();
  await page.getByRole('button',{name:'Open shopping bag, 1 items'}).click();
  await expect(page.getByRole('dialog',{name:'Your bag'})).toContainText('Rosewood');
});
test('global search, clear, empty results, keyboard escape and focus restoration',async({page})=>{
  await page.goto('/');const trigger=page.getByRole('button',{name:'Search products',exact:true});await trigger.click();
  const search=page.getByRole('dialog',{name:'Find your next favorite'});
  await search.getByRole('textbox',{name:'Search products'}).fill('serum');
  await expect(search.locator('.search-results>a')).toHaveCount(2);
  await search.getByRole('textbox',{name:'Search products'}).fill('zzzzzz');
  await expect(search.getByText('No little luxuries found.')).toBeVisible();
  await search.getByRole('button',{name:'Clear search',exact:true}).click();
  await search.getByRole('textbox',{name:'Search products'}).fill('serum');
  await search.locator('.search-results>a').first().click();
  await expect(page.getByRole('heading',{level:1,name:'Radiant Glow Serum'})).toBeVisible();
  await trigger.click();await page.keyboard.press('Escape');await expect(search).not.toBeVisible();await expect(trigger).toBeFocused();
});
test('category filter, sorting, price and empty recovery',async({page},testInfo)=>{
  await page.goto('/shop/');await page.getByRole('button',{name:'Face',exact:true}).click();
  await expect(page.locator('.product-card')).toHaveCount(5);
  await page.getByLabel('Sort products').selectOption('price-asc');
  await expect(page.locator('.product-card h3').first()).toHaveText('Petal Blush Compact');
  if(testInfo.project.name==='mobile') await page.getByRole('button',{name:'Filters',exact:true}).click();
  const price=page.getByRole('slider',{name:'Maximum price'}).filter({visible:true});
  await price.fill('1000');
  if(testInfo.project.name==='mobile') await page.getByRole('button',{name:'Show 0 essentials'}).click();
  await expect(page.getByRole('heading',{name:'A fresh start?'})).toBeVisible();
  await page.getByRole('button',{name:'Explore all products',exact:true}).click();await expect(page.locator('.product-card')).toHaveCount(12);
});
test('3D model rotation, shade, product switching, zoom and reset',async({page})=>{
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('/');await page.locator('#studio').scrollIntoViewIfNeeded();
  const studio=page.locator('#studio');await expect(studio.locator('canvas')).toBeVisible({timeout:30000});
  await studio.getByRole('button',{name:'Rotate product right'}).click();
  await studio.getByRole('button',{name:'Zoom in'}).click();
  await studio.getByRole('button',{name:'Show Mauve Muse in 3D'}).click();
  await expect(studio.locator('.shade-label')).toContainText('Mauve Muse');
  for(const [label,name] of [['The daily glow','Radiant Glow Serum'],['The soft flush','Petal Blush Compact'],['The skin tint','Skin Tint Foundation'],['The finishing touch','Lustre Lip Gloss']]){await studio.getByRole('button',{name:label,exact:true}).click();await expect(studio.getByRole('heading',{name,exact:true})).toBeVisible();await expect(studio.locator('canvas')).toBeVisible();}
  await studio.getByRole('button',{name:'Reset view'}).click();
  await expect(studio.locator('canvas')).toBeVisible();
  await studio.locator('.canvas-area').focus();await page.keyboard.press('ArrowRight');await page.keyboard.press('Home');
  expect(errors).toEqual([]);
});
test('responsive layout, working navigation, form validation and assets',async({page},testInfo)=>{
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('/');await page.locator('footer').scrollIntoViewIfNeeded();
  await page.locator('#newsletter').fill('hello@example.com');await page.getByRole('button',{name:'Join newsletter demo'}).click();
  await expect(page.locator('.newsletter [role=status]')).toContainText('not submitted or saved');
  if(testInfo.project.name==='mobile'){await page.getByRole('button',{name:'Open menu'}).click();await page.getByRole('navigation',{name:'Mobile navigation'}).getByRole('link',{name:'Get in touch'}).click();}else{await page.locator('footer').getByRole('link',{name:'Contact & care'}).click();}
  await page.getByLabel('Your name',{exact:true}).fill('Demo visitor');await page.getByLabel('Your email',{exact:true}).fill('demo@example.com');await page.getByLabel('Your message',{exact:true}).fill('I would like to explore the collection.');await page.getByRole('button',{name:'Preview your message'}).click();
  await expect(page.locator('.contact-form [role=status]')).toContainText('nothing was sent or saved');
  for(const path of ['/','/shop/','/shop/rosewood/','/about/','/wishlist/','/cart/','/contact/']){await page.goto(path);await page.evaluate(()=>document.fonts.ready);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1),path).toBeTruthy();const broken=await page.locator('img').evaluateAll(imgs=>imgs.filter(i=>(i as HTMLImageElement).complete && !(i as HTMLImageElement).naturalWidth).map(i=>i.getAttribute('src')));expect(broken,path).toEqual([]);}
  expect(errors).toEqual([]);
});
test('same-page category navigation, reduced motion and not-found page',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/shop/');await expect(page.locator('.product-card')).toHaveCount(12);
  await page.locator('footer').getByRole('link',{name:'Skincare',exact:true}).click();
  await expect(page.locator('.product-card')).toHaveCount(2);
  await expect(page.locator('.product-card h3').first()).toHaveText('Radiant Glow Serum');
  await page.goto('/this-page-does-not-exist/');await expect(page.getByRole('heading',{level:1,name:'This beauty is elsewhere.'})).toBeVisible();
});
test('WebGL-unavailable fallback keeps the product and shopping actions usable',async({page})=>{
  await page.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(this:HTMLCanvasElement,type:string,...args:unknown[]){if(type==='webgl'||type==='webgl2'||type==='experimental-webgl')return null;return Reflect.apply(original,this,[type,...args]);} as typeof original;});
  await page.goto('/');await page.locator('#studio').scrollIntoViewIfNeeded();
  await expect(page.locator('#studio .viewer-fallback')).toBeVisible({timeout:30000});
  await expect(page.locator('#studio .viewer-fallback img')).toHaveAttribute('src','/images/rosewood.webp');
  await page.locator('#studio').getByRole('button',{name:'Add to bag',exact:true}).click();
  await expect(page.getByRole('button',{name:'Open shopping bag, 1 items'})).toBeVisible();
});
