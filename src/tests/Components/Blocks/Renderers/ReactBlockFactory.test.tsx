import ReactBlockFactory from "../../../../Components/Blocks/Renderer/ReactBlockFactory";
import {getBlock} from "../../../../Components/Blocks/block";
import {render, screen} from "@testing-library/react";

describe(('React Block Factory'), () => {

  test('get Text Block', () => {
      const textBlock = getBlock({
          type: 'text',
          _content: "A text",
          displayName: 'Text Block',
          size: {width: 10, height: 50},
          sizeUnit: "px",
          position: {x: 15, y:15},
          positionUnit: "mm"
      })

      render(<ReactBlockFactory block={textBlock} className="test-classname" /> )

      expect(screen.getByText(/A Text/i)).toBeInTheDocument()
    })

    test('get Img Block', () => {
        const imgBlock = getBlock({
            type: 'img',
            _content: "An Image",
            displayName: 'Text Block',
            size: {width: 10, height: 50},
            sizeUnit: "px",
            position: {x: 15, y:15},
            positionUnit: "mm"
        })

        render(<ReactBlockFactory block={imgBlock} className="test-classname" /> )

    })
})