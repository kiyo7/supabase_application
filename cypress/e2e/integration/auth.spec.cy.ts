///<reference types="cypress" />
describe('Authentication', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  //保存するたびにユーザーが生成されるためコメントアウト

  // it('Shall navigate to  Dashboard when successfully login', () => {
  //   cy.get('input[placeholder="メールアドレス"]').type('user1@test.com')
  //   cy.get('input[placeholder="パスワード"]').type('wawawa')
  //   cy.get("[type='submit']").click()
  //   cy.get('[data-testid="logout"]').should('be.visible')
  // })
  // it('Shall navigate to Auth when logout clicked', () => {
  //   cy.get('input[placeholder="メールアドレス"]').type('user1@test.com')
  //   cy.get('input[placeholder="パスワード"]').type('wawawa')
  //   cy.get("[type='submit']").click()
  //   cy.get('[data-testid="logout"]').should('be.visible')
  //   cy.get('[data-testid="logout"]').click()
  //   cy.get('input[placeholder="メールアドレス"]').should('be.visible')
  //   cy.get('input[placeholder="パスワード"]').should('be.visible')
  // })
  // it('Shall not navigate to DashBoard with wrong credentials', () => {
  //   cy.get('input[placeholder="メールアドレス"]').type('user1@test.com')
  //   cy.get('input[placeholder="パスワード"]').type('wawa')
  //   cy.get("[type='submit']").click()
  //   cy.get('[data-testid="logout"]').should('not.exist')
  // })
  // it('Shall navigate to DashBoard when successfully registered', () => {
  //   cy.get('input[placeholder="メールアドレス"]').type('user6@test.com')
  //   cy.get('input[placeholder="パスワード"]').type('wawawa')
  //   cy.contains('新規登録はこちら').click()
  //   cy.get('[type=submit]').should('have.text', '新規登録')
  //   cy.get('[type=submit]').click()
  //   cy.get('input[placeholder="ユーザーネーム"]').should(
  //     'have.value',
  //     'user6@test.com'
  //   )
  // })
})

export {}
