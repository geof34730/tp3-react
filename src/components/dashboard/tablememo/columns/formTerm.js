import {  useContext } from "react";
import {MemoContext} from "../../Dashboard";

const Formadd = (props) => {
    const onClicAddTerm = useContext(MemoContext).handleClickAddTerm;
    const onClicUpdateTerm = useContext(MemoContext).handleClickUpdateTerm;
    const onClickCloseModalTerm = useContext(MemoContext).handleClickCloseModalTerm;

    const termEdit=useContext(MemoContext).getTermEdit();
    console.log('termEdit',termEdit);

    return (
        <form className="d-flex flex-column align-items-center" onSubmit={(event) => {
            (termEdit!=null
                    ?
                    onClicUpdateTerm(event,termEdit.indexTerm,onClickCloseModalTerm)
                    :
                    onClicAddTerm(event,onClickCloseModalTerm)
            )
        }}>
            <div className="form-group w-100">
                <label htmlFor="termname">Nom de la rubrique</label>
                <input name="termname" id="termname" className="form-control " defaultValue={(termEdit!=null ? termEdit.name : '')} />
            </div>

            <div className="form-group">
                <input type="submit" value="Annuler" className="btn btn-light mt-3 me-3" onClick={onClickCloseModalTerm}/>
                <input type="submit" value="Enregistrer" className="btn btn-success mt-3" />
            </div>
        </form>
    );
}

export default Formadd;