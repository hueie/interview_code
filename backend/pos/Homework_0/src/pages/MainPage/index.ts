import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { compose } from "redux";

import { IGlobalStore } from "../../reducers/index";
import { IActionCreator } from "../../interfaces/IReducers";

import { fetchData } from "../../actions/MainActions/index";

import MainPage from "./MainPage";

// interface IOwnProps {}

interface IStateProps {
    data: string[];
}
interface IDispatchProps {
    fetchData: IActionCreator;
}

export type IMainPage = IStateProps & IDispatchProps;
// export type IMainPage = IStateProps & IDispatchProps & IOwnProps;

const mapStateToProps: MapStateToProps<IStateProps, {}, IGlobalStore> = ({mainState}) => ({
    data: mainState.data,
});

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, {}> = {
    fetchData,
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(MainPage);
