# Booklet

Booklet is a library application built with React, Styled components and Typescript.

## Installing

This project uses `npm` for it's package manager so once cloned all you need to do is run, the minimum **node version is 20**. 
```bash
npm i
```
## Starting the app

To start the app all you have to do is run:
```bash
npm run dev
```
this will start the project and make it available for you to open inside the browser. The application is already configured with hot reloading so all your changes are reflected as soon as you save them.

This will also start the backend which provides APIs for you to interact with while building the application. An exhaustive list of supported endpoints can be found in the [/api-docs.html](api-docs.html) file.

## Testing

The application is configured to use `jest` and `react-testing-library`, to write a test all you need to do is create a `.spec.tsx` file and then run

```bash
npm run test
```
or you can run
```bash
npm run test-watch
```

to run all tests in watch mode, where any changes made automatically re-run the tests.

### Testing server calls
By default all calls to `fetch` the browser api used to fetch data from the server are mocked with the help of `jest-fetch-mock`. You can use the following as an example on how to mock fetch calls:
```ts
describe("App", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should render a heading", async () => {
    fetchMock.mockResponseOnce(JSON.stringify([]));

    render(<App />);
    expect(screen.getByText("Booklet")).toBeInTheDocument();
  });
});
```
**It's important** to note the use of `fetchMock` and `fetchMock.mockResponseOnce` which need to be used to mock calls to the backend.