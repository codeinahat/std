import { Result } from './result.cls';

/**
 * HTTP response result
 */
export class RequestResult<T> {

    /**
     * Raw buffer array
     */
    #raw: Buffer;

    /**
     * Response status code
     */
    #statusCode: number;


    /**
     * If there is an error from the API
     */
    #error: {message: string} | null = null;


    /**
     * 
     * @param buff Raw buffer result
     * @param statusCode HTTP status code
     */
    constructor(buff: Buffer, statusCode: number) {
        this.#raw = buff;
        this.#statusCode = statusCode;

        //TODO: Verify logic for non OK response
        if(this.#statusCode !== 200) {
            const res = this.json_with_type<any>();

            if(res.is_error()) {
                console.log('RESPONSE IS ERROR FROM API')
                throw res.is_error();
            }

            this.#error = res.unwrap();
        }
    }


    /**
     * ## API error
     * If there is an error in the API call ir will try to resolve the error message
     * Handle these way per **Coinbase** [Exchange API](https://docs.cloud.coinbase.com/exchange/docs/welcome) docs.
     * @returns Error message if there is an errror. False if there is not error
     */
    is_error(): {message:string} | boolean {
        return this.#error == null ? false : this.#error;
    }


    /**
     * ## Turns API response into JSON
     * Turns the raw response object into a JSON object
     * @returns JSON object or Error
     */
    json(): Result<T, Error> {
        try {

            if(this.is_error()) {
                return new Result<T, Error>(null, new Error(this.#error.message));
            }
            
            const json_object = JSON.parse(this.#raw.toString('utf-8'));

            return new Result<T, Error>(json_object as T, null);
        }
        catch(error) {
            return new Result<T, Error>(null, error);
        }
    }

    /**
     * ## Type Enforce JSON 
     * Enforce your own type on the response when converting to JSON
     * @returns 
     */
    json_with_type<JT>(): Result<JT, Error> {
        try {
            const json_object = JSON.parse(this.#raw.toString('utf-8'));

            return new Result<JT, Error>(json_object as JT, null);
        }
        catch(error) {
            return new Result<JT, Error>(null, error);
        }
    }


    /**
     * ## Turns API response body into string
     * Turns the raw response object into a string
     * @returns Response body as string
     */
    toString(): string {
        return this.#raw.toString('utf-8');
    }
    
    
}