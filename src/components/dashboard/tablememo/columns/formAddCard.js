import { useContext } from "react";
import {CardContext} from "../../Dashboard";

const Formadd = (props) => {
    const onClicAddCard = useContext(CardContext).handleClickAddCard;
    return (
        <form className="d-flex flex-column align-items-center" onSubmit={(e) => {onClicAddCard(e,props.numColumn,props.onClickCloseModal)}}>
            <div className="form-group w-100">
                <label htmlFor="question">Question</label>
                <input name="question" id="question" className="form-control " />
            </div>
            <div className="form-group w-100">
                <label htmlFor="reponse">Réponse</label>
                <textarea className="form-control" name="reponse" id="reponse"  />
            </div>
            <div className="form-group w-100">
                <label htmlFor="explication">Explication</label>
                <textarea className="form-control" name="explication" id="explication"  />
            </div>
            <div className="form-group">
                <input type="submit" value="Annuler" className="btn btn-light mt-3 me-3" onClick={props.onClickCloseModal}/>
                <input type="submit" value="Enregistrer" className="btn btn-success mt-3" />
            </div>
        </form>
        );
    }

export default Formadd;