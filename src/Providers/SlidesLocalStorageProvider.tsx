import ProviderInterface from "./StorageProviderInterface";
import {SlideData} from "../Helpers/SlideData";


class SlidesLocalStorageProvider implements ProviderInterface {
    localStorage:Storage = window.localStorage

    // @ts-ignore
    async delete(itemId: any): Promise<boolean> {
        localStorage.removeItem(itemId)
        return true;
    }

    async get(itemId: string): Promise<any[] | []> {
        const localItem = localStorage.getItem(itemId)
        if (localItem) return JSON.parse(localStorage.getItem(itemId) as string);

        await this.save(itemId, [])
        return []
    }

    // @ts-ignore
    async save(itemId: string, item: any[]): Promise<any[]> {
        localStorage.setItem(itemId, JSON.stringify(item))
        return item
    }
}

export default SlidesLocalStorageProvider