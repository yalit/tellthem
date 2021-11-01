import SlidesLocalStorageProvider from "./SlidesLocalStorageProvider";
import StorageProviderInterface from "./StorageProviderInterface";
import {createSlide, Slide} from "../Helpers/Slide";

test('test local storage save', () => {
    const localStorage = new SlidesLocalStorageProvider();
    const page:Slide = createSlide({title: 'title', description:'description', template: ''})
    localStorage.save('item_test', [page])

    const retrievedItem = JSON.parse(window.localStorage.getItem('item_test') as string)
    expect(retrievedItem).toContainEqual(page)
    expect(retrievedItem.length).toBe(1)
});

test('test local storage get', () => {
    const localStorage = new SlidesLocalStorageProvider();
    const page:Slide = createSlide({title: 'title', description:'description', template: ''})
    window.localStorage.setItem('item_test', JSON.stringify([page]))

    const retrievedItem = localStorage.get('item_test')
    expect(retrievedItem).toContainEqual(page)
    expect(retrievedItem.length).toBe(1)
})

test('test local storage delete', () => {
    const localStorage = new SlidesLocalStorageProvider();
    const page:Slide = createSlide({title: 'title', description:'description', template: ''})
    window.localStorage.setItem('item_test', JSON.stringify([page]))
    localStorage.delete('item_test');

    expect(window.localStorage.getItem('item_test')).toBeNull()
})

export default {}