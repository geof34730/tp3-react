import {  useContext } from "react";
import {MemoContext} from "../../Dashboard";
import Card from "./cards/Card";

const Column = (props) => {
  const onClickShowModalAddCard = useContext(MemoContext).handleClickShowModalAddCard;
  return (
    <section className="col">
      <div className="d-flex mb-2 mt-2 flex-wrap ">
          {props.editMode && (
              <div className="me-2">
                  <button
                      onClick={ (e) => {onClickShowModalAddCard(e,props.index_column);}}
                      className="btn btn-success ms-1 me-1"
                  >+</button>
              </div>
          )}
        <h3 className="fs-4">{props.column.name}</h3>

      </div>
      {props.column.cartes.map((card, index_card) =>
        <Card
          key={card.id}
          card={card}
          index_column={props.index_column}
          index_card={index_card}
          editMode={props.editMode}
        />)}
    </section>
  );
}

export default Column;