import SlidesLocalStorageProvider from "../../Providers/SlidesLocalStorageProvider";
import {createSlide, SlideData} from "../../Components/Slide/SlideData";

test('test local storage save', () => {
    const localStorage = new SlidesLocalStorageProvider();
    const slide:SlideData = createSlide({title: 'title', description:'description'})
    localStorage.save('item_test', [slide])

    const retrievedItem = JSON.parse(window.localStorage.getItem('item_test') as string)
    expect(retrievedItem).toContainEqual(slide)
    expect(retrievedItem.length).toBe(1)
});

test('test local storage get', () => {
    const localStorage = new SlidesLocalStorageProvider();
    const slide:SlideData = createSlide({title: 'title', description:'description'})
    window.localStorage.setItem('item_test', JSON.stringify([slide]))

    const retrievedItem = localStorage.get('item_test')
    return retrievedItem.then(result => {
        expect(result).toContainEqual(slide)
        expect(result.length).toBe(1)
    })

})

test('test local storage delete', () => {
    const localStorage = new SlidesLocalStorageProvider();
    const slide:SlideData = createSlide({title: 'title', description:'description'})
    window.localStorage.setItem('item_test', JSON.stringify([slide]))
    localStorage.delete('item_test');

    expect(window.localStorage.getItem('item_test')).toBeNull()
})

export default {}