import * as React from "react";
import { IItemlistPageProps } from ".";
import AddItemForm from "./AddItemForm";
import Itemlist from "./Itemlist";
import Item from "./Item";

import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { compose } from "redux";

import { IGlobalStore } from "../../reducers/index";
import { IActionCreator } from "../../interfaces/IReducers";

import { increament, readItemlistFetch } from "../../actions/ItemActions/ItemlistAction";
import { readItemFetch } from "../../actions/ItemActions/ItemAction";

interface IOwnProps {}

interface IStateProps {
//    data: string[];
}
interface IDispatchProps {
    increament: IActionCreator;
}

// export type IItemlistPage = IStateProps & IDispatchProps;
export type IItemlistPageProps = IStateProps & IDispatchProps & IOwnProps;

// const mapStateToProps: MapStateToProps<IStateProps, {}, IGlobalStore> = ({itemlistState}) => ({
const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, IGlobalStore> = ({itemlistState}) => ({
//        data: itemlistState.data,
});

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, IOwnProps> = {
    increament,
};

class ItemlistPage extends React.Component<IItemlistPageProps, {}> {
    componentDidMount(): void {
//        this.props.increament();
//        this.props.fetchData();
    }

    render(): JSX.Element {
        return (
            <div>
                <h1>Itemlist Page</h1>
                <Itemlist/>
                {/* <Itemlist/> <AddItemForm/> */}
            </div>
        );
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(ItemlistPage);
