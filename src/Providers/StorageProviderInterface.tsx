interface ProviderInterface {
    save: (itemId: any, item: any) => Promise<boolean>,
    get: (itemId: any) => Promise<any>,
    delete: (itemId: any) => Promise<any>
}

export default ProviderInterface