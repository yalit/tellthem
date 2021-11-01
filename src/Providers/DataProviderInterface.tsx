interface DataProviderInterface {
    get: (itemId: any) => any,
    all: () => any[]
}

export default DataProviderInterface