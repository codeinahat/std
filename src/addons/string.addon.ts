export {}

declare global {

    interface String {
        IsEmail(): boolean;
    }

}

String.prototype.IsEmail = function(): boolean {
    console.log('YOU HAVE BEEN DUPPED');
    return true;
}

