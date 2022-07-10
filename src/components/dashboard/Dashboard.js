import TableMemo from "./tablememo/TableMemo";
import Term from "./terms/Term";
import FormLogin from './formlogin/FormLogin';
import MemopusData from "../../services/MemopusData";
import {useState, createContext} from "react";
import {Modal} from "react-bootstrap";
import Formadd from "./tablememo/columns/formCard";
import Formterm from "./tablememo/columns/formTerm";

export const MemoContext = createContext();

const Dashboard = () => {
    // utilisation du hook d'état
    const [is_logged, setIsLogged] = useState(false);
    const [terms, setTerms] = useState([]);
    const [columns, setColumns] = useState([]);
    const [current_term, setCurrentTerm] = useState("");

    const [editMode, setEditMode] = useState(false);

    const [showModalCard, setShowModalCard] = useState(false);
    const [showModalTerm, setShowModalTerm] = useState(false);

    const [cardEdit, setCardEdit] = useState(null);
    const [termEdit, setTermEdit] = useState(null);

    const [numColumnAddCard, setNumColumnAddCard] = useState(false);

    class handleContext {
        /**************** BEGIN MANAGE TERMS MODAL CATEGORIE 1  ********************/

        static getTermEdit(){
            return termEdit;
        }



        static handleClickAddTerm = (e,callBack) => {
            e.preventDefault();
            console.log('handleClickAddTerme');
           // setTermEdit(null)
           // setShowModalTerm(true)
        }


        static handleClickUpdateTerm = (e, indexTerm,callBack) => {
            e.preventDefault();
            const terms_copy = [...terms];
            terms_copy[indexTerm].name=e.target.termname.value;
            setTerms(terms_copy);
        }

        static handleClickEditTerm = (indexTerm) => {
            console.log('handleClickEditTerme');
            const terms_copy = [...terms];
            let contentEdit=terms_copy[indexTerm];
            contentEdit.indexTerm=indexTerm;
            setTermEdit(terms_copy[indexTerm])
            console.log(terms_copy[indexTerm]);
            setShowModalTerm(true)
        }

        static handleClickDeleteTerm = (indexTerm) => {
            console.log(`Dans handleClickDeleteTerm`, indexTerm);
            if (window.confirm("êtes-vous sûr de vouloir supprimer cette rubrique ?")) {
                const terms_copy = [...terms];
                terms_copy.splice(indexTerm, 1);
                setTerms(terms_copy);
            }
        }



        static handleClickTerm = async (term) => {
            console.log(`dans handleClickTerm`, term.id);
            try {
                const columns_response = await MemopusData.getCards(term.id);
                console.log(`columns_response `, columns_response);
                setCurrentTerm(term.name);
                setColumns(columns_response);
            } catch (error) {
                console.error("Erreur attrapée dans handleSubmitLogin", error);
            }
        }

        static handleClickShowModalTerm = (e,indexTerm=null) => {
           // setNumColumnAddCard(numColumn);
            console.log('handleClickAddTerme');
            setTermEdit(null)
            setShowModalTerm(true)

        }
        static handleClickCloseModalTerm = () => {
            setShowModalTerm(false);
        }


/*
        static handleClickShowModalAddTerm(numColumn){
            setCardEdit(null)
            handleContext.handleClickShowModalTerm(numColumn)
        }
*/
        static handleClickShowModalTerm = () => {
            setTermEdit(null)
            setShowModalTerm(true);
        }
        /**************** END MANAGE TERMS MODAL  ********************/


        /**************** BEGIN MANAGE TERMS MODAL CATEGORIE 2 (Entete Column)  ********************/



        /**************** END MANAGE TERMS MODAL CATEGORIE 2 (Entete Column)  ********************/

        /**************** BEGIN MANAGE CARD MODAL  ********************/
        static getCardEdit(){
            return cardEdit;
        }

        static handleClickAddCard = (e, indexColumn,callBack) => {
            console.log('handleClickAddCard',indexColumn);
            e.preventDefault();
            const columns_copy = [...columns];
            columns_copy[indexColumn].cartes.push({
                id: Math.floor(Math.random() * 100000),
                question: e.target.question.value,
                reponse:  e.target.reponse.value,
                explication: e.target.explication.value,
            });
            setColumns(columns_copy);
            callBack()
        }
        static handleClickDeleteCard = (index_column,index_card) => {
            console.log(`Dans handleClickDeleteCard`, index_card);
            if (window.confirm("êtes-vous sûr de vouloir supprimer cette carte ?")) {
                const columns_copy = [...columns];
                columns_copy[index_column].cartes.splice(index_card, 1)
                setColumns(columns_copy);
            }
        }
        static handleClickUpdateCard = (e, indexColumn,indexCard,callBack) => {
            e.preventDefault();
            console.log('handleClickUpdateCard',indexColumn);
            const columns_copy = [...columns];
            let myCarteUpdate=columns_copy[indexColumn].cartes[indexCard]
            myCarteUpdate.question=e.target.question.value;
            myCarteUpdate.reponse=e.target.reponse.value;
            myCarteUpdate.explication=e.target.explication.value;
            setColumns(columns_copy);
            callBack()
        }
        static handleClickEditCard = (index_column,index_card) => {
            console.log('handleClickEditCard');
            const columns_copy = [...columns];
            let contentEdit=columns_copy[index_column].cartes[index_card];
            contentEdit.index_card=index_card;
            contentEdit.index_column=index_column
            setCardEdit(columns_copy[index_column].cartes[index_card])
            setShowModalCard(true)
        }
        static handleClickShowModalAddCard(numColumn){
            setCardEdit(null)
            handleContext.handleClickShowModalCard(numColumn)
        }
        static handleClickShowModalCard = (numColumn) => {
            setNumColumnAddCard(numColumn);
            console.log('handleClickShowModalCard',numColumn)
            setShowModalCard(true);
        }
        static handleClickCloseModalCard = () => {
            setShowModalCard(false);
        }
        /**************** END CARD MODAL  ********************/

    }

    const handleClickChangeMode = () => {
        setEditMode(!editMode)
    }

    const handleSubmitLogin = async (e) => {
        try {
            e.preventDefault();
            console.log(`dans handleSubmit`);
            const login = e.target.login.value;
            const pwd = e.target.pwd.value;

            // Appel de getUser
            await MemopusData.getUser(login, pwd);
            setIsLogged(true);
            // Appel de getTerms
            const terms_response = await MemopusData.getTerms();
            setTerms(terms_response);
        } catch (error) {
            console.error("Erreur attrapée dans handleSubmitLogin", error);
            setIsLogged(false);
        }
    }

    return (
        <>
            {!is_logged ? (
                <FormLogin onSubmit={handleSubmitLogin}/>
            ) : (
                <>
                    <nav className="d-flex justify-content-center flex-wrap gap-2">
                        <MemoContext.Provider value={handleContext}>
                            {terms.map((term, indexTerm) => <Term key={term.id}
                                                                  term={term}
                                                                  indexTerm={indexTerm}
                                                                  editMode={editMode}
                            />)}
                        </MemoContext.Provider>
                        {editMode && (
                        <button type="button" className="btn btn-success" onClick={handleContext.handleClickShowModalTerm}>+</button>
                        )}
                        {editMode ? (
                            <button type="button"  className="btn btn-warning" onClick={handleClickChangeMode}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-eye" viewBox="0 0 16 16">
                                    <path
                                        d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                                    <path
                                        d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                                </svg>
                            </button>
                        ) : (
                            <button type="button"  className="btn btn-warning" onClick={handleClickChangeMode}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                </svg>
                                <span className="visually-hidden">Button</span>
                            </button>
                        )}
                    </nav>
                    <MemoContext.Provider value={handleContext}>
                        <TableMemo
                            term={current_term}
                            columns={columns}
                            editMode={editMode}
                        />

                    <Modal show={showModalTerm}  onHide={handleContext.handleClickCloseModalTerm}>
                        <Modal.Header closeButton>
                            {
                                (termEdit == null ?
                                        <Modal.Title>Ajout d'une rubrique</Modal.Title>
                                        :
                                        <Modal.Title>Modification d'une rubrique</Modal.Title>
                                )}
                        </Modal.Header>
                        <Modal.Body>
                            <div className="modal-body">
                                {<Formterm

                                />}
                            </div>
                        </Modal.Body>
                    </Modal>

                    <Modal show={showModalCard} onHide={handleContext.handleClickCloseModalCard}>
                        <Modal.Header closeButton>
                                {
                                (cardEdit == null ?
                                    <Modal.Title>Ajout d'une carte</Modal.Title>
                                    :
                                    <Modal.Title>Modification d'une carte</Modal.Title>
                                )}
                        </Modal.Header>
                        <Modal.Body>
                                <div className="modal-body">
                                    {<Formadd
                                        numColumn={numColumnAddCard}
                                    />}
                                </div>
                            </Modal.Body>
                        </Modal>
                    </MemoContext.Provider>
                </>
            )}
        </>
    );
}

export default Dashboard;