describe('Checking mail progress', function() {
 
  it('should check that registered user can login to the mailbox',async function() {
      await browser.url ("https://www.yahoo.com/");
      await $('//*[@id="ybar-inner-wrap"]/div[3]/div/div[3]/div[1]/div/a').click();
      let loginField = await $('//*[@id="login-username"]');
      await loginField.click();
      let login = ('test12082011');
      await loginField.keys(login);
      await $('//*[@id="login-signin"]').click();
      let passwordField = await $('//*[@id="login-passwd"]');
      await passwordField.click();
      let password = ('770021rl');
      await passwordField.keys(password);
      await $('//*[@id="login-signin"]').click();
      expect ('//*[@id="login-signin"]').toExist();
      await $('//*[@id="ybarMailLink"]/span[1]').click();
      expect ('//*[@id="ybarMailLink"]/span[1]').toExist();
    });

  it('should check that registered user can create a new mail',async function() {
      await $('//*[@id="app"]/div[2]/div/div[1]/nav/div/div[1]/a').click();
      let whomField = await $('//*[@id="message-to-field"]');
      let whom = ('test12082011@yahoo.com');
      await whomField.keys(whom);
      expect(whomField).toHaveTextContaining('test12082011@yahoo.com');
      let themeField = await $('//input[@data-test-id="compose-subject"]');
      await themeField.click();
      let subject = ('letter');
      await themeField.keys(subject);
      expect(themeField).toHaveTextContaining('letter');
      let bodyField = await $('//*[@id="editor-container"]/div[1]');
      await bodyField.click();
      let body = ('Hello, tester');
      await bodyField.keys(body);
      expect(bodyField).toHaveTextContaining('Hello, tester');
  });

  it('should check that the mail can be saved as a draft',async function() { 
      await $('//span[@data-test-folder-name="Draft"]').click();
      await $('//span[@data-test-folder-name="Draft"]').waitForDisplayed({ timeout: 5000 });
  });

  it('should check that the mail presents as a draft',async function() { 
      let draftLetter = await $('//span[@title="test12082011@yahoo.com"][1]');
      expect(draftLetter).toExist();
      await draftLetter.click();
});

  it('should check that the draft contents adress,theme,body',async function() { 
      let draftWhom = await $('//div[data-test-id="pill-text"]');
      expect(draftWhom).toHaveTextContaining('test12082011@yahoo.com');
      let draftTheme = await $('//input[@data-test-id="compose-subject"]');
      let draftThemeAttr = await draftTheme.getAttribute('value');
      expect(draftThemeAttr).toEqual('letter');
      let draftbody = await $('//*[@id="editor-container"]/div[1]');
      expect(draftbody).toHaveTextContaining('Hello, tester');
});

  it('should check that the draft can be send',async function() {
      await $('//button[@data-test-id="compose-send-button"]').click();
}); 

  it('should check that the mail disappeared from drafts folder',async function() {
      await $('//span[@title="test12082011@yahoo.com"][1]').click(); 
      let draftMail = await $('//span[@title="test12082011@yahoo.com"][1]'); 
      let isDisplayed = await draftMail.isDisplayed(); 
      expect(isDisplayed).toHaveValue(false);
});

  it('should check that the mail is in sent folder',async function() {
      await $('//a[@data-test-folder-name="Sent"]').click(); 
      let letter = await $('//span[@data-test-id="message-subject"]');
      expect(letter).toExist();
});

  it('should check that the user can log off',async function() {
      await $('#ybarAccountMenuOpener').moveTo();
      await $('//*[@id="profile-signout-link"]').waitForDisplayed();
      await $('//*[@id="profile-signout-link"]').click();
      expect ('//*[@id="ybar-inner-wrap"]/div[3]/div/div[3]/div[1]/div/a').toExist();
});
});