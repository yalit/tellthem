import React, {useState} from "react";
import AddPage from "./AddPage";
import {Page} from "../Helpers/Page";
import {PageSmall} from "./Page";

export type PageListProps = {
    pages: Page[] | undefined,
    onAddPage: (page: Page) => boolean
}

const PageList:React.FC<PageListProps> = ({pages, onAddPage}) => {
    return (
      <React.Fragment>
          <AddPage key={"addPage"} onAdd={(page: Page) => onAddPage(page)}/>
          {pages && pages.map(page => <PageSmall key={page.id} page={page} />)}
      </React.Fragment>
    );
};

export default PageList