
import interact from 'interactjs'
import React, {ComponentType, FunctionComponent, useEffect, useRef} from "react";
import {ResizableOptions, DraggableOptions} from "@interactjs/types/index";

interface interactableProps {
    resizableOptions?: ResizableOptions,
    draggableOptions?: DraggableOptions
}

export function interactable (options: interactableProps): <P extends object>
    (Element: ComponentType<P>) => FunctionComponent<P> {
        return <P extends object>(Element: ComponentType<P>) => {
            const InteractableComponent:FunctionComponent<P> = (props) => {
                const resizableRef = useRef<HTMLElement>(null)

                useEffect(() => {
                    if (resizableRef.current === null) return

                    if (options.resizableOptions) {
                        interact(resizableRef.current)
                            .resizable(options.resizableOptions)
                    }

                    if (options.draggableOptions) {
                        interact(resizableRef.current)
                            .draggable(options.draggableOptions)
                    }

                }, [])

                return (
                    <Element ref={resizableRef} {...props}/>
                )
            }

            return InteractableComponent
        }
}
