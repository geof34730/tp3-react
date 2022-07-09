import Card from "./cards/Card";
const Column = (props) => {
  return (
    <section className="col">
      <div className="d-flex mb-2 mt-2 flex-wrap ">
        <h3 class="fs-4">{props.column.name}</h3>
          {props.editMode && (
              <div>
                  <button
                      onClick={ () => {props.onClickShowModal(props.index_column)}}
                      className="btn btn-success ms-1 me-1"
                  >+</button>
                  <button type="button"  className="btn btn-outline-success" >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                           className="bi bi-pencil-fill" viewBox="0 0 16 16">
                          <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                      </svg>
                      <span className="visually-hidden">Button</span>
                  </button>
              </div>
          )}
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