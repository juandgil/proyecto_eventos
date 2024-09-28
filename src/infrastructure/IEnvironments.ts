export interface IEnvironments<T> {
    [key: string]: T;
    local: T;
    dev: T;
    test: T;
    prod: T;
}
