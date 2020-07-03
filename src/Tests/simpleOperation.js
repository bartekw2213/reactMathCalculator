export default async ({ page, firstNum, secondNum, mathBtn, solution }) => {
  await page.click(firstNum);
  await page.click(mathBtn);
  await page.click(secondNum);
  await page.click('#equal');
  const displayedNumber = await page.$eval('.Display', (el) => el.innerHTML);

  expect(displayedNumber).toEqual(solution);
};
