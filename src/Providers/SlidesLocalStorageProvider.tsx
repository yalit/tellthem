import ProviderInterface from "./StorageProviderInterface";
import {SlideData} from "../Helpers/SlideData";


class SlidesLocalStorageProvider implements ProviderInterface {
    localStorage:Storage = window.localStorage

    delete(itemId: any): boolean {
        localStorage.removeItem(itemId)
        return true;
    }

    get(itemId: string): SlideData[] | [] {
        const localItem = localStorage.getItem(itemId)
        if (localItem) return JSON.parse(localStorage.getItem(itemId) as string);

        this.save(itemId, [])
        return []
    }

    save(itemId: string, item: SlideData[]): boolean {
        localStorage.setItem(itemId, JSON.stringify(item))
        return true
    }
}

export default SlidesLocalStorageProvider