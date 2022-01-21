
export default function Pagination({ productsPerPage, totalProducts, paginate, changeProductsPerPage, currentPage }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="pagination-container">
            <div className="drop-list">
                <span> Products per page :</span>
                <select onChange={(e) => changeProductsPerPage(e.target.value)}>
                    <option value='4'>4</option>
                    <option value='6'>6</option>
                    <option value='8'>8</option>
                    <option value='10'>10</option>
                </select>
            </div>

            <div  className='pagination'>
                <ul>
                    {pageNumbers.map(number => (
                        <li key={number} className={(currentPage === number ? 'active' : '')} onClick={() => paginate(number)}>
                            {number}
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    );
};