import Column from "./columns/Column";
import { useState, useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import Formadd from "./columns/formAddCard";


const TableMemo = (props) => {
  const [show, setShow] = useState(false);
  const [numColumnAddCard, setnumColumnAddCard] = useState(false);
  const handleClickCloseModal = () => {
      setShow(false);
  }

  const handleClickShowModal = (numColumn) => {
      setnumColumnAddCard(numColumn);
      setShow(true);
  }
  return (
    <section>
      <h2>{props.term}</h2>
      <section className="row">
        {props.columns.map((column, index_column) =>
          <Column
            key={column.id}
            column={column}
            index_column={index_column}
            onClickShowModal={handleClickShowModal}
            editMode={props.editMode}
            />
            )}
      </section>
      {/* Modal pour créer une carte */}
      <Modal show={show} onHide={handleClickCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Ajout d'une carte</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="modal-body">
                {<Formadd
                    onClickCloseModal={handleClickCloseModal}
                    numColumn={numColumnAddCard}
                />}
            </div>
        </Modal.Body>
      </Modal>
    </section>
  );
}

export default TableMemo;