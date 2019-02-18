import React from 'react';
// import { renderRoutes } from '../../components/route';
// import ThemeRoutes from './adminRouter/routing.jsx';

class Fulllayout extends React.Component {
	/*--------------------------------------------------------------------------------*/
	/*Change the layout settings [HEADER,SIDEBAR && DARK LAYOUT] from here            */
	/*--------------------------------------------------------------------------------*/
	constructor(props) {
		super(props);
		this.updateDimensions = this.updateDimensions.bind(this);
		this.state = {
			isOpen: false,
			width: window.innerWidth
		};

		this.props.history.listen(() => {
			if (window.innerWidth < 767 &&
				document.getElementById('main-wrapper').className.indexOf("show-sidebar") !== -1) {
				document.getElementById('main-wrapper').classList.toggle("show-sidebar");
			}
		});
	}
	/*--------------------------------------------------------------------------------*/
	/*Life Cycle Hook, Applies when loading or resizing App                           */
	/*--------------------------------------------------------------------------------*/
	componentDidMount() {
		window.addEventListener("load", this.updateDimensions);
		window.addEventListener("resize", this.updateDimensions);
	}
	/*--------------------------------------------------------------------------------*/
	/*Function that handles sidebar, changes when resizing App                        */
	/*--------------------------------------------------------------------------------*/
	updateDimensions() {
		let element = document.getElementById('main-wrapper');

		this.setState({
			width: window.innerWidth
		});
		if (this.state.width < 1170) {
			element.setAttribute("data-sidebartype", "mini-sidebar");
			element.classList.add("mini-sidebar");
		} else {
			element.setAttribute("data-sidebartype", "full");
			element.classList.remove("mini-sidebar");
		}
	}
	/*--------------------------------------------------------------------------------*/
	/*Life Cycle Hook                                                                 */
	/*--------------------------------------------------------------------------------*/
	componentWillUnmount() {
		window.removeEventListener("load", this.updateDimensions);
		window.removeEventListener("resize", this.updateDimensions);
	}


	render() {
		/*--------------------------------------------------------------------------------*/
		/* Theme Setting && Layout Options wiil be Change From Here                       */
		/*--------------------------------------------------------------------------------*/
		return (
			<div
				id="main-wrapper"
				data-theme="light"
				data-layout="vertical"
				data-sidebartype="full"
				data-sidebar-position="fixed"
				data-header-position="fixed"
				data-boxed-layout="full"
			>
				{/*--------------------------------------------------------------------------------*/}
				{/* Header                                                                         */}
				{/*--------------------------------------------------------------------------------*/}
				
			</div>
		);
	}
}
export default Fulllayout;
