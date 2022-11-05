
/**
 * Hanldes complex errors
 */
export class Result <T, E> {

    /**
     * Result value
     */
    #value: T | null = null;

    /**
     * Result error
     */
    #error: E | null = null;


    /**
     * 
     * @param r Result value
     * @param e Result error
     */
    constructor(r: T, e: E) {
        this.#value = r || null;
        this.#error = e || null
    }


    /**
     * ## Resolves error
     * If there is an error it will resolve it and return it
     * otherwise it returns a boolean [false]
     * @returns Error if error is present. False if there is no error
     */
    is_error(): E | boolean {
        return this.#error === null ? false : this.#error;
    }


    /**
     * ## Returns {@link Result} value
     * These function unwraps the `result value` if it is present
     * @returns value of the result or error if there is an error
     */
    unwrap(): T  {
        return this.#value;
    }



}