import { Injectable } from "@angular/core";

import { IJsonMetaData, jsonMetadataKey } from "../models/iJsonMetaData";

// This service shall define all pure functions (utilities)
// Hence, the utility functions shall be defined as 'static'
@Injectable()
export class UtilityService {
    constructor(){}

    // This method deserializes JSON objects to TypeScript classes
    // Takes TS class and JSON object as parameters
    // Returns instanse of TS class
    static deserialize<T>(clazz: { new (): T }, jsonObject: any) {
        if ((clazz === undefined) || (jsonObject === undefined)) return undefined;
        let obj = new clazz();
        Object.keys(obj).forEach((key) => {
            let propertyMetadataFn: (IJsonMetaData) => any = (propertyMetadata) => {
                let propertyName = propertyMetadata.name || key;
                let innerJson = jsonObject ? jsonObject[propertyName] : undefined;
                let clazz = UtilityService.getClazz(obj, key);
                if (UtilityService.isArray(clazz)) {
                    let metadata = UtilityService.getJsonProperty(obj, key);
                    if (metadata.clazz || UtilityService.isPrimitive(clazz)) {
                        if (innerJson && UtilityService.isArray(innerJson)) {
                            return innerJson.map(
                                (item) => UtilityService.deserialize(metadata.clazz, item)
                            );
                        } else {
                            return undefined;
                        }
                    } else {
                        return innerJson;
                    }

                } else if (!UtilityService.isPrimitive(clazz)) {

                    return UtilityService.deserialize(clazz, innerJson);
                } else {
                    return jsonObject ? jsonObject[propertyName] : undefined;
                }
            };

            let propertyMetadata = UtilityService.getJsonProperty(obj, key);
            if (propertyMetadata) {
                obj[key] = propertyMetadataFn(propertyMetadata);
            } else {
                if (jsonObject && jsonObject[key] !== undefined) {
                    obj[key] = jsonObject[key];
                }
            }
        });
        return obj;
    }

    // Helper methods for deserialize()
    static getClazz(target: any, propertyKey: string): any {
        return Reflect.getMetadata("design:type", target, propertyKey);
    }
    static getJsonProperty<T>(target: any, propertyKey: string): IJsonMetaData<T> {
        return Reflect.getMetadata(jsonMetadataKey, target, propertyKey);
    }
    static isArray(object: any) {
        if (object === Array) {
            return true;
        } else if (typeof Array.isArray === "function") {
            return Array.isArray(object);
        }
        else {
            return !!(object instanceof Array);
        }
    }
    static isPrimitive(obj: any) {
        switch (typeof obj) {
            case "string":
            case "number":
            case "boolean":
                return true;
        }
        return !!(obj instanceof String || obj === String ||
            obj instanceof Number || obj === Number ||
            obj instanceof Boolean || obj === Boolean);
    }
}
