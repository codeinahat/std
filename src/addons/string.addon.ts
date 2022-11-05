export {}

declare global {

    interface String {
        IsEmail(): boolean;
    }

}

String.prototype.IsEmail = function(): boolean {
    const expresssion = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return expresssion.test(this);
}

