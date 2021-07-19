import React from "react";
import AddPage from "./AddPage";
import {Page} from "../Helpers/Page";
import {PageDisplay} from "./Page";

export type PageListProps = {
    pages: Page[],
    onAddPage: (page: Page) => boolean,
    onEditPage: (page: Page) => boolean,
    onDeletePage: (page: Page) => boolean
}

const PageList:React.FC<PageListProps> = ({pages, onAddPage, onEditPage, onDeletePage}) => {
    return (
      <React.Fragment>
          <AddPage key={"addPage"} onAdd={(page: Page) => onAddPage(page)}/>
          {pages.map(page => <PageDisplay key={page.id} page={page} />)}
      </React.Fragment>
    );
};

export default PageList