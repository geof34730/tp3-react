import Column from "./columns/Column";
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