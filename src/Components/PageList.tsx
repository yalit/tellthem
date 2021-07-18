import React from "react";
import AddPage from "./AddPage";
import {Page} from "../Helpers/Page";
import {PageSmall} from "./Page";

export type PageListProps = {
    pages: Page[] | undefined
}

const PageList:React.FC<PageListProps> = ({pages}) => {
    return (
      <React.Fragment>
          <AddPage onClick={() => console.log('add Page')}/>
          {pages && pages.map(page => <PageSmall page={page} />)}
      </React.Fragment>
    );
};

export default PageList