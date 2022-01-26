describe('Checking mail progress', function() {
 

  it('should check that registered user can login to the mailbox',async function() {
    await browser.url ("https://www.yahoo.com/");
   
    let signinButton = await $('//*[@id="ybar-inner-wrap"]/div[3]/div/div[3]/div[1]/div/a');
    await signinButton.click();
      
    let loginButton = await $('//*[@id="login-username"]');
    await loginButton.click();
    let text = ('test12082011');
    await loginButton.keys(text);

    let nextButton = await $('//*[@id="login-signin"]');
     await nextButton.click();

     let passwordButton = await $('//*[@id="login-passwd"]');
     await passwordButton.click();
     let text2 = ('770021rl');
    await passwordButton.keys(text2);

    let nextButton2 = await $('//*[@id="login-signin"]');
     await nextButton2.click();

     let mailButton = await $('//*[@id="ybarMailLink"]/span[1]');
     await mailButton.click();

    });

     it('should check that registered user can create a new mail',async function() {

      let writeButton = await $('//*[@id="app"]/div[2]/div/div[1]/nav/div/div[1]/a');
     await writeButton.click();

     let whomField = await $('//*[@id="message-to-field"]');
     let text3 = ('test12082011@yahoo.com');
    await whomField.keys(text3);


    let themeField = await $('//*[@id="mail-app-component"]/div/div/div[1]/div[3]/div/div/input');
    await themeField.click();
    let text4 = ('letter');
    await themeField.keys(text4);

    let bodyField = await $('//*[@id="editor-container"]/div[1]');
    await bodyField.click();
     let text5 = ('Hello, tester');
    await bodyField.keys(text5);
    browser.pause(2000);

  });

  it('should check that the mail can be saved as a draft',async function() { 
    let draftButton = await $('//*[@id="app"]/div[2]/div/div[1]/nav/div/div[3]/div[1]/ul/li[4]/div/a/span[1]/span/span/span');
    await draftButton.click();
    browser.pause(3000);
  });

  it('should check that the mail presents as a draft',async function() { 
  let draftLetter = await $('//*[@id="mail-app-component"]/div/div/div[2]/div/div/div[2]/div/div[1]/ul/li[2]/a/div/div[2]/div[1]');
  await expect(draftLetter).toExist();
  await draftLetter.click();

});

it('should check that the draft contents adress,theme,body',async function() { 

  let draftWhom = await $('//*[@id="mail-app-component"]/div/div/div[1]/div[2]/div/div');
  await expect(draftWhom).toHaveTextContaining('test12082011@yahoo.com');

  let draftTheme = await $('//input[@data-test-id="compose-subject"]');
  let draftThemeAttr = await draftTheme.getAttribute('value');
  expect(draftThemeAttr).toEqual('letter');

  let draftbody = await $('//*[@id="editor-container"]/div[1]');
  await expect(draftbody).toHaveTextContaining('Hello, tester');

});

  it('should check that the draft was sent',async function() {

  let sendButton = await $('//*[@id="mail-app-component"]/div/div/div[2]/div[2]/div/button');
  await sendButton.click();

}); 


  it('should check that the mail disappeared from drafts folder',async function() {
    let draftButton = await $('//*[@id="app"]/div[2]/div/div[1]/nav/div/div[3]/div[1]/ul/li[4]/div/a'); 
    await draftButton.click();

    let draftMail = await $('//*[@id="mail-app-component"]/div/div/div[2]/div/div/div[2]/div/div[1]/ul/li[2]/a/div/div[2]/div[1]'); 
    let isDisplayed = await draftMail.isDisplayed(); 
    expect(isDisplayed).toHaveValue(false);

});

  it('should check that the mail is in sent folder',async function() {
  let sentButton = await $('//*[@id="app"]/div[2]/div/div[1]/nav/div/div[3]/div[1]/ul/li[5]/div/a/span[1]/span/span/span'); 
  await sentButton.click();
  
  let letter = await $('//*[@id="mail-app-component"]/div/div/div[2]/div/div/div[2]/div/div[1]/ul/li[2]/a/div');
  await expect(letter).toExist();

});

it('should check that the user can log off',async function() {
  let profileButton = await $('#ybarAccountMenuOpener'); 
  await profileButton.moveTo();

  let logoffButton = await $('//*[@id="profile-signout-link"]');
  await logoffButton.waitForDisplayed(); 
  await logoffButton.click();


});

});