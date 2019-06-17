import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { compose } from "redux";
import * as React from "react";

import { IGlobalStore } from "../../reducers/index";
import { IActionCreator } from "../../interfaces/IReducers";

import { createItemFetch, readItemFetch, updateItemFetch, deleteItemFetch } from "../../actions/ItemActions/ItemAction";

interface IStateProps {
  /*
  item: {
    itemname: string;
    quantity: number;
  };
  data: string[];
  */
}
interface IDispatchProps {
  createItemFetch: IActionCreator;
  readItemFetch: IActionCreator;
  updateItemFetch: IActionCreator;
  deleteItemFetch: IActionCreator;
//  increament: IActionCreator;
}

export type IAddItemFormProps = IStateProps & IDispatchProps;
// export type IAboutPage = IStateProps & IDispatchProps & IOwnProps;

// const mapStateToProps: MapStateToProps<IStateProps, {}, IGlobalStore> = ({itemlistState, mainState}) => ({
const mapStateToProps: MapStateToProps<IStateProps, {}, IGlobalStore> = ({itemlistState}) => ({
//  item: itemlistState.item,
//  data: itemlistState.data,
//  data: mainState.data, // It is possible in this way
});

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, {}> = {
  createItemFetch,
  readItemFetch,
  updateItemFetch,
  deleteItemFetch,
  //  increament,
};

class AddItemForm extends React.Component<IAddItemFormProps, {}> {
// class AddItemForm extends React.Component<any, any> {
  private itemName: React.RefObject<HTMLInputElement>;
  private itemForm: React.RefObject<HTMLFormElement>;

  constructor(props: IAddItemFormProps) {
    super(props);
    this.createItemFetch = this.createItemFetch.bind(this);
    this.increamentHandler = this.increamentHandler.bind(this);
    this.itemName = React.createRef();
    this.itemForm = React.createRef();
    // this.refs.itemForm = React.createRef();
  }

  increamentHandler = (e: any) => {
    this.increament(1);
    this.props.readItemFetch();
  }

  increament = (num?: number) => {
    console.log(num);
  }

  createItemFetch(e: any): void {
    e.preventDefault();
    // tslint:disable-next-line:typedef
    const pItemName = this.itemName.current!;
    pItemName.focus();
    console.log("start!!");
    this.props.createItemFetch();
//    this.props.increament();
    console.log("end!!");
    // this.props.fetchData(pItem);
    if (typeof pItemName.value === "string" && pItemName.value.length > 0) {
      console.log(pItemName.value);
      // this.props.fetchData(pItemName.value); // .addItem
    }
   }

  render(): JSX.Element {
    return (

      <div>
      <form className="form-inline" ref={this.itemForm} onSubmit={this.createItemFetch}>
        <div className="form-group">
          <label htmlFor="itemItem"> Item Name
            <input type="text" id="itemItem" placeholder="e.x.lemmon" ref={this.itemName} className="form-control" />
          </label>
        </div>
        <button type="submit" className="btn btn-primary">Add Item</button>
        <button type="button" onClick={this.increamentHandler} className="btn btn-primary">Add 1</button>
      </form>
      </div>
    );
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(AddItemForm);
