import * as React from "react";
import { IAboutProps } from "./";

class AboutPage extends React.Component<IAboutProps, {}> {
    componentDidMount(): void {
        this.props.fetchData();
    }

    render(): JSX.Element {
        return (
            <div>
                <h1>About Page</h1>
            </div>
        );
    }
}

export default AboutPage;
