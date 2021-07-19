import {Page} from "../Helpers/Page";
import ProviderInterface from "./StorageProviderInterface";


class PagesLocalStorageProvider implements ProviderInterface {
    localStorage:Storage = window.localStorage

    delete(itemId: any): boolean {
        localStorage.removeItem(itemId)
        return true;
    }

    get(itemId: string): Page[] | [] {
        const localItem = localStorage.getItem(itemId)
        if (localItem) return JSON.parse(localStorage.getItem(itemId) as string);

        localStorage.setItem(itemId, JSON.stringify([]))
        return []
    }

    save(itemId: string, item: Page[]): boolean {
        localStorage.setItem(itemId, JSON.stringify(item))
        return true
    }
}

export default PagesLocalStorageProvider