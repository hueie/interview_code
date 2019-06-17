import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { compose } from "redux";

import { IGlobalStore } from "../../reducers/index";
import { IActionCreator } from "../../interfaces/IReducers";

import { fetchData } from "../../actions/MainActions/index";

import AboutPage from "./AboutPage";

interface IOwnProps {}
interface IStateProps {
    data: string[];
}
interface IDispatchProps {
    fetchData: IActionCreator;
}

// export type IAboutPage = IStateProps & IDispatchProps;
export type IAboutProps = IStateProps & IDispatchProps & IOwnProps;

const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, IGlobalStore> = ({mainState}) => ({
    data: mainState.data,
});

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, {}> = {
    fetchData,
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(AboutPage);
