import { useState, useContext } from "react";
import {MemoContext} from "../../../Dashboard";
const Card = (props) => {
  const onClicDeleteCard = useContext(MemoContext).handleClickDeleteCard;
  const onClickEditCard = useContext(MemoContext).handleClickEditCard;
  const onClickMoveCard = useContext(MemoContext).handleClickMoveCard;


  // Etat local à la carte
  const [is_answer_shown, setAnswerShown] = useState(false);
  return (
    <article className="text-white mb-4 rounded bg-secondary p-3">
        <div className="d-flex  justify-content-between ">
            {(props.index_column!==0
                ?
                    <div onClick={() => { onClickMoveCard(props.index_card,props.index_column,props.index_column-1)  }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                             className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                            <path
                                d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                        </svg>
                    </div>
                     :
                    <div></div>
            )}

            {(props.index_column!==3
                ?
                    <div onClick={() => { onClickMoveCard(props.index_card,props.index_column,props.index_column+1)  }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                             className="bi bi-arrow-right-circle" viewBox="0 0 16 16">
                            <path
                                  d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                        </svg>
                    </div>
                    :
                    <div></div>
            )}
        </div>

        <h4
        onClick={() => { setAnswerShown(!is_answer_shown) }}>
        {props.card.question}
      </h4>

      {is_answer_shown && (
        <p>{props.card.reponse}</p>
      )}
        {props.editMode && (
        <div className="d-flex bg-light p-1  justify-content-around radiusCardEdit">
            <div>
            <button type="button"  className="btn btn-outline-success" onClick={() => {onClickEditCard(props.index_column, props.index_card)}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                </svg>
                <span className="visually-hidden">Button</span>
            </button>
            </div>
            <div>
            <button className="btn btn-outline-danger " onClick={() => { onClicDeleteCard(props.index_column, props.index_card) }} >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
                    <path   d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
                </svg>
            </button>
            </div>

        </div>
        )}
    </article>
  );
}

export default Card;