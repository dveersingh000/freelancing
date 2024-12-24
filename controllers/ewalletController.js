const Ewallet = require('../models/EWallet');

exports.getEwalletBalance = async (req, res) => {
  try {
    const ewallet = await Ewallet.findOne({ user_id: req.query.user_id });
    res.status(200).json({ balance: ewallet.balance, transactions: ewallet.transactions });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.cashoutEwalletBalance = async (req, res) => {
  try {
    const { user_id, amount } = req.body;
    const ewallet = await Ewallet.findOne({ user_id });
    if (!ewallet || ewallet.balance < amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }
    const fee = amount * 0.02; // Example: 2% cashout fee
    const transaction = {
      type: 'Cashout',
      transaction_id: generateTransactionId(),
      amount: -amount,
      fee: -fee,
      date: new Date()
    };
    ewallet.balance -= (amount + fee);
    ewallet.transactions.push(transaction);
    await ewallet.save();
    res.status(200).json({ message: 'Cash out successful', balance: ewallet.balance, transaction });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Function to generate a unique transaction ID
function generateTransactionId() {
  return 'TRANS_' + Math.random().toString(36).substr(2, 9).toUpperCase();
}
