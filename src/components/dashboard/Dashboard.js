import TableMemo from "./tablememo/TableMemo";
import Term from "./terms/Term";
import FormLogin from './formlogin/FormLogin';
import MemopusData from "../../services/MemopusData";
import {useState, createContext} from "react";

export const CardContext = createContext();

const Dashboard = () => {
    // utilisation du hook d'état
    const [is_logged, setIsLogged] = useState(false);
    const [terms, setTerms] = useState([]);
    const [columns, setColumns] = useState([]);
    const [current_term, setCurrentTerm] = useState("");
    const [editMode, setEditMode] = useState(false);

    const handleClickDeleteTerm = (indexTerm) => {
        console.log(`Dans handleClickDeleteTerm`, indexTerm);
        const terms_copy = [...terms];
        terms_copy.splice(indexTerm, 1);
        setTerms(terms_copy);
    }
    const handleClickEditTerm = (indexTerm) => {
        console.log('handleClickEditTerme');
    }
    const handleClickAddTerm = (indexTerm) => {
        console.log('handleClickAddTerme');
    }
    const handleClickChangeMode = () =>{
        setEditMode(!editMode)
    }
    class handleCardContext {
        /*
       static handleClickDeleteCard = (index_column, index_card) => {
           console.log(`Dans handleClickDeleteCard`);

           console.log(`Dans handleClickDeleteCard`, index_column, index_card);
           const columns_copy = [...columns];
           console.log(`columns_copy`, columns_copy);
           columns_copy[index_column].cartes.splice(index_card, 1);
           setColumns(columns_copy);


        }

         */

        static handleClickAddCard = (e, indexColumn,callBack) => {
            let questionValue = e.target.question.value;
            let reponseValue = e.target.reponse.value;
            let explicationValue = e.target.explication.value;
            const columns_copy = [...columns];
            columns_copy[indexColumn].cartes.push({
                colonne: '18',
                explication: explicationValue,
                id: (Math.random() * 100000),
                question: questionValue,
                reponse: reponseValue
            });
            setColumns(columns_copy);
            e.preventDefault();
            callBack()
        }

        static handleClickDeleteCard = () => {
            console.log(`Dans handleClickDeleteCard`);
        }





        static handleClickEditCard = (indexTerm) => {
            console.log('handleClickEditCard');
        }

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

    const handleClickTerm = async (term) => {
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

    return (
        <>
            {!is_logged ? (
                <FormLogin onSubmit={handleSubmitLogin}/>
            ) : (
                <>
                    <nav className="d-flex justify-content-center flex-wrap gap-2">
                        {terms.map((term, indexTerm) => <Term key={term.id}
                                                              onClickTerm={handleClickTerm}
                                                              onClickDeleteTerm={handleClickDeleteTerm}
                                                              onClickEditTerm={handleClickEditTerm}
                                                              onClickAddTerm={handleClickAddTerm}
                                                              term={term}
                                                              indexTerm={indexTerm}
                                                              editMode={editMode}
                        />)}
                        {editMode && (
                        <button type="button" className="btn btn-success">+</button>
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
                    <CardContext.Provider value={handleCardContext}>
                        <TableMemo
                            term={current_term}
                            columns={columns}
                            editMode={editMode}
                        />
                    </CardContext.Provider>
                </>
            )}
        </>
    );
}

export default Dashboard;