import React, {useEffect, useState} from "react";
import {SlideData} from "../Helpers/SlideData";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import './Styles/Slide.scss'
import TemplateLocalProvider from "../Providers/TemplateLocalProvider";
import {TemplateData} from "../Helpers/TemplateData";
import Blockify from "../libraries/Blockify/blockify";
import {TextBlock} from "../libraries/Blockify/models/block";

type SlideDisplayProps = {
    slide: SlideData,
    onClose: () => void
}

function SlideDisplay(props: SlideDisplayProps) {
    const [internalSlide, useInternalSlide] = useState<SlideData>(props.slide)
    const templateProvider = new TemplateLocalProvider()
    const templatesList:TemplateData[] = templateProvider.all()

    const blockify = new Blockify()
    const textBlock = new TextBlock("un super texte block")


    const UpdateSlide = (slideData: Partial<SlideData>):void => {
        const updatedSlide = {...internalSlide, ...slideData}
        console.log(updatedSlide)
        useInternalSlide(updatedSlide)
    }

    const changeTemplate = (e: any): void => {
        const template = templateProvider.get(e.target.value)
        if (!template) return

        UpdateSlide({blocks: template.blocks, template: template.name})
    }

    return (
        <React.Fragment>
            <div id="slide-display">
                <div className="slide-display--sidebar">
                    <div className="slide-display--sidebar--item slide-display--sidebar--template">
                        <div className="slide-display--sidebar--item--title">Select a template : </div>
                        <div className="slide-display--sidebar--item--content">
                            <div className="slide-display--sidebar--template--select">
                                <select onChange={changeTemplate}>
                                    <option key={"none"}>...</option>
                                    {templatesList.map(template => {
                                        return <option value={template.id} key={template.id}>{template.name}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="slide-display--close" onClick={props.onClose}>
                        <div className="slide-display--close--button"><FontAwesomeIcon icon={"times"} /></div>
                    </div>
                </div>
                <div className="slide-display--slide">
                    <div className="slide-display--slide--title">{internalSlide.title}</div>
                    <div className="slide-display--slide-template">Template used : {internalSlide.template}</div>
                    {blockify.renderAsReact([textBlock], {class: "superClass", style: {color: 'red'}})}
                </div>
            </div>
        </React.Fragment>
    )
}

export default SlideDisplay