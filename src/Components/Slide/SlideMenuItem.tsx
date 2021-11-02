import React from "react";

interface SlideMenuItemProps {
    className?: string,
    title: string
}

export const SlideMenuItem:React.FC<SlideMenuItemProps> = ({children, className , title}) => {
    return (
        <div className={`slide-display--menu--item ${className ? className : ''}`}>
            <div className="slide-display--menu--item--title">{title}</div>
            <div className="slide-display--menu--item--data">
                {children}
            </div>
        </div>
    )
}

/*
<div className="slide-display--menu--part slide-display--menu--part-title">
    <div className="slide-display--menu--part--title">Title</div>
    <div className="slide-display--menu--part--data">
        <div className="">
            <InputField value={currentSlide.title} onChange={(data) => updateSlide({title: data})} />
        </div>
    </div>
</div>*/
