import { useContext } from "react";
import {MemoContext} from "../../Dashboard";

const Formadd = (props) => {
    const onClicAddCard = useContext(MemoContext).handleClickAddCard;
    const onClicUpdateCard = useContext(MemoContext).handleClickUpdateCard;
    const onClickCloseModalCard = useContext(MemoContext).handleClickCloseModalCard;
    const cardEdit=useContext(MemoContext).getCardEdit();

    console.log(props);


    return (
        <form className="d-flex flex-column align-items-center" onSubmit={(e) => {
            (cardEdit!=null
            ?
                onClicUpdateCard(e,cardEdit.index_column,cardEdit.index_card,onClickCloseModalCard)
            :
                onClicAddCard(e,props.numColumn,onClickCloseModalCard)
            )
        }}>
            <div className="form-group w-100">
                <label htmlFor="question">Question</label>
                <input name="question" id="question" className="form-control " defaultValue={(cardEdit!=null ? cardEdit.question : '')} />
            </div>
            <div className="form-group w-100">
                <label htmlFor="reponse">Réponse</label>
                <textarea className="form-control" name="reponse" id="reponse" defaultValue={(cardEdit!=null ? cardEdit.reponse : '')} />
            </div>
            <div className="form-group w-100">
                <label htmlFor="explication">Explication</label>
                <textarea className="form-control" name="explication" id="explication" defaultValue={(cardEdit!=null ? cardEdit.explication : '')} />
            </div>
            <div className="form-group">
                <input type="submit" value="Annuler" className="btn btn-light mt-3 me-3" onClick={onClickCloseModalCard}/>
                <input type="submit" value="Enregistrer" className="btn btn-success mt-3" />
            </div>
        </form>
        );
    }

export default Formadd;