import { ChatServiceFrontendPage } from './app.po';

describe('chat-service-frontend App', () => {
  let page: ChatServiceFrontendPage;

  beforeEach(() => {
    page = new ChatServiceFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
