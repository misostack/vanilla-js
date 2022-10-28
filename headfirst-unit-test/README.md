# Headfirst Unit Test

> What is unit test and how to write test for javascript application?

- [Unit testing for NodeJS/Javascript using mocha and chai](https://www.browserstack.com/guide/unit-testing-for-nodejs-using-mocha-and-chai)

> Mocha is a widely used JavaScript test framework

> Chai is an assertion library that is mostly used alongside Mocha. It can be used both as a BDD / TDD assertion library

## There are couple of concepts we will use when write unit test

### Test Driven Development (TDD)

- Create precise tests
- Correcting the Code
- Refactor the Code

> It means you have to create all precise tests and refactor your code until all tests are passed

### Behavioral-Driven Development (BDD)

A derived from TDD methodology, but tests are mainly based on system behavior.
Eg:

- Given the user has entered valid login credentials
- When a user clicks on the login button
- Then display the successful validation message

## Let's write some tests with mocha and chai

```bash
npm install mocha chai --save-dev
```

### Generate coverage report

- [Istanbul - JavaScript test coverage made simple.](https://istanbul.js.org/)

```bash
npm install --save-dev nyc
```

```json
{
  "scripts": {
    "test": "nyc mocha",
    "test:report": "nyc --reporter=html --reporter=text mocha && serve ./coverage"
  }
}
```

**.nycrc**

```json
{
  "all": true,
  "include": ["src/**/*.js"],
  "exclude": ["**/*.spec.js"]
}
```

## References

- [TDD](https://www.browserstack.com/guide/what-is-test-driven-development)
- [BDD](https://www.browserstack.com/guide/tdd-vs-bdd-vs-atdd)
- [Top javascript testing frameworks](https://www.browserstack.com/guide/top-javascript-testing-frameworks)
