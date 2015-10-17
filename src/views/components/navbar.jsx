import m from 'mithril'
let {prop} = m

let NavItem = {
	controller(props) {
		this.props = props;
		this.onClick = (e) => m.route(this.props.route)
	},

	view(ctrl, props, ...children) {
		let className = (m.route() == props.route) ? "selected NavItem" : "NavItem"
		return <li className={className} onclick={ctrl.onClick}>{children}</li>
	}
}


class Navbar {
	controller(props) {
		this.props = props 
		this.selectedIndex = prop(0)
		this.onClick = (e) => this.selectedIndex(e.key)

	}

	view(ctrl, props, ...children) {
		let rows = []

		// rows.push ( <div className="header">Navigation</div> )
		rows.push ( <NavItem onclick={ctrl.onClick} key={"0"} route={"characters"}>Characters</NavItem> )
		rows.push ( <NavItem onclick={ctrl.onClick} key={"1"} route={"curves"}>Curves</NavItem> )
		rows.push ( <NavItem onclick={ctrl.onClick} key={"2"} route={"options"}>Options</NavItem> )

		return <nav className="Navbar">
		<div className="header">Navigation</div>
		<ul>{rows}</ul>
		</nav>
	}

}


export default new Navbar()