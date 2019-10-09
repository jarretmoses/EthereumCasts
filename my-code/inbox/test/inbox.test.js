const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const { interface, bytecode } = require('../compile');

const web3 = new Web3(ganache.provider());


describe('Inbox', () => {
  let accounts;
  let inbox;
  let initialMessage = 'Hi there!';

  beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    inbox = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({
        data: bytecode,
        arguments: [initialMessage]
      })
      .send({
        from: accounts[0],
        gas: '1000000'
      });
  });

  describe('Deploy', () => {
    it('deploys a contract', () => {
      assert.ok(inbox.options.address);
    });

    it('has a default message', async () => {
      const { methods: { message } } = inbox;
      assert.equal(await message().call(), initialMessage);
    });
  });

  describe('Update Message', () => {
    it('should correctly update the message', async () => {
      const {
        methods: {
          message,
          setMessage
        }
      } = inbox;

      const newMessage = 'New Message';

      await setMessage(newMessage).send({ from: accounts[0] });

      assert.equal(await message().call(), newMessage);
    });
  })
})
