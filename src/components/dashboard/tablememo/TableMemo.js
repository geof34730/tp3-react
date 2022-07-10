import Column from "./columns/Column";
import { useState, useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import Formadd from "./columns/formCard";

import {MemoContext} from "../Dashboard";

const TableMemo = (props) => {


  return (
    <section>
      <h2>{props.term}</h2>
      <section className="row">
        {props.columns.map((column, index_column) =>
          <Column
            key={column.id}
            column={column}
            index_column={index_column}
            editMode={props.editMode}
            />
            )}
      </section>



    </section>
  );
}

export default TableMemo;