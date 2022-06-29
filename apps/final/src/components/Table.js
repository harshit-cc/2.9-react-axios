import styles from './Table.module.css';
function Table({ list }) {
  return (
    <div>
      {/* <p>{list[0].name}</p> */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {list &&
            list.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
