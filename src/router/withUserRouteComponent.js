import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import LocalStorageUtils from "../utils/LocalStorage";

const withUserRouteComponent = redirectUrl => Child =>
    class RequireAuthorizedComponent extends Component {
        constructor() {
            super();
            if (
                typeof window !== "undefined" &&
                typeof document !== "undefined"
            ) {
                // When constructing component in DOM env
                this.renderFn = this._renderIfAuthenticated;
            } else {
                this.renderFn = this._renderWithoutAuthenticated;
            }
        }
        _renderIfAuthenticated = () => {
            const { props } = this;
            
            if (LocalStorageUtils.isRole() === "isUser") {
                return <Child {...props} />;
            } else {
                return <Redirect to={redirectUrl} />;
            }
        };

        _renderWithoutAuthenticated = () => {
            return <Child {...this.props} />;
        };

        render() {
            return this.renderFn();
        }
    };

export default withUserRouteComponent;

