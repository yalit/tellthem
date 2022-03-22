import {createSlide, SlideData} from "../../Components/Slide/SlideData";
import SlidesLocalStorageProvider from "../../Providers/SlidesLocalStorageProvider";

describe('SlidesLocalStorageProvider test', () => {
    test('test local storage save', () => {
        const slide:SlideData = createSlide({title: 'title', description:'description'})
        SlidesLocalStorageProvider.save('item_test', [slide])

        const retrievedItem = JSON.parse(window.localStorage.getItem('item_test') as string)
        expect(retrievedItem).toContainEqual(slide)
        expect(retrievedItem.length).toBe(1)
    });

    test('test local storage get', () => {
        const slide:SlideData = createSlide({title: 'title', description:'description'})
        window.localStorage.setItem('item_test', JSON.stringify([slide]))

        const retrievedItem = SlidesLocalStorageProvider.get('item_test')
        return retrievedItem.then(result => {
            expect(result).toContainEqual(slide)
            expect(result.length).toBe(1)
        })

    })

    test('test local storage delete', () => {
        const slide:SlideData = createSlide({title: 'title', description:'description'})
        window.localStorage.setItem('item_test', JSON.stringify([slide]))
        SlidesLocalStorageProvider.delete('item_test');

        expect(window.localStorage.getItem('item_test')).toBeNull()
    })
})