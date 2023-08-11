import transactions from '../data/transactions.json';

const transactionsService = () => {
    function getTransactions() {
        const res = {
            data: transactions,
        };
        return res;
    }

    return { getTransactions };
};
export default transactionsService;
