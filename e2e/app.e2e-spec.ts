import { TooltipPage } from './app.po';

describe('tooltip App', () => {
  let page: TooltipPage;

  beforeEach(() => {
    page = new TooltipPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
