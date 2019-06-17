import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { compose } from "redux";
import * as React from "react";

import { IGlobalStore } from "../../reducers/index";
import { IItemReduxState } from "../../reducers/ItemReducers/ItemReducer";
import { IActionCreator } from "../../interfaces/IReducers";
import { createItemFetch, readItemFetch, updateItemFetch, deleteItemFetch } from "../../actions/ItemActions/ItemAction";

export interface IItem {
  item: {
    itemId: number;
    itemName: string;
    itemImagePath: string;
    itemPlace: string;
    itemPrice: number;
    itemPriceOptions: string;
    itemOnSaleType: string;
    itemOnSaleDateStart: string;
    itemOnSaleDateEnd: string;
  };
}

interface IStateProps extends IItem {
  // Prop(erties) From Redux Store
  isLoading: boolean;
}

interface IDispatchProps {
  createItemFetch: IActionCreator<null>;
  readItemFetch: IActionCreator<any>;
  updateItemFetch: IActionCreator<null>;
  deleteItemFetch: IActionCreator<null>;
}

interface IOwnProps {
  // Prop(erties) From Parent
  pItem: {
    item: {
      itemId: number;
      itemName: string;
      itemImagePath: string;
      itemPlace: string;
      itemPrice: number;
      itemPriceOptions: string;
      itemOnSaleType: string;
      itemOnSaleDateStart: string;
      itemOnSaleDateEnd: string;
    };
  };
}

export type IItemProps = IStateProps & IDispatchProps & IOwnProps;

type IItemState = IItem;

const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, IGlobalStore> = ({itemState}, ownProps: IOwnProps) => ({
  pItem: ownProps.pItem,
  item: itemState.item,
  isLoading: itemState.isLoading,
});

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, IOwnProps> = {
  createItemFetch,
  readItemFetch,
  updateItemFetch,
  deleteItemFetch,
};

class Item extends React.Component<IItemProps, any> {
  /*
  state: any = {
    item: {
      itemId: 0,
      itemName: "",
      itemImagePath: "",
      itemPrice: 0,
      itemPlace: "",
      itemOnSaleType: "",
      itemOnSaleDateStart: "",
      itemOnSaleDateEnd: "",
    },
  };
*/

  constructor(props: IItemProps) {
    super(props);
//    this.props.item = this.props.pItem;
    // const id: string = props.pItem.item.itemName;
    // console.log(id);
    console.log(this.props.pItem);
    /*
    const ppItem: any = {
      item: this.props.pItem,
    };

    console.log(ppItem);
    */
    // this.state = ppItem;
    this.state = {
      item: this.props.pItem,
    };
    /*
    this.state = {
      item: {
        itemId: this.props.pItem.item.itemId,
        itemName: this.props.pItem.item.itemName,
        itemImagePath: this.props.pItem.item.itemImagePath,
        itemPrice: this.props.pItem.item.itemPrice,
        itemPlace: this.props.pItem.item.itemPlace,
        itemOnSaleType: this.props.pItem.item.itemOnSaleType,
        itemOnSaleDateStart: this.props.pItem.item.itemOnSaleDateStart,
        itemOnSaleDateEnd: this.props.pItem.item.itemOnSaleDateEnd,
      },
    };
    */
    /*
    this.state = {
      item: this.props.pItem.item,
    };
    */
    console.log("item create");
    console.log(this.props.pItem);
    console.log(this.state);
    console.log(this.state.item.itemName);
    console.log("item create finish");
//    this.props.item.itemId = ;
  }

  componentWillMount(): void {
    console.log(1);
    this.updateProps(this.props);
  }

  updateProps(props: IItemProps): void {
    console.log(2);
    /*
    this.setState(
      this.props.pItem.item,
    );
    */
    // this.props.item = this.props.pItem.item;
    // this.setState({item: 1});
    console.log(this.props);
    console.log("2-2");
    console.log(this.state);
    console.log("2-3");
  }
  componentDidMount(): void {
    console.log(3);
    // this.props.readItemFetch();
  }

  componentWillReceiveProps(nextProps: IItemProps): void {
    console.log(4);
    this.updateProps(nextProps);
  }

  componentDidUpdate(prevProps: IItemProps): void {
    console.log("5-1");
    if (prevProps.pItem !== this.props.pItem) {
      console.log("5-2");
      this.updateProps(prevProps);
    }
  }

  render(): JSX.Element {
    return (
      <table >
        <tbody>
        <tr>
          <td>{this.state.item.itemId}</td>
          <td>{this.state.item.itemImagePath}</td>
          <td>{this.state.item.itemName}</td>
          <td>{this.state.item.itemPrice}</td>
          <td>{this.state.item.itemPriceOptions}</td>
          <td>{this.state.item.itemPlace}</td>
          <td>{this.state.item.itemOnSaleType}</td>
          <td>{this.state.item.itemOnSaleDateStart}</td>
          <td>{this.props.item.itemOnSaleDateEnd}</td>
        </tr>
        </tbody>
      </table>
    );
  }
}

export default compose(
  connect<IStateProps, IDispatchProps, IOwnProps, IGlobalStore>(mapStateToProps, mapDispatchToProps),
)(Item);
