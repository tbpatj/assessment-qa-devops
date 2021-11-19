
import { Builder, Capabilities, By } from "selenium-webdriver"

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeEach(async () => {
    driver.get('http://localhost:3000/')
})

afterAll(async () => {
    driver.quit()
})

test('Title shows up when page loads', async () => {
    const title = await driver.findElement(By.id('title'))
    const displayed = await title.isDisplayed()
    expect(displayed).toBe(true)
})

test("check draw Button unhides choices", async () => {
    const drawBttn = await driver.findElement(By.id('draw'));
    await drawBttn.click();
    const cHeader = await driver.findElement(By.id('choose-header'));
    let className = await cHeader.getAttribute('class');
    console.log(className);
    expect(className).not.toBe('hide');
    await driver.sleep(2000);
    //expect(choiceContn).toBe(Promise);
})

test("check the add to Duo functionality", async () => {
    await driver.sleep(2000);
    const drawBttn = await driver.findElement(By.id('draw'));
    await drawBttn.click();
    await driver.sleep(1000);
    const addDuoBttns = await driver.findElements(By.xpath('//button[contains(@class,"bot-btn")]'));
    ;
    // for(let i = 0; i < addDuoBttns.length; i ++){
    //     let cName = await addDuoBttns[i].getAttribute('class');
        //console.log(`${i}: ${cName}`);
        
    // }
    await addDuoBttns[0].click();
    await driver.sleep(1000);
    let foundCard = false;
    let duoCard = await driver.findElement(By.id('your-duo-header'))
    
    let classN = await duoCard.getAttribute('class');
    expect(classN).not.toBe('hide')
    //await addDuoBttn.click();
    await driver.sleep(2000);
    //expect(choiceContn).toBe(Promise);
})