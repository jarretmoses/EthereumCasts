const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const network = 'https://rinkeby.infura.io/v3/a5f549d5daa64ba1a1b0fe85497bf089'
const provider = new HDWalletProvider(
  'hint balance source true wall nuclear record account mean noodle ski ready',
  network
);

const web3 = new Web3(provider);

const deploy = async () => {
  try {
    const initialMessage = 'Initialized!';
    const [account] = await web3.eth.getAccounts();

    console.log('Attempting To Deploy at Account: ', account);

    const result = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({
        data: `0x${bytecode}`,
        arguments: [initialMessage]
      })
      .send({
        from: account,
        gas: '1000000',
      });

      console.log('Successfully Deployed to: ', result.options.address);
  } catch(err) {
    console.log('ERROR:', err.message);
  }
};

deploy();
