// LifeCycle
export const REQUEST: string = "REQUEST";
export const SUCCESS: string = "SUCCESS";
export const FAILURE: string = "FAILURE";

export interface IRequestTypes {
    [key: string]: string;
}

function createRequestTypes(base: string): IRequestTypes {
    return [REQUEST, SUCCESS, FAILURE].reduce((acc: IRequestTypes, type) => {
        acc[type] = `${base}_${type}`;
        return acc;
    }, {});
}

export default createRequestTypes;
