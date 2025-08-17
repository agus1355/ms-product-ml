declare namespace jest {
    interface Matchers<R> {
        toBeOneOf(items: any[]): R;
    }
}
