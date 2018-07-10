import { IJsonMetaData, jsonMetadataKey } from "../models/iJsonMetaData";

export function JsonProperty<T>(metadata?: IJsonMetaData<T> | string): any {
    if (metadata instanceof String || typeof metadata === "string") {
        return Reflect.metadata(jsonMetadataKey, {
            name: metadata,
            clazz: undefined
        });
    } else {
        let metadataObj = <IJsonMetaData<T>>metadata;
        return Reflect.metadata(jsonMetadataKey, {
            name: metadataObj ? metadataObj.name : undefined,
            clazz: metadataObj ? metadataObj.clazz : undefined
        });
    }
}
