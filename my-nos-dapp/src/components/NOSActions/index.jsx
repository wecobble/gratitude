import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import { u, wallet } from "@cityofzion/neon-js";
import { unhexlify } from "binascii";
import { react } from "@nosplatform/api-functions";

const { injectNOS, nosProps } = react.default;

const styles = {
  button: {
    margin: "16px",
    fontSize: "14px"
  }
};

class NOSActions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: "",
      userAddress: "",
      scriptHash: "d7101bd7bad4bae66e1910603508faeffc68b377"
    };

    this.handleChange = this.handleChange.bind(this);
    this.invokeSendMessage = this.invokeSendMessage.bind(this);

  }

  componentDidMount() {
    this.props.nos.getAddress().then(address => {
      this.setState({
        userAddress: address
      });
    });
  }

  handleChange(event) {
    this.setState({ message: event.target.value });
  }

  handleAlert = async func => alert(await func);

  handleInvoke = (scriptHash, operation, args) =>
    this.props.nos
      .invoke({ scriptHash, operation, args })
      .then(txid => alert(`Invoke txid: ${txid} `))
      .catch(err => alert(`Error: ${err.message}`));


  handleGetStorage = async (scriptHash, key, encodeInput, decodeOutput) =>
    this.props.nos
      .getStorage({ scriptHash, key, encodeInput, decodeOutput })
      .catch(err => alert(`Error: ${err.message}`));


  fetchAllMessage = async () => {
    await this.handleGetStorage(
      this.state.scriptHash,
      `count`,
      true,
      false
    )
      .then(data => {

        console.log(data);

        let deserialized = [];
        let promises = [];
        const { deserialize } = this;

        for (let i = 1; i <= data; i += 1) {
          promises.push(
            this.handleGetStorage(
              this.state.scriptHash,
              `message.${unhexlify(u.int2hex(i))}`,
              true,
              false
            )
          );
        }


        Promise.all(promises).then(results => {
          // console.log(results);
          results.forEach(entry => {

            deserialized = [];
            deserialized = deserialize(entry);
            const msgD = deserialized[0];
            const timeD = parseInt(deserialized[1], 16);
            const addrD = deserialized[2];
            console.log(`MESSAGE ${msgD}`);
            console.log(`TIME ${this.getDateTime(timeD)}`);
            console.log(`ADDRESS ${addrD}`);

          })
        });

      })
      .catch(err => alert(`Error: ${err.message}`));

  };


  invokeSendMessage(event) {
    console.log("Invoke 'sendMessage'");
    console.log(`from: ${this.state.userAddress}`);
    console.log(`message: ${this.state.message}`);
    this.handleInvoke(this.state.scriptHash, "sendMessage", [
      unhexlify(u.reverseHex(wallet.getScriptHashFromAddress(this.state.userAddress))),
      this.state.message
    ]);
    event.preventDefault();
  };

  getDateTime = unixTimestamp => {
    const date = new Date(unixTimestamp * 1000);
    const hours = date.getHours();
    const minutes = `0${date.getMinutes()}`;
    const seconds = `0${date.getSeconds()}`;
    return `${date.toLocaleDateString()} ${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;
  };

  concatBytes = (source, start, length) => {
    let temp = "";
    for (let i = start; i < length; i += 1) temp += source[i];
    return temp;
  };


  /**
   * Deserializes a serialized array that's passed as a hexstring
   * @param {hexstring} rawData
   */
  deserialize = rawData => {
    // Split into bytes of 2 characters
    const rawSplitted = rawData.match(/.{2}/g);
    // console.log(rawSplitted);
    // see https://github.com/neo-project/neo/blob/master/neo/SmartContract/StackItemType.cs for data types
    /*
        ByteArray = 0x00,
        Boolean = 0x01,
        Integer = 0x02,
        InteropInterface = 0x40,
        Array = 0x80,
        Struct = 0x81,
        Map = 0x82,
    */
    // skip 80 (array) => we do only array

    // the array length
    const arrayLen = parseInt(rawSplitted[1], 16);
    // console.log("arrayLen" + arrayLen);
    let offset = 2;
    const rawArray = [];

    for (let i = 0; i < arrayLen; i += 1) {
      // get item type
      const itemType = parseInt(rawSplitted[offset], 16);
      // console.log("itemtype" + itemType)
      offset += 1;

      // get item length
      let itemLength = parseInt(rawSplitted[offset], 16);
      // serialize: https://github.com/neo-project/neo-vm/blob/master/src/neo-vm/Helper.cs#L41-L64
      offset += 1;
      if (itemLength === 253) {
        // new itemlentgh = reverse int of next 2
        itemLength = parseInt(u.reverseHex(this.concatBytes(rawSplitted, offset, offset + 2)), 16);
        offset += 2;

        /* d
          writer.Write((byte)0xFD);
          writer.Write((ushort)value);
        */
        /* s
        value = reader.ReadUInt16();
       */
      } else if (itemLength === 254) {
        // new itemlentgh = reverse int of next 4
        itemLength = parseInt(u.reverseHex(this.concatBytes(rawSplitted, offset, offset + 2)), 16);
        offset += 4;
        /* d
          writer.Write((byte)0xFE);
          writer.Write((uint)value);
        */
        /* s
       value = reader.ReadUInt32();
       */
      } else if (itemLength === 255) {
        // new itemlentgh = reverse int of next 8
        itemLength = parseInt(u.reverseHex(this.concatBytes(rawSplitted, offset, offset + 2)), 16);
        offset += 8;
        /* d
          writer.Write((byte)0xFF);
          writer.Write(value); */
        /* s
          value = reader.ReadUInt64();
          */
      } else {
        /* d
           writer.Write((byte)value);
          */
        /* s
          value = fb;
         */
      }
      // console.log("itemLength" + itemLength)
      // console.log(offset);
      let data = this.concatBytes(rawSplitted, offset, itemLength + offset);
      // console.log(data);
      if (itemType === 2) {
        // console.log("data: " + parseInt(u.reverseHex(data),16));
        data = u.reverseHex(data);
        // console.log ("TIME" + data);
      } else if (itemType === 0) {
        // [unhexlify(u.reverseHex(wallet.getScriptHashFromAddress(this.state.userAddress))),
        // data = hexlify(u.reverseHex(wallet.getAddressFromScriptHash))
        if (i === 0) {
          // console.log(u.hexstring2str(data));
          data = u.hexstring2str(data);
        } else {
          data = wallet.getAddressFromScriptHash(u.reverseHex(data));
          // console.log(wallet.getAddressFromScriptHash(u.reverseHex(data)));
        }
      }
      rawArray.push(data);
      // console.log("pushed to array")
      offset = itemLength + offset;
      // console.log("new offset" + offset);
    }
    // 0:message
    // 1:time
    // 2:addr
    return rawArray;
  };


  render() {
    const { classes, nos } = this.props;

    const neo = "c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b";
    const gas = "602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7";

    // Add your smart contract's scriptHash here
    const scriptHash = this.state.scriptHash;

    // The operation of your smart contract you want to (test)invoke
    const operation = "";

    // The necessary arguments for you (test)invoke
    const args = [];

    // The storagekey you want to query
    const key = ".message";

    // The amount and recipient of your send function
    const recipient = "";
    const amount = "";
    const encodeInput = true;
    const decodeOutput = false;

    const invoke = { scriptHash, operation, args }; // and testInvoke
    const getStorage = { scriptHash, key, encodeInput, decodeOutput };
    const send = { amount, asset: gas, recipient };

    return (
      <React.Fragment>
        <form onSubmit={this.invokeSendMessage}>
          <label>
            Message:
          <input type="text" value={this.state.message} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>

        <button className={classes.button} onClick={() => this.handleAlert(this.state.userAddress)}>
          Get Address
        </button>
        <button
          className={classes.button}
          onClick={() => this.handleAlert(nos.getBalance({ asset: neo }))}
        >
          Get NEO Balance
        </button>
        <button
          className={classes.button}
          onClick={() => this.handleAlert(nos.getBalance({ asset: gas }))}
        >
          Get GAS Balance
        </button>


        <button
          className={classes.button}
          onClick={() => this.fetchAllMessage()}
        >
          Load All Message
        </button>
      </React.Fragment>
    );
  }
}

NOSActions.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  nos: nosProps.isRequired
};

export default injectNOS(injectSheet(styles)(NOSActions));
