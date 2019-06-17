import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { compose } from "redux";
import * as React from "react";

import { IGlobalStore } from "../../reducers/index";
import { IActionCreator } from "../../interfaces/IReducers";

import { readItemlistFetch } from "../../actions/ItemActions/ItemlistAction";
import Item, { IItem } from "./Item";

interface IStateProps {
  items: IItem[];
}
interface IDispatchProps {
  readItemlistFetch: IActionCreator;
}

export type IItemlistProps = IStateProps & IDispatchProps;
// export type IAboutPage = IStateProps & IDispatchProps & IOwnProps;

const mapStateToProps: MapStateToProps<IStateProps, {}, IGlobalStore> = ({itemlistState}) => ({
  items: itemlistState.items,
});

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, {}> = {
  readItemlistFetch,
};

class Itemlist extends React.Component<IItemlistProps, {}> {
  componentDidMount(): void {
    console.log("readItemlistFetch");
    this.props.readItemlistFetch();
    console.log(this.props.items);
  }

  render(): JSX.Element {
    // item={this.props.items[index].item} isLoading={false}
    return (
      <div>
        {Object.keys(this.props.items).map((data, idx) => <Item key={idx} pItem={this.props.items[idx]}/> )}
      </div>
    );
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Itemlist);
