interface ProviderInterface {
    save: (itemId: any, item: any) => boolean,
    get: (itemId: any) => any,
    delete: (itemId: any) => boolean
}

export default ProviderInterface