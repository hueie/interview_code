import * as React from "react";
import { IMainPage } from ".";

class MainPage extends React.Component<IMainPage, {}> {
    componentDidMount(): void {
        this.props.fetchData();
    }

    render(): JSX.Element {
        return (
            <div>
                <h1>Main page</h1>
            </div>
        );
    }
}

export default MainPage;
