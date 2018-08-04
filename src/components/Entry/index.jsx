import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import { u, wallet } from "@cityofzion/neon-js";
import { unhexlify } from "binascii";
import { react } from "@nosplatform/api-functions";
import Thanks from "./../../components/Thanks";

const { injectNOS, nosProps } = react.default;

const styles = {
  button: {
    margin: "16px",
    fontSize: "14px"
  }
};

class Entry extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      thanks:[],
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
    this.fetchAllMessage();
  }

  toggleChildMenu(msgD,timeD,addrD) {
    const thanks = this.state.thanks;
    thanks.unshift({date: timeD, message:msgD,hash: addrD});
    console.log({date: timeD, message: msgD,hash: addrD});
    this.setState({thanks: thanks});
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
            this.toggleChildMenu(msgD,timeD,addrD);

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
    return (
      <React.Fragment>
        <section className="hero-section">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="hero-text">
                  <h1 className="hero-title">What are you thankful for today?</h1>
                  <div className="hero-input-box-wrapper">
                    <div className="input-form">
                      <form className="hero-form">
                        <input type="text" value={this.state.message} onChange={this.handleChange} placeholder="I proposed. She said Yes!" />
                        <div className="submit-wrapper">
                          <p>Deliver your message for only a drop of GAS</p>
                          <button type="reload" value="Reload" className="btn-common" onClick={this.fetchAllMessage}>Reload</button>
                          <button type="submit" value="Submit" className="btn-common" onSubmit={this.invokeSendMessage}>Send</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="top-entries-section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="section-title">Todays top entries:</h1>
              </div>
            </div>
            <div className="row top-entry-wrapper">
            {this.state.thanks.map((thanks, index) => {
                  return (<Thanks key= {thanks.hash} hash={thanks.hash} message={thanks.message} date={thanks.date}/>);
                })}
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

Entry.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  nos: nosProps.isRequired
};

export default injectNOS(injectSheet(styles)(Entry));
