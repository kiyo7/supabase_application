///<reference types='cypress'/>
describe('Dashboard', () => {
  beforeEach(() => {
    cy.visit('/')
    //login
    cy.get('input[placeholder="メールアドレス"]').type('user1@test.com')
    cy.get('input[placeholder="パスワード"]').type('wawawa')
    cy.get("[type='submit']").click()
    cy.get('[data-testid="logout"]').should('be.visible')
  })
  it('Shall Post/Comment CRUD works fine', () => {
    cy.get('input[placeholder="New post ?"]').type('Post A')

    cy.get('[data-testid="btn-post"]').click()
    cy.get('[data-testid="ul-post"]').children().should('have.length', 1)
    cy.get('[data-testid="ul-post"]').children().should('have.text', 'Post A')
    //投稿変更
    cy.get('[data-testid="pencil-post"]').click()
    cy.get('input[placeholder="New post ?"]').type('++')
    cy.get('[data-testid="btn-post"]').click()
    cy.get('[data-testid="ul-post"]').children().should('have.text', 'Post A++')

    cy.get('[data-testid=open-comments]').click()
    cy.get('input[placeholder="New comment ?"]').should('be.visible')
    cy.get('input[placeholder="New comment ?"]').type('Comment A')
    cy.get('[data-testid="btn-comment"]').click()
    cy.get('[data-testid="ul-comment"]').children().should('have.length', 1)

    //コメント変更
    cy.get('[data-testid="pencil-comment"]').click()
    cy.get('input[placeholder="New comment ?"]').type('++')
    cy.get('[data-testid="btn-comment"]').click()
    cy.get('[data-testid="ul-comment"]')
      .children()
      .should('have.text', 'Comment A++')
    //削除
    cy.get('[data-testid="trash-post"]').click()
    cy.get('[data-testid="ul-comment"]').children().should('have.length', 0)
    cy.get('[data-testid="ul-post"]').children().should('have.length', 0)
  })

  it('Shall Notice CRUD works fine', () => {
    //新規投稿
    cy.get('input[placeholder="New notice ?"]').type('Notice A')
    cy.get('[data-testid="btn-notice"]').click()
    cy.get('[data-testid="ul-notice"]').children().should('have.length', 1)
    cy.get('[data-testid="ul-notice"]')
      .children()
      .first()
      .should('have.text', 'Notice A')
    //投稿の更新
    cy.get('[data-testid="ul-notice"]')
      .children()
      .first()
      .find('svg:first-child')
      .click()
    cy.get('input[placeholder="New notice ?"]').type('++')
    cy.get('[data-testid="btn-notice"]').click()
    cy.get('[data-testid="ul-notice"]')
      .children()
      .first()
      .should('have.text', 'Notice A++')
    //削除
    cy.get('[data-testid="ul-notice"]')
      .children()
      .last()
      .find('svg:last-child')
      .click()
    cy.get('[data-testid="ul-notice"]').children().should('have.length', 0)
  })
})

export {}
