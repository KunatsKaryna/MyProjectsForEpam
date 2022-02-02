describe('Checking mail progress', function() {
 
  it('should check that registered user can login to the mailbox',async function() {
      await browser.url ("https://www.yahoo.com/");
      await $('//*[@id="ybar-inner-wrap"]/div[3]/div/div[3]/div[1]/div/a').click();
      await $('//*[@id="login-username"]').click();
      await $('//*[@id="login-username"]').keys('test12082011');
      await $('//*[@id="login-signin"]').click();
      await $('//*[@id="login-passwd"]').click();
      await $('//*[@id="login-passwd"]').keys('770021rl');
      expect ('//*[@id="login-signin"]').toExist();
      await $('//*[@id="login-signin"]').click();
      expect ('//*[@id="ybarMailLink"]/span[1]').toExist();
      await $('//*[@id="ybarMailLink"]/span[1]').click();
    });

  it('should check that registered user can create a new mail',async function() {
      await $('//*[@id="app"]/div[2]/div/div[1]/nav/div/div[1]/a').click();
      await $('//*[@id="message-to-field"]').keys('test12082011@yahoo.com');
      expect ('//*[@id="message-to-field"]').toHaveTextContaining('test12082011@yahoo.com');
      await $('//input[@data-test-id="compose-subject"]').click();
      await $('//input[@data-test-id="compose-subject"]').keys('letter');
      expect ('//input[@data-test-id="compose-subject"]').toHaveTextContaining('letter');
      await $('//*[@id="editor-container"]/div[1]').click();
      await $('//*[@id="editor-container"]/div[1]').keys('Hello, tester');
      expect ('//*[@id="editor-container"]/div[1]').toHaveTextContaining('Hello, tester');
  });

  it('should check that the mail can be saved as a draft',async function() { 
      await $('//span[@data-test-folder-name="Draft"]').click();
      await $('//span[@data-test-folder-name="Draft"]').waitForDisplayed({ timeout: 5000 });
  });

  it('should check that the mail presents as a draft',async function() { 
      expect ('//span[@title="test12082011@yahoo.com"][1]').toExist();
      await $('//span[@title="test12082011@yahoo.com"][1]').click();
});

  it('should check that the draft contents adress,theme,body',async function() { 
      expect ('//div[data-test-id="pill-text"]').toHaveTextContaining('test12082011@yahoo.com');
      let draftTheme = await $('//input[@data-test-id="compose-subject"]');
      let draftThemeAttr = await draftTheme.getAttribute('value');
      expect(draftThemeAttr).toEqual('letter');
      expect ('//*[@id="editor-container"]/div[1]').toHaveTextContaining('Hello, tester');
});

  it('should check that the draft can be send',async function() {
      expect ('//button[@data-test-id="compose-send-button"]').toExist;
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
      expect ('//span[@data-test-id="message-subject"]').toExist();
});

  it('should check that the user can log off',async function() {
      await $('#ybarAccountMenuOpener').moveTo();
      await $('//*[@id="profile-signout-link"]').waitForDisplayed();
      await $('//*[@id="profile-signout-link"]').click();
      expect ('//*[@id="ybar-inner-wrap"]/div[3]/div/div[3]/div[1]/div/a').toExist();
});
});