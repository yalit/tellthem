
export class SlideBlock {
    name: string = ''
    position: [number, number] = [0,0]
    width: number = 0
    height: number = 0
    type: 'text' | 'image' = 'text'
    content: string | undefined
}