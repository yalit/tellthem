
import interact from 'interactjs'
import React, {ComponentType, FunctionComponent, useEffect, useRef} from "react";
import {ResizableOptions} from "@interactjs/types/index";

export function resizable (options: ResizableOptions): <P extends object>
    (Element: ComponentType<P>) => FunctionComponent<P> {
        return <P extends object>(Element: ComponentType<P>) => {
            const ResizableComponent:FunctionComponent<P> = (props) => {
                const resizableRef = useRef<HTMLElement>(null)

                useEffect(() => {
                    if (resizableRef.current === null) return

                    interact(resizableRef.current)
                        .resizable(options)
                }, [])

                return (
                    <Element ref={resizableRef} {...props}/>
                )
            }

            return ResizableComponent
        }
}