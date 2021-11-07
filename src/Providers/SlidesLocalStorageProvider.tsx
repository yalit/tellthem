
const localStorage:Storage = window.localStorage

const SlidesLocalStorageProvider = {
    delete: async function(itemId: any): Promise<boolean> {
        localStorage.removeItem(itemId)
        return true;
    },

    get: async function (itemId: string): Promise<any[] | []> {
        const localItem = localStorage.getItem(itemId)
        if (localItem) return JSON.parse(localStorage.getItem(itemId) as string);

        await SlidesLocalStorageProvider.save(itemId, [])
        return []
    },

    save: async function (itemId: string, item: any[]): Promise<any[]> {
        localStorage.setItem(itemId, JSON.stringify(item))
        return item
    }
}

export default SlidesLocalStorageProvider