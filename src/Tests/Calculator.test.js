import puppeteer from 'puppeteer';

let browser, page;

// =========================================
// Repeating setup
// =========================================
beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
  });
  page = await browser.newPage();
  await page.goto('localhost:3000');
  await page.waitFor('#onButton');
});

afterAll(async () => {
  await browser.close();
});

beforeEach(async () => {
  await page.click('#onButton');
});

// =========================================
// Tests
// =========================================
test('After start displayed value is 0', async () => {
  const displayedNumber = await page.$eval('.Display', (el) => el.innerHTML);

  expect(displayedNumber).toEqual('0');
});

test('Using plus button', async () => {
  await page.click('#number5');
  await page.click('#plus');
  await page.click('#number7');
  await page.click('#equal');
  const displayedNumber = await page.$eval('.Display', (el) => el.innerHTML);

  expect(displayedNumber).toEqual('12');
});

test('Using minus button', async () => {
  await page.click('#number5');
  await page.click('#minus');
  await page.click('#number7');
  await page.click('#equal');
  const displayedNumber = await page.$eval('.Display', (el) => el.innerHTML);

  expect(displayedNumber).toEqual('-2');
});

test('Using multiply button', async () => {
  await page.click('#number5');
  await page.click('#x');
  await page.click('#number7');
  await page.click('#equal');
  const displayedNumber = await page.$eval('.Display', (el) => el.innerHTML);

  expect(displayedNumber).toEqual('35');
});

test('Using divide button', async () => {
  await page.click('#number8');
  await page.click('#divide');
  await page.click('#number5');
  await page.click('#equal');
  const displayedNumber = await page.$eval('.Display', (el) => el.innerHTML);

  expect(displayedNumber).toEqual('1.6');
});

test('Using square root button', async () => {
  await page.click('#number1');
  await page.click('#number6');
  await page.click('#squareRoot');
  const displayedNumber = await page.$eval('.Display', (el) => el.innerHTML);

  expect(displayedNumber).toEqual('4');
});

test('Using percentage button', async () => {
  await page.click('#number9');
  await page.click('#number6');
  await page.click('#percentage');
  const displayedNumber = await page.$eval('.Display', (el) => el.innerHTML);

  expect(displayedNumber).toEqual('0.96');
});

test('Changing sign', async () => {
  await page.click('#number9');
  await page.click('#number6');
  await page.click('#changeSign');
  const displayedNumber = await page.$eval('.Display', (el) => el.innerHTML);

  expect(displayedNumber).toEqual('-96');
});

test('Writing floating numbers', async () => {
  await page.click('#number9');
  await page.click('#number6');
  await page.click('#dot');
  await page.click('#number6');
  await page.click('#number9');
  const displayedNumber = await page.$eval('.Display', (el) => el.innerHTML);

  expect(displayedNumber).toEqual('96.69');
});

test('Using power mode / can do another operations after it', async () => {
  await page.click('#number4');
  await page.click('#x');
  await page.click('#equal');
  await page.click('#equal');
  await page.click('#equal');
  const numberAfterPowerMode = await page.$eval(
    '.Display',
    (el) => el.innerHTML
  );
  await page.click('#divide');
  await page.click('#number2');
  await page.click('#equal');
  const finalNumber = await page.$eval('.Display', (el) => el.innerHTML);

  expect(numberAfterPowerMode).toEqual('1024');
  expect(finalNumber).toEqual('512');
});

test('Can do repeated operations', async () => {
  await page.click('#number2');
  await page.click('#plus');
  await page.click('#number3');
  await page.click('#equal');
  await page.click('#equal');
  await page.click('#equal');
  const firstNumber = await page.$eval('.Display', (el) => el.innerHTML);
  await page.click('#divide');
  await page.click('#number2');
  await page.click('#equal');
  await page.click('#equal');
  await page.click('#equal');
  const secondNumber = await page.$eval('.Display', (el) => el.innerHTML);
  await page.click('#x');
  await page.click('#number5');
  await page.click('#equal');
  await page.click('#equal');
  await page.click('#equal');
  const thirdNumber = await page.$eval('.Display', (el) => el.innerHTML);
  await page.click('#minus');
  await page.click('#number5');
  await page.click('#equal');
  await page.click('#equal');
  await page.click('#equal');
  const finalNumber = await page.$eval('.Display', (el) => el.innerHTML);

  expect(firstNumber).toEqual('11');
  expect(secondNumber).toEqual('1.375');
  expect(thirdNumber).toEqual('171.875');
  expect(finalNumber).toEqual('156.875');
});

test('Calculator memory works / CE clear only the display', async () => {
  await page.click('#number2');
  await page.click('#number2');
  await page.click('#mPlus');
  await page.click('#ce');
  await page.click('#mr');
  const firstNumber = await page.$eval('.Display', (el) => el.innerHTML);
  await page.click('#number4');
  await page.click('#number8');
  await page.click('#mMinus');
  await page.click('#ce');
  await page.click('#mr');
  const secondNumber = await page.$eval('.Display', (el) => el.innerHTML);

  expect(firstNumber).toEqual('22');
  expect(secondNumber).toEqual('-26');
});
